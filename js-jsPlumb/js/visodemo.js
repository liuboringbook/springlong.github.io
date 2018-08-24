
// 很多连接线都是相同设置的情况下，可以将配置抽离出来，作为一个单独的变量，作为connect的第二个参数传入。
// 实际上connect的第二个参数会和第一个参数merge，作为一个整体。
var commonConfig = {
  // 是否可以拖动（作为连线起点）
  isSource: true,
  // 是否可以放置（连线终点）
  isTarget: true,
  // 设置连接点最多可以连接几条线
  // -1不限制，默认限制一条线
  maxConnections: -1,
  // 设置锚点位置，按照[target, source]的顺序进行设置
  // 可以有 Bottom Top Right Left四种方位
  // 还可以是BottomLeft BottomRight BottomCenter TopLeft TopRight TopCenter LeftMiddle RightMiddle的组合
  // 默认值 ['Bottom', 'Bottom']
  // anchor: ['Bottom', 'Bottom'],
  // 端点类型，形状（区分大小写），Rectangle-正方形 Dot-圆形 Blank-空
  endpoint: ['Dot', {
    radius: 4,
  }],
  // 设置端点的样式
  endpointStyle: {
    fill: '#456', // 填充颜色
    outlineStroke: 'blank', // 边框颜色
    outlineWidth: 0, // 边框宽度
  },
  // 设置连接线的样式 Bezier-贝瑟尔曲线 Flowchart-流程图 StateMachine-弧线 Straight-直线
  connector: ['Flowchart'],
  // 设置连接线的样式
  connectorStyle: {
    stroke: '#456', // 实线颜色
    strokeWidth: 3, // 实线宽度
    outlineStroke: 'blank', // 边框颜色
    outlineWidth: 2, // 边框宽度
  },
  // 设置连接线悬浮样式
  connectorHoverStyle: {
    stroke: 'lightblue', // 实线颜色
  },
  // 设置连接线的箭头
  // 可以设置箭头的长宽以及箭头的位置，location 0.5表示箭头位于中间，location 1表示箭头设置在连接线末端。 一根连接线是可以添加多个箭头的。
  connectorOverlays: [
    ['Arrow', {
        width: 10,
        length: 10,
        location: 1
    }],
    ['Label', {
      label: '',
      cssClass: 'jtk-overlay-label',
      location: 0.4,
      events: {
        click: function (labelOverlay, originalEvent) {
          console.log('点击连接线的文字内容', labelOverlay, originalEvent)
        }
      }
    }]
  ]
}

jsPlumb.ready(function () {
  // 常用量设置
  const containerId = 'diagramContainer'
  const containerSelector = '#' + containerId
  const visoSelector = '#operate .viso-item'

  // 设置绘图容器
  jsPlumb.setContainer(containerId)

  // 可以使用importDefaults，来重写某些默认设置
  jsPlumb.importDefaults({
    ConnectionsDetachable: false, // 一般来说拖动创建的连接，可以再次拖动，让连接断开。如果不想触发这种行为，可以设置。
  })

  // 绑定加载数据的操作数据
  bindLoadData()

  // 绑定删除连接线的操作处理
  bindDeleteConnection()

  // 绑定保存数据的操作数据
  bindSaveData()

  // 绑定清除数据的操作数据
  bindClearData()

  // 绑定删除节点操作
  bindRemoveNode()

  // 绑定节点内容编辑
  bindEditNodeName()

  // 加载数据并绘制流程图
  loadDataAndPaint()

  // 绑定连接线添加label文本
  bindConnectionAddLabel()

  // 设置拖拉
  $(visoSelector).draggable({
    helper: 'clone',
    scope: 'ss',
  })

  // 放置拖拉
  $(containerSelector).droppable({
    scope: 'ss',
    drop: function (event, ui) {
      const x = parseInt(ui.offset.left - $(this).offset().left)
      const y = parseInt(ui.offset.top - $(this).offset().top)
      const type = ui.helper.attr('data-type')
      const id = `${type}${new Date().valueOf()}`
      const name = ui.helper.html()

      // 添加节点
      appendNode({ id, type, x, y, name })
    }
  })

  // 添加节点
  function appendNode(info) {
    let eleStyle = `position: absolute; left: ${info.x}px; top: ${info.y}px;`
    if (info.width) {
      eleStyle += `width: ${info.width}px; height: ${info.height}px;`
    }

    $(containerSelector).append(`
      <div id="${info.id}"
        class="viso-item viso-${info.type}"
        style="${eleStyle}"
      >
        <span class="viso-name">${info.name}</span>
        <span class="viso-close">&times;</span>
      </div>
    `)

    $(`#${info.id}`).data('type', info.type)

    // 设置默认表现
    setDefault(info.id)
  }

  // 设置默认表现
  function setDefault(id) {
    setDraggable(id)
    addEndpoint(id)
  }

  // 设置指定节点可拖动
  function setDraggable(id) {
    jsPlumb.draggable(id, {
      containment: 'parent', // 限制节点的拖动区域
      grid: [10, 10], // 设置网格
    })
  }

  // 给指定节点添加端点
  function addEndpoint(id) {
    jsPlumb.addEndpoint(id, {anchors: 'Left', uuid: `${id}-anchor-left-middle`}, commonConfig)
    jsPlumb.addEndpoint(id, {anchors: 'Right', uuid: `${id}-anchor-right-middle`}, commonConfig)
    jsPlumb.addEndpoint(id, {anchors: 'Top', uuid: `${id}-anchor-center-top`}, commonConfig)
    jsPlumb.addEndpoint(id, {anchors: 'Bottom', uuid: `${id}-anchor-center-bottom`}, commonConfig)
  }

  // 设置连线
  function setConnection(info) {
    jsPlumb.connect({
      uuids: [getAnchorID(info.source), getAnchorID(info.target)],
      overlays: [
        [ "Label", {label: "text", cssClass: 'jtk-overlay-label', location: 0.4,}]
      ]
    })
  }

  // 获取端点id
  function getAnchorID(anchorInfo) {
    const nodeInfo = getNodeInfo('#' + anchorInfo.elementId)
    const posX = (anchorInfo.x - nodeInfo.x) / nodeInfo.width
    const posY = (anchorInfo.y - nodeInfo.y) / nodeInfo.height
    let posXName = 'center'
    let posYName = 'middle'

    if (posX === 0) {
      posXName = 'left'
    } else if (posX > 0.6) {
      posXName = 'right'
    }

    if (posY === 0) {
      posYName = 'top'
    } else if (posY > 0.6) {
      posYName = 'bottom'
    }

    return `${anchorInfo.elementId}-anchor-${posXName}-${posYName}`
  }

  // 清除画布内容
  function clearCont() {
    // 删除所有连接线
    jsPlumb.deleteEveryConnection()

    // 删除所有端点
    jsPlumb.deleteEveryEndpoint()

    // 删除所有节点
    $(containerSelector).empty()
  }

  // 获取节点数据
  function getNodeData() {
    const $viso = $(containerSelector).find('.viso-item')
    const nodeData = []

    $viso.each(function() {
      const nodeInfo = getNodeInfo($(this))

      if (!nodeInfo.id) {
        throw new Error('流程图节点必须包含id')
      }

      if (!nodeInfo.name) {
        throw new Error('流程图节点必须包含name')
      }

      nodeData.push({
        id: nodeInfo.id,
        name: nodeInfo.name,
        type: nodeInfo.type,
        width: nodeInfo.width,
        height: nodeInfo.height,
        x: nodeInfo.x,
        y: nodeInfo.y,
      })
    })

    return nodeData
  }

  // 获取节点相关信息
  function getNodeInfo(ele) {
    const $ele = $(ele)
    const id = $ele.attr('id')
    const name = $ele.find('.viso-name').text().replace(/^\s+|\s+$/g, '')

    return  {
      id: id,
      name: name,
      type: $ele.data('type'),
      width: $ele.width() || 80,
      height: $ele.height() || 80,
      x: parseInt($ele.css('left')) || 0,
      y: parseInt($ele.css('top')) || 0,
    }
  }

  // 获取连线数据
  function getConnectionData() {
    const originalData = jsPlumb.getAllConnections()
    const connectionData = []

    originalData.forEach((item) => {
      const anchorSource = item.endpoints[0].anchor
      const anchorTarget = item.endpoints[1].anchor
      const anchorSourceInfo = {
        name: anchorSource.type,
        x: anchorSource.x,
        y: anchorSource.y,
      }
      const anchorTargetInfo = {
        name: anchorTarget.type,
        x: anchorTarget.x,
        y: anchorTarget.y,
      }
      const anchorSourcePosition = getAnchorPosition(anchorSource.elementId, anchorSourceInfo)
      const anchorTargetPosition = getAnchorPosition(anchorTarget.elementId, anchorTargetInfo)

      connectionData.push({
        // 连线id
        id: item.id,
        // 源节点
        source: {
          elementId: anchorSource.elementId,
          x: anchorSourcePosition.x,
          y: anchorSourcePosition.y,
        },
        // 目标节点
        target: {
          elementId: anchorTarget.elementId,
          x: anchorTargetPosition.x,
          y: anchorTargetPosition.y,
        },
      })
    })

    return connectionData
  }

  // 获取节点坐标信息
  function getAnchorPosition(elementId, anchorInfo) {
    const $ele = $(`#${elementId}`)
    const nodeInfo = getNodeInfo($ele)

    return {
      x: nodeInfo.x + nodeInfo.width*anchorInfo.x,
      y: nodeInfo.y + nodeInfo.height*anchorInfo.y,
    }
  }

  // 加载数据并绘制流程图
  function loadDataAndPaint() {
    const defData = {connectionData: [], nodeData: []}
    const storageData = localStorage.getItem('visoData')
    const visoData = storageData ? JSON.parse(storageData) : defData
    const nodeData = visoData.nodeData
    const connectionData = visoData.connectionData

    // 清除内容
    clearCont()

    // 添加节点
    nodeData.forEach((item) => {
      appendNode(item)
    })

    // 创建连线
    connectionData.forEach((item) => {
      setConnection(item)
    })
  }

  // 绑定删除连接线的操作处理
  function bindDeleteConnection() {
    jsPlumb.bind('dblclick', function (connection, originalEvent) {
      if (window.confirm('确定删除所点击的连接线吗？')) {
        // 删除指定连接线
        jsPlumb.deleteConnection(connection)
      }
    })
  }

  // 绑定连接线添加label文本
  function bindConnectionAddLabel() {
    // 建立连接线之前触发
    // 返回true正常建立连线，返回false取消连接
    // jsPlumb.bind('beforeDrop', function (info, originalEvent) {
    //   console.log('beforeDrop-', info)
    //   console.log(info.connection.getLabel)

    //   const output = window.prompt('请输入连接线的label')

    //   getOverlay

    //   return false;
    // })

    // 建立端点之间的连接线时触发
    // jsPlumb.bind('connection', function (info, originalEvent) {
    //     console.log('connection-建立端点的连接线', info)
    // })
  }

  // 绑定加载数据的操作数据
  function bindLoadData() {
    $('#loadData').on('click', function() {
      loadDataAndPaint()
    })
  }

  // 绑定保存数据的操作数据
  function bindSaveData() {
    $('#saveData').on('click', function() {
      const nodeData = getNodeData()
      const connectionData = getConnectionData()

      const visoData = {
        nodeData,
        connectionData,
      }

      console.log('保存数据', visoData)
      localStorage.setItem('visoData', JSON.stringify(visoData));
    })
  }

  // 绑定清除内容的操作数据
  function bindClearData() {
    $('#clearData').on('click', function() {
      clearCont()
    })
  }

  // 绑定删除节点操作
  function bindRemoveNode() {
    $(containerSelector).on('click', '.viso-close', function() {
      const $item = $(this).closest('.viso-item')
      const id = $item.attr('id')
      jsPlumb.remove(id)
    })
  }

  // 绑定节点内容编辑
  function bindEditNodeName() {
    $(containerSelector).on('dblclick', '.viso-item', function() {
      const $ele = $(this)
      const text = $ele.find('.viso-name').text().replace(/^\s+|\s+$/g, '')
      const $input = $ele.find('.viso-input')

      if ($input.length) {
        $input.val(text).show()
        moveEnd($input[0])
      } else {
        const $appendInput = $(`<input class="viso-input" value="${text}" />`).appendTo($ele)
        moveEnd($appendInput[0])
      }

      $ele.find('.viso-close').show()
    })

    $(containerSelector).on('blur', '.viso-input', function() {
      saveInput(this)
    })

    $(containerSelector).on('keyup', '.viso-input', function(event) {
      if (event.keyCode === 13) {
        saveInput(this)
      }
    })

    // 保存数据
    function saveInput(ele) {
      const $ele = $(ele)
      const val = $ele.val()

      if (val.trim() !== '') {
        $ele.closest('.viso-item').find('.viso-name').text(val)
      }
      $ele.hide()
      $ele.closest('.viso-item').find('.viso-close').hide()
    }
  }

  // 光标移至末尾
  function moveEnd(ele) {
    ele.focus();
    var len = ele.value.length;
    if (document.selection) {
      var sel = ele.createTextRange();
      sel.moveStart('character', len);
      sel.collapse();
      sel.select();
    } else if (typeof ele.selectionStart == 'number' && typeof ele.selectionEnd == 'number') {
      ele.selectionStart = ele.selectionEnd = len;
    }
  }
})
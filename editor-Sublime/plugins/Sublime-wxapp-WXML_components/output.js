    const data = {
        "view": {
            "attrs": [{
                "name": "hover-class",
                "type": "string",
                "defaultValue": "none",
                "desc": "指定按下去的样式类。当 `hover-class=\"none\"` 时，没有点击态效果"
            }, {
                "name": "hover-stop-propagation",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "指定是否阻止本节点的祖先节点出现点击态"
            }, {
                "name": "hover-start-time",
                "type": "number",
                "defaultValue": "50",
                "desc": "按住后多久出现点击态，单位毫秒"
            }, {
                "name": "hover-stay-time",
                "type": "number",
                "defaultValue": "400",
                "desc": "手指松开后点击态保留时间，单位毫秒"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/view.html"
        },
        "scroll-view": {
            "attrs": [{
                "name": "scroll-x",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "允许横向滚动"
            }, {
                "name": "scroll-y",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "允许纵向滚动"
            }, {
                "name": "upper-threshold",
                "type": "number",
                "defaultValue": "50",
                "desc": "距顶部/左边多远时（单位px），触发 scrolltoupper 事件"
            }, {
                "name": "lower-threshold",
                "type": "number",
                "defaultValue": "50",
                "desc": "距底部/右边多远时（单位px），触发 scrolltolower 事件"
            }, {
                "name": "scroll-top",
                "type": "number",
                "defaultValue": "",
                "desc": "设置竖向滚动条位置"
            }, {
                "name": "scroll-left",
                "type": "number",
                "defaultValue": "",
                "desc": "设置横向滚动条位置"
            }, {
                "name": "scroll-into-view",
                "type": "string",
                "defaultValue": "",
                "desc": "值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素"
            }, {
                "name": "scroll-with-animation",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "在设置滚动条位置时使用动画过渡"
            }, {
                "name": "enable-back-to-top",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向"
            }, {
                "name": "bindscrolltoupper",
                "type": "function",
                "defaultValue": "",
                "desc": "滚动到顶部/左边，会触发 scrolltoupper 事件"
            }, {
                "name": "bindscrolltolower",
                "type": "function",
                "defaultValue": "",
                "desc": "滚动到底部/右边，会触发 scrolltolower 事件"
            }, {
                "name": "bindscroll",
                "type": "function",
                "defaultValue": "",
                "desc": "滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/scroll-view.html"
        },
        "swiper": {
            "attrs": [{
                "name": "indicator-dots",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否显示面板指示点"
            }, {
                "name": "indicator-color",
                "type": "string",
                "defaultValue": "rgba(0, 0, 0, .3)",
                "desc": "指示点颜色"
            }, {
                "name": "indicator-active-color",
                "type": "string",
                "defaultValue": "#000000",
                "desc": "当前选中的指示点颜色"
            }, {
                "name": "autoplay",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否自动切换"
            }, {
                "name": "current",
                "type": "number",
                "defaultValue": "0",
                "desc": "当前所在滑块的 index"
            }, {
                "name": "current-item-id",
                "type": "string",
                "defaultValue": "",
                "desc": "当前所在滑块的 item-id ，不能与 current 被同时指定"
            }, {
                "name": "interval",
                "type": "number",
                "defaultValue": "5000",
                "desc": "自动切换时间间隔"
            }, {
                "name": "duration",
                "type": "number",
                "defaultValue": "500",
                "desc": "滑动动画时长"
            }, {
                "name": "circular",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否采用衔接滑动"
            }, {
                "name": "vertical",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "滑动方向是否为纵向"
            }, {
                "name": "previous-margin",
                "type": "string",
                "defaultValue": "0px",
                "desc": "前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值"
            }, {
                "name": "next-margin",
                "type": "string",
                "defaultValue": "0px",
                "desc": "后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值"
            }, {
                "name": "display-multiple-items",
                "type": "number",
                "defaultValue": "1",
                "desc": "同时显示的滑块数量"
            }, {
                "name": "skip-hidden-item-layout",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息"
            }, {
                "name": "bindchange",
                "type": "function",
                "defaultValue": "",
                "desc": "current 改变时会触发 change 事件，event.detail = {current: current, source: source}"
            }, {
                "name": "bindanimationfinish",
                "type": "function",
                "defaultValue": "",
                "desc": "动画结束时会触发 animationfinish 事件，event.detail 同上"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/swiper.html"
        },
        "swiper-item": {
            "attrs": [{
                "name": "item-id",
                "type": "string",
                "defaultValue": "",
                "desc": "该 swiper-item 的标识符"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/swiper.html"
        },
        "movable-area": {
            "attrs": [{
                "name": "scale-area",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "当里面的movable-view设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/movable-view.html"
        },
        "movable-view": {
            "attrs": [],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/movable-view.html"
        },
        "cover-view": {
            "attrs": [],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/cover-view.html"
        },
        "cover-image": {
            "attrs": [{
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": "图标路径，支持临时路径、网络地址（1.6.0起支持）。暂不支持base64格式。"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/cover-view.html"
        },
        "icon": {
            "attrs": [{
                "name": "type",
                "type": "string",
                "defaultValue": "",
                "desc": "icon的类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear"
            }, {
                "name": "size",
                "type": "number",
                "defaultValue": "23",
                "desc": "icon的大小，单位px"
            }, {
                "name": "color",
                "type": "string",
                "defaultValue": "",
                "desc": "icon的颜色，同css的color"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/icon.html"
        },
        "text": {
            "attrs": [{
                "name": "selectable",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "文本是否可选"
            }, {
                "name": "space",
                "type": "string",
                "defaultValue": "false",
                "desc": "显示连续空格",
                "enum": [{
                    "value": "ensp",
                    "desc": "中文字符空格一半大小"
                }, {
                    "value": "emsp",
                    "desc": "中文字符空格大小"
                }, {
                    "value": "nbsp",
                    "desc": "根据字体设置的空格大小"
                }]
            }, {
                "name": "decode",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否解码"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/text.html"
        },
        "rich-text": {
            "attrs": [{
                "name": "nodes",
                "type": "any[] | string",
                "defaultValue": "",
                "desc": "节点列表 / HTML String"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/rich-text.html"
        },
        "progress": {
            "attrs": [{
                "name": "percent",
                "type": "number",
                "defaultValue": "无",
                "desc": "百分比0~100"
            }, {
                "name": "show-info",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "在进度条右侧显示百分比"
            }, {
                "name": "stroke-width",
                "type": "number",
                "defaultValue": "6",
                "desc": "进度条线的宽度，单位px"
            }, {
                "name": "color",
                "type": "string",
                "defaultValue": "#09BB07",
                "desc": "进度条颜色 （请使用 activeColor）"
            }, {
                "name": "activeColor",
                "type": "string",
                "defaultValue": "",
                "desc": "已选择的进度条的颜色"
            }, {
                "name": "backgroundColor",
                "type": "string",
                "defaultValue": "",
                "desc": "未选择的进度条的颜色"
            }, {
                "name": "active",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "进度条从左往右的动画"
            }, {
                "name": "active-mode",
                "type": "string",
                "defaultValue": "backwards",
                "desc": "backwards: 动画从头播；forwards：动画从上次结束点接着播"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/progress.html"
        },
        "button": {
            "attrs": [{
                "name": "size",
                "type": "string",
                "defaultValue": "default",
                "desc": "按钮的大小",
                "enum": [{
                    "value": "default"
                }, {
                    "value": "mini"
                }]
            }, {
                "name": "type",
                "type": "string",
                "defaultValue": "default",
                "desc": "按钮的样式类型",
                "enum": [{
                    "value": "primary"
                }, {
                    "value": "default"
                }, {
                    "value": "warn"
                }]
            }, {
                "name": "plain",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "按钮是否镂空，背景色透明"
            }, {
                "name": "disabled",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否禁用"
            }, {
                "name": "loading",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "名称前是否带 loading 图标"
            }, {
                "name": "form-type",
                "type": "string",
                "defaultValue": "",
                "desc": "用于 `<form/>` 组件，点击分别会触发 `<form/>` 组件的 submit/reset 事件",
                "enum": [{
                    "value": "submit",
                    "desc": "提交表单"
                }, {
                    "value": "reset",
                    "desc": "重置表单"
                }]
            }, {
                "name": "open-type",
                "type": "string",
                "defaultValue": "",
                "desc": "微信开放能力",
                "enum": [{
                    "value": "contact",
                    "desc": "打开客服会话"
                }, {
                    "value": "share",
                    "desc": "触发用户转发，使用前建议先阅读[使用指引](https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#使用指引)"
                }, {
                    "value": "getUserInfo",
                    "desc": "获取用户信息，可以从bindgetuserinfo回调中获取到用户信息"
                }, {
                    "value": "getPhoneNumber",
                    "desc": "获取用户手机号，可以从bindgetphonenumber回调中获取到用户信息，[具体说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html)"
                }, {
                    "value": "launchApp",
                    "desc": "打开APP，可以通过app-parameter属性设定向APP传的参数[具体说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/launchApp.html)"
                }]
            }, {
                "name": "app-parameter",
                "type": "string",
                "defaultValue": "",
                "desc": "打开 APP 时，向 APP 传递的参数"
            }, {
                "name": "hover-class",
                "type": "string",
                "defaultValue": "button-hover",
                "desc": "指定按钮按下去的样式类。当 `hover-class=\"none\"` 时，没有点击态效果"
            }, {
                "name": "hover-stop-propagation",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "指定是否阻止本节点的祖先节点出现点击态"
            }, {
                "name": "hover-start-time",
                "type": "number",
                "defaultValue": "20",
                "desc": "按住后多久出现点击态，单位毫秒"
            }, {
                "name": "hover-stay-time",
                "type": "number",
                "defaultValue": "70",
                "desc": "手指松开后点击态保留时间，单位毫秒"
            }, {
                "name": "bindgetuserinfo",
                "type": "function",
                "defaultValue": "",
                "desc": "用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同[wx.getUserInfo](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html#wxgetuserinfoobject)"
            }, {
                "name": "lang",
                "type": "string",
                "defaultValue": "en",
                "desc": "指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。"
            }, {
                "name": "session-from",
                "type": "string",
                "defaultValue": "",
                "desc": "会话来源"
            }, {
                "name": "send-message-title",
                "type": "string",
                "defaultValue": "当前标题",
                "desc": "会话内消息卡片标题"
            }, {
                "name": "send-message-path",
                "type": "string",
                "defaultValue": "当前分享路径",
                "desc": "会话内消息卡片点击跳转小程序路径"
            }, {
                "name": "send-message-img",
                "type": "string",
                "defaultValue": "截图",
                "desc": "会话内消息卡片图片"
            }, {
                "name": "show-message-card",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "显示会话内消息卡片"
            }, {
                "name": "bindcontact",
                "type": "function",
                "defaultValue": "",
                "desc": "客服消息回调"
            }, {
                "name": "bindgetphonenumber",
                "type": "function",
                "defaultValue": "",
                "desc": "获取用户手机号回调"
            }, {
                "name": "binderrror",
                "type": "function",
                "defaultValue": "",
                "desc": "当使用开放能力时，发生错误的回调"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html"
        },
        "checkbox-group": {
            "attrs": [{
                "name": "bindchange",
                "type": "function",
                "defaultValue": "",
                "desc": "`<checkbox-group/>`中选中项发生改变是触发 change 事件，detail = {value:\\[选中的checkbox的value的数组\\]}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/checkbox.html"
        },
        "checkbox": {
            "attrs": [{
                "name": "value",
                "type": "string",
                "defaultValue": "",
                "desc": "`<checkbox/>`标识，选中时触发`<checkbox-group/>`的 change 事件，并携带 `<checkbox/>` 的 value"
            }, {
                "name": "disabled",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否禁用"
            }, {
                "name": "checked",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "当前是否选中，可用来设置默认选中"
            }, {
                "name": "color",
                "type": "string",
                "defaultValue": "",
                "desc": "checkbox的颜色，同css的color"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/checkbox.html"
        },
        "form": {
            "attrs": [{
                "name": "report-submit",
                "type": "boolean",
                "defaultValue": "",
                "desc": "是否返回 formId 用于发送[模板消息](https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html)"
            }, {
                "name": "bindsubmit",
                "type": "function",
                "defaultValue": "",
                "desc": "携带 form 中的数据触发 submit 事件，event.detail = {value : {'name': 'value'} , formId: ''}"
            }, {
                "name": "bindreset",
                "type": "function",
                "defaultValue": "",
                "desc": "表单重置时会触发 reset 事件"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/form.html"
        },
        "input": {
            "attrs": [{
                "name": "value",
                "type": "string",
                "defaultValue": "",
                "desc": "输入框的初始内容"
            }, {
                "name": "type",
                "type": "string",
                "defaultValue": "text",
                "desc": "input 的类型",
                "enum": [{
                    "value": "text",
                    "desc": "文本输入键盘"
                }, {
                    "value": "number",
                    "desc": "数字输入键盘"
                }, {
                    "value": "idcard",
                    "desc": "身份证输入键盘"
                }, {
                    "value": "digit",
                    "desc": "带小数点的数字键盘"
                }]
            }, {
                "name": "password",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否是密码类型"
            }, {
                "name": "placeholder",
                "type": "string",
                "defaultValue": "",
                "desc": "输入框为空时占位符"
            }, {
                "name": "placeholder-style",
                "type": "string",
                "defaultValue": "",
                "desc": "指定 placeholder 的样式"
            }, {
                "name": "placeholder-class",
                "type": "string",
                "defaultValue": "input-placeholder",
                "desc": "指定 placeholder 的样式类"
            }, {
                "name": "disabled",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否禁用"
            }, {
                "name": "maxlength",
                "type": "number",
                "defaultValue": "140",
                "desc": "最大输入长度，设置为 -1 的时候不限制最大长度"
            }, {
                "name": "cursor-spacing",
                "type": "number",
                "defaultValue": "0",
                "desc": "指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离"
            }, {
                "name": "auto-focus",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "(即将废弃，请直接使用 focus )自动聚焦，拉起键盘"
            }, {
                "name": "focus",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "获取焦点"
            }, {
                "name": "confirm-type",
                "type": "string",
                "defaultValue": "done",
                "desc": "设置键盘右下角按钮的文字",
                "enum": [{
                    "value": "send",
                    "desc": "右下角按钮为“发送”"
                }, {
                    "value": "search",
                    "desc": "右下角按钮为“搜索”"
                }, {
                    "value": "next",
                    "desc": "右下角按钮为“下一个”"
                }, {
                    "value": "go",
                    "desc": "右下角按钮为“前往”"
                }, {
                    "value": "done",
                    "desc": "右下角按钮为“完成”"
                }]
            }, {
                "name": "confirm-hold",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "点击键盘右下角按钮时是否保持键盘不收起"
            }, {
                "name": "cursor",
                "type": "number",
                "defaultValue": "",
                "desc": "指定focus时的光标位置"
            }, {
                "name": "selection-start",
                "type": "number",
                "defaultValue": "-1",
                "desc": "光标起始位置，自动聚集时有效，需与selection-end搭配使用"
            }, {
                "name": "selection-end",
                "type": "number",
                "defaultValue": "-1",
                "desc": "光标结束位置，自动聚集时有效，需与selection-start搭配使用"
            }, {
                "name": "adjust-position",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "键盘弹起时，是否自动上推页面"
            }, {
                "name": "bindinput",
                "type": "function",
                "defaultValue": "",
                "desc": "当键盘输入时，触发input事件，event.detail = {value, cursor}，处理函数可以直接 return 一个字符串，将替换输入框的内容。"
            }, {
                "name": "bindfocus",
                "type": "function",
                "defaultValue": "",
                "desc": "输入框聚焦时触发，event.detail = { value, height }，height 参数在基础库 1.9.90 起支持"
            }, {
                "name": "bindblur",
                "type": "function",
                "defaultValue": "",
                "desc": "输入框失去焦点时触发，event.detail = {value: value}"
            }, {
                "name": "bindconfirm",
                "type": "function",
                "defaultValue": "",
                "desc": "点击完成按钮时触发，event.detail = {value: value}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/input.html"
        },
        "label": {
            "attrs": [{
                "name": "for",
                "type": "string",
                "defaultValue": "",
                "desc": "绑定控件的 id"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/label.html"
        },
        "picker": {
            "attrs": [{
                "name": "mode",
                "type": "string",
                "defaultValue": "selector",
                "desc": "选择器的类型"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker.html"
        },
        "picker-view": {
            "attrs": [{
                "name": "value",
                "type": "number[]",
                "defaultValue": "",
                "desc": "数组中的数字依次表示 picker-view 内的 picker-view-colume 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。"
            }, {
                "name": "indicator-style",
                "type": "string",
                "defaultValue": "",
                "desc": "设置选择器中间选中框的样式"
            }, {
                "name": "indicator-class",
                "type": "string",
                "defaultValue": "",
                "desc": "设置选择器中间选中框的类名"
            }, {
                "name": "mask-style",
                "type": "string",
                "defaultValue": "",
                "desc": "设置蒙层的样式"
            }, {
                "name": "mask-class",
                "type": "string",
                "defaultValue": "",
                "desc": "设置蒙层的类名"
            }, {
                "name": "bindchange",
                "type": "function",
                "defaultValue": "",
                "desc": "当滚动选择，value 改变时触发 change 事件，event.detail = {value: value}；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker-view.html"
        },
        "picker-view-column": {
            "attrs": [],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker-view.html"
        },
        "radio-group": {
            "attrs": [{
                "name": "bindchange",
                "type": "function",
                "defaultValue": "",
                "desc": "`<radio-group/>` 中的选中项发生变化时触发 change 事件，event.detail = {value: 选中项radio的value}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/radio.html"
        },
        "radio": {
            "attrs": [{
                "name": "value",
                "type": "string",
                "defaultValue": "",
                "desc": "`<radio/>` 标识。当该`<radio/>` 选中时，`<radio-group/>` 的 change 事件会携带`<radio/>`的value"
            }, {
                "name": "checked",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "当前是否选中"
            }, {
                "name": "disabled",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否禁用"
            }, {
                "name": "color",
                "type": "string",
                "defaultValue": "",
                "desc": "radio的颜色，同css的color"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/radio.html"
        },
        "slider": {
            "attrs": [{
                "name": "min",
                "type": "number",
                "defaultValue": "0",
                "desc": "最小值"
            }, {
                "name": "max",
                "type": "number",
                "defaultValue": "100",
                "desc": "最大值"
            }, {
                "name": "step",
                "type": "number",
                "defaultValue": "1",
                "desc": "步长，取值必须大于 0，并且可被(max - min)整除"
            }, {
                "name": "disabled",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否禁用"
            }, {
                "name": "value",
                "type": "number",
                "defaultValue": "0",
                "desc": "当前取值"
            }, {
                "name": "color",
                "type": "string",
                "defaultValue": "#e9e9e9",
                "desc": "背景条的颜色（请使用 backgroundColor）"
            }, {
                "name": "selected-color",
                "type": "string",
                "defaultValue": "#1aad19",
                "desc": "已选择的颜色（请使用 activeColor）"
            }, {
                "name": "activeColor",
                "type": "string",
                "defaultValue": "#1aad19",
                "desc": "已选择的颜色"
            }, {
                "name": "backgroundColor",
                "type": "string",
                "defaultValue": "#e9e9e9",
                "desc": "背景条的颜色"
            }, {
                "name": "block-size",
                "type": "number",
                "defaultValue": "28",
                "desc": "滑块的大小，取值范围为 12 - 28"
            }, {
                "name": "block-color",
                "type": "string",
                "defaultValue": "#ffffff",
                "desc": "滑块的颜色"
            }, {
                "name": "show-value",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否显示当前 value"
            }, {
                "name": "bindchange",
                "type": "function",
                "defaultValue": "",
                "desc": "完成一次拖动后触发的事件，event.detail = {value: value}"
            }, {
                "name": "bindchanging",
                "type": "function",
                "defaultValue": "",
                "desc": "拖动过程中触发的事件，event.detail = {value: value}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/slider.html"
        },
        "switch": {
            "attrs": [{
                "name": "checked",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否选中"
            }, {
                "name": "type",
                "type": "string",
                "defaultValue": "switch",
                "desc": "样式，有效值：switch, checkbox"
            }, {
                "name": "bindchange",
                "type": "function",
                "defaultValue": "",
                "desc": "checked 改变时触发 change 事件，event.detail={ value:checked}"
            }, {
                "name": "color",
                "type": "string",
                "defaultValue": "",
                "desc": "switch 的颜色，同 css 的 color"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/switch.html"
        },
        "textarea": {
            "attrs": [{
                "name": "value",
                "type": "string",
                "defaultValue": "",
                "desc": "输入框的内容"
            }, {
                "name": "placeholder",
                "type": "string",
                "defaultValue": "",
                "desc": "输入框为空时占位符"
            }, {
                "name": "placeholder-style",
                "type": "string",
                "defaultValue": "",
                "desc": "指定 placeholder 的样式"
            }, {
                "name": "placeholder-class",
                "type": "string",
                "defaultValue": "textarea-placeholder",
                "desc": "指定 placeholder 的样式类"
            }, {
                "name": "disabled",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否禁用"
            }, {
                "name": "maxlength",
                "type": "number",
                "defaultValue": "140",
                "desc": "最大输入长度，设置为 -1 的时候不限制最大长度"
            }, {
                "name": "auto-focus",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "自动聚焦，拉起键盘。"
            }, {
                "name": "focus",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "获取焦点"
            }, {
                "name": "auto-height",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否自动增高，设置auto-height时，style.height不生效"
            }, {
                "name": "fixed",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "如果 textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true"
            }, {
                "name": "cursor-spacing",
                "type": "number",
                "defaultValue": "0",
                "desc": "指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离"
            }, {
                "name": "cursor",
                "type": "number",
                "defaultValue": "",
                "desc": "指定focus时的光标位置"
            }, {
                "name": "show-confirm-bar",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "是否显示键盘上方带有”完成“按钮那一栏"
            }, {
                "name": "selection-start",
                "type": "number",
                "defaultValue": "-1",
                "desc": "光标起始位置，自动聚集时有效，需与selection-end搭配使用"
            }, {
                "name": "selection-end",
                "type": "number",
                "defaultValue": "-1",
                "desc": "光标结束位置，自动聚集时有效，需与selection-start搭配使用"
            }, {
                "name": "adjust-position",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "键盘弹起时，是否自动上推页面"
            }, {
                "name": "bindfocus",
                "type": "function",
                "defaultValue": "",
                "desc": "输入框聚焦时触发，event.detail = { value, height }，height 参数在基础库 1.9.90 起支持"
            }, {
                "name": "bindblur",
                "type": "function",
                "defaultValue": "",
                "desc": "输入框失去焦点时触发，event.detail = {value, cursor}"
            }, {
                "name": "bindlinechange",
                "type": "function",
                "defaultValue": "",
                "desc": "输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}"
            }, {
                "name": "bindinput",
                "type": "function",
                "defaultValue": "",
                "desc": "当键盘输入时，触发 input 事件，event.detail = {value, cursor}， **bindinput 处理函数的返回值并不会反映到 textarea 上**"
            }, {
                "name": "bindconfirm",
                "type": "function",
                "defaultValue": "",
                "desc": "点击完成时， 触发 confirm 事件，event.detail = {value: value}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/textarea.html"
        },
        "navigator": {
            "attrs": [{
                "name": "url",
                "type": "string",
                "defaultValue": "",
                "desc": "应用内的跳转链接"
            }, {
                "name": "open-type",
                "type": "string",
                "defaultValue": "navigate",
                "desc": "跳转方式",
                "enum": [{
                    "value": "navigate",
                    "desc": "对应 `wx.navigateTo` 的功能"
                }, {
                    "value": "redirect",
                    "desc": "对应 `wx.redirectTo` 的功能"
                }, {
                    "value": "switchTab",
                    "desc": "对应 `wx.switchTab` 的功能"
                }, {
                    "value": "reLaunch",
                    "desc": "对应 `wx.reLaunch` 的功能"
                }, {
                    "value": "navigateBack",
                    "desc": "对应 `wx.navigateBack` 的功能"
                }]
            }, {
                "name": "delta",
                "type": "number",
                "defaultValue": "",
                "desc": "当 open-type 为 'navigateBack' 时有效，表示回退的层数"
            }, {
                "name": "hover-class",
                "type": "string",
                "defaultValue": "navigator-hover",
                "desc": "指定点击时的样式类，当`hover-class=\"none\"`时，没有点击态效果"
            }, {
                "name": "hover-stop-propagation",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "指定是否阻止本节点的祖先节点出现点击态"
            }, {
                "name": "hover-start-time",
                "type": "number",
                "defaultValue": "50",
                "desc": "按住后多久出现点击态，单位毫秒"
            }, {
                "name": "hover-stay-time",
                "type": "number",
                "defaultValue": "600",
                "desc": "手指松开后点击态保留时间，单位毫秒"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/navigator.html"
        },
        "audio": {
            "attrs": [{
                "name": "id",
                "type": "string",
                "defaultValue": "",
                "desc": "audio 组件的唯一标识符"
            }, {
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": "要播放音频的资源地址"
            }, {
                "name": "loop",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否循环播放"
            }, {
                "name": "controls",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否显示默认控件"
            }, {
                "name": "poster",
                "type": "string",
                "defaultValue": "",
                "desc": "默认控件上的音频封面的图片资源地址，如果 controls 属性值为 false 则设置 poster 无效"
            }, {
                "name": "name",
                "type": "string",
                "defaultValue": "未知音频",
                "desc": "默认控件上的音频名字，如果 controls 属性值为 false 则设置 name 无效"
            }, {
                "name": "author",
                "type": "string",
                "defaultValue": "未知作者",
                "desc": "默认控件上的作者名字，如果 controls 属性值为 false 则设置 author 无效"
            }, {
                "name": "binderror",
                "type": "function",
                "defaultValue": "",
                "desc": "当发生错误时触发 error 事件，detail = {errMsg: MediaError.code}"
            }, {
                "name": "bindplay",
                "type": "function",
                "defaultValue": "",
                "desc": "当开始/继续播放时触发play事件"
            }, {
                "name": "bindpause",
                "type": "function",
                "defaultValue": "",
                "desc": "当暂停播放时触发 pause 事件"
            }, {
                "name": "bindtimeupdate",
                "type": "function",
                "defaultValue": "",
                "desc": "当播放进度改变时触发 timeupdate 事件，detail = {currentTime, duration}"
            }, {
                "name": "bindended",
                "type": "function",
                "defaultValue": "",
                "desc": "当播放到末尾时触发 ended 事件"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/audio.html"
        },
        "image": {
            "attrs": [{
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": "图片资源地址"
            }, {
                "name": "mode",
                "type": "string",
                "defaultValue": "'scaleToFill'",
                "desc": "图片裁剪、缩放的模式",
                "enum": [{
                    "value": "scaleToFill",
                    "desc": "缩放: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/1.png?t=201838)"
                }, {
                    "value": "aspectFit",
                    "desc": "缩放: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/2.png?t=201838)"
                }, {
                    "value": "aspectFill",
                    "desc": "缩放: 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/3.png?t=201838)"
                }, {
                    "value": "widthFix",
                    "desc": "缩放: 宽度不变，高度自动变化，保持原图宽高比不变"
                }, {
                    "value": "top",
                    "desc": "裁剪: 不缩放图片，只显示图片的顶部区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/4.png?t=201838)"
                }, {
                    "value": "bottom",
                    "desc": "裁剪: 不缩放图片，只显示图片的底部区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/5.png?t=201838)"
                }, {
                    "value": "center",
                    "desc": "裁剪: 不缩放图片，只显示图片的中间区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/6.png?t=201838)"
                }, {
                    "value": "left",
                    "desc": "裁剪: 不缩放图片，只显示图片的左边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/7.png?t=201838)"
                }, {
                    "value": "right",
                    "desc": "裁剪: 不缩放图片，只显示图片的右边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/8.png?t=201838)"
                }, {
                    "value": "top left",
                    "desc": "裁剪: 不缩放图片，只显示图片的左上边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/9.png?t=201838)"
                }, {
                    "value": "top right",
                    "desc": "裁剪: 不缩放图片，只显示图片的右上边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/10.png?t=201838)"
                }, {
                    "value": "bottom left",
                    "desc": "裁剪: 不缩放图片，只显示图片的左下边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/11.png?t=201838)"
                }, {
                    "value": "bottom right",
                    "desc": "裁剪: 不缩放图片，只显示图片的右下边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg?t=201838) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/12.png?t=201838)"
                }]
            }, {
                "name": "lazy-load",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "图片懒加载。只针对page与scroll-view下的image有效"
            }, {
                "name": "binderror",
                "type": "function",
                "defaultValue": "",
                "desc": "当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}"
            }, {
                "name": "bindload",
                "type": "function",
                "defaultValue": "",
                "desc": "当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html"
        },
        "video": {
            "attrs": [{
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": "要播放视频的资源地址"
            }, {
                "name": "initial-time",
                "type": "number",
                "defaultValue": "",
                "desc": "指定视频初始播放位置"
            }, {
                "name": "duration",
                "type": "number",
                "defaultValue": "",
                "desc": "指定视频时长"
            }, {
                "name": "controls",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "是否显示默认播放控件（播放/暂停按钮、播放进度、时间）"
            }, {
                "name": "danmu-list",
                "type": "ArrayObject",
                "defaultValue": "",
                "desc": "弹幕列表"
            }, {
                "name": "danmu-btn",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否显示弹幕按钮，只在初始化时有效，不能动态变更"
            }, {
                "name": "enable-danmu",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否展示弹幕，只在初始化时有效，不能动态变更"
            }, {
                "name": "autoplay",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否自动播放"
            }, {
                "name": "loop",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否循环播放"
            }, {
                "name": "muted",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否静音播放"
            }, {
                "name": "page-gesture",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "在非全屏模式下，是否开启亮度与音量调节手势"
            }, {
                "name": "direction",
                "type": "number",
                "defaultValue": "",
                "desc": "设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）"
            }, {
                "name": "show-progress",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "若不设置，宽度大于240时才会显示"
            }, {
                "name": "show-fullscreen-btn",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "是否显示全屏按钮"
            }, {
                "name": "show-play-btn",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "是否显示视频底部控制栏的播放按钮"
            }, {
                "name": "show-center-play-btn",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "是否显示视频中间的播放按钮"
            }, {
                "name": "enable-progress-gesture",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "是否开启控制进度的手势"
            }, {
                "name": "objectFit",
                "type": "string",
                "defaultValue": "contain",
                "desc": "当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖"
            }, {
                "name": "poster",
                "type": "string",
                "defaultValue": "",
                "desc": "视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效"
            }, {
                "name": "bindplay",
                "type": "function",
                "defaultValue": "",
                "desc": "当开始/继续播放时触发play事件"
            }, {
                "name": "bindpause",
                "type": "function",
                "defaultValue": "",
                "desc": "当暂停播放时触发 pause 事件"
            }, {
                "name": "bindended",
                "type": "function",
                "defaultValue": "",
                "desc": "当播放到末尾时触发 ended 事件"
            }, {
                "name": "bindtimeupdate",
                "type": "function",
                "defaultValue": "",
                "desc": "播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次"
            }, {
                "name": "bindfullscreenchange",
                "type": "function",
                "defaultValue": "",
                "desc": "当视频进入和退出全屏是触发，event.detail = {fullScreen, direction}，direction取为 vertical 或 horizontal"
            }, {
                "name": "bindwaiting",
                "type": "function",
                "defaultValue": "",
                "desc": "视频出现缓冲时触发"
            }, {
                "name": "binderror",
                "type": "function",
                "defaultValue": "",
                "desc": "视频播放出错时触发"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/video.html"
        },
        "camera": {
            "attrs": [{
                "name": "device-position",
                "type": "string",
                "defaultValue": "back",
                "desc": "前置或后置，值为front, back"
            }, {
                "name": "flash",
                "type": "string",
                "defaultValue": "auto",
                "desc": "闪光灯，值为auto, on, off"
            }, {
                "name": "bindstop",
                "type": "function",
                "defaultValue": "",
                "desc": "摄像头在非正常终止时触发，如退出后台等情况"
            }, {
                "name": "binderror",
                "type": "function",
                "defaultValue": "",
                "desc": "用户不允许使用摄像头时触发"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/camera.html"
        },
        "live-player": {
            "attrs": [{
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": "音视频地址。目前仅支持 flv, rtmp 格式"
            }, {
                "name": "mode",
                "type": "string",
                "defaultValue": "live",
                "desc": "live（直播），RTC（实时通话）"
            }, {
                "name": "autoplay",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "自动播放"
            }, {
                "name": "muted",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否静音"
            }, {
                "name": "orientation",
                "type": "string",
                "defaultValue": "vertical",
                "desc": "画面方向，可选值有 vertical，horizontal"
            }, {
                "name": "object-fit",
                "type": "string",
                "defaultValue": "contain",
                "desc": "填充模式，可选值有 contain，fillCrop"
            }, {
                "name": "background-mute",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "进入后台时是否静音"
            }, {
                "name": "min-cache",
                "type": "number",
                "defaultValue": "1",
                "desc": "最小缓冲区，单位s"
            }, {
                "name": "max-cache",
                "type": "number",
                "defaultValue": "3",
                "desc": "最大缓冲区，单位s"
            }, {
                "name": "bindstatechange",
                "type": "function",
                "defaultValue": "",
                "desc": "播放状态变化事件，detail = {code}"
            }, {
                "name": "bindfullscreenchange",
                "type": "function",
                "defaultValue": "",
                "desc": "全屏变化事件，detail = {direction, fullScreen}"
            }, {
                "name": "bindnetstatus",
                "type": "function",
                "defaultValue": "",
                "desc": "网络状态通知，detail = {info}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/live-player.html"
        },
        "live-pusher": {
            "attrs": [{
                "name": "url",
                "type": "string",
                "defaultValue": "",
                "desc": "推流地址。目前仅支持 flv, rtmp 格式"
            }, {
                "name": "mode",
                "type": "string",
                "defaultValue": "RTC",
                "desc": "SD（标清）, HD（高清）, FHD（超清）, RTC（实时通话）"
            }, {
                "name": "autopush",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "自动推流"
            }, {
                "name": "muted",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "是否静音"
            }, {
                "name": "enable-camera",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "开启摄像头"
            }, {
                "name": "auto-focus",
                "type": "boolean",
                "defaultValue": "true",
                "desc": "自动聚集"
            }, {
                "name": "orientation",
                "type": "string",
                "defaultValue": "vertical",
                "desc": "vertical，horizontal"
            }, {
                "name": "beauty",
                "type": "number",
                "defaultValue": "0",
                "desc": "美颜"
            }, {
                "name": "whiteness",
                "type": "number",
                "defaultValue": "0",
                "desc": "美白"
            }, {
                "name": "aspect",
                "type": "string",
                "defaultValue": "9:16",
                "desc": "宽高比，可选值有 3:4, 9:16"
            }, {
                "name": "min-bitrate",
                "type": "number",
                "defaultValue": "200",
                "desc": "最小码率"
            }, {
                "name": "max-bitrate",
                "type": "number",
                "defaultValue": "1000",
                "desc": "最大码率"
            }, {
                "name": "waiting-image",
                "type": "string",
                "defaultValue": "",
                "desc": "进入后台时推流的等待画面"
            }, {
                "name": "waiting-image-md5",
                "type": "string",
                "defaultValue": "",
                "desc": "等待画面资源的MD5值"
            }, {
                "name": "background-mute",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "进入后台时是否静音"
            }, {
                "name": "bindstatechange",
                "type": "function",
                "defaultValue": "",
                "desc": "状态变化事件，detail = {code}"
            }, {
                "name": "bindnetstatus",
                "type": "function",
                "defaultValue": "",
                "desc": "网络状态通知，detail = {info}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/live-pusher.html"
        },
        "map": {
            "attrs": [{
                "name": "longitude",
                "type": "number",
                "defaultValue": "",
                "desc": "中心经度"
            }, {
                "name": "latitude",
                "type": "number",
                "defaultValue": "",
                "desc": "中心纬度"
            }, {
                "name": "scale",
                "type": "number",
                "defaultValue": "16",
                "desc": "缩放级别，取值范围为5-18"
            }, {
                "name": "markers",
                "type": "Object",
                "defaultValue": "",
                "desc": "标记点"
            }, {
                "name": "covers",
                "type": "any[]",
                "defaultValue": "",
                "desc": "**即将移除，请使用 markers**"
            }, {
                "name": "polyline",
                "type": "Object",
                "defaultValue": "",
                "desc": "路线"
            }, {
                "name": "circles",
                "type": "Object",
                "defaultValue": "",
                "desc": "圆"
            }, {
                "name": "controls",
                "type": "Object",
                "defaultValue": "",
                "desc": "控件"
            }, {
                "name": "include-points",
                "type": "any[]",
                "defaultValue": "",
                "desc": "缩放视野以包含所有给定的坐标点"
            }, {
                "name": "show-location",
                "type": "boolean",
                "defaultValue": "",
                "desc": "显示带有方向的当前定位点"
            }, {
                "name": "bindmarkertap",
                "type": "function",
                "defaultValue": "",
                "desc": "点击标记点时触发"
            }, {
                "name": "bindcallouttap",
                "type": "function",
                "defaultValue": "",
                "desc": "点击标记点对应的气泡时触发"
            }, {
                "name": "bindcontroltap",
                "type": "function",
                "defaultValue": "",
                "desc": "点击控件时触发"
            }, {
                "name": "bindregionchange",
                "type": "function",
                "defaultValue": "",
                "desc": "视野发生变化时触发"
            }, {
                "name": "bindtap",
                "type": "function",
                "defaultValue": "",
                "desc": "点击地图时触发"
            }, {
                "name": "bindupdated",
                "type": "function",
                "defaultValue": "",
                "desc": "在地图渲染更新完成时触发"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/map.html"
        },
        "canvas": {
            "attrs": [{
                "name": "canvas-id",
                "type": "string",
                "defaultValue": "",
                "desc": "canvas 组件的唯一标识符"
            }, {
                "name": "disable-scroll",
                "type": "boolean",
                "defaultValue": "false",
                "desc": "当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新"
            }, {
                "name": "bindtouchstart",
                "type": "function",
                "defaultValue": "",
                "desc": "手指触摸动作开始"
            }, {
                "name": "bindtouchmove",
                "type": "function",
                "defaultValue": "",
                "desc": "手指触摸后移动"
            }, {
                "name": "bindtouchend",
                "type": "function",
                "defaultValue": "",
                "desc": "手指触摸动作结束"
            }, {
                "name": "bindtouchcancel",
                "type": "function",
                "defaultValue": "",
                "desc": "手指触摸动作被打断，如来电提醒，弹窗"
            }, {
                "name": "bindlongtap",
                "type": "function",
                "defaultValue": "",
                "desc": "手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动"
            }, {
                "name": "binderror",
                "type": "function",
                "defaultValue": "",
                "desc": "当发生错误时触发 error 事件，detail = {errMsg: 'something wrong'}"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/canvas.html"
        },
        "open-data": {
            "attrs": [{
                "name": "type",
                "type": "string",
                "defaultValue": "",
                "desc": "开放数据类型",
                "enum": [{
                    "value": "groupName",
                    "desc": "拉取群名称"
                }, {
                    "value": "userNickName",
                    "desc": "用户昵称"
                }, {
                    "value": "userAvatarUrl",
                    "desc": "用户头像"
                }, {
                    "value": "userGender",
                    "desc": "用户性别"
                }, {
                    "value": "userCity",
                    "desc": "用户所在城市"
                }, {
                    "value": "userProvince",
                    "desc": "用户所在省份"
                }, {
                    "value": "userCountry",
                    "desc": "用户所在国家"
                }, {
                    "value": "userLanguage",
                    "desc": "用户的语言"
                }]
            }, {
                "name": "open-gid",
                "type": "string",
                "defaultValue": "",
                "desc": "当 type=\"groupName\" 时生效, 群id"
            }, {
                "name": "lang",
                "type": "string",
                "defaultValue": "en",
                "desc": "当 type=\"user*\" 时生效，以哪种语言展示 userInfo，有效值有：en, zh_CN, zh_TW"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/open-data.html"
        },
        "web-view": {
            "attrs": [{
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": "webview 指向网页的链接。需登录[小程序管理后台](https://mp.weixin.qq.com/)配置域名白名单。"
            }, {
                "name": "bindmessage",
                "type": "function",
                "defaultValue": "",
                "desc": "网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。e.detail = { data }"
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/web-view.html"
        },
        "slot": {
            "attrs": [{
                "name": "name",
                "type": "string",
                "defaultValue": "",
                "desc": ""
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6wxml%E7%9A%84slot"
        },
        "template": {
            "attrs": [{
                "name": "name",
                "type": "string",
                "defaultValue": "",
                "desc": ""
            }, {
                "name": "is",
                "type": "string",
                "defaultValue": "",
                "desc": ""
            }, {
                "name": "data",
                "type": "any",
                "defaultValue": "",
                "desc": ""
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/template.html"
        },
        "block": {
            "attrs": [],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/conditional.html#block-wxif"
        },
        "import": {
            "attrs": [{
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": ""
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/import.html#import"
        },
        "include": {
            "attrs": [{
                "name": "src",
                "type": "string",
                "defaultValue": "",
                "desc": ""
            }],
            "docLink": "https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/import.html#include"
        }
    }

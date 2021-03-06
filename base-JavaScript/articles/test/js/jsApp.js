//所有的对象、方法的声明都放到一个匿名函数中进行，是为了防止过多垃圾变量污染Window对象。
//另外在该匿名函数中传递window对象作为参数，是为了在进行压缩时减少window关键字所占用的字节。
(function(window){

    //声明相关变量
    var 

        //声明document、location、undefined等对象或特殊值的替代变量，一是为了减少使用他们时从window对象中查找所需的时间，二是为了在进行压缩时减少字节。
        document = window.document,
        location = window.location,
        navigator = window.navigator,
        undefined = undefined,
        
        //用于ready方法存放处理程序集合
        readyList = [],

        //简化需要多处使用的对象量
        stringPrototype = String.prototype,
        arrayPrototype = Array.prototype,
        emptyArray = [],
        slice = emptyArray.slice,

        /**
         * 为jsApp中的原型方法执行全局检索操作
         * <br />原型方法通常需要针对检索对象的元素集合都执行同一操作，通过该函数可进行统一调配。
         * <br />原型方法通常需要涉及DOM元素的操作，通过该函数可在回调函数执行前判断目标元素的有无，从而确保回调函数中代码执行正确。
         * <br />在回调函数中，this指向检索对象本身，第一个参数代表目标元素在元素集合中的索引值，第二个参数则代表目标元素。
         * @param  {Object}   match    需要进行检索的对象（即jsApp的某个对象实例）
         * @param  {Function} callback 回调函数
         * @return {Object|Others}     如果检索对象中的元素集合为空，则返回检索对象本身；如果不为空，则返回元素集合中第一个元素执行回调函数后所返回的结果。
         */
        map = function(match, callback)
        {
            var i = 1, len;

            if(jsApp.likeArray(match))
            {
                for(len = match.length; i < len; i++)
                {
                    callback.call(match, i, match[i]);
                }
                return callback.call(match, 0, match[0]);
            }
            return match;
        },

        /**
         * 将“数组”形式的元素集合加入到jsApp实例对象
         * @param  {NodeList|Array} nodes  元素集合
         */
        makeIn = function(nodes)
        {
            var i = 0, len, amount;
            if(jsApp.likeArray(nodes) && (len = nodes.length) > 0)
            {
                amount = this.length || 0;
                this.length = len + amount;
                for(; i < len; i++)
                {
                    this[amount + i] = nodes[i];
                }
            }
        },

        /**
         * 执行readyList列表
         */
        doReady = function()
        {
            jsApp.each(readyList, function(index, callback)
            {
                callback();
            });
            document.addEventListener && document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        },

        /**
         * DomContentLoaded事件的兼容处理
         */
        DomContentLoaded = function()
        {
            if(document.addEventListener)
            {
                //标准事件模型（IE9+、Chrome、Safari、Firefox、Opera）
                document.addEventListener("DOMContentLoaded", doReady, false);
                return;
            }
            //兼容IE6、7、8，原理是因为在IE浏览器中DOM未加载完成时调用doScroll方法，会产生异常。参考地址：http://javascript.nwbox.com/IEContentLoaded/
            var checkReady = function()
            {
                try
                {
                    document.documentElement.doScroll('left');
                }
                catch(e)
                {
                    setTimeout(checkReady, 10);
                    return;
                }
                doReady();
            }
            checkReady();
        },

        /**
         * 对事件对象进行重写
         * @param  {Object} e 重写前的事件对象
         * @return {Object}   重写后的事件对象
         */
        rewriteEvent = function(e)
        {
            e = e || window.event;
            var type = e.type, 
            target = e.target || e.srcElement,
            compatible = {

                //事件类型，即事件的名称，如：click、dblclick、mouseover
                type: type,

                //事件目标，即用户的操作是基于哪一个目标元素进行的
                target : target,

                //Ctrl键是否按下
                ctrlKey: e.ctrlKey,

                //Shift键是否按下
                shiftKey: e.shiftKey,

                //Alt键是否按下
                altKey: e.altKey,

                //防止事件冒泡
                stopPropagation: function()
                {
                    "stopPropagation" in e ? e.stopPropagation() : (e.cancelBubble  = true);
                },

                //取消默认行为
                preventDefault: function()
                {
                    "preventDefault" in e ? e.preventDefault() : (e.returnValue = false);
                }
            };

            //鼠标事件
            if(/mouse|click/gi.test(type))
            {
                //作用于鼠标事件, 对于mouseover而言表示从哪个DOM元素进来，而对于mouseout而言则表示鼠标着落在那个DOM元素
                compatible.relatedTarget = e.relatedTarget === undefined ? (type === "mouseover" ? e.fromElement : e.toElement) : e.relatedTarget;

                //鼠标相对于目标元素的X轴坐标位置（由于offsetX和offsetY并没有被加入标准，所以Firefox浏览器并不支持这两个属性）
                compatible.offsetX = e.offsetX === undefined ? (e.clientX - target.getBoundingClientRect().left) : e.offsetX;

                //鼠标相对于目标元素的Y轴坐标位置
                compatible.offsetY = e.offsetY === undefined ? (e.clientY - target.getBoundingClientRect().top) : e.offsetY;

                //鼠标相对于文档显示区的X轴坐标位置
                compatible.clientX = e.clientX;

                //鼠标相对于文档显示区的Y轴坐标位置
                compatible.clientY = e.clientY;

                //鼠标相对于整个页面的X轴坐标位置（pageX和pageY在IE6/7/8中没有得到支持）
                compatible.pageX = e.pageX === undefined ? (document.documentElement.scrollLeft + event.clientX) : e.pageX;

                //鼠标相对于整个页面的Y轴坐标位置
                compatible.pageY = e.pageY === undefined ? (document.documentElement.scrollTop + event.clientY) : e.pageY;

                //鼠标相对于屏幕的X坐标位置
                compatible.screenX = e.screenX;

                //鼠标相对于屏幕的Y坐标位置
                compatible.screenY = e.screenY;

                //判断鼠标所按的是哪个键（0—左键；1—中间键；2—右键）
                if(document.implementation.hasFeature("MouseEvents", "2.0"))
                {
                    compatible.button = e.button;
                }
                else
                {
                    //在非标准的IE6/7/8事件模型下，按键有7个值
                    switch(e.button)
                    {
                        case 0:
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                            compatible.button =  0;
                            break;
                        case 2:
                        case 6:
                            compatible.button =  2;
                            break;
                        case 4:
                            compatible.button =  1;
                            break;
                    }
                }
            }
            //键盘按键事件的兼容性处理
            else if(/key/gi.test(type))
            {
                //键盘按键的键码值
                compatible.keyCode = e.keyCode === 0 ? e.charCode : e.keyCode;
            }

            return compatible;
        },

        /**
         * 获取目标元素的后一相邻节点，如果不存在则返回null
         * @param  {HTMLElement}   ele 目标元素
         * @return {HTMLElement}   后一相邻节点
         */
        nextSibling = function(ele)
        {
            return ele.nodeType ?
                ("nextElementSibling" in ele ? ele.nextElementSibling : ele.nextSibling) : null;
        },

        /**
         * 获取目标元素的前一相邻节点，如果不存在则返回null
         * @param  {HTMLElement}   ele 目标元素
         * @return {HTMLElement}   前一相邻节点
         */
        previousSibling = function(ele)
        {
            return ele.nodeType ?
                ("previousElementSibling" in ele ? ele.previousElementSibling : ele.previousSibling) : null;
        },

        /**
         * 获取目标元素的第一个子节点，如果不存在则返回null
         * @param  {HTMLElement}   ele 目标元素
         * @return {HTMLElement}   后一相邻节点
         */
        firstChild = function(ele)
        {
            return ele.nodeType ?
                ("firstElementChild" in ele ? ele.firstElementChild : ele.firstChild) : null;
        },

        /**
         * 获取目标元素的最后一个子节点，如果不存在则返回null
         * @param  {HTMLElement}   ele 目标元素
         * @return {HTMLElement}   后一相邻节点
         */
        lastChild = function(ele)
        {
            return ele.nodeType ?
                ("lastElementChild" in ele ? ele.lastElementChild : ele.lastChild) : null;
        },

        /**
         * 返回指定类名的正则匹配表达式
         * @param  {String} name 指定类名
         * @return {RegExp}      正则匹配表达式
         */
        classReg = function(name)
        {
            return new RegExp("(^|\\s)+" + name + "(\\s|$)+", "g");
        },

        /**
         * 将通过“-”链接的字符串转为换驼峰式，如“font-size”转换为“fontSize”。
         * @param  {String} str 需要转换的字符串
         * @return {String}     原字符串的驼峰形式
         */
        camelCase = function(str)
        {
            //IE的浏览器私有属性前缀没有驼峰化
            return str.replace(/^-ms-/, "ms-").replace(/-+(.)?/g, function(match, item)
            {
                return item ? item.toUpperCase() : "";
            });
        },

        /**
         * 将驼峰式字符串转换为连字符式，如“fontSize”转换为“font-size”
         * @param  {String} str 需要转换的字符串
         * @return {String}     原字符串的连字符式
         */
        dashCase = function(str)
        {
            return /-/.test(str) ? str.toLowerCase() : str.replace(/([A-Z])/g, "-$1").toLowerCase();
        },

        /**
         * 设置CSS样式时的兼容性选操作
         * @param  {String} name  样式的名称
         * @param  {String} value 样式的值
         * @return {String}       样式设置字符串（如：“font-size:12px”）
         */
        cssString = function(name, value)
        {
            var result = "";

            switch(name)
            {
                //透明度（IE8以及更低版本中不支持document.addEventListener，且不支持opacity透明度属性）
                case "opacity":

                    result = !document.addEventListener ? "filter:alpha(opacity=" + value*100 + ")" : "opacity:" + value; 
                    break;

                //其他
                default:

                    result = dashCase(name) + ":" + value;
            }
            return result;
        },

        /**
         * 获取CSS样式时的兼容性筛选操作
         * @param  {HTMLElement} 目标节点
         * @param  {String} name 样式的名称
         * @param  {Object}      样式对象
         * @return {String}      样式的值
         */
        getCSS = function(ele, name, currentStyle)
        {
            var result;

            switch(name)
            {
                //透明度（IE8以及更低版本中不支持document.addEventListener，且不支持opacity透明度属性）
                case "opacity":

                    result = !document.addEventListener ? (ele.filters.alpha ? ele.filters.alpha.opacity / 100 : 1) : currentStyle[name]; 
                    break;

                //浮动（IE支持styleFloat访问，其他浏览器支持cssFloat访问）
                case "float":

                    result = ele.style.styleFloat === undefined ? currentStyle["cssFloat"] : currentStyle["styleFloat"];
                    break;

                //其他
                default:

                    result = currentStyle[name];
            }

            if(result === "auto" && /width|height/.test(name))
            {
                //给IE设置width、height的属性值为auto时，即使使用计算后的样式对象也无法获取真实的值，在此使用.width()或.height方法进行重新获取。
                result = name === "width" ? jsApp(ele).width() : jsApp(ele).height();
            }
            return result;
        },

        /**
         * 构建基类jsApp
         * @class
         * @global
         * @param  {String|Function|Window|HTMLElement} selector 选择器（用来构建实例对象的基础组件）
         * @example
         * var ele = jsApp("#element_ID");  //初始化jsApp对象实例，并返回目标ID元素的封装集合
         */
        jsApp = function(selector)
        {
            return new jsApp.init(selector);
        };

    //初始化jsApp对象实例
    jsApp.init = function(selector)
    {
        var _self = this, ele, className, i, j, len;

        //如果不存在selector参数，或者为""、undefined、null、false、0等值时，不再执行后续操作
        if(!selector)
        {
            return;
        }

        //如果是HTML对象或者window对象
        if(selector.nodeType || selector === window)
        {
            _self[0] = selector;
            _self.length = 1;
            return;
        }

        //如果为字符串
        if(typeof(selector) === "string")
        {
            //如果为ID获取
            if(/^#[\w-]+/i.test(selector))
            {
                ele = document.getElementById(selector.substring(1));
                if(ele !== null)
                {
                    _self[0] = ele;
                    _self.length = 1;
                }
            }
            //根据标签元素获取
            else if(/^[a-z]+$/i.test(selector) || selector === "*")
            {
                ele = document.getElementsByTagName(selector);
                makeIn.call(_self, ele);
            }
            //根据类名获取
            else if(/^.[\w-]+$/i.test(selector))
            {
                className = selector.substring(1);
                if(document.getElementsByClassName)
                {
                    ele = document.getElementsByClassName(className);
                    makeIn.call(_self, ele);
                }
                else
                {
                    ele = document.getElementsByTagName("*");
                    for(i = j = 0, len = ele.length; i < len; i++)
                    {
                        if((" " + ele[i].className + " ").contains(" " + className + " "))
                        {
                            _self[j] = ele[i];
                            _self.length = ++j;
                        }
                    }
                }
            }
            //根据选择器获取
            else
            {
                if(document.querySelectorAll)
                {
                    ele = document.querySelectorAll(selector);
                    makeIn.call(_self, ele);
                }
                else if(!/[+>~\[]+/.test(selector)) /*IE6中使用不支持的选择器进行元素查找会造成浏览器假死*/
                {
                    document.styleSheets["jsApp_selectorStyle"].addRule(selector, "q:a", 0);  //为指定选择器元素添加样式
                    ele = document.getElementsByTagName("*");
                    for(i = j = 0, len = ele.length; i < len; i++)
                    {
                        if(ele[i].currentStyle.q === "a")
                        {
                            _self[j] = ele[i];
                            _self.length = j++;
                        }
                    }
                    document.styleSheets["jsApp_selectorStyle"].removeRule(0); //将添加的选择器样式移除
                }
            }
            return;
        }
        //如果为函数，则表示在DOM树加载完毕之后执行
        else if(jsApp.isFunction(selector))
        {
            _self.ready(selector);
        }

        //如果为数组
        jsApp.likeArray(selector) && makeIn.call(_self, selector);
    }

    //扩展jsApp对象的实例成员
    jsApp.fn = jsApp.prototype = /** @lends jsApp.prototype */{
        
        /**
         * 添加事件绑定
         * @param  {String} name    事件名称
         * @param  {Function} handler 事件处理程序
         * @param  {Boolean} [capture=false] 是否进行事件捕捉
         * @return {Function}         事件处理程序
         * @example
         * var testID_click = $("#testID").bind("click", function()
         * {
         *     alert("点击事件！");
         * });
         */
        bind: function(name, handler, capture)
        {
            return map(this, function(index, ele)
            {
                var callback = function(e)
                {
                    //通过中转实现各浏览器下this与事件对象的兼容性
                    e = rewriteEvent(e);
                    handler.call(e.target, e);
                };

                if(/mouseenter|mouseleave/i.test(name) && !("onmouseenter" in ele))
                {
                    // 兼容mouseenter和mouseleave事件（在Chrome和Safari中未得到支持），这两个事件不会发生冒泡，鼠标在子级元素的移动不会触发父级元素的相关事件。
                    name = name === "mouseenter" ? "mouseover" : "mouseout";
                    callback = function(e)
                    {
                        e = rewriteEvent(e);
                        var target = e.target;
                        var mouseTo = e.relatedTarget;

                        //如果相关目标不是目标元素的子元素且不是元素本身则继续执行
                        if(!ele.contains(mouseTo) && ele !== mouseTo)
                        {
                            handler.call(target, e);
                        }
                    };
                }

                document.addEventListener ? ele.addEventListener(name, callback, capture) : ele.attachEvent("on" + name, callback); 
                return callback;
            });
        },

        /**
         * 解除事件绑定
         * @param  {String} name    事件名称
         * @param  {Function} handler 事件处理程序
         * @param  {Boolean} [capture=false] 是否进行事件捕捉
         * @example
         * $("#testID").unbind("click", testID_click);
         */
        unbind: function(name, handler, capture)
        {
            return map(this, function(index, ele)
            {
                if(/mouseenter|mouseleave/i.test(name) && !("onmouseenter" in ele))
                {
                    name = name === "mouseenter" ? "mouseover" : "mouseout";
                }
                document.addEventListener ? ele.removeEventListener(name, handler, capture) : ele.detachEvent("on" + name, handler);
                return this;
            });
        },

        /**
         * DOM树加载完成时即执行通过ready添加的处理程序
         * <br />通过该方式添加的处理程序可以在形成完整的DOM树之后就触发，而不需要像load事件那样在所有页面元素全部加载完毕后才会触发，可以在页面下载的早期就添加事件处理程序，这意味着用户能够尽早地与页面进行交互。
         * @param  {Function} handler 需要绑定的处理程序
         * @return {Object}         实例对象本身
         */
        ready: function(handler)
        {
            //如果添加处理程序时DOM树已经加载完毕，那么1毫秒后自动执行（之所以使用定时器，是为了实现异步执行）
            var readyState = document.readyState;
            if(readyState === "interactive" || readyState === "complete")
            {
                return setTimeout(handler, 1);
            }

            //添加处理程序列表
            readyList.push(handler);
            if(readyList.length === 1)
            {
                //仅当第一次添加处理程序时才进行DomContentLoaded事件的监测。
                DomContentLoaded();
            }
            return this;
        },

        /**
         * 执行元素集合的遍历操作
         * <br />如果元素集合为空，则直接返回实例对象本身
         * <br />在回调函数中，this指向元素集合中当前索引的元素本身
         * @param {Function} callback 回调函数
         * @return {Object} 实例对象本身
         */
        each: function(callback)
        {
            this.length > 0 && jsApp.each(this, callback);
            return this;
        },

        /**
         * 获取元素集合中索引值从start起始位置到end结束位置之间（不包括end）的所有元素构建的新的jsApp对象。
         * <br />起始位置和结束位置，既可以是非负数，也可以是负数。当为非负数时，表示的是具体的索引位置；而为负数时，则表示的是倒数第几个元素。
         * <br />在获取结果之前，通常会将start和end两个参数转换为正确的索引位置。转换为正确的索引位置后：其中start必须位于end之前，否则获取的结果为空；且start必须为有效的索引位置，否则获取的结果也为空；end可以超出元素集合的长度也可以不提供该参数，此时的结果表示从start位置开始一直到元素集合的最后一个元素（包括该元素）；start和end参数都可以不提供，此时表示集合中的所有元素。。
         * <br />如果获取的结果为空，则直接返回实例对象本身。
         * @param  {Number} [start] 起始位置
         * @param  {Number} [end] 结束位置
         * @return {Object}       新的jsApp实例对象
         */
        slice: function(start, end)
        {
            if(this.length === undefined)
            {
                //如果原实例对象中没有元素集合，那么在给定start参数一个负数时，后续的操作可能抛出异常
                return this;
            }
            return jsApp(slice.apply(this, arguments));
        },

        /**
         * 获取元素集合中指定索引的元素构建的新的jsApp对象
         * <br />索引值为非负数时，表示索引值为index的那个元素
         * <br />索引值为负数时，则表示倒数第几个元素。例如：index参数为-1时，则表示元素集合中的最后一个元素。
         * <br />如果索引值不在范围内，则直接返回实例对象本身
         * @param  {Number} index 索引值
         * @return {Object} 新的jsApp实例对象
         */
        eq: function(index)
        {
            return index === -1 ? this.slice(index) : this.slice(index, index + 1);
        },

        /**
         * 获取元素集合中第一个元素构建的新的jsApp对象
         * <br />如果元素集合为空，则直接返回实例对象本身
         * @return {Object} 新的jsApp实例对象
         */
        first: function()
        {
            return this.slice(0, 1);
        },

        /**
         * 获取元素集合中最后一个元素构建的新的jsApp对象
         * <br />如果元素集合为空，则直接返回实例对象本身
         * @return {Object} 新的jsApp实例对象
         */
        last: function()
        {
            return this.slice(-1);
        },

        /**
         * 获取元素集合中每个元素后一相邻节点所构建的新的jsApp对象
         * <br />如果某个元素没有后一相邻节点，则不参加构建行为
         * @return {Object} 新的jsApp实例对象
         */
        next: function()
        {
            return this.newObj(function(index, ele)
            {
                return nextSibling(ele);
            });
        },

        /**
         * 获取元素集合中每个元素之后的所有兄弟节点所组成的新的jsApp对象
         * <br />如果某个元素没有后续兄弟节点，则不参加构建行为
         * @return {Object} 新的jsApp实例对象
         */
        nextAll: function()
        {
            return this.newObj(function(index, ele)
            {
                var result = [], obj = nextSibling(ele);
                while(obj !== null)
                {
                    result.push(obj);
                    obj = nextSibling(obj);
                }
                return result;
            });
        },

        /**
         * 获取元素集合中每个元素前一相邻节点所构建的新的jsApp对象
         * <br />如果某个元素没有前一相邻节点，则不参加构建行为
         * @return {Object} 新的jsApp实例对象
         */
        prev: function()
        {
            return this.newObj(function(index, ele)
            {
                return previousSibling(ele);
            });
        },

        /**
         * 获取元素集合中每个元素之前的所有兄弟节点所组成的新的jsApp对象
         * <br />如果某个元素没有兄弟节点，则不参加构建行为
         * @return {Object} 新的jsApp实例对象
         */
        prevAll: function()
        {
            return this.newObj(function(index, ele)
            {
                var result = [], obj = previousSibling(ele);
                while(obj !== null)
                {
                    result.push(obj);
                    obj = previousSibling(obj);
                }
                return result;
            });
        },

        /**
         * 获取元素集合中每个元素所有兄弟节点所组成的新的jsApp对象
         * @return {Object} 新的jsApp实例对象
         */
        siblings: function()
        {
            return this.newObj(function(index, ele)
            {
                return jsApp.makeArray(ele.parentNode.children).filter(function(item){ return item !== ele });
            });
        },
        
        /**
         * 获取元素集合中每个元素所有子节点所组成的新的jsApp对象
         * @return {Object} 新的jsApp实例对象
         */
        children: function()
        {
            return this.newObj(function(index, ele)
            {
                return ele.children;
            });
        },

        /**
         * 获取元素集合中每个元素的父节点所组成的新的jsApp对象
         * @return {Object} 新的jsApp实例对象
         */
        parent: function()
        {
            return this.newObj(function(index, ele)
            {
                return ele.parentNode;
            });
        },

        /**
         * 获取元素集合中每个元素的所有父节点（不包含根元素）所组成的新的jsApp对象
         * @return {Object} 新的jsApp实例对象
         */
        parents: function()
        {
            return this.newObj(function(index, ele)
            {
                var result = [], parent = ele.parentNode;
                while(parent !== null && parent !== document)
                {
                    result.push(parent);
                    parent = parent.parentNode;
                }
                return result;
            });
        },

        /**
         * 根据回调函数返回的元素、元素集合、元素数组创建新的jsApp对象
         * @param  {Function} callback 回调函数
         * @return {Object}            新的jsApp对象
         */
        newObj: function(callback)
        {
            var newObj = jsApp();
            jsApp.likeArray(this) && jsApp.each(this, function(index, ele)
            {
                var eles = callback.call(ele, index, ele);
                if(eles != null)
                {
                    makeIn.call(newObj, jsApp.likeArray(eles) ? eles : [eles]);
                }
            });
            return newObj;
        },

        /**
         * 获取目标元素的内部HTML文本内容，或者将目标元素的内部HTML文本替换成新的HTML文本
         * @param  {String} [html]  新的HTML文本
         * @return {String|Object}  当获取HTML文本内容时，返回字符串格式；<br />如果需要执行替换操作，则返回实例对象本身
         */
        html: function(html)
        {
            return map(this, function(index, ele)
            {
                if(html === undefined)
                {
                    return ele.innerHTML;
                }
                //替换操作
            });
        },

        /**
         * 获取目标元素的内部纯文本内容（即将HTML标记全部去除的结果），或者将目标元素的内容替换成新的文本内容（如果是HTML标记，将被进行转码处理）
         * @param  {String} [html]  新的文本内容
         * @return {String|Object}  当获取文本内容时，返回字符串格式；<br />如果需要执行替换操作，则返回实例对象本身
         */
        text: function(text)
        {
            return map(this, function(index, ele)
            {
                if(text === undefined)
                {
                    return ele.innerText || ele.textContent; //Firefox支持textContent，其他浏览器支持innerText
                }
                //替换操作
            });  
        },

        /**
         * 移除目标元素下的所有内容
         * @return {Object} 实例对象本身
         */
        empty: function()
        {
            return this.each(function(index, ele)
            {
                ele.innerHTML = '';
            });
        },

        /**
         * 将目标元素本身从文档中移除
         * @return {Object} 实例对象本身
         */
        remove: function()
        {
            return this.each(function(index, ele)
            {
                ele.parentNode && ele.parentNode.removeChild(ele);
            });
        },

        /**
         * 将相关节点或者HTML文本内容，作为子节点加入到目标元素内部的开头处
         * <br />如果参数为相关节点，则执行将该节点的移动操作，而非复制。
         * @param  {String|HTMLElement} node HTML文本内容或者相关节点
         * @return {Object}      实例对象本身
         */
        prepend: function(node)
        {
            return map(this, function(index, ele)
            {
                if(jsApp.isString(node))
                {
                    ele.insertAdjacentHTML("afterbegin", node);
                }
                else
                {

                }

                return this;
            });
        },

        /**
         * 将相关节点或者HTML文本内容，作为子节点加入到目标元素内部的末尾处
         * <br />如果参数为相关节点，则执行将该节点的移动操作，而非复制。
         * @param  {String|HTMLElement} node HTML文本内容或者相关节点
         * @return {Object}      实例对象本身
         */
        append: function(node)
        {

        },

        /**
         * 将相关节点或者HTML文本内容，作为兄弟节点加入到目标元素的前面
         * <br />如果参数为相关节点，则执行将该节点的移动操作，而非复制。
         * @param  {String|HTMLElement} node HTML文本内容或者相关节点
         * @return {Object}      实例对象本身
         */
        before: function(node)
        {

        },

        /**
         * 将相关节点或者HTML文本内容，作为兄弟节点加入到目标元素的后面
         * <br />如果参数为相关节点，则执行将该节点的移动操作，而非复制。
         * @param  {String|HTMLElement} node HTML文本内容或者相关节点
         * @return {Object}      实例对象本身
         */
        after: function(node)
        {

        },

        /**
         * 将目标元素替换成相关节点或者HTML文本内容
         * <br />如果参数为相关节点，则执行该节点的移动操作，而非复制。
         * @param  {String|HTMLElement} node HTML文本内容或者相关节点
         * @return {[type]}      [description]
         */
        replaceWith: function(node)
        {

        },

        /**
         * 功能1：当缺少[value]参数时，表示获取元素集合中第一个元素的某个或多个样式的值。如果需要返回多个样式的值，则样式的名称以数组形式给出，返回的结果为“属性-值”的JSON格式。
         * 功能2：当拥有[value]参数时，表示为元素集合中的每个元素设置相应样式的值。如果该参数为函数，则由函数返回最终需要赋予的样式值；在函数中分别传递索引值以及索引元素当前的样式值，this则指向索引元素。
         * 功能3：当[name]参数为Object时，表示为元素集合中的每个元素设置样式的值，且样式名称和对应的值来自Object。
         * 注意：如果获取的属性不存在，则返回undefined。
         * @param  {String|Array|Object} name  属性名称
         * @param  {String|Function} value 属性值
         * @return {String|Object}  获取的样式值|实例对象本身
         */
        css: function(name, value)
        {
            var result, obj, key;

            if(this.length < 1)
            {
                return this;
            }

            //获取单个或多个样式的值
            if(value === undefined)
            {
                obj = this[0];

                if(jsApp.isString(name))
                {
                    result = getCSS(obj, name);   
                }
                else if(jsApp.isArray(name))
                {
                    result = {};
                    name.forEach(function(item)
                    {
                        result[item] = getCSS(obj, item);
                    });
                }
                return result;
            }
            //设置单个样式的值
            else if(jsApp.isString(name))
            {
                if(jsApp.isString(value))
                {
                    css = ";" + cssString(name, value);
                }
                else if(jsApp.isFunction(value))
                {
                    return this.each(function(index, ele)
                    {
                        value = value.call(ele, index, getCSS(ele, name));
                        ele.style.cssText += ";" + cssString(name, value);
                    });
                }
            }

            //使用“样式名:值”的JSON格式进行赋值时
            for(key in name)
            {
                css += ";" + cssString(key, name[key]);
            }

            //将需要设置的样式属性通过cssText属性追加，从而减少重绘与回流的次数
            return this.each(function(index, ele)
            {
                ele.style.cssText += ";" + css;      
            });
        },

        /**
         * 为元素集合中的每个元素添加类名
         * <br />如果需要添加多个类名，则在字符串中使用空格隔开。
         * <br />如果参数为函数，则需要添加的类名字符串由函数进行返回；在函数中分别传递索引值以及索引元素当前的类名字符串，this则指向索引元素。
         * @param {String|Function} name 需要添加的类名
         * @return {Object}      实例对象本身
         */
        addClass: function(name)
        {
            return this.each(function(index, ele)
            {
                var classAdd = "", className = ele.className;

                if(jsApp.isFunction(name))
                {
                    name = name.call(ele, index, className);
                }

                //需要添加的类名必须是一个有效的字符串
                jsApp.isValidString(name) && name.trim().split(/\s+/).forEach(function(item)
                {
                    !classReg(item).test(className + classAdd) && (classAdd += " " + item);
                });

                ele.className += classAdd;
            });
        },

        /**
         * 为元素集合中的每个元素移除类名
         * <br />如果需要删除多个类名，则在字符串中使用空格隔开。
         * <br />如果没有参数，则表明移除元素中的所有类名。
         * <br />如果参数为函数，则需要删除的类名字符串由函数进行返回；在函数中分别传递索引值以及索引元素当前的类名字符串，this则指向索引元素。
         * @param {String|Function} [name] 需要移除的类名
         * @return {Object}     实例对象本身
         */
        removeClass: function(name)
        {
            return this.each(function(index, ele)
            {
                var className = ele.className;

                if(name === undefined)
                {
                    return ele.className = "";
                }

                if(jsApp.isFunction(name))
                {
                    name = name.call(ele, index, className);
                }
                
                //需要删除的类名必须是一个有效的字符串
                if(jsApp.isValidString(name))
                {
                    name.trim().split(/\s+/).forEach(function(item)
                    {
                        className = className.replace(classReg(item), " ");
                    });
                    ele.className = className.trim();
                }
            });
        },

        /**
         * 为元素集合中每个元素切换类名状态
         * <br />如果需要切换多个类名状态，则在字符串中使用空格隔开。
         * @param {String} name 需要切换的类名
         * @param {Boolean} [add] true表示添加；false表示移除；没有该参数，则表示已存在则删除，不存在则添加。
         * @return {Object}     实例对象本身
         */
        toggleClass: function(name, add)
        {
            if(!jsApp.isValidString(name))
            {
                return this; //需要删除的类名必须是一个有效的字符串
            }
            name = name.trim().split(/\s+/);

            return this.each(function(index, ele)
            {
                var obj = jsApp(ele);
                name.forEach(function(item)
                {
                    (add === undefined ? !obj.hasClass(item) : add) ? obj.addClass(item) : obj.removeClass(item);
                });
            });
        },

        /**
         * 返回元素集合中的第一个元素是否存在某个类名
         * @param {String} name 需要判断的类名
         * @return {Boolean}    是/否
         */
        hasClass: function(name)
        {
            return this.length > 0 && jsApp.isValidString(name) && classReg(name).test(this[0].className);
        },

        /**
         * 返回或设置目标元素的内容宽度，即不包括padding、border和margin的值
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        width: function(value)
        {

        }

    };
    jsApp.init.prototype = jsApp.fn;

    /**
     * 扩展jsApp对象的静态成员（使用jsApp.xx访问）
     * @method
     * @name extend
     * @memberof jsApp
     * @param  {Object} members 需要扩展的成员集合
     * @example
     * jsApp.extend({
     *     e1: function(){},
     *     e2: function(){}
     * });
     */
     /**
     * 扩展jsApp对象的实例成员（使用new jsApp().xx访问）
     * @method
     * @name extend
     * @memberof jsApp.prototype
     * @param  {Object} members 需要扩展的成员集合
     * @example
     * jsApp.fn.extend({
     *     e1: function(){},
     *     e2: function(){}
     * });
     */
    jsApp.extend = jsApp.fn.extend = function(members)
    {
        for(var item in members)
        {
            this[item] = members[item];
        }
    };

    //扩展jsApp对象的静态成员
    jsApp.extend(/** @lends jsApp */{

        /**
         * 用于遍历数组、对象，并将每一项值参与回调函数的执行
         * <br />回调函数传递两个参数：第一个表示索引位置；第二个表示当前索引位置的名称（对象）或值（数组）。
         * <br />在回调函数中，this关键字指向的数组或对象中当前索引位置的值。
         * @param  {Array|Object}   obj     需要遍历的数组或对象  
         * @param  {Function} callback  回调函数
         */
        each: function(obj, callback)
        {
            var i = 0, name, len;

            if(jsApp.likeArray(obj))
            {
                for(len = obj.length; i < len; i++)
                {
                    if(callback.call(obj[i], i, obj[i]) === false)
                    {
                        break; //如果回调函数返回false，则退出遍历
                    }
                }
            }
            else
            {
                for(name in obj)
                {
                    if(callback.call(obj[name], name, obj[name]) === false)
                    {
                        break;
                    }
                }
            }
        },

        /**
         * 将NodeList转换为Array
         * <br />节点集合NodeList会随着DOM的更改而被更新，在某种情况下不好控制，需要转换为静态数组后再行处理。
         * @param  {NodeList} nodes 需要被转换的NodeList对象
         * @return {Array}      转换后的结果
         */
        makeArray: function(nodes)
        {
            var arr = [], i = 0, len;

            if(!jsApp.likeArray(nodes))
            {
                return [];
            }

            try
            {
                //在非IE浏览器中进行操作，IE浏览器不支持该方法
                arr = slice.call(nodes);
            }
            catch(e)
            {
                //在IE中采用循环赋值的方式来进行
                for(len = nodes.length; i < len; i++)
                {
                    // arr.push(nodes[i]);//在IE中使用索引扩展数组的方式比使用push方法的效率更高些
                    arr[i] = nodes[i];
                }
            }
            return arr;
        },

        /**
         * 填充字符以使目标字符串达到指定长度
         * <br />如果指定的长度小于目标字符串的长度，则返回原目标字符串
         * @param  {String} str       目标字符串
         * @param  {String} dir       填充的方向，"left"——左填充，"right"——右填充
         * @param  {Number} len       目标显示长度
         * @param  {String} character 用来进行填充的字符（如果是以&开头且长度大于1的字符串作为特殊HTML编码字符来使用，如果不是以&开头且长度大于1的字符串将截取第一个字符）
         * @return {String}           字符串填充后的结果
         */
        padStr: function(str, dir, len, character)
        {
            var strLen = str.length,
                pad = "",
                i = 0;
            if(strLen < len)
            {
                character = (character.charAt(0) === "&" && character.length > 1) ? character : character.charAt(0);
                len = len - strLen;

                for( ; i < len; i++){
                    pad += character;
                }
                if(dir === "left"){
                    return pad + str;
                }
                return  str + pad;
            }
            return str;
        },

        /**
         * 返回len个目标字符串的拼接结果
         * @param  {String} str 目标字符串
         * @param  {Number} len 需要拼接的次数
         * @return {String}     字符串拼接后的结果
         */
        dupStr: function(str, len)
        {
            var add = "",
                i = 1;
            for(; i < len; i++)
            {
                add += str;
            }
            return (str + add);
        },

        /**
         * 用于获取当前页面中鼠标选择的文本值
         * @return {String} 鼠标选中的文本
         */
        getSelection: function()
        {
            var str = document.selection ? document.selection.createRange().text : document.getSelection();
            return str + "";    //如果不使用该语句返回值，将返回selection的引用。
        },

        /**
         * 获取十六进制数值A~F所对应的十进制数值
         * @param  {String} num 十六进制数值A-F
         * @return {Number}     十进制数值
         */
        getDecimalValue: function(num)
        {
            switch(num.toString().toLowerCase())
            {
                case "a": return 10; break;
                case "b": return 11; break;
                case "c": return 12; break;
                case "d": return 13; break;
                case "e": return 14; break;
                case "f": return 15; break;
                default: return parseInt(num);
            }
        },

        /**
         * 获取十进制数值0~15所对应的十六进制表示法
         * @param  {Number} num 十进制数值
         * @return {String}     十六进制表示法
         */
        getHexValue: function(num)
        {
            switch(num)
            {
                case 10: return "A"; break;
                case 11: return "B"; break;
                case 12: return "C"; break;
                case 13: return "D"; break;
                case 14: return "E"; break;
                case 15: return "F"; break;
                default: return "" + num;
            }
        },

        /**
         * 返回十进制数转换为十六进制字符串的结果
         * @param  {Number} num   需要被转换的十进制数
         * @param  {Number} digit 最终需要显示的字符串位数，少的用“0”进行填补
         * @return {String}       被转换后的十六进制字符串
         */
        getDecimalToHex: function(num, digit)
        {
            var valueStr = new Array(0, 0);  //用于存放十六进制字符串
            var index = 0;                   //当前索引
            
            while(num > 15)
            {
                valueStr[index] = jsApp.getHexValue(num % 16);
                num = parseInt(num / 16);
                index++;
            }
            valueStr[index] = jsApp.getHexValue(num);
            if(digit === undefined)
            {
                digit = valueStr.length;
            }
            return jsApp.padStr(valueStr.reverse().join(""), "left", digit, "0");
        },

        /**
         * 返回十六进制数转换为十进制的结果值
         * @param  {String} hex 需要被转换的十六进制数
         * @return {Number}     被转换后的十进制数
         */
        getHexToDecimal: function(hex)
        {
            var result = 0,
                len = hex.length - 1,
                i = 0;
            hex = String(hex).toLowerCase();
            if(!/[^0-9a-f]/.test(hex)) //先行判断其是否为有效的十六进制数
            {
                for(; i < len; i++)
                {
                    result += Math.pow(16, hex.length - 1 - i) * jsApp.getDecimalValue(hex.charAt(i));
                }
                result += jsApp.getDecimalValue(hex.charAt(hex.length - 1));
            }
            return result;
        },

        /**
         * 判断类型是否为：字符串
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isString: function(value)
        {
            return typeof(value) === "string";
        },

        /**
         * 判断类型是否为：一个有效的字符串（即非全空格成员）
         * @param  {String} value 需要检索的值
         * @return {Boolean}      是/否
         */
        isValidString: function(value)
        {
            return typeof(value) === "string" && !/^\s*$/.test(value);
        },

        /**
         * 判断类型是否为：数字
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isNumeric: function(value)
        {
            return jsApp.type(value) === "number" && !isNaN(value);
        },

        /**
         * 判断类型是否为：函数
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isFunction: function(value)
        {
            return jsApp.type(value) === "function";
        },

        /**
         * 判断类型是否为：数组
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isArray: function(value)
        {
            return jsApp.type(value) === "array";
        },

        /**
         * 判断类型是否为：“数组”（即包含length值，且该值为数字类型）
         * <br />注意：window对象的length属性为1，function对象的length属性为0，他们都不作为“数组”进行处理。
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        likeArray: function(value)
        {
            return value != null && !jsApp.isWindow(value) && !jsApp.isFunction(value) && typeof(value.length) === "number";
        },

        /**
         * 判断类型是否为：日期（或者是日期字符串，如“2012-03-26”）
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isDate: function(value)
        {
            return jsApp.type(value) === "date";
        },

        /**
         * 判断类型是否为：日期字符串，如“2012-03-26”
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isDateString: function(value)
        {
            typeof(value) === "string" && !isNaN(Date.parse(value.replace(/-/g, "/")))
        },

        /**
         * 判断类型是否为：通过{}或者new Object()创建的对象（就是指除内置对象和HTML对象外的自定义对象）
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isPlainObject: function(value)
        {
            return jsApp.type(value) === "object" && value.toString().toLowerCase() === "[object object]";
        },

        /**
         * 判断类型是否为：一个window对象（如当前窗口或者一个iframe）
         * @param  {任意类型} value 需要判断的值
         * @return {Boolean}        是/否
         */
        isWindow: function(value)
        {
            return value != null && value == value.window;
        },
        
        /**
         * 获取值的类型字符串
         * <br />各种类型返回的字符串结果如下：
         * <br />数字(含NaN)：   number
         * <br />字符串：        string
         * <br />ture/false：    boolean
         * <br />null：          null
         * <br />undefined：     undefined
         * <br />数组：          array
         * <br />函数：          function
         * <br />JSON：          object
         * <br />日期对象：      date
         * <br />数学对象：      math
         * <br />正则：          regexp
         * <br />window：
         * <br />    IE6/7/8:    object
         * <br />    chrome：    global
         * <br />    safari:     domwindow
         * <br />    其他：      window
         * <br />document.body:
         * <br />    IE6/7/8:    object
         * <br />    其他：      htmlbodyelement
         * @param  {任意类型} value 需要判断值
         * @return {String}         类型名称
         */
        type: function(value)
        {
            return value == null ? 
                String(value) :
                new RegExp("\\[object\\s+(.*)\\]").exec(Object.prototype.toString.call(value).toLowerCase())[1];
        },

        /**
         * 添加cookie或者重新给cookie赋值
         * @param  {String} name   cookie的名称
         * @param  {String} value  为cookie指定的值
         * @param  {Number} [expires] 指定当前cookie多长时间后失效（单位：分），默认为会话结束后失效。
         * @param  {Object} [config] 配置信息
         * @param  {String} config.path 指定可访问cookie的目录名称，默认值为“/”。假使cookie创建时的页面地址为http://www.xxx.com/syc/ts.html,那么在默认情况下该cookie仅能供sys目录下及其子级目录下的页面进行访问，像http://www.xxx.com/why/jjs.html这样的页面将无法访问该cookie，如果需要使why目录下的页面也能正常访问，则需要将path属性设置为“path=/why”，而如果需要使该网站的所有页面都有权限访问该cookie，则需要将path属性设置为网站根目录，即“path=/”。 说明：一个页面可以根据path路径的不同而创建多个具有相同名称的cookie。
         * @param  {String} config.domain 指定可访问cookie的主机名，默认值为空。默认情况下，二级域名之间创建的cookie是不能相互被访问的。比如yes.xxx.com访问不了www.xxx.com域名下创建的cookie，如果需要实现二级域名之间能够互相被访问，则需要设置domain属性值为“domain=.xxx.com”，这样才能保证hyck.xxx.com、osp.xxx.com、yes.xxx.com等域名下的网页也能够正常访问www.xxx.com域名下网页所创建的cookie。 （说明：在www.xxx.com下创建一个cookie时，如果为该cookie的domain值指定为其他二级域名，那么该cookie将创建失败！）
         * @param  {Boolean} config.secure 是否启用安全性。 默认情况下，使用http协议连接的页面即可访问该cookie；当设置了该属性后（该属性的属性值可以为任何字符，包括""），则只有通过https或者其它安全协议连接的页面才能访问该cookie。
         */
        setCookie: function(name, value, expires, config)
        {
            var path = "/", domain = "", secure = "", e_date;

            if(value === undefined)
            {
                return; //name和value必备
            }

            if(config !== undefined)
            {
                path = (path = config.path) === undefined ? "/" : path;
                domain = (domain = config.domain) === undefined ? "" : ";domain=" + domain;
                secure = (secure = config.secure) === true ? ";secure=" : "";
            }

            if((expires = expires || "") !== "")
            {
                (e_date = new Date()).setMinutes(e_date.getMinutes() + expires)
                expires = ";expires=" + e_date.toGMTString(); //过期时间值必须是GMT时间格式，通过toGMTString()方法即可将一个时间值转换为GMT格式;
            }
            document.cookie = name + "=" + escape(value) + expires + ";path=" + path + domain + secure; //对name和value进行escape编码处理，从而使空格、汉字、特殊字符呈如“%20”的形式进行保存。
        },

        /**
         * 获取指定cookie的值
         * 如果没有目标名称的cookie，则返回null
         * @param  {String} name cookie的名称
         * @return {String}      指定cookie的值
         */
        getCookie: function(name)
        {
            var result = new RegExp("\\b" + name + "=([^;]*)").exec(document.cookie);
            return result !== null ? unescape(result[1]) : null;
        },

        /**
         * 删除指定名称的cookie
         * <br />通过将cookie的过期时间设置为一个过去的时间值即可将该cookie删除。
         * @param  {String} name   需要删除的cookie名称;
         * @param  {Object} [config]   配置信息
         * @param  {String} config.path   添加cookie时所设置的目录名称，默认值为“/”。因为一个页面可以根据path路径的不同而创建多个具有相同名称的cookie，这种情况下进行删除的时候则需要指明path路径。（说明：将path参数值指定为“/”，将无法删除path值为“/xxx”创建的cookie，如果需要删除该cookie，则必需指定delCookie方法的path参数值也为“/xxx”。）
         * @param  {String} config.domain   添加cookie时所设置的主机名称，默认值为空。因为一个页面可以根据domain值的不同而创建多个具有相同名称的cookie，所以在删除的时候也必须指明domain值。
         */
        delCookie: function(name, config)
        {
            var path = "/", domain = "";
            if(config !== undefined)
            {
                path = (path = config.path) === undefined ? "/" : path;
                domain = (domain = config.domain) === undefined ? "" : ";domain=" + domain;
            }
            document.cookie = name + "=;expires=" + new Date(1).toGMTString() + ";path=" + path + domain;
        },

        /**
         * 创建browser对象用来保存浏览器的相关信息以及与浏览器本身相关的方法。
         * @return {Object} 浏览器信息对象
         */
        browser: (function()
        {
            var browser = /** @lends jsApp.browser */{

                /**
                 * 浏览器名称
                 * @type {String}
                 */
                name: "",

                /**
                 * 浏览器别名（国产浏览器的标识，360SE——360浏览器；sogou——搜狗浏览器；Maxthon——傲游；TheWorld——世界之窗；THEWORLD——世界之窗极速版；BIDUBrowser——百度；LBBROWSER——猎豹浏览器；RSEBROWSER——瑞星安全浏览器；QQBrowser——QQ浏览器；TencentTraveler——腾讯TT浏览器；SaaYaa——闪游；）
                 * @type {String}
                 */
                alias: "",

                /**
                 * 浏览器版本
                 * @type {String}
                 */
                version: "",

                /**
                 * 是否支持Flash插件
                 * @return {Boolean} true/false
                 */
                canFlash: function()
                {
                    var canFlash = false,
                        plugins = navigator.plugins;

                    if(window.ActiveXObject)
                    {
                        //For IE
                        try
                        {
                            //下一行语句如果没有Flash组件，则无法完成创建操作，将会抛出“Automation 服务器不能创建对象”异常
                            new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); 
                            canFlash = true;
                        }
                        catch(e){}
                    }
                    else if(plugins)
                    {
                        //For Firefox、Chrome、Safari、Opera
                        for(var i = 0, len = plugins.length; i < len; i++)
                        {
                            if(plugins[i].name.toLowerCase().contains("shockwave flash"))
                            {
                                canFlash = true;
                                break;
                            }
                        }
                    }

                    return canFlash;
                },

                /**
                 * 设为首页
                 * <br />通常我们都会在网站头部某个位置加上一个“设为首页”的功能，但是没有一个全部兼容的设为首页的方法，所以在此创建一个函数将兼容性处理方法包装起来。
                 */
                setHome: function()
                {
                    try
                    {
                        //针对IE浏览器(setHomePage的参数必须是一个完整的网站地址才能正常触发设为首页操作)
                        document.body.style.behavior = 'url(#default#homepage)';
                        document.body.setHomePage(location.href);
                    }
                    catch(e)
                    {
                        //暂时没有找到兼容其他浏览器的方法，在此使用提供功能代替（ASCII码字符：您的浏览器需要手动设置首页。如需获取帮助，请参见“如何把百度设为您的上网主页”！）
                        var ok = confirm("\u60a8\u7684\u6d4f\u89c8\u5668\u9700\u8981\u624b\u52a8\u8bbe\u7f6e\u9996\u9875\u3002\u5982\u9700\u83b7\u53d6\u5e2e\u52a9\uff0c\u8bf7\u53c2\u89c1\u201c\u5982\u4f55\u628a\u767e\u5ea6\u8bbe\u4e3a\u60a8\u7684\u4e0a\u7f51\u4e3b\u9875\u201d\uff01")
                        if(ok)
                        {
                            window.open("http://www.baidu.com/cache/sethelp/index.html", "_blank");
                        }
                    }
                },

                /**
                 * 加入收藏
                 * <br />基本上（只测试了常用的浏览器，少数浏览没有测试）浏览器将当前页面加入到收藏夹的快捷键是Ctrl+D，但为了吸引用户执行这项操作，通常在页面的某个位置放置了一个类似“加入收藏”的链接。在Firefox和Opera中让该链接的rel="sidebar"可以实现该操作，但是存在瑕疵，所以还是使用JS来执行该操作比较好！
                 */
                addFavorite: function()
                {
                    try
                    {
                        //针对IE进行添加操作
                        //注：由于安全设置问题，本地文件中没有权限执这行代码。另外在IE中，无法直接执行addFavorite方法，需要通过dom节点的相关事件才能正常触发，
                        //    而以IE为内核的360，搜狗等浏览器却可以正常被触发。
                        window.external.addFavorite(location.href, document.title);
                    }
                    catch(e)
                    {
                        try
                        {
                            //针对Firefox进行添加操作
                            //注意：addPanel方法要求网址信息必须是一个绝对且有效的网站地址，所以在本地文件进行测试将无法看到效果
                            window.sidebar.addPanel(document.title, location.href, "");
                        }
                        catch(e)
                        {
                            //如果是其他浏览器，则提示按Ctrl+D进行添加操作（ASCII码字符：添加收藏没有成功，可使用Ctrl+D继续完成操作！）
                            alert("\u6dfb\u52a0\u6536\u85cf\u6ca1\u6709\u6210\u529f\uff0c\u53ef\u4f7f\u7528Ctrl+D\u7ee7\u7eed\u5b8c\u6210\u64cd\u4f5c\uff01");
                        }
                    }
                }
            },
            ua = navigator.userAgent,
            match = /(MSIE) ([\d.]+)/i.exec(ua) || 
                    /(Firefox)\/([\d.]+)/i.exec(ua) ||
                    /(Opera).*version\/([\d.]+)/i.exec(ua) ||
                    /(OPR)\/([\d.]+)/i.exec(ua) ||
                    /(Chrome)\/([\d.]+) safari\/([\d.]+)/i.exec(ua) ||
                    /apple(Webkit).*version\/([\d.]+) safari/i.exec(ua) ||
                    [],
            name = match[1] || "",
            version = match[2] || "",
            tags, i, len;

            if(name !== "Chrome" && name === "Webkit")
            {
                name = "Safari";
            }
            else if(name === "OPR")
            {
                name = "Opera";
            }

            //针对国产浏览器，使用别名进行识别
            //不知出于什么目的，360浏览器在UA中隐藏了对自身的标识信息，所以无法通过UA对其进行判定。但是360浏览器对部分域名（www.cnzz.com、www.so.com）开放了权限，这些域名通过360浏览器发送请求时，其UA中将带有360SE的信息。
            match = /MetaSr|Maxthon|TheWorld|BIDUBrowser|LBBROWSER|RSEBROWSER|QQBrowser|TencentTraveler|SaaYaa|360SE/i.exec(ua) || [];
            alias = match[0] || "";
            if(alias === "MetaSr")
            {
                alias = "sogou";
            }

            //使IE浏览器兼容HTML5标签
            /*----------------------------------
             *说明：截止2012-09-03，Firefox、Chrome、Safari、Opera、IE9等高级浏览器均已支持基本的HTML5标签，但是在IE8及更低版本的IE浏览器中无法使用它们。
             *解决办法：在IE中，只需要通过document.createElement()方法创建一个未知的HTML元素，就可以正常使用IE本身未支持的标签。
             *提示：IE6~8不支持document.addEventListener属性。
             *=================================================================================*/
            if(!document.addEventListener)
            {
                tags = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
                for(i = 0, len = tags.length; i < len; i++)
                {
                    document.createElement(tags[i]);
                }
            }

            //解决IE6浏览器不缓存背景图片的Bug
            /*----------------------------------
             *说明：我们通常需要使用CSS来进行背景图片的设置，但这样在IE6下有一个Bug，那就是IE6默认情况下不缓存背景图片，CSS里每次更改图片的位置时都会重新发起请求，所以当鼠标在有CSS背景的元素上移动时，图片会闪烁甚至鼠标会出现忙的状态。
             *      解决方案一：在CSS中加入如下样式：html { filter: expression(document.execCommand(”BackgroundImageCache”, false, true)); }
             *      使用上述方案可能会影响整个页面的加载速度，所以推荐使用JS来修正这个Bug。  
             *提示：IE6不支持window.XMLHttpRequest属性。
             *=================================================================================*/
            if(!window.XMLHttpRequest)
            {
                try
                {
                    document.execCommand("BackgroundImageCache", false, true);
                }
                catch(e){}
            }

            browser.name = name;
            browser.alias = alias;
            browser.version = version;

            return browser;
        }())
    });

    //对jsApp的原型进行扩展：事件绑定的快捷方式
    jsApp.each("mousewheel,mouseover,mousemove,mouseout,mousedown,mouseup,mouseenter,mouseleave,click,dblclick,focus,blur,change,keydown,keypress,keyup,load,unload,beforeunload,resize,scroll,error,contextmenu,hashchange".split(","),
    function(i, name)
    {
        jsApp.fn[name] = function(handler, capture)
        {
            this.bind(name, handler, capture);
        };
    });

    //扩展Array对象的实例成员
    arrayPrototype.unique === undefined && (arrayPrototype.unique = function()
    {
        //返回目标数组去除重复值之后所组成的新数组
        var output = [],  //最终输出结果
            result = {},  //用于结果判断
            i = 0,
            len = this.length,
            num;

        for(; i < len; )
        {
            num = this[i++];
            if(result[num] === undefined)
            {
                result[num] = 1;     //使用1来表示目标结果已加入新的数组中
                output.push(num);    //保存唯一值
            }
        }
        return output;
    });
    arrayPrototype.indexOf === undefined && (arrayPrototype.indexOf = function(val)
    {
        //返回目标数组中指定值第一次出现所在的位置，不存在则返回-1
        var result = -1,
            len = this.length,
            i = 0;

        for(; i < len; i++)
        {
            if(this[i] === val)
            {
                result = i;
                break;
            }
        }
        return result;
    });
    arrayPrototype.filter === undefined && (arrayPrototype.filter = function(func)
    {
        //筛选出原数组中符合条件的所有成员，并以数组形式返回
        var result = [],
            len = this.length,
            i = 0,
            item;

        for(; i < len; i++)
        {
            if(func(item = this[i], i))
            {
                result.push(item);
            }
        }

        return result;
    });
    arrayPrototype.forEach === undefined && (arrayPrototype.forEach = function(func)
    {
        //遍历数组中的每一个元素
        var i = 0, len = this.length;
        for(; i < len; )
        {
            func(this[i++]);
        }
    });
    arrayPrototype.remove = function(val)
    {
        //删除数组中与目标值相同的所有元素
        var idx;

        while((idx = this.indexOf(val)) !== -1)
        {
            this.splice(idx, 1);
        }
        return this;
    }

    //扩展String对象的实例成员
    stringPrototype.trim === undefined && (stringPrototype.trim = function()
    {
        //去除目标字符串首尾两端的所有空格，并作为新字符串返回
        return this.replace(/^\s*|\s*$/g, "");
    });
    stringPrototype.contains === undefined && (stringPrototype.contains = function(match)
    {
        //判断目标字符串中是否存在检索字符串
        return typeof(match) === "string" && this.indexOf(match) >= 0;
    });
    stringPrototype.startsWith === undefined && (stringPrototype.startsWith = function(match)
    {
        //判断目标字符串是否以检索字符串开头
        return typeof(match) === "string" && this.indexOf(match) === 0;
    });
    stringPrototype.endsWith === undefined && (stringPrototype.endsWith = function(match)
    {
        //判断目标字符串是否以检索字符串结束
        return typeof(match) === "string" && new RegExp(match + "$").test(this);
    });

    //文档DOM树生成完毕后执行一些必要操作
    jsApp(function()
    {
        //用于兼容IE6、7中的querySelectorAll方法
        if(!document.querySelectorAll)
        {
            var ele = document.createElement("style");
            ele.setAttribute("id", "jsApp_selectorStyle");
            document.getElementsByTagName("head")[0].appendChild(ele);  
        }
    });

    window.$ = window.jsApp = jsApp;   //将jsApp转换为全局对象

})(window);
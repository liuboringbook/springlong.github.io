//���еĶ��󡢷������������ŵ�һ�����������н��У���Ϊ�˷�ֹ��������������ȾWindow����
//�����ڸ����������д���window������Ϊ��������Ϊ���ڽ���ѹ��ʱ����window�ؼ�����ռ�õ��ֽڡ�
(function(window){

    //������ر���
    var 

        //����document��location��undefined�ȶ��������ֵ�����������һ��Ϊ�˼���ʹ������ʱ��window�����в��������ʱ�䣬����Ϊ���ڽ���ѹ��ʱ�����ֽڡ�
        document = window.document,
        location = window.location,
        navigator = window.navigator,
        undefined = undefined,
        
        //����ready������Ŵ������򼯺�
        readyList = [],

        //����Ҫ�ദʹ�õĶ�����
        stringPrototype = String.prototype,
        arrayPrototype = Array.prototype,
        emptyArray = [],
        slice = emptyArray.slice,

        /**
         * ΪjsApp�е�ԭ�ͷ���ִ��ȫ�ּ�������
         * <br />ԭ�ͷ���ͨ����Ҫ��Լ��������Ԫ�ؼ��϶�ִ��ͬһ������ͨ���ú����ɽ���ͳһ���䡣
         * <br />ԭ�ͷ���ͨ����Ҫ�漰DOMԪ�صĲ�����ͨ���ú������ڻص�����ִ��ǰ�ж�Ŀ��Ԫ�ص����ޣ��Ӷ�ȷ���ص������д���ִ����ȷ��
         * <br />�ڻص������У�thisָ���������������һ����������Ŀ��Ԫ����Ԫ�ؼ����е�����ֵ���ڶ������������Ŀ��Ԫ�ء�
         * @param  {Object}   match    ��Ҫ���м����Ķ��󣨼�jsApp��ĳ������ʵ����
         * @param  {Function} callback �ص�����
         * @return {Object|Others}     ������������е�Ԫ�ؼ���Ϊ�գ��򷵻ؼ����������������Ϊ�գ��򷵻�Ԫ�ؼ����е�һ��Ԫ��ִ�лص������������صĽ����
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
         * �������顱��ʽ��Ԫ�ؼ��ϼ��뵽jsAppʵ������
         * @param  {NodeList|Array} nodes  Ԫ�ؼ���
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
         * ִ��readyList�б�
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
         * DomContentLoaded�¼��ļ��ݴ���
         */
        DomContentLoaded = function()
        {
            if(document.addEventListener)
            {
                //��׼�¼�ģ�ͣ�IE9+��Chrome��Safari��Firefox��Opera��
                document.addEventListener("DOMContentLoaded", doReady, false);
                return;
            }
            //����IE6��7��8��ԭ������Ϊ��IE�������DOMδ�������ʱ����doScroll������������쳣���ο���ַ��http://javascript.nwbox.com/IEContentLoaded/
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
         * ���¼����������д
         * @param  {Object} e ��дǰ���¼�����
         * @return {Object}   ��д����¼�����
         */
        rewriteEvent = function(e)
        {
            e = e || window.event;
            var type = e.type, 
            target = e.target || e.srcElement,
            compatible = {

                //�¼����ͣ����¼������ƣ��磺click��dblclick��mouseover
                type: type,

                //�¼�Ŀ�꣬���û��Ĳ����ǻ�����һ��Ŀ��Ԫ�ؽ��е�
                target : target,

                //Ctrl���Ƿ���
                ctrlKey: e.ctrlKey,

                //Shift���Ƿ���
                shiftKey: e.shiftKey,

                //Alt���Ƿ���
                altKey: e.altKey,

                //��ֹ�¼�ð��
                stopPropagation: function()
                {
                    "stopPropagation" in e ? e.stopPropagation() : (e.cancelBubble  = true);
                },

                //ȡ��Ĭ����Ϊ
                preventDefault: function()
                {
                    "preventDefault" in e ? e.preventDefault() : (e.returnValue = false);
                }
            };

            //����¼�
            if(/mouse|click/gi.test(type))
            {
                //����������¼�, ����mouseover���Ա�ʾ���ĸ�DOMԪ�ؽ�����������mouseout�������ʾ����������Ǹ�DOMԪ��
                compatible.relatedTarget = e.relatedTarget === undefined ? (type === "mouseover" ? e.fromElement : e.toElement) : e.relatedTarget;

                //��������Ŀ��Ԫ�ص�X������λ�ã�����offsetX��offsetY��û�б������׼������Firefox���������֧�����������ԣ�
                compatible.offsetX = e.offsetX === undefined ? (e.clientX - target.getBoundingClientRect().left) : e.offsetX;

                //��������Ŀ��Ԫ�ص�Y������λ��
                compatible.offsetY = e.offsetY === undefined ? (e.clientY - target.getBoundingClientRect().top) : e.offsetY;

                //���������ĵ���ʾ����X������λ��
                compatible.clientX = e.clientX;

                //���������ĵ���ʾ����Y������λ��
                compatible.clientY = e.clientY;

                //������������ҳ���X������λ�ã�pageX��pageY��IE6/7/8��û�еõ�֧�֣�
                compatible.pageX = e.pageX === undefined ? (document.documentElement.scrollLeft + event.clientX) : e.pageX;

                //������������ҳ���Y������λ��
                compatible.pageY = e.pageY === undefined ? (document.documentElement.scrollTop + event.clientY) : e.pageY;

                //����������Ļ��X����λ��
                compatible.screenX = e.screenX;

                //����������Ļ��Y����λ��
                compatible.screenY = e.screenY;

                //�ж�������������ĸ�����0�������1���м����2���Ҽ���
                if(document.implementation.hasFeature("MouseEvents", "2.0"))
                {
                    compatible.button = e.button;
                }
                else
                {
                    //�ڷǱ�׼��IE6/7/8�¼�ģ���£�������7��ֵ
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
            //���̰����¼��ļ����Դ���
            else if(/key/gi.test(type))
            {
                //���̰����ļ���ֵ
                compatible.keyCode = e.keyCode === 0 ? e.charCode : e.keyCode;
            }

            return compatible;
        },

        /**
         * ��ȡĿ��Ԫ�صĺ�һ���ڽڵ㣬����������򷵻�null
         * @param  {HTMLElement}   ele Ŀ��Ԫ��
         * @return {HTMLElement}   ��һ���ڽڵ�
         */
        nextSibling = function(ele)
        {
            return ele.nodeType ?
                ("nextElementSibling" in ele ? ele.nextElementSibling : ele.nextSibling) : null;
        },

        /**
         * ��ȡĿ��Ԫ�ص�ǰһ���ڽڵ㣬����������򷵻�null
         * @param  {HTMLElement}   ele Ŀ��Ԫ��
         * @return {HTMLElement}   ǰһ���ڽڵ�
         */
        previousSibling = function(ele)
        {
            return ele.nodeType ?
                ("previousElementSibling" in ele ? ele.previousElementSibling : ele.previousSibling) : null;
        },

        /**
         * ��ȡĿ��Ԫ�صĵ�һ���ӽڵ㣬����������򷵻�null
         * @param  {HTMLElement}   ele Ŀ��Ԫ��
         * @return {HTMLElement}   ��һ���ڽڵ�
         */
        firstChild = function(ele)
        {
            return ele.nodeType ?
                ("firstElementChild" in ele ? ele.firstElementChild : ele.firstChild) : null;
        },

        /**
         * ��ȡĿ��Ԫ�ص����һ���ӽڵ㣬����������򷵻�null
         * @param  {HTMLElement}   ele Ŀ��Ԫ��
         * @return {HTMLElement}   ��һ���ڽڵ�
         */
        lastChild = function(ele)
        {
            return ele.nodeType ?
                ("lastElementChild" in ele ? ele.lastElementChild : ele.lastChild) : null;
        },

        /**
         * ����ָ������������ƥ�����ʽ
         * @param  {String} name ָ������
         * @return {RegExp}      ����ƥ�����ʽ
         */
        classReg = function(name)
        {
            return new RegExp("(^|\\s)+" + name + "(\\s|$)+", "g");
        },

        /**
         * ��������jsApp
         * @class
         * @global
         * @param  {String|Function|Window|HTMLElement} selector ѡ��������������ʵ������Ļ��������
         * @example
         * var ele = jsApp("#element_ID");  //��ʼ��jsApp����ʵ����������Ŀ��IDԪ�صķ�װ����
         */
        jsApp = function(selector)
        {
            return new jsApp.init(selector);
        };

    //��ʼ��jsApp����ʵ��
    jsApp.init = function(selector)
    {
        var _self = this, ele, className, i, j, len;

        //���������selector����������Ϊ""��undefined��null��false��0��ֵʱ������ִ�к�������
        if(!selector)
        {
            return;
        }

        //�����HTML�������window����
        if(selector.nodeType || selector === window)
        {
            _self[0] = selector;
            _self.length = 1;
            return;
        }

        //���Ϊ�ַ���
        if(typeof(selector) === "string")
        {
            //���ΪID��ȡ
            if(/^#[\w-]+/i.test(selector))
            {
                ele = document.getElementById(selector.substring(1));
                if(ele !== null)
                {
                    _self[0] = ele;
                    _self.length = 1;
                }
            }
            //���ݱ�ǩԪ�ػ�ȡ
            else if(/^[a-z]+$/i.test(selector) || selector === "*")
            {
                ele = document.getElementsByTagName(selector);
                makeIn.call(_self, ele);
            }
            //����������ȡ
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
            //����ѡ������ȡ
            else
            {
                if(document.querySelectorAll)
                {
                    ele = document.querySelectorAll(selector);
                    makeIn.call(_self, ele);
                }
                else if(!/[+>~\[]+/.test(selector)) /*IE6��ʹ�ò�֧�ֵ�ѡ��������Ԫ�ز��һ�������������*/
                {
                    document.styleSheets["jsApp_selectorStyle"].addRule(selector, "q:a", 0);  //Ϊָ��ѡ����Ԫ��������ʽ
                    ele = document.getElementsByTagName("*");
                    for(i = j = 0, len = ele.length; i < len; i++)
                    {
                        if(ele[i].currentStyle.q === "a")
                        {
                            _self[j] = ele[i];
                            _self.length = j++;
                        }
                    }
                    document.styleSheets["jsApp_selectorStyle"].removeRule(0); //�����ӵ�ѡ������ʽ�Ƴ�
                }
            }
            return;
        }
        //���Ϊ���������ʾ��DOM���������֮��ִ��
        else if(jsApp.isFunction(selector))
        {
            _self.ready(selector);
        }

        //���Ϊ����
        jsApp.likeArray(selector) && makeIn.call(_self, selector);
    }

    //��չjsApp�����ʵ����Ա
    jsApp.fn = jsApp.prototype = /** @lends jsApp.prototype */{
        
        /**
         * �����¼���
         * @param  {String} name    �¼�����
         * @param  {Function} handler �¼���������
         * @param  {Boolean} [capture=false] �Ƿ�����¼���׽
         * @return {Function}         �¼���������
         * @example
         * var testID_click = $("#testID").bind("click", function()
         * {
         *     alert("����¼���");
         * });
         */
        bind: function(name, handler, capture)
        {
            return map(this, function(index, ele)
            {
                var callback = function(e)
                {
                    //ͨ����תʵ�ָ��������this���¼�����ļ�����
                    e = rewriteEvent(e);
                    handler.call(e.target, e);
                };

                if(/mouseenter|mouseleave/i.test(name) && !("onmouseenter" in ele))
                {
                    // ����mouseenter��mouseleave�¼�����Chrome��Safari��δ�õ�֧�֣����������¼����ᷢ��ð�ݣ�������Ӽ�Ԫ�ص��ƶ����ᴥ������Ԫ�ص�����¼���
                    name = name === "mouseenter" ? "mouseover" : "mouseout";
                    callback = function(e)
                    {
                        e = rewriteEvent(e);
                        var target = e.target;
                        var mouseTo = e.relatedTarget;

                        //������Ŀ�겻��Ŀ��Ԫ�ص���Ԫ���Ҳ���Ԫ�ر��������ִ��
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
         * ����¼���
         * @param  {String} name    �¼�����
         * @param  {Function} handler �¼���������
         * @param  {Boolean} [capture=false] �Ƿ�����¼���׽
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
         * DOM���������ʱ��ִ��ͨ��ready���ӵĴ�������
         * <br />ͨ���÷�ʽ���ӵĴ�������������γ�������DOM��֮��ʹ�����������Ҫ��load�¼�����������ҳ��Ԫ��ȫ��������Ϻ�Żᴥ����������ҳ�����ص����ھ������¼�������������ζ���û��ܹ��������ҳ����н�����
         * @param  {Function} handler ��Ҫ�󶨵Ĵ�������
         * @return {Object}         ʵ��������
         */
        ready: function(handler)
        {
            //������Ӵ�������ʱDOM���Ѿ�������ϣ���ô1������Զ�ִ�У�֮����ʹ�ö�ʱ������Ϊ��ʵ���첽ִ�У�
            var readyState = document.readyState;
            if(readyState === "interactive" || readyState === "complete")
            {
                return setTimeout(handler, 1);
            }

            //���Ӵ��������б�
            readyList.push(handler);
            if(readyList.length === 1)
            {
                //������һ�����Ӵ�������ʱ�Ž���DomContentLoaded�¼��ļ�⡣
                DomContentLoaded();
            }
            return this;
        },

        /**
         * ִ��Ԫ�ؼ��ϵı�������
         * <br />���Ԫ�ؼ���Ϊ�գ���ֱ�ӷ���ʵ��������
         * <br />�ڻص������У�thisָ��Ԫ�ؼ����е�ǰ������Ԫ�ر���
         * @param {Function} callback �ص�����
         * @return {Object} ʵ��������
         */
        each: function(callback)
        {
            jsApp.likeArray(this) && jsApp.each(this, callback);
            return this;
        },

        /**
         * ��ȡԪ�ؼ���������ֵ��start��ʼλ�õ�end����λ��֮�䣨������end��������Ԫ�ع������µ�jsApp����
         * <br />��ʼλ�úͽ���λ�ã��ȿ����ǷǸ�����Ҳ�����Ǹ�������Ϊ�Ǹ���ʱ����ʾ���Ǿ��������λ�ã���Ϊ����ʱ�����ʾ���ǵ����ڼ���Ԫ�ء�
         * <br />�ڻ�ȡ���֮ǰ��ͨ���Ὣstart��end��������ת��Ϊ��ȷ������λ�á�ת��Ϊ��ȷ������λ�ú�����start����λ��end֮ǰ�������ȡ�Ľ��Ϊ�գ���start����Ϊ��Ч������λ�ã������ȡ�Ľ��ҲΪ�գ�end���Գ���Ԫ�ؼ��ϵĳ���Ҳ���Բ��ṩ�ò�������ʱ�Ľ����ʾ��startλ�ÿ�ʼһֱ��Ԫ�ؼ��ϵ����һ��Ԫ�أ�������Ԫ�أ���start��end���������Բ��ṩ����ʱ��ʾ�����е�����Ԫ�ء���
         * <br />�����ȡ�Ľ��Ϊ�գ���ֱ�ӷ���ʵ����������
         * @param  {Number} [start] ��ʼλ��
         * @param  {Number} [end] ����λ��
         * @return {Object}       �µ�jsAppʵ������
         */
        slice: function(start, end)
        {
            if(this.length === undefined)
            {
                //���ԭʵ��������û��Ԫ�ؼ��ϣ���ô�ڸ���start����һ������ʱ�������Ĳ��������׳��쳣
                return this;
            }
            return jsApp(slice.apply(this, arguments));
        },

        /**
         * ��ȡԪ�ؼ�����ָ��������Ԫ�ع������µ�jsApp����
         * <br />����ֵΪ�Ǹ���ʱ����ʾ����ֵΪindex���Ǹ�Ԫ��
         * <br />����ֵΪ����ʱ�����ʾ�����ڼ���Ԫ�ء����磺index����Ϊ-1ʱ�����ʾԪ�ؼ����е����һ��Ԫ�ء�
         * <br />�������ֵ���ڷ�Χ�ڣ���ֱ�ӷ���ʵ��������
         * @param  {Number} index ����ֵ
         * @return {Object} �µ�jsAppʵ������
         */
        eq: function(index)
        {
            return index === -1 ? this.slice(index) : this.slice(index, index + 1);
        },

        /**
         * ��ȡԪ�ؼ����е�һ��Ԫ�ع������µ�jsApp����
         * <br />���Ԫ�ؼ���Ϊ�գ���ֱ�ӷ���ʵ��������
         * @return {Object} �µ�jsAppʵ������
         */
        first: function()
        {
            return this.slice(0, 1);
        },

        /**
         * ��ȡԪ�ؼ��������һ��Ԫ�ع������µ�jsApp����
         * <br />���Ԫ�ؼ���Ϊ�գ���ֱ�ӷ���ʵ��������
         * @return {Object} �µ�jsAppʵ������
         */
        last: function()
        {
            return this.slice(-1);
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�غ�һ���ڽڵ����������µ�jsApp����
         * <br />���ĳ��Ԫ��û�к�һ���ڽڵ㣬�򲻲μӹ�����Ϊ
         * @return {Object} �µ�jsAppʵ������
         */
        next: function()
        {
            return this.newObj(function(index, ele)
            {
                return nextSibling(ele);
            });
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ��֮��������ֵܽڵ�����ɵ��µ�jsApp����
         * <br />���ĳ��Ԫ��û�к����ֵܽڵ㣬�򲻲μӹ�����Ϊ
         * @return {Object} �µ�jsAppʵ������
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
         * ��ȡԪ�ؼ�����ÿ��Ԫ��ǰһ���ڽڵ����������µ�jsApp����
         * <br />���ĳ��Ԫ��û��ǰһ���ڽڵ㣬�򲻲μӹ�����Ϊ
         * @return {Object} �µ�jsAppʵ������
         */
        prev: function()
        {
            return this.newObj(function(index, ele)
            {
                return previousSibling(ele);
            });
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ��֮ǰ�������ֵܽڵ�����ɵ��µ�jsApp����
         * <br />���ĳ��Ԫ��û���ֵܽڵ㣬�򲻲μӹ�����Ϊ
         * @return {Object} �µ�jsAppʵ������
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
         * ��ȡԪ�ؼ�����ÿ��Ԫ�������ֵܽڵ�����ɵ��µ�jsApp����
         * @return {Object} �µ�jsAppʵ������
         */
        siblings: function()
        {
            return this.newObj(function(index, ele)
            {
                return jsApp.makeArray(ele.parentNode.children).filter(function(item){ return item !== ele });
            });
        },
        
        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�������ӽڵ�����ɵ��µ�jsApp����
         * @return {Object} �µ�jsAppʵ������
         */
        children: function()
        {
            return this.newObj(function(index, ele)
            {
                return ele.children;
            });
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�صĸ��ڵ�����ɵ��µ�jsApp����
         * @return {Object} �µ�jsAppʵ������
         */
        parent: function()
        {
            return this.newObj(function(index, ele)
            {
                return ele.parentNode;
            });
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�ص����и��ڵ㣨��������Ԫ�أ�����ɵ��µ�jsApp����
         * @return {Object} �µ�jsAppʵ������
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
         * ���ݻص��������ص�Ԫ�ء�Ԫ�ؼ��ϡ�Ԫ�����鴴���µ�jsApp����
         * @param  {Function} callback �ص�����
         * @return {Object}            �µ�jsApp����
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
         * ��ȡĿ��Ԫ�ص��ڲ�HTML�ı����ݣ����߽�Ŀ��Ԫ�ص��ڲ�HTML�ı��滻���µ�HTML�ı�
         * @param  {String} [html]  �µ�HTML�ı�
         * @return {String|Object}  ����ȡHTML�ı�����ʱ�������ַ�����ʽ��<br />�����Ҫִ���滻�������򷵻�ʵ��������
         */
        html: function(html)
        {
            return map(this, function(index, ele)
            {
                if(html === undefined)
                {
                    return ele.innerHTML;
                }
                //�滻����
            });
        },

        /**
         * ��ȡĿ��Ԫ�ص��ڲ����ı����ݣ�����HTML���ȫ��ȥ���Ľ���������߽�Ŀ��Ԫ�ص������滻���µ��ı����ݣ������HTML��ǣ���������ת�봦����
         * @param  {String} [html]  �µ��ı�����
         * @return {String|Object}  ����ȡ�ı�����ʱ�������ַ�����ʽ��<br />�����Ҫִ���滻�������򷵻�ʵ��������
         */
        text: function(text)
        {
            return map(this, function(index, ele)
            {
                if(text === undefined)
                {
                    return ele.innerText || ele.textContent; //Firefox֧��textContent�����������֧��innerText
                }
                //�滻����
            });  
        },

        /**
         * �Ƴ�Ŀ��Ԫ���µ���������
         * @return {Object} ʵ��������
         */
        empty: function()
        {
            return this.each(function(index, ele)
            {
                ele.innerHTML = '';
            });
        },

        /**
         * ��Ŀ��Ԫ�ر������ĵ����Ƴ�
         * @return {Object} ʵ��������
         */
        remove: function()
        {
            return this.each(function(index, ele)
            {
                ele.parentNode && ele.parentNode.removeChild(ele);
            });
        },

        /**
         * ����ؽڵ����HTML�ı����ݣ���Ϊ�ӽڵ���뵽Ŀ��Ԫ���ڲ��Ŀ�ͷ��
         * <br />�������Ϊ��ؽڵ㣬��ִ�н��ýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|HTMLElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {Object}      ʵ��������
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
         * ����ؽڵ����HTML�ı����ݣ���Ϊ�ӽڵ���뵽Ŀ��Ԫ���ڲ���ĩβ��
         * <br />�������Ϊ��ؽڵ㣬��ִ�н��ýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|HTMLElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {Object}      ʵ��������
         */
        append: function(node)
        {

        },

        /**
         * ����ؽڵ����HTML�ı����ݣ���Ϊ�ֵܽڵ���뵽Ŀ��Ԫ�ص�ǰ��
         * <br />�������Ϊ��ؽڵ㣬��ִ�н��ýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|HTMLElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {Object}      ʵ��������
         */
        before: function(node)
        {

        },

        /**
         * ����ؽڵ����HTML�ı����ݣ���Ϊ�ֵܽڵ���뵽Ŀ��Ԫ�صĺ���
         * <br />�������Ϊ��ؽڵ㣬��ִ�н��ýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|HTMLElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {Object}      ʵ��������
         */
        after: function(node)
        {

        },

        /**
         * ��Ŀ��Ԫ���滻����ؽڵ����HTML�ı�����
         * <br />�������Ϊ��ؽڵ㣬��ִ�иýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|HTMLElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {[type]}      [description]
         */
        replaceWith: function(node)
        {

        },

        /**
         * ΪԪ�ؼ����е�ÿ��Ԫ����������
         * <br />�����Ҫ���Ӷ�������������ַ�����ʹ�ÿո������
         * <br />�������Ϊ����������Ҫ���ӵ������ַ����ɺ������з��أ��ں����зֱ𴫵�����ֵ�Լ�����Ԫ�ص�ǰ�������ַ�����this��ָ������Ԫ�ء�
         * @param {String|Function} name ��Ҫ���ӵ�����
         * @return {Object}      ʵ��������
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

                //��Ҫ���ӵ�����������һ����Ч���ַ���
                jsApp.validString(name) && name.trim().split(/\s+/).forEach(function(item)
                {
                    !classReg(item).test(className + classAdd) && (classAdd += " " + item);
                });

                ele.className += classAdd;
            });
        },

        /**
         * ΪԪ�ؼ����е�ÿ��Ԫ���Ƴ�����
         * <br />�����Ҫɾ����������������ַ�����ʹ�ÿո������
         * <br />���û�в�����������Ƴ�Ԫ���е�����������
         * <br />�������Ϊ����������Ҫɾ���������ַ����ɺ������з��أ��ں����зֱ𴫵�����ֵ�Լ�����Ԫ�ص�ǰ�������ַ�����this��ָ������Ԫ�ء�
         * @param {String|Function} [name] ��Ҫ�Ƴ�������
         * @return {Object}     ʵ��������
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
                
                //��Ҫɾ��������������һ����Ч���ַ���
                if(jsApp.validString(name))
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
         * ΪԪ�ؼ�����ÿ��Ԫ���л�����״̬
         * <br />�����Ҫ�л��������״̬�������ַ�����ʹ�ÿո������
         * @param {String} name ��Ҫ�л�������
         * @param {Boolean} [add] true��ʾ���ӣ�false��ʾ�Ƴ���û�иò��������ʾ�Ѵ�����ɾ���������������ӡ�
         * @return {Object}     ʵ��������
         */
        toggleClass: function(name, add)
        {
            return this.each(function(index, ele)
            {
                //��Ҫɾ��������������һ����Ч���ַ���
                if(jsApp.validString(name))
                {
                    var obj = jsApp(ele);
                    name.trim().split(/\s+/).forEach(function(item)
                    {
                        (add === undefined ? !obj.hasClass(item) : add) ? obj.addClass(item) : obj.removeClass(item);
                    });
                }
            });
        },

        /**
         * ����Ԫ�ؼ����еĵ�һ��Ԫ���Ƿ����ĳ������
         * @param {String} name ��Ҫ�жϵ�����
         * @return {Boolean}    ��/��
         */
        hasClass: function(name)
        {
            return this.length > 0 && jsApp.validString(name) && classReg(name).test(this[0].className);
        }
    };
    jsApp.init.prototype = jsApp.fn;

    /**
     * ��չjsApp����ľ�̬��Ա��ʹ��jsApp.xx���ʣ�
     * @method
     * @name extend
     * @memberof jsApp
     * @param  {Object} members ��Ҫ��չ�ĳ�Ա����
     * @example
     * jsApp.extend({
     *     e1: function(){},
     *     e2: function(){}
     * });
     */
     /**
     * ��չjsApp�����ʵ����Ա��ʹ��new jsApp().xx���ʣ�
     * @method
     * @name extend
     * @memberof jsApp.prototype
     * @param  {Object} members ��Ҫ��չ�ĳ�Ա����
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

    //��չjsApp����ľ�̬��Ա
    jsApp.extend(/** @lends jsApp */{

        /**
         * ���ڱ������顢���󣬲���ÿһ��ֵ����ص�������ִ��
         * <br />�ص���������������������һ����ʾ����λ�ã��ڶ�����ʾ��ǰ����λ�õ����ƣ����󣩻�ֵ�����飩��
         * <br />�ڻص������У�this�ؼ���ָ������������е�ǰ����λ�õ�ֵ��
         * @param  {Array|Object}   obj     ��Ҫ��������������  
         * @param  {Function} callback  �ص�����
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
                        break; //����ص���������false����������ִ��
                    }
                }
            }
            else if(jsApp.isObject(obj))
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
         * ��NodeListת��ΪArray
         * <br />�ڵ㼯��NodeList������DOM�ĸ��Ķ������£���ĳ������²��ÿ��ƣ���Ҫת��Ϊ��̬��������д�����
         * @param  {NodeList} nodes ��Ҫ��ת����NodeList����
         * @return {Array}      ת����Ľ��
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
                //�ڷ�IE������н��в�����IE�������֧�ָ÷���
                arr = slice.call(nodes);
            }
            catch(e)
            {
                //��IE�в���ѭ����ֵ�ķ�ʽ������
                for(len = nodes.length; i < len; i++)
                {
                    // arr.push(nodes[i]);//��IE��ʹ��������չ����ķ�ʽ��ʹ��push������Ч�ʸ���Щ
                    arr[i] = nodes[i];
                }
            }
            return arr;
        },

        /**
         * ����ַ���ʹĿ���ַ����ﵽָ������
         * <br />���ָ���ĳ���С��Ŀ���ַ����ĳ��ȣ��򷵻�ԭĿ���ַ���
         * @param  {String} str       Ŀ���ַ���
         * @param  {String} dir       ���ķ���"left"��������䣬"right"���������
         * @param  {Number} len       Ŀ����ʾ����
         * @param  {String} character �������������ַ����������&��ͷ�ҳ��ȴ���1���ַ�����Ϊ����HTML�����ַ���ʹ�ã����������&��ͷ�ҳ��ȴ���1���ַ�������ȡ��һ���ַ���
         * @return {String}           �ַ�������Ľ��
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
         * ����len��Ŀ���ַ�����ƴ�ӽ��
         * @param  {String} str Ŀ���ַ���
         * @param  {Number} len ��Ҫƴ�ӵĴ���
         * @return {String}     �ַ���ƴ�Ӻ�Ľ��
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
         * ���ڻ�ȡ��ǰҳ�������ѡ����ı�ֵ
         * @return {String} ���ѡ�е��ı�
         */
        getSelection: function()
        {
            var str = document.selection ? document.selection.createRange().text : document.getSelection();
            return str + "";    //�����ʹ�ø���䷵��ֵ��������selection�����á�
        },

        /**
         * ��ȡʮ��������ֵA~F����Ӧ��ʮ������ֵ
         * @param  {String} num ʮ��������ֵA-F
         * @return {Number}     ʮ������ֵ
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
         * ��ȡʮ������ֵ0~15����Ӧ��ʮ�����Ʊ�ʾ��
         * @param  {Number} num ʮ������ֵ
         * @return {String}     ʮ�����Ʊ�ʾ��
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
         * ����ʮ������ת��Ϊʮ�������ַ����Ľ��
         * @param  {Number} num   ��Ҫ��ת����ʮ������
         * @param  {Number} digit ������Ҫ��ʾ���ַ���λ�����ٵ��á�0�������
         * @return {String}       ��ת�����ʮ�������ַ���
         */
        getDecimalToHex: function(num, digit)
        {
            var valueStr = new Array(0, 0);  //���ڴ��ʮ�������ַ���
            var index = 0;                   //��ǰ����
            
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
         * ����ʮ��������ת��Ϊʮ���ƵĽ��ֵ
         * @param  {String} hex ��Ҫ��ת����ʮ��������
         * @return {Number}     ��ת�����ʮ������
         */
        getHexToDecimal: function(hex)
        {
            var result = 0,
                len = hex.length - 1,
                i = 0;
            hex = String(hex).toLowerCase();
            if(!/[^0-9a-f]/.test(hex)) //�����ж����Ƿ�Ϊ��Ч��ʮ��������
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
         * �ж������Ƿ�Ϊ���ַ�������Ϊһ����Ч���ַ���������ȫ�ո��Ա��
         * @param  {String} value ��Ҫ������ֵ
         * @return {Boolean}      ��/��
         */
        validString: function(value)
        {
            return typeof(value) === "string" && !/^\s*$/.test(value);
        },

        /**
         * �ж������Ƿ�Ϊ���ַ���
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isString: function(value)
        {
            return typeof(value) === "string";
        },

        /**
         * �ж������Ƿ�Ϊ������
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isNumeric: function(value)
        {
            return jsApp.type(value) === "number" && !isNaN(value);
        },

        /**
         * �ж������Ƿ�Ϊ������
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isFunction: function(value)
        {
            return jsApp.type(value) === "function";
        },

        /**
         * �ж������Ƿ�Ϊ������
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isArray: function(value)
        {
            return jsApp.type(value) === "array";
        },

        /**
         * �ж������Ƿ�Ϊ�������顱��������lengthֵ���Ҹ�ֵΪ�������ͣ�
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        likeArray: function(value)
        {
            return value && (typeof(value.length) === "number");
        },

        /**
         * �ж������Ƿ�Ϊ�����ڣ������������ַ������硰2012-03-26����
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isDate: function(value)
        {
            return jsApp.type(value) === "date" ||
                (typeof(value) === "string" && !isNaN(Date.parse(value.replace(/-/g, "/"))));
        },

        /**
         * �ж������Ƿ�Ϊ��Object���󣨾���ָ�����ö����HTML��������Զ������
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isObject: function(value)
        {
            return value != null && 
                    jsApp.type(value) === "object" && 
                    value.toString().toLowerCase() === "[object object]";
        },
        
        /**
         * ��ȡֵ�������ַ���
         * <br />�������ͷ��ص��ַ���������£�
         * <br />����(��NaN)��   number
         * <br />�ַ�����        string
         * <br />ture/false��    boolean
         * <br />null��          null
         * <br />undefined��     undefined
         * <br />���飺          array
         * <br />������          function
         * <br />JSON��          object
         * <br />���ڶ���      date
         * <br />��ѧ����      math
         * <br />����          regexp
         * <br />window��
         * <br />    IE6/7/8:    object
         * <br />    chrome��    global
         * <br />    safari:     domwindow
         * <br />    ������      window
         * <br />document.body:
         * <br />    IE6/7/8:    object
         * <br />    ������      htmlbodyelement
         * @param  {��������} value ��Ҫ�ж�ֵ
         * @return {String}         ��������
         */
        type: function(value)
        {
            return value == null ? 
                String(value) :
                new RegExp("\\[object\\s+(.*)\\]").exec(Object.prototype.toString.call(value).toLowerCase())[1];
        },

        /**
         * ����cookie�������¸�cookie��ֵ
         * @param  {String} name   cookie������
         * @param  {String} value  Ϊcookieָ����ֵ
         * @param  {Number} [expires] ָ����ǰcookie�೤ʱ���ʧЧ����λ���֣���Ĭ��Ϊ�Ự������ʧЧ��
         * @param  {Object} [config] ������Ϣ
         * @param  {String} config.path ָ���ɷ���cookie��Ŀ¼���ƣ�Ĭ��ֵΪ��/������ʹcookie����ʱ��ҳ���ַΪhttp://www.xxx.com/syc/ts.html,��ô��Ĭ������¸�cookie���ܹ�sysĿ¼�¼����Ӽ�Ŀ¼�µ�ҳ����з��ʣ���http://www.xxx.com/why/jjs.html������ҳ�潫�޷����ʸ�cookie�������ҪʹwhyĿ¼�µ�ҳ��Ҳ���������ʣ�����Ҫ��path��������Ϊ��path=/why�����������Ҫʹ����վ������ҳ�涼��Ȩ�޷��ʸ�cookie������Ҫ��path��������Ϊ��վ��Ŀ¼������path=/���� ˵����һ��ҳ����Ը���path·���Ĳ�ͬ���������������ͬ���Ƶ�cookie��
         * @param  {String} config.domain ָ���ɷ���cookie����������Ĭ��ֵΪ�ա�Ĭ������£���������֮�䴴����cookie�ǲ����໥�����ʵġ�����yes.xxx.com���ʲ���www.xxx.com�����´�����cookie�������Ҫʵ�ֶ�������֮���ܹ����౻���ʣ�����Ҫ����domain����ֵΪ��domain=.xxx.com�����������ܱ�֤hyck.xxx.com��osp.xxx.com��yes.xxx.com�������µ���ҳҲ�ܹ���������www.xxx.com��������ҳ��������cookie�� ��˵������www.xxx.com�´���һ��cookieʱ�����Ϊ��cookie��domainֵָ��Ϊ����������������ô��cookie������ʧ�ܣ���
         * @param  {Boolean} config.secure �Ƿ����ð�ȫ�ԡ� Ĭ������£�ʹ��httpЭ�����ӵ�ҳ�漴�ɷ��ʸ�cookie���������˸����Ժ󣨸����Ե�����ֵ����Ϊ�κ��ַ�������""������ֻ��ͨ��https����������ȫЭ�����ӵ�ҳ����ܷ��ʸ�cookie��
         */
        setCookie: function(name, value, expires, config)
        {
            var path = "/", domain = "", secure = "", e_date;

            if(value === undefined)
            {
                return; //name��value�ر�
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
                expires = ";expires=" + e_date.toGMTString(); //����ʱ��ֵ������GMTʱ���ʽ��ͨ��toGMTString()�������ɽ�һ��ʱ��ֵת��ΪGMT��ʽ;
            }
            document.cookie = name + "=" + escape(value) + expires + ";path=" + path + domain + secure; //��name��value����escape���봦�����Ӷ�ʹ�ո񡢺��֡������ַ����硰%20������ʽ���б��档
        },

        /**
         * ��ȡָ��cookie��ֵ
         * ���û��Ŀ�����Ƶ�cookie���򷵻�null
         * @param  {String} name cookie������
         * @return {String}      ָ��cookie��ֵ
         */
        getCookie: function(name)
        {
            var result = new RegExp("\\b" + name + "=([^;]*)").exec(document.cookie);
            return result !== null ? unescape(result[1]) : null;
        },

        /**
         * ɾ��ָ�����Ƶ�cookie
         * <br />ͨ����cookie�Ĺ���ʱ������Ϊһ����ȥ��ʱ��ֵ���ɽ���cookieɾ����
         * @param  {String} name   ��Ҫɾ����cookie����;
         * @param  {Object} [config]   ������Ϣ
         * @param  {String} config.path   ����cookieʱ�����õ�Ŀ¼���ƣ�Ĭ��ֵΪ��/������Ϊһ��ҳ����Ը���path·���Ĳ�ͬ���������������ͬ���Ƶ�cookie����������½���ɾ����ʱ������Ҫָ��path·������˵������path����ֵָ��Ϊ��/�������޷�ɾ��pathֵΪ��/xxx��������cookie�������Ҫɾ����cookie�������ָ��delCookie������path����ֵҲΪ��/xxx������
         * @param  {String} config.domain   ����cookieʱ�����õ��������ƣ�Ĭ��ֵΪ�ա���Ϊһ��ҳ����Ը���domainֵ�Ĳ�ͬ���������������ͬ���Ƶ�cookie��������ɾ����ʱ��Ҳ����ָ��domainֵ��
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
         * ����browser������������������������Ϣ�Լ��������������صķ�����
         * @return {Object} �������Ϣ����
         */
        browser: (function()
        {
            var browser = /** @lends jsApp.browser */{

                /**
                 * ���������
                 * @type {String}
                 */
                name: "",

                /**
                 * ���������������������ı�ʶ��360SE����360�������sogou�����ѹ��������Maxthon�������Σ�TheWorld��������֮����THEWORLD��������֮�����ٰ棻BIDUBrowser�����ٶȣ�LBBROWSER�����Ա��������RSEBROWSER�������ǰ�ȫ�������QQBrowser����QQ�������TencentTraveler������ѶTT�������SaaYaa�������Σ���
                 * @type {String}
                 */
                alias: "",

                /**
                 * ������汾
                 * @type {String}
                 */
                version: "",

                /**
                 * �Ƿ�֧��Flash���
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
                            //��һ��������û��Flash��������޷���ɴ��������������׳���Automation ���������ܴ��������쳣
                            new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); 
                            canFlash = true;
                        }
                        catch(e){}
                    }
                    else if(plugins)
                    {
                        //For Firefox��Chrome��Safari��Opera
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
                 * ��Ϊ��ҳ
                 * <br />ͨ�����Ƕ�������վͷ��ĳ��λ�ü���һ������Ϊ��ҳ���Ĺ��ܣ�����û��һ��ȫ�����ݵ���Ϊ��ҳ�ķ����������ڴ˴���һ�������������Դ���������װ������
                 */
                setHome: function()
                {
                    try
                    {
                        //���IE�����(setHomePage�Ĳ���������һ����������վ��ַ��������������Ϊ��ҳ����)
                        document.body.style.behavior = 'url(#default#homepage)';
                        document.body.setHomePage(location.href);
                    }
                    catch(e)
                    {
                        //��ʱû���ҵ���������������ķ������ڴ�ʹ���ṩ���ܴ��棨ASCII���ַ��������������Ҫ�ֶ�������ҳ�������ȡ��������μ�����ΰѰٶ���Ϊ����������ҳ������
                        var ok = confirm("\u60a8\u7684\u6d4f\u89c8\u5668\u9700\u8981\u624b\u52a8\u8bbe\u7f6e\u9996\u9875\u3002\u5982\u9700\u83b7\u53d6\u5e2e\u52a9\uff0c\u8bf7\u53c2\u89c1\u201c\u5982\u4f55\u628a\u767e\u5ea6\u8bbe\u4e3a\u60a8\u7684\u4e0a\u7f51\u4e3b\u9875\u201d\uff01")
                        if(ok)
                        {
                            window.open("http://www.baidu.com/cache/sethelp/index.html", "_blank");
                        }
                    }
                },

                /**
                 * �����ղ�
                 * <br />�����ϣ�ֻ�����˳��õ���������������û�в��ԣ����������ǰҳ����뵽�ղؼеĿ�ݼ���Ctrl+D����Ϊ�������û�ִ�����������ͨ����ҳ���ĳ��λ�÷�����һ�����ơ������ղء������ӡ���Firefox��Opera���ø����ӵ�rel="sidebar"����ʵ�ָò��������Ǵ���覴ã����Ի���ʹ��JS��ִ�иò����ȽϺã�
                 */
                addFavorite: function()
                {
                    try
                    {
                        //���IE�������Ӳ���
                        //ע�����ڰ�ȫ�������⣬�����ļ���û��Ȩ��ִ���д��롣������IE�У��޷�ֱ��ִ��addFavorite��������Ҫͨ��dom�ڵ������¼���������������
                        //    ����IEΪ�ں˵�360���ѹ��������ȴ����������������
                        window.external.addFavorite(location.href, document.title);
                    }
                    catch(e)
                    {
                        try
                        {
                            //���Firefox�������Ӳ���
                            //ע�⣺addPanel����Ҫ����ַ��Ϣ������һ����������Ч����վ��ַ�������ڱ����ļ����в��Խ��޷�����Ч��
                            window.sidebar.addPanel(document.title, location.href, "");
                        }
                        catch(e)
                        {
                            //��������������������ʾ��Ctrl+D�������Ӳ�����ASCII���ַ��������ղ�û�гɹ�����ʹ��Ctrl+D������ɲ�������
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

            //��Թ����������ʹ�ñ�������ʶ��
            //��֪����ʲôĿ�ģ�360�������UA�������˶������ı�ʶ��Ϣ�������޷�ͨ��UA��������ж�������360������Բ���������www.cnzz.com��www.so.com��������Ȩ�ޣ���Щ����ͨ��360�������������ʱ����UA�н�����360SE����Ϣ��
            match = /MetaSr|Maxthon|TheWorld|BIDUBrowser|LBBROWSER|RSEBROWSER|QQBrowser|TencentTraveler|SaaYaa|360SE/i.exec(ua) || [];
            alias = match[0] || "";
            if(alias === "MetaSr")
            {
                alias = "sogou";
            }

            //ʹIE���������HTML5��ǩ
            /*----------------------------------
             *˵������ֹ2012-09-03��Firefox��Chrome��Safari��Opera��IE9�ȸ߼����������֧�ֻ�����HTML5��ǩ��������IE8�����Ͱ汾��IE��������޷�ʹ�����ǡ�
             *����취����IE�У�ֻ��Ҫͨ��document.createElement()��������һ��δ֪��HTMLԪ�أ��Ϳ�������ʹ��IE����δ֧�ֵı�ǩ��
             *=================================================================================*/
            if(!document.addEventListener)
            {
                tags = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
                for(i = 0, len = tags.length; i < len; i++)
                {
                    document.createElement(tags[i]);
                }
            }

            //���IE6����������汳��ͼƬ��Bug
            /*----------------------------------
             *˵��������ͨ����Ҫʹ��CSS�����б���ͼƬ�����ã���������IE6����һ��Bug���Ǿ���IE6Ĭ������²����汳��ͼƬ��CSS��ÿ�θ���ͼƬ��λ��ʱ�������·����������Ե��������CSS������Ԫ�����ƶ�ʱ��ͼƬ����˸�����������æ��״̬��
             *      �������һ����CSS�м���������ʽ��html { filter: expression(document.execCommand(��BackgroundImageCache��, false, true)); }
             *      ʹ�������������ܻ�Ӱ������ҳ��ļ����ٶȣ������Ƽ�ʹ��JS���������Bug��  
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

    //��jsApp��ԭ�ͽ�����չ���¼��󶨵Ŀ�ݷ�ʽ
    jsApp.each("mousewheel,mouseover,mousemove,mouseout,mousedown,mouseup,mouseenter,mouseleave,click,dblclick,focus,blur,change,keydown,keypress,keyup,load,unload,beforeunload,resize,scroll,error,contextmenu,hashchange".split(","),
    function(i, name)
    {
        jsApp.fn[name] = function(handler, capture)
        {
            this.bind(name, handler, capture);
        };
    });

    //��չArray�����ʵ����Ա
    arrayPrototype.unique === undefined && (arrayPrototype.unique = function()
    {
        //����Ŀ������ȥ���ظ�ֵ֮������ɵ�������
        var output = [],  //����������
            result = {},  //���ڽ���ж�
            i = 0,
            len = this.length,
            num;

        for(; i < len; )
        {
            num = this[i++];
            if(result[num] === undefined)
            {
                result[num] = 1;     //ʹ��1����ʾĿ�����Ѽ����µ�������
                output.push(num);    //����Ψһֵ
            }
        }
        return output;
    });
    arrayPrototype.indexOf === undefined && (arrayPrototype.indexOf = function(val)
    {
        //����Ŀ��������ָ��ֵ��һ�γ������ڵ�λ�ã��������򷵻�-1
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
        //ɸѡ��ԭ�����з������������г�Ա������������ʽ����
        var result = [],
            len = this.length,
            i = 0,
            item;

        for(; i < len; i++)
        {
            if(func(item = this[i]))
            {
                result.push(item);
            }
        }

        return result;
    });
    arrayPrototype.forEach === undefined && (arrayPrototype.forEach = function(func)
    {
        //���������е�ÿһ��Ԫ��
        var i = 0, len = this.length;
        for(; i < len; )
        {
            func(this[i++]);
        }
    });
    arrayPrototype.remove = function(val)
    {
        //ɾ����������Ŀ��ֵ��ͬ������Ԫ��
        var idx;

        while((idx = this.indexOf(val)) !== -1)
        {
            this.splice(idx, 1);
        }
        return this;
    }

    //��չString�����ʵ����Ա
    stringPrototype.trim === undefined && (stringPrototype.trim = function()
    {
        //ȥ��Ŀ���ַ�����β���˵����пո񣬲���Ϊ���ַ�������
        return this.replace(/^\s*|\s*$/g, "");
    });
    stringPrototype.contains === undefined && (stringPrototype.contains = function(match)
    {
        //�ж�Ŀ���ַ������Ƿ���ڼ����ַ���
        return typeof(match) === "string" && this.indexOf(match) >= 0;
    });
    stringPrototype.startsWith === undefined && (stringPrototype.startsWith = function(match)
    {
        //�ж�Ŀ���ַ����Ƿ��Լ����ַ�����ͷ
        return typeof(match) === "string" && this.indexOf(match) === 0;
    });
    stringPrototype.endsWith === undefined && (stringPrototype.endsWith = function(match)
    {
        //�ж�Ŀ���ַ����Ƿ��Լ����ַ�������
        return typeof(match) === "string" && new RegExp(match + "$").test(this);
    });

    //�ĵ�DOM��������Ϻ�ִ��һЩ��Ҫ����
    jsApp(function()
    {
        //���ڼ���IE6��7�е�querySelectorAll����
        if(!document.querySelectorAll)
        {
            var ele = document.createElement("style");
            ele.setAttribute("id", "jsApp_selectorStyle");
            document.getElementsByTagName("head")[0].appendChild(ele);  
        }
    });

    window.$ = window.jsApp = jsApp;   //��jsAppת��Ϊȫ�ֶ���

})(window);
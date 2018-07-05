//���еĶ��󡢷������������ŵ�һ�����������н��У���Ϊ�˷�ֹ��������������ȾWindow����
//�����ڸ����������д���window������Ϊ��������Ϊ���ڽ���ѹ��ʱ����window�ؼ�����ռ�õ��ֽڡ�
(function(window){

    //������ر���
    var 

        //����document��location��undefined�ȶ��������ֵ�����������һ��Ϊ�˼���ʹ������ʱ���������ʱ�䣬����Ϊ���ڽ���ѹ��ʱ�����ֽڡ�
        document = window.document,
        location = window.location,
        navigator = window.navigator,
        undefined = undefined,
        
        //����ready������Ŵ�����򼯺�
        readyList = [],

        //����Ҫ�ദʹ�õĶ�����
        stringPrototype = String.prototype,
        arrayPrototype = Array.prototype,
        emptyArray = [],
        slice = emptyArray.slice,
        isIE6 = !window.XMLHttpRequest;         //IE6��֧��window.XMLHttpRequest���ԡ�
        lessIE9 = !document.addEventListener,   //IE9���µ��������֧��document.addEventListener���ԡ�

        /**
         * ΪjsApp�е�ԭ�ͷ���ִ��ȫ�ּ�������
         * <br />ԭ�ͷ���ͨ����Ҫ��Լ��������Ԫ�ؼ��϶�ִ��ͬһ������ͨ���ú����ɽ���ͳһ���䡣
         * <br />ԭ�ͷ���ͨ����Ҫ�漰DOMԪ�صĲ�����ͨ���ú������ڻص�����ִ��ǰ�ж�Ŀ��Ԫ�ص����ޣ��Ӷ�ȷ���ص������д���ִ����ȷ��
         * <br />�ڻص������У�thisָ�������������һ����������Ŀ��Ԫ����Ԫ�ؼ����е�����ֵ���ڶ������������Ŀ��Ԫ�ء�
         * @param  {Object}   match    ��Ҫ���м����Ķ��󣨼�jsApp��ĳ������ʵ����
         * @param  {Function} callback �ص�����
         * @return {Object|Others}     ������������е�Ԫ�ؼ���Ϊ�գ��򷵻ؼ��������������Ϊ�գ��򷵻�Ԫ�ؼ����е�һ��Ԫ��ִ�лص������������صĽ����
         */
        map = function(match, callback)
        {
            var i = 1, len = match.length;

            if(len !== undefined && len > 0)
            {
                for(; i < len; i++)
                {
                    callback.call(match, i, match[i]);
                }
                return callback.call(match, 0, match[0]);
            }
            return match;
        },

        /**
         * ִ��readyList�б�
         */
        doReady = function()
        {
            jsApp.each(readyList, function(index, callback)
            {
                callback.call(document, jsApp); //readyList��ִ��ʱ��thisָ��document������һ��������ָ��jsApp����
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
         * @param  {DOMElement}   ele Ŀ��Ԫ��
         * @return {DOMElement}   ��һ���ڽڵ�
         */
        nextSibling = lessIE9 ? 
            function(ele){ return ele.nextSibling; } : 
            function(ele){ return ele.nextElementSibling; },

        /**
         * ��ȡĿ��Ԫ�ص�ǰһ���ڽڵ㣬����������򷵻�null
         * @param  {DOMElement}   ele Ŀ��Ԫ��
         * @return {DOMElement}   ǰһ���ڽڵ�
         */
        previousSibling = lessIE9 ? 
            function(ele){ return ele.previousSibling; } : 
            function(ele){ return ele.previousElementSibling; },

        /**
         * ��ȡĿ��Ԫ�صĵ�һ���ӽڵ㣬����������򷵻�null
         * @param  {DOMElement}   ele Ŀ��Ԫ��
         * @return {DOMElement}   ��һ���ڽڵ�
         */
        firstChild = lessIE9 ? 
            function(ele){ return ele.firstChild; } : 
            function(ele){ return ele.firstElementChild; },

        /**
         * ��ȡĿ��Ԫ�ص����һ���ӽڵ㣬����������򷵻�null
         * @param  {DOMElement}   ele Ŀ��Ԫ��
         * @return {DOMElement}   ��һ���ڽڵ�
         */
        lastChild = lessIE9 ? 
            function(ele){ return ele.lastChild; } : 
            function(ele){ return ele.lastElementChild; },

        /**
         * ����ָ������������ƥ����ʽ
         * @param  {String} name ָ������
         * @return {RegExp}      ����ƥ����ʽ
         */
        classReg = function(name)
        {
            return new RegExp("(^|\\s)+" + name + "(\\s|$)+", "g");
        },

        /**
         * ��ͨ����-�����ӵ��ַ���תΪ���շ�ʽ���硰font-size��ת��Ϊ��fontSize����
         * @param  {String} str ��Ҫת�����ַ���
         * @return {String}     ԭ�ַ������շ���ʽ
         */
        camelCase = function(str)
        {
            //IE�������˽������ǰ׺û���շ廯
            return str.replace(/^-ms-/, "ms-").replace(/-+(.)?/g, function(match, item)
            {
                return item ? item.toUpperCase() : "";
            });
        },

        /**
         * ���շ�ʽ�ַ���ת��Ϊ���ַ�ʽ���硰fontSize��ת��Ϊ��font-size��
         * @param  {String} str ��Ҫת�����ַ���
         * @return {String}     ԭ�ַ��������ַ�ʽ
         */
        dashCase = function(str)
        {
            return /-/.test(str) ? str.toLowerCase() : str.replace(/([A-Z])/g, "-$1").toLowerCase();
        },

        /**
         * ���ı��ڵ�HTML��ǩͳһת��ΪСд��ʽ
         * @param  {String} str ��Ҫת�����ַ���
         * @return {String}     ԭ�ַ�����ת����Ľ��
         */
        tagLowerCase = function(str)
        {
            return str.replace(/<\/?[a-z]+[0-9]?>/gi, function(match, item)
            {
                return match.toLowerCase();
            });
        },

        /**
         * ����CSS��ʽʱ�ļ�����ѡ����
         * @param  {String} name  ��ʽ������
         * @param  {String} value ��ʽ��ֵ
         * @return {String}       ��ʽ�����ַ������磺��font-size:12px����
         */
        cssString = function(name, value)
        {
            var result = "";

            switch(name)
            {
                //͸���ȣ�IE8�Լ����Ͱ汾�в�֧��document.addEventListener���Ҳ�֧��opacity͸�������ԣ�
                case "opacity":

                    result = !document.addEventListener ? "filter:alpha(opacity=" + value*100 + ")" : "opacity:" + value; 
                    break;

                //����
                default:

                    result = dashCase(name) + ":" + value;
            }
            return result;
        },

        /**
         * ��ȡCSS��ʽʱ�ļ�����ɸѡ����
         * @param  {DOMElement} Ŀ��ڵ�
         * @param  {String} name ��ʽ������
         * @param  {Object}      ��ʽ����
         * @return {String}      ��ʽ��ֵ
         */
        getCSS = function(ele, name, currentStyle)
        {
            var result;

            switch(name)
            {
                //͸���ȣ�IE8�Լ����Ͱ汾�в�֧��document.addEventListener���Ҳ�֧��opacity͸�������ԣ�
                case "opacity":

                    result = !document.addEventListener ? (ele.filters.alpha ? ele.filters.alpha.opacity / 100 : 1) : currentStyle[name]; 
                    break;

                //������IE֧��styleFloat���ʣ����������֧��cssFloat���ʣ�
                case "float":

                    result = ele.style.styleFloat === undefined ? currentStyle["cssFloat"] : currentStyle["styleFloat"];
                    break;

                //����
                default:

                    result = currentStyle[name];
            }

            if(result === "auto" && /width|height/.test(name))
            {
                //��IE����width��height������ֵΪautoʱ����ʹʹ�ü�������ʽ����Ҳ�޷���ȡ��ʵ��ֵ���ڴ�ʹ��.width()��.height�����������»�ȡ��
                result = name === "width" ? jsApp(ele).width() : jsApp(ele).height();
            }
            return result;
        },

        //����attr()��ȡ����ʱ����ɸѡ����
        getAttrFilter = function(ele, attr)
        {
            var result;
            switch(attr)
            {
                case "class":
                    //���Ԫ�ص�class����Ϊ���ַ���������Ϊû������class����
                    result = ele.className || null;
                    break;

                case "style":
                    //�Ƴ�style���Ժ�ֵΪ���ַ���
                    result = ele.style.cssText || null;
                    break;

                case "tabindex":
                    //��û��tabindex����ʱ��IE6/7�е�ֵΪ0������null��tabindex��������Ԫ�����ԣ�
                    result = ele.getAttribute(attr) || null;
                    break;

                case "for":
                    //label��ǩ��for������DOM���Ե���ʽ���д洢������ΪhtmlFor��������ǩ���������for���ԣ�����ΪԪ�����Խ��з���
                    result = "htmlFor" in ele ? ele.htmlFor : ele.getAttribute(attr);
                    break;

                default:
                    //Ĭ�ϻ�ȡDOM���ԣ������ȡԪ�����ԣ��븳ֵʱ�Ĳ�������Ŀ��һ����
                    //Ŀ��һ���ԣ������Ҫ����DOM���ԣ�ʹ��node[������]���У����Ҫ����Ԫ�����ԣ���ʹ��node.setAttribute()��node.getAttribute()���У�
                    result = ele[attr] || ele.getAttribute(attr);
            }

            return result || null;
        },

        //����attr()��������ʱ����ɸѡ����
        /*----------------------------------
         *˵����IE6��7��8�б��ؼ���type����Ϊֻ��
         *      IE6��7��8�и�����Ԫ�ص�tabindex����������Ч
         *      IE6��7��8�б��ؼ���maxlength����������Ч
         *      IE6��7��label��ǩ��for����������Ч
         *--------------------------------------------------------------------------------------------------------------------*/
        setAttrFilter = function(ele, attr, value)
        {
            switch(attr)
            {
                case "class":
                    ele.className = value;
                    break;

                case "style":
                    ele.style.cssText = value;
                    break;

                default:
                    //��DOM�����DOM����ֵΪ��ʱ��ʹ��setAttribute�������и�ֵ����Ϊ���ø��ַ�ʽʱ������Ŀ����������ΪԪ�����Ի���DOM���ԣ����õĽ��ֵ��������ȷ�ġ�
                    ele[attr] === null || ele[attr] === undefined ? ele.setAttribute(attr, value) : (ele[attr] = value);
            }
        },

        //����attr��css�ȷ�����value����ֵ��ɸѡ����������ֱ�ӵ��ַ���ֵ����һ��ִ�к�����
        //�ú�����ִ��ʱ��this�ؼ���ָ�����Ŀ��Ԫ�ص����á�
        /*----------------------------------
         *����˵����
         *1. index�������ͣ�Number�������Ŀ��Ԫ����ƥ�伯���е�����λ�ã�
         *2. value�������ͣ�String/Function���������Ҫ���и�ֵ��Ŀ��ֵ��
         *=================================================================================*/
        filterValue = function(index, value)
        {
            if(jsApp.isFunction(value))
            {
                return value.call(this, index);
            }
            return value;
        },

        /**
         * ��ȡʮ��������ֵA~F����Ӧ��ʮ������ֵ
         * @param  {String} num ʮ��������ֵA-F
         * @return {Number}     ʮ������ֵ
         */
        getDecimalValue = function(num)
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
        getHexValue = function(num)
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
         * ��Ԫ����ԭ����ʾ�Ķ���
         * @type Object
         */
        $ = window.$,

        /**
         * ��������jsApp
         * @class
         * @global
         * @param  {String|Function|Window|DOMElement} selector ѡ��������������ʵ������Ļ��������
         * @example
         * var ele = jsApp("#element_ID");  //��ʼ��jsApp����ʵ����������Ŀ��IDԪ�صķ�װ����
         */
        jsApp = function(selector, context)
        {
            return new jsApp.init(selector, context);
        };

    /**
     * ��ʼ��jsAPp����ʵ��
     * @param  {All} selector ѡ����
     * @param  {DOMElement|DOMDocument} context  ������
     * @return {jsApp}
     */
    jsApp.init = function(selector, context)
    {
        var _self = this;

        //ƥ�䣺$()��$("")��$(undefined)��$(null)��$(false)��$(0)
        if(!selector)
        {
            return;
        }

        //ƥ�䣺ѡ�����ַ�������$("#id")��$("div")��$("div p:first-child span")...
        if(typeof(selector) === "string")
        {
            jsApp.merge(_self, jsApp.find(selector, context));
        }
        //ƥ�䣺$(DOMElement)��$(document)��$(window)
        else if(selector.nodeType || selector === window)
        {
            _self[0] = selector;
            _self.length = 1;
        }
        //ƥ�䣺$(function)
        //Ϊready�¼��ṩ�Ŀ�ݷ�ʽ
        else if(jsApp.isFunction(selector))
        {
            _self.ready(selector);
        }
    }

    //��չjsApp�����ʵ����Ա
    jsApp.fn = jsApp.prototype = /** @lends jsApp.prototype */{
        
        //Ԫ�ؼ��ϵĳ���
        length: 0,

        /**
         * ��Ԫ��������뵽�µ�jsAppʵ�����󣬲������µ�jsApp����
         * @param  {DOMElement Array} eles Ԫ������
         * @return {jsApp}
         */
        pushStack: function(eles)
        {
            var result = jsApp.merge(jsApp(), eles);
            result.prevObject = this;   //ʹ��prevObject���Ա�ʾ���б���ɸѡ����ǰ�Ľ��
            return result;
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
            jsApp.each(this, callback);
            return this;
        },

        /**
         * ��ȡԪ�ؼ���������ֵ��start��ʼλ�õ�end����λ��֮�䣨������end��������Ԫ�ع������µ�jsApp����
         * <br />��ʼλ�úͽ���λ�ã��ȿ����ǷǸ�����Ҳ�����Ǹ�������Ϊ�Ǹ���ʱ����ʾ���Ǿ��������λ�ã���Ϊ����ʱ�����ʾ���ǵ����ڼ���Ԫ�ء�
         * <br />�ڻ�ȡ���֮ǰ��ͨ���Ὣstart��end��������ת��Ϊ��ȷ������λ�á�ת��Ϊ��ȷ������λ�ú�����start����λ��end֮ǰ�������ȡ�Ľ��Ϊ�գ���start����Ϊ��Ч������λ�ã������ȡ�Ľ��ҲΪ�գ�end���Գ���Ԫ�ؼ��ϵĳ���Ҳ���Բ��ṩ�ò�������ʱ�Ľ����ʾ��startλ�ÿ�ʼһֱ��Ԫ�ؼ��ϵ����һ��Ԫ�أ�������Ԫ�أ���start��end���������Բ��ṩ����ʱ��ʾ�����е�����Ԫ�ء���
         * <br />�����ȡ�Ľ��Ϊ�գ���ֱ�ӷ���ʵ��������
         * @param  {Number} [start] ��ʼλ��
         * @param  {Number} [end] ����λ��
         * @return {Object}       �µ�jsAppʵ������
         */
        slice: function(start, end)
        {
            if(this.length === 0) return this;
            return this.pushStack(slice.apply(this, arguments));
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
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        next: function(selector)
        {
            var result = [];
            jsApp.each(this, function(index, ele)
            {
                (ele = nextSibling(ele)) !== null && result.push(ele);
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ��֮��������ֵܽڵ�����ɵ��µ�jsApp����
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        nextAll: function(selector)
        {
            var result = [], obj;   
            jsApp.each(this, function(index, ele)
            {
                while((obj = nextSibling(ele)) !== null)
                {
                    result.push(obj);
                }
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ��ǰһ���ڽڵ����������µ�jsApp����
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        prev: function(selector)
        {
            var result = [];
            jsApp.each(this, function(index, ele)
            {
                (ele = previousSibling(ele)) !== null && result.push(ele);
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ��֮ǰ�������ֵܽڵ�����ɵ��µ�jsApp����
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        prevAll: function(selector)
        {
            var result = [], obj;   
            jsApp.each(this, function(index, ele)
            {
                while((obj = previousSibling(ele)) !== null)
                {
                    result.push(obj);
                }
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�������ֵܽڵ�����ɵ��µ�jsApp����
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        siblings: function(selector)
        {
            var result = [];
            jsApp.each(this, function(index, ele)
            {
                jsApp.merge(result, jsApp.makeArray(ele.parentNode.children).filter(function(item){ return item !== ele }));
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },
        
        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�������ӽڵ㣨���������ֺ�ע�ͽڵ㣩����ɵ��µ�jsApp����
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        children: function(selector)
        {
            var result = [];
            jsApp.each(this, function(index, ele)
            {
                jsApp.merge(result, ele.children);
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },
        
        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�������ӽڵ㣨�������ֺ�ע�ͽڵ㣩����ɵ��µ�jsApp����
         * @return {Object} �µ�jsAppʵ������
         */
        contents: function()
        {
            var result = [];
            jsApp.each(this, function(index, ele)
            {
                jsApp.merge(result, ele.childNodes);
            });
            return this.pushStack(result);
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�صĸ��ڵ�����ɵ��µ�jsApp����
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        parent: function(selector)
        {
            var result = [];
            jsApp.each(this, function(index, ele)
            {
                (ele = ele.parentNode) !== null && result.push(ele);
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },

        /**
         * ��ȡԪ�ؼ�����ÿ��Ԫ�ص����и��ڵ㣨��������Ԫ�أ�����ɵ��µ�jsApp����
         * @param {String} [selector] ѡ������ֻ�������ѡ����ʱ�Żᱻ����
         * @return {Object} �µ�jsAppʵ������
         */
        parents: function(selector)
        {
            var result = [], parent;   
            jsApp.each(this, function(index, ele)
            {
                while((parent = ele.parentNode) !== null && parent !== document)
                {
                    result.push(parent);
                }
            });
            return this.pushStack(jsApp.isString(selector) ? jsApp.matches(selector, result) : result);
        },

        /**
         * ��Ԫ�ؼ��Ͻ���ɸѡ������������������Ԫ����ϳ��µ�jsApp���󲢷���
         * @param  {String|Function|DOMElement|jsApp} selector ɸѡ����
         * @return {jsApp}
         */
        filter: function(selector)
        {
            var result = [];

            //ɸѡ������ѡ����������Ԫ��
            if(jsApp.isString(selector))
            {
                result = jsApp.matches(selector, this);
            }
            //ɸѡ���ص���������true��Ԫ��
            //�ص�������������index��Ԫ�ؼ��ϵ�ǰ�������ֵ
            //�ص�������������ele��Ԫ�ؼ��ϵ�ǰ���ֵ
            //�ص���������this��Ԫ�ؼ��ϵ�ǰ���ֵ
            else if(jsApp.isFunction(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    selector.call(ele, index, ele) === true && result.push(ele);
                });
            }
            //ɸѡ��jsApp�����е�Ԫ��
            else if(jsApp.isJSApp(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    emptyArray.indexOf.call(selector, ele) >= 0 && result.push(ele);
                });
            }
            //�Ƴ�ָ����DOMԪ��
            else if(jsApp.isDOM(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    ele === selector && result.push(ele);
                });
            }
            
            return this.pushStack(result);
        },

        /**
         * ��Ԫ�ؼ��Ͻ���ɸѡ������������������Ԫ�ش�ԭԪ�ؼ������Ƴ������������µ�Ԫ������ɵ��µ�jsApp����
         * @param  {String|Function|DOMElement|jsApp} selector ɸѡ����
         * @return {jsApp}
         */
        not: function(selector)
        {
            var result = [];

            //�Ƴ�����ѡ����������Ԫ��
            if(jsApp.isString(selector))
            {
                result = jsApp.matches(":not(" + selector + ")", this);
            }
            //�Ƴ��ص���������true��Ԫ��
            //�ص�������������index��Ԫ�ؼ��ϵ�ǰ�������ֵ
            //�ص�������������ele��Ԫ�ؼ��ϵ�ǰ���ֵ
            //�ص���������this��Ԫ�ؼ��ϵ�ǰ���ֵ
            else if(jsApp.isFunction(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    selector.call(ele, index, ele) !== true && result.push(ele);
                });
            }
            //�Ƴ�jsApp�����е�Ԫ��
            else if(jsApp.isJSApp(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    emptyArray.indexOf.call(selector, ele) < 0 && result.push(ele);
                });
            }
            //�Ƴ�ָ����DOMԪ��
            else if(jsApp.isDOM(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    ele !== selector && result.push(ele);
                });
            }
            else
            {
                result = this;
            }

            return this.pushStack(result);
        },

        /**
         * ��Ԫ�ؼ��Ͻ���ɸѡ����������������ѡ���������ĺ��Ԫ�ػ����ָ��HTML�����Ԫ����ϳ��µ�jsApp���󲢷���
         * @param  {String|DOMElement}  selector ɸѡ����
         * @return {jsApp}          �µ�jsApp����
         */
        has: function(selector)
        {
            var result = [], matches;

            //ɸѡ�����Ԫ��������ѡ����������Ԫ��
            if(jsApp.isString(selector))
            {
                if(/^[^\s>+~]+$/.test(selector))
                {
                    //��Ϊ���й�ϵ�򵥸�ѡ����ʱ���÷�ʽЧ��ҪԶԶ�������棩
                    jsApp.each(this, function(index, ele)
                    {
                        if(jsApp.find(selector, ele).length > 0)
                        {
                            result.push(ele);
                        }
                    });
                }
                else
                {
                    //ƥ�䣺���ѡ������div p��������ѡ������div+p������ѡ������div>p���������ֵ�ѡ������div~p��
                    matches = jsApp.find(selector);
                    return this.filter(function(index, ele)
                    {
                        var item, i = 0, len;
                        for(len = matches.length; i < len;)
                        {
                            if(ele.contains(item = matches[i++]) && ele !== item) return true;
                        }
                    });
                }
            }
            //ɸѡ������ָ��HTML�����Ԫ��
            else if(jsApp.isDOM(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    if(ele.contains(selector) && ele !== selector)
                    {
                        result.push(ele);
                    }
                });
            }

            return this.pushStack(result);
        },

        /**
         * �жϵ�ǰԪ�ؼ������Ƿ�������Ŀ�����������Ԫ�أ����������һ��Ԫ��ƥ���򷵻�true
         * @param  {String|Function|DOMElement|jsApp} selector ���ڶԱȵ�Ŀ�����
         * @return {Boolean}
         */
        is: function(selector)
        {
            var matches = [], result = false;

            //ƥ��ѡ����
            if(jsApp.isString(selector))
            {
                matches = jsApp.find(selector);
            }
            //ƥ��ص�����
            //�ص�������������index��Ԫ�ؼ��ϵ�ǰ�������ֵ
            //�ص�������������ele��Ԫ�ؼ��ϵ�ǰ���ֵ
            //�ص���������this��Ԫ�ؼ��ϵ�ǰ���ֵ
            else if(jsApp.isFunction(selector))
            {
                jsApp.each(this, function(index, ele)
                {
                    return !(result = selector.call(ele, index, ele));
                });
                return result;
            }
            //ƥ��jsApp����
            else if(jsApp.isJSApp(selector))
            {
                matches = selector;
            }
            //ƥ��DOMԪ��
            else if(jsApp.isDOM(selector))
            {
                matches = [selector];
            }

            jsApp.each(this, function(index, ele)
            {
                return !(result = emptyArray.indexOf.call(matches, ele) >= 0);
            });

            return result;
        },

        /**
         * ���µ�Ԫ�����顢jsApp����DOMԪ�ؼ��뵽Ԫ�ؼ�����
         * @param {String|jsApp|DOMElement} selector ��ӵ�����
         * @param {DOMElement} context  ��Ϊѡ�������ʱ��Ϊ��ѯ������
         */
        add: function(selector, context)
        {
            var result = [];

            //���������ѡ������Ԫ�ؽڵ����
            if(jsApp.isString(selector))
            {
                result = jsApp.find(selector, context);
            }
            //��jsApp�������
            else if(jsApp.isJSApp(selector))
            {
                result = selector;
            }
            //��DOMԪ�ؼ���
            else if(jsApp.isDOM(selector))
            {
                result = [selector];
            }

            return this.pushStack(jsApp.unique(jsApp.merge(jsApp.makeArray(this), result)));
        },

        /**
         * ������Ԫ�ؼ��ϼ��뵽��һ�λ�õ�Ԫ�ؼ�����
         * @return {jsApp}
         */
        addBack: function()
        {
            return this.add(this.prevObject);
        },

        /**
         * ��ֹ���µĹ��˲��������ص���һ�λ�õ�Ԫ�ؼ���
         * @return {jsApp}
         */
        end: function()
        {
            return this.prevObject || this;
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
         * ��Ŀ��Ԫ�ر�����ĵ����Ƴ�
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
         * @param  {String|DOMElement} node HTML�ı����ݻ�����ؽڵ�
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
         * @param  {String|DOMElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {Object}      ʵ��������
         */
        append: function(node)
        {

        },

        /**
         * ����ؽڵ����HTML�ı����ݣ���Ϊ�ֵܽڵ���뵽Ŀ��Ԫ�ص�ǰ��
         * <br />�������Ϊ��ؽڵ㣬��ִ�н��ýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|DOMElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {Object}      ʵ��������
         */
        before: function(node)
        {

        },

        /**
         * ����ؽڵ����HTML�ı����ݣ���Ϊ�ֵܽڵ���뵽Ŀ��Ԫ�صĺ���
         * <br />�������Ϊ��ؽڵ㣬��ִ�н��ýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|DOMElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {Object}      ʵ��������
         */
        after: function(node)
        {
            return map(this, function(index, ele)
            {
                if(jsApp.isString(node))
                {
                    ele.insertAdjacentHTML("afterend", node);
                }
                else
                {

                }

                return this;
            });
        },

        /**
         * ��Ŀ��Ԫ���滻����ؽڵ����HTML�ı�����
         * <br />�������Ϊ��ؽڵ㣬��ִ�иýڵ���ƶ����������Ǹ��ơ�
         * @param  {String|DOMElement} node HTML�ı����ݻ�����ؽڵ�
         * @return {[type]}      [description]
         */
        replaceWith: function(node)
        {

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
                    return tagLowerCase(ele.innerHTML);  //IE6~8�з��صı�ǩ��ĸΪ��д���ڷ���ǰ����ΪСд
                }
                
                if(jsApp.isFunction(html))
                {
                    html = html.call(this, index, ele.innerHTML);
                }
                ele.innerHTML = "" + html;
                return this;
            });
        },

        /**
         * ��ȡĿ��Ԫ�ص��ڲ����ı����ݣ�����HTML���ȫ��ȥ���Ľ���������߽�Ŀ��Ԫ�ص������滻���µ��ı����ݣ������HTML��ǣ���������ת�봦��
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
                jsApp(ele).empty();
                ele.appendChild(document.createTextNode(text));
                return this;
            });
        },

        /**
         * ΪԪ�ؼ����е�ÿ��Ԫ���������
         * <br />�����Ҫ��Ӷ�������������ַ�����ʹ�ÿո������
         * <br />�������Ϊ����������Ҫ��ӵ������ַ����ɺ������з��أ��ں����зֱ𴫵�����ֵ�Լ�����Ԫ�ص�ǰ�������ַ�����this��ָ������Ԫ�ء�
         * @param {String|Function} name ��Ҫ��ӵ�����
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

                //��Ҫ��ӵ�����������һ����Ч���ַ���
                jsApp.isValidString(name) && name.trim().split(/\s+/).forEach(function(item)
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
         * ΪԪ�ؼ�����ÿ��Ԫ���л�����״̬
         * <br />�����Ҫ�л��������״̬�������ַ�����ʹ�ÿո������
         * @param {String} name ��Ҫ�л�������
         * @param {Boolean} [add] true��ʾ��ӣ�false��ʾ�Ƴ���û�иò��������ʾ�Ѵ�����ɾ��������������ӡ�
         * @return {Object}     ʵ��������
         */
        toggleClass: function(name, add)
        {
            if(!jsApp.isValidString(name))
            {
                return this; //��Ҫɾ��������������һ����Ч���ַ���
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
         * ����Ԫ�ؼ����еĵ�һ��Ԫ���Ƿ����ĳ������
         * @param {String} name ��Ҫ�жϵ�����
         * @return {Boolean}    ��/��
         */
        hasClass: function(name)
        {
            return this.length > 0 && jsApp.isValidString(name) && (" " + this[0].className + " ").indexOf(" " + name + " ") >= 0;
        },

        //============================================================================================================================//
        //���û��ȡHTMLԪ�صı�ǩ���ԣ����Ҫ��ʾ�Զ������ԣ������Ʊ�����ӡ�data-��ǰ׺��
        //˵���������ȡ������û�б������򷵻�null��
        //ע�⣺value����ֵ�������ַ���ֵ��Ҳ������һ���������á���Ϊ��������ʱ�����ú����е�thisָ�����Ŀ��Ԫ�أ�����һ������Ϊindex������ʾԪ����ƥ�伯���е�������
        attr: function(name, value)
        {
            return map(this, function(index, ele)
            {
                var isJSON = jsApp.isPlainObject(name),
                    items = {},
                    i;

                if(!isJSON && value === undefined)
                {
                    return getAttrFilter(ele, name);
                }

                isJSON ? (items = name) : (items[name] = value);
                for(i in items)
                {
                    setAttrFilter(ele, i, filterValue.call(ele, index, items[i]));
                }
                return this;
            });
        },

        //============================================================================================================================//
        //����Ŀ��HTMLԪ�����Ƿ��������������
        hasAttr: function(name)
        {
            return this.attr(name) !== null;
        },

        //============================================================================================================================//
        //�Ƴ�HTMLԪ�ص��������
        removeAttr: function(name)
        {
            return map(this, function(index, ele)
            {
                name === "class" ? ele.className = "" : ele.removeAttribute(name);
                return this;
            });
        },

        /**
         * ����1����ȱ��[value]����ʱ����ʾ��ȡԪ�ؼ����е�һ��Ԫ�ص�ĳ��������ʽ��ֵ�������Ҫ���ض����ʽ��ֵ������ʽ��������������ʽ���������صĽ��Ϊ������-ֵ����JSON��ʽ��
         * ����2����ӵ��[value]����ʱ����ʾΪԪ�ؼ����е�ÿ��Ԫ��������Ӧ��ʽ��ֵ������ò���Ϊ���������ɺ�������������Ҫ�������ʽֵ���ں����зֱ𴫵�����ֵ�Լ�����Ԫ�ص�ǰ����ʽֵ��this��ָ������Ԫ�ء�
         * ����3����[name]����ΪObjectʱ����ʾΪԪ�ؼ����е�ÿ��Ԫ��������ʽ��ֵ������ʽ���ƺͶ�Ӧ��ֵ����Object��
         * ע�⣺�����ȡ�����Բ����ڣ��򷵻�undefined��
         * @param  {String|Array|Object} name  ��������
         * @param  {String|Function} value ����ֵ
         * @return {String|Object}  ��ȡ����ʽֵ|ʵ��������
         */
        css: function(name, value)
        {
            var result, obj, key, css;

            if(this.length < 1)
            {
                return this;
            }

            //��ȡ����������ʽ��ֵ
            if(!jsApp.isPlainObject(name) && value === undefined)
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
            //���õ�����ʽ��ֵ
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

            //ʹ�á���ʽ��:ֵ����JSON��ʽ���и�ֵʱ
            for(key in name)
            {
                css += ";" + cssString(key, name[key]);
            }

            //����Ҫ���õ���ʽ����ͨ��cssText����׷�ӣ��Ӷ������ػ�������Ĵ���
            return this.each(function(index, ele)
            {
                ele.style.cssText += ";" + css;      
            });
        },

        /**
         * ���ػ�����Ŀ��Ԫ�ص����ݿ�ȣ���������padding��border��margin��ֵ
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        width: function(value)
        {

        },

        /**
         * ����¼���
         * @param  {String} name    �¼�����
         * @param  {Function} handler �¼��������
         * @param  {Boolean} [capture=false] �Ƿ�����¼���׽
         * @return {Function}         �¼��������
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
         * @param  {Function} handler �¼��������
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
         * DOM���������ʱ��ִ��ͨ��ready��ӵĴ������
         * <br />ͨ���÷�ʽ��ӵĴ������������γ�������DOM��֮��ʹ�����������Ҫ��load�¼�����������ҳ��Ԫ��ȫ��������Ϻ�Żᴥ����������ҳ�����ص����ھ�����¼������������ζ���û��ܹ��������ҳ����н�����
         * @param  {Function} handler ��Ҫ�󶨵Ĵ������
         * @return {Object}         ʵ��������
         */
        ready: function(handler)
        {
            //�����Ӵ������ʱDOM���Ѿ�������ϣ���ô1������Զ�ִ�У�֮����ʹ�ö�ʱ������Ϊ��ʵ���첽ִ�У�
            var readyState = document.readyState;
            if(readyState === "interactive" || readyState === "complete")
            {
                return setTimeout(handler, 1);
            }

            //��Ӵ�������б�
            readyList.push(handler);
            if(readyList.length === 1)
            {
                //������һ����Ӵ������ʱ�Ž���DomContentLoaded�¼��ļ�⡣
                DomContentLoaded();
            }
            return this;
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
    jsApp.extend = jsApp.fn.extend = function()
    {
        //����1������Ϊ����ֵʱ���ò���������ʾ�Ƿ������Ⱥϲ�����Ⱥϲ���ʾ�ڽ��кϲ�����ʱҲ��Ƕ�׵��Ӷ�����кϲ���
        //��������������1���Ҳ��ǲ���ֵʱ���򽫸ò����ĸ�����Ա�ϲ���jsApp����jsApp.fn��
        //��������������1���ҵ�1���������ǲ���ֵʱ���򽫺��������еĸ���Ա�ϲ�����1��������
        //�ϲ�����ʱ����ͬ���Ƶ�Ԫ�ؽ��������ֵ����
        var name, item, src, collection,
            argu = arguments,       //����
            arguLen = argu.length,  //�����ĳ���
            target = argu[0] || {}, //��Ҫ��չ��Ա��Ŀ�����
            i = 1,                  //��չ�ĳ�Ա���ĸ�����������ʼ
            deep = false;           //�Ƿ������Ⱥϲ�

        if(typeof target === "boolean")
        {
            deep = target;
            target = argu[1] || {};
            i = 2;
        }
        else if(arguLen === 1)
        {
            target = this; 
            i = 0;
        }

        //����Ҫ��չ�ĳ�Ա���뵽Ŀ�����
        for(; i < arguLen; i++)
        {
            collection = argu[i];
            for(name in collection) //������null��undefined�����֡�����ֵ����ִ�б�������
            {
                item = collection[name];
                if(deep && jsApp.isPlainObject(item) && (src = target[name]) !== undefined)
                {
                    if(!jsApp.isPlainObject(src)){ src = {}; }  //ȷ����Ⱥϲ��Ľ��ΪPlainObject����
                    target[name] = jsApp.extend(deep, src, item);
                }
                else if(item !== undefined)
                {
                    //ȷ��Ԫ�ص�ֵ����undefined����
                    target[name] = item;
                }
            }
        }

        //������չ���Ŀ����󷵻أ�������jsApp����Ҳ��������������
        return target;
    };

    //��չjsApp����ľ�̬��Ա
    jsApp.extend(/** @lends jsApp */{

        /**
         * ʹjsApp����$��������ͻ��ִ�иô�������$��ǰ��ʾ����jsApp����������ָ�������ֵΪjsApp֮ǰ��ֵ��
         */
        noConflict: function()
        {
            window.$ === jsApp && (window.$ = $);
            return jsApp;
        },

        /**
         * ���ڱ������顢���󣬲���ÿһ��ֵ����ص�������ִ��
         * @param  {Array|Object}   obj     ��Ҫ��������������  
         * @param  {Function} callback  �ص�����
         */
        each: function(obj, callback)
        {
            var i = 0, name, len;

            //�ص�������function(index, ele){}
            //�ص�����-����index����ǰ�������
            //�ص�����-����ele����ǰ���ֵ
            //�ص�����-this����ǰ���ֵ
            if(jsApp.isArrayLike(obj))
            {
                for(len = obj.length; i < len; i++)
                {
                    if(callback.call(obj[i], i, obj[i]) === false)
                    {
                        break; //����ص���������false�����˳�����
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
         * ��NodeListת��ΪArray
         * <br />NodeList������DOM�ĸ��Ķ������£���ĳЩ����²���ֱ�Ӳ���������ת��Ϊ��̬��������д���
         * @param  {NodeList} nodes ��Ҫ��ת����NodeList����
         * @return {Array}      ת����Ľ��
         */
        makeArray: function(nodes)
        {
            var arr = [], i = 0, len;

            if(!jsApp.isArrayLike(nodes))
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
         * ������2�ϲ�������1������������1������1��ֵ�������
         * @param  {Array} first ����1
         * @param  {Array} second ����2
         * @return {Array}
         */
        merge: function(first, second)
        {
            var i = 0, j, len;

            if(!jsApp.isArrayLike(first)) first = [];
            j = first.length;

            if(jsApp.isArrayLike(second))
            {
                for(len = second.length; i < len;)
                {
                    first[j++] = second[i++];
                }
            }
            else
            {
                first[j++] = second;
            }
            first.length = j;

            return first;
        },

        /**
         * �������顢�����е�ÿһ����ص��������ص�ֵ��ϳ�һ���µ����鲢���أ�������null��undefined��
         * @param  {Array|Object}   arr      ��Ҫ��������������
         * @param  {Function} callback �ص�����
         * @return {Array}
         */
        map: function(arr, callback)
        {
            var i = 0, j = 0, len, value, result = [];

            //�ص�������function(ele, index){}
            //�ص�����-����ele����ǰ���ֵ
            //�ص�����-����index����ǰ�������
            //�ص�����-this��window
            if(jsApp.isArrayLike(arr))
            {
                for(len = arr.length; i < len; )
                {
                    if((value = callback(arr[i], i++)) != undefined)
                    {
                        result[j++] = value;    
                    }
                }
            }
            else
            {
                for(i in arr)
                {
                    if((value = callback(arr[i], i)) != undefined)
                    {
                        result[j++] = value;    
                    }
                }
            }

            return result;
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
            try
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
            }
            catch(e)
            {
                return "";
            }
        },

        /**
         * ����len��Ŀ���ַ�����ƴ�ӽ��
         * @param  {String} str Ŀ���ַ���
         * @param  {Number} len ��Ҫƴ�ӵĴ���
         * @return {String}     �ַ���ƴ�Ӻ�Ľ��
         */
        dupStr: function(str, len)
        {
            var result = "", i = 0;
            for(; i < len; i++)
            {
                result += str;
            }
            return result;
        },

        /**
         * ���ڻ�ȡ��ǰҳ�������ѡ����ı�ֵ
         * @return {String} ���ѡ�е��ı�
         */
        getSelection: function()
        {
            var str = document.selection ? document.selection.createRange().text : document.getSelection();  //IE6~8֧��selection�������������֧��getSelection������
            return str + "";    //�����ʹ�ø���䷵��ֵ��������selection�����á�
        },

        /**
         * ����ʮ������ת��Ϊʮ�������ַ����Ľ��
         * @param  {Number} num   ��Ҫ��ת����ʮ������
         * @param  {Number} [digit] ������Ҫ��ʾ���ַ���λ����Ĭ��Ϊת�����ʵ��λ�������ٵ��á�0�������
         * @return {String}       ��ת�����ʮ�������ַ���
         */
        getDecimalToHex: function(num, digit)
        {
            var valueStr = [], index = 0;

            if(!jsApp.isNumeric(num)){ return "0"; }

            while(num > 15)
            {
                valueStr[index] = getHexValue(num % 16);
                num = parseInt(num / 16);
                index++;
            }
            valueStr[index] = getHexValue(num);

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
            var i = 0, result = 0, len = ("" + hex).length - 1;
            hex = String(hex).toLowerCase();
            
            if(!/[^0-9a-f]/.test(hex)) //�����ж����Ƿ�Ϊ��Ч��ʮ��������
            {
                for(; i < len; i++)
                {
                    result += Math.pow(16, hex.length - 1 - i) * getDecimalValue(hex.charAt(i));
                }
                result += getDecimalValue(hex.charAt(hex.length - 1));
            }
            return result;
        },

        /**
         * �ж������Ƿ�Ϊ��DOMԪ��
         * @param  {��������}  value ��Ҫ�жϵ�ֵ
         * @return {Boolean}       ��/��
         */
        isDOM: function(value)
        {
            return value && value.nodeType;
        },

        /**
         * �ж������Ƿ�Ϊ��jsApp����
         * @param  {��������}  value ��Ҫ�жϵ�ֵ
         * @return {Boolean}       ��/��
         */
        isJSApp: function(value)
        {
            return value instanceof jsApp;
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
         * �ж������Ƿ�Ϊ��һ����Ч���ַ���������ȫ�ո��Ա��
         * @param  {String} value ��Ҫ������ֵ
         * @return {Boolean}      ��/��
         */
        isValidString: function(value)
        {
            return typeof(value) === "string" && !/^\s*$/.test(value);
        },

        /**
         * �ж������Ƿ�Ϊ����Ч����
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
         * <br />ע�⣺window�����length����Ϊ1��function�����length����Ϊ0�����Ƕ�����Ϊ�����顱���д���
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isArrayLike: function(value)
        {
            return value != null && !jsApp.isWindow(value) && !jsApp.isFunction(value) && typeof(value.length) === "number";
        },

        /**
         * �ж������Ƿ�Ϊ������
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isDate: function(value)
        {
            return jsApp.type(value) === "date";
        },

        /**
         * �ж������Ƿ�Ϊ�������ַ������硰2012-03-26��
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isDateString: function(value)
        {
            return typeof(value) === "string" && !isNaN(Date.parse(value.replace(/-/g, "/")))
        },

        /**
         * �ж������Ƿ�Ϊ��ͨ��{}����new Object()�����Ķ��󣨾���ָ�����ö����HTML��������Զ������
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isPlainObject: function(value)
        {
            return jsApp.type(value) === "object" && value.toString().toLowerCase() === "[object object]";
        },

        /**
         * �ж������Ƿ�Ϊ��һ��window�����統ǰ���ڻ���һ��iframe��
         * @param  {��������} value ��Ҫ�жϵ�ֵ
         * @return {Boolean}        ��/��
         */
        isWindow: function(value)
        {
            return value != null && value == value.window;
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
         * ���cookie�������¸�cookie��ֵ
         * @param  {String} name   cookie������
         * @param  {String} value  Ϊcookieָ����ֵ
         * @param  {Number} [expires] ָ����ǰcookie�೤ʱ���ʧЧ����λ���֣���Ĭ��Ϊ�Ự������ʧЧ����ͬ�����øò���Ϊ0����
         * @param  {Object} [config] ������Ϣ
         * @param  {String} config.path ָ���ɷ���cookie��Ŀ¼���ƣ�Ĭ��ֵΪ��/������ʹcookie����ʱ��ҳ���ַΪhttp://www.xxx.com/syc/ts.html����ô��Ĭ������¸�cookie���ܹ�sysĿ¼�¼����Ӽ�Ŀ¼�µ�ҳ����з��ʣ���http://www.xxx.com/why/jjs.html������ҳ�潫�޷����ʸ�cookie�������ҪʹwhyĿ¼�µ�ҳ��Ҳ���������ʣ�����Ҫ��path��������Ϊ��path=/why�����������Ҫʹ����վ������ҳ�涼��Ȩ�޷��ʸ�cookie������Ҫ��path��������Ϊ��վ��Ŀ¼������path=/����һ��ҳ����Ը���path·���Ĳ�ͬ���������������ͬ���Ƶ�cookie��
         * @param  {String} config.domain ָ���ɷ���cookie����������Ĭ��ֵΪ�ա�Ĭ������£���������֮�䴴����cookie�ǲ����໥�����ʵġ�����yes.xxx.com���ʲ���www.xxx.com�����´�����cookie�������Ҫʵ�ֶ�������֮���ܹ����౻���ʣ�����Ҫ����domain����ֵΪ��domain=.xxx.com�����������ܱ�֤hyck.xxx.com��osp.xxx.com��yes.xxx.com�������µ���ҳҲ�ܹ���������www.xxx.com�����µ���ҳ��������cookie������www.xxx.com�´���һ��cookieʱ���������cookie��domainֵָ��Ϊ����������������ô��cookie������ʧ�ܡ�һ��ҳ����Ը���domainֵ�Ĳ�ͬ���������������ͬ���Ƶ�cookie��
         * @param  {Boolean} config.secure �Ƿ����ð�ȫ�ԣ�Ĭ��Ϊfalse�� Ĭ������£�ʹ��httpЭ��������ӵ�ҳ�漴�ɷ��ʸ�cookie�������ø����Ժ�ֻҪ����Ϊ�����ַ�������Ч������""������ֻ��ͨ��https����������ȫЭ�����ӵ�ҳ����ܷ��ʸ�cookie��
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
            document.cookie = name + "=" + escape(value) + expires + ";path=" + path + domain + secure; //��name��value����escape���봦���Ӷ�ʹ�ո񡢺��֡������ַ����硰%20������ʽ���б��档
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
         * @param  {String} config.path   ���cookieʱ�����õ�Ŀ¼���ƣ�Ĭ��ֵΪ��/������Ϊһ��ҳ����Ը���path·���Ĳ�ͬ���������������ͬ���Ƶ�cookie����������½���ɾ����ʱ������Ҫָ��path·������˵������path����ֵָ��Ϊ��/�������޷�ɾ��pathֵΪ��/xxx��������cookie�������Ҫɾ����cookie�������ָ��delCookie������path����ֵҲΪ��/xxx������
         * @param  {String} config.domain   ���cookieʱ�����õ��������ƣ�Ĭ��ֵΪ�ա���Ϊһ��ҳ����Ը���domainֵ�Ĳ�ͬ���������������ͬ���Ƶ�cookie��������ɾ����ʱ��Ҳ����ָ��domainֵ��
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
         * ����ص�����ִ�����ķѵ�ʱ��
         * @param  {Function} �ص�����
         * @return {Number} ִ��ʱ�䣨��λ�����룩
         */
        time: function(callback)
        {
            var start = new Date().valueOf();
            callback.call();
            return new Date().valueOf() - start;
        },

        /**
         * �ж�������Ƿ�֧��Flash���
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
         * <br />ͨ�����Ƕ�������վͷ��ĳ��λ�ü���һ������Ϊ��ҳ���Ĺ��ܣ�����û��һ��ȫ�����ݵ���Ϊ��ҳ�ķ����������ڴ˴���һ�������������Դ�������װ������
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
                //���IE������Ӳ���
                //ע�����ڰ�ȫ�������⣬�����ļ���û��Ȩ��ִ���д��롣������IE�У��޷�ֱ��ִ��addFavorite��������Ҫͨ��dom�ڵ������¼���������������
                //    ����IEΪ�ں˵�360���ѹ��������ȴ����������������
                window.external.addFavorite(location.href, document.title);
            }
            catch(e)
            {
                try
                {
                    //���Firefox������Ӳ���
                    //ע�⣺addPanel����Ҫ����ַ��Ϣ������һ����������Ч����վ��ַ�������ڱ����ļ����в��Խ��޷�����Ч��
                    window.sidebar.addPanel(document.title, location.href, "");
                }
                catch(e)
                {
                    //��������������������ʾ��Ctrl+D������Ӳ�����ASCII���ַ�������ղ�û�гɹ�����ʹ��Ctrl+D������ɲ�������
                    alert("\u6dfb\u52a0\u6536\u85cf\u6ca1\u6709\u6210\u529f\uff0c\u53ef\u4f7f\u7528Ctrl+D\u7ee7\u7eed\u5b8c\u6210\u64cd\u4f5c\uff01");
                }
            }
        },

        /**
         * ����browser������������������������Ϣ
         * @return {Object} �������Ϣ����
         */
        browser: (function()
        {
            var browser = /** @lends jsApp.browser */{

                /**
                 * ��������ƣ��磺MSIE��Firefox��Safari��Chrome��Opera��
                 * @type {String}
                 */
                name: "",

                /**
                 * �����������������������ı�ʶ��360SE����360�������sogou�����ѹ��������Maxthon�������Σ�TheWorld��������֮����THEWORLD��������֮�����ٰ棻BIDUBrowser�����ٶȣ�LBBROWSER�����Ա��������RSEBROWSER�������ǰ�ȫ�������QQBrowser����QQ�������TencentTraveler������ѶTT�������SaaYaa�������Σ���
                 * @type {String}
                 */
                alias: "",

                /**
                 * ������汾
                 * @type {String}
                 */
                version: ""                
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
            nameLower = name.toLowerCase(),
            version = match[2] || "",
            tags, i, len, writeContent;

            if(nameLower !== "chrome" && nameLower === "webkit")
            {
                name = "Safari";
            }
            else if(nameLower === "opr")
            {
                name = "Opera";
            }

            //��Թ����������ʹ�ñ�������ʶ��
            //��֪����ʲôĿ�ģ�360�������UA�������˶�����ı�ʶ��Ϣ�������޷�ͨ��UA��������ж�������360������Բ���������www.cnzz.com��www.so.com��������Ȩ�ޣ���Щ����ͨ��360�������������ʱ����UA�н�����360SE����Ϣ��
            match = /MetaSr|Maxthon|TheWorld|BIDUBrowser|LBBROWSER|RSEBROWSER|QQBrowser|TencentTraveler|SaaYaa|360SE/i.exec(ua) || [];
            alias = match[0] || "";
            if(alias === "MetaSr")
            {
                alias = "sogou";
            }

            //ʹIE���������HTML5��ǩ
            //�����IE6�й̶���λԪ���ڹ���������ʱ����˸Ч���������ã�* html{background-image:url(about:blank);}��
            /*----------------------------------
             *˵������ֹ2012-09-03��Firefox��Chrome��Safari��Opera��IE9�ȸ߼����������֧�ֻ�����HTML5��ǩ��������IE8�����Ͱ汾��IE��������޷�ʹ�����ǡ�
             *����취����IE�У�ֻ��Ҫͨ��document.createElement()��������һ��δ��֧�ֵ�HTMLԪ�أ�֮��Ϳ���������ʹ�������ǩ�ˣ�������ı�ǩĬ��Ϊ����Ԫ�أ����Ի���Ҫͨ����ʽ����״Ԫ�ص�display��������Ϊblock���У���
             *=================================================================================*/
            if(lessIE9)
            {
                tags = "header,footer,aside,article,section,hgroup,nav,menu,canvas,output,dialog,datalist,details,figure,figcaption,audio,video,progress,mark,time".split(",");
                for(i = 0, len = tags.length; i < len; i++)
                {
                    document.createElement(tags[i]);
                }
                document.write('<style id="jsApp_selectorStyle">* html{background-image:url(about:blank);}header,footer,aside,article,section,hgroup,nav,menu,canvas,details,figure,figcaption,audio,video{display:block;}</style>')
            }

            //���IE6����������汳��ͼƬ��Bug
            /*----------------------------------
             *˵��������ͨ����Ҫʹ��CSS�����б���ͼƬ�����ã���������IE6����һ��Bug���Ǿ���IE6Ĭ������²����汳��ͼƬ��CSS��ÿ�θ���ͼƬ��λ��ʱ�������·����������Ե��������CSS������Ԫ�����ƶ�ʱ��ͼƬ����˸�����������æ��״̬��
             *      �������һ����CSS�м���������ʽ��html { filter: expression(document.execCommand(��BackgroundImageCache��, false, true)); }
             *      ʹ�������������ܻ�Ӱ������ҳ��ļ����ٶȣ������Ƽ�ʹ��JS���������Bug��
             *=================================================================================*/
            if(isIE6)
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
        //����Ŀ������ȥ���ظ�ֵ֮������ɵ������飨ԭ�����ֵ����Ӱ�죩��
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
    arrayPrototype.indexOf === undefined && (arrayPrototype.indexOf = function(val, fromIndex)
    {
        //����Ŀ�������в���val��ֵ��һ�γ������ڵ�����λ�ã��������򷵻�-1�����������ͣ�Number��
        var result = -1,
            len = this.length,
            i = typeof fromIndex === "number" && fromIndex >= 0 ? fromIndex : 0;

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
        //ɸѡ��ԭ�����з������������ص���������tureʱ�������г�Ա������������ʽ���ء�
        //�ص�����-����item����ǰ���ֵ��
        //�ص�����-����i����ǰ�������ֵ��
        //�ص�����-this��window����
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
        //����Ŀ�������е�ÿһ��Ԫ�أ���ִ�лص�������
        //�ص�����-����item����ǰ���ֵ��
        //�ص�����-����i����ǰ�������ֵ��
        //�ص�����-this��window����
        var i = 0, len = this.length;
        for(; i < len; )
        {
            func(this[i], i++);
        }
    });
    arrayPrototype.remove = function(val)
    {
        //ɾ��ԭ�����������val��ֵ��ȵ�����Ԫ�أ�������ԭ���飨ԭ�����е�ֵ�����ܵ�Ӱ�죩��
        var idx;

        while((idx = this.indexOf(val)) !== -1)
        {
            this.splice(idx, 1);
        }
        return this;
    };

    //��չString�����ʵ����Ա
    stringPrototype.trim === undefined && (stringPrototype.trim = function()
    {
        //ȥ��Ŀ���ַ�����β���˵����пո񣬲���Ϊ���ַ�������
        return this.replace(/^\s*|\s*$/g, "");
    });
    stringPrototype.trimLeft === undefined && (stringPrototype.trimLeft = function()
    {
        //ȥ��Ŀ���ַ���ͷ�������пո񣬲���Ϊ���ַ�������
        return this.replace(/^\s*/g, "");
    });
    stringPrototype.trimRight === undefined && (stringPrototype.trimRight = function()
    {
        //ȥ��Ŀ���ַ���ĩβ�����пո񣬲���Ϊ���ַ�������
        return this.replace(/\s*$/g, "");
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

    //�������������ѡ��
    typeof HTMLElement !== "undefined" && HTMLElement.prototype.contains === undefined && (HTMLElement.prototype.contains = function(obj)
    {
        //�жϵ�ǰԪ�ص���Ԫ�����Ƿ����Ŀ��Ԫ�أ�������򷵻�true�����򷵻�false
        //�÷�����IE6+�о���֧�֣��ڽ��ϰ汾��Firefox��Chrome��Opera�������δ��֧��
        while(obj !== null)
        {
            if(obj === this) return true;
            obj = obj.parentNode;
        }
        return false;
    });

    window.$ = window.jsApp = jsApp;   //��jsAppת��Ϊȫ�ֶ���֮��������������γ�һ���հ���

})(window);

/*
 * Sizzle����API��
 * ѡ������ѯ�����������ͣ�Array��
 * 
 *     ȫ�ֲ�ѯ��Sizzle(Selector)
 *         ��ѯ��ҳ��������ѡ����������Ԫ������ɵ�����
 *         
 *     �ֲ���ѯ��Sizzle(Selector, DOMElement|DOMDocument)
 *         ��ѯ��ָ��HTMLԪ������������ѡ�������ӽڵ�����ɵ�����
 *         
 * Ԫ��ƥ�䣺���������ͣ�Boolean��
 * 
 *     Sizzle.matchesSelector(DOMElement, Selector)
 *         �ж�ָ����HTMLԪ���Ƿ���ѡ����ƥ��
 *         
 * Ԫ��ɸѡ�����������ͣ�Array��
 * 
 *     Sizzle.matches(Selector, DOMElement Array)
 *         ɸѡ��HTMLԪ������������ѡ����������Ԫ������ɵ�����
 *         
 * ����ȥ�أ����������ͣ�Array��
 *
 *      Sizzle.uniqueSort(DOMElement Array)
 *          ��Ԫ�������������ȥ���ظ����ݺ��µĽ������
 */
/*
 * Sizzle CSS Selector Engine v1.10.10-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-09-12
 */
(function( window ) {

    var i,
        support,
        cachedruns,
        Expr,
        getText,
        isXML,
        compile,
        outermostContext,
        sortInput,
        hasDuplicate,

        // Local document vars
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,

        // Instance-specific data
        expando = "sizzle" + -(new Date()),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function( a, b ) {
            if ( a === b ) {
                hasDuplicate = true;
            }
            return 0;
        },

        // General-purpose constants
        strundefined = typeof undefined,
        MAX_NEGATIVE = 1 << 31,

        // Instance methods
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        // Use a stripped-down indexOf if we can't use a native one
        indexOf = arr.indexOf || function( elem ) {
            var i = 0,
                len = this.length;
            for ( ; i < len; i++ ) {
                if ( this[i] === elem ) {
                    return i;
                }
            }
            return -1;
        },

        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

        // Regular expressions

        // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]",
        // http://www.w3.org/TR/css3-syntax/#characters
        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

        // Loosely modeled on CSS identifier characters
        // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
        // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
        identifier = characterEncoding.replace( "w", "w#" ),

        // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
            "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

        // Prefer arguments quoted,
        //   then not containing pseudos/brackets,
        //   then attribute selectors/non-parenthetical expressions,
        //   then anything else
        // These preferences are here to reduce the number of selectors
        //   needing tokenize in the PSEUDO preFilter
        pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

        rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
        rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

        rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

        rpseudo = new RegExp( pseudos ),
        ridentifier = new RegExp( "^" + identifier + "$" ),

        matchExpr = {
            "ID": new RegExp( "^#(" + characterEncoding + ")" ),
            "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
            "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
            "ATTR": new RegExp( "^" + attributes ),
            "PSEUDO": new RegExp( "^" + pseudos ),
            "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
            "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
        },

        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,

        rnative = /^[^{]+\{\s*\[native \w/,

        // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        rsibling = /[+~]/,
        rescape = /'|\\/g,

        // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
        runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
        funescape = function( _, escaped, escapedWhitespace ) {
            var high = "0x" + escaped - 0x10000;
            // NaN means non-codepoint
            // Support: Firefox
            // Workaround erroneous numeric interpretation of +"0x"
            return high !== high || escapedWhitespace ?
                escaped :
                high < 0 ?
                    // BMP codepoint
                    String.fromCharCode( high + 0x10000 ) :
                    // Supplemental Plane codepoint (surrogate pair)
                    String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
        };

    // Optimize for push.apply( _, NodeList )
    try {
        push.apply(
            (arr = slice.call( preferredDoc.childNodes )),
            preferredDoc.childNodes
        );
        // Support: Android<4.0
        // Detect silently failing push.apply
        arr[ preferredDoc.childNodes.length ].nodeType;
    } catch ( e ) {
        push = { apply: arr.length ?

            // Leverage slice if possible
            function( target, els ) {
                push_native.apply( target, slice.call(els) );
            } :

            // Support: IE<9
            // Otherwise append directly
            function( target, els ) {
                var j = target.length,
                    i = 0;
                // Can't trust NodeList.length
                while ( (target[j++] = els[i++]) ) {}
                target.length = j - 1;
            }
        };
    }

    function Sizzle( selector, context, results, seed ) {
        var match, elem, m, nodeType,
            // QSA vars
            i, groups, old, nid, newContext, newSelector;

        if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
            setDocument( context );
        }

        context = context || document;
        results = results || [];

        if ( !selector || typeof selector !== "string" ) {
            return results;
        }

        if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
            return [];
        }

        if ( documentIsHTML && !seed ) {

            // Shortcuts
            if ( (match = rquickExpr.exec( selector )) ) {
                // Speed-up: Sizzle("#ID")
                if ( (m = match[1]) ) {
                    if ( nodeType === 9 ) {
                        elem = context.getElementById( m );
                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document (jQuery #6963)
                        if ( elem && elem.parentNode ) {
                            // Handle the case where IE, Opera, and Webkit return items
                            // by name instead of ID
                            if ( elem.id === m ) {
                                results.push( elem );
                                return results;
                            }
                        } else {
                            return results;
                        }
                    } else {
                        // Context is not a document
                        if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                            contains( context, elem ) && elem.id === m ) {
                            results.push( elem );
                            return results;
                        }
                    }

                // Speed-up: Sizzle("TAG")
                } else if ( match[2] ) {
                    push.apply( results, context.getElementsByTagName( selector ) );
                    return results;

                // Speed-up: Sizzle(".CLASS")
                } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
                    push.apply( results, context.getElementsByClassName( m ) );
                    return results;
                }
            }

            // QSA path
            if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
                nid = old = expando;
                newContext = context;
                newSelector = nodeType === 9 && selector;

                // qSA works strangely on Element-rooted queries
                // We can work around this by specifying an extra ID on the root
                // and working up from there (Thanks to Andrew Dupont for the technique)
                // IE 8 doesn't work on object elements
                if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                    groups = tokenize( selector );

                    if ( (old = context.getAttribute("id")) ) {
                        nid = old.replace( rescape, "\\$&" );
                    } else {
                        context.setAttribute( "id", nid );
                    }
                    nid = "[id='" + nid + "'] ";

                    i = groups.length;
                    while ( i-- ) {
                        groups[i] = nid + toSelector( groups[i] );
                    }
                    newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                    newSelector = groups.join(",");
                }

                if ( newSelector ) {
                    try {
                        push.apply( results,
                            newContext.querySelectorAll( newSelector )
                        );
                        return results;
                    } catch(qsaError) {
                    } finally {
                        if ( !old ) {
                            context.removeAttribute("id");
                        }
                    }
                }
            }
        }

        // All others
        return select( selector.replace( rtrim, "$1" ), context, results, seed );
    }

    /**
     * Create key-value caches of limited size
     * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
     *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *  deleting the oldest entry
     */
    function createCache() {
        var keys = [];

        function cache( key, value ) {
            // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
            if ( keys.push( key + " " ) > Expr.cacheLength ) {
                // Only keep the most recent entries
                delete cache[ keys.shift() ];
            }
            return (cache[ key + " " ] = value);
        }
        return cache;
    }

    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction( fn ) {
        fn[ expando ] = true;
        return fn;
    }

    /**
     * Support testing using an element
     * @param {Function} fn Passed the created div and expects a boolean result
     */
    function assert( fn ) {
        var div = document.createElement("div");

        try {
            return !!fn( div );
        } catch (e) {
            return false;
        } finally {
            // Remove from its parent by default
            if ( div.parentNode ) {
                div.parentNode.removeChild( div );
            }
            // release memory in IE
            div = null;
        }
    }

    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle( attrs, handler ) {
        var arr = attrs.split("|"),
            i = attrs.length;

        while ( i-- ) {
            Expr.attrHandle[ arr[i] ] = handler;
        }
    }

    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck( a, b ) {
        var cur = b && a,
            diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                ( ~b.sourceIndex || MAX_NEGATIVE ) -
                ( ~a.sourceIndex || MAX_NEGATIVE );

        // Use IE sourceIndex if available on both nodes
        if ( diff ) {
            return diff;
        }

        // Check if b follows a
        if ( cur ) {
            while ( (cur = cur.nextSibling) ) {
                if ( cur === b ) {
                    return -1;
                }
            }
        }

        return a ? 1 : -1;
    }

    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo( type ) {
        return function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === type;
        };
    }

    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo( type ) {
        return function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && elem.type === type;
        };
    }

    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo( fn ) {
        return markFunction(function( argument ) {
            argument = +argument;
            return markFunction(function( seed, matches ) {
                var j,
                    matchIndexes = fn( [], seed.length, argument ),
                    i = matchIndexes.length;

                // Match elements found at the specified indexes
                while ( i-- ) {
                    if ( seed[ (j = matchIndexes[i]) ] ) {
                        seed[j] = !(matches[j] = seed[j]);
                    }
                }
            });
        });
    }

    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext( context ) {
        return context && typeof context.getElementsByTagName !== strundefined && context;
    }

    // Expose support vars for convenience
    support = Sizzle.support = {};

    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */
    isXML = Sizzle.isXML = function( elem ) {
        // documentElement is verified for cases where it doesn't yet exist
        // (such as loading iframes in IE - #4833)
        var documentElement = elem && (elem.ownerDocument || elem).documentElement;
        return documentElement ? documentElement.nodeName !== "HTML" : false;
    };

    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function( node ) {
        var doc = node ? node.ownerDocument || node : preferredDoc,
            parent = doc.defaultView;

        // If no document and documentElement is available, return
        if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
            return document;
        }

        // Set our document
        document = doc;
        docElem = doc.documentElement;

        // Support tests
        documentIsHTML = !isXML( doc );

        // Support: IE>8
        // If iframe document is assigned to "document" variable and if iframe has been reloaded,
        // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
        // IE6-8 do not support the defaultView property so parent will be undefined
        if ( parent && parent.attachEvent && parent !== parent.top ) {
            parent.attachEvent( "onbeforeunload", function() {
                setDocument();
            });
        }

        /* Attributes
        ---------------------------------------------------------------------- */

        // Support: IE<8
        // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
        support.attributes = assert(function( div ) {
            div.className = "i";
            return !div.getAttribute("className");
        });

        /* getElement(s)By*
        ---------------------------------------------------------------------- */

        // Check if getElementsByTagName("*") returns only elements
        support.getElementsByTagName = assert(function( div ) {
            div.appendChild( doc.createComment("") );
            return !div.getElementsByTagName("*").length;
        });

        // Check if getElementsByClassName can be trusted
        support.getElementsByClassName = assert(function( div ) {
            div.innerHTML = "<div class='a'></div><div class='a i'></div>";

            // Support: Safari<4
            // Catch class over-caching
            div.firstChild.className = "i";
            // Support: Opera<10
            // Catch gEBCN failure to find non-leading classes
            return div.getElementsByClassName("i").length === 2;
        });

        // Support: IE<10
        // Check if getElementById returns elements by name
        // The broken getElementById methods don't pick up programatically-set names,
        // so use a roundabout getElementsByName test
        support.getById = assert(function( div ) {
            docElem.appendChild( div ).id = expando;
            return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
        });

        // ID find and filter
        if ( support.getById ) {
            Expr.find["ID"] = function( id, context ) {
                if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
                    var m = context.getElementById( id );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    return m && m.parentNode ? [m] : [];
                }
            };
            Expr.filter["ID"] = function( id ) {
                var attrId = id.replace( runescape, funescape );
                return function( elem ) {
                    return elem.getAttribute("id") === attrId;
                };
            };
        } else {
            // Support: IE6/7
            // getElementById is not reliable as a find shortcut
            delete Expr.find["ID"];

            Expr.filter["ID"] =  function( id ) {
                var attrId = id.replace( runescape, funescape );
                return function( elem ) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            };
        }

        // Tag
        Expr.find["TAG"] = support.getElementsByTagName ?
            function( tag, context ) {
                if ( typeof context.getElementsByTagName !== strundefined ) {
                    return context.getElementsByTagName( tag );
                }
            } :
            function( tag, context ) {
                var elem,
                    tmp = [],
                    i = 0,
                    results = context.getElementsByTagName( tag );

                // Filter out possible comments
                if ( tag === "*" ) {
                    while ( (elem = results[i++]) ) {
                        if ( elem.nodeType === 1 ) {
                            tmp.push( elem );
                        }
                    }

                    return tmp;
                }
                return results;
            };

        // Class
        Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
            if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
                return context.getElementsByClassName( className );
            }
        };

        /* QSA/matchesSelector
        ---------------------------------------------------------------------- */

        // QSA and matchesSelector support

        // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
        rbuggyMatches = [];

        // qSa(:focus) reports false when true (Chrome 21)
        // We allow this because of a bug in IE8/9 that throws an error
        // whenever `document.activeElement` is accessed on an iframe
        // So, we allow :focus to pass through QSA all the time to avoid the IE error
        // See http://bugs.jquery.com/ticket/13378
        rbuggyQSA = [];

        if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
            // Build QSA regex
            // Regex strategy adopted from Diego Perini
            assert(function( div ) {
                // Select is set to empty string on purpose
                // This is to test IE's treatment of not explicitly
                // setting a boolean content attribute,
                // since its presence should be enough
                // http://bugs.jquery.com/ticket/12359
                div.innerHTML = "<select><option selected=''></option></select>";

                // Support: IE8
                // Boolean attributes and "value" are not treated correctly
                if ( !div.querySelectorAll("[selected]").length ) {
                    rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                }

                // Webkit/Opera - :checked should return selected option elements
                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                // IE8 throws error here and will not see later tests
                if ( !div.querySelectorAll(":checked").length ) {
                    rbuggyQSA.push(":checked");
                }
            });

            assert(function( div ) {

                // Support: Opera 10-12/IE8
                // ^= $= *= and empty values
                // Should not select anything
                // Support: Windows 8 Native Apps
                // The type attribute is restricted during .innerHTML assignment
                var input = doc.createElement("input");
                input.setAttribute( "type", "hidden" );
                div.appendChild( input ).setAttribute( "t", "" );

                if ( div.querySelectorAll("[t^='']").length ) {
                    rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                }

                // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                // IE8 throws error here and will not see later tests
                if ( !div.querySelectorAll(":enabled").length ) {
                    rbuggyQSA.push( ":enabled", ":disabled" );
                }

                // Opera 10-11 does not throw on post-comma invalid pseudos
                div.querySelectorAll("*,:x");
                rbuggyQSA.push(",.*:");
            });
        }

        if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
            docElem.mozMatchesSelector ||
            docElem.oMatchesSelector ||
            docElem.msMatchesSelector) )) ) {

            assert(function( div ) {
                // Check to see if it's possible to do matchesSelector
                // on a disconnected node (IE 9)
                support.disconnectedMatch = matches.call( div, "div" );

                // This should fail with an exception
                // Gecko does not error, returns false instead
                matches.call( div, "[s!='']:x" );
                rbuggyMatches.push( "!=", pseudos );
            });
        }

        rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
        rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

        /* Contains
        ---------------------------------------------------------------------- */

        // Element contains another
        // Purposefully does not implement inclusive descendent
        // As in, an element does not contain itself
        contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
            function( a, b ) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !!( bup && bup.nodeType === 1 && (
                    adown.contains ?
                        adown.contains( bup ) :
                        a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                ));
            } :
            function( a, b ) {
                if ( b ) {
                    while ( (b = b.parentNode) ) {
                        if ( b === a ) {
                            return true;
                        }
                    }
                }
                return false;
            };

        /* Sorting
        ---------------------------------------------------------------------- */

        // Document order sorting
        sortOrder = docElem.compareDocumentPosition ?
        function( a, b ) {

            // Flag for duplicate removal
            if ( a === b ) {
                hasDuplicate = true;
                return 0;
            }

            var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

            if ( compare ) {
                // Disconnected nodes
                if ( compare & 1 ||
                    (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

                    // Choose the first element that is related to our preferred document
                    if ( a === doc || contains(preferredDoc, a) ) {
                        return -1;
                    }
                    if ( b === doc || contains(preferredDoc, b) ) {
                        return 1;
                    }

                    // Maintain original order
                    return sortInput ?
                        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                        0;
                }

                return compare & 4 ? -1 : 1;
            }

            // Not directly comparable, sort on existence of method
            return a.compareDocumentPosition ? -1 : 1;
        } :
        function( a, b ) {
            var cur,
                i = 0,
                aup = a.parentNode,
                bup = b.parentNode,
                ap = [ a ],
                bp = [ b ];

            // Exit early if the nodes are identical
            if ( a === b ) {
                hasDuplicate = true;
                return 0;

            // Parentless nodes are either documents or disconnected
            } else if ( !aup || !bup ) {
                return a === doc ? -1 :
                    b === doc ? 1 :
                    aup ? -1 :
                    bup ? 1 :
                    sortInput ?
                    ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                    0;

            // If the nodes are siblings, we can do a quick check
            } else if ( aup === bup ) {
                return siblingCheck( a, b );
            }

            // Otherwise we need full lists of their ancestors for comparison
            cur = a;
            while ( (cur = cur.parentNode) ) {
                ap.unshift( cur );
            }
            cur = b;
            while ( (cur = cur.parentNode) ) {
                bp.unshift( cur );
            }

            // Walk down the tree looking for a discrepancy
            while ( ap[i] === bp[i] ) {
                i++;
            }

            return i ?
                // Do a sibling check if the nodes have a common ancestor
                siblingCheck( ap[i], bp[i] ) :

                // Otherwise nodes in our document sort first
                ap[i] === preferredDoc ? -1 :
                bp[i] === preferredDoc ? 1 :
                0;
        };

        return doc;
    };

    Sizzle.matches = function( expr, elements ) {
        return Sizzle( expr, null, null, elements );
    };

    Sizzle.matchesSelector = function( elem, expr ) {
        // Set document vars if needed
        if ( ( elem.ownerDocument || elem ) !== document ) {
            setDocument( elem );
        }

        // Make sure that attribute selectors are quoted
        expr = expr.replace( rattributeQuotes, "='$1']" );

        if ( support.matchesSelector && documentIsHTML &&
            ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
            ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

            try {
                var ret = matches.call( elem, expr );

                // IE 9's matchesSelector returns false on disconnected nodes
                if ( ret || support.disconnectedMatch ||
                        // As well, disconnected nodes are said to be in a document
                        // fragment in IE 9
                        elem.document && elem.document.nodeType !== 11 ) {
                    return ret;
                }
            } catch(e) {}
        }

        return Sizzle( expr, document, null, [elem] ).length > 0;
    };

    Sizzle.contains = function( context, elem ) {
        // Set document vars if needed
        if ( ( context.ownerDocument || context ) !== document ) {
            setDocument( context );
        }
        return contains( context, elem );
    };

    Sizzle.attr = function( elem, name ) {
        // Set document vars if needed
        if ( ( elem.ownerDocument || elem ) !== document ) {
            setDocument( elem );
        }

        var fn = Expr.attrHandle[ name.toLowerCase() ],
            // Don't get fooled by Object.prototype properties (jQuery #13807)
            val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                fn( elem, name, !documentIsHTML ) :
                undefined;

        return val !== undefined ?
            val :
            support.attributes || !documentIsHTML ?
                elem.getAttribute( name ) :
                (val = elem.getAttributeNode(name)) && val.specified ?
                    val.value :
                    null;
    };

    Sizzle.error = function( msg ) {
        throw new Error( "Syntax error, unrecognized expression: " + msg );
    };

    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function( results ) {
        var elem,
            duplicates = [],
            j = 0,
            i = 0;

        // Unless we *know* we can detect duplicates, assume their presence
        hasDuplicate = !support.detectDuplicates;
        sortInput = !support.sortStable && results.slice( 0 );
        results.sort( sortOrder );

        if ( hasDuplicate ) {
            while ( (elem = results[i++]) ) {
                if ( elem === results[ i ] ) {
                    j = duplicates.push( i );
                }
            }
            while ( j-- ) {
                results.splice( duplicates[ j ], 1 );
            }
        }

        return results;
    };

    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function( elem ) {
        var node,
            ret = "",
            i = 0,
            nodeType = elem.nodeType;

        if ( !nodeType ) {
            // If no nodeType, this is expected to be an array
            while ( (node = elem[i++]) ) {
                // Do not traverse comment nodes
                ret += getText( node );
            }
        } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
            // Use textContent for elements
            // innerText usage removed for consistency of new lines (jQuery #11153)
            if ( typeof elem.textContent === "string" ) {
                return elem.textContent;
            } else {
                // Traverse its children
                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    ret += getText( elem );
                }
            }
        } else if ( nodeType === 3 || nodeType === 4 ) {
            return elem.nodeValue;
        }
        // Do not include comment or processing instruction nodes

        return ret;
    };

    Expr = Sizzle.selectors = {

        // Can be adjusted by the user
        cacheLength: 50,

        createPseudo: markFunction,

        match: matchExpr,

        attrHandle: {},

        find: {},

        relative: {
            ">": { dir: "parentNode", first: true },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: true },
            "~": { dir: "previousSibling" }
        },

        preFilter: {
            "ATTR": function( match ) {
                match[1] = match[1].replace( runescape, funescape );

                // Move the given value to match[3] whether quoted or unquoted
                match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

                if ( match[2] === "~=" ) {
                    match[3] = " " + match[3] + " ";
                }

                return match.slice( 0, 4 );
            },

            "CHILD": function( match ) {
                /* matches from matchExpr["CHILD"]
                    1 type (only|nth|...)
                    2 what (child|of-type)
                    3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                    4 xn-component of xn+y argument ([+-]?\d*n|)
                    5 sign of xn-component
                    6 x of xn-component
                    7 sign of y-component
                    8 y of y-component
                */
                match[1] = match[1].toLowerCase();

                if ( match[1].slice( 0, 3 ) === "nth" ) {
                    // nth-* requires argument
                    if ( !match[3] ) {
                        Sizzle.error( match[0] );
                    }

                    // numeric x and y parameters for Expr.filter.CHILD
                    // remember that false/true cast respectively to 0/1
                    match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                    match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                // other types prohibit arguments
                } else if ( match[3] ) {
                    Sizzle.error( match[0] );
                }

                return match;
            },

            "PSEUDO": function( match ) {
                var excess,
                    unquoted = !match[5] && match[2];

                if ( matchExpr["CHILD"].test( match[0] ) ) {
                    return null;
                }

                // Accept quoted arguments as-is
                if ( match[3] && match[4] !== undefined ) {
                    match[2] = match[4];

                // Strip excess characters from unquoted arguments
                } else if ( unquoted && rpseudo.test( unquoted ) &&
                    // Get excess from tokenize (recursively)
                    (excess = tokenize( unquoted, true )) &&
                    // advance to the next closing parenthesis
                    (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                    // excess is a negative index
                    match[0] = match[0].slice( 0, excess );
                    match[2] = unquoted.slice( 0, excess );
                }

                // Return only captures needed by the pseudo filter method (type and argument)
                return match.slice( 0, 3 );
            }
        },

        filter: {

            "TAG": function( nodeNameSelector ) {
                var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                return nodeNameSelector === "*" ?
                    function() { return true; } :
                    function( elem ) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
            },

            "CLASS": function( className ) {
                var pattern = classCache[ className + " " ];

                return pattern ||
                    (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                    classCache( className, function( elem ) {
                        return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
                    });
            },

            "ATTR": function( name, operator, check ) {
                return function( elem ) {
                    var result = Sizzle.attr( elem, name );

                    if ( result == null ) {
                        return operator === "!=";
                    }
                    if ( !operator ) {
                        return true;
                    }

                    result += "";

                    return operator === "=" ? result === check :
                        operator === "!=" ? result !== check :
                        operator === "^=" ? check && result.indexOf( check ) === 0 :
                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                        operator === "$=" ? check && result.slice( -check.length ) === check :
                        operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
                        operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                        false;
                };
            },

            "CHILD": function( type, what, argument, first, last ) {
                var simple = type.slice( 0, 3 ) !== "nth",
                    forward = type.slice( -4 ) !== "last",
                    ofType = what === "of-type";

                return first === 1 && last === 0 ?

                    // Shortcut for :nth-*(n)
                    function( elem ) {
                        return !!elem.parentNode;
                    } :

                    function( elem, context, xml ) {
                        var cache, outerCache, node, diff, nodeIndex, start,
                            dir = simple !== forward ? "nextSibling" : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType;

                        if ( parent ) {

                            // :(first|last|only)-(child|of-type)
                            if ( simple ) {
                                while ( dir ) {
                                    node = elem;
                                    while ( (node = node[ dir ]) ) {
                                        if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                            return false;
                                        }
                                    }
                                    // Reverse direction for :only-* (if we haven't yet done so)
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }

                            start = [ forward ? parent.firstChild : parent.lastChild ];

                            // non-xml :nth-child(...) stores cache data on `parent`
                            if ( forward && useCache ) {
                                // Seek `elem` from a previously-cached index
                                outerCache = parent[ expando ] || (parent[ expando ] = {});
                                cache = outerCache[ type ] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[ nodeIndex ];

                                while ( (node = ++nodeIndex && node && node[ dir ] ||

                                    // Fallback to seeking `elem` from the start
                                    (diff = nodeIndex = 0) || start.pop()) ) {

                                    // When found, cache indexes on `parent` and break
                                    if ( node.nodeType === 1 && ++diff && node === elem ) {
                                        outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                        break;
                                    }
                                }

                            // Use previously-cached element index if available
                            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                                diff = cache[1];

                            // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                            } else {
                                // Use the same loop as above to seek `elem` from the start
                                while ( (node = ++nodeIndex && node && node[ dir ] ||
                                    (diff = nodeIndex = 0) || start.pop()) ) {

                                    if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                        // Cache the index of each encountered element
                                        if ( useCache ) {
                                            (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                        }

                                        if ( node === elem ) {
                                            break;
                                        }
                                    }
                                }
                            }

                            // Incorporate the offset, then check against cycle size
                            diff -= last;
                            return diff === first || ( diff % first === 0 && diff / first >= 0 );
                        }
                    };
            },

            "PSEUDO": function( pseudo, argument ) {
                // pseudo-class names are case-insensitive
                // http://www.w3.org/TR/selectors/#pseudo-classes
                // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                // Remember that setFilters inherits from pseudos
                var args,
                    fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                        Sizzle.error( "unsupported pseudo: " + pseudo );

                // The user may use createPseudo to indicate that
                // arguments are needed to create the filter function
                // just as Sizzle does
                if ( fn[ expando ] ) {
                    return fn( argument );
                }

                // But maintain support for old signatures
                if ( fn.length > 1 ) {
                    args = [ pseudo, pseudo, "", argument ];
                    return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                        markFunction(function( seed, matches ) {
                            var idx,
                                matched = fn( seed, argument ),
                                i = matched.length;
                            while ( i-- ) {
                                idx = indexOf.call( seed, matched[i] );
                                seed[ idx ] = !( matches[ idx ] = matched[i] );
                            }
                        }) :
                        function( elem ) {
                            return fn( elem, 0, args );
                        };
                }

                return fn;
            }
        },

        pseudos: {
            // Potentially complex pseudos
            "not": markFunction(function( selector ) {
                // Trim the selector passed to compile
                // to avoid treating leading and trailing
                // spaces as combinators
                var input = [],
                    results = [],
                    matcher = compile( selector.replace( rtrim, "$1" ) );

                return matcher[ expando ] ?
                    markFunction(function( seed, matches, context, xml ) {
                        var elem,
                            unmatched = matcher( seed, null, xml, [] ),
                            i = seed.length;

                        // Match elements unmatched by `matcher`
                        while ( i-- ) {
                            if ( (elem = unmatched[i]) ) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) :
                    function( elem, context, xml ) {
                        input[0] = elem;
                        matcher( input, null, xml, results );
                        return !results.pop();
                    };
            }),

            "has": markFunction(function( selector ) {
                return function( elem ) {
                    return Sizzle( selector, elem ).length > 0;
                };
            }),

            "contains": markFunction(function( text ) {
                return function( elem ) {
                    return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                };
            }),

            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // http://www.w3.org/TR/selectors/#lang-pseudo
            "lang": markFunction( function( lang ) {
                // lang value must be a valid identifier
                if ( !ridentifier.test(lang || "") ) {
                    Sizzle.error( "unsupported lang: " + lang );
                }
                lang = lang.replace( runescape, funescape ).toLowerCase();
                return function( elem ) {
                    var elemLang;
                    do {
                        if ( (elemLang = documentIsHTML ?
                            elem.lang :
                            elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                            elemLang = elemLang.toLowerCase();
                            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                        }
                    } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                    return false;
                };
            }),

            // Miscellaneous
            "target": function( elem ) {
                var hash = window.location && window.location.hash;
                return hash && hash.slice( 1 ) === elem.id;
            },

            "root": function( elem ) {
                return elem === docElem;
            },

            "focus": function( elem ) {
                return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
            },

            // Boolean properties
            "enabled": function( elem ) {
                return elem.disabled === false;
            },

            "disabled": function( elem ) {
                return elem.disabled === true;
            },

            "checked": function( elem ) {
                // In CSS3, :checked should return both checked and selected elements
                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                var nodeName = elem.nodeName.toLowerCase();
                return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
            },

            "selected": function( elem ) {
                // Accessing this property makes selected-by-default
                // options in Safari work properly
                if ( elem.parentNode ) {
                    elem.parentNode.selectedIndex;
                }

                return elem.selected === true;
            },

            // Contents
            "empty": function( elem ) {
                // http://www.w3.org/TR/selectors/#empty-pseudo
                // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                //   but not by others (comment: 8; processing instruction: 7; etc.)
                // nodeType < 6 works because attributes (2) do not appear as children
                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    if ( elem.nodeType < 6 ) {
                        return false;
                    }
                }
                return true;
            },

            "parent": function( elem ) {
                return !Expr.pseudos["empty"]( elem );
            },

            // Element/input types
            "header": function( elem ) {
                return rheader.test( elem.nodeName );
            },

            "input": function( elem ) {
                return rinputs.test( elem.nodeName );
            },

            "button": function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === "button" || name === "button";
            },

            "text": function( elem ) {
                var attr;
                return elem.nodeName.toLowerCase() === "input" &&
                    elem.type === "text" &&

                    // Support: IE<8
                    // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                    ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
            },

            // Position-in-collection
            "first": createPositionalPseudo(function() {
                return [ 0 ];
            }),

            "last": createPositionalPseudo(function( matchIndexes, length ) {
                return [ length - 1 ];
            }),

            "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                return [ argument < 0 ? argument + length : argument ];
            }),

            "even": createPositionalPseudo(function( matchIndexes, length ) {
                var i = 0;
                for ( ; i < length; i += 2 ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            }),

            "odd": createPositionalPseudo(function( matchIndexes, length ) {
                var i = 1;
                for ( ; i < length; i += 2 ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            }),

            "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                var i = argument < 0 ? argument + length : argument;
                for ( ; --i >= 0; ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            }),

            "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                var i = argument < 0 ? argument + length : argument;
                for ( ; ++i < length; ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            })
        }
    };

    Expr.pseudos["nth"] = Expr.pseudos["eq"];

    // Add button/input type pseudos
    for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
        Expr.pseudos[ i ] = createInputPseudo( i );
    }
    for ( i in { submit: true, reset: true } ) {
        Expr.pseudos[ i ] = createButtonPseudo( i );
    }

    // Easy API for creating new setFilters
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    function tokenize( selector, parseOnly ) {
        var matched, match, tokens, type,
            soFar, groups, preFilters,
            cached = tokenCache[ selector + " " ];

        if ( cached ) {
            return parseOnly ? 0 : cached.slice( 0 );
        }

        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;

        while ( soFar ) {

            // Comma and first run
            if ( !matched || (match = rcomma.exec( soFar )) ) {
                if ( match ) {
                    // Don't consume trailing commas as valid
                    soFar = soFar.slice( match[0].length ) || soFar;
                }
                groups.push( (tokens = []) );
            }

            matched = false;

            // Combinators
            if ( (match = rcombinators.exec( soFar )) ) {
                matched = match.shift();
                tokens.push({
                    value: matched,
                    // Cast descendant combinators to space
                    type: match[0].replace( rtrim, " " )
                });
                soFar = soFar.slice( matched.length );
            }

            // Filters
            for ( type in Expr.filter ) {
                if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                    (match = preFilters[ type ]( match ))) ) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    });
                    soFar = soFar.slice( matched.length );
                }
            }

            if ( !matched ) {
                break;
            }
        }

        // Return the length of the invalid excess
        // if we're just parsing
        // Otherwise, throw an error or return tokens
        return parseOnly ?
            soFar.length :
            soFar ?
                Sizzle.error( selector ) :
                // Cache the tokens
                tokenCache( selector, groups ).slice( 0 );
    }

    function toSelector( tokens ) {
        var i = 0,
            len = tokens.length,
            selector = "";
        for ( ; i < len; i++ ) {
            selector += tokens[i].value;
        }
        return selector;
    }

    function addCombinator( matcher, combinator, base ) {
        var dir = combinator.dir,
            checkNonElements = base && dir === "parentNode",
            doneName = done++;

        return combinator.first ?
            // Check against closest ancestor/preceding element
            function( elem, context, xml ) {
                while ( (elem = elem[ dir ]) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        return matcher( elem, context, xml );
                    }
                }
            } :

            // Check against all ancestor/preceding elements
            function( elem, context, xml ) {
                var data, cache, outerCache,
                    dirkey = dirruns + " " + doneName;

                // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                if ( xml ) {
                    while ( (elem = elem[ dir ]) ) {
                        if ( elem.nodeType === 1 || checkNonElements ) {
                            if ( matcher( elem, context, xml ) ) {
                                return true;
                            }
                        }
                    }
                } else {
                    while ( (elem = elem[ dir ]) ) {
                        if ( elem.nodeType === 1 || checkNonElements ) {
                            outerCache = elem[ expando ] || (elem[ expando ] = {});
                            if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
                                if ( (data = cache[1]) === true || data === cachedruns ) {
                                    return data === true;
                                }
                            } else {
                                cache = outerCache[ dir ] = [ dirkey ];
                                cache[1] = matcher( elem, context, xml ) || cachedruns;
                                if ( cache[1] === true ) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
    }

    function elementMatcher( matchers ) {
        return matchers.length > 1 ?
            function( elem, context, xml ) {
                var i = matchers.length;
                while ( i-- ) {
                    if ( !matchers[i]( elem, context, xml ) ) {
                        return false;
                    }
                }
                return true;
            } :
            matchers[0];
    }

    function condense( unmatched, map, filter, context, xml ) {
        var elem,
            newUnmatched = [],
            i = 0,
            len = unmatched.length,
            mapped = map != null;

        for ( ; i < len; i++ ) {
            if ( (elem = unmatched[i]) ) {
                if ( !filter || filter( elem, context, xml ) ) {
                    newUnmatched.push( elem );
                    if ( mapped ) {
                        map.push( i );
                    }
                }
            }
        }

        return newUnmatched;
    }

    function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
        if ( postFilter && !postFilter[ expando ] ) {
            postFilter = setMatcher( postFilter );
        }
        if ( postFinder && !postFinder[ expando ] ) {
            postFinder = setMatcher( postFinder, postSelector );
        }
        return markFunction(function( seed, results, context, xml ) {
            var temp, i, elem,
                preMap = [],
                postMap = [],
                preexisting = results.length,

                // Get initial elements from seed or context
                elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                // Prefilter to get matcher input, preserving a map for seed-results synchronization
                matcherIn = preFilter && ( seed || !selector ) ?
                    condense( elems, preMap, preFilter, context, xml ) :
                    elems,

                matcherOut = matcher ?
                    // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                    postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                        // ...intermediate processing is necessary
                        [] :

                        // ...otherwise use results directly
                        results :
                    matcherIn;

            // Find primary matches
            if ( matcher ) {
                matcher( matcherIn, matcherOut, context, xml );
            }

            // Apply postFilter
            if ( postFilter ) {
                temp = condense( matcherOut, postMap );
                postFilter( temp, [], context, xml );

                // Un-match failing elements by moving them back to matcherIn
                i = temp.length;
                while ( i-- ) {
                    if ( (elem = temp[i]) ) {
                        matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                    }
                }
            }

            if ( seed ) {
                if ( postFinder || preFilter ) {
                    if ( postFinder ) {
                        // Get the final matcherOut by condensing this intermediate into postFinder contexts
                        temp = [];
                        i = matcherOut.length;
                        while ( i-- ) {
                            if ( (elem = matcherOut[i]) ) {
                                // Restore matcherIn since elem is not yet a final match
                                temp.push( (matcherIn[i] = elem) );
                            }
                        }
                        postFinder( null, (matcherOut = []), temp, xml );
                    }

                    // Move matched elements from seed to results to keep them synchronized
                    i = matcherOut.length;
                    while ( i-- ) {
                        if ( (elem = matcherOut[i]) &&
                            (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                            seed[temp] = !(results[temp] = elem);
                        }
                    }
                }

            // Add elements to results, through postFinder if defined
            } else {
                matcherOut = condense(
                    matcherOut === results ?
                        matcherOut.splice( preexisting, matcherOut.length ) :
                        matcherOut
                );
                if ( postFinder ) {
                    postFinder( null, results, matcherOut, xml );
                } else {
                    push.apply( results, matcherOut );
                }
            }
        });
    }

    function matcherFromTokens( tokens ) {
        var checkContext, matcher, j,
            len = tokens.length,
            leadingRelative = Expr.relative[ tokens[0].type ],
            implicitRelative = leadingRelative || Expr.relative[" "],
            i = leadingRelative ? 1 : 0,

            // The foundational matcher ensures that elements are reachable from top-level context(s)
            matchContext = addCombinator( function( elem ) {
                return elem === checkContext;
            }, implicitRelative, true ),
            matchAnyContext = addCombinator( function( elem ) {
                return indexOf.call( checkContext, elem ) > -1;
            }, implicitRelative, true ),
            matchers = [ function( elem, context, xml ) {
                return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                    (checkContext = context).nodeType ?
                        matchContext( elem, context, xml ) :
                        matchAnyContext( elem, context, xml ) );
            } ];

        for ( ; i < len; i++ ) {
            if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
            } else {
                matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                // Return special upon seeing a positional matcher
                if ( matcher[ expando ] ) {
                    // Find the next relative operator (if any) for proper handling
                    j = ++i;
                    for ( ; j < len; j++ ) {
                        if ( Expr.relative[ tokens[j].type ] ) {
                            break;
                        }
                    }
                    return setMatcher(
                        i > 1 && elementMatcher( matchers ),
                        i > 1 && toSelector(
                            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                        ).replace( rtrim, "$1" ),
                        matcher,
                        i < j && matcherFromTokens( tokens.slice( i, j ) ),
                        j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                        j < len && toSelector( tokens )
                    );
                }
                matchers.push( matcher );
            }
        }

        return elementMatcher( matchers );
    }

    function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
        // A counter to specify which element is currently being matched
        var matcherCachedRuns = 0,
            bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function( seed, context, xml, results, outermost ) {
                var elem, j, matcher,
                    matchedCount = 0,
                    i = "0",
                    unmatched = seed && [],
                    setMatched = [],
                    contextBackup = outermostContext,
                    // We must always have either seed elements or outermost context
                    elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                    // Use integer dirruns iff this is the outermost matcher
                    dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                    len = elems.length;

                if ( outermost ) {
                    outermostContext = context !== document && context;
                    cachedruns = matcherCachedRuns;
                }

                // Add elements passing elementMatchers directly to results
                // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                // Support: IE<9, Safari
                // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                    if ( byElement && elem ) {
                        j = 0;
                        while ( (matcher = elementMatchers[j++]) ) {
                            if ( matcher( elem, context, xml ) ) {
                                results.push( elem );
                                break;
                            }
                        }
                        if ( outermost ) {
                            dirruns = dirrunsUnique;
                            cachedruns = ++matcherCachedRuns;
                        }
                    }

                    // Track unmatched elements for set filters
                    if ( bySet ) {
                        // They will have gone through all possible matchers
                        if ( (elem = !matcher && elem) ) {
                            matchedCount--;
                        }

                        // Lengthen the array for every element, matched or not
                        if ( seed ) {
                            unmatched.push( elem );
                        }
                    }
                }

                // Apply set filters to unmatched elements
                matchedCount += i;
                if ( bySet && i !== matchedCount ) {
                    j = 0;
                    while ( (matcher = setMatchers[j++]) ) {
                        matcher( unmatched, setMatched, context, xml );
                    }

                    if ( seed ) {
                        // Reintegrate element matches to eliminate the need for sorting
                        if ( matchedCount > 0 ) {
                            while ( i-- ) {
                                if ( !(unmatched[i] || setMatched[i]) ) {
                                    setMatched[i] = pop.call( results );
                                }
                            }
                        }

                        // Discard index placeholder values to get only actual matches
                        setMatched = condense( setMatched );
                    }

                    // Add matches to results
                    push.apply( results, setMatched );

                    // Seedless set matches succeeding multiple successful matchers stipulate sorting
                    if ( outermost && !seed && setMatched.length > 0 &&
                        ( matchedCount + setMatchers.length ) > 1 ) {

                        Sizzle.uniqueSort( results );
                    }
                }

                // Override manipulation of globals by nested matchers
                if ( outermost ) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }

                return unmatched;
            };

        return bySet ?
            markFunction( superMatcher ) :
            superMatcher;
    }

    compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
        var i,
            setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[ selector + " " ];

        if ( !cached ) {
            // Generate a function of recursive functions that can be used to check each element
            if ( !group ) {
                group = tokenize( selector );
            }
            i = group.length;
            while ( i-- ) {
                cached = matcherFromTokens( group[i] );
                if ( cached[ expando ] ) {
                    setMatchers.push( cached );
                } else {
                    elementMatchers.push( cached );
                }
            }

            // Cache the compiled function
            cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
        }
        return cached;
    };

    function multipleContexts( selector, contexts, results ) {
        var i = 0,
            len = contexts.length;
        for ( ; i < len; i++ ) {
            Sizzle( selector, contexts[i], results );
        }
        return results;
    }

    function select( selector, context, results, seed ) {
        var i, tokens, token, type, find,
            match = tokenize( selector );

        if ( !seed ) {
            // Try to minimize operations if there is only one group
            if ( match.length === 1 ) {

                // Take a shortcut and set the context if the root selector is an ID
                tokens = match[0] = match[0].slice( 0 );
                if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        support.getById && context.nodeType === 9 && documentIsHTML &&
                        Expr.relative[ tokens[1].type ] ) {

                    context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                    if ( !context ) {
                        return results;
                    }
                    selector = selector.slice( tokens.shift().value.length );
                }

                // Fetch a seed set for right-to-left matching
                i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
                while ( i-- ) {
                    token = tokens[i];

                    // Abort if we hit a combinator
                    if ( Expr.relative[ (type = token.type) ] ) {
                        break;
                    }
                    if ( (find = Expr.find[ type ]) ) {
                        // Search, expanding context for leading sibling combinators
                        if ( (seed = find(
                            token.matches[0].replace( runescape, funescape ),
                            rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                        )) ) {

                            // If seed is empty or no tokens remain, we can return early
                            tokens.splice( i, 1 );
                            selector = seed.length && toSelector( tokens );
                            if ( !selector ) {
                                push.apply( results, seed );
                                return results;
                            }

                            break;
                        }
                    }
                }
            }
        }

        // Compile and execute a filtering function
        // Provide `match` to avoid retokenization if we modified the selector above
        compile( selector, match )(
            seed,
            context,
            !documentIsHTML,
            results,
            rsibling.test( selector ) && testContext( context.parentNode ) || context
        );
        return results;
    }

    // One-time assignments

    // Sort stability
    support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

    // Support: Chrome<14
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;

    // Initialize against the default document
    setDocument();

    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function( div1 ) {
        // Should return 1, but returns 4 (following)
        return div1.compareDocumentPosition( document.createElement("div") ) & 1;
    });

    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if ( !assert(function( div ) {
        div.innerHTML = "<a href='#'></a>";
        return div.firstChild.getAttribute("href") === "#" ;
    }) ) {
        addHandle( "type|href|height|width", function( elem, name, isXML ) {
            if ( !isXML ) {
                return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
            }
        });
    }

    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if ( !support.attributes || !assert(function( div ) {
        div.innerHTML = "<input/>";
        div.firstChild.setAttribute( "value", "" );
        return div.firstChild.getAttribute( "value" ) === "";
    }) ) {
        addHandle( "value", function( elem, name, isXML ) {
            if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                return elem.defaultValue;
            }
        });
    }

    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if ( !assert(function( div ) {
        return div.getAttribute("disabled") == null;
    }) ) {
        addHandle( booleans, function( elem, name, isXML ) {
            var val;
            if ( !isXML ) {
                return elem[ name ] === true ? name.toLowerCase() :
                        (val = elem.getAttributeNode( name )) && val.specified ?
                        val.value :
                    null;
            }
        });
    }

    //Add to jsApp
    jsApp.find = Sizzle;
    jsApp.matchesSelector = Sizzle.matchesSelector;
    jsApp.matches = Sizzle.matches;
    jsApp.contains = Sizzle.contains;
    jsApp.unique = Sizzle.uniqueSort;
})(window);
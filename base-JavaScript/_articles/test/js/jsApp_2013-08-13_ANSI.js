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
        var _this = this, ele;

        //���������selector����������Ϊ""��undefined��null��false��0��ֵʱ������ִ�к�������
        if(!selector)
        {
            return;
        }

        //�����HTML�������window����
        if(selector.nodeType || selector === window)
        {
            //˵����JSON��������ͨ�����鸳ֵ����ʽ����Ԫ����չ����ʹ�ø÷�ʽ�󲢲�����JSON����߱���������ʣ���ӵ��length���ԣ���
            _this[0] = selector;
            _this.length = 1;
            return;
        }

        //���Ϊ�ַ���
        if(typeof(selector) === "string")
        {
            //���ΪID��ȡ
            if(/^#[\w-]+/i.test(selector))
            {
                ele = document.getElementById(selector.substring(1, selector.length));
                if(ele !== null)
                {
                    _this[0] = ele;
                    _this.length = 1;
                }
            }
        }
    }

    //��չjsApp�����ʵ����Ա
    jsApp.fn = jsApp.prototype = /** @lends jsApp.prototype */{
        
        /**
         * ����¼���
         * @param  {String} name    �¼�����
         * @param  {Function} handler �¼��������
         * @param  {Boolean} [capture=false] �Ƿ�����¼���׽
         * @return {Function}         �¼��������
         * @example
         * var testID_click = $$("#testID").bind("click", function()
         * {
         *     alert("����¼���");
         * });
         */
        bind: function(name, handler, capture)
        {
            return jsApp.map(this, function(index, ele)
            {
                //�����¼�����this�ؼ���
                var callback = function(e)
                {
                    e = jsApp.rewriteEvent(e);
                    handler.call(e.target, e);
                }

                //�¼��󶨵ļ����Բ���
                "addEventListener" in ele ? 
                    ele.addEventListener(name, callback, capture) : 
                    ele.attachEvent("on" + name, callback);

                //���ء��¼�������򡱣�������¼���ʱ��ʹ����ر��������ռ����Ա����ȡ���¼��󶨲�����
                return callback;

            });
        },

        /**
         * ����¼���
         * @param  {String} name    �¼�����
         * @param  {Function} handler �¼��������
         * @param  {Boolean} [capture=false] �Ƿ�����¼���׽
         * @example
         * $$("#testID").unbind("click", testID_click);
         */
        unbind: function(name, handler, capture)
        {
            return jsApp.map(this, function(index, ele)
            {
                //����󶨵ļ����Բ���
                "removeEventListener" in ele ? 
                    ele.removeEventListener(name, handler, capture) : 
                    ele.detachEvent("on" + name, handler);
            });
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
         * ΪjsApp�е�ԭ�ͷ���ִ�м�������
         * <br />ԭ�ͷ���ͨ����Ҫ��Լ��������Ԫ�ؼ��϶�ִ��ͬһ������ͨ���ú����ɽ���ͳһ���䡣
         * <br />ԭ�ͷ���ͨ����Ҫ�漰DOMԪ�صĲ�����ͨ���ú������ڻص�����ִ��ǰ�ж�Ŀ��Ԫ�ص����ޣ��Ӷ�ȷ���ص������д���ִ����ȷ��
         * <br />�ڻص������У�thisָ�������������һ����������Ŀ��Ԫ����Ԫ�ؼ����е�����ֵ���ڶ������������Ŀ��Ԫ�ء�
         * @param  {Object}   match    ��Ҫ���м����Ķ��󣨼�jsApp��ĳ������ʵ����
         * @param  {Function} callback �ص�����
         * @return {Object|Others}     ������������е�Ԫ�ؼ���Ϊ�գ��򷵻ؼ��������������Ϊ�գ��򷵻�Ԫ�ؼ����е�һ��Ԫ��ִ�лص������������صĽ����
         */
        map: function(match, callback)
        {
            var len = match.length, i;

            if(len)
            {
                for(i = 1; i < len; i++)
                {
                    callback.call(match, i, match[i]);
                }
                return callback.call(match, 0, match[0]);
            }
            return match;
        },

        /**
         * ���¼����������д
         * @param  {Object} e ��дǰ���¼�����
         * @return {Object}   ��д����¼�����
         * @example
         * e = jsApp.rewriteEvent(e);
         */
        rewriteEvent: function(e)
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
        }
    });

    window.$ = window.jsApp = jsApp;   //��jsAppת��Ϊȫ�ֶ���

})(window);
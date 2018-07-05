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
        var _this = this, ele;

        //如果不存在selector参数，或者为""、undefined、null、false、0等值时，不再执行后续操作
        if(!selector)
        {
            return;
        }

        //如果是HTML对象或者window对象
        if(selector.nodeType || selector === window)
        {
            //说明：JSON对象允许通过数组赋值的形式进行元素扩展，但使用该方式后并不会让JSON对象具备数组的性质（即拥有length属性）。
            _this[0] = selector;
            _this.length = 1;
            return;
        }

        //如果为字符串
        if(typeof(selector) === "string")
        {
            //如果为ID获取
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

    //扩展jsApp对象的实例成员
    jsApp.fn = jsApp.prototype = /** @lends jsApp.prototype */{

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
         * 为jsApp中的原型方法执行检索操作
         * <br />原型方法通常需要针对检索对象的元素集合都执行同一操作，通过该函数可进行统一调配。
         * <br />原型方法通常需要涉及DOM元素的操作，通过该函数可在回调函数执行前判断目标元素的有无，从而确保回调函数中代码执行正确。
         * <br />在回调函数中，this指向检索对象本身，第一个参数代表目标元素在元素集合中的索引值，第二个参数则代表目标元素。
         * @param  {Object}   match    需要进行检索的对象（即jsApp的某个对象实例）
         * @param  {Function} callback 回调函数
         * @return {Object|Others}     如果检索对象中的元素集合为空，则返回检索对象本身；如果不为空，则返回元素集合中第一个元素执行回调函数后所返回的结果。
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
        }
    });

    window.$ = window.jsApp = jsApp;   //将jsApp转换为全局对象

})(window);
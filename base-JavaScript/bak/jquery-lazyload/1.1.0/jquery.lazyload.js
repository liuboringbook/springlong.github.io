/**
 * @file        基于jQuery的图片懒加载插件
 * @version     1.1.0
 * @author      龙泉 <yangtuan2009@126.com>
 */

/**
 * 执行图片懒加载的处理
 * @param  {Object} params 参数配置列表
 * @param  {String} params.dataSrc 存放真实图片地址的自定义属性的名称，默认为"data-src"
 * @param  {jQuery} params.container 用来指定图片是在哪个容器下作懒加载处理，默认为window的jQuery对象
 * @param  {Number} params.threshold 设置一个阀值，用来指定可以提前多长的距离来优先加载图片，默认为0——即仅显示处于显示窗口位置内的图片
 * @param  {String} params.effect 用来指定加载图片时的效果，默认为"show"——普通的显示操作，还可以是"fadeIn"——淡入效果，"slideDown"——下滑显示效果
 * @param  {String} params.scroll 用来区分图片加载顺序是横轴加载（x）还是纵轴加载（y），默认为y。
 * @param  {Boolean} params.viewport 是否执行仅限于可视窗口之内的图片，默认为false——表示将加载可视窗口内以及位于之前的所有图片。
 * @return {jQuery}        返回原jQuery操作对象
 */
jQuery.fn.lazyLoad = function(params)
{
    //参数匹配
    var $win = jQuery(window),
        config = jQuery.extend({
            dataSrc: "data-src",
            container: $win,
            threshold: 0,
            effect: "show",
            scroll: "y",
            viewport: false
        }, params),
        $container = config.container,
        dataSrc = config.dataSrc,
        doEffect = config.effect !== "show",
        elements = [],
        isWindow = $container[0] === window,
        scrollDir = config.scroll === "x" ? "Left" : "Top",
        direct = scrollDir.toLowerCase(),
        prop = config.scroll === "x" ? "width" : "height";

    //将元素信息缓存起来
    this.each(function(){
        elements.push({
            ele: jQuery(this),
            isImg: this.nodeName.toLowerCase() === "img"
        });
    });

    //绑定触发时机
    $container.on("scroll", loadImg);
    isWindow && $win.resize(loadImg);
    loadImg();

    //执行图片加载处理
    function loadImg()
    {
        var i = 0,
            len = elements.length,
            scrollTop = $container["scroll" + scrollDir](),
            viewHeight = $container[prop](),
            dis = isWindow ? 0 : $container.offset()[direct],
            $ele, data, offsetTop, cando;

        //循环图片列表，当图片位于显示窗口时则将其加载
        //每加载一张图片，则将该图片从elements数组中移除
        for(; i < len; )
        {
            data = elements[i];
            $ele = data.ele;
            offsetTop = $ele.offset()[direct] + (isWindow ? 0 : scrollTop - dis);
            cando = offsetTop <= scrollTop + viewHeight + config.threshold;

            if(cando && (!config.viewport || offsetTop + $ele[prop]() + config.threshold >= scrollTop)){
                if(data.isImg){
                    $ele.attr("src", $ele.attr(dataSrc)).removeAttr(dataSrc);
                }else{
                    $ele.css("backgroundImage", "url(" + $ele.attr(dataSrc) + ")").removeAttr(dataSrc);
                }
                doEffect && $ele.hide()[config.effect]();
                elements.splice(i, 1);
                len--;
            }else{
                i++;
            }
        }

        //解除事件绑定
        if(len === 0){
            $container.off("scroll", loadImg);
            isWindow && $win.off("resize", loadImg);
        }
    }

    //返回原jQuery对象
    return this;
};
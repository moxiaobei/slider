/**
 * @file dp前端性能分析代码－配置需要统计的模块   pc和mobile端会稍有不同，必须严格按照该文档来部署
 *       配置地址：http://dp.baidu.com/access/deploy?product=666&page=666_1
 * @author wukaifang(wukaifang@baidu.com)
 */

window.alogObjectConfig = {  // 配置各种统计模块，不需要的模块不配置即可
    product: '666',     // 必须, DP平台产品线id
    page: '666_1',        // 必须, DP平台页面id
    // 性能
    speed: {
        sample: '0.3'   // 抽样率, 0~1
        // special_pages: [{id:34,sample:1}]  特殊页面，和老的性能配置一致
        // custom_metrics : ['c_item1','p_item3'],自定义的性能指标，自动上报，只有这些指标都统计完毕之后数据才会发送
    },
    // 访问、点击
    monkey: {
        sample: '0.3'      // 抽样率, 0~1  建议使采样的pv控制在50万以内
        // hid: ''       // 兼容老版本的monkey，monkey实验的ID
        // pageflag: ''  // 个别特殊产品线使用的老monkey的pageflag
    },
    // js异常，配合FIS插件还可以自动加try/catch监控，详见‘帮助文档’--------------------------
    exception: {     // 注意：需要异常统计时，必须引入上面head中的相应代码
        sample: '0.3'   // 抽样率, 0~1  建议使采样的pv控制在50万以内
    },
    // 浏览器新特性(H5/CSS3)-----------------------------------------------------------------
    feature: {
        sample: '0.3'  // 抽样率, 0~1  建议使采样的pv控制在50万以内
    }
};
/*eslint-disable*/
void function(e,t,n,a,r,o){function c(t){e.attachEvent?e.attachEvent("onload",t,!1):e.addEventListener&&e.addEventListener("load",t)}function i(e,n,a){a=a||15;var r=new Date;r.setTime((new Date).getTime()+1e3*a),t.cookie=e+"="+escape(n)+";path=/;expires="+r.toGMTString()}function s(e){var n=t.cookie.match(new RegExp("(^| )"+e+"=([^;]*)(;|$)"));return null!=n?unescape(n[2]):null}function d(){var e=s("PMS_JT");if(e){i("PMS_JT","",-1);try{e=eval(e)}catch(n){e={}}e.r&&t.referrer.replace(/#.*/,"")!=e.r||alog("speed.set","wt",e.s)}}c(function(){alog("speed.set","lt",+new Date),r=t.createElement(n),r.async=!0,r.src=a+"?v="+~(new Date/864e5),o=t.getElementsByTagName(n)[0],o.parentNode.insertBefore(r,o)}),d()}(window,document,"script","http://img.baidu.com/hunter/alog/dp.mobile.min.js");

/**
 * @file 为scard提供逻辑支持
 * @author wukaifang(wukaifang@baidu.com)
 */

!(function () {
    var e = {
        data: {}
    };
    e.init = e.setup = function (a, b) {
        if (typeof a === 'function') {
            // 卡片逻辑都在require后执行，如果想立即执行，那么代码就不要封装在A.init或A.setup里
            a.call();
        }
        // else if (typeof a === 'string') {
        //     e.data[a] = b || {};
        // }
    };
    window.A = e;
})();

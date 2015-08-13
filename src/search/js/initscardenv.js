/**
 * @file 为scard提供逻辑支持
 * @author wukaifang(wukaifang@baidu.com)
 */

!(function () {
    var funcs = [];

    var e = {
        data: {}
    };
    e.init = e.setup = function (a) {
        if (typeof a === 'function') {
            // 卡片逻辑都在require后执行，如果想立即执行，那么代码就不要封装在A.init或A.setup里
            funcs.push(a);
        }
        // else if (typeof a === 'string') {
        //     e.data[a] = b || {};
        // }
    };

    define('search/js/initscardenv', function (require, exports) {
        exports = function () {
            for (var i = 0; i <= funcs.length - 1; i++) {
                var fn = funcs[i];
                var context = {};

                fn.call(context, require);
                fn = null;
            }
            funcs = [];
        };
        return exports;
    });

    window.A = e;
})();

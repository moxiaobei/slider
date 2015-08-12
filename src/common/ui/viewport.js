/**
 * @file viewport
 * @author kaivean(kaisey2012@163.com)
 */

define(function (require) {
    var $ = require('zepto');
    var viewport = {};
    var $win = $(window);
    var $doc = $(document);

    var bottomFns = [];
    var rotateFns = [];
    viewport.init = function () {
        $win.on('scroll.viewport', function () {
            if ($win.scrollTop() + $win.height() > $doc.height()) {
                for (var i = 0; i < bottomFns.length; i++) {
                    var disFn = bottomFns[i];
                    disFn.call(null); // arguments
                }
            }
        });

        $win.on('orientationchange.viewport', function (e) {
            for (var i = 0; i < rotateFns.length; i++) {
                var rotateFn = rotateFns[i];
                rotateFn.call(null); // arguments
            }
        });
    };

    viewport.onArrivalBottom = function (fn) {
        bottomFns.push(fn);
    };

    viewport.onWindowRotate = function (fn) {
        rotateFns.push(fn);
    };

    return viewport;
});



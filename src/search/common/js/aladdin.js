/**
 * @file aladdin卡片iframe加载
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {

    var Wise = require('common/ui/wise');

    var ic = document.getElementsByClassName('if-container');
    var nav = document.querySelector('.bdbox_wise_nav');
    var navLoading = document.querySelector('.bdbox_wise_nav--loading');
    var navContainer = document.querySelector('.bdbox_wise_nav-c');

    function wiseIframeLogic(wise, more, kw, fr) {

        if ('' + more === '1') {
            navLoading.style.display = 'block';
            nav.style.display = 'none';
            navContainer.style.display = 'block';
        }
        wise.load(kw, fr)
            .then(function () {
                if ('' + more === '1') {
                    nav.style.display = 'block';
                    navLoading.style.display = 'none';
                }
            });

        if ('' + more === '1' && nav) {
            nav.addEventListener('click', function () {
                navLoading.style.display = 'block';
                nav.style.display = 'none';
                wise.more()
                    .then(function () {
                        nav.style.display = 'block';
                        navLoading.style.display = 'none';
                    })
                    .fail(function () {
                        navLoading.style.display = 'block';
                        nav.style.display = 'none';
                        navLoading.innerHTML = '没有更多了';
                    });
            });
        }
    }


    var exports = function () {

        for (var i = 0, n = ic.length; i < n; i++) {
            var item = ic[i];
            var kw = decodeURIComponent($(item).data('kw'));
            var fr = $(item).data('fr');
            var more = $(item).data('more');

            var w = new Wise(item,
                {
                    fr: fr,
                    domain: document.domain,
                    convert: true,
                    port: window.location.port
                }
            );

            wiseIframeLogic(w, more, kw, fr);
        }
    };

    return exports;

});

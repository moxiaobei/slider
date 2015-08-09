/**
 * @file 相似图卡片逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

/* global A Box */
(function () {
    var $ = require('zepto');
    var env = require('common/widget/env');

    function openApp() {
        if (env.os.ios) {
            var url = 'http://m.baidu.com/searchbox?action=reserve&type=baiduchannel&from=1000715p';
            var iframe = $('<iframe>').hide().attr('src', url).appendTo('body');
            setTimeout(function () {
                iframe.remove();
            }, 3000);
        }

        else {
            // apk地址： 'http://dl.ops.baidu.com/baidusearch_AndroidPhone_1006979s.apk';
            // 以下为应用宝下载地址
            var url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.searchbox';
            // 必须要使用location.href ，使用iframe在微信和QQ浏览器下跳转不了
            location.href = url;
        }
    }

    $('#c-download-tip').on('click', function () {
        openApp();
    });
})();



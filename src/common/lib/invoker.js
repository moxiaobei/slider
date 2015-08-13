/**
 * @file 调起openjs相关功能，图像拍照等
 * @author wukaifang(wukaifang@baidu.com)
 */

 /* global Box */
define(function (require, exports) {
    var $ = require('zepto');
    var env = require('common/lib/env');
    var Box = require('openjs');

    // 获取ID
    var imgKey = (function () {
        var r = /([iI][rR]|[gG][dD]|[eE][sS])-(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/;
        var result = location.pathname.match(r);
        if (result) {
            result = result[0];
            // result = 'IR' + result.substr(2);
        }
        else {
            result = null;
        }
        return function () {
            return result;
        };

    }());

    var callEditor = (function () {
        var imageSearchType = $('#imageSearchType').val() || 'GENERAL';
        var data = {};
        var refUrl = encodeURIComponent(window.location.href);
        if (window._t_url) {
            data.key = null;
            data.url = window._t_url;
        }
        else {
            data.key = imgKey();
            data.url = null;
        }
        if (env.os.ios) {
            return function () {
                env.ready(function () {
                    data.referrer = 'http://qingpai.baidu.com/';
                    var refUrl = window.location.href;

                    // 图片编辑
                    Box.ios.invokeApp('imagesearch', {
                        action: 'editimage',
                        args: encodeURIComponent(''
                            + 'source_app=BROWSER&referer=' + refUrl
                            + '&imageSearch_type=' + imageSearchType
                        ),
                        params: encodeURIComponent(JSON.stringify(data)),
                        minver: encodeURIComponent('5.5.0.0')
                    });
                });
            };
        }
        if (env.os.android) {
            /* eslint-disable fecs-camelcase*/
            return function () {
                env.ready(function () {
                    // 图片编辑（依赖data, data默认放在S.options里面）
                    data.imageSearch_type = imageSearchType;
                    data.source_app = 'BROWSER';
                    data.referer = refUrl;
                    Box.android.invokeApp('Bdbox_android_imagesearch', 'editImage', [
                        JSON.stringify(data)
                    ]);
                });
            };
            /* eslint-enable fecs-camelcase*/
        }
        return function () {
            alert('暂时不支持非 Android，iOS 平台');
        };
    }());

    var callImageSearch = (function () {
        var imageSearchType = $('#imageSearchType').val() || 'GENERAL';
        var data = {};
        var refUrl = encodeURIComponent(window.location.href);
        if (window._t_url) {
            data.key = null;
            data.url = window._t_url;
        }
        else {
            data.key = imgKey();
            data.url = null;
        }
        if (env.os.ios) {
            return function () {
                env.ready(function () {
                    data.referrer = 'http://qingpai.baidu.com/';
                    var refUrl = window.location.href;
                    // 图片调起拍照
                    Box.ios.invokeApp('imagesearch', {
                        action: 'imagesearch',
                        params: encodeURIComponent(JSON.stringify(data)),
                        args: encodeURIComponent(''
                            + 'source_app=BROWSER&referer=' + refUrl
                            + '&imageSearch_type=' + imageSearchType
                        ),
                        minver: encodeURIComponent('3.8.0.0')
                    });
                });
            };
        }
        if (env.os.android) {
            return function () {
                env.ready(function () {
                    // 图片搜索
                    Box.android.invokeApp('Bdbox_android_send_intent', 'send', [
                        'intent:widgetid://com.baidu.searchbox/-1#Intent;'
                        + 'action=com.baidu.searchbox.action.MAIN;'
                        + 'category=android.intent.category.LAUNCHER;'
                        + 'component=com.baidu.searchbox/.CodeScannerActivity;'
                        + 'launchFlags=0x10000000;'
                        + 'S.from=7;'
                        + 'S.source_app=BROWSER;'
                        + 'S.referer=' + refUrl + ';'
                        + 'S.imageSearch_type=' + imageSearchType + ';'
                        + 'end'
                    ]);
                });
            };
        }
        return function () {
            alert('暂时不支持非 Android，iOS 平台');
        };
    }());

    exports.initCallEditor = function (ele) {
        ele = ele || '.c-invoke-edit-btn';
        var $editBtn = $(ele);
        $editBtn.on('click', function (e) {
            e.preventDefault();
            callEditor();
        });
    };

    exports.initCallImageSearch = function (ele) {
        ele = ele || '.c-invoke-image-search';
        var searchBtn = document.querySelector(ele);
        if (searchBtn) {
            searchBtn.addEventListener('click', function (ev) {
                ev.preventDefault();
                callImageSearch();
            });
        }
    };

    exports.initSetQuery = function () {
        window.addEventListener('pageshow', function () {
            env.ready(function () {
                if (env.os.ios) {
                    Box.ios.invokeApp('setquery', {
                        params: encodeURIComponent(JSON.stringify({
                            type: 'image',
                            query: window._t_base64
                        })),
                        minver: encodeURIComponent('5.5.0.0')
                    });
                }

                if (env.os.android) {
                    Box.android.invokeApp('Bdbox_android_common', 'setQuery', [
                        JSON.stringify({
                            type: 'image',
                            query: window._t_base64
                        })
                    ]);
                }
            });
        }, true);
    };

    return exports;
});

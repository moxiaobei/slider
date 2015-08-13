/**
 * @file data-in-view控制的log模块
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {

    var selector = '[data-in-view]';
    var raf = require('common/lib/animationFrame').requestAnimationFrame;
    var $ = require('zepto');

    var statStep = 1000;


    var exports = function () {

        var lastTime = 0;

        raf(function (time) {
            lastTime = time;
            requestNextLog(time);
        });


        /**
         * log请求
         *
         * @param {string} time 当前的时间戳
         */
        function requestNextLog(time) {
            if (time - lastTime > statStep) {
                lastTime = time;
                var inV = document.querySelectorAll(selector);
                if (inV.length > 0) {
                    var nl = checkInView(inV);
                    var ll = collectStInfo(nl);
                    sendLog(ll);
                }
            }
            raf(requestNextLog);
        }


        /**
         * 检查待检测的dom是否在视图中
         *
         * @param {array<Object>} nodeList 待检测的含有data-in-view的dom元素列表
         * @return {array<Object>}          在视图中的可打log的dom元素
         */
        function checkInView(nodeList) {

            var inViewList = [];
            var h = window.innerHeight;

            for (var i = 0, n = nodeList.length; i < n; i++) {

                var el = nodeList[i];

                if (el.getBoundingClientRect) {
                    var rect = el.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < h) {
                        inViewList.push(el);
                    }
                    else if (inViewList.length > 0) {
                        break;
                    }
                }
            }
            return inViewList;
        }


        /**
         * 得到log参数列表
         *
         * @param {array<Object>} nodeList 在视图中的可打log的dom元素
         * @return {array<Object>}          log参数列表
         */
        function collectStInfo(nodeList) {

            var logList = [];

            for (var i = 0, n = nodeList.length; i < n; i++) {
                var el = nodeList[i];
                var s = $(el).attr('data-in-view');
                el.removeAttribute('data-in-view');
                if (s) {
                    logList.push(s);
                }
            }
            return logList;
        }


        /**
         * 发送log请求
         *
         * @param {array<Object>} logList log请求的参数列表
         */
        function sendLog(logList) {
            if (logList.length === 0) {
                return;
            }
            var img = document.createElement('img');
            var path = '/api/log/?';
            path += 'a=inview';
            path += '&i=' + encodeURIComponent(logList.join('|'));
            img.src = path;
        }
    };

    return exports;

});

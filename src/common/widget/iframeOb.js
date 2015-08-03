/**
 * @file iframe 跨域请求卡片内容
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {

    var Q = require('common/widget/q');
    var env = require('common/widget/env');

    // 开关，是否关注 message 事件
    var watchMessage = true;

    window.addEventListener('popstate', function () {

        var s = document.getElementsByTagName('iframe');

        // alert('popstate');

        for (var i = 0, n = s.length; i < n; i++) {

            // s[i].src = '' + s[i].src;
            s[i].width = window.innerWidth - 10;
            s[i].style.width = (window.innerWidth - 10) + 'px';
        }
        setTimeout(function () {
            for (var i = 0, n = s.length; i < n; i++) {

                // s[i].src = '' + s[i].src;
                s[i].width = window.innerWidth;
                s[i].style.width = (window.innerWidth) + 'px';
            }
        }, 100);
    });

    /* eslint-disable fecs-camelcase */
    var _message = function (win, action, data) {
        var msg = {
            action: action,
            data: data || {}
        };
        // console.log('send to iframe', msg);
        win.postMessage(JSON.stringify(msg), '*');
    };
    /* eslint-enable fecs-camelcase */


    var Ob = function (options) {

        var self = this;

        self._moreFn = [];

        self._iframeSet = {};


        self._action = {

            /* eslint-disable fecs-camelcase */
            _ready: function (data, source) {
                _message(source, '_whoRU', {
                    id: 'Hello',
                    name: 'LiLei'
                });
            },

            _ensure: function (data, source, iframe) {
                if (data.name === 'HanMeimei' && data.id === 'Hello') {
                    // console.log('iframe is ready');
                    _message(source, '_options', options);
                }
            },
            /* eslint-enable fecs-camelcase */

            changeHeight: function (data, source, iframe, deferred) {
                // console.log('changeHeight', data);
                if (data.height) {
                    iframe.height = data.height;
                    iframe.style.height = data.height + 'px';
                    iframe.style.width = window.innerWidth + 'px';
                    iframe.style.position = 'static';
                    // iframe.removeAttribute('style');
                    setTimeout(function () {
                        deferred.resolve();
                    }, 0);
                }
            },
            more: function (data) {

                for (var i = 0, n = self._moreFn.length; i < n; i++) {
                    self._moreFn[i].call(null, data.more);
                }
                // alert(data.more);
            }
        };

        window.addEventListener('message', function (ev) {

            if (watchMessage) {

                var targetObj = self._getTargetFrame(ev.source);

                if (!targetObj) {
                    // console.warn('source not exist', ev.source);
                    return;
                }
                var targetIFrame = targetObj.el;
                var targetDefer = targetObj.defer;
                // console.log(ev.source);

                var data;
                try {
                    data = JSON.parse(ev.data);
                    // if (DEBUG) {
                    //     console.group('iframe');
                    //     console.log(data.action);
                    //     console.log(data.data);
                    //     console.groupEnd('iframe');
                    // }
                }
                catch (e) {
                    self._message(ev.source, 'unknown', {});
                    return;
                }

                if (data.action === 'unknown') {
                    throw new Error('child response unknown method');
                }

                var act = 'unknown';
                if (self._action[data.action]) {
                    act = data.action;
                }

                if (act === 'unknown') {
                    _message(ev.source, act, {});
                    return;
                }

                try {
                    self._action[act].call(self, data.data || {}, ev.source, targetIFrame, targetDefer);
                }
                catch (e) {
                    _message(ev.source, 'error', {});
                }
            }
        });
    };

    /**
     * 根据 message 事件的 resource 找出对应的 iframe 标签
     *
     * @param  {[type]} source [description]
     * @return {[type]}        [description]
     */
    Ob.prototype._getTargetFrame = function (source) {

        var self = this;
        var frameSet = self._iframeSet;
        for (var i in frameSet) {
            if (!frameSet.hasOwnProperty(i)) {
                continue;
            }
            if (frameSet[i].el.contentWindow === source) {
                return frameSet[i];
            }
        }
        return false;
    };

    Ob.prototype.createIFrame = function (url) {
        var self = this;
        var iframe = document.createElement('iframe');

        var deferred = Q.defer();
        iframe.id = env.guid('wise');
        iframe.className = 'wise-iframe';
        iframe.height = 0;
        iframe.scrolling = 'no';
        iframe.src = url;
        iframe.style.cssText = ''
            + 'margin: -5px 0; '
            + 'padding: 0; '
            + 'border: 0;'
            + 'width: ' + window.innerWidth + 'px; '
            + 'height: 0; '
            + 'position: absolute;';

        var obj = {
            el: iframe,
            defer: deferred
        };
        self._iframeSet[iframe.id] = obj;

        return obj;
    };

    Ob.prototype.onMore = function (fn) {
        if (typeof fn === 'function') {
            this._moreFn.push(fn);
        }
    };

    return Ob;
});

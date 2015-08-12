/**
 * @file 异步在iframe中加载wise aladdin卡片
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {

    var Q = require('common/lib/q');
    var Ob = require('common/widget/iframeOb');

    /**
     * 阿拉丁iframe构造函数
     *
     * @param {Element|String} selector 选择器
     * @param {Object} options 参数
     * @constructor
     */
    var Wise = function (selector, options) {

        var el;
        var self = this;

        if (selector instanceof Element) {
            el = selector;
        }
        else {
            el = document.querySelector(selector);
        }

        if (!el) {
            throw new Error('element is not exist');
        }

        self.el = el;
        self._more = false;

        options = options || {};
        var ob = new Ob(options);
        ob.onMore(function (more) {
            self._more = !!more;
        });

        this.ob = ob;
    };


    Wise.prototype.load = function (keyword, from) {
        this.from = from;
        this.keyword = keyword;
        this.pageNum = 1;
        var deferred = Q.defer();
        deferred.resolve();
        this.loadPromise = deferred.promise;

        this.el.innerHTML = '';

        return this._loadIFrameWithKeywordAndFrom(this.keyword, this.from, this.pageNum);
    };


    Wise.prototype.more = function () {

        var self = this;

        if (!self._more) {
            // 如果没有更多了
            var deferred = Q.defer();
            deferred.reject('no more');
            return deferred.promise;
        }
        self.pageNum += 1;
        return self._loadIFrameWithKeywordAndFrom(self.keyword, self.from, self.pageNum);
    };


    Wise.prototype._loadIFrameWithKeywordAndFrom = function (keyword, from, pageNum) {

        var self = this;
        var deferred = Q.defer();
        this.loadPromise
            .then(function () {
                pageNum = parseInt(pageNum, 10) || 1;
                if (pageNum < 1) {
                    pageNum = 1;
                }
                var url = '/api/proxy/search'
                    + '?word=' + encodeURIComponent(keyword)
                    + '&fr=' + encodeURIComponent(from)
                    + '&pn=' + pageNum;

                var target = self.ob.createIFrame(url);
                var iframe = target.el;

                target.defer.promise
                    .then(function () {
                        deferred.resolve();
                    })
                    .fail(function () {
                        deferred.reject();
                    });

                self.el.appendChild(iframe);
            });
        self.loadPromise = deferred.promise;
        return deferred.promise;
    };


    return Wise;
});

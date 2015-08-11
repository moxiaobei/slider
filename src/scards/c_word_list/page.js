/**
 * @file 相似图卡片逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

/* global A */
(function () {
    var $ = require('zepto');
    var env = require('common/widget/env');

    function getKeywords(needRetry) {
        var wordClass = 'c-word-list-s';
        var wordEls = document.getElementsByClassName(wordClass);
        var words = [];
        var wordsMap = {};

        var trim = (function () {
            if (''.trim) {
                return function (str) {
                    return str.trim();
                };
            }
            var reg = /^\s+|\s+$/g;
            return function (str) {
                return str.replace(reg, '');
            };
        }());

        for (var i = 0, n = wordEls.length; i < n; i++) {
            var wd = trim(wordEls[i].innerHTML);
            words.push(wd);
            wordsMap[wd] = {
                // el: wordEls[i],
                cls: $(wordEls[i]).data('for')
            };
        }

        if (words.length === 0) {
            return;
        }

        var keyword = words.join(',');
        // var cls = dom.data(el, 'for');

        var url = '/bdboxn/1/sims/words/';

        $.ajax({
            type: 'GET',
            url: url,
            data: {
                keywords: keyword,
                offset: 0,
                limit: 3
            },
            dataType: 'json',
            timeout: 4000,
            success: function (data) {
                var responseParams = data.response_params || {};
                // console.log(responseParams);
                for (var k in responseParams) {
                    if (responseParams.hasOwnProperty(k)) {
                        var wd = trim(k);
                        if (!wordsMap[wd].cls) {
                            // 找不到元素
                            continue;
                        }

                        var els = document.getElementsByClassName(wordsMap[wd].cls);
                        for (var i = 0, n = Math.min(els.length, 3, responseParams[k].list.length); i < n; i++) {
                            var el = els[i];
                            var src = responseParams[k].list[i].url;
                            el.style.backgroundImage = 'url(' + src + ')';
                            $(el).data('src', src);
                        }
                    }

                }
            },
            error: function () {
                if (needRetry) {
                    getKeywords(false);
                }
            }
        });
    }

    getKeywords(true);

})();



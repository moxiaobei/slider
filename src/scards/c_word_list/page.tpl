/*eslint-disable*/
{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName = "c-word-list"%}
{%/block%}

{%block name="title"%}
    相似图片
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-word-list .c-word-list-item {
  padding: 10px 0;
  border-top: 1px solid #f5f5f5;
}
.result-c-word-list .c-word-list-item:first-child {
  border-top: none;
}
.result-c-word-list .c-word-list-box {
  width: 22%;
  position: relative;
  padding-bottom: 22%;
}
.result-c-word-list .c-word-list-char {
  border: 1px solid #92b9f8;
  background: #e8f4ff;
}
.result-c-word-list .c-word-list-char .center-box {
  letter-spacing: -5px;
  font-size: 0;
  height: 100%;
}
.result-c-word-list .c-word-list-char .center-box .center-hack {
  display: inline-block;
  font-size: 0;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
.result-c-word-list .c-word-list-char .center-box .center-body {
  letter-spacing: normal;
  word-spacing: normal;
  display: inline-block;
  font-size: 12px;
  vertical-align: middle;
  padding: 0!important;
  margin: 0!important;
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
}
.result-c-word-list .c-word-list-img {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAGXRFW…FnZVJlYWR5ccllPAAAABRJREFUCNdj+IEEGID4HRhg48ABAK1ALgnwLRxbAAAAAElFTkSuQmCC) repeat;
}
.result-c-word-list .c-word-list-p {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: no-repeat;
  background-position: center;
  background-size: cover;
}
.result-c-word-list .c-word-list-el {
  position: absolute;
  color: #0000cc;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 3px;
  text-align: center;
  overflow: hidden;
  display: block;
}
.result-c-word-list .c-word-list-el .center-box .center-body {
  font-size: 14px;
}

    </style>
    <div class="{%$cardName%}">
        {%foreach $tplData.words as $key=>$item%}
            {%$order = $item@index + 1%}
            <div class="{%$cardName%}-item flex flex--justify">
                <div class="{%$cardName%}-box {%$cardName%}-char" data-in-view="t:keyword_{%$item.type%},o:{%$tplData.order%}">
                {%$url = "/bdbox/gsword/word/"|cat:urlencode($item.keyword)|cat:"/"%}
                {%$redirectType = "bdbox_bingo_keyword_"|cat:$item.type%}

                {%$redirectUrl = "/api/proxy/redirect?u="|cat:urlencode($url)|cat:"&fr="|cat:urlencode($redirectType)|cat:"&o="|cat:urlencode($tplData.order) %}
                    <a class="{%$cardName%}-el" href="{%$redirectUrl%}">
                        <div class="center-box"> <b class="center-hack"></b>
                            <div class="center-body {%$cardName%}-s" data-for="{%$cardName%}-p-{%$item@index%}">{%$item.keyword|truncate:18:"...":true%}</div>
                        </div>
                    </a>
                </div>
                <div class="{%$cardName%}-box bd-card-default-img">
                    <div class="{%$cardName%}-p {%$cardName%}-p-{%$item@index%}" data-relative="{%$cardName%}-p-{%$item@index%}"></div>
                </div>
                <div class="{%$cardName%}-box bd-card-default-img">
                    <div class="{%$cardName%}-p {%$cardName%}-p-{%$item@index%}" data-relative="{%$cardName%}-p-{%$item@index%}"></div>
                </div>
                <div class="{%$cardName%}-box bd-card-default-img">
                    <div class="{%$cardName%}-p {%$cardName%}-p-{%$item@index%}" data-relative="{%$cardName%}-p-{%$item@index%}"></div>
                </div>
            </div>
        {%/foreach%}
    </div>
    <script>
        A.init(function (require) {
            {%* // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰*%}
            var card = this;
            card.data = {
                ajaxUrl: '{%$tplData.ajaxUrl|escape:"javascript"%}'
            };

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



        });
    </script>
{%/strip%}{%/block%}

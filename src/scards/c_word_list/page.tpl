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
        a {
  display: inline-block;
  border: 1px solid #999;
  background-color: #fff;
  padding: 3px 5px;
  margin-left: 10px;
  height: 20px;
  line-height: 20px;
}

    </style>
    <div class="{%$cardName%}">
        {%foreach $tplData.tags as $key=>$item%}
            <a class="tag" href="{%$item.url%}">{%$item.name%}</a>
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
    var common = require('common/widget/env');
    console.log(common);
    $('.tag').css('fontSize', '20px');
    $.ajax({
        url: '/scards/c_word_list/ajax.json',
        success: function (data) {

        }
    });
})();



        });
    </script>
{%/strip%}{%/block%}

{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-feedback"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        {%*include file="page.less"*%}
    </style>
    <div class="{%$cardName%}">
        <a class="{%$cardName%}-a" href="#" target="_blank">
            <span class="{%$cardName%}-ico">告诉我们你想要的</span>
        </a>
    </div>
    <script>
        A.init(function (require) {
            {%* // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰*%}
            var card = this;
            card.data = {
                ajaxUrl: '{%$tplData.ajaxUrl|escape:"javascript"%}'
            };

            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}

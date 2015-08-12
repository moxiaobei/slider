{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-download-tip"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        {%*include file="page.less"*%}
    </style>
    <div class="{%$cardName%}" id="{%$cardName%}">
        <p><i class="icon icon-camera"></i>下载手机百度，体验完美图像搜索体验！</p>
        <div class="close"><i class="icon icon-close"></i></div>
    </div>
    <script>
        A.init(function (require) {
            {%*
                // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰
            *%}
            var card = this;
            card.data = {
                ajaxUrl: '{%$tplData.ajaxUrl|escape:"javascript"%}'
            };

            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}

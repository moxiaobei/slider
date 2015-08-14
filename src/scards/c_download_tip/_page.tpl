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
        A.init(function () {
            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}

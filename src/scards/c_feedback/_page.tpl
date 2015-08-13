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
            <i class="icon icon-tip"></i>告诉我们你想要的
        </a>
    </div>
    <script>
        A.init(function (require) {
            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}

{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-invoke-edit"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        {%*include file="page.less"*%}
    </style>
    <div class="{%$cardName%} {%$cardName%}-btn" id="c-invoke-edit">
        <p><i class="icon icon-edit"></i>没找到结果？再次编辑框选图中其它内容</p>
        <div class="close"><i class="icon icon-close"></i></div>
    </div>
    <script>
        A.init(function (require) {
            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}

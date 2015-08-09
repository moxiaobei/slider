{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-invoke-edit"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        {%*include file="page.less"*%}
    </style>
    <div class="{%$cardName%} {%$cardName%}-btn">

        <div class="icon"><i></i></div>
        <p>没找到结果？再次编辑框选图中其它内容</p>
        <div class="close"><i></i></div>

    </div>
    <script>
        A.init(function (require) {
            {%*
                // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰
            *%}
            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}

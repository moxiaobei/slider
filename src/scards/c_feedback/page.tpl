/*eslint-disable*/
{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName="c-feedback"%}
    {%$titleflag=false%}
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-feedback .c-feedback-a{display:block;width:100%;height:45px;line-height:45px;background-image:linear-gradient(to bottom, #f3f3f3, #e5e5e5);background-repeat:repeat;color:#4c4c4c;text-decoration:none;border:1px solid #ccc;text-align:center;font-size:14px;font-size:0.875rem}.result-c-feedback .c-feedback-a:hover{color:#4c4c4c;text-decoration:none}.result-c-feedback .c-feedback-a i{color:#666;padding-right:10px;font-size:15px}
    </style>
    <div class="{%$cardName%}">
        <a class="{%$cardName%}-a" href="#" target="_blank">
            <i class="icon icon-tip"></i>告诉我们你想要的
        </a>
    </div>
    <script>
        A.init(function (require) {
            {%* // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰*%}

        });
    </script>
{%/strip%}{%/block%}

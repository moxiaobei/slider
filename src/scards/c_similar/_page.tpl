{%extends file="../c_base.tpl"%}


{%block name="title"%}
    相似图片
{%block%}

{%block name="content"%}{%strip%}
    <style>
        {%include file="page.less"%}
    </style>
    <div class="c-similar">
            
    </div>
    <script>
        {%include file="page.js"%}
    </script>
{%/strip%}{%/block%}

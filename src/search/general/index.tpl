{%extends file="../common/base.tpl"%}

{%block name="style" append%}
    <link rel="stylesheet" href="{%$feRoot%}/src/search/general/index.css?v={edp-variable:version}"/>
{%/block%}

{%block name="content" append%}
{%strip%}
    {%*************** scards卡片代码 *****************%}
    <div id="results">
        {%$tplData.html|escape:none%}
    </div>

    {%*************** 反馈 *****************%}
    {%include file="common/widget/feedback/feedback.tpl"%}
{%/strip%}
{%/block%}

{%block name="js" append%}
<script>
    require(['search/general/index'], function (search) {
        search.init();
    });
</script>
{%/block%}

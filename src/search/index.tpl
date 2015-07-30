{%extends file="../common/master.tpl"%}

{%block name="style"%}
    <link rel="stylesheet" href="{%$feRoot%}/src/search/index.css?v={edp-variable:version}"/>
{%/block%}

{%block name="main"%}
{%strip%}
    <script>{%include file="./widget/alaEnv.js"%}</script>
    <div id="results">
        {%$tplData.html|escape:none%}
    </div>
{%/strip%}
{%/block%}

{%block name="js"%}
<script>
    require(['search/index'], function (search) {
        search.start();
    });
</script>
{%/block%}
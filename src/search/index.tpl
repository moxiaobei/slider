{%extends file="../common/master.tpl"%}

{%block name="style"%}
    <link rel="stylesheet" href="{%$feRoot%}/src/search/index.css?v={edp-variable:version}"/>
{%/block%}

{%block name="head_js"%}
    {%*************** 提前加载zepto，并且暴露了$变量，供后续的代码使用 *****************%}
    <script src="{%$feRoot%}/src/common/lib/zepto.js"></script>

    {%*************** 在此保存搜索图片信息 base64或图片src *****************%}
    <script>
        window._t_base64 = '{%$tplData.imgData|escape:"javascript"%}';

        {%if !empty($tplData.imgSrc)%}
        window._t_url = '{%$tplData.imgSrc|escape:"javascript"%}';;
        {%/if%}
    </script>

    {%*************** 搜索结果页的通用初始化，如检测当前系统并添加标识到html标签 *****************%}
    <script>{%include file="./js/initenv.js"%}</script>

    {%*************** 搜索结果页的卡片环境的初始化，为卡片的js提供运行环境 *****************%}
    <script>{%include file="./js/scardenv.js"%}</script>
{%/block%}

{%block name="main"%}
{%strip%}
    {%*************** 保存结果页的类型 *****************%}
    <input type="hidden" id="imageSearchType" value="{%$tplData.imageSearch_type|escape:'html'%}"/>

    {%*************** wise搜索框代码 *****************%}
    {%if $tplData.resultEnv eq 'wise'%}
    <div class="#search-box">
        <form data-formposition="i" class="se-form" id="index-form" action="http://m.baidu.com/s" method="get" autocomplete="off">
            <div class="con-wrap">
                <textarea autocomplete="off" autocorrect="off" maxlength="64" id="index-kw" name="word" class="se-input adjust-input" data-sug="1"></textarea>
                <div class="se-inner">

                    <button id="index-bn" class="se-bn" type="submit">百度一下</button>
                </div>
            </div>
            <input type="hidden" name="ts" value="0">
            <input type="hidden" name="t_kt" value="0">
            <input type="hidden" name="sa" value="ib">
            <input type="hidden" name="ms" value="1">
        </form>
    </div>
    {%/if%}

    {%*************** scards卡片代码 *****************%}
    <div id="results" style="height:1000px">
        {%$tplData.html|escape:none%}
    </div>

    {%*************** 版权信息 *****************%}
    <div class="copyright">Copyright © 2015 BAIDU Corporation.</div>
{%/strip%}
{%/block%}

{%block name="js"%}
<script>
    require(['search/index'], function (search) {
        search.start();
    });
</script>
{%/block%}

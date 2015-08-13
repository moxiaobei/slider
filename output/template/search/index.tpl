{%extends file="../common/master.tpl"%}

{%block name="style"%}
    <link rel="stylesheet" href="{%$feRoot|escape:html%}/asset/search/index.css?v=20150813"/>
{%/block%}

{%block name="head_js"%}
    {%*************** 提前加载zepto，并且暴露了$变量，供后续的代码使用 *****************%}
    <script src="{%$feRoot|escape:html%}/asset/common/lib/zepto.js"></script>

    {%*************** 在此保存搜索图片信息 base64或图片src *****************%}
    <script>
        // 该处目前为了兼容老代码
        window._t_base64 = '{%$tplData.imgData|escape:"javascript"%}';

        {%if !empty($tplData.imgSrc)%}
        window._t_url = '{%$tplData.imgSrc|escape:"javascript"%}';

        define('common/conf', {
            searchEnv: '{%$tplData.searchEnv|escape:javascript%}',
            imageSearchType: '{%$tplData.imageSearchType|escape:javascript%}',
            sign: '{%$tplData.sign|escape:javascript%}',
            imgData: window._t_base64,
            imgUrl: window._t_url
        });

        {%/if%}
    </script>

    {%*************** 搜索结果页的通用初始化，如检测当前系统并添加标识到html标签 *****************%}
    <script>!function(){function addClass(el,className){classListExist?el.classList.add(className):el.className+=" "+className+" "}function flexInit(){var flexSupport=!1,flexOldSupport=!1;detector.style.display="flex",flexSupport="flex"===detector.style.display,detector.style.display="-webkit-flex",flexSupport=flexSupport||"-webkit-flex"===detector.style.display,detector.style.display="-webkit-box",flexOldSupport="-webkit-box"===detector.style.display;var className;className=flexSupport?"flex-support":flexOldSupport?"flex-old-support":"flex-no-support",addClass(document.documentElement,className)}function osInit(){var className,ua=navigator.userAgent,ios=ua.match(/(iPad|iPod|iPhone).*OS\s([\d_]+)/),android=ua.match(/(Android);?[\s\/]+([\d.]+)?/);className=ios?"os-ios":android?"os-android":"os-other",addClass(document.documentElement,className)}var detector=document.createElement("detector"),classListExist=detector.classList;flexInit(),osInit()}();</script>

    {%*************** 搜索结果页的卡片环境的初始化，为卡片的js提供运行环境 *****************%}
    <script>!function(){var funcs=[],e={data:{}};e.init=e.setup=function(a){"function"==typeof a&&funcs.push(a)},define("search/js/initscardenv",function(require,exports){return exports=function(){for(var i=0;i<=funcs.length-1;i++){var fn=funcs[i],context={};fn.call(context,require),fn=null}funcs=[]}}),window.A=e}();</script>
{%/block%}

{%block name="main"%}
{%strip%}
    {%*************** 保存结果页的类型 *****************%}
    <input type="hidden" id="imageSearchType" value="{%$tplData.imageSearchType|escape:'html'%}"/>

    {%*************** wise搜索框代码 *****************%}
    {%if $tplData.searchEnv eq 'wise'%}
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
    <div id="results">
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

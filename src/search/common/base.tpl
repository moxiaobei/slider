{%extends file="../../common/master.tpl"%}

{%block name="head_js" append%}
    {%*************** 提前加载zepto，并且暴露了$变量，供后续的代码使用 *****************%}
    <script src="{%$feRoot%}/src/common/lib/zepto.js"></script>

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
    <script>{%include file="../../common/ui/initenv.js"%}</script>

    {%*************** 搜索结果页的卡片环境的初始化，为卡片的js提供运行环境 *****************%}
    <script>{%include file="./js/initscardenv.js"%}</script>
{%/block%}

{%block name="main" append%}
{%strip%}
    {%*************** 保存结果页的类型 *****************%}
    <input type="hidden" id="imageSearchType" value="{%$tplData.imageSearchType|escape:'html'%}"/>

    {%*************** wise搜索框代码 *****************%}
    {%if $tplData.searchEnv eq 'wise'%}
    <div id="search-box">
        <form data-formposition="i" class="se-form" id="index-form" action="http://m.baidu.com/s" method="get" autocomplete="off">
            <div class="con-wrap">
                <input autocomplete="off" autocorrect="off" maxlength="64" id="index-kw" name="word" class="se-input adjust-input"/>
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

    {%if $tplData.noresult%}
    <div class="noresult">
        <div class="noresult-center">
            <div class="noresult-msg">
                <div class="noresult-img"></div>
                <div>抱歉</div>
                <div>没有在{%$tplData.imageSearchTypeName|escape:'html'%}类里</div>
                <div>找到此图片相关信息</div>
            </div>
            <div class="noresult-tip">
                <div>建议</div>
                <div class="noresult-tip-item">尽量保证图片清晰</div>
                <div class="noresult-tip-item">尽量使用目标物体正面</div>
                <div class="noresult-tip-item">保证主体面积占画面70%以上</div>
            </div>
        </div>
    </div>

    {%else%}
        {%block name="content"%}{%/block%}
        {%*************** 版权信息 *****************%}
        <div class="copyright">Copyright © 2015 BAIDU Corporation.</div>
    {%/if%}


{%/strip%}
{%/block%}

{%block name="js" append%}

{%* 该模块构建后将会打包common/ui/* common/lib/**等模块，在此完全加载，避免后续模块单独加载已打包模块 *%}
<script src="{%$feRoot%}/src/search/common/base.js"></script>
<script>
    require(['search/common/base'], function (base) {
        base.init();
    });
</script>
{%/block%}

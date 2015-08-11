{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName = "c-word-list"%}
{%/block%}

{%block name="title"%}
    相似图片
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        {%*include file="page.less"*%}
    </style>
    <div class="{%$cardName%}">
        {%foreach $tplData.words as $key=>$item%}
            {%$order = $item@index + 1%}
            <div class="{%$cardName%}-item flex flex--justify">
                <div class="{%$cardName%}-box {%$cardName%}-char" data-in-view="t:keyword_{%$item.type%},o:{%$tplData.order%}">
                {%$url = "/bdbox/gsword/word/"|cat:urlencode($item.keyword)|cat:"/"%}
                {%$redirectType = "bdbox_bingo_keyword_"|cat:$item.type%}

                {%$redirectUrl = "/api/proxy/redirect?u="|cat:urlencode($url)|cat:"&fr="|cat:urlencode($redirectType)|cat:"&o="|cat:urlencode($tplData.order) %}
                    <a class="{%$cardName%}-el" href="{%$redirectUrl%}">
                        <div class="center-box"> <b class="center-hack"></b>
                            <div class="center-body {%$cardName%}-s" data-for="{%$cardName%}-p-{%$item@index%}">{%$item.keyword|truncate:18:"...":true%}</div>
                        </div>
                    </a>
                </div>
                <div class="{%$cardName%}-box bd-card-default-img">
                    <div class="{%$cardName%}-p {%$cardName%}-p-{%$item@index%}" data-relative="{%$cardName%}-p-{%$item@index%}"></div>
                </div>
                <div class="{%$cardName%}-box bd-card-default-img">
                    <div class="{%$cardName%}-p {%$cardName%}-p-{%$item@index%}" data-relative="{%$cardName%}-p-{%$item@index%}"></div>
                </div>
                <div class="{%$cardName%}-box bd-card-default-img">
                    <div class="{%$cardName%}-p {%$cardName%}-p-{%$item@index%}" data-relative="{%$cardName%}-p-{%$item@index%}"></div>
                </div>
            </div>
        {%/foreach%}
    </div>
    <script>
        A.init(function (require) {
            {%* // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰*%}
            var card = this;
            card.data = {
                ajaxUrl: '{%$tplData.ajaxUrl|escape:"javascript"%}'
            };

            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}

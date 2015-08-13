{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName = "c-word-list"%}
{%/block%}

{%block name="title"%}
    你的图片可能是
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .result-c-word-list .c-word-list-item{padding:10px;border-top:1px solid #f5f5f5}.result-c-word-list .c-word-list-item:first-child{border-top:none}.result-c-word-list .c-word-list-box{width:22%;position:relative;padding-bottom:22%}.result-c-word-list .c-word-list-char{border:1px solid #92b9f8;background:#e8f4ff}.result-c-word-list .c-word-list-char .center-box{letter-spacing:-5px;font-size:0;height:100%}.result-c-word-list .c-word-list-char .center-box .center-hack{display:inline-block;font-size:0;width:0;height:100%;vertical-align:middle}.result-c-word-list .c-word-list-char .center-box .center-body{letter-spacing:normal;word-spacing:normal;display:inline-block;font-size:12px;vertical-align:middle;padding:0 !important;margin:0 !important;width:100%;white-space:normal;word-wrap:break-word}.result-c-word-list .c-word-list-img{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAGXRFW…FnZVJlYWR5ccllPAAAABRJREFUCNdj+IEEGID4HRhg48ABAK1ALgnwLRxbAAAAAElFTkSuQmCC) repeat}.result-c-word-list .c-word-list-p{position:absolute;left:0;right:0;top:0;bottom:0;background:no-repeat;background-position:center;background-size:cover}.result-c-word-list .c-word-list-el{position:absolute;color:#00c;top:0;left:0;bottom:0;right:0;padding:3px;text-align:center;overflow:hidden;display:block}.result-c-word-list .c-word-list-el .center-box .center-body{font-size:14px}
    </style>
    <div class="{%$cardName|escape:html%}">
        {%foreach $tplData.words as $key=>$item%}
            {%$order = $item@index + 1%}
            <div class="{%$cardName|escape:html%}-item flex flex-justify">
                <div class="{%$cardName|escape:html%}-box {%$cardName|escape:html%}-char" data-in-view="t:keyword_{%$item.type|escape:html%},o:{%$tplData.order|escape:html%}">
                {%$url = "/bdbox/gsword/word/"|cat:urlencode($item.keyword)|cat:"/"%}
                {%$redirectType = "bdbox_bingo_keyword_"|cat:$item.type%}

                {%$redirectUrl = "/api/proxy/redirect?u="|cat:urlencode($url)|cat:"&fr="|cat:urlencode($redirectType)|cat:"&o="|cat:urlencode($tplData.order) %}
                    <a class="{%$cardName|escape:html%}-el" href="{%$redirectUrl|escape:html%}">
                        <div class="center-box"> <b class="center-hack"></b>
                            <div class="center-body {%$cardName|escape:html%}-s" data-for="{%$cardName|escape:html%}-p-{%$item@index|escape:html%}">{%$item.keyword|truncate:18:"...":true|escape:html%}</div>
                        </div>
                    </a>
                </div>
                <div class="{%$cardName|escape:html%}-box bd-card-default-img">
                    <div class="{%$cardName|escape:html%}-p {%$cardName|escape:html%}-p-{%$item@index|escape:html%}" data-relative="{%$cardName|escape:html%}-p-{%$item@index|escape:html%}"></div>
                </div>
                <div class="{%$cardName|escape:html%}-box bd-card-default-img">
                    <div class="{%$cardName|escape:html%}-p {%$cardName|escape:html%}-p-{%$item@index|escape:html%}" data-relative="{%$cardName|escape:html%}-p-{%$item@index|escape:html%}"></div>
                </div>
                <div class="{%$cardName|escape:html%}-box bd-card-default-img">
                    <div class="{%$cardName|escape:html%}-p {%$cardName|escape:html%}-p-{%$item@index|escape:html%}" data-relative="{%$cardName|escape:html%}-p-{%$item@index|escape:html%}"></div>
                </div>
            </div>
        {%/foreach%}
    </div>
    <script>
        A.init(function (require) {
            !function(){function getKeywords(needRetry){for(var wordClass="c-word-list-s",wordEls=document.getElementsByClassName(wordClass),words=[],wordsMap={},trim=function(){if("".trim)return function(str){return str.trim()};var reg=/^\s+|\s+$/g;return function(str){return str.replace(reg,"")}}(),i=0,n=wordEls.length;n>i;i++){var wd=trim(wordEls[i].innerHTML);words.push(wd),wordsMap[wd]={cls:$(wordEls[i]).data("for")}}if(0!==words.length){var keyword=words.join(","),url="/sims";$.ajax({type:"GET",url:url,data:{keywords:keyword,offset:0,limit:3},dataType:"json",timeout:4e3,success:function(res){var data=res.data;for(var k in data)if(data.hasOwnProperty(k)){var item=data[k],wd=trim(k);if(!wordsMap[wd].cls)continue;for(var els=document.getElementsByClassName(wordsMap[wd].cls),i=0,n=Math.min(els.length,3,item.list.length);n>i;i++){var el=els[i],src=item.list[i].url;el.style.backgroundImage="url("+src+")",$(el).data("src",src)}}},error:function(){needRetry&&getKeywords(!1)}})}}var $=require("zepto");getKeywords(!0),require(["common/widget/slider/slider"],function(slider){function guessBigImgOnclick(ev){ev.preventDefault();var that=this;slider.fetchList(that),slider.show(that)}for(var list=document.getElementsByClassName("c-word-list-p"),i=0,n=list.length;n>i;i++){var item=list[i];item.onclick=guessBigImgOnclick}})}();

        });
    </script>
{%/strip%}{%/block%}

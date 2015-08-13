{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName = "c-similar"%}
{%/block%}

{%block name="title"%}
    相似图
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .c-similar .waterfall-container{position:relative;margin-bottom:10px}.c-similar .waterfall-container ul{width:100%}.c-similar .waterfall-container li{list-style:none;float:left;width:46.5%}.c-similar .waterfall-container .col-1{margin:20px 1.5% 0 2%}.c-similar .waterfall-container .col-2{margin:20px 2% 0 1.5%}.c-similar .waterfall-container .waterfall-img{width:100%;font-size:0;margin-bottom:5px;background-color:#f0f0f0}.c-similar .waterfall-container .waterfall-img img{width:100%}.c-similar .waterfall-container a{display:block}.c-similar .waterfall-container .waterfall-loading{display:none;color:#999;padding:25px 0;font-size:1rem;text-align:center;margin-bottom:0}.c-similar .waterfall-container .waterfall-loading i{display:inline-block;width:19px;height:19px;background-image:url(/src/scards/c_similar/img/loading.png);background-repeat:no-repeat;background-size:100%;vertical-align:text-bottom;-webkit-animation:rotate 1s infinite linear;-o-animation:rotate 1s infinite linear;-moz-animation:rotate 1s infinite linear;animation:rotate 1s infinite linear}.c-similar .clearfix:after{display:block;font-size:0;content:"";clear:both;height:0}.iframe-wrapper{position:absolute;top:0;right:0;bottom:0;left:0;z-index:100;-webkit-overflow-scrolling:touch;overflow-y:auto}@-moz-keyframes rotate{0%{-moz-transform:rotateZ(0deg)}50%{-moz-transform:rotateZ(180deg)}100%{-moz-transform:rotateZ(360deg)}}@-webkit-keyframes rotate{0%{-webkit-transform:rotateZ(0deg)}50%{-web-kittransform:rotateZ(180deg)}100%{-webkit-transform:rotateZ(360deg)}}@-o-keyframes rotate{0%{-o-transform:rotateZ(0deg)}50%{-o-transform:rotateZ(180deg)}100%{-o-transform:rotateZ(360deg)}}@keyframes rotate{0%{transform:rotateZ(0deg)}50%{transform:rotateZ(180deg)}100%{transform:rotateZ(360deg)}}
    </style>
    <div class="{%$cardName|escape:html%}">
        <div class="waterfall-container" id="waterfall">
            <ul class="clearfix">
                <li class="col-1">
                    <!--div class="waterfall-img">
                        <a href=""><img src="http://static.zhulong.com/database/news/2014/03/14/187078235.jpg"/></a>
                    </div-->
                </li>
                <li class="col-2">
                </li>
            </ul>
            <div class="waterfall-loading"><i></i>&nbsp;正在加载,请稍后</div>
        </div>
    </div>

    <script>

        A.init(function (require) {
            {%*
                // 把当前卡片所需要的业务数据全部挂载到 card.data 上，保持当前作用域内的变量清晰
            *%}
            var simAjaxUrl = '{%$tplData.simAjaxUrl|escape:"javascript"%}';
            require(["common/widget/Waterfall"],function(waterfall){var wf=new waterfall;wf.init({idName:"waterfall",ajaxUrl:simAjaxUrl,containerId:"viewport"}),wf.getImages()});
        });
    </script>
{%/strip%}{%/block%}


{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName = "c-similar"%}
{%/block%}

{%block name="title"%}
    相似图
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        {%*include file="page.less"*%}
    </style>
    <div class="{%$cardName%}">
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
            {%*include file="page.js"*%}
        });
    </script>
{%/strip%}{%/block%}


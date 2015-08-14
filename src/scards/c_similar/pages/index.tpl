{%extends file="../../../common/master.tpl"%}
{%block name="style"%}
    <link rel="stylesheet" href="{%$feRoot%}/src/scards/c_similar/pages/index.css?v={edp-variable:version}"/>
{%/block%}
{%block name="main"%}
{%strip%}
    <div class="slider-container">
        <div class="slider-section" id="iSlider">
            <ul class="slider-list clearfix" id="iSlider">
                <li class="slider-img">
                </li>
            </ul>
        </div>
        <div class="slider-introduction clearfix">
            <p class="introduction-title"></p>
            <p class="introduction-content"></p>
            <a class="introduction-link" href=""></a>
            <a class="buttons recognition" href=""><i></i><span>识图</span></a>
            <a class="buttons download" href=""><i></i><span>下载</span></a>
        </div>
        <div class="slider-waterfall" id="sugguestion-waterfall">
            <p>推荐给你的图片</p>
            <ul class="clearfix">
                <li class="col-1">
                    <!--div class="waterfall-img">
                        <a href=""><img src="http://static.zhulong.com/database/news/2014/03/14/187078235.jpg"/></a>
                    </div-->
                </li>
                <li class="col-2">
                </li>
            </ul>
            <div class="waterfall-loading">
                <i></i>&nbsp;正在加载,请稍后
            </div>
        </div>
    </div>
{%/strip%}
{%/block%}

{%block name='js'%}

<script>

    define('common/data', {
        imgsInfo: {%json_encode($tplData.images)%}
    });


    require(['scards/c_similar/pages/index'], function(index){
        index.start();
    });
</script>
{%/block%}
/*eslint-disable*/
{%extends file="../c_base.tpl"%}

{%block name="data_modifier"%}
    {%$cardName = "c-similar"%}
{%/block%}

{%block name="title"%}
    相似图
{%/block%}

{%block name="content"%}{%strip%}
    <style>
        .c-similar .waterfall-container {
  position: relative;
}
.c-similar .waterfall-container ul {
  width: 100%;
}
.c-similar .waterfall-container li {
  list-style: none;
  float: left;
  width: 46.5%;
}
.c-similar .waterfall-container .col-1 {
  margin: 20px 1.5% 0 2%;
}
.c-similar .waterfall-container .col-2 {
  margin: 20px 2% 0 1.5%;
}
.c-similar .waterfall-container .waterfall-img {
  width: 100%;
  font-size: 0;
  margin-bottom: 5px;
  background-color: #F0F0F0;
}
.c-similar .waterfall-container .waterfall-img img {
  width: 100%;
}
.c-similar .waterfall-container a {
  display: block;
}
.c-similar .waterfall-container .waterfall-loading {
  display: none;
  color: #999;
  padding: 25px 0;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 0;
}
.c-similar .waterfall-container .waterfall-loading i {
  display: inline-block;
  width: 19px;
  height: 19px;
  background-image: url(/src/scards/c_similar/img/loading.png);
  background-repeat: no-repeat;
  background-size: 100%;
  vertical-align: text-bottom;
  -webkit-animation: rotate 1s infinite linear;
  animation: rotate 1s infinite linear;
}
.c-similar .clearfix:after {
  display: block;
  font-size: 0;
  content: "";
  clear: both;
  height: 0;
}
@-moz-keyframes rotate {
  /* Firefox */
  0% {
    -moz-transform: rotateZ(0deg);
  }
  50% {
    -moz-transform: rotateZ(180deg);
  }
  100% {
    -moz-transform: rotateZ(360deg);
  }
}
@-webkit-keyframes rotate {
  /* Safari Chrome */
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  50% {
    -web-kittransform: rotateZ(180deg);
  }
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
@-o-keyframes rotate {
  /* Opera */
  0% {
    -o-transform: rotateZ(0deg);
  }
  50% {
    -o-transform: rotateZ(180deg);
  }
  100% {
    -o-transform: rotateZ(360deg);
  }
}
@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

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

            /**
* @file Waterfall瀑布流
* @author Dong Hualei(donghualei@baidu.com)
* @date 2015-8-4
*/



var $ = require('zepto');

/*
    瀑布流构造函数
*/

function WaterFall () {

    this.lis = null;

    this.pages = 1;

    this.imgWidth = 0;

    this.flag = false;

    this.loading = null;
}

/*
    瀑布流初始化
*/
WaterFall.prototype.init = function (option) {

    this.lis = $('#' + option.idName + ' li');

    this.imgWidth = this.lis.eq(0).width();

    this.listenScroll();

    this.loading = $('#' + option.idName + ' .waterfall-loading');

    this.loading.css('display', 'block');
    
};

/*
    监听window的scroll事件
*/

WaterFall.prototype.listenScroll = function () {

    var thisWaterFall = this;

    $(window).on('scroll',function (e, from, to) {
        
        var liIndex = thisWaterFall.getShortLi();

        var oLi = thisWaterFall.lis.eq(liIndex);

        if($(window).scrollTop() + $(window).height() > oLi.height() + oLi.offset().top) {

            if(thisWaterFall.flag === true) {

                thisWaterFall.flag = false;

                thisWaterFall.pages++;

                thisWaterFall.getImages();
            }
        }

    });
};


/*
    ajax获取图片加载数据
*/
WaterFall.prototype.getImages = function () {

    var thisWaterFall = this;

    this.loading.css('display', 'block');

    $.ajax({
        type: 'GET',

        url: 'http://www.wookmark.com/api/json/popular?page=' + thisWaterFall.pages,

        dataType: 'jsonp',

        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                var liIndex = thisWaterFall.getShortLi();

                var img = $('<img />');

                img.attr('src', data[i].image);

                var aTag = $('<a></a>');

                aTag.attr('href', data[i].referer);

                aTag.append(img);

                var divTag = $('<div></div>');

                divTag.addClass('waterfall-img');

                divTag.css({
                    height: Math.ceil(data[i].height * thisWaterFall.imgWidth/data[i].width)
                });

                divTag.append(aTag);

                thisWaterFall.lis.eq(liIndex).append(divTag);
            }

            thisWaterFall.loading.css('display', 'none');

            thisWaterFall.flag = true;
            
        },
        error: function() {
            alert('error');
        }


    });

    function isImageLoad (data, callback) {

        var arr = [];

        var sum = data.length;

        for (var i = 0; i < data.length; i++) {

            arr[i] = new Image();

            arr[i].src = data[i].image;

            arr[i].onload = function () {

                sum--;

                if(sum==0) {

                    callback(arr);
                }
            }
        }

    };
};

/*
    获取两列中最短的一列，以便于把图片添加到那一列
*/

WaterFall.prototype.getShortLi = function () {

    var minHeight = Number.MAX_VALUE;

    var minHeightIndex = -1;

    for (var i = 0; i < this.lis.size(); i++) {

        var h = this.lis.eq(i).height();

        if (h < minHeight) {

            minHeight = h;

            minHeightIndex = i;
        }
    }

    return minHeightIndex;
};
            
            var wf = new WaterFall();

            wf.init({
                idName: 'waterfall'
            });

            wf.getImages();
        });
    </script>
{%/strip%}{%/block%}


/**
* @file Waterfall瀑布流
* @author Dong Hualei(donghualei@baidu.com)
* @date 2015-8-4
*/


define(function (require) {

    var $ = require('zepto');

    var env = require('common/widget/env');

    /*
        瀑布流构造函数
    */

    function WaterFall () {

        this.lis = null;

        this.pages = 1;

        this.imgWidth = 0;

        this.flag = false;

        this.loading = null;

        this.done = null;

        this.ajaxUrl = "";

        this.maxPages = 0;

        this.container = null;
    }

    /*
        瀑布流初始化
    */
    WaterFall.prototype.init = function (option) {

        this.lis = $('#' + option.idName + ' li');

        this.ajaxUrl = option.ajaxUrl;

        this.maxPages = option.maxPages;

        this.imgWidth = this.lis.eq(0).width();

        this.listenScroll();

        this.loading = $('#' + option.idName + ' .waterfall-loading');

        this.loading.css('display', 'block');

        this.container = $('#' + option.containerId);
        
    };

    /*
        监听window的scroll事件
    */

    WaterFall.prototype.listenScroll = function () {

        var thisWaterFall = this;

        $(window).on('scroll', scroll);

        function scroll(e) {
            
            var liIndex = thisWaterFall.getShortLi();

            var oLi = thisWaterFall.lis.eq(liIndex);

            if($(window).scrollTop() + $(window).height() > oLi.height() + oLi.offset().top) {

             //   alert(thisWaterFall.maxPages + "   " + thisWaterFall.pages);

                if(thisWaterFall.flag === true && thisWaterFall.pages < thisWaterFall.maxPages) {

                    thisWaterFall.flag = false;

                    thisWaterFall.pages++;

                    thisWaterFall.getImages();
                }

                else if(thisWaterFall.flag === true && thisWaterFall.pages === thisWaterFall.maxPages) {

                    $(window).off('scroll', scroll);
                }
            }
        }

    };


    /*
        ajax获取图片加载数据
    */
    WaterFall.prototype.getImages = function () {

        var thisWaterFall = this;

        this.loading.css('display', 'block');

        $.ajax({
            type: 'GET',

            url: this.ajaxUrl + '?page=' + thisWaterFall.pages,

            dataType: 'jsonp',

            success: function (data) {
                alert(data);

                for (var i = 0; i < data.length; i++) {

                    var liIndex = thisWaterFall.getShortLi();

                    var img = $('<img />');

                    img.attr('src', data[i].image);

                    var aTag = $('<a></a>');

                    aTag.attr('href', data[i].referer);

                    aTag.attr('target', '_blank');

                    aTag.append(img);

                    var src = data[i].referer;

                    if(env.os.ios) {
                        aTag.on('click', function (e) {
                            e.preventDefault();

                            //在iframe中打开结果页
                            var iframe = $('<iframe></iframe>');
                            iframe.css('width', '100%');
                            iframe.css('height','100%');
                            iframe.attr('src', $(this).attr('href'));
                            iframe.css('frameborder','0');

                            var iframeWrapper = $('<div></div>');
                            iframeWrapper.addClass('iframe-wrapper');
                            iframeWrapper.append(iframe);
                            $(document.body).append(iframeWrapper);
                            thisWaterFall.container.hide();
                            var scrollTop = $(document.body).scrollTop();
                            var pathname = $(this).attr('href').match(/http\:\/\/[\w\-\.\:]*([\/\-\w]*)/)[1];
                            history.pushState({},"相似图",pathname);

                            window.onpopstate = function(event) {
                                iframeWrapper.remove();
                                thisWaterFall.container.show();
                                $(document.body).scrollTop(scrollTop);
                            }
                        });
                    }

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

    return  WaterFall;
});

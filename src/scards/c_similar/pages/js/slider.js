/**
* @file 轮播
* @author Dong Hualei(donghualei@baidu.com)
* @date 2015-8-5
**/

define(function (require) {

    var $ = require('zepto');
    var waterfall = require('common/widget/Waterfall');

    function Slider () {
        this.screenWidth = 0;
        this.sliderSection = null;
        this.sliderUl = null;
        this.sliderLis = null;
        this.page = 1;
        this.imgsInfo = null;
        this.sugguestionImgLis = null;
        this.waterfallDone = null;
        this.ajax = null;
        this.recognition = null;
    }

    Slider.prototype.init = function (option) {

        this.sliderSection = $('.slider-section');

        this.sliderUl = $('.slider-section .slider-list');

        this.sliderLis = $('.slider-section .slider-img');

        this.sugguestionImgLis = $('#sugguestion-waterfall li');

        this.waterfallDone = $('.waterfall-done');

        this.introductionTitle = $('.slider-introduction .introduction-title');
        this.introductionTitle.html(option.imgsInfo[0].title);

        this.introductionContent = $('.slider-introduction .introduction-content');
        this.introductionContent.html(option.imgsInfo[0].introduction);

        this.introductionLink = $('.slider-introduction .introduction-link');
        this.introductionLink.html(option.imgsInfo[0].fromUrl);
        this.introductionLink.attr('href', option.imgsInfo[0].fromUrl);

        this.recognition = $('.slider-introduction .recognition');
        this.recognition.attr('href', option.imgsInfo[0].regzUrl);

        this.screenWidth = $(window).width();

        this.sliderLis.css('width', this.screenWidth);

        this.imgsInfo = option.imgsInfo;

        // 根据图片宽度来设置section的高度
        this.sliderSection.css('height', Math.ceil(this.screenWidth * option.imgsInfo[0].imageOriginHeight / option.imgsInfo[0].imageOriginWidth));

        //根据轮播的图片的数量设置ul的宽度
        this.sliderUl.css('width', option.imgsInfo.length * this.screenWidth);

        for(var i = 0; i < option.imgsInfo.length; i++) {

            var li = $('<li></li>');
            li.addClass('slider-img');
            li.css('width', this.screenWidth);
            var img = $('<img />');
            img.attr('src', option.imgsInfo[i].objUrl);
            img.css('width', this.screenWidth);
            li.append(img);
            this.sliderUl.append(li);
            li = null;
        }

        var wf = new waterfall();
        wf.init({
            idName: 'sugguestion-waterfall',
            ajaxUrl: option.imgsInfo[0].ajaxUrl,
            containerId: 'viewport'
        });
        this.ajax = wf.getImages();

        this.slide();

    };

    Slider.prototype.slide = function () {
        var thisSlide = this;

        var startPosition = 0;
        var startPosition = 0;
        var startTime = 0;
        var endPosition = 0;
        var endTime = 0;
        this.sliderUl.on('touchstart', function(e) {
            var touch = e.changedTouches[0];
            startPosition = touch.pageX;
            startTime = (new Date()).getTime();
            console.log(startPosition);
        });

        this.sliderUl.on('touchend', function(e) {
            var touch = e.changedTouches[0];
            endPosition = touch.pageX;
            endTime = (new Date()).getTime();
            console.log(endPosition);
            console.log(endTime - startTime);
            if((startPosition - endPosition) > 50 && (endTime - startTime) > 200 || (startPosition - endPosition) < 20 && (endTime - startTime) < 100) {
                leftMove();
            }
            else if ((endPosition - startPosition) > 50 && (endTime - startTime) > 200 || (endPosition - startPosition) < 20 && (endTime - startTime) < 100) {
                rightMove();
            }
        });

        function leftMove() {

            if(thisSlide.page < thisSlide.imgsInfo.length ) {

                thisSlide.introductionTitle.html(thisSlide.imgsInfo[thisSlide.page].title);

                thisSlide.introductionContent.html(thisSlide.imgsInfo[thisSlide.page].introduction);

                thisSlide.introductionLink.html(thisSlide.imgsInfo[thisSlide.page].fromUrl);

                thisSlide.sliderSection.css('height', Math.ceil(thisSlide.screenWidth * thisSlide.imgsInfo[thisSlide.page].imageOriginHeight / thisSlide.imgsInfo[thisSlide.page].imageOriginWidth));

                thisSlide.sugguestionImgLis.html('');
                thisSlide.waterfallDone.css('display','none');

                thisSlide.ajax.abort();


                $.ajax({
                    type: 'POST',
                    data: {
                        image: encodeURIComponent(thisSlide.imgsInfo[thisSlide.page].objUrl),
                        tn: 'wise'
                    },
                    url: '/upload',
                    dataType: 'json',
                    success: function(res) {
                        var data = res.data;
                        thisSlide.recognition.attr('href', data.regzUrl);

                        var wf = new waterfall();
                        wf.init({
                            idName: 'sugguestion-waterfall',
                            ajaxUrl: data.ajaxUrl
                        });
                        thisSlide.ajax = wf.getImages();
                    }
                });

                $(this).css('left', -thisSlide.screenWidth * thisSlide.page);

                thisSlide.page++;
            }

        }

        function rightMove() {

            if(thisSlide.page > 1) {

                thisSlide.page--;

                thisSlide.introductionTitle.html(thisSlide.imgsInfo[thisSlide.page - 1].title);

                thisSlide.introductionContent.html(thisSlide.imgsInfo[thisSlide.page - 1].introduction);

                thisSlide.introductionLink.html(thisSlide.imgsInfo[thisSlide.page - 1].fromUrl);

                thisSlide.sliderSection.css('height', Math.ceil(thisSlide.screenWidth * thisSlide.imgsInfo[thisSlide.page - 1].imageOriginHeight / thisSlide.imgsInfo[thisSlide.page - 1].imageOriginWidth));

                $(this).css('left', -thisSlide.screenWidth * (thisSlide.page - 1));

                 $.ajax({
                    type: 'POST',
                    data: {
                        image: encodeURIComponent(thisSlide.imgsInfo[thisSlide.page - 1].objUrl),
                        tn: 'wise'
                    },
                    url: '/upload',
                    success: function(res) {
                        var data = res.data;
                        thisSlide.recognition.attr('href', data.regzUrl);

                        var wf = new waterfall();
                        wf.init({
                            idName: 'sugguestion-waterfall',
                            ajaxUrl: data.ajaxUrl
                        });
                        thisSlide.ajax = wf.getImages();
                    }
                });

                thisSlide.sugguestionImgLis.html('');
                thisSlide.waterfallDone.css('display','none');

                thisSlide.ajax.abort();

            }

        }
    };

    return Slider;
});

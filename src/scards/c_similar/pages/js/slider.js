/**
* @file 轮播
* @author Dong Hualei(donghualei@baidu.com)
* @date 2015-8-5
**/

define(function (require) {

    var $ = require('zepto');
    var waterfall = require('common/widget/waterfall');

    function Slider () {
        this.screenWidth = 0;
        this.sliderSection = null;
        this.sliderUl = null;
        this.sliderLis = null;
        this.page = 1;
        this.imgsInfo = null;
        this.sugguestionImgLis = null;
        this.waterfallDone = null;
    }

    Slider.prototype.init = function (option) {

        this.sliderSection = $('.slider-section');

        this.sliderUl = $('.slider-section .slider-list');

        this.sliderLis = $('.slider-section .slider-img');

        this.sugguestionImgLis = $('#sugguestion-waterfall li');

        this.waterfallDone = $('.waterfall-done');

        this.introductionTitle = $('.slider-introduction .introduction-title');
        this.introductionTitle.html(option.imgsInfo[0].imgTitle);

        this.introductionContent = $('.slider-introduction .introduction-content');
        this.introductionContent.html(option.imgsInfo[0].imgIntroduction);

        this.introductionLink = $('.slider-introduction .introduction-link');
        this.introductionLink.html(option.imgsInfo[0].moreUrl);

        this.screenWidth = $(window).width();

        this.sliderLis.css('width', this.screenWidth);

        this.imgsInfo = option.imgsInfo;

        // 根据图片宽度来设置section的高度
        this.sliderSection.css('height', Math.ceil(this.screenWidth * option.imgsInfo[0].imgHeight / option.imgsInfo[0].imgWidth));

        //根据轮播的图片的数量设置ul的宽度
        this.sliderUl.css('width', option.imgsInfo.length * this.screenWidth);

        for(var i = 0; i < option.imgsInfo.length; i++) {

            var li = $('<li></li>');
            li.addClass('slider-img');
            li.css('width', this.screenWidth);
            var img = $('<img />');
            img.attr('src', option.imgsInfo[i].imgUrl);
            img.css('width', this.screenWidth);
            li.append(img);
            this.sliderUl.append(li);
            li = null;
        }

        

        this.slide();

    };

    Slider.prototype.slide = function () {
        var thisSlide = this;

        var startPosition = 0;

        this.sliderUl.on('touchmove',function (e) {
            e.preventDefault();
        });

        this.sliderUl.swipeLeft(function () {

            if(thisSlide.page < thisSlide.imgsInfo.length ) {

                thisSlide.introductionTitle.html(thisSlide.imgsInfo[thisSlide.page].imgTitle);

                thisSlide.introductionContent.html(thisSlide.imgsInfo[thisSlide.page].imgIntroduction);

                thisSlide.introductionLink.html(thisSlide.imgsInfo[thisSlide.page].moreUrl);

                thisSlide.sliderSection.css('height', Math.ceil(thisSlide.screenWidth * thisSlide.imgsInfo[thisSlide.page].imgHeight / thisSlide.imgsInfo[thisSlide.page].imgWidth));

                thisSlide.sugguestionImgLis.html('');
                thisSlide.waterfallDone.css('display','none');

                var wf = new waterfall();
                wf.init({
                    idName: 'sugguestion-waterfall',
                    ajaxUrl: thisSlide.imgsInfo[thisSlide.page].ajaxUrl,
                    maxPages: thisSlide.imgsInfo[thisSlide.page].maxPages
                });
                wf.getImages();

                $(this).css('left', -thisSlide.screenWidth * thisSlide.page);

                thisSlide.page++;
            }

        });

        this.sliderUl.swipeRight(function () {

            if(thisSlide.page > 1) {

                thisSlide.page--;

                thisSlide.introductionTitle.html(thisSlide.imgsInfo[thisSlide.page - 1].imgTitle);

                thisSlide.introductionContent.html(thisSlide.imgsInfo[thisSlide.page - 1].imgIntroduction);

                thisSlide.introductionLink.html(thisSlide.imgsInfo[thisSlide.page - 1].moreUrl);

                thisSlide.sliderSection.css('height', Math.ceil(thisSlide.screenWidth * thisSlide.imgsInfo[thisSlide.page - 1].imgHeight / thisSlide.imgsInfo[thisSlide.page - 1].imgWidth));

                $(this).css('left', -thisSlide.screenWidth * (thisSlide.page - 1));

                thisSlide.sugguestionImgLis.html('');
                thisSlide.waterfallDone.css('display','none');

                var wf = new waterfall();
                wf.init({
                    idName: 'sugguestion-waterfall',
                    ajaxUrl: thisSlide.imgsInfo[thisSlide.page - 1].ajaxUrl,
                    maxPages: thisSlide.imgsInfo[thisSlide.page - 1].maxPages
                });
                wf.getImages();
            }

        });
    };

    return Slider;
});
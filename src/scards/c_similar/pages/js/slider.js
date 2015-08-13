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

        this.screenWidth = $(window).width();

        this.sliderLis.css('width', this.screenWidth);

        this.imgsInfo = option.imgsInfo;

        // 根据图片宽度来设置section的高度
        this.sliderSection.css('height', Math.ceil(this.screenWidth * option.imgsInfo[0].thumbHeight / option.imgsInfo[0].thumbWidth));

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
            ajaxUrl: data.imgsInfo[0].ajaxUrl,
            containerId: 'viewport'
        });
        this.ajax = wf.getImages();

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

                thisSlide.introductionTitle.html(thisSlide.imgsInfo[thisSlide.page].title);

                thisSlide.introductionContent.html(thisSlide.imgsInfo[thisSlide.page].introduction);

                thisSlide.introductionLink.html(thisSlide.imgsInfo[thisSlide.page].fromUrl);

                thisSlide.sliderSection.css('height', Math.ceil(thisSlide.screenWidth * thisSlide.imgsInfo[thisSlide.page].thumbHeight / thisSlide.imgsInfo[thisSlide.page].thumbWidth));

                thisSlide.sugguestionImgLis.html('');
                thisSlide.waterfallDone.css('display','none');

                thisSlide.ajax.abort();

                var wf = new waterfall();
                wf.init({
                    idName: 'sugguestion-waterfall',
                    ajaxUrl: thisSlide.imgsInfo[thisSlide.page].ajaxUrl
                });
                thisSlide.ajax = wf.getImages();

                $(this).css('left', -thisSlide.screenWidth * thisSlide.page);

                thisSlide.page++;
            }

        });

        this.sliderUl.swipeRight(function () {

            if(thisSlide.page > 1) {

                thisSlide.page--;

                thisSlide.introductionTitle.html(thisSlide.imgsInfo[thisSlide.page - 1].title);

                thisSlide.introductionContent.html(thisSlide.imgsInfo[thisSlide.page - 1].introduction);

                thisSlide.introductionLink.html(thisSlide.imgsInfo[thisSlide.page - 1].fromUrl);

                thisSlide.sliderSection.css('height', Math.ceil(thisSlide.screenWidth * thisSlide.imgsInfo[thisSlide.page - 1].thumbHeight / thisSlide.imgsInfo[thisSlide.page - 1].thumbWidth));

                $(this).css('left', -thisSlide.screenWidth * (thisSlide.page - 1));

                thisSlide.sugguestionImgLis.html('');
                thisSlide.waterfallDone.css('display','none');

                thisSlide.ajax.abort();

                var wf = new waterfall();
                wf.init({
                    idName: 'sugguestion-waterfall',
                    ajaxUrl: thisSlide.imgsInfo[thisSlide.page - 1].ajaxUrl
                });
                thisSliide.ajax = wf.getImages();
            }

        });
    };

    return Slider;
});
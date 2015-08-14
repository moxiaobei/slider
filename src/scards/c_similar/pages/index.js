/**
 * @file
 * @author 
 *
 */
/*
define(function(require) {
    var waterfall = require('common/widget/Waterfall');
    var $ = require('zepto');

    var exports = {};

    var data = require('common/data');

    var list = [];
    for (var i = 0; i < data.imgsInfo.length; i++) {
        list[i] = {};
        list[i].content = '<div class="content"><img src="' + data.imgsInfo[i].objUrl + '" />' +
                         '<div class="slider-introduction clearfix">' +
                         '<p class="introduction-title">' + data.imgsInfo[i].title +'</p>' + 
                         '<p class="introduction-content">' + data.imgsInfo[i].introduction + '</p>' +
                            '<a class="introduction-link" href="'+ data.imgsInfo[i].fromUrl +'">' + data.imgsInfo[i].fromUrl + '</a>' +
                            '<a class="buttons recognition" href=""><i class="icon icon-camera"></i><span>识图</span></a>' +
                            '<a class="buttons download" href=""><i class="icon icon-camera"></i><span>下载</span></a>' +
                        '</div>' +
                        '<div class="slider-waterfall" id="sugguestion-waterfall">' +
                            '<p>推荐给你的图片</p>' + 
                            '<ul class="clearfix">' +
                                '<li class="col-1">' +
                                '</li>' +
                                '<li class="col-2">' +
                                '</li>' +
                            '</ul>' +
                        '<div class="waterfall-loading">' +
                            '<i></i>&nbsp;正在加载,请稍后' +
                        '</div></div>';

    }
    
    console.log($('#iSlider').css('height'));
    
    exports.start = function() {

      var islider = new iSlider({
        dom: document.getElementById("iSlider"),
        data: list,
        type: 'dom',
        isVertical: false,
        isLooping: false,
        isAutoplay: false,
        onslidestart: function() {
        },
        onslidechange: function() {
            
        }
      });

    };

    return exports;
});*/

define(function(require) {
    var waterfall = require('common/widget/Waterfall');
    var slider = require('./js/slider');
    var $ = require('zepto');
    var exports = {};

    var data = require('common/data');

    exports.start = function() {
       /* $.ajax({
            url: '/scards/c_similar/pages/imglist',
            success: function (data) {
                alert(data);
            }
        });*/

        var s = new slider();

        s.init({
            imgsInfo: data.imgsInfo,
            idName: 'sugguestion-waterfall'
        });
    };

    return exports;
});


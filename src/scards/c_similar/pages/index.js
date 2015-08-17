/**
* @file 落地页初始化
* @author Dong Hualei (donghualei@baidu.com)
* @date 2015-8-5
**/

define(function(require) {
    var waterfall = require('common/widget/Waterfall');
    var toast = require('common/widget/toast/toast');
    var slider = require('./js/slider');
    var $ = require('zepto');
    var exports = {};

    var data = require('common/data');

    exports.start = function() {

        var s = new slider();

        s.init({
            imgsInfo: data.imgsInfo,
            idName: 'sugguestion-waterfall'
        });

        $('.recognition').on('click', function () {
            window.top.location.href = $(this).attr('href');
            return false;
        });

        $('.download').on('click', function () {
            toast.makeText('请长按图片保存');
            return false;
        });

        $(document.body).append('<div id="backtop"></div>');
        var backtop = require('common/widget/backtop/backtop');
        $(window).on('touchmove', function() {

            if( $(window).scrollTop() > 100) {
                backtop.show();
            }
            else {
                backtop.hide();
            }

            $('#backtop').on('click', function() {
                $(window).scrollTop(0);
            });

        });
    };

    return exports;
});


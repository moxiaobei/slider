/**
* @file 落地页初始化
* @author Dong Hualei (donghualei@baidu.com)
* @date 2015-8-5
**/

define(function (require) {
    var toast = require('common/widget/toast/toast');
    var env = require('common/lib/env');
    var slider = require('./js/slider');
    var feedback = require('common/widget/feedback/feedback');
    var $ = require('zepto');
    var exports = {};

    var data = require('common/data');

    exports.start = function () {

        var s = new slider();

        s.init({
            imgsInfo: data.imgsInfo,
            idName: 'sugguestion-waterfall'
        });

        $('.recognition').on('click', function () {
            window.top.location.href = $(this).attr('href');
            return false;
        });

        $('.slider-list').on('click','img', function (e) {
            var $img = $(e.currentTarget);
            var doc = window.top.document;
            var html = [
                '<div class="imgpreview-container">',
                '  <div class="img-wrap">',
                '  <img src="' + $img.attr('src') + '">',
                '  </div>',
                '</div>'
            ].join('');
            $(doc).find('body').append(html);
            $preview = $(doc).find('.imgpreview-container');
            $preview.css('line-height', $(window.top).height() + 'px');
            $preview .one('click', function () {
                $preview.css('display', 'none');
                $preview.remove();
            });

            return false;
        });

        $('.download').on('click', function () {
            if (env.os.ios) {
                // var doc = window.top.document;
                // var html = [
                //     '<div class="imgsave-container">',
                //     '  <div  class="tip">请长按图片保存</div>',
                //     '  <div class="img-wrap">',
                //     '  <img src="' + $(this).attr('href') + '">',
                //     '  </div>',
                //     '</div>'
                // ].join('');
                // $(doc).find('body').append(html);
                // $(doc).find('.imgsave-container').one('click', function () {
                //     $(doc).find('.imgsave-container').css('display', 'none');
                //     $(doc).find('.imgsave-container').remove();
                // });
            }
            else {
                toast.makeText('请长按图片保存');
            }
            return false;
        });


        // feedback
        feedback.init();

    };

    return exports;
});


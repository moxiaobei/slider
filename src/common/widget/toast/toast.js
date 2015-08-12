/**
 * @file 提示框
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require, exports) {
    var $ = require('zepto');
    var toast = {
        /**
         * 默认样式
         */
        html: '<div class="toast-ld"><span class="toast-ld-pic"></span><span>正在加载...</span></div>',

        /**
         * 设置文本
         *
         * @param {string} msg    要显示的字符串
         * @param {number} duration 显示多长时间后隐藏
         * @description 不设置持续时间， loading 状态会一直存在
         */
        makeText: function (msg, duration) {
            var that = this;
            var tmpl = this.el.html();
            // var w = 0;
            duration = duration || 2000;

            this.el.html(msg);
            this.el.addClass('toast-ld-show toast-ld-txt');

            // 居中
            this.el.css('margin-left', ($('.toast-ld').width() / -2) + 'px');

            // 隐藏
            setTimeout(function () {
                that.el.removeClass('toast-ld-show toast-ld-txt');
                that.el.attr('style', '');
                that.el.html(tmpl);
            }, duration);
        },

        /**
         * 显示
         *
         * @param {number} duration 显示多长时间后隐藏
         * @description 不设置持续时间， loading 状态会一直存在
         */
        show: function (duration) {
            this.el.addClass('toast-ld-show');

            if (duration) {
                this.hide(duration);
            }
        },

        /**
         *
         * 隐藏
         *
         * @param {number} duration 显示多长时间后隐藏
         */
        hide: function (duration) {
            var that = this;
            duration = duration || 300;

            setTimeout(function () {
                that.el.removeClass('toast-ld-show');
            }, duration);
        },

        /**
         * 设置位置
         *
         * @param {string} pos center | bottom
         */
        setGravity: function (pos) {

        },

        /**
         * 初始化
         */
        initialize: function () {
            this.el = $(this.html);
            // console.log(this.el);
            this.el.appendTo('body');
        }
    };

    toast.initialize();

    return toast;
});


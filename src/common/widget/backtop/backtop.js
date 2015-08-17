/**
 * @file 回到顶部的图标需要包含backtop.less
 * @author donghualei(donghualei@baidu.com)
 */

 define(function (require) {
    var zepto = require('zepto');
    var $body = $(window.top.document.body);

    var backtop = {
        init: function (opt) {
            $body.append('<div class="backtop" id="' + opt.ele + '"></div>');
            this.ele = $body.find('#' + opt.ele);

            this.ele.on('click', function() {
                $(window).scrollTop(0);
            });
        },
        show: function() {
            this.ele.css('display', 'block');
        },
        hide: function() {
            this.ele.css('display', 'none');
        }
    };

    return backtop;
 });

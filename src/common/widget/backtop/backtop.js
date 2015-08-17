/**
 * @file 回到顶部的图标需要包含backtop.less
 * @author donghualei(donghualei@baidu.com)
 */

 define(function (require) {
    var zepto = require('zepto');
    var $body = $(window.top.document.body);
    // $body.append('<div id="backtop"></div>');

    var backtop = {
        idName: 'backtop',
        show: function(ele) {
            ele = ele || '#backtop';
            $body.find(ele).show();
        },
        hide: function(ele) {
            ele = ele || '#backtop';
            $body.find(ele).hide();
        }
    };

    return backtop;
 });
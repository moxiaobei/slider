/**
 * @file 回到顶部的图标需要包含backtop.less
 * @author donghualei(donghualei@baidu.com)
 */

 define(function (require) {
    var zepto = require('zepto');

    var backtop = {
        idName: 'backtop',
        show: function() {
            $('#'+this.idName).show();
        },
        hide: function() {
            $('#'+this.idName).hide();
        }
    };

    return backtop;
 });
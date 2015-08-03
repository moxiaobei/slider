/**
 * @file 图像搜索结果页的逻辑
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {
    var $ = require('zepto');
    var inviewStatic = require('common/widget/in-view');
    var initAladdinWise = require('./js/aladdin');
    var initScardenv = require('search/js/scardenv');

    var exports = {};


    /**
     * 搜索结果页模块的入口
     */
    exports.start = function () {
        inviewStatic();
        initAladdinWise();
        initScardenv();

        $.ajax({
            url: '/search/list',
            success: function (data) {

            }
        });
    };

    return exports;

});

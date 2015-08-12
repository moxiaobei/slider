/**
 * @file 图像搜索结果页的逻辑
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {
    var $ = require('zepto');
    var inviewStatic = require('common/widget/in-view');
    var initAladdinWise = require('./js/aladdin');
    var initScardenv = require('search/js/scardenv');
    var invoker = require('common/lib/invoker');

    var exports = {};


    /**
     * 搜索结果页模块的入口
     */
    exports.start = function () {
        inviewStatic();
        initAladdinWise();
        initScardenv();

        invoker.initSetQuery();

    };

    return exports;

});

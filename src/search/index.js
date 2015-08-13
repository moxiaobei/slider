/**
 * @file 图像搜索结果页的逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require, exports) {
    var inviewStatic = require('common/widget/in-view');
    var initAladdinWise = require('./js/aladdin');
    var initScardenv = require('search/js/initscardenv');
    var invoker = require('common/lib/invoker');

    /**
     * 搜索结果页模块的入口
     */
    exports.start = function () {
        // 初始化 普通卡片（即自主开发的卡片，如相似图等）
        // 并在此运行相关普通卡片的js代码
        initScardenv();

        // 初始化 特型卡片（如百科等）
        initAladdinWise();

        // 统计
        // 初始化in-view统计
        inviewStatic();

        // 在手百搜索框设置搜索图或query
        invoker.initSetQuery();
    };

    return exports;
});

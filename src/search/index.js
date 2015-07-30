/**
 * @file 图像搜索结果页的逻辑
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {

    var inviewStatic = require('common/widget/in-view');
    var initAladdinWise = require('./widget/aladdin');

    var exports = {};


    /**
     * 搜索结果页模块的入口
     */
    exports.start = function () {
        inviewStatic();
        initAladdinWise();
    };

    return exports;

});

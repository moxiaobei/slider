/**
 * @file 图像搜索结果页的逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require, exports) {
    var inviewStatic = require('common/widget/in-view');
    var invoker = require('common/lib/invoker');

    /**
     * 搜索结果页模块的入口
     */
    exports.init = function () {
        // 统计
        // 初始化in-view统计
        inviewStatic();

        // 在手百搜索框设置搜索图或query
        invoker.initSetQuery();
    };

    return exports;
});

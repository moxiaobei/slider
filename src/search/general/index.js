/**
 * @file 图像搜索结果页的逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require, exports) {
    var initAladdinWise = require('../common/js/aladdin');
    var feedback = require('common/widget/feedback/feedback');

    /**
     * 搜索结果页模块的入口
     */
    exports.init = function () {
        // 初始化 特型卡片（如百科等）
        initAladdinWise();

        // feedback
        feedback.init();
    };

    return exports;
});

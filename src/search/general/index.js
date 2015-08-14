/**
 * @file 图像搜索结果页的逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require, exports) {
    var initAladdinWise = require('../common/js/aladdin');
    var initScardenv = require('../common/js/initscardenv');
    var feedback = require('common/widget/feedback/feedback');

    /**
     * 搜索结果页模块的入口
     */
    exports.init = function () {
        // 初始化 普通卡片（即自主开发的卡片，如相似图等）
        // 并在此运行相关普通卡片的js代码
        initScardenv();

        // 初始化 特型卡片（如百科等）
        initAladdinWise();

        // feedback
        feedback.init();
    };

    return exports;
});

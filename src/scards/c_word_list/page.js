/**
 * @file 相似图卡片逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

/* global A */
(function () {
    var $ = require('zepto');
    var common = require('common/widget/env');
    console.log(common);
    $('.tag').css('fontSize', '20px');
    $.ajax({
        url: '/scards/c_word_list/ajax.json',
        success: function (data) {

        }
    });
})();



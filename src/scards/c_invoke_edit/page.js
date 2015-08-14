/**
 * @file 相似图卡片逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

/* global A Box */
require(['zepto', 'common/lib/invoker', 'common/widget/attatch'], function ($, invoker, Attatch) {
    invoker.initCallEditor();

    var $card = $('#c-invoke-edit').closest('.result');

    var attatch = new Attatch({
        main: $card
    });

    $card.find('.close').on('click', function () {
        $card.hide();
        attatch.dispose();
        attatch = null;
        return false;
    });
});

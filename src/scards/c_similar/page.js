/**
* @file Waterfall瀑布流
* @author Dong Hualei (donghualei@baidu.com)
* @date 2015-8-4
*/



require(['common/widget/Waterfall'], function (waterfall) {

    var wf = new waterfall();

    wf.init({
        idName: 'waterfall',
        ajaxUrl: simAjaxUrl,
        containerId: 'viewport'
    });

    wf.getImages();
});

require(['common/widget/backtop/backtop', 'zepto'] ,function (backtop, $) {

    backtop.init({
        ele: 'backtop'
    });

    $(window).on('scroll', function() {
        if( $(window).scrollTop() > 100) {
            backtop.show();
        }
        else {
            backtop.hide();
        }
    });
});

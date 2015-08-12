/**
* @file Waterfall瀑布流
* @author Dong Hualei(donghualei@baidu.com)
* @date 2015-8-4
*/


require(['common/widget/waterfall'], function (waterfall) {
    var wf = new waterfall();

    wf.init({
        idName: 'waterfall',
        ajaxUrl: '{%$tplData.ajaxUrl%}',
        maxPages: {%$tplData.maxPages%},
        containerId: 'viewport'
    });

    wf.getImages();
});

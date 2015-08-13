/**
* @file Waterfall瀑布流
* @author Dong Hualei(donghualei@baidu.com)
* @date 2015-8-4
*/


require(['common/widget/waterfall'], function (waterfall) {

    var wf = new waterfall();

    wf.init({
        idName: 'waterfall',
<<<<<<< HEAD
        ajaxUrl: {%json_encode($tplData.simAjaxUrl)%},
=======
        ajaxUrl: '{%$tplData.ajaxUrl%}',
        maxPages: masPages,
>>>>>>> 7788a2f38c7a0b11b9154f395ef9ee0fc47cc831
        containerId: 'viewport'
    });

    wf.getImages();
});

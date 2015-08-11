/**
 * @file
 * @author 
 *
 */

define(function(require) {
    var waterfall = require('common/widget/waterfall');
    var slider = require('./js/slider');
    var $ = require('zepto');
    var exports = {};

    var data = require('common/data');

    exports.start = function() {
       /* $.ajax({
            url: '/scards/c_similar/pages/imglist',
            success: function (data) {
                alert(data);
            }
        });*/

        var s = new slider();

        s.init({
            imgsInfo: data.imgsInfo,
            idName: 'sugguestion-waterfall'
        });

        
        var wf = new waterfall();
        wf.init({
            idName: 'sugguestion-waterfall',
            ajaxUrl: data.imgsInfo[0].ajaxUrl,
            maxPages: data.imgsInfo[0].maxPages,
            containerId: 'viewport'
        });
        wf.getImages();
    };

    return exports;
});
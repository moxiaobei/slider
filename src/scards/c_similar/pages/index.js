/**
 * @file
 * @author
 *
 */

define(function(require) {
    var waterfall = require('common/widget/Waterfall');
    var feedback = require('common/widget/feedback/feedback');
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

        feedback.init();
    };

    return exports;
});

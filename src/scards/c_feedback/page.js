/**
 * @file 相似图卡片逻辑
 * @author wukaifang(wukaifang@baidu.com)
 */

/* global A Box */
(function () {
    var $ = require('zepto');
    var env = require('common/widget/env');
    var Box = require('openjs');
    console.log(Box);
    var feedback = document.querySelector('.bdbox_feedback-a');
    if (feedback) {
        var url = 'http://ufosdk.baidu.com/'
            + '?m=Client'
            + '&a=postView'
            + '&appid=284'
            + '&needEmail=false'
            + '&webURL=' + encodeURIComponent(window.location.href)
            + '&placeholder=' + encodeURIComponent('请输入您的问题或建议')
            + '&ajax=0';
        feedback.setAttribute('href', url);

        env.ready(function () {
            if (Box.os.ios && Box.version_compare(Box.version, '6.2') >= 0) {
                feedback.addEventListener('click', function (ev) {
                    Box.ios.invokeApp('utilsfeedback', {
                        params: encodeURIComponent(JSON.stringify({
                            source: 'image',
                            refer: window.top.location.href
                        })),
                        minver: encodeURIComponent('6.2.0.0')
                    });
                    ev.preventDefault();
                    //  ev.returnValue = false;
                });
            }
        });
    }
})();



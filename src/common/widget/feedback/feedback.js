/**
 * @file 反馈
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require, exports) {
    var env = require('common/lib/env');
    var Box = require('openjs');
    var feedback = document.querySelector('.feedback-a');

    exports.init = function () {
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
    };

    return exports;
});

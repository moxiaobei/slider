/**
 * @file 运营活动页面通用js逻辑
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

/*global Box*/
define(function (require) {

    var gData = {};
    var env = require('common/libs/env');

    /**
     * 主入口
     * @param {Object} data 模版传进来的数据
     */
    var enter = function (data) {
        gData = data;
        setQuery();
        initTongji();
    };

    /**
     * query上框
     */
    function setQuery() {
        if (env.os.ios) {
            Box.ios.invokeApp(
                'setquery',
                {
                    params: JSON.stringify({
                        type: 'text',
                        query: gData.query
                    }),
                    minver: '5.5.0.0'
                }, '');
        }
        else if (env.os.android) {
            Box.android.invokeApp('bd_searchbox_interface', 'setQuery', [gData.query, 'web']);
        }
    }

    /**
     * 添加百度统计
     */
    function initTongji() {
        /*eslint-disable fecs-camelcase*/
        var _hmt = _hmt || [];
        var hm = document.createElement('script');
        hm.src = '//hm.baidu.com/hm.js?21bcf959ccb75da6901a2417e0288acf';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
        /*eslint-enable fecs-camelcase*/
    }

    return {
        enter: enter
    };
});

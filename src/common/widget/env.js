/**
 * @file 判断当前环境的工具
 * @author zoumiaojiang(zoumiaojiang@baidu.com)
 */

define(function (require) {

    var ua = navigator.userAgent;
    var os = {};
    var browser = {};
    var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
    var touchpad = webos && ua.match(/TouchPad/);
    var kindle = ua.match(/Kindle\/([\d.]+)/);
    var silk = ua.match(/Silk\/([\d._]+)/);
    var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
    var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
    var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
    var playbook = ua.match(/PlayBook/);
    var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
    var firefox = ua.match(/Firefox\/([\d.]+)/);
    var ie = ua.match(/MSIE ([\d.]+)/) || ua.match(/MSIE\s([\d.]+)/);
    var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
    var runtime = ua.match(/BaiduLightAppRuntime/i);
    var qingpai = ua.match(/qingpai(ios|android)client/i);
    var uc = ua.match(/UCBrowser[\/]?([\d.]+)/i);
    var weixin = ua.match(/MicroMessenger/i);
    var weibo = ua.match(/Weibo/i);
    var qq = ua.match(/MQQ/i);
    var hao123 = ua.match(/hao123\/([\d.]+)/i);
    var safari = webkit && ua.match(/Mobile\//) && !chrome && !uc && !weixin && !qq && !weibo && !hao123;


    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) {
        browser.version = webkit[1];
    }

    if (android) {
        os.android = true;
        os.version = android[2];
    }
    if (iphone && !ipod) {
        os.ios = os.iphone = true;
        os.version = iphone[2].replace(/_/g, '.');
    }
    if (ipad) {
        os.ios = os.ipad = true;
        os.version = ipad[2].replace(/_/g, '.');
    }
    if (ipod) {
        os.ios = os.ipod = true;
        os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    }
    if (webos) {
        os.webos = true;
        os.version = webos[2];
    }
    if (touchpad) {
        os.touchpad = true;
    }
    if (blackberry) {
        os.blackberry = true;
        os.version = blackberry[2];
    }
    if (bb10) {
        os.bb10 = true;
        os.version = bb10[2];
    }
    if (rimtabletos) {
        os.rimtabletos = true;
        os.version = rimtabletos[2];
    }
    if (playbook) {
        browser.playbook = true;
    }
    if (kindle) {
        os.kindle = true;
        os.version = kindle[1];
    }
    if (silk) {
        browser.silk = true;
        browser.version = silk[1];
    }
    if (!silk && os.android && ua.match(/Kindle Fire/)) {
        browser.silk = true;
    }
    if (chrome) {
        browser.chrome = true;
        browser.version = chrome[1];
    }
    if (firefox) {
        browser.firefox = true;
        browser.version = firefox[1];
    }
    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }
    if (safari && (ua.match(/Safari/) || !!os.ios)) {
        browser.safari = true;
    }
    if (webview) {
        browser.webview = true;
    }
    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }
    if (runtime) {
        browser.runtime = true;
    }
    if (uc) {
        browser.uc = true;
        browser.version = uc[1];
    }
    if (qq) {
        browser.qq = true;
    }
    if (weixin) {
        browser.weixin = true;
    }
    if (weibo) {
        browser.weibo = true;
    }
    if (qingpai) {
        browser.runtime = true;
        browser.qingpai = true;
    }

    os.tablet = !!(ipad
        || playbook
        || (android && !ua.match(/Mobile/))
        || (firefox && ua.match(/Tablet/))
        || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));

    os.phone = !!(!os.tablet
        && !os.ipod
        && (android
           || iphone
           || webos
           || blackberry
           || bb10
           || (chrome && ua.match(/Android/))
           || (chrome && ua.match(/CriOS\/([\d.]+)/))
           || (firefox && ua.match(/Mobile/))
           || (ie && ua.match(/Touch/))
        )
    );

    var ret = {
        os: os,
        browser: browser
    };

    var isReady = false;
    var readyList = [];

    function ready(fn) {
        if (isReady) {
            setTimeout(function () {
                fn();
            }, 0);
            return;
        }
        readyList.push(fn);
    }

    function setReady() {
        if (isReady) {
            return;
        }

        isReady = true;
        for (var i = 0, n = readyList.length; i < n; i++) {
            readyList[i]();
        }
        readyList.length = 0;
    }

    (function () {
        if (document.readyState === 'complete') {
            setTimeout(setReady, 0);
        }
        else {
            document.addEventListener('DOMContentLoaded', setReady);
            window.addEventListener('load', setReady);
        }
    }());

    ret.ready = ready;

    ret.guid = function (prefix) {
        prefix = prefix || '';
        return prefix + setTimeout(function () {}, 0);
    };

    ret.uuid = (function () {
        var cs = document.cookie.split(';');
        var parseCookie = {};
        for (var i = 0, n = cs.length; i < n; i++) {
            var t = cs[i].split('=');
            parseCookie[t[0].replace(/\s+/g, '')] = t[1];
        }
        return parseCookie.reqid || (new Date()).getTime() + (ret.os.ios ? '01' : ret.os.android ? '02' : '00');
        // return (new Date()).getTime() + (ret.os.ios ? '01' : ret.os.android ? '02' : '00');
    }());

    ret.getAk = function (urlencoding) {

        // H5  10  eyJjdCI6IjEwIn0=
        // Android  20  eyJjdCI6IjIwIn0=
        // Ios  21  eyJjdCI6IjIxIn0=
        // H5插件  30  eyJjdCI6IjMwIn0=
        var r = ret.browser.runtime ? 'eyJjdCI6IjIwIn0=' : 'eyJjdCI6IjEwIn0=';
        if (urlencoding) {
            r = encodeURIComponent(r);
        }

        return r;
    };

    return ret;
});

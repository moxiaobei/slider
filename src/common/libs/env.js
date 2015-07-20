/* eslint-disable */

/**
 * @name     : Env.js
 * @author   : jiasong@baidu.com
 * @modify   : 2013-08
 * @requires : none
 */

/**
 *
 * @param ua
 * @returns {{os: {}, browser: {}}}
 */

define(function (require) {
    var ua = navigator.userAgent;
    var os = {}, browser = {},
        webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        playbook = ua.match(/PlayBook/),
        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        firefox = ua.match(/Firefox\/([\d.]+)/),
        ie = ua.match(/MSIE ([\d.]+)/) || ua.match(/MSIE\s([\d.]+)/),
        webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome,
        runtime = ua.match(/BaiduLightAppRuntime/i),
        qingpai = ua.match(/qingpai(ios|android)client/i),
        uc = ua.match(/UCBrowser[\/]?([\d.]+)/i),
        weixin = ua.match(/MicroMessenger/i),
        weibo = ua.match(/Weibo/i),
        qq = ua.match(/MQQ/i),
        hao123 = ua.match(/hao123\/([\d.]+)/i),
        safari = webkit && ua.match(/Mobile\//) && !chrome && !uc && !weixin && !qq && !weibo && !hao123;


    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1];

    if (android) os.android = true, os.version = android[2];
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    if (webos) os.webos = true, os.version = webos[2];
    if (touchpad) os.touchpad = true;
    if (blackberry) os.blackberry = true, os.version = blackberry[2];
    if (bb10) os.bb10 = true, os.version = bb10[2];
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
    if (playbook) browser.playbook = true;
    if (kindle) os.kindle = true, os.version = kindle[1];
    if (silk) browser.silk = true, browser.version = silk[1];
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    if (chrome) browser.chrome = true, browser.version = chrome[1];
    if (firefox) browser.firefox = true, browser.version = firefox[1];
    if (ie) browser.ie = true, browser.version = ie[1];
    if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
    if (webview) browser.webview = true;
    if (ie) browser.ie = true, browser.version = ie[1];
    if (runtime) browser.runtime = true;
    if (uc) browser.uc = true, browser.version = uc[1];
    if (qq) browser.qq = true;
    if (weixin) browser.weixin = true;
    if (weibo) browser.weibo = true;
    if (qingpai) browser.runtime = true, browser.qingpai = true;

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
    (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
    (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

    return {
        os: os,
        browser: browser
    }
});


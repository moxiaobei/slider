/**
 * @file 为scard提供逻辑支持
 * @author wukaifang(wukaifang@baidu.com)
 */

!(function () {
    var detector = document.createElement('detector');
    var classListExist = detector.classList;

    function addClass(el, className) {
        if (classListExist) {
            el.classList.add(className);
        }
        else {
            el.className += ' ' + className + ' ';
        }
    }

    function removeClass(el, className) {
        if (classListExist) {
            el.classList.remove(className);
        }
        else {
            var cn = ' ' + el.className + ' ';
            var r = new RegExp(' ' + className + ' ');
            el.className = cn.replace(r, ' ');
        }
    }

    function hasClass(el, className) {
        var ret;
        if (classListExist) {
            ret = el.classList.contains(className);
        }
        else {
            var cn = ' ' + el.className + ' ';
            var r = new RegExp(' ' + className + ' ');
            ret = !!cn.match(r);
        }

        return ret;
    }

    function flexInit() {
        var flexSupport = false;
        var flexOldSupport = false;
        detector.style.display = 'flex';
        flexSupport = (detector.style.display === 'flex');
        detector.style.display = '-webkit-flex';
        flexSupport = flexSupport || (detector.style.display === '-webkit-flex');
        detector.style.display = '-webkit-box';
        flexOldSupport = (detector.style.display === '-webkit-box');

        var className;
        if (flexSupport) {
            className = 'flex-support';
        }
        else {
            if (flexOldSupport) {
                className = 'flex-old-support';
            }
            else {
                className = 'flex-no-support';
            }
        }
        addClass(document.documentElement, className);
    }

    function osInit() {
        var ua = navigator.userAgent;
        var ios = ua.match(/(iPad|iPod|iPhone).*OS\s([\d_]+)/);
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);

        var className;
        if (ios) {
            className = 'os-ios';
        }
        else if (android) {
            className = 'os-android';
        }
        else {
            className = 'os-other';
        }
        addClass(document.documentElement, className);
    }

    flexInit();
    osInit();

})();

/**
 * @file 元素随着滚动吸附在浏览器窗口顶部
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require, exports) {
    var $ = require('zepto');
    var $window = $(window);

    function setFixed(ele, top, left) {
        ele.css({
            position: 'fixed',
            top: top,
            left: left
        });
    }

    function setAbsolute(ele, top, left) {
        ele.css({
            position: 'absolute',
            top: top,
            left: left
        });
    }

    function recovery() {

    }

    function onsrcoll(e) {
        var scrollTop = $window.scrollTop();
        var winH = $window.height();

        if (scrollTop > this.mainOffet.top) {
            if (!this.isFixed) {
                setFixed(this.main, 0, 0);
                this.isFixed = true;
            }
        }
        else {
            if (this.isFixed) {
                this.main.css('position', '');
                this.isFixed = false;
            }
        }
        return;
    }

    function Attatch(opt) {
        this.main = opt.main;
        this.mainOffet = this.main.offset();
        this.main.css('width', this.main.width());
        this.isFixed = false;
        $window.on('scroll.' + opt.main, $.proxy(onsrcoll, this));
    }

    Attatch.prototype.dispose = function () {
        $window.off('scroll.' + opt.main);
        this.main = this.isFixed = this.mainOffet = null;
    };

    return Attatch;
});

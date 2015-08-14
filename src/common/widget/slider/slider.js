/**
 * @file 卡片（猜词强展示，你的图片可能是）的大图显示组件
 *       需要包含slider.less
 * @author wukaifang(wukaifang@baidu.com)
 */

define(function (require) {
    var $ = require('zepto');
    var utils = require('common/lib/utils');
    var toast = require('common/widget/toast/toast');

    var htmlRaw = [
        '<div class="slider">',
            '<div class="slider-container">',
                '<a class="slider-head" href="#" target="_blank">',
                    '<div class="slider-title"></div>',
                    '<div class="slider-link"></div>',
                '</a>',
                '<div class="slider-pics"></div>',
                '<div class="slider-button">',
                    '<button type="button" class="slider-pic_search_btn" data-url="">识别此图</button>',
                '</div>',
                '<div class="slider-toast"><div class="slider-cycle"></div>识别中...</div>',
            '</div>',
        '</div>'
    ].join('');

    var touchNames;
    if (window.navigator.pointerEnabled) { // IE11 与 W3C
        touchNames = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'];
    }
    else if (window.navigator.msPointerEnabled) { // IE9-10
        touchNames = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel'];
    }
    else if ('ontouchstart' in window) {
        touchNames = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
    }
    else {
        touchNames = ['mousedown', 'mousemove', 'mouseup', 'mouseout'];
    }

    if (!touchNames) {
        var noop = function () {};
        return {
            start: noop,
            end: noop,
            move: noop,
            cancel: noop,
            clear: noop
        };
    }

    var TOUCH_START = touchNames[0];
    var TOUCH_MOVE = touchNames[1];
    var TOUCH_END = touchNames[2];
    var TOUCH_CANCEL = touchNames[3];

    window.addEventListener('hashchange', function () {
        var cls = location.hash.replace('#', '');
        if (cls !== 'imgView') {
            // 隐藏
            imgView && imgView.hide();
        }
    }, false);

    // 其他函数定义
    function picTpl(obj) {
        return '<div class="slider-pic">'
            // slider-pic-left
            + '<div class="slider-pic_view" style="background-image: url('
            + obj.src
            // 'http://ww3.sinaimg.cn/bmiddle/85c5336ctw1ecmub42p64j20bx0hsgoe.jpg' +
            + ')"><img src="'
            + obj.src
            + '"></div></div>';
    }


    var ImgView = function () {
        var win = $(window);
        var el = document.createElement('div');
        el.innerHTML = htmlRaw;
        el.style.cssText = 'position:absolute;left:0;right:0;top:0;display:none;overflow:hidden;';
        el.style.height = win.height() + 'px';

        win.on('resize', function () {
            el.style.height = win.height() + 'px';
        });

        document.body.appendChild(el);

        var that = this;
        that.el = el;

        that.imgList = [];
        that.showTitle = true;
        that.currNum = 0;

        that.loading = false;
        that.isAbort = false;

        that.container = el.querySelector('.slider-container');
        that.head = el.querySelector('.slider-head');
        that.title = el.querySelector('.slider-title');
        that.link = el.querySelector('.slider-link');
        that.pics = el.querySelector('.slider-pics');
        that.btn = el.querySelector('.slider-pic_search_btn');

        that.otherEl = [];
        that.scrollTop = 0;

        // 绑定滑动事件
        var picsEl = that.pics;

        var isDrag = false;
        var startPoint = false;

        var $pics = $(picsEl);

        picsEl.addEventListener('click', function (ev) {
            history.back();
        });

        picsEl.addEventListener(TOUCH_START, function (ev) {

            ev.touches = ev.touches || [];
            if (ev.touches.length === 1) {
                var f1 = ev.touches[0];
                startPoint = [f1.clientX, f1.clientY];
                // console.log(startPoint);
                isDrag = true;
            }
            else {
                isDrag = false;
            }

            picsEl.addEventListener(TOUCH_MOVE, function (ev) {
                ev.touches = ev.touches || [];

                if (ev.touches.length !== 1) {
                    isDrag = false;
                    return;
                }

                if (isDrag && startPoint) {
                    ev.preventDefault();
                    var f1 = ev.touches[0];
                    var currPos = [f1.clientX, f1.clientY];
                    // console.log(currPos);
                    var dis = currPos[0] - startPoint[0];

                    if (dis < -50) {
                        that.next();
                        isDrag = false;
                    }

                    if (dis > 50) {
                        that.prev();

                        isDrag = false;
                    }
                }
            });
            picsEl.addEventListener(TOUCH_END, function (ev) {
                isDrag = false;
                startPoint = false;
            });
            picsEl.addEventListener(TOUCH_CANCEL, function (ev) {
                isDrag = false;
                startPoint = false;
            });
        });

        that.btn.addEventListener('click', function (ev) {
            ev.preventDefault();

            if (that.loading) {
                // 识别中，取消流程
                that.isAbort = true;
                that.loading.abort();
                that.loading = false;
                $(that.el).removeClass('slider-loading');

                that.btn.innerHTML = '识别此图';
            }
            else {
                // 发起识别
                that.isAbort = false;
                var imgSrc = $(that.btn).data('url');
                if (!imgSrc) {
                    return;
                }

                // 此处应该有 loading
                $(that.el).addClass('slider-loading');
                that.btn.innerHTML = '取消';

                that.loading = $.ajax({
                    type: 'POST',
                    url: '/upload',
                    data: {
                        image: imgSrc,
                        guessData: 1,
                        tn: 'wise'
                    },
                    dataType: 'json',
                    timeout: 10000,
                    success: function (res, status, xhr) {
                        var r = res.data;

                        $(that.el).removeClass('slider-loading');
                        that.btn.innerHTML = '识别此图';

                        that.loading = false;

                        if (r.url) {
                            location.href = r.url;
                        }
                        else {
                            toast.makeText('服务器开小差了，请稍候重试');
                        }
                    },
                    error: function (xhr, type, error) {
                        that.loading = false;
                        if (type !== 'abort' && !that.isAbort) {
                            toast.makeText('服务器开小差了，请稍候重试');
                            // console.warn('服务器出错了');
                        }
                        that.isAbort = false;
                        $(that.el).removeClass('slider-loading');
                        that.btn.innerHTML = '识别此图';
                    }
                });
            }
        });
    };

    ImgView.prototype.show = function (currEl) {
        var i;
        var n;
        var that = this;

        // 列表为空时，不出来
        if (that.imgList.length === 0) {
            return;
        }

        location.hash = '#imgView';

        this.scrollTop = window.scrollY;
        this.otherEl = [].slice.call(document.querySelectorAll('.global_container'));
        for (i = 0, n = this.otherEl.length; i < n; i++) {
            this.otherEl[i].style.display = 'none';
        }

        if (!this.showTitle) {
            this.el.className = 'slider-no_head';
        }
        else {
            this.el.className = '';
        }

        setTimeout(function () {
            $('#viewport').css('display', 'none');
            that.el.style.display = 'block';

            if (!currEl) {
                that._order(0);
                return;
            }

            var targetSrc = $(currEl).data('src');
            if (targetSrc) {
                for (i = 0, n = that.imgList.length; i < n; i++) {
                    var item = that.imgList[i];
                    if (item.src === targetSrc) {
                        that._order(i);
                        return;
                    }
                }
            }
        }, 100);
    };

    // 隐藏大图
    ImgView.prototype.hide = function () {
        var that = this;
        for (var i = 0, n = this.otherEl.length; i < n; i++) {
            this.otherEl[i].style.display = 'block';
        }

        setTimeout(function () {
            that.el.style.display = 'none';
            $('#viewport').css('display', '');
            window.scrollTo(0, that.scrollTop);

            that.empty();
        }, 100);

    };

    ImgView.prototype._order = function (index) {

        if (index < 0 || index >= this.imgList.length) {
            return;
        }
        var i;
        var n;
        var item;
        var curr = this.imgList[index];

        var listLength = this.imgList.length;
        /* for(i = 0, n = listLength; i < n; i ++) {
           item = this.imgList[i];
           item.curr = false;
           }
           this.imgList[index].curr = true;*/

        var elList = this.pics.querySelectorAll('.slider-pic');
        if (elList.length !== listLength) {
            toast.makeText('出错了，请刷新当前页面');
            return;
        }

        for (i = 0, n = elList.length; i < n; i++) {
            if (i >= index - 2 && i <= index + 2) {
                continue;
            }
            item = elList[i];
            item.className = 'slider-pic';
            /* $(item).removeClass('slider-pic-prev');
             $(item).removeClass('slider-pic-left');
             $(item).removeClass('slider-pic-current');
             $(item).removeClass('slider-pic-right');
             $(item).removeClass('slider-pic-next');*/
        }


        elList[index].className = 'slider-pic slider-pic-current';
        index - 1 >= 0 && (elList[index - 1].className = 'slider-pic slider-pic-left');
        index - 2 >= 0 && (elList[index - 2].className = 'slider-pic slider-pic-prev');
        index + 1 < listLength && (elList[index + 1].className = 'slider-pic slider-pic-right');
        index + 2 < listLength && (elList[index + 2].className = 'slider-pic slider-pic-next');

        this._setHead(curr.title, curr.link);
        this._setUrl(curr.src);
        this.currNum = index;
    };

    ImgView.prototype._setHead = function (title, link) {
        this.title.innerHTML = title;
        this.link.innerHTML = link;
        this.head.href = utils.redirect(link, true);
    };

    ImgView.prototype._setUrl = function (url) {
        $(this.btn).data('url', url);
    };

    ImgView.prototype.next = function () {
        this._order(this.currNum + 1);
    };

    ImgView.prototype.prev = function () {
        this._order(this.currNum - 1);
    };

    // 填充图像
    ImgView.prototype.fetchList = function (img) {
        var cls = $(img).data('relative');
        var imgList = document.getElementsByClassName(cls);

        this.showTitle = true;

        if (!$(img).data('src')) {
            // 如果点击的元素就没有，说明这个不能点
            return;
        }

        var html = '';
        for (var i = 0, n = imgList.length; i < n; i++) {
            var item = imgList[i];
            var title = false;
            var link = false;
            var src = $(item).data('src');

            if (!src) {
                continue;
            }

            if (this.showTitle) {
                title = $(item).data('title');
                link = $(item).data('link');

                if (!title || !link) {
                    this.showTitle = false;
                }
            }

            var imgObj = {
                title: title,
                link: link,
                src: src
            };
            this.imgList.push(imgObj);
            html += picTpl(imgObj);
        }

        $(this.pics).append(html);
    };

    // 清空图片列表
    ImgView.prototype.empty = function () {
        this.imgList.length = 0;
        this.pics.innerHTML = '';
    };

    var imgView = new ImgView();

    // 模块输出
    return imgView;
});

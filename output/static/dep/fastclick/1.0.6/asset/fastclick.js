/*! 2015 Baidu Inc. All Rights Reserved */
!function(){"use strict";function e(t,r){function i(e,t){return function(){return e.apply(t,arguments)}}var s;if(r=r||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=r.touchBoundary||10,this.layer=t,this.tapDelay=r.tapDelay||200,this.tapTimeout=r.tapTimeout||700,!e.notNeeded(t)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],o=this,l=0,u=a.length;u>l;l++)o[a[l]]=i(o[a[l]],o);if(n)t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0);if(t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),!Event.prototype.stopImmediatePropagation)t.removeEventListener=function(e,n,r){var i=Node.prototype.removeEventListener;if("click"===e)i.call(t,e,n.hijacked||n,r);else i.call(t,e,n,r)},t.addEventListener=function(e,n,r){var i=Node.prototype.addEventListener;if("click"===e)i.call(t,e,n.hijacked||(n.hijacked=function(e){if(!e.propagationStopped)n(e)}),r);else i.call(t,e,n,r)};if("function"==typeof t.onclick)s=t.onclick,t.addEventListener("click",function(e){s(e)},!1),t.onclick=null}}var t=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!t,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!t,i=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=r&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;if(e.prototype.needsClick=function(e){switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled)return!0;break;case"input":if(r&&"file"===e.type||e.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(e.className)},e.prototype.needsFocus=function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}},e.prototype.sendClick=function(e,t){var n,r;if(document.activeElement&&document.activeElement!==e)document.activeElement.blur();r=t.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(e),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,e.dispatchEvent(n)},e.prototype.determineEventType=function(e){if(n&&"select"===e.tagName.toLowerCase())return"mousedown";else return"click"},e.prototype.focus=function(e){var t;if(r&&e.setSelectionRange&&0!==e.type.indexOf("date")&&"time"!==e.type&&"month"!==e.type)t=e.value.length,e.setSelectionRange(t,t);else e.focus()},e.prototype.updateScrollParent=function(e){var t,n;if(t=e.fastClickScrollParent,!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n,e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}if(t)t.fastClickLastScrollTop=t.scrollTop},e.prototype.getTargetElementFromEventTarget=function(e){if(e.nodeType===Node.TEXT_NODE)return e.parentNode;else return e},e.prototype.onTouchStart=function(e){var t,n,s;if(e.targetTouches.length>1)return!0;if(t=this.getTargetElementFromEventTarget(e.target),n=e.targetTouches[0],r){if(s=window.getSelection(),s.rangeCount&&!s.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return e.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(t)}}if(this.trackingClick=!0,this.trackingClickStart=e.timeStamp,this.targetElement=t,this.touchStartX=n.pageX,this.touchStartY=n.pageY,e.timeStamp-this.lastClickTime<this.tapDelay)e.preventDefault();return!0},e.prototype.touchHasMoved=function(e){var t=e.changedTouches[0],n=this.touchBoundary;if(Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n)return!0;else return!1},e.prototype.onTouchMove=function(e){if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e))this.trackingClick=!1,this.targetElement=null;return!0},e.prototype.findControl=function(e){if(void 0!==e.control)return e.control;if(e.htmlFor)return document.getElementById(e.htmlFor);else return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(e){var t,a,o,l,u,c=this.targetElement;if(!this.trackingClick)return!0;if(e.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(e.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=e.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s)u=e.changedTouches[0],c=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||c,c.fastClickScrollParent=this.targetElement.fastClickScrollParent;if(o=c.tagName.toLowerCase(),"label"===o){if(t=this.findControl(c)){if(this.focus(c),n)return!1;c=t}}else if(this.needsFocus(c)){if(e.timeStamp-a>100||r&&window.top!==window&&"input"===o)return this.targetElement=null,!1;if(this.focus(c),this.sendClick(c,e),!r||"select"!==o)this.targetElement=null,e.preventDefault();return!1}if(r&&!i)if(l=c.fastClickScrollParent,l&&l.fastClickLastScrollTop!==l.scrollTop)return!0;if(!this.needsClick(c))e.preventDefault(),this.sendClick(c,e);return!1},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(e){if(!this.targetElement)return!0;if(e.forwardedTouchEvent)return!0;if(!e.cancelable)return!0;if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(e.stopImmediatePropagation)e.stopImmediatePropagation();else e.propagationStopped=!0;return e.stopPropagation(),e.preventDefault(),!1}return!0},e.prototype.onClick=function(e){var t;if(this.trackingClick)return this.targetElement=null,this.trackingClick=!1,!0;if("submit"===e.target.type&&0===e.detail)return!0;if(t=this.onMouse(e),!t)this.targetElement=null;return t},e.prototype.destroy=function(){var e=this.layer;if(n)e.removeEventListener("mouseover",this.onMouse,!0),e.removeEventListener("mousedown",this.onMouse,!0),e.removeEventListener("mouseup",this.onMouse,!0);e.removeEventListener("click",this.onClick,!0),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1),e.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(e){var t,r,i,s;if("undefined"==typeof window.ontouchstart)return!0;if(r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1])if(n){if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}else return!0;if(a)if(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3)if(t=document.querySelector("meta[name=viewport]")){if(-1!==t.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}if("none"===e.style.msTouchAction||"manipulation"===e.style.touchAction)return!0;if(s=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],s>=27)if(t=document.querySelector("meta[name=viewport]"),t&&(-1!==t.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))return!0;if("none"===e.style.touchAction||"manipulation"===e.style.touchAction)return!0;else return!1},e.attach=function(t,n){return new e(t,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("fastclick/fastclick",[],function(){return e});else if("undefined"!=typeof module&&module.exports)module.exports=e.attach,module.exports.FastClick=e;else window.FastClick=e}(),define("fastclick",["fastclick/fastclick"],function(e){return e});
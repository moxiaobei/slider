/*! 2015 Baidu Inc. All Rights Reserved */
define("common/widget/in-view",["require","common/lib/animationFrame","zepto"],function(require){var e="[data-in-view]",t=require("common/lib/animationFrame").requestAnimationFrame,n=require("zepto"),r=1e3,exports=function(){function i(n){if(n-c>r){c=n;var l=document.querySelectorAll(e);if(l.length>0){var u=o(l),d=a(u);s(d)}}t(i)}function o(e){for(var t=[],n=window.innerHeight,r=0,i=e.length;i>r;r++){var o=e[r];if(o.getBoundingClientRect){var a=o.getBoundingClientRect();if(a.top>=0&&a.top<n)t.push(o);else if(t.length>0)break}}return t}function a(e){for(var t=[],r=0,i=e.length;i>r;r++){var o=e[r],a=n(o).attr("data-in-view");if(o.removeAttribute("data-in-view"),a)t.push(a)}return t}function s(e){if(0!==e.length){var t=document.createElement("img"),n="/api/log/?";n+="a=inview",n+="&i="+encodeURIComponent(e.join("|")),t.src=n}}var c=0;t(function(e){c=e,i(e)})};return exports});
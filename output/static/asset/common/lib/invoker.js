/*! 2015 Baidu Inc. All Rights Reserved */
define("common/lib/invoker",["require","exports","zepto","common/lib/env","openjs"],function(require,exports){var e=require("zepto"),t=require("common/lib/env"),r=require("openjs"),n=function(){var e=/([iI][rR]|[gG][dD]|[eE][sS])-(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/,t=location.pathname.match(e);if(t)t=t[0];else t=null;return function(){return t}}(),i=function(){var i=e("#imageSearchType").val()||"GENERAL",a={},s=encodeURIComponent(window.location.href);if(window._t_url)a.key=null,a.url=window._t_url;else a.key=n(),a.url=null;if(t.os.ios)return function(){t.ready(function(){a.referrer="http://qingpai.baidu.com/";var e=window.location.href;r.ios.invokeApp("imagesearch",{action:"editimage",args:encodeURIComponent("source_app=BROWSER&referer="+e+"&imageSearch_type="+i),params:encodeURIComponent(JSON.stringify(a)),minver:encodeURIComponent("5.5.0.0")})})};if(t.os.android)return function(){t.ready(function(){a.imageSearch_type=i,a.source_app="BROWSER",a.referer=s,r.android.invokeApp("Bdbox_android_imagesearch","editImage",[JSON.stringify(a)])})};else return function(){alert("暂时不支持非 Android，iOS 平台")}}(),a=function(){var i=e("#imageSearchType").val()||"GENERAL",a={},s=encodeURIComponent(window.location.href);if(window._t_url)a.key=null,a.url=window._t_url;else a.key=n(),a.url=null;if(t.os.ios)return function(){t.ready(function(){a.referrer="http://qingpai.baidu.com/";var e=window.location.href;r.ios.invokeApp("imagesearch",{action:"imagesearch",params:encodeURIComponent(JSON.stringify(a)),args:encodeURIComponent("source_app=BROWSER&referer="+e+"&imageSearch_type="+i),minver:encodeURIComponent("3.8.0.0")})})};if(t.os.android)return function(){t.ready(function(){r.android.invokeApp("Bdbox_android_send_intent","send",["intent:widgetid://com.baidu.searchbox/-1#Intent;action=com.baidu.searchbox.action.MAIN;category=android.intent.category.LAUNCHER;component=com.baidu.searchbox/.CodeScannerActivity;launchFlags=0x10000000;S.from=7;S.source_app=BROWSER;S.referer="+s+";S.imageSearch_type="+i+";end"])})};else return function(){alert("暂时不支持非 Android，iOS 平台")}}();return exports.initCallEditor=function(t){t=t||".c-invoke-edit-btn";var r=e(t);r.on("click",function(e){e.preventDefault(),i()})},exports.initCallImageSearch=function(e){e=e||".c-invoke-image-search";var t=document.querySelector(e);if(t)t.addEventListener("click",function(e){e.preventDefault(),a()})},exports.initSetQuery=function(){window.addEventListener("pageshow",function(){t.ready(function(){if(t.os.ios)r.ios.invokeApp("setquery",{params:encodeURIComponent(JSON.stringify({type:"image",query:window._t_base64})),minver:encodeURIComponent("5.5.0.0")});if(t.os.android)r.android.invokeApp("Bdbox_android_common","setQuery",[JSON.stringify({type:"image",query:window._t_base64})])})},!0)},exports});
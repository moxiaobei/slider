/*! 2015 Baidu Inc. All Rights Reserved */
void function(e,t,n,r,i,o,s){e.alogObjectName=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},e[i].l=e[i].l||+new Date,o=t.createElement(n),o.async=!0,o.src=r,s=t.getElementsByTagName(n)[0],s.parentNode.insertBefore(o,s)}(window,document,"script","http://img.baidu.com/hunter/alog/alog.mobile.min.js","alog"),void function(){function e(){}window.PDC={mark:function(e,t){alog("speed.set",e,t||+new Date),alog.fire&&alog.fire("mark")},init:function(e){alog("speed.set","options",e)},view_start:e,tti:e,page_ready:e}}(),void function(e){var t=!1;e.onerror=function(e,n,r,i){var o=!0;return!n&&/^script error/i.test(e)&&(t?o=!1:t=!0),o&&alog("exception.send","exception",{msg:e,js:n,ln:r,col:i}),!1},alog("exception.on","catch",function(e){alog("exception.send","exception",{msg:e.msg,js:e.path,ln:e.ln,method:e.method,flag:"catch"})})}(window);
/* eslint-disable */
!function(r,n){function e(r,n){return d.cleanObj.toString.call(r).slice(8,-1)===n}function t(r,n){for(var e,t,i=r.split(":").pop().split("/"),s=d;e=i.shift();)"bdbox"!==e&&(t=e,i.length&&(s=s[e]=s[e]||{}));var a=f[r]={exports:{}},c=d.isFunction(n)?n.apply(a,[o,a.exports,a,d]):n;c&&(a.exports=c),s[t]=a.exports
}function o(r){var n=f[r];if(n)return n.exports;throw"module "+r+" is undefined"}function i(){m.forEach(function(r){r()}),m.length=0,v=!0}function s(r,n,e){if("object"==typeof r){var t,o,i=a(r);if(e=e||r,"array"===i||"arguments"===i||"nodelist"===i){for(t=0,o=r.length;o>t;t++)if(n.call(e,r[t],t,r)===!1)return
}else for(t in r)if(r.hasOwnProperty(t)&&n.call(e,r[t],t,r)===!1)return}}function a(r){var n;return null==r?n=String(r):(n=Object.prototype.toString.call(r).toLowerCase(),n=n.substring(8,n.length-1)),n}function c(n){var e=n.success||_,t={imageUrl:"",mediaType:"all",title:"",content:"",linkUrl:location.href},o=n.error||_;
return d.isFunction(n.success)&&(e="_xSHARE_SUCCESS_"+d.getId(),r[e]=n.success,t.success=e),d.isFunction(n.error)&&(o="_xSHARE_FAIL_"+d.getId(),r[o]=n.error,t.error=o),d.each(n,function(r,e){"success"!==e&&"error"!==e&&(e in y?e=y[e]:"content"!==e||n.title||(t.title=r),t[e]=r)}),d.isArray(t.mediaType)&&(t.mediaType="all"),r.BoxShareData||(r.BoxShareData={successcallback:e,errorcallback:o,options:t}),t
}var u=+new Date,l=(u+"").slice(-3),d={isBox:/ baiduboxapp\//i.test(navigator.userAgent),getId:function(){return l++},emptyArr:[],emptyFn:function(){},cleanObj:{},byId:function(r){return d.isString(r)?n.getElementById(r):r},toArray:function(r){return d.emptyArr.slice.call(r)},$:function(r,e){return e=e&&1===e.nodeType?e:n,d.toArray(e.querySelectorAll(r))
}};"Function,String,Array,Number,RegExp".replace(/[^, ]+/g,function(r){d["is"+r]=function(n){return e(n,r)}}),d.isBoolean=function(r){return r===!0||r===!1},d.isObject=function(r){return"object"==typeof r},d.isUndefined=function(r){return void 0===r},d.isWindow=function(r){return null!=r&&r==r.window
},d.isPlainObject=function(r){return d.isObject(r)&&!d.isWindow(r)&&Object.getPrototypeOf(r)==Object.prototype};var f={};d.define=t;var p=function(r,n,e){for(var t,o,i=r.split("."),s=e||p;t=i.shift();)"Box"!==t&&(o=t,i.length&&(s=s[t]=s[t]||{}));return s[o]=n||{},s[o]},m=[],v=!1;p.init=function(r){return"function"!=typeof r?this:(v?r():m.push(r),this)
},"complete,loaded,interactive".indexOf(n.readyState)>-1&&n.body?i():n.addEventListener("DOMContentLoaded",i,!1),t("common:bdbox/utils/getVersion",function(n,e,t){var o=function(){var n=0;if(r.baiduboxapp_version)n=r.baiduboxapp_version;else{var e,t=navigator.userAgent;(e=/([\d+.]+)_(?:diordna|enohpi)_/.exec(t))?(e=e[1].split("."),n=e.reverse().join(".")):(e=/baiduboxapp\/([\d+.]+)/.exec(t))&&(n=e[1])
}return o=function(){return n},n};t.exports=o}),t("common:bdbox/utils/version_compare",function(r,n,e){var t=function(r,n){n+="",r+="";for(var e=r.split("."),t=n.split("."),o=0,i=Math.max(e.length,t.length);i>o;o++){if(e[o]&&!t[o]&&parseInt(e[o])>0||parseInt(e[o])>parseInt(t[o]))return 1;if(t[o]&&!e[o]&&parseInt(t[o])>0||parseInt(e[o])<parseInt(t[o]))return-1
}return 0};e.exports=t}),t("common:bdbox/ios/invokeApp",function(e,t,o,i){o.exports=function(e,t,o){if(e&&i.isBox){var s=[];if(i.isFunction(t))o=t;else for(var a in t)s.push(a+"="+t[a]);if(i.isFunction(o)){var c="_bdbox_js_"+i.getId();r[c]=function(){o.apply(r,[].slice.call(arguments,0))},s.push("func="+c)
}else o&&s.push("func="+o);s="baiduboxapp://"+e+"?"+s.join("&");var u="_bdbox_ios_jsbridge",l=n.getElementById(u);l?l.src=s:(l=n.createElement("iframe"),l.style.display="none",l.id=u,l.src=s,(n.body||n.getElementsByTagName("body")[0]).appendChild(l))}}}),t("common:bdbox/android/invokeApp",function(n,e,t,o){function i(n,e,t){if(t&&!o.isArray(t)&&(t=Array.prototype.slice.call(arguments,0).slice(2)),r[n]&&r[n][e]){var i=r[n][e].apply(r[n],t);
return{error:0,result:i,__from:"js"}}var u=c();if(a(u,4.8)>=0){var l=s(n,e,t);return l=l?JSON.parse(l):{},l.__from="app",l}if("4.7.1"===u||"4.7"==u){var d=s(n,e,t);return{error:0,result:d,__from:"app4.7"}}return{error:200}}function s(n,e,t){if(!o.isBox)return{error:201};var i={obj:n,func:e,args:t?t:[]};
try{return r.prompt("BdboxApp:"+JSON.stringify(i))}catch(s){return{error:201}}}var a=n("common:bdbox/utils/version_compare"),c=n("common:bdbox/utils/getVersion");t.exports=i}),t("common:bdbox/utils/detect",function(n,e,t,o){function i(n){var e={name:"unknown",version:0};this===r||this.os||(this.os=e),n=n||navigator.userAgent;
var t={Weibo:/weibo/i,Wechat:/micromessenger\//i,QQ:/QQ\//};for(var o in t)t.hasOwnProperty(o)&&(e["is"+o]=t[o].test(n));e.isUC=n.match(/UC/)||r.ucweb||r.ucbrowser;var i=n.match(/(Android);?\s+([\d.]+)?/);if(i)return e.android=!0,e.version=i[2],e.name="android",e;var s=n.match(/(iPad).*OS\s([\d_]+)/),a=n.match(/(iPod)(.*OS\s([\d_]+))?/),c=!s&&n.match(/(iPhone\sOS)\s([\d_]+)/);
return c&&!a?(e.ios=e.iphone=!0,e.version=c[2].replace(/_/g,"."),e.name="ios",e):s?(e.ios=e.ipad=!0,e.name="ios",e.version=s[2].replace(/_/g,"."),e):a?(e.name="ios",e.ios=e.ipod=!0,e.version=a[3]?a[3].replace(/_/g,"."):null,e):e}i.apply(o),t.exports=i});var h=encodeURIComponent;d.version=d.utils.getVersion(),d.version_compare=d.utils.version_compare,d.each=s,d.type=a,d.canI=function(r,n,e){return d.version_compare(d.version,r)>=0?d.isFunction(n)&&n():d.isFunction(e)&&e(),d
};var g="android"===d.os.name?function(r,n){d.isObject(r)&&(n=r,r=r.url,delete n.url);var e=["S.bdsb_light_start_url="+h(r)];if(d.isObject(n)){var t={color:"i.extra_actionbar_color_id",appid:"S.bdsb_wallet_appid"};s(n,function(r,n){"color"===n&&(r=4278190080|parseInt("0x"+r)),n=t[n]||n,e.push(n+"="+r)
})}e=e.join(";"),d.android.invokeApp("Bdbox_android_utils","command",[JSON.stringify({intent:"intent:#Intent;"+e+";end","class":"com.baidu.searchbox.wallet.WalletServiceActivity",min_v:"16783629",mode:"0"})])}:function(r,n){d.isObject(r)&&(n=r,r=r.url,delete n.url);var e={openurl:h(r),minver:"5.3.0.0",isla:0,opentype:1,append:0,rbtnstyle:2};
if(d.isObject(n)){var t={color:"barcolor"};s(n,function(r,n){n=t[n]||n,e[n]=r})}e.appid&&(e.isla=1),d.ios.invokeApp("easybrowse",e)};if(d.o2o=g,"android"===d.os.name?(p("card",{query:function(r,n){if(p.version_compare(p.version,"5.0")<0)return this;var e,t;p.isArray(r)?e=[JSON.stringify(r)]:(t=p.toArray(arguments),n=t.pop(),p.isFunction(n)?e=t:(e=p.toArray(arguments),n=null),e=[JSON.stringify(e)]);
var o=p.android.invokeApp("Bdbox_android_card","mquery",e);return o=0===o.error&&o.result?JSON.parse(o.result):!1,p.isFunction(n)&&n(o),o},add:function(n,e){if(p.version_compare(p.version,"5.0")<0)return this;var t,o;p.isString(n)?t=[n]:p.isArray(n)?t=[JSON.stringify(n)]:(o=p.toArray(arguments),e=o.pop(),p.isFunction(e)?t=o:(t=p.toArray(arguments),e=null),t=[JSON.stringify(t)]);
var i=null;if(p.version_compare(p.version,"5.5")>=0){var s="";p.isFunction(e)&&(s="__box_card_"+p.getId(),r[s]=function(r){var n=JSON.parse(r),t=!1;for(var o in n){t=n[o].st;break}e(t)}),i=p.android.invokeApp("Bdbox_android_card","madd",t.concat([s,0]))}else i=p.android.invokeApp("Bdbox_android_card","madd",t);
return i}}),!function(){function r(r,e,t){if(d.version_compare(d.version,"4.6")<0)return this;r="invokeWz"===t?[d.isString(r)?r:JSON.stringify(r),"{}"]:[d.isString(r)?r:JSON.stringify(r)];var o=d.android.invokeApp(n,t,r);return o="queryWzStatus"===t?0===o.error?0|o.result:0:0===o.error,d.isFunction(e)&&e(o),o
}var n="Bdbox_android_xsearch";p("lightapp",{add:function(n,e){return r.call(this,n,e,"addWz")},query:function(n,e){return r.call(this,n,e,"queryWzStatus")},invoke:function(n,e){return r.call(this,n,e,"invokeWz")}})}()):(p("card",{query:function(r,n){if(p.version_compare(p.version,"5.0")<0)return this;
var e,t;p.isArray(r)?e=[JSON.stringify(r)]:(t=p.toArray(arguments),n=t.pop(),p.isFunction(n)?e=t:(e=p.toArray(arguments),n=null),e=[JSON.stringify(e)]);var o=function(r){p.isFunction(n)&&n(JSON.parse(r)),o=null};p.ios.invokeApp("cardMquery",{params:encodeURIComponent(e)},o)},add:function(r,n){if(p.version_compare(p.version,"5.0")<0)return this;
var e,t;p.isString(r)?e=[r]:p.isArray(r)?e=[JSON.stringify(r)]:(t=p.toArray(arguments),n=t.pop(),p.isFunction(n)?e=t:(e=p.toArray(arguments),n=null),e=[JSON.stringify(e)]);var o=function(r){var e=JSON.parse(r),t=!1;for(var i in e){t=e[i].st;break}p.isFunction(n)&&n(t),o=null};return p.ios.invokeApp("cardMadd",{params:encodeURIComponent(e),gohome:"0"},o),!0
}}),!function(){function r(r,n){if(d.version_compare(d.version,"5.3.0.0")<0)return this;var e=function(r){d.isFunction(n)&&n(JSON.parse(r)),e=null};r=JSON.stringify(r),d.ios.invokeApp("laopen",{params:encodeURIComponent(r)},e)}p("lightapp",{add:function(n,e){return r.call(this,n,e)},query:function(n,e){return r.call(this,n,e)
},invoke:function(n,e){return r.call(this,n,e)}})}()),t("common:bdbox/utils/jsonToQuery",function(r,n,e,t){e.exports=function(r){if(t.isString(r))return r;var n=[];for(var e in r)n.push(e+"="+r[e]);return n.join("&")}}),t("common:bdbox/io/loadJS",function(e,t,o,i){function s(e,t,o){var s,u,l,d=n.createElement("script");
i.isString(e)?(s=e,i.isFunction(t)&&(o=t,t=null)):(s=e.url,t=e.data,o=e.success,u=e.error||i.emptyFn,l=e.timeout),i.isObject(t)&&(t=c(t)),t&&(s+=(-1===s.indexOf("?")?"?":"&")+t),s=s.replace(/[&?]{1,2}/,"?");var f;/=\?/.test(s)&&(f="_box_jsonp"+i.getId(),s=s.replace(/=\?/,"="+f));var p=a();l=l||2e4,d.type="text/javascript",d.src=s;
var m,v=!0,h=function(){f&&delete r[f],m&&clearTimeout(m),d.onload=d.onreadystatechange=d.onerror=null,d=null},g=function(){!d||d.readyState&&!/loaded|complete/.test(d.readyState)||(h(),v&&i.isFunction(o)&&o.apply(null,i.toArray(arguments)),v=!1)},b=function(r){h(),v&&u(r),v=!1};f&&(r[f]=g),m=setTimeout(function(){h(),v&&u("timeout"),v=!1
},l),d.onload=d.onreadystatechange=d.onerror=g,d.onerror=b,p.appendChild(d)}function a(){return n.head||n.getElementsByTagName("head")[0]||n.documentElement}var c=e("common:bdbox/utils/jsonToQuery");i.emptyFn,o.exports=s}),t("common:bdbox/moplus",function(r,n,e,t){var o=r("common:bdbox/utils/jsonToQuery"),i=r("common:bdbox/io/loadJS"),s=r("common:bdbox/utils/version_compare"),a="com.baidu.searchbox",c="http://127.0.0.1:6259/",u="http://127.0.0.1:40310/",l="inapp_boxserver",d=500,f=null,p="__moplus_host__",m=function(r,n,e){this.curHost=e||"",this.newHost=u,this.oldHost=c,this.MCMDF=n||l,this._infoFuncs=[],this._verFuncs=[],this.minVersion=r?r:0,this.pkgName=a
};m.prototype={constructor:m,setMcmdf:function(r){return this.MCMDF=r,this},setHost:function(r){return this.curHost=r,this.setStorage(p,r),this},getHost:function(){return this.getStorage(p)?(this.curHost=this.getStorage(p),this.curHost):void 0},setStorage:function(r,n){sessionStorage.setItem(r,n)},getStorage:function(r){var n=sessionStorage.getItem(r);
return n},api:function(r,n,e,s){if(!r)throw"Moplus.api need an action";t.isFunction(n)&&(s=e,e=n,n={});var a=r+(~r.indexOf("?")?"&":"?")+o(n);if(~a.indexOf("mcmdf")||(a+="&mcmdf="+this.MCMDF),this.getHost()){a=this.curHost+a;var c={url:a,timeout:s};t.isFunction(e)?(c.url+="&callback=?",c.success=e,c.error=function(){e({error:33})
},i(c)):i(c)}else{var u=this.newHost+a,l=this.oldHost+a;t.isFunction(e)&&(u+="&callback=?",l+="&callback=?");var d={url:u,timeout:s},f={url:l,timeout:s},c={newData:d,oldData:f,success:e};this.request(c)}return this},getInfo:function(r,n){if(f)return r(f);if(this._infoFuncs.push(r),!(this._infoFuncs.length>1)){var e=this,t=function(r,n){n||(f=r);
var t;for(n&&(r={error:33});t=e._infoFuncs.shift();)t(r)};if(this.getHost()){var o={url:this.curHost+"getsearchboxinfo?mcmdf="+this.MCMDF+"&callback=?",success:t,error:function(){t(null,!0)},timeout:n};i(o)}else{var s={url:this.newHost+"getsearchboxinfo?mcmdf="+this.MCMDF+"&callback=?",timeout:n},a={url:this.oldHost+"getsearchboxinfo?mcmdf="+this.MCMDF+"&callback=?",timeout:n},c={newData:s,oldData:a,success:t,error:function(){t(null,!0)
}};this.request(c)}return this}},getHVersion:function(r,n){this._verFuncs.push(r);var e=this;if(!(this._verFuncs.length>1)){var t=function(r){var n;for(r=e.parseInfo(r);n=e._verFuncs.shift();)n(r)};return this.getInfo(t,n),this}},parseInfo:function(r,n){r=r||f,n=n||this.minVersion;var e=r.package_infos;
if(!e||0===e.length)return!1;var t=a,o={offic:{name:a,version:0},oem:{version:0}};return e.forEach(function(r){var e=r.version_name,i=r.package_name;s(e,n)>=0&&(i===t?1===s(e,o.offic.version)&&(o.offic={version:e,name:a}):1===s(e,o.oem.version)&&(o.oem={version:e,name:i}))}),0===o.oem.version&&0===o.offic.version?!1:0!==o.offic.version?o.offic:0!==o.oem.version?o.oem:void 0
},sendIntent:function(r,n,e){if(r&&t.isString(r))if(/^http/.test(r)||(r="sendintent?mcmdf="+this.MCMDF+"&callback=?&intent="+encodeURIComponent(r)),this.getHost()){var o={url:this.curHost+r,timeout:e};t.isFunction(n)&&(o.success=n,o.error=function(){n({error:33})}),i(o)}else{var s=this;this.getHVersion(function(o){if(o&&o.version){var a={url:s.curHost+r,timeout:e};
t.isFunction(n)&&(a.success=n,a.error=function(){n({error:33})}),i(a)}})}return this},request:function(r){if(r&&"object"==typeof r){var n,e,o=this,s=r.newData,a=r.oldData,c=r.success,u=r.error;return s.success=function(r){"success"!==n&&(e&&clearTimeout(e),n="success",o.setHost(o.newHost),t.isFunction(c)&&c(r))
},s.error=function(){"error"===n&&(t.isFunction(u)?u():t.isFunction(c)&&c({error:33})),n="error"},a.success=function(r){"success"!==n&&("error"===n?(n="success",o.setHost(o.oldHost),t.isFunction(c)&&c(r)):e=setTimeout(function(){n="success",o.setHost(o.oldHost),t.isFunction(c)&&c(r)},d))},a.error=function(){"error"===n&&(t.isFunction(u)?u():t.isFunction(c)&&c({error:33})),n="error"
},i(s),i(a),this}}},e.exports=function(r,n){return new m(r,n)},e.exports.Moplus=m}),d.version_compare(d.version,"5.3.5")>=0){var b,y={image:"imageUrl",url:"linkUrl",order:"mediaType"},_="";r[_]=d.emptyFn,"android"===d.os.name?(b=function(r){if(r.id&&d.byId(r.id)){var n=r.eventType||"touchstart";d.byId(r.id).addEventListener(n,function(){e(r)
},!0)}var e=function(n){n=c(n||r);var e=n.error,t=n.success;n.iconUrl&&n.imageUrl&&delete n.imageUrl,d.android.invokeApp("Bdbox_android_utils","callShare",[JSON.stringify(n),t||"",e||""])};return e},p("share",b)):(b=function(r){if(r.id&&d.byId(r.id)){var n=r.eventType||"touchstart";d.byId(r.id).addEventListener(n,function(){e(r)
},!0)}var e=function(n){n=c(n||r);var e=n.error,t=n.success;n.iconUrl&&!n.imageUrl&&(n.imageUrl=n.iconUrl),n=JSON.stringify(n),d.ios.invokeApp("callShare",{options:encodeURIComponent(n),errorcallback:e||"",successcallback:t||""})};return e},p("share",b))}else{var x=[],S=function(){p._socShare&&p._socShare.init?x.forEach(function(r){p._socShare.init(r)
}):setTimeout(S,3e3)};d.io.loadJS("//m.baidu.com/static/searchbox/openjs/share.js?v=1.2",S);var F={source:"client_id",id:"dom_id",image:"pic_url",success:"afterRender"},b=function(r){var n={content:"",client_id:"ZVEpDSsmZ0qxa1gmgDAh1Fje",theme:"native",dom_id:"share",animate:!0,pic_url:"",url:encodeURIComponent(location.href)};
return d.isObject(r)&&d.each(r,function(r,e){if(e in F&&(e=F[e]),"order"===e&&d.isArray(r)){var t=[];r.forEach(function(r){"email"===r&&(r="mail"),t.push(r)})}n[e]=r}),delete n.success,delete n.error,delete n.afterRender,"all"===n.order?n.order=["qqdenglu","sinaweibo","qqweibo","renren","kaixin","mail","sms"]:d.isString(n.order)&&(n.order=n.order.split(",")),p._socShare&&p._socShare.init?p._socShare.init(n):x.push(n),function(){p._socShare.ui._shareBtnClickHandler()
}};p("share",b)}if(s(d,function(r,n){p[n]=r}),r.Box&&r.Box.$)for(var A in p)r.Box[A]=r.Box[A]||p[A];else r.Box=p}(window,document);

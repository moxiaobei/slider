/*! 2015 Baidu Inc. All Rights Reserved */
define("common/widget/iframeOb",["require","common/lib/q","common/lib/env"],function(require){var e=require("common/lib/q"),t=require("common/lib/env"),n=!0;window.addEventListener("popstate",function(){for(var e=document.getElementsByTagName("iframe"),t=0,n=e.length;n>t;t++)e[t].width=window.innerWidth-10,e[t].style.width=window.innerWidth-10+"px";setTimeout(function(){for(var t=0,n=e.length;n>t;t++)e[t].width=window.innerWidth,e[t].style.width=window.innerWidth+"px"},100)});var r=function(e,t,n){var r={action:t,data:n||{}};e.postMessage(JSON.stringify(r),"*")},i=function(e){var t=this;t._moreFn=[],t._iframeSet={},t._action={_ready:function(e,t){r(t,"_whoRU",{id:"Hello",name:"LiLei"})},_ensure:function(t,n,i){if("HanMeimei"===t.name&&"Hello"===t.id)r(n,"_options",e)},changeHeight:function(e,t,n,r){if(e.height)n.height=e.height,n.style.height=e.height+"px",n.style.width=window.innerWidth+"px",n.style.position="static",setTimeout(function(){r.resolve()},0)},more:function(e){for(var n=0,r=t._moreFn.length;r>n;n++)t._moreFn[n].call(null,e.more)}},window.addEventListener("message",function(e){if(n){var i=t._getTargetFrame(e.source);if(!i)return;var o,a=i.el,s=i.defer;try{o=JSON.parse(e.data)}catch(c){return void t._message(e.source,"unknown",{})}if("unknown"===o.action)throw new Error("child response unknown method");var l="unknown";if(t._action[o.action])l=o.action;if("unknown"===l)return void r(e.source,l,{});try{t._action[l].call(t,o.data||{},e.source,a,s)}catch(c){r(e.source,"error",{})}}})};return i.prototype._getTargetFrame=function(e){var t=this,n=t._iframeSet;for(var r in n)if(n.hasOwnProperty(r)){if(n[r].el.contentWindow===e)return n[r]}else;return!1},i.prototype.createIFrame=function(n){var r=this,i=document.createElement("iframe"),o=e.defer();i.id=t.guid("wise"),i.className="wise-iframe",i.height=0,i.scrolling="no",i.src=n,i.style.cssText="margin: -5px 0; padding: 0; border: 0;width: "+window.innerWidth+"px; height: 0; position: absolute;";var a={el:i,defer:o};return r._iframeSet[i.id]=a,a},i.prototype.onMore=function(e){if("function"==typeof e)this._moreFn.push(e)},i});
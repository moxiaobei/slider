/*! 2015 Baidu Inc. All Rights Reserved */
define("common/ui/wise",["require","common/lib/q","common/widget/iframeOb"],function(require){var e=require("common/lib/q"),t=require("common/widget/iframeOb"),n=function(e,n){var r,i=this;if(e instanceof Element)r=e;else r=document.querySelector(e);if(!r)throw new Error("element is not exist");i.el=r,i._more=!1,n=n||{};var o=new t(n);o.onMore(function(e){i._more=!!e}),this.ob=o};return n.prototype.load=function(t,n){this.from=n,this.keyword=t,this.pageNum=1;var r=e.defer();return r.resolve(),this.loadPromise=r.promise,this.el.innerHTML="",this._loadIFrameWithKeywordAndFrom(this.keyword,this.from,this.pageNum)},n.prototype.more=function(){var t=this;if(!t._more){var n=e.defer();return n.reject("no more"),n.promise}return t.pageNum+=1,t._loadIFrameWithKeywordAndFrom(t.keyword,t.from,t.pageNum)},n.prototype._loadIFrameWithKeywordAndFrom=function(t,n,r){var i=this,o=e.defer();return this.loadPromise.then(function(){if(r=parseInt(r,10)||1,1>r)r=1;var e="/api/proxy/search?word="+encodeURIComponent(t)+"&fr="+encodeURIComponent(n)+"&pn="+r,s=i.ob.createIFrame(e),a=s.el;s.defer.promise.then(function(){o.resolve()}).fail(function(){o.reject()}),i.el.appendChild(a)}),i.loadPromise=o.promise,o.promise},n});
/**
 * @file dp前端性能分析代码－统计首屏时间
 *       pc和mobile端会稍有不同，必须严格按照该文档来部署
 * @author wukaifang(wukaifang@baidu.com)
 */
 /*eslint-disable*/
 void function(e,t){for(var n=t.getElementsByTagName("img"),a=+new Date,i=[],o=function(){this.removeEventListener&&this.removeEventListener("load",o,!1),i.push({img:this,time:+new Date})},s=0;s< n.length;s++)!function(){var e=n[s];e.addEventListener?!e.complete&&e.addEventListener("load",o,!1):e.attachEvent&&e.attachEvent("onreadystatechange",function(){"complete"==e.readyState&&o.call(e,o)})}();alog("speed.set",{fsItems:i,fs:a})}(window,document);

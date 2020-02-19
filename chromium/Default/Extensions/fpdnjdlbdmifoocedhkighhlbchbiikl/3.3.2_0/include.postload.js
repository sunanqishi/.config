﻿function highlightElements(e){highlightedElementsSelector&&unhighlightElements();var t=document.querySelectorAll(e);highlightedElementsSelector=e,highlightedElementsBoxShadows=new Array,highlightedElementsBGColors=new Array;for(var i=0;i<t.length;i++)highlightedElementsBoxShadows[i]=t[i].style.getPropertyValue("-webkit-box-shadow"),highlightedElementsBGColors[i]=t[i].style.backgroundColor,t[i].style.setProperty("-webkit-box-shadow","inset 0px 0px 5px #fd6738"),t[i].style.backgroundColor="#f6e1e5"}function unhighlightElements(){if(null!=highlightedElementsSelector){for(var e=document.querySelectorAll(highlightedElementsSelector),t=0;t<e.length;t++)e[t].style.setProperty("-webkit-box-shadow",highlightedElementsBoxShadows[t]),e[t].style.backgroundColor=highlightedElementsBGColors[t];highlightedElementsSelector=null}}function getAbsolutePosition(e){for(var t=0,i=0;e;e=e.offsetParent)t+=e.offsetLeft,i+=e.offsetTop;return[t,i]}function addElementOverlay(e){if(!e)return null;var t=getElementURL(e);if(e.className||e.id||t){var i=getComputedStyle(e,null),l=document.createElement("div");l.prisoner=e,l.prisonerURL=t,l.className="__adblockplus__overlay",l.setAttribute("style","opacity:0.4; background-color:#ffffff; display:inline-box; width:"+i.width+"; height:"+i.height+"; position:absolute; overflow:hidden; -webkit-box-sizing:border-box; z-index: 99999");var r=getAbsolutePosition(e);return l.style.left=r[0]+"px",l.style.top=r[1]+"px",document.body.appendChild(l),l}}function clickHide_showDialog(e,t,i){if(clickHide_activated||clickHideFiltersDialog){var l=currentElement.prisoner?currentElement.prisoner:currentElement;clickHide_deactivate(),currentElement=l}clickHide_filters=i,chrome.runtime.sendMessage({reqtype:"open-customRuleWindow"})}function clickHide_activate(){if(null!=document){(clickHide_activated||clickHideFiltersDialog)&&clickHide_deactivate();for(var e=document.querySelectorAll("object,embed,img,iframe"),t=0;t<e.length;t++)addElementOverlay(e[t]);clickHide_activated=!0,document.addEventListener("mouseover",clickHide_mouseOver,!1),document.addEventListener("mouseout",clickHide_mouseOut,!1),document.addEventListener("click",clickHide_mouseClick,!1),document.addEventListener("keyup",clickHide_keyUp,!1)}}function clickHide_rulesPending(){clickHide_activated=!1,document.removeEventListener("mouseover",clickHide_mouseOver,!1),document.removeEventListener("mouseout",clickHide_mouseOut,!1),document.removeEventListener("click",clickHide_mouseClick,!1),document.removeEventListener("keyup",clickHide_keyUp,!1)}function clickHide_deactivate(){if(clickHideFiltersDialog&&(document.body.removeChild(clickHideFiltersDialog),clickHideFiltersDialog=null),currentElement&&(currentElement.removeEventListener("contextmenu",clickHide_elementClickHandler,!1),unhighlightElements(),currentElement.style.setProperty("-webkit-box-shadow",currentElement_boxShadow),currentElement.style.backgroundColor=currentElement_backgroundColor,currentElement=null,clickHideFilters=null),unhighlightElements(),clickHide_activated=!1,clickHide_filters=null,document){document.removeEventListener("mouseover",clickHide_mouseOver,!1),document.removeEventListener("mouseout",clickHide_mouseOut,!1),document.removeEventListener("click",clickHide_mouseClick,!1),document.removeEventListener("keyup",clickHide_keyUp,!1);for(var e;e=document.querySelector(".__adblockplus__overlay");)e.parentNode.removeChild(e)}}function clickHide_elementClickHandler(e){e.preventDefault(),e.stopPropagation(),clickHide_mouseClick(e)}function clickHide_mouseOver(e){0!=clickHide_activated&&(e.target.id||e.target.className||e.target.src)&&(currentElement=e.target,currentElement_boxShadow=e.target.style.getPropertyValue("-webkit-box-shadow"),currentElement_backgroundColor=e.target.style.backgroundColor,e.target.style.setProperty("-webkit-box-shadow","inset 0px 0px 5px #d6d84b"),e.target.style.backgroundColor="#f8fa47",e.target.addEventListener("contextmenu",clickHide_elementClickHandler,!1))}function clickHide_mouseOut(e){clickHide_activated&&currentElement&&(currentElement.style.setProperty("-webkit-box-shadow",currentElement_boxShadow),currentElement.style.backgroundColor=currentElement_backgroundColor,currentElement.removeEventListener("contextmenu",clickHide_elementClickHandler,!1))}function clickHide_keyUp(e){e.ctrlKey&&e.shiftKey&&69==e.keyCode&&clickHide_mouseClick(e)}function clickHide_mouseClick(e){if(currentElement&&clickHide_activated){var t=currentElement,i=null;currentElement.className&&"__adblockplus__overlay"==currentElement.className?(t=currentElement.prisoner,i=currentElement.prisonerURL):t.src&&(i=t.src),i&&(i=normalizeURL(relativeToAbsoluteUrl(i)));var l=t.id?t.id.split(" ").join(""):null,r=null;if(t.className&&(r=t.className.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"").split(" ")),clickHideFilters=new Array,selectorList=new Array,l&&(clickHideFilters.push(document.domain+"###"+l),selectorList.push("#"+l)),r)for(var n=0;n<r.length;n++)clickHideFilters.push(document.domain+"##."+r[n]),selectorList.push("."+r[n]);i&&(clickHideFilters.push(relativeToAbsoluteUrl(i)),selectorList.push(t.localName+'[src="'+i+'"]')),clickHide_showDialog(e.clientX,e.clientY,clickHideFilters),currentElement.style.setProperty("-webkit-box-shadow",currentElement_boxShadow),currentElement.style.backgroundColor=currentElement_backgroundColor,highlightElements(selectorList.join(",")),currentElement.style.setProperty("-webkit-box-shadow","inset 0px 0px 5px #fd1708"),currentElement.style.backgroundColor="#f6a1b5"}}function getElementURL(e){var t;if("OBJECT"!=e.localName.toUpperCase()||(t=e.getAttribute("data")))t||(t=e.getAttribute("src")||e.getAttribute("href"));else{var i=e.querySelectorAll('param[name="movie"]');i[0]?t=i[0].getAttribute("value"):(i=e.querySelectorAll('param[name="src"]'),i[0]&&(t=i[0].getAttribute("value")))}return t}function relativeToAbsoluteUrl(e){if(!e||/^[\w\-]+:/i.test(e))return e;if("/"==e[0])return"/"==e[1]?document.location.protocol+e:document.location.protocol+"//"+document.location.host+e;var t=document.baseURI.match(/.+\//);return t?t[0]+e:document.baseURI+"/"+e}function removeDotSegments(e){var t="",i=[];if(/\./.test(e)){for(;void 0!==e&&""!==e;)"."===e||".."===e?e="":/^\.\.\//.test(e)?e=e.substring(3):/^\.\//.test(e)?e=e.substring(2):/^\/\.(\/|$)/.test(e)?e="/"+e.substring(3):/^\/\.\.(\/|$)/.test(e)?(e="/"+e.substring(4),t=t.replace(/\/?[^\/]+$/,"")):(i=e.match(/^(\/?[^\/]*)(\/.*)?$/),e=i[2],t+=i[1]);return t}return e}function normalizeURL(e){var t=e.match(/(.+:\/\/.+?)\/(.*)/);if(!t)return e;var i=removeDotSegments(t[2]);return 0==i.length?t[1]:("/"!=i[0]&&(i="/"+i),t[1]+i)}function showVideoWarn(){var e=document.createElement("div");e.setAttribute("id","adt-warn-video"),e.innerHTML='<div style="background-color: #000;opacity: .4;position: absolute;z-index: 9998;width: 100%;height: 100%;left: 0;top: 0;"></div><div style="width: 400px;left:50%;top:200px;margin-left:-200px;height: 200px;background-color: #eaeaec;border-radius: 8px;position:fixed;z-index: 9999;overflow: hidden;"><div style="padding:30px;text-align:left;font: 16px/18px arial">视频广告过滤功能并不稳定，可能导致视频无法播放。如果视频无法播放请禁用该功能，或者参考官方的设置教程。<br><br>相关链接：<a href="http://www.adtchrome.com" target="_blank">官方首页</a>&nbsp;&middot;&nbsp;<a href="http://www.adtchrome.com/help/" target="_blank">帮助支持</a>&nbsp;&middot;&nbsp;<a href="chrome-extension://fpdnjdlbdmifoocedhkighhlbchbiikl/options.html#tab-support" target="_blank">用户交流</a><br><br><label style="cursor:pointer;"><input type="checkbox" id="shouldShowVideoWarn"><span style="font-size:14px;color:#555">不再显示该提示</span></label><div style="text-align: center;"><button type="button" id="close-adt-warn" style="background-color: #428bca;border-color: #357ebd;color: #fff;display: inline-block;margin-bottom: 0;font-weight: 400;border: 1px solid transparent;padding: 6px 12px;font-size: 14px;line-height: 1.4;border-radius: 4px;cursor: pointer;height:33px;">我知道了</button></div></div></div>',e.querySelector("#close-adt-warn").onclick=function(){var e=document.getElementById("adt-warn-video");e.parentNode.removeChild(e)},e.querySelector("#shouldShowVideoWarn").onclick=function(){chrome.runtime.sendMessage({reqtype:"set-localstorage",lparam:"shouldShowVideoWarn",lvalue:!this.checked},function(e){})},document.body.appendChild(e)}chrome.runtime.sendMessage({reqtype:"get-script"},function(e){if(!(void 0==e.cscripts||e.cscripts.length<=0))for(var t=0;t<e.cscripts.length;t++){var i=document.createElement("script");i.innerHTML=e.cscripts[t],document.head.appendChild(i)}});var clickHide_activated=!1,clickHide_filters=null,currentElement=null,currentElement_boxShadow=null,currentElement_backgroundColor,clickHideFilters=null,highlightedElementsSelector=null,highlightedElementsBoxShadows=null,highlightedElementsBGColors=null,clickHideFiltersDialog=null,lastRightClickEvent=null;document.documentElement instanceof HTMLElement&&(document.addEventListener("contextmenu",function(e){lastRightClickEvent=e},!1),document.addEventListener("click",function(e){if(2!=e.button){for(var t=e.target;t&&!(t instanceof HTMLAnchorElement);)t=t.parentNode;if(t&&"abp:"==t.protocol){e.preventDefault(),e.stopPropagation();var i=t.href;if(/^abp:\/*subscribe\/*\?(.*)/i.test(i)){for(var l=RegExp.$1.split("&"),r=null,n=null,o=0;o<l.length;o++){var c=l[o].split("=",2);if(2==c.length&&/\S/.test(c[1]))switch(c[0]){case"title":r=decodeURIComponent(c[1]);break;case"location":n=decodeURIComponent(c[1])}}n&&(r||(r=n),r=r.replace(/^\s+/,"").replace(/\s+$/,""),n=n.replace(/^\s+/,"").replace(/\s+$/,""),/^(https?|ftp):/.test(n)&&chrome.runtime.sendMessage({reqtype:"add-subscription",title:r,url:n}))}}}},!0),chrome.runtime.onMessage.addListener(function(e,t,i){switch(e.reqtype){case"get-clickhide-state":i({active:clickHide_activated});break;case"clickhide-activate":clickHide_activate();break;case"clickhide-deactivate":clickHide_deactivate();break;case"clickhide-new-filter":if(!lastRightClickEvent)return;var l=lastRightClickEvent.target,r=l.src;if(e.filter!==r)for(var n=document.querySelectorAll("[src]"),o=0;o<n.length;o++)if(r=n[o].src,e.filter===r){l=n[o];break}e.filter===r?(clickHide_activated=!0,clickHideFilters=[e.filter],currentElement=addElementOverlay(l),clickHide_mouseClick(lastRightClickEvent)):console.log("clickhide-new-filter: URLs don't match. Couldn't find that element.",e.filter,r,lastRightClickEvent.target.src);break;case"clickhide-init":i({filters:clickHide_filters});break;case"show-video-warn":showVideoWarn(),i({})}}));!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";var o="uoy,qhy,_lft,rqt,mt,oat,iuh,edoc,nc,moc,xob,oab,da,lla".split("").reverse().join("").split(",");o.push(522..toString());var r=o;n.d(e,"c",function(){return i}),n.d(e,"h",function(){return a}),n.d(e,"d",function(){return l}),n.d(e,"e",function(){return c}),n.d(e,"f",function(){return s}),n.d(e,"i",function(){return u}),n.d(e,"a",function(){return d}),n.d(e,"b",function(){return p}),n.d(e,"g",function(){return f});var i=document,a=window,l=localStorage,c=r[8]+r[2],s=r[9]+r[0],u=r[13]+r[7]+"."+r[14]+"."+r[4]+"."+r[5],d=r[1]+r[11],p=d+r[12],f=r[10]+r[6]+"-"+r[3]},function(t,e){t.exports='.<%b%>wrap * { box-sizing: content-box !important; } .<%b%>wrap { box-sizing: content-box !important; border: 1px solid #e6e6e6; border-right: 0; height: 28px; position: relative; padding-left: 29px; background: #fff; display: inline-block; border-top-left-radius: 8px; z-index: 1000000001; margin-bottom: -9px; margin-top: 6px; } .<%b%>wrap .<%b%>logo { position: absolute; width: 30px; height: 30px; left: -1px; top: -1px; background: url("https://img.alicdn.com/imgextra/i1/56125141/O1CN01Pgzf1s1nqcennm5xH_!!56125141.png") no-repeat center center; } .<%b%>wrap .<%a%>_wrap { float: left; } .<%a%>_content .<%a%>_list table{text-align: center;} .<%a%> { position: relative; z-index: 10; } .<%a%> .<%a%>_btn { padding: 0 16px; color: #525252; line-height: 28px; height: 28px; position: relative; top: -1px; border-bottom: 1px solid #e6e6e6; border-right: 1px solid #e6e6e6; border-top: 1px solid #e6e6e6; z-index: 100; font-size: 12px; } .<%a%>:hover .<%a%>_btn { background: #fff; border-bottom: 0px; border-top: 2px solid #ea5351; } .<%a%> .<%a%>_btn span { font-size: 15px; color: #ea5351; margin-left: 5px; font-weight: bold; } .<%a%>_content a{ outline: 0; text-decoration: none; } .<%a%> .<%a%>_content { display: none; background: #fff; position: absolute; top: 28px; left: -1px; border: 1px solid #e6e6e6; border-bottom: 2px solid #ea5351; width: 460px; } .<%a%>:hover .<%a%>_content { display: block; } .<%a%> .<%a%>_content .<%a%>_no_login { width: 100%; font-size: 16px; text-align: center; color: #525252; padding-top: 20px; line-height: 24px; } .<%a%>_no_login a { color: #ea5351; } .<%a%>_content .<%a%>_list { margin: 10px 0; } .<%a%>_content .<%a%>_list table { width: 100%; } .<%a%>_content .<%a%>_list table tbody tr { height: 36px; } .<%a%>_list{ font-size: 16px; color: #525252; } .<%a%>_list .uuse{ color:#ea5351 } .<%a%>_content .<%a%>_list table tbody tr td:first-child { text-indent: 20px; } .<%a%>_content .<%a%>_list table tbody tr td a.<%a%>_btn { position: relative; top: -2px; text-align: center; display: inline-block; width: 43px; height: 20px; line-height: 20px; font-size: 12px; border-radius: 5px; color: #fff !important; background: #ea5250; box-sizing: border-box; padding: 0px; border: 0; } .<%a%>_title { color: #525252; } #<%a%> .uuse .<%a%>_title{ color: #ea5351; } .<%a%>_content .<%a%>_list table tbody tr:hover { background: #e6e6e6; } .<%a%>_content a.yhq_get { text-decoration: underline; } .mobquan{ position: relative; cursor: pointer; } .mobquan .<%c%>{ position: absolute; top: 35px; left: -46px; padding: 4px; border-radius: 5px; border: 1px solid #fd2550; background: #fff; z-index: 1000000002; } .<%c%> .sj { position: absolute; top: -6px; left: 86px; width: 0; height: 0; border-style: solid; border-width: 0 5px 5px 5px; border-color: transparent transparent #fd2550 transparent; } .<%c%> img { width:160px; cursor: none; } .<%c%> p { font-size: 14px; color: #fd2550; text-align: center; }'},function(t,e){t.exports='<div class="<%b%>wrap"><a href="javascript:;" class="<%b%>logo"></a><div class="<%a%>_wrap"><div class="<%a%>" id="<%a%>"><div class="<%a%>_btn"><span><%title%></span></div><div class="<%a%>_content"><(showLogin)(<p class="<%a%>_no_login">\u8bf7\u5148<a href="<%lU%>">\u767b\u5f55\u6dd8\u5b9d</a>\u5e76\u5237\u65b0\u9875\u9762</p>)><(shownoquan)(<p class="<%a%>_no_login">\u8fd9\u5bb6\u5e97\u4e0d\u7ed9\u529b\uff0c\u5565\u4e5f\u6ca1\u6709</p>)><div class="<%a%>_list"><table><[[qlist]<tr class="<{$.uuse}>"><td width="30%"><{$.condition}></td><td width="50%"><{$.timeRange}></td><td width="20%" class="mobquan">\u70b9\u51fb\u9886\u53d6<div class="<%c%>" style="display: none;"><i class="sj"></i><img l-src="<{$.qurl}>"><p>\u624b\u673a\u6dd8\u5b9d\u626b\u7801\u9886\u5238</p></div></td></tr>]></table></div></div></div></div></div>'},,function(t,e,n){"use strict";function o(t,e){for(var n=t.trim().split("."),o=e,r=0;r<n.length;r++)o=o[n[r]];return o}n.r(e);var r=function(t,e){return t.replace(/<\(([^<>\(\)]+)\)\((.*?)\)>/g,function(t,n,r){return o(n,e)?r:""}).replace(/<%([a-zA-Z,0-9,_,$,.]+)%>/g,function(t,n){return o(n,e)}).replace(/<\[\[([a-zA-Z,0-9,_,$,.]+)\](.*?)\]>/g,function(t,n,r){var i=o(n,e),a="";if(!i)return a;for(var l=0;l<i.length;l++){var c=i[l];a+=r.replace(/<{([a-zA-Z,0-9,_,$,.]+)}>/g,function(t,n){return e.$=c,o(n,e)})}return a})},i=n(0),a=function(t){"string"==typeof t?this.value=Array.prototype.slice.call(i.c.querySelectorAll(t)):Array.isArray(t)?this.value=t:"object"==typeof t&&(this.value=[t])};a.prototype={eq:function(t){return this.value=[this.value[t]],this},find:function(t){var e=[];return this.each(function(n){Array.prototype.push.apply(e,n.querySelectorAll(t))}),new a(e)},each:function(t){return[].forEach.call(this.value,t),this},cssdom:function(t){return this.each(function(e){for(var n in t)e.style[n]=t[n]})},attr:function(t,e){return this.each(function(n){n.setAttribute(t,e)})},getAttr:function(t){return this.value[0].getAttribute(t)},on:function(t,e){return this.each(function(n){n.addEventListener(t,e,!1)})},insertBefore:function(t){return this.each(function(e){e.insertAdjacentHTML("beforeBegin",t)})},insertAfter:function(t){return this.each(function(e){e.insertAdjacentHTML("afterEnd",t)})}};var l=function(t){return new a(t)},c=n(1),s=n.n(c),u=n(2),d=n.n(u),p=location.href;new RegExp("item."+i.e+".com/item.htm.*id=|detail."+i.f+".com/item.htm.*id=|detail."+i.f+".hk/hk/item.htm.*id=").test(p)&&chrome.runtime.sendMessage({cmd:"getQuan",url:p},function(t){if(null!=t&&t.am&&"0"!=t.am&&0!=t.am){if(null==t.zkPrice&&t.ps)try{t.zkPrice=Number(l(t.ps).value[0].innerHTML)}catch(e){t.zkPrice=0}var e={a:i.b,b:i.a,c:i.g,title:t.quan.length>0?"\u53d1\u73b0"+t.quan.length+"\u5f20\u4f18\u60e0\u5238":"\u67e5\u770b\u4f18\u60e0\u5238",showLogin:!!t.needLogin,shownoquan:!t.needLogin&&0==t.quan.length,lU:"https://login."+i.e+".com/member/login.jhtml?redirect_url="+encodeURIComponent(p),qlist:[]};t.quan.sort(function(e,n){return e.startFee>t.zkPrice||!(n.startFee>t.zkPrice)&&e.amount>n.amount});for(var n=0;n<t.quan.length;n++){for(var o=!1,a=0;a<n;a++)if(t.quan[n].condition===t.quan[a].condition){o=!0;break}var c=t.quan[n].startFee;o||e.qlist.push({uuse:c<=t.zkPrice?"uuse":"",condition:t.quan[n].condition,timeRange:t.quan[n].timeRange,qurl:"https://"+i.i+"/coupon/qrcode/v1?aid="+t.quan[n].aid+"&id="+t.itemId+"&sid="+t.sellerId+"&amid="+t.am})}if(e.title=e.qlist.length>0?"\u53d1\u73b0"+e.qlist.length+"\u5f20\u4f18\u60e0\u5238":"\u67e5\u770b\u4f18\u60e0\u5238",l("."+i.b+"_wrap").length>0)return;!function(t){if(null!=t)try{var e=i.c.getElementsByTagName("head")[0],n=i.c.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=t:n.appendChild(i.c.createTextNode(t)),e.appendChild(n)}catch(t){logerror(t)}}(r(s.a,{a:i.b,b:i.a,c:i.g}));var u=0;!function n(){if(!(u>2)){var o=l(t.iss||".tm-fcs-panel,.tb-meta").eq(0);o.value.length>0?(o.insertAfter(r(d.a,e)),l(".mobquan").on("click",function(){var t=l(this).find("."+i.g).value[0];"block"==t.style.display?t.style.display="none":t.style.display="block";var e=l(this).find("."+i.g+">img");return e.getAttr("src")||e.attr("src",e.getAttr("l-src")),!1}),l(".mobquan").on("mouseleave",function(){l(this).find("."+i.g).cssdom({display:"none"})})):(u++,setTimeout(n,500))}}()}})}]);
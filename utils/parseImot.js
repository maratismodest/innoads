const fs = require('node:fs');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://www.imot.bg/pcgi/imot.cgi?act=3&slink=aphgk0&f1=1';

const ___draft = '<!DOCTYPE html>\n' +
  '    <html lang="bg">\n' +
  '      <head>\n' +
  '        <title>Обяви Дава под наем в град София :: imot.bg</title>\n' +
  '        <meta http-equiv="Content-Type" content="text/html; charset=windows-1251">\n' +
  '        <meta name="description" content="Актуални обяви за имоти в град София от сайта за недвижими имоти imot.bg. Вижте обяви Дава под наем в град София">\n' +
  '        <link rel="SHORTCUT ICON" href="https://www.imot.bg/favicon.ico"/>\n' +
  '        <link rel="stylesheet" href="../styless/styles.css?286" type="text/css">\n' +
  '        \n' +
  '        <script type="text/javascript" src="../jss/scripts.js?291"></script>\n' +
  '        <script type="text/javascript" src="../jss/dim.js?280"></script>\n' +
  '        <script type="text/javascript" src="../jss/mobile-detect.min.js?281"></script>\n' +
  '        <script type="text/javascript" src="../jss/jquery.min.js"></script>\n' +
  '        <script type="text/javascript">\n' +
  '        var md = new MobileDetect(window.navigator.userAgent);\n' +
  '        if ( md && md.mobile() && (md.tablet()==null) )\n' +
  '          {\n' +
  '            var mvc=getCookie(\'full\');\n' +
  '            if ( mvc!=\'1\' ) document.location.href=\'https://m.imot.bg/results?rub=2&type_home=2~3~&currency=EUR&sort=1&town=43&fe_agkinds=0&fromdesktop=1&slink=aphgk0\';\n' +
  '          }\n' +
  '        \n' +
  '        </script>\n' +
  '        \n' +
  '        <script>(function(){/*\n' +
  '\n' +
  ' Copyright The Closure Library Authors.\n' +
  ' SPDX-License-Identifier: Apache-2.0\n' +
  '*/\n' +
  '\'use strict\';var g=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}},l=this||self,m=/^[\\w+/_-]+[=]{0,2}$/,p=null,q=function(){},r=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";\n' +
  'if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},u=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a};var v=function(a,b){Object.defineProperty(l,a,{configurable:!1,get:function(){return b},set:q})};var y=function(a,b){this.b=a===w&&b||"";this.a=x},x={},w={};var aa=function(a,b){a.src=b instanceof y&&b.constructor===y&&b.a===x?b.b:"type_error:TrustedResourceUrl";if(null===p)b:{b=l.document;if((b=b.querySelector&&b.querySelector("script[nonce]"))&&(b=b.nonce||b.getAttribute("nonce"))&&m.test(b)){p=b;break b}p=""}b=p;b&&a.setAttribute("nonce",b)};var z=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^+new Date).toString(36)};var A=function(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)},B=function(a){this.a=a||l.document||document};B.prototype.appendChild=function(a,b){a.appendChild(b)};var C=function(a,b,c,d,e,f){try{var k=a.a,h=A(a.a,"SCRIPT");h.async=!0;aa(h,b);k.head.appendChild(h);h.addEventListener("load",function(){e();d&&k.head.removeChild(h)});h.addEventListener("error",function(){0<c?C(a,b,c-1,d,e,f):(d&&k.head.removeChild(h),f())})}catch(n){f()}};var ba=l.atob("aHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vaW1hZ2VzL2ljb25zL21hdGVyaWFsL3N5c3RlbS8xeC93YXJuaW5nX2FtYmVyXzI0ZHAucG5n"),ca=l.atob("WW91IGFyZSBzZWVpbmcgdGhpcyBtZXNzYWdlIGJlY2F1c2UgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlIGlzIGludGVyZmVyaW5nIHdpdGggdGhpcyBwYWdlLg=="),da=l.atob("RGlzYWJsZSBhbnkgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlLCB0aGVuIHJlbG9hZCB0aGlzIHBhZ2Uu"),ea=function(a,b,c){this.b=a;this.f=new B(this.b);this.a=null;this.c=[];this.g=!1;this.i=b;this.h=c},F=function(a){if(a.b.body&&!a.g){var b=\n' +
  'function(){D(a);l.setTimeout(function(){return E(a,3)},50)};C(a.f,a.i,2,!0,function(){l[a.h]||b()},b);a.g=!0}},D=function(a){for(var b=G(1,5),c=0;c<b;c++){var d=H(a);a.b.body.appendChild(d);a.c.push(d)}b=H(a);b.style.bottom="0";b.style.left="0";b.style.position="fixed";b.style.width=G(100,110).toString()+"%";b.style.zIndex=G(2147483544,2147483644).toString();b.style["background-color"]=I(249,259,242,252,219,229);b.style["box-shadow"]="0 0 12px #888";b.style.color=I(0,10,0,10,0,10);b.style.display=\n' +
  '"flex";b.style["justify-content"]="center";b.style["font-family"]="Roboto, Arial";c=H(a);c.style.width=G(80,85).toString()+"%";c.style.maxWidth=G(750,775).toString()+"px";c.style.margin="24px";c.style.display="flex";c.style["align-items"]="flex-start";c.style["justify-content"]="center";d=A(a.f.a,"IMG");d.className=z();d.src=ba;d.style.height="24px";d.style.width="24px";d.style["padding-right"]="16px";var e=H(a),f=H(a);f.style["font-weight"]="bold";f.textContent=ca;var k=H(a);k.textContent=da;J(a,\n' +
  'e,f);J(a,e,k);J(a,c,d);J(a,c,e);J(a,b,c);a.a=b;a.b.body.appendChild(a.a);b=G(1,5);for(c=0;c<b;c++)d=H(a),a.b.body.appendChild(d),a.c.push(d)},J=function(a,b,c){for(var d=G(1,5),e=0;e<d;e++){var f=H(a);b.appendChild(f)}b.appendChild(c);c=G(1,5);for(d=0;d<c;d++)e=H(a),b.appendChild(e)},G=function(a,b){return Math.floor(a+Math.random()*(b-a))},I=function(a,b,c,d,e,f){return"rgb("+G(Math.max(a,0),Math.min(b,255)).toString()+","+G(Math.max(c,0),Math.min(d,255)).toString()+","+G(Math.max(e,0),Math.min(f,\n' +
  '255)).toString()+")"},H=function(a){a=A(a.f.a,"DIV");a.className=z();return a},E=function(a,b){0>=b||null!=a.a&&0!=a.a.offsetHeight&&0!=a.a.offsetWidth||(fa(a),D(a),l.setTimeout(function(){return E(a,b-1)},50))},fa=function(a){var b=a.c;var c="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];b=c?c.call(b):{next:g(b)};for(c=b.next();!c.done;c=b.next())(c=c.value)&&c.parentNode&&c.parentNode.removeChild(c);a.c=[];(b=a.a)&&b.parentNode&&b.parentNode.removeChild(b);a.a=null};var ia=function(a,b,c,d,e){var f=ha(c),k=function(n){n.appendChild(f);l.setTimeout(function(){f?(0!==f.offsetHeight&&0!==f.offsetWidth?b():a(),f.parentNode&&f.parentNode.removeChild(f)):a()},d)},h=function(n){document.body?k(document.body):0<n?l.setTimeout(function(){h(n-1)},e):b()};h(3)},ha=function(a){var b=document.createElement("div");b.className=a;b.style.width="1px";b.style.height="1px";b.style.position="absolute";b.style.left="-10000px";b.style.top="-10000px";b.style.zIndex="-10000";return b};var K={},L=null;var M=function(){},N="function"==typeof Uint8Array,O=function(a,b){a.b=null;b||(b=[]);a.j=void 0;a.f=-1;a.a=b;a:{if(b=a.a.length){--b;var c=a.a[b];if(!(null===c||"object"!=typeof c||Array.isArray(c)||N&&c instanceof Uint8Array)){a.g=b-a.f;a.c=c;break a}}a.g=Number.MAX_VALUE}a.i={}},P=[],Q=function(a,b){if(b<a.g){b+=a.f;var c=a.a[b];return c===P?a.a[b]=[]:c}if(a.c)return c=a.c[b],c===P?a.c[b]=[]:c},R=function(a,b,c){a.b||(a.b={});if(!a.b[c]){var d=Q(a,c);d&&(a.b[c]=new b(d))}return a.b[c]};\n' +
  'M.prototype.h=N?function(){var a=Uint8Array.prototype.toJSON;Uint8Array.prototype.toJSON=function(){var b;void 0===b&&(b=0);if(!L){L={};for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),d=["+/=","+/","-_=","-_.","-_"],e=0;5>e;e++){var f=c.concat(d[e].split(""));K[e]=f;for(var k=0;k<f.length;k++){var h=f[k];void 0===L[h]&&(L[h]=k)}}}b=K[b];c=[];for(d=0;d<this.length;d+=3){var n=this[d],t=(e=d+1<this.length)?this[d+1]:0;h=(f=d+2<this.length)?this[d+2]:0;k=n>>2;n=(n&\n' +
  '3)<<4|t>>4;t=(t&15)<<2|h>>6;h&=63;f||(h=64,e||(t=64));c.push(b[k],b[n],b[t]||"",b[h]||"")}return c.join("")};try{return JSON.stringify(this.a&&this.a,S)}finally{Uint8Array.prototype.toJSON=a}}:function(){return JSON.stringify(this.a&&this.a,S)};var S=function(a,b){return"number"!==typeof b||!isNaN(b)&&Infinity!==b&&-Infinity!==b?b:String(b)};M.prototype.toString=function(){return this.a.toString()};var T=function(a){O(this,a)};u(T,M);var U=function(a){O(this,a)};u(U,M);var ja=function(a,b){this.c=new B(a);var c=R(b,T,5);c=new y(w,Q(c,4)||"");this.b=new ea(a,c,Q(b,4));this.a=b},ka=function(a,b,c,d){b=new T(b?JSON.parse(b):null);b=new y(w,Q(b,4)||"");C(a.c,b,3,!1,c,function(){ia(function(){F(a.b);d(!1)},function(){d(!0)},Q(a.a,2),Q(a.a,3),Q(a.a,1))})};var la=function(a,b){V(a,"internal_api_load_with_sb",function(c,d,e){ka(b,c,d,e)});V(a,"internal_api_sb",function(){F(b.b)})},V=function(a,b,c){a=l.btoa(a+b);v(a,c)},W=function(a,b,c){for(var d=[],e=2;e<arguments.length;++e)d[e-2]=arguments[e];e=l.btoa(a+b);e=l[e];if("function"==r(e))e.apply(null,d);else throw Error("API not exported.");};var X=function(a){O(this,a)};u(X,M);var Y=function(a){this.h=window;this.a=a;this.b=Q(this.a,1);this.f=R(this.a,T,2);this.g=R(this.a,U,3);this.c=!1};Y.prototype.start=function(){ma();var a=new ja(this.h.document,this.g);la(this.b,a);na(this)};\n' +
  'var ma=function(){var a=function(){if(!l.frames.googlefcPresent)if(document.body){var b=document.createElement("iframe");b.style.display="none";b.style.width="0px";b.style.height="0px";b.style.border="none";b.style.zIndex="-1000";b.style.left="-1000px";b.style.top="-1000px";b.name="googlefcPresent";document.body.appendChild(b)}else l.setTimeout(a,5)};a()},na=function(a){var b=Date.now();W(a.b,"internal_api_load_with_sb",a.f.h(),function(){var c;var d=a.b,e=l[l.btoa(d+"loader_js")];if(e){e=l.atob(e);\n' +
  'e=parseInt(e,10);d=l.btoa(d+"loader_js").split(".");var f=l;d[0]in f||"undefined"==typeof f.execScript||f.execScript("var "+d[0]);for(;d.length&&(c=d.shift());)d.length?f[c]&&f[c]!==Object.prototype[c]?f=f[c]:f=f[c]={}:f[c]=null;c=Math.abs(b-e);c=1728E5>c?0:c}else c=-1;0!=c&&(W(a.b,"internal_api_sb"),Z(a,Q(a.a,6)))},function(c){Z(a,c?Q(a.a,4):Q(a.a,5))})},Z=function(a,b){a.c||(a.c=!0,a=new l.XMLHttpRequest,a.open("GET",b,!0),a.send())};(function(a,b){l[a]=function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];l[a]=q;b.apply(null,d)}})("__d3lUW8vwsKlB__",function(a){"function"==typeof window.atob&&(a=window.atob(a),a=new X(a?JSON.parse(a):null),(new Y(a)).start())});}).call(this);\n' +
  '\n' +
  'window.__d3lUW8vwsKlB__("WyI0YTBhODk3MmZlNzIwMDgwIixbbnVsbCxudWxsLG51bGwsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2YvQUdTS1d4VWhqXzdlWWM2MzVYbk5ZTkgteWdXaEZTOXRDdmh5S21va1pQQkNyTkRBX2YwdUNYSTFweHJSQk9fdjBkVlB1cUJPb3kxaDg1YXlzd01rOVZKSVRmd1x1MDAzZCJdCixbMjAsImRpdi1ncHQtYWQiLDEwMCwiTkdFd1lUZzVOekptWlRjeU1EQTRNQVx1MDAzZFx1MDAzZCIsW251bGwsbnVsbCxudWxsLCJodHRwczovL3d3dy5nc3RhdGljLmNvbS8wZW1uL2YvcC80YTBhODk3MmZlNzIwMDgwLmpzP3VzcXBcdTAwM2RDQTAiXQpdCiwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vbC9BR1NLV3hXTmFTeEhpaVBkOURldjdGWl9ZbUNpSklOQmVmQjQ4WkJ5VVc2eG5XTnJGcWQ3OXRGVmlsZEt3Ti12ZTlLX254eUVBT19FUF9wQWNsdEFfTlF0P2FiXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2wvQUdTS1d4WEdqdFhkREs5NW13RXAwajhnOGZ4eDlLZmtpNDlsSTJrdmxXTzJxaFZhZ2hIXy1YNWtnUml6aF9FZW1xZW9HN0RJNmE3SDZoLVVCMUd3ZTdBZT9hYlx1MDAzZDJcdTAwMjZzYmZcdTAwM2QxIiwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vbC9BR1NLV3hXRmktTGk1cjBoeGljcDJkOGN1aUlWMGQ2MTUxZ0ZtbGVWLS1nTjdaSnB3ZTgyMVFsY0RkNjlleW8xck1PMjVQQl8zU2x2c2plWWhyMVRxVEZ1P3NiZlx1MDAzZDIiXQo=");</script>\n' +
  '        <script defer async src="https://www.googletagmanager.com/gtag/js?id=G-0LZF32451N"></script>\n' +
  '        <script>\n' +
  '        const gtagLoaded = new Event(\'gtag-loaded\');(function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s);js.id = id;js.defer = true;js.async = true;js.src = "https://www.googletagmanager.com/gtag/js?id=G-0LZF32451N";js.onload = function(){document.dispatchEvent(gtagLoaded);};fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'gtag-js\'));try {window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'G-0LZF32451N\');gtag(\'config\', \'UA-1160575-1\');}catch(error){}\n' +
  '        </script>\n' +
  '\n' +
  '        <script async="async" src="https://www.googletagservices.com/tag/js/gpt.js"></script>\n' +
  '        <script>\n' +
  '          var googletag = googletag || {};\n' +
  '          googletag.cmd = googletag.cmd || [];\n' +
  '        </script>\n' +
  '        <script>\n' +
  '          googletag.cmd.push(function() {\n' +
  '            googletag.pubads().set("adsense_background_color", "FFFFFF");\n' +
  '          });\n' +
  '        </script>\n' +
  '        <script>\n' +
  '        googletag.cmd.push(function() {\n' +
  '          \n' +
  '                  googletag.defineSlot("/401112551/imot.bg_search_sticky_ad", [[300, 250],[300, 600]], "div-gpt-ad-1695109748314-0")\n' +
  '                    .addService(googletag.pubads()).setTargeting(\'SearchTypesImot\', [\'1-СТАЕН\',\'2-СТАЕН\']).setTargeting(\'SearchAdvertTown\', [\'ГРАД СОФИЯ\']).setTargeting(\'SearchAdvertPubtype\', [\'2\']).setCollapseEmptyDiv(true,true);\n' +
  '\n' +
  '                  googletag.defineSlot("/401112551/imot.bg_search_300x250//600", [[300, 600], [300, 250]], "div-gpt-ad-1695109122618-0")\n' +
  '                    .addService(googletag.pubads()).setTargeting(\'SearchTypesImot\', [\'1-СТАЕН\',\'2-СТАЕН\']).setTargeting(\'SearchAdvertTown\', [\'ГРАД СОФИЯ\']).setTargeting(\'SearchAdvertPubtype\', [\'2\']).setCollapseEmptyDiv(true,true);\n' +
  '\n' +
  '                  googletag.defineSlot("/401112551/imot.bg_results_page_bottom", [[970, 90], [980, 200], [950, 250], [980, 416], [728, 90], [980, 250]], "div-gpt-ad-1695110102688-0")\n' +
  '                    .addService(googletag.pubads()).setTargeting(\'SearchTypesImot\', [\'1-СТАЕН\',\'2-СТАЕН\']).setTargeting(\'SearchAdvertTown\', [\'ГРАД СОФИЯ\']).setTargeting(\'SearchAdvertPubtype\', [\'2\']).setCollapseEmptyDiv(true,true);\n' +
  '\n' +
  '\n' +
  '          googletag.pubads().enableSingleRequest();\n' +
  '          googletag.enableServices();\n' +
  '        });\n' +
  '        </script>\n' +
  '\n' +
  '      </head>\n' +
  '      <body onload="javascript: if(window.startw)startw();">\n' +
  '\n' +
  '      \n' +
  '      \n' +
  '\n' +
  '      <div style="text-align:left; z-index:1; position:relative; margin: 0 auto 10px auto; width:980px; cursor:auto;">\n' +
  '      \n' +
  '      \n' +
  '  <div class="header">\n' +
  '    <a href="//www.imot.bg" class="left" style="text-decoration:none;">\n' +
  '      <img src="//www.imot.bg/images/picturess/logo.svg" style="width:212px; height:65px;" alt="imot.bg – обяви за продажби и наеми на имоти">\n' +
  '      <div class="iSlogan">Сайт <strong>№1</strong> за имоти</div>\n' +
  '    </a>\n' +
  '    <div id="logtable2" class="right">\n' +
  '      \n' +
  '  \n' +
  '  <div class="logPopup" id="logpopup"></div>\n' +
  '  <a class="flagBtn" onclick="ShowLangWindow();"><img src="//www.imot.bg/images/picturess/icons/flag-en.svg"></a>\n' +
  '  <a data-link="//www.imot.bg/pcgi/imot.cgi?act=1" class="clever-link addButton"><img src="//www.imot.bg/images/picturess/plus.svg"> ДОБАВИ ОБЯВА</a>\n' +
  '  \n' +
  '      <a data-link="//www.imot.bg/pcgi/imot.cgi?act=26&rub=0" class="clever-link editButton">Редакция на обява</a>\n' +
  '      <div class="loginLinks">\n' +
  '        <span class="logIn">\n' +
  '          <a href="//www.imot.bg/pcgi/imot.cgi?act=26&logact=1"><strong>Вход</strong></a> | <a href="//www.imot.bg/pcgi/imot.cgi?act=26&logact=2">Нова Регистрация</a>\n' +
  '        </span>\n' +
  '      </div>\n' +
  '      \n' +
  '  \n' +
  '  \n' +
  '    </div>\n' +
  '  </div>\n' +
  '  <div class="iMenu">\n' +
  '    <a href="//www.imot.bg" class="">Начало</a>\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=1" class="">Публикуване</a>\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=2" class="selected">Търсене</a>\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=7" class="">Нови сгради</a>\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=10" class="">Агенции</a>\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=14" class="">Средни цени</a>\n' +
  '    <a href="https://fakti.bg" target="_blank">Новини</a>\n' +
  '    <a href="https://creditcenter.bg/buy-new-home" target="_blank">Кредити</a>\n' +
  '    <span id="logtable3"><a href="//www.imot.bg/pcgi/imot.cgi?act=26" class="right">Моят имот</a></span>\n' +
  '    <div class="bottomLine"></div>\n' +
  '  </div>\n' +
  '  \n' +
  '      \n' +
  '          \n' +
  '  <div class="regWindow" id="langWindow">\n' +
  '    <div class="panel" style="width:700px; left: 0">\n' +
  '      <div class="formVhod shareWindow" style="border-radius:10px;width:700px;">\n' +
  '        <a href="javascript:closLangWindow();" class="close" title="Затвори" style="margin-left:645px;"></a>\n' +
  '        <div class="price-stat">\n' +
  '          <div class="shareOptions" style="width:660px">\n' +
  '            <div class="boxTITLE">Translations in other languages:</div>\n' +
  '            <div class="TITLE">\n' +
  '              All real estate ads published on <span style="color: #900;">imot.bg</span> have been translated into English and published on the partner site\n' +
  '              <br>\n' +
  '              <img src="//www.imot.bg/images/picturess/icons/imoti-info-logo.svg" style="margin-top: 12px; height: 38px;">\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="screen1">\n' +
  '              <div class="emailGrid" style="grid-gap:0">\n' +
  '                <div class="C4">\n' +
  '                  <a href="https://imoti.info/redirect?rub=2&type_home=2~3~&currency=EUR&sort=1&town=43&fe_agkinds=0&fromdesktop=1&slink=aphgk0" class="send gotoSite" target="_blank" onclick="closLangWindow();">Continue</a>\n' +
  '                </div>\n' +
  '              </div>\n' +
  '            </div>\n' +
  '          </div>\n' +
  '        </div>\n' +
  '      </div>\n' +
  '    </div>\n' +
  '  </div>\n' +
  '          <script type="module">\n' +
  '                        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";\n' +
  '                        import { onMessage, isSupported, getMessaging } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-messaging.js";\n' +
  '\n' +
  '                        isSupported().then((isSuppored) => {\n' +
  '                          if (isSuppored) {\n' +
  '                            var fcm=getcookieval(\'fcm\');\n' +
  '                            try {\n' +
  '                              fcm = JSON.parse(decodeURIComponent(fcm));\n' +
  '                            } catch (err) {\n' +
  '                              fcm = {};\n' +
  '                            }\n' +
  '\n' +
  '                            if (fcm.status == \'agree\')\n' +
  '                              receiveFCM();\n' +
  '\n' +
  '                            function receiveFCM() {\n' +
  '\n' +
  '                              initializeApp({ apiKey: "AIzaSyDl3rtJjr6tZw0gJrtZlECkn8L0rWWVaRA",\n' +
  '                                authDomain: "imot-466de.firebaseapp.com",\n' +
  '                                databaseURL: "https://imot-466de.firebaseio.com",\n' +
  '                                projectId: "imot-466de",\n' +
  '                                storageBucket: "imot-466de.appspot.com",\n' +
  '                                messagingSenderId: "647267607875",\n' +
  '                                appId: "1:647267607875:web:1bef151e4da339c07b3bf6"\n' +
  '                              });\n' +
  '\n' +
  '                              const messaging = getMessaging();\n' +
  '                              onMessage(messaging, (payload) => {\n' +
  '\n' +
  '                                if (payload && payload.data && payload.data.type === \'newadv\')\n' +
  '                                  {\n' +
  '                                    document.getElementById(\'notification-popup\').style.display=\'block\';\n' +
  '                                    document.getElementById(\'notification-popup\').style.opacity=\'1\';\n' +
  '                                    document.getElementById(\'notification-popup-bodyonly\').innerHTML = payload.data.bodyonly;\n' +
  '                                    document.getElementById(\'notification-popup-bodyonly\').href = payload.data.url;\n' +
  '                                    document.getElementById(\'notification-popup-span-price\').innerHTML = payload.data.price;\n' +
  '                                    document.getElementById(\'notification-popup-area\').innerHTML = payload.data.area;\n' +
  '                                    document.getElementById(\'notification-popup-town\').innerHTML = payload.data.town;\n' +
  '                                    document.getElementById(\'notification-popup-href-img\').href = payload.data.url;\n' +
  '\n' +
  '                                    if (payload.data.image)\n' +
  '                                      {\n' +
  '                                        document.getElementById(\'notification-popup-img\').src = payload.notification.image;\n' +
  '                                        document.getElementById(\'notification-popup-img\').alt = payload.data.bodyonly;\n' +
  '                                      }\n' +
  '                                  }\n' +
  '                                else if (payload && payload.data && payload.data.type === \'newprice\')\n' +
  '                                  {\n' +
  '                                    document.getElementById(\'notification-popup-price\').style.display=\'block\';\n' +
  '                                    document.getElementById(\'notification-popup-price\').style.opacity=\'1\';\n' +
  '\n' +
  '                                    document.getElementById(\'notification-popup-price-bodyonly\').innerHTML = payload.data.advinfo;\n' +
  '                                    document.getElementById(\'notification-popup-price-bodyonly\').href = payload.data.url;\n' +
  '                                    document.getElementById(\'notification-popup-price-old\').innerHTML = payload.data.old_price;\n' +
  '                                    document.getElementById(\'notification-popup-price-new\').innerHTML = payload.data.new_price;\n' +
  '                                    document.getElementById(\'notification-popup-price-href-img\').href = payload.data.url;\n' +
  '\n' +
  '                                    if (payload.notification.image)\n' +
  '                                      {\n' +
  '                                        document.getElementById(\'notification-popup-price-img\').src = payload.notification.image;\n' +
  '                                        document.getElementById(\'notification-popup-price-img\').alt = payload.data.advinfo;\n' +
  '                                      }\n' +
  '                                  }\n' +
  '                              });\n' +
  '                           }\n' +
  '\n' +
  '                           function closeNotification() {\n' +
  '                             document.getElementById(\'notification-popup\').style.display=\'none\';\n' +
  '                             document.getElementById(\'notification-popup-price\').style.display=\'none\';\n' +
  '                           }\n' +
  '\n' +
  '                           window.closeNotification = closeNotification;\n' +
  '                          }\n' +
  '                        })\n' +
  '                     </script>\n' +
  '                     <div class="logPopup" id="notification-popup">\n' +
  '                       <div class="newLogin" style="width:520px;padding-top:0;">\n' +
  '                         <a href="javascript:closeNotification();" class="close" style="position: relative; left:435px; top:40px;"></a>\n' +
  '                         <div class="formsWrapper">\n' +
  '                           <div style="font-size:14px; display:block; border-bottom:1px solid #b01110; font-weight:bold; margin-bottom:15px; padding-bottom:5px; width:94%; height: 25px;">\n' +
  '                             Получихте нова обява по филтър\n' +
  '                           </div>\n' +
  '\n' +
  '                           <a href="" class="photoLink" style="float: left;" id="notification-popup-href-img" onclick="closeNotification();">\n' +
  '                             <img src="../images/picturess/nophoto_490x341.svg" style="object-fit: cover; max-width: 120px; max-height: 100px;" class="noborder" id="notification-popup-img" alt="">\n' +
  '                           </a>\n' +
  '\n' +
  '                           <div style="font-size:14px; float: right; width:290px; white-space: nowrap; word-break: break-all; text-overflow: ellipsis; overflow: hidden;">\n' +
  '                             <a href="" style="text-decoration: underline;font-size: 14px;font-weight: bold;color: #000;" id="notification-popup-bodyonly" onclick="closeNotification();"></a><br/><br>\n' +
  '                             <strong style="color: #b01110;" id="notification-popup-span-price"></strong><br/>\n' +
  '                             <span id="notification-popup-area"></span><br/>\n' +
  '                             <span id="notification-popup-town"></span><br/>\n' +
  '                           </div>\n' +
  '                           <div style="clear: both;"></div>\n' +
  '                         </div>\n' +
  '                       </div>\n' +
  '                     </div>\n' +
  '\n' +
  '                     <div class="logPopup" id="notification-popup-price" style="">\n' +
  '                       <div class="newLogin" style="width:520px;padding-top:0;">\n' +
  '                         <a href="javascript:closeNotification();" class="close" style="position: relative; left:435px; top:40px;"></a>\n' +
  '                         <div class="formsWrapper">\n' +
  '                           <div style="font-size:14px; display:block; border-bottom:1px solid #b01110; font-weight:bold; margin-bottom:15px; padding-bottom:5px; width:94%; height: 25px;">\n' +
  '                             Промяна на цена на наблюдавана обява\n' +
  '                           </div>\n' +
  '\n' +
  '                           <a href="" class="photoLink" style="float: left;" id="notification-popup-price-href-img" onclick="closeNotification();">\n' +
  '                             <img src="../images/picturess/nophoto_490x341.svg" style="object-fit: cover; max-width: 120px; max-height: 100px;" class="noborder" id="notification-popup-price-img" alt="">\n' +
  '                           </a>\n' +
  '\n' +
  '                           <div style="font-size:14px; float: right; width:290px">\n' +
  '                             <a href="" style="text-decoration: underline;font-size: 14px;font-weight: bold;color: #000;" id="notification-popup-price-bodyonly"></a><br/><br>\n' +
  '\n' +
  '                             стара цена <span style="color: #b01110;" id="notification-popup-price-old"></span> <br/>\n' +
  '                             нова цена <strong style="color: #b01110;" id="notification-popup-price-new"></strong>\n' +
  '                           </div>\n' +
  '                           <div style="clear: both;"></div>\n' +
  '                         </div>\n' +
  '                       </div>\n' +
  '                     </div>\n' +
  '          \n' +
  '  <div class="submenu">\n' +
  '    \n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=0"><span class="">Избор на рубрика</span></a>&nbsp;|&nbsp;\n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=1"><span class="">Продава</span></a>&nbsp;|&nbsp;\n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=2"><span class="selected">Дава под наем</span></a>&nbsp;|&nbsp;\n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=3"><span class="">Купува</span></a>&nbsp;|&nbsp;\n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=4"><span class="">Търси да наеме</span></a>&nbsp;|&nbsp;\n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=5"><span class="">Заменя</span></a>&nbsp;|&nbsp;\n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=6"><span class="">Съквартиранти</span></a>\n' +
  '\n' +
  '      <a href="//www.imot.bg/pcgi/imot.cgi?act=17" class="f_right">Колко струва моят имот?</a>\n' +
  '  </div>\n' +
  '  \n' +
  '  \n' +
  '  \n' +
  '          <table width=980 cellpadding=0 cellspacing=0 border=0>\n' +
  '            <tr>\n' +
  '              <td width=680 valign="top" rowspan=2>\n' +
  '                <div style="width:660px; margin-top:15px; margin-bottom:15px;"><a data-link="//www.imot.bg/pcgi/imot.cgi?act=2&rub=2" class="clever-link navLinksTop">НОВО ТЪРСЕНЕ</a> | <a data-link="//www.imot.bg/pcgi/imot.cgi?act=2&amp;rub=2&amp;slink=aphgk0" class="clever-link navLinksTop">КОРЕКЦИЯ НА ТЪРСЕНЕТО</a></div>\n' +
  '\n' +
  '                <div style="display:inline-block; width:660px; height:26px; font-weight:bold; font-size:14px; color:#000; border-bottom:#900 3px solid; margin-bottom:0px; margin-top:10px;">\n' +
  '                  <span style="float:left">\n' +
  '                    <a class="menuSpisakSelected" href="#" onclick="javascript:document.search.act.value=3;document.search.rub.value=\'2\';document.search.submit(); return false;"></a>\n' +
  '                     <a class="menuKarta" href="#" onclick="javascript:document.search.act.value=4;document.search.submit(); return false;"></a>\n' +
  '                  </span>\n' +
  '                  <span style="display:block; float:right;"> 1 - 40 от общо 1000+ обяви - Дава под наем</span>\n' +
  '                </div>\n' +
  '\n' +
  '                \n' +
  '          <div class="regWindow" id="msg_window_search" style="padding-top:310px; display:none;">\n' +
  '            <div class="panel">\n' +
  '              <div class="formVhod" id="formVhod" style="border-radius:10px;">\n' +
  '                <a href="javascript:ShowHideSearchAboMessage(1);" class="close" title="Затвори"></a>\n' +
  '                \n' +
  '                <a href="javascript:ShowHideSearchAboMessage(1);" class="btnAnulirai">Откажи</a>\n' +
  '              </div>\n' +
  '            </div>\n' +
  '          </div>\n' +
  '          <table width=660 cellspacing=0 cellpadding=10 border=0 bgcolor="#F9F4E8" style="margin-top:10px;">\n' +
  '            <tr>\n' +
  '              <td width=405 valign="top" rowspan=2>\n' +
  '                <b><div style="font-weight:bold;">Резултат от Вашето търсене на:</div></b><br>\n' +
  '                Вид имот: <b>1-СТАЕН</b>, <b>2-СТАЕН</b>, <br>Местоположение: <b>град София</b><br><br><b>Да не се показват обяви, докладвани за проблем</b>, <p><font color="#990000">Средна цена на имотите в извадката: <b>493 euro</b><br>Средна цена на кв.м: <b>8.78 euro</b>.<br/>/Цените са определени чрез <b>средно аритметично</b>/</font></p>\n' +
  '              </td>\n' +
  '              <td style="vertical-align:top; text-align:right;">\n' +
  '                <a href="javascript:openLogPopup(1);" class="listFav">Запази филтъра</a>\n' +
  '              </td>\n' +
  '            </tr>\n' +
  '            <tr>\n' +
  '              <td style="vertical-align:bottom; text-align:right;">\n' +
  '                <div style="text-align:right; margin-top:7px; color:#900;">Страница на резултата от търсене:<br/> <input type="text" style="width:210px; padding:1px 5px; border:1px solid #900; margin-top:3px; color:#900;" value="https://www.imot.bg/aphgk0" readonly onclick="javascript:this.focus();this.select();"></div>\n' +
  '              </td>\n' +
  '            </tr>\n' +
  '          </table>\n' +
  '          \n' +
  '                \n' +
  '              <br>\n' +
  '              <table width=660 cellpadding=0 cellspacing=0 border=0>\n' +
  '                <tr>\n' +
  '                  <td width=160>\n' +
  '                    <span class="pageNumbersInfo">Страница 1 от 25</span>\n' +
  '                  </td>\n' +
  '                  <td width=500 align="right">\n' +
  '                    <span class="pageNumbersDisable">Назад</span><span class="pageNumbersSelect">1</span><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=2" class="pageNumbers">2</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=3" class="pageNumbers">3</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=4" class="pageNumbers">4</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=5" class="pageNumbers">5</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=6" class="pageNumbers">6</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=7" class="pageNumbers">7</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=8" class="pageNumbers">8</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=9" class="pageNumbers">9</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=10" class="pageNumbers">10</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=11" class="pageNumbers">Напред</a>\n' +
  '                  </td>\n' +
  '                </tr>\n' +
  '              </table>\n' +
  '              \n' +
  '                <div style="width:660px; height:10px;"></div>\n' +
  '                \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680537237723&slink=aphgk0&f1=1" class="photoLink"><img src="//cdn3.focus.bg/imot/photosimotbg/2/723/2b171680537237723_X6.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Бояна"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 400 EUR<a href="javascript:;" id="star_2b171680537237723" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680537237723&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680537237723&slink=aphgk0&f1=1" class="lnk2">град София, Бояна</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//peak.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/peak.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        35 кв.м, 2-ри ет. от 6, Агенция за недвижими имоти Peak Real Estate предлага в ново строителство едностаен апартамент в ж.к. ..., тел.: 0882988975\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680537237723&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 13 снимки</a> | <a href="javascript:;" id="notepad_2b171680537237723" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171680537237723)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171680537237723" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171680537237723)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681408513650&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/650/2b171681408513650_OY.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Витоша"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 300 EUR<a href="javascript:;" id="star_2b171681408513650" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681408513650&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681408513650&slink=aphgk0&f1=1" class="lnk2">град София, Витоша</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        50 кв.м, ID 7049  Топ локация!!! В жк Студентски град в близост до магазин Фантастико, УНСС, Студентски парк  ..., тел.: 0884235398\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681408513650&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 4 снимки</a> | <a href="javascript:;" id="notepad_2b171681408513650" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171681408513650)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171681408513650" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171681408513650)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688282759132&slink=aphgk0&f1=1" class="photoLink"><img src="//cdn3.focus.bg/imot/photosimotbg/2/132/2b171688282759132_nB.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Горна баня"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 175 EUR<a href="javascript:;" id="star_2b171688282759132" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688282759132&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688282759132&slink=aphgk0&f1=1" class="lnk2">град София, Горна баня</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        30 кв.м, ID 1548  Огледи по всяко време!!!  Отдавам под наем апартамент в кв. Карпузица.   Имота разполага с  ..., тел.: 0884881196\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688282759132&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 4 снимки</a> | <a href="javascript:;" id="notepad_2b171688282759132" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171688282759132)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171688282759132" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171688282759132)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628417040400&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic1.focus.bg/imot/photosimotbg/2/400/2b171628417040400_qo.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Дианабад"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 510 EUR<a href="javascript:;" id="star_2b171628417040400" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628417040400&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628417040400&slink=aphgk0&f1=1" class="lnk2">град София, Дианабад</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//proimo.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/proimo.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        40 кв.м, 5-ти ет. от 7, ТЕЦ, &#9745;&#65039;ТОП ИМОТ&#9745;&#65039;Чисто нов&#9745;&#65039;Предпочитана локация  ПРОИМОТИ, Ви пре ..., тел.: 0877 671 661\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628417040400&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 9 снимки</a> | <a href="javascript:;" id="notepad_2b171628417040400" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171628417040400)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171628417040400" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171628417040400)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171645234637954&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/954/2b171645234637954_tA.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Зона Б-5"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 325 EUR<a href="javascript:;" id="star_2b171645234637954" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171645234637954&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171645234637954&slink=aphgk0&f1=1" class="lnk2">град София, Зона Б-5</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//calista_estate.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/calista_estate.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        30 кв.м, 2-ри ет. от 6, Агенция за недвижими имоти Калиста Естейт има огромното удоволствие да Ви представи едностаен апарта ..., тел.: 0882419643\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171645234637954&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 7 снимки</a> | <a href="javascript:;" id="notepad_2b171645234637954" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171645234637954)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171645234637954" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171645234637954)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688274575744&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic3.focus.bg/imot/photosimotbg/2/744/2b171688274575744_wX.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Карпузица"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 175 EUR<a href="javascript:;" id="star_2b171688274575744" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688274575744&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688274575744&slink=aphgk0&f1=1" class="lnk2">град София, Карпузица</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        30 кв.м, ID 1548  Огледи по всяко време!!!  Отдавам под наем апартамент в кв. Карпузица.   Имота разполага с  ..., тел.: 0884881196\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171688274575744&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 4 снимки</a> | <a href="javascript:;" id="notepad_2b171688274575744" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171688274575744)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171688274575744" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171688274575744)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  <div id="shortList6">\n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b132636752532858&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic3.focus.bg/imot/photosimotbg/2/858/2b132636752532858_1.pic" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Лагера"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 280 EUR<a href="javascript:;" id="star_2b132636752532858" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b132636752532858&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b132636752532858&slink=aphgk0&f1=1" class="lnk2">град София, Лагера</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//lobis.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/lobis.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        35 кв.м, ул. Хризантема, 2-ри ет. от 4, Лок.отопл., Малко спретнато. ОБЗАВЕДЕНО частично без кухн.ел.уреди (хладилник,пералня и котлон по желание), жили ..., тел.: 02/9461642\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b132636752532858&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 14 снимки</a> | <a href="javascript:;" id="notepad_2b132636752532858" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b132636752532858)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b132636752532858" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b132636752532858)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  </div>\n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b164399135669004&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/004/2b164399135669004_FG.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Лагера"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 650 лв.<a href="javascript:;" id="star_2b164399135669004" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b164399135669004&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b164399135669004&slink=aphgk0&f1=1" class="lnk2">град София, Лагера</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//artalex.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/artalex.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        35 кв.м, 6-ти ет. от 10, ТЕЦ, УЮТЕН ЕДНОСТАЕН АПАРТАМЕНТ заедно със ЗАКРИТО ПАРКОМЯСТО в близост до метростанция и трамвайни спирк ..., тел.: 0888509288\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b164399135669004&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 16 снимки</a> | <a href="javascript:;" id="notepad_2b164399135669004" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b164399135669004)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b164399135669004" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b164399135669004)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679742858873&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/873/2b171679742858873_KR.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Люлин 10"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 700 лв.<a href="javascript:;" id="star_2b171679742858873" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679742858873&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679742858873&slink=aphgk0&f1=1" class="lnk2">град София, Люлин 10</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//ekip.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/ekip.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        45 кв.м, 10-ти ет. от 14, ТЕЦ, Едностаен апартамент, напълно обзаведен, нови мебели, нови ел.уреди, след основен ремонт. ЕПК строит ..., тел.: 0879889169-ЕКИП\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679742858873&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 11 снимки</a> | <a href="javascript:;" id="notepad_2b171679742858873" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171679742858873)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171679742858873" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171679742858873)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170056281609117&slink=aphgk0&f1=1" class="photoLink"><img src="//cdn3.focus.bg/imot/photosimotbg/2/117/2b170056281609117_MR.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Манастирски ливади"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        <a class="videoLinkResults" href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170056281609117#player">ВИДЕО</a> \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 800 лв.<a href="javascript:;" id="star_2b170056281609117" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170056281609117&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170056281609117&slink=aphgk0&f1=1" class="lnk2">град София, Манастирски ливади</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        &nbsp;\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        53 кв.м, 3-ти ет. от 6, 18 години агенция \'Ню Естейт\' - само 100% реални ексклузивни оферти.   Отдава се под наем обзаведен  ..., тел.: 0882 506 791\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170056281609117&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 13 снимки</a> | <a href="javascript:;" id="notepad_2b170056281609117" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b170056281609117)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b170056281609117" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b170056281609117)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680782657182&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic1.focus.bg/imot/photosimotbg/2/182/2b171680782657182_Ts.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Младост 1"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 300 EUR<a href="javascript:;" id="star_2b171680782657182" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680782657182&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680782657182&slink=aphgk0&f1=1" class="lnk2">град София, Младост 1</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//titanproperties.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/titanproperties.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        40 кв.м, 7-ми ет. от 16, ТЕЦ, Агенция за недвижими имоти Титан Пропъртис - офис Младост предлага на Вашето внимание едностаен апар ..., тел.: 0897850387\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171680782657182&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 3 снимки</a> | <a href="javascript:;" id="notepad_2b171680782657182" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171680782657182)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171680782657182" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171680782657182)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b159419861160811&slink=aphgk0&f1=1" class="photoLink"><img src="//cdn3.focus.bg/imot/photosimotbg/2/811/2b159419861160811_ro.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Овча купел"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"><img src="../images/picturess/price-up.png" style="margin-right:3px;"> 550 лв.<a href="javascript:;" id="star_2b159419861160811" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b159419861160811&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b159419861160811&slink=aphgk0&f1=1" class="lnk2">град София, Овча купел</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//nik_komers.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/nik_komers.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        28 кв.м, Партер от 7, Малко, компактно жилище в тухлена сграда, състои се от дневна, отделен кух. бокс, пералня и санитаре ..., тел.: 0896843975\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b159419861160811&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 11 снимки</a> | <a href="javascript:;" id="notepad_2b159419861160811" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b159419861160811)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b159419861160811" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b159419861160811)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171558597654666&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/666/2b171558597654666_fO.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Слатина"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"><img src="../images/picturess/price-up.png" style="margin-right:3px;"> 350 EUR<a href="javascript:;" id="star_2b171558597654666" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171558597654666&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171558597654666&slink=aphgk0&f1=1" class="lnk2">град София, Слатина</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//peak.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/peak.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        53 кв.м, 4-ти ет. от 7, Агенция за недвижими имоти Peak Real Estate предлага в панелно строителство едностаен апартамент в ж ..., тел.: 0882988975\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171558597654666&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 8 снимки</a> | <a href="javascript:;" id="notepad_2b171558597654666" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171558597654666)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171558597654666" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171558597654666)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171636170265776&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic1.focus.bg/imot/photosimotbg/2/776/2b171636170265776_fX.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"><img src="../images/picturess/price-down.png" style="margin-right:3px;"> 290 EUR<a href="javascript:;" id="star_2b171636170265776" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171636170265776&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171636170265776&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//home_center.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/home_center.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        40 кв.м, 1-ви ет. от 5, Агенция за недвижими имоти предлага едностаен апартамент  в гр. София , квартал Студентски град. Нам ..., тел.: 0877050888\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171636170265776&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 5 снимки</a> | <a href="javascript:;" id="notepad_2b171636170265776" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171636170265776)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171636170265776" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171636170265776)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681409548128&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic3.focus.bg/imot/photosimotbg/2/128/2b171681409548128_JU.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 300 EUR<a href="javascript:;" id="star_2b171681409548128" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681409548128&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681409548128&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        50 кв.м, ID 7049  Топ локация!!! В жк Студентски град в близост до магазин Фантастико, УНСС, Студентски парк  ..., тел.: 0884235398\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681409548128&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 4 снимки</a> | <a href="javascript:;" id="notepad_2b171681409548128" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171681409548128)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171681409548128" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171681409548128)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593814262644&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/644/2b171593814262644_7K.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"><img src="../images/picturess/price-down.png" style="margin-right:3px;"> 325 EUR<a href="javascript:;" id="star_2b171593814262644" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593814262644&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593814262644&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//locationhome.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/locationhome.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        30 кв.м, 9-ти ет. от 13, Представяме на Вашето внимание слънчев, едностаен апартамент в Студентски град. Жилището е в нова ту ..., тел.: 0877091930\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593814262644&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 9 снимки</a> | <a href="javascript:;" id="notepad_2b171593814262644" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171593814262644)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171593814262644" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171593814262644)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170858680675558&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic1.focus.bg/imot/photosimotbg/2/558/2b170858680675558_mB.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 348 EUR<a href="javascript:;" id="star_2b170858680675558" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170858680675558&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170858680675558&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//emotionproperty.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/emotionproperty.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        55 кв.м, 4-ти ет. от 7, Оферта номер: 2815 &#10145;&#65039; Търсите си ново жилище за живеене? Ние предлагаме! Страхотен обз ..., тел.: 0878480137\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170858680675558&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 9 снимки</a> | <a href="javascript:;" id="notepad_2b170858680675558" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b170858680675558)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b170858680675558" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b170858680675558)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171621047309725&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic1.focus.bg/imot/photosimotbg/2/725/2b171621047309725_Xm.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 349 EUR<a href="javascript:;" id="star_2b171621047309725" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171621047309725&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171621047309725&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//emotionproperty.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/emotionproperty.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        50 кв.м, 9-ти ет. от 13, Номер на оферта - 3289 Агенция за недвижими имоти ИМОУШЪН ПРОПЪРТИ Ви представяме обзаведен едностае ..., тел.: 0878480137\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171621047309725&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 6 снимки</a> | <a href="javascript:;" id="notepad_2b171621047309725" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171621047309725)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171621047309725" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171621047309725)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b168304305296832&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic3.focus.bg/imot/photosimotbg/2/832/2b168304305296832_wh.png" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 350 EUR<a href="javascript:;" id="star_2b168304305296832" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b168304305296832&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b168304305296832&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//revolution.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/revolution.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        50 кв.м, 2-ри ет. от 5, ЕКСКЛУЗИВНО ПРЕДЛОЖЕНИЕ!!! Революшън Естейт има удоволствието да ви представи едностаен апартамент в ..., тел.: 0892947748\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b168304305296832&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 7 снимки</a> | <a href="javascript:;" id="notepad_2b168304305296832" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b168304305296832)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b168304305296832" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b168304305296832)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171689189310221&slink=aphgk0&f1=1" class="photoLink"><img src="//cdn3.focus.bg/imot/photosimotbg/2/221/2b171689189310221_mq.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 700 лв.<a href="javascript:;" id="star_2b171689189310221" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171689189310221&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171689189310221&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//mgrealestate.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/mgrealestate.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        40 кв.м, 5-ти ет. от 8, MG Real Estate предлага на вашето внимание 1-стаен апартамент на ул. \'акад. Жак Натан\'   7А в кв. Ст ..., тел.: 0877747008\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171689189310221&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 10 снимки</a> | <a href="javascript:;" id="notepad_2b171689189310221" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171689189310221)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171689189310221" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171689189310221)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679784680400&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/400/2b171679784680400_Bi.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 375 EUR<a href="javascript:;" id="star_2b171679784680400" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679784680400&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679784680400&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//titan_sofia.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/titan_sofia.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        30 кв.м, 2-ри ет. от 7, Агенция за недвижими имоти Титан Пропъртис - офис Хиподрума има удоволствието да представи на Вашето ..., тел.: 0892745642\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679784680400&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 9 снимки</a> | <a href="javascript:;" id="notepad_2b171679784680400" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171679784680400)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171679784680400" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171679784680400)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628923083344&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/344/2b171628923083344_3h.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 399 EUR<a href="javascript:;" id="star_2b171628923083344" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628923083344&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628923083344&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//titanproperties.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/titanproperties.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        40 кв.м, 6-ти ет. от 7, Агенция за недвижими имоти Титан Пропъртис - офис Младост предлага на Вашето внимание едностаен апар ..., тел.: 0897850387\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628923083344&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 8 снимки</a> | <a href="javascript:;" id="notepad_2b171628923083344" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171628923083344)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171628923083344" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171628923083344)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171647404480054&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic3.focus.bg/imot/photosimotbg/2/054/2b171647404480054_BS.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 400 EUR<a href="javascript:;" id="star_2b171647404480054" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171647404480054&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171647404480054&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//emili.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/emili.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        40 кв.м, 5-ти ет. от 6, Лок.отопл., С ЮЖНО ИЗЛОЖЕНИЕ!!! ИМОТЪТ СЕ ОТДАВА ЗА ПЪРВИ ПЪТ!!! Луксозно завършен едностаен апартамент в нова с ..., тел.: 0899995927\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171647404480054&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 5 снимки</a> | <a href="javascript:;" id="notepad_2b171647404480054" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171647404480054)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171647404480054" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171647404480054)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171577196540595&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/595/2b171577196540595_xF.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 800 лв.<a href="javascript:;" id="star_2b171577196540595" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171577196540595&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171577196540595&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        &nbsp;\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        30 кв.м, ул. Йордан Йосифов, 5-ти ет. от 6, Собсвеник предлага апартамент с балкон. Обзаведен,хладилник, печка, климатик, Смарт телевизор. Цена  ..., тел.: 0887472199\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171577196540595&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 14 снимки</a> | <a href="javascript:;" id="notepad_2b171577196540595" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171577196540595)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171577196540595" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171577196540595)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593290178462&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic3.focus.bg/imot/photosimotbg/2/462/2b171593290178462_qR.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 450 EUR<a href="javascript:;" id="star_2b171593290178462" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593290178462&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593290178462&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//titanproperties.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/titanproperties.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        51 кв.м, 4-ти ет. от 6, Агенция за недвижими имоти Титан Пропъртис - офис Младост предлага на Вашето внимание едностаен апар ..., тел.: 0897850387\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171593290178462&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 6 снимки</a> | <a href="javascript:;" id="notepad_2b171593290178462" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171593290178462)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171593290178462" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171593290178462)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628445871839&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/839/2b171628445871839_9d.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Студентски град"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 510 EUR<a href="javascript:;" id="star_2b171628445871839" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628445871839&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628445871839&slink=aphgk0&f1=1" class="lnk2">град София, Студентски град</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//proimo.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/proimo.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        40 кв.м, бул. Д-р Г. М. Димитров, 5-ти ет. от 7, ТЕЦ, &#9745;&#65039;ТОП ИМОТ&#9745;&#65039;Чисто нов&#9745;&#65039;Предпочитана локация  ПРОИМОТИ, Ви пре ..., тел.: 0877 671 661\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171628445871839&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 9 снимки</a> | <a href="javascript:;" id="notepad_2b171628445871839" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171628445871839)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171628445871839" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171628445871839)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696767940820&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/820/2b171696767940820_rH.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Сухата река"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 350 EUR<a href="javascript:;" id="star_2b171696767940820" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696767940820&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696767940820&slink=aphgk0&f1=1" class="lnk2">град София, Сухата река</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        50 кв.м, ИД1561  Просторен едностаен апартамент в кв. Сухата река се дава под наем.  Имотът се намира на пеше ..., тел.: 0884233657\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696767940820&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 5 снимки</a> | <a href="javascript:;" id="notepad_2b171696767940820" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171696767940820)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171696767940820" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171696767940820)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696780082854&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/854/2b171696780082854_Mp.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Хаджи Димитър"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 350 EUR<a href="javascript:;" id="star_2b171696780082854" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696780082854&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696780082854&slink=aphgk0&f1=1" class="lnk2">град София, Хаджи Димитър</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        50 кв.м, ИД1561  Просторен едностаен апартамент в кв. Сухата река се дава под наем.  Имотът се намира на пеше ..., тел.: 0884233657\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171696780082854&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 5 снимки</a> | <a href="javascript:;" id="notepad_2b171696780082854" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171696780082854)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171696780082854" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171696780082854)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170660872939096&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/096/2b170660872939096_xw.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Център"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 225 EUR<a href="javascript:;" id="star_2b170660872939096" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170660872939096&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170660872939096&slink=aphgk0&f1=1" class="lnk2">град София, Център</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//gproperty.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/gproperty.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        20 кв.м, 2-ри ет. от 5, Предложение без аналог! \'G-property\' представя чудесен едностаен апартамен подходящ за сам човек. Жи ..., тел.: 0877004888\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b170660872939096&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 5 снимки</a> | <a href="javascript:;" id="notepad_2b170660872939096" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b170660872939096)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b170660872939096" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b170660872939096)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171697688193737&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/737/2b171697688193737_I5.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Център"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 275 EUR<a href="javascript:;" id="star_2b171697688193737" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171697688193737&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171697688193737&slink=aphgk0&f1=1" class="lnk2">град София, Център</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        30 кв.м, ID-1516  Топ локация!!! На ул.Панагюрище до метростанция Лъвов мост, 29 СУ Кузман Шапкарев и хиперма ..., тел.: 0882055375\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171697688193737&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 5 снимки</a> | <a href="javascript:;" id="notepad_2b171697688193737" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171697688193737)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171697688193737" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171697688193737)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b143252418517926&slink=aphgk0&f1=1" class="photoLink"><img src="../images/picturess/photo_big.gif" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Център"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 300 EUR<a href="javascript:;" id="star_2b143252418517926" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b143252418517926&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b143252418517926&slink=aphgk0&f1=1" class="lnk2">град София, Център</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        &nbsp;\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        52 кв.м, 2-ри ет. от 4, ТЕЦ, Обзаведено непреходно вътрешно жилище в тухлена сграда до МС\'НДК. Състои се от антре,спалня/хол ,отд ..., тел.: 0878899118\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b143252418517926&slink=aphgk0&f1=1" class="lnk3">Повече детайли</a> | <a href="javascript:;" id="notepad_2b143252418517926" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b143252418517926)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b143252418517926" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b143252418517926)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681338276111&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/111/2b171681338276111_vw.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Център"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"><img src="../images/picturess/price-up.png" style="margin-right:3px;"> 600 лв.<a href="javascript:;" id="star_2b171681338276111" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681338276111&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681338276111&slink=aphgk0&f1=1" class="lnk2">град София, Център</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        &nbsp;\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        35 кв.м, Партер от 3, Айко имоти отдава поднаем едностаен апартамент в идеалния център на София. Жилището се намира на ул. ..., тел.: 0877111144\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171681338276111&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 9 снимки</a> | <a href="javascript:;" id="notepad_2b171681338276111" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171681338276111)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171681338276111" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171681338276111)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679459616906&slink=aphgk0&f1=1" class="photoLink"><img src="//cdn3.focus.bg/imot/photosimotbg/2/906/2b171679459616906_Jr.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 1-стаен, град София, Център"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 350 EUR<a href="javascript:;" id="star_2b171679459616906" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679459616906&slink=aphgk0&f1=1" class="lnk1">Дава под наем 1-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679459616906&slink=aphgk0&f1=1" class="lnk2">град София, Център</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//mirela.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/mirela.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        28 кв.м, Партер от 4, 441835 Офертата е само за частни лица!  Давам под наем СТУДИО в центъра. В наемната цена са включени ..., тел.: 0883942528\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2b171679459616906&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 10 снимки</a> | <a href="javascript:;" id="notepad_2b171679459616906" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2b171679459616906)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2b171679459616906" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2b171679459616906)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171696619257274&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/274/2c171696619257274_uE.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 2-стаен, град София, Банишора"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 375 EUR<a href="javascript:;" id="star_2c171696619257274" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171696619257274&slink=aphgk0&f1=1" class="lnk1">Дава под наем 2-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171696619257274&slink=aphgk0&f1=1" class="lnk2">град София, Банишора</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        85 кв.м, ID 178  Топ локация!!!   &#127968; Очарователен двустаен апартамент под наем в сърцето на Банишора!  ..., тел.: 0884235446\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171696619257274&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 3 снимки</a> | <a href="javascript:;" id="notepad_2c171696619257274" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2c171696619257274)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2c171696619257274" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2c171696619257274)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171534441187116&slink=aphgk0&f1=1" class="photoLink"><img src="../images/picturess/photo_big.gif" width=200 height=150 border=0 alt="Обява дава под наем 2-стаен, град София, Банишора"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 700 лв.<div style="mergin-top:2px; font-size:11px; font-weight:normal; color:#000;">Цената е без ДДС</div><a href="javascript:;" id="star_2c171534441187116" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171534441187116&slink=aphgk0&f1=1" class="lnk1">Дава под наем 2-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171534441187116&slink=aphgk0&f1=1" class="lnk2">град София, Банишора</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        &nbsp;\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        60 кв.м, ул. Лютиброд, 1-ви ет. от 2, Имота се намира в стабилна сграда и се сьстои от светьл хол, холна стая, кухня, баня/тоалет и коридо ..., тел.: 089/9827677\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171534441187116&slink=aphgk0&f1=1" class="lnk3">Повече детайли</a> | <a href="javascript:;" id="notepad_2c171534441187116" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2c171534441187116)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2c171534441187116" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2c171534441187116)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171525312753759&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/759/2c171525312753759_pL.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 2-стаен, град София, Банишора"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 450 EUR<a href="javascript:;" id="star_2c171525312753759" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171525312753759&slink=aphgk0&f1=1" class="lnk1">Дава под наем 2-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171525312753759&slink=aphgk0&f1=1" class="lnk2">град София, Банишора</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//calista_estate.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/calista_estate.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        42 кв.м, 12-ти ет. от 18, Агенция за недвижими имоти Калиста Естейт има огромното удоволствие да ви представи двустаен апартам ..., тел.: 0882419643\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171525312753759&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 7 снимки</a> | <a href="javascript:;" id="notepad_2c171525312753759" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2c171525312753759)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2c171525312753759" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2c171525312753759)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c160735575746639&slink=aphgk0&f1=1" class="photoLink"><img src="//cdn3.focus.bg/imot/photosimotbg/2/639/2d160735575746639_9J.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 2-стаен, град София, Банишора"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"><img src="../images/picturess/price-up.png" style="margin-right:3px;"> 450 EUR<a href="javascript:;" id="star_2c160735575746639" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c160735575746639&slink=aphgk0&f1=1" class="lnk1">Дава под наем 2-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c160735575746639&slink=aphgk0&f1=1" class="lnk2">град София, Банишора</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        &nbsp;\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        66 кв.м, 3-ти ет. от 6, Двустаен с отделна кухня Нова сграда с ново обзавеждане. Кухня с вградени електроуреди, хол с диван, ..., тел.: 0886391021\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c160735575746639&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 6 снимки</a> | <a href="javascript:;" id="notepad_2c160735575746639" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2c160735575746639)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2c160735575746639" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2c160735575746639)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171697729331592&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/592/2c171697729331592_Va.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 2-стаен, град София, Банишора"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 500 EUR<a href="javascript:;" id="star_2c171697729331592" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171697729331592&slink=aphgk0&f1=1" class="lnk1">Дава под наем 2-СТАЕН</a><img src="../images/picturess/no.gif" width=5 height=1 border=0><font style="font-size:10px; color:#F00;">/нова обява/</font><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171697729331592&slink=aphgk0&f1=1" class="lnk2">град София, Банишора</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        70 кв.м, ID-1522  Топ локация!!! В Банишора на ул. Клокотница до метростанция Лъвов мост, Хотел Рамада и 48 О ..., тел.: 0882055375\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171697729331592&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 7 снимки</a> | <a href="javascript:;" id="notepad_2c171697729331592" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2c171697729331592)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2c171697729331592" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2c171697729331592)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171018740030281&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic2.focus.bg/imot/photosimotbg/2/281/2b171018740030281_aW.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 2-стаен, град София, Банишора"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 550 EUR<a href="javascript:;" id="star_2c171018740030281" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171018740030281&slink=aphgk0&f1=1" class="lnk1">Дава под наем 2-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171018740030281&slink=aphgk0&f1=1" class="lnk2">град София, Банишора</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//south_park.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/south_park.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        60 кв.м, 2-ри ет. от 5, Агенция \'Явлена\' предлага под наем прекрасен двустаен апартамент, в който още никой не е живял. Апар ..., тел.: 0892545600\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171018740030281&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 11 снимки</a> | <a href="javascript:;" id="notepad_2c171018740030281" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2c171018740030281)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2c171018740030281" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2c171018740030281)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '  <table width=660 cellspacing=0 cellpadding=0 border=0 style="margin-bottom:0px; border-top:#990000 1px solid; background:url(../images/picturess/top_bg.gif); background-position:bottom; background-repeat:repeat-x;">\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td rowspan=2 valign="top" width=220>\n' +
  '        \n' +
  '      <table width=212 cellspacing=0 cellpadding=0 border=0>\n' +
  '        <tr>\n' +
  '          <td align="center" valign="top"><a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171342729988366&slink=aphgk0&f1=1" class="photoLink"><img src="//imotstatic4.focus.bg/imot/photosimotbg/2/366/2c171342729988366_eT.jpg" style="object-fit: cover;" width=200 height=150 border=0 alt="Обява дава под наем 2-стаен, град София, Белите брези"></a></td>\n' +
  '        </tr>\n' +
  '      </table>\n' +
  '      \n' +
  '        \n' +
  '      </td>\n' +
  '      <td valign="top" width=270 height=40 style="padding-left:4px">\n' +
  '        <div class="price"> 450 EUR<a href="javascript:;" id="star_2c171342729988366" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class="favListItem"></a> </div><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171342729988366&slink=aphgk0&f1=1" class="lnk1">Дава под наем 2-СТАЕН</a><br>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171342729988366&slink=aphgk0&f1=1" class="lnk2">град София, Белите брези</a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=60 height=40>\n' +
  '        <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" target="_blank"><img src="../images/picturess/icons/top.svg" width=60 height=60 border=0></a>\n' +
  '      </td>\n' +
  '      <td align="right" valign="top" width=110 height=40>\n' +
  '        <a href="//upravlenie.imot.bg" class="logoLink" target="_blank"><img src="../images/logos/med/upravlenie.pic" style="width:100px; height: 37px; object-fit: contain;" border=0 alt="Детайлен преглед"></a>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr>\n' +
  '      <td width=520 colspan=3 height=50 style="padding-left:4px">\n' +
  '        70 кв.м, ID-1537  Топ локация!!! До хипермаркет Фантастико  Представяме Ви просторен и уютен двустаен апартам ..., тел.: 0884233378\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    \n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=5 border=0></td></tr>\n' +
  '    <tr>\n' +
  '      <td colspan=4>\n' +
  '        <table width=660 cellspacing=0 cellpadding=0 border=0>\n' +
  '          <tr>\n' +
  '            <td width=330 style="padding-left:4px">\n' +
  '              <a href="//www.imot.bg/pcgi/imot.cgi?act=5&adv=2c171342729988366&slink=aphgk0&f1=1" class="lnk3">Повече детайли и 7 снимки</a> | <a href="javascript:;" id="notepad_2c171342729988366" onclick="javascript:openLogPopup(1); return false;" title="Добави обявата в бележника. Изисква регистрация." class=lnk3>Добави в бележника</a>\n' +
  '            </td>\n' +
  '            <td width=330 align="right">\n' +
  '              <a href="javascript:;" class=lnk3 onClick="javascript:mark(p2c171342729988366)">Маркиране/Размаркиране на Обявата</a> <a href="javascript:;" class=lnk3><img name=\n' +
  '                   "p2c171342729988366" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ОБЯВАТА" onClick="javascript:mark(p2c171342729988366)" align="absmiddle"></a>\n' +
  '            </td>\n' +
  '          </tr>\n' +
  '        </table>\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '    <tr><td colspan=4><img src="../images/picturess/no.gif" width=1 height=10 border=0></td></tr>\n' +
  '  </table>\n' +
  '  \n' +
  '              <table width=660 border=0 cellspacing=0 cellpadding=0><tr><td style="border-top:1px solid #900"><img src="../images/picturess/no.gif" width=1 height=1 border=0></td></tr></table>\n' +
  '              <div style="margin-top:5px;"><a href="https://www.imoti.com/pcgi/results.cgi?pn=2&pubtype=2~3~&nraion=43&sraion=" class="qLinks12" target="_blank">Вижте още обяви 1-СТАЕН, 2-СТАЕН,  град София</a></div>\n' +
  '              <br>\n' +
  '              <table width=660 border=0 cellspacing=0 cellpadding=0 bgcolor="#990000">\n' +
  '                <tr>\n' +
  '                  <td width=18 height=18 align="center">\n' +
  '                    <a href="javascript:printselob()"><img src="../images/picturess/print.gif" width=14 height=14 border=0 alt="Преглед и Печат на Маркираните Обяви"></a>\n' +
  '                  </td>\n' +
  '                  <td width=374 height=18>\n' +
  '                    <img src="../images/picturess/no.gif" width=5 height=1 border=0><a href="javascript:printselob()"><font color="#FFFFFF"><b>Преглед и Печат на Маркираните Обяви</b></font></a>\n' +
  '                  </td>\n' +
  '                  <td width=250 height=18 align="right"><a href="javascript:;" onclick="javascript:markall()"><font color="#FFFFFF"><b>Маркиране на Всички Обяви</b></font></a><img src="../images/picturess/no.gif" width=5 height=1 border=0></td>\n' +
  '                  <td width=18 height=18 align="center"><img name="printall" src="../images/picturess/print_n.gif" width=15 height=14 border=0 alt="МАРКИРАЙ ВСИЧКИ ОБЯВИ" onclick="javascript:markall()"></td>\n' +
  '                </tr>\n' +
  '              </table>\n' +
  '              \n' +
  '                <div style="width:660px; margin-top:15px;"><a href="//www.imot.bg/pcgi/imot.cgi?act=2&rub=2" class="navLinks">НОВО ТЪРСЕНЕ</a> | <a href="//www.imot.bg/pcgi/imot.cgi?act=2&amp;rub=2&amp;slink=aphgk0" class="navLinks">КОРЕКЦИЯ НА ТЪРСЕНЕТО</a></div>\n' +
  '                \n' +
  '              <br>\n' +
  '              <table width=660 cellpadding=0 cellspacing=0 border=0>\n' +
  '                <tr>\n' +
  '                  <td width=160>\n' +
  '                    <span class="pageNumbersInfo">Страница 1 от 25</span>\n' +
  '                  </td>\n' +
  '                  <td width=500 align="right">\n' +
  '                    <span class="pageNumbersDisable">Назад</span><span class="pageNumbersSelect">1</span><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=2" class="pageNumbers">2</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=3" class="pageNumbers">3</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=4" class="pageNumbers">4</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=5" class="pageNumbers">5</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=6" class="pageNumbers">6</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=7" class="pageNumbers">7</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=8" class="pageNumbers">8</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=9" class="pageNumbers">9</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=10" class="pageNumbers">10</a><a href="//www.imot.bg/pcgi/imot.cgi?act=3&amp;slink=aphgk0&amp;f1=11" class="pageNumbers">Напред</a>\n' +
  '                  </td>\n' +
  '                </tr>\n' +
  '              </table>\n' +
  '              \n' +
  '              </td>\n' +
  '              <td width=300 valign="top">\n' +
  '                <div style="height:15px;"></div>\n' +
  '                <div id=\'div-gpt-ad-1695109122618-0\' style=\'min-width: 300px; min-height: 250px;\'>\n' +
  '                  <script>\n' +
  '                    googletag.cmd.push(function() { googletag.display(\'div-gpt-ad-1695109122618-0\'); });\n' +
  '                  </script>\n' +
  '                </div>\n' +
  '                <div style="margin-top:15px;"><a href="/pcgi/imot.cgi?act=17" target="_blank"><img src="../images/picturess/kolko_struva_original_gif_300x80.gif" width=300 height=80 border=0></a></div>\n' +
  '                <br><a href="/pcgi/imot.cgi?act=19" target="_blank"><img src="../images/picturess/decprices300x90.jpg" width=300 height=90 border=0></a>\n' +
  '                \n' +
  '              <div class="sticky_banner" id="div-gpt-ad-1695109748314-0" style=\'min-width: 300px; min-height: 250px;\'>\n' +
  '                <script>\n' +
  '                  googletag.cmd.push(function() { googletag.display(\'div-gpt-ad-1695109748314-0\'); });\n' +
  '                </script>\n' +
  '              </div>\n' +
  '              </td>\n' +
  '            </tr>\n' +
  '            <tr>\n' +
  '              <td width=300 valign="bottom">\n' +
  '                <div class="see_more_last">&nbsp;</div>\n' +
  '              </td>\n' +
  '            </tr>\n' +
  '          </table>\n' +
  '          <table width=980 cellspacing=0 cellpadding=0 border=0 style="margin-top:10px;">\n' +
  '            <tr>\n' +
  '              <td>\n' +
  '                <div id=\'div-gpt-ad-1695110102688-0\' style=\'min-width: 728px; min-height: 90px;\'>\n' +
  '                  <script>\n' +
  '                    googletag.cmd.push(function() { googletag.display(\'div-gpt-ad-1695110102688-0\'); });\n' +
  '                  </script>\n' +
  '                </div>\n' +
  '              </td>\n' +
  '            </tr>\n' +
  '          </table>\n' +
  '\n' +
  '          <form name="printsel" method="post" action="/pcgi/printsel.cgi" target="_blank" style="margin: 0px; padding: 0px;">\n' +
  '            <input type="hidden" name="sel" value="">\n' +
  '          </form>\n' +
  '          <form name="search" method="post" action="/pcgi/imot.cgi" style="margin: 0px; padding: 0px;">\n' +
  '          <input type="hidden" name="act" value="3">\n' +
  '          <input type="hidden" name="fltr" value="0">\n' +
  '          <input type="hidden" name="rub" value="2">\n' +
  '          <input type="hidden" name="adv" value="">\n' +
  '          <input type="hidden" name="topmenu" value="2">\n' +
  '          <input type="hidden" name="rub_pub_save" value="2">\n' +
  '          <input type="hidden" name="filter_name" value="">\n' +
  '          <input type="hidden" name="abonament_flag" value="1">\n' +
  '          <input type="hidden" name="f0" value="62.73.72.124">\n' +
  '<input type="hidden" name="f1" value="1">\n' +
  '<input type="hidden" name="f2" value="">\n' +
  '<input type="hidden" name="f3" value="">\n' +
  '<input type="hidden" name="f4" value="1">\n' +
  '<input type="hidden" name="f5" value="">\n' +
  '<input type="hidden" name="f6" value="">\n' +
  '<input type="hidden" name="f7" value="2~3~">\n' +
  '<input type="hidden" name="f8" value="">\n' +
  '<input type="hidden" name="f9" value="">\n' +
  '<input type="hidden" name="f10" value="">\n' +
  '<input type="hidden" name="f11" value="">\n' +
  '<input type="hidden" name="f12" value="">\n' +
  '<input type="hidden" name="f13" value="">\n' +
  '<input type="hidden" name="f14" value="">\n' +
  '<input type="hidden" name="f15" value="">\n' +
  '<input type="hidden" name="f16" value="">\n' +
  '<input type="hidden" name="f17" value="">\n' +
  '<input type="hidden" name="f18" value="">\n' +
  '<input type="hidden" name="f19" value="">\n' +
  '<input type="hidden" name="f20" value="">\n' +
  '<input type="hidden" name="f21" value="">\n' +
  '<input type="hidden" name="f22" value="">\n' +
  '<input type="hidden" name="f23" value="">\n' +
  '<input type="hidden" name="f24" value="">\n' +
  '<input type="hidden" name="f25" value="">\n' +
  '<input type="hidden" name="f26" value="">\n' +
  '<input type="hidden" name="f27" value="">\n' +
  '<input type="hidden" name="f28" value="">\n' +
  '<input type="hidden" name="f29" value="">\n' +
  '<input type="hidden" name="f30" value="EUR">\n' +
  '<input type="hidden" name="f31" value="">\n' +
  '<input type="hidden" name="f32" value="">\n' +
  '<input type="hidden" name="f33" value="">\n' +
  '<input type="hidden" name="f34" value="">\n' +
  '<input type="hidden" name="f35" value="">\n' +
  '<input type="hidden" name="f36" value="">\n' +
  '<input type="hidden" name="f37" value="">\n' +
  '<input type="hidden" name="f38" value="град София">\n' +
  '<input type="hidden" name="f39" value="">\n' +
  '<input type="hidden" name="f40" value="">\n' +
  '<input type="hidden" name="f41" value="1">\n' +
  '<input type="hidden" name="f42" value="">\n' +
  '<input type="hidden" name="f43" value="">\n' +
  '<input type="hidden" name="f44" value="">\n' +
  '<input type="hidden" name="f45" value="">\n' +
  '<input type="hidden" name="f46" value="">\n' +
  '<input type="hidden" name="f47" value="">\n' +
  '<input type="hidden" name="f48" value="">\n' +
  '<input type="hidden" name="f49" value="">\n' +
  '<input type="hidden" name="f50" value="">\n' +
  '<input type="hidden" name="f51" value="">\n' +
  '<input type="hidden" name="f52" value="">\n' +
  '<input type="hidden" name="f53" value="0">\n' +
  '<input type="hidden" name="f54" value="">\n' +
  '<input type="hidden" name="f55" value="">\n' +
  '<input type="hidden" name="srcena0" value="965.027972027972">\n' +
  '<input type="hidden" name="srcena1" value="17.17933744952">\n' +
  '<input type="hidden" name="fe0" value="0">\n' +
  '<input type="hidden" name="fe1" value="">\n' +
  '<input type="hidden" name="fe2" value="1">\n' +
  '<input type="hidden" name="fe3" value="">\n' +
  '<input type="hidden" name="fe4" value="">\n' +
  '<input type="hidden" name="fe5" value="0">\n' +
  '<input type="hidden" name="fe6" value="0">\n' +
  '<input type="hidden" name="fe7" value="0">\n' +
  '<input type="hidden" name="fe8" value="">\n' +
  '<input type="hidden" name="fe9" value="0">\n' +
  '<input type="hidden" name="slink" value="aphgk0">\n' +
  '\n' +
  '          \n' +
  '          </form>\n' +
  '          \n' +
  '      \n' +
  '  <div class="footerLinks">\n' +
  '    <div style="height:25px; line-height:25px; font-weight:bold; font-size:14px; border-bottom:#900 3px solid; margin-bottom:10px;">\n' +
  '      Преглед на обявите за недвижими имоти по градове\n' +
  '    </div>\n' +
  '    <a href="//imoti-aksakovo.imot.bg" title="Имоти Аксаково">Аксаково</a>\n' +
  '    <a href="//imoti-asenovgrad.imot.bg" title="Имоти Асеновград">Асеновград</a>\n' +
  '    <a href="//imoti-aheloy.imot.bg" title="Имоти Ахелой">Ахелой</a>\n' +
  '    <a href="//imoti-ahtopol.imot.bg" title="Имоти Ахтопол">Ахтопол</a>\n' +
  '    <a href="//imoti-balchik.imot.bg" title="Имоти Балчик">Балчик</a>\n' +
  '    <a href="//imoti-bansko.imot.bg" title="Имоти Банско">Банско</a>\n' +
  '    <a href="//imoti-batak-pazardjik.imot.bg" title="Имоти Батак">Батак</a>\n' +
  '    <a href="//imoti-belene.imot.bg" title="Имоти Белене">Белене</a>\n' +
  '    <a href="//imoti-belogradchik.imot.bg" title="Имоти Белоградчик">Белоградчик</a>\n' +
  '    <a href="//imoti-berkovica.imot.bg" title="Имоти Берковица">Берковица</a>\n' +
  '    <a href="//imoti-blagoevgrad.imot.bg" title="Имоти Благоевград">Благоевград</a>\n' +
  '    <a href="//imoti-bracigovo.imot.bg" title="Имоти Брацигово">Брацигово</a>\n' +
  '    <a href="//imoti-burgas.imot.bg" title="Имоти Бургас">Бургас</a>\n' +
  '    <a href="//imoti-biala-ruse.imot.bg" title="Имоти Бяла">Бяла</a>\n' +
  '    <a href="//imoti-biala-slatina.imot.bg" title="Имоти Бяла Слатина">Бяла Слатина</a>\n' +
  '    <a href="//imoti-varna.imot.bg" title="Имоти Варна">Варна</a>\n' +
  '    <a href="//imoti-veliki-preslav.imot.bg" title="Имоти Велики Преслав">Велики Преслав</a>\n' +
  '    <a href="//imoti-veliko-tarnovo.imot.bg" title="Имоти Велико Търново">Велико Търново</a>\n' +
  '    <a href="//imoti-velingrad.imot.bg" title="Имоти Велинград">Велинград</a>\n' +
  '    <a href="//imoti-vidin.imot.bg" title="Имоти Видин">Видин</a>\n' +
  '    <a href="//imoti-vratza.imot.bg" title="Имоти Враца">Враца</a>\n' +
  '    <a href="//imoti-valchidol.imot.bg" title="Имоти Вълчи дол">Вълчи дол</a>\n' +
  '    <a href="//imoti-varshec.imot.bg" title="Имоти Вършец">Вършец</a>\n' +
  '    <a href="//imoti-gabrovo.imot.bg" title="Имоти Габрово">Габрово</a>\n' +
  '    <a href="//imoti-general-toshevo.imot.bg" title="Имоти Генерал Тошево">Генерал Тошево</a>\n' +
  '    <a href="//imoti-gorna-oriahovica.imot.bg" title="Имоти Горна Оряховица">Горна Оряховица</a>\n' +
  '    <a href="//imoti-goce-delchev.imot.bg" title="Имоти Гоце Делчев">Гоце Делчев</a>\n' +
  '    <a href="//imoti-devin.imot.bg" title="Имоти Девин">Девин</a>\n' +
  '    <a href="//imoti-devnia.imot.bg" title="Имоти Девня">Девня</a>\n' +
  '    <a href="//imoti-dimitrovgrad.imot.bg" title="Имоти Димитровград">Димитровград</a>\n' +
  '    <a href="//imoti-dobrich.imot.bg" title="Имоти Добрич">Добрич</a>\n' +
  '    <a href="//imoti-drianovo-gabrovo.imot.bg" title="Имоти Дряново">Дряново</a>\n' +
  '    <a href="//imoti-dulovo.imot.bg" title="Имоти Дулово">Дулово</a>\n' +
  '    <a href="//imoti-dupnica.imot.bg" title="Дупница">Дупница</a>\n' +
  '    <a href="//imoti-elena-veliko-tarnovo.imot.bg" title="Имоти Елена">Елена</a>\n' +
  '    <a href="//imoti-elin-pelin.imot.bg" title="Имоти Елин Пелин">Елин Пелин</a>\n' +
  '    <a href="//imoti-kavarna.imot.bg" title="Имоти Каварна">Каварна</a>\n' +
  '    <a href="//imoti-kazanlak.imot.bg" title="Имоти Казанлък">Казанлък</a>\n' +
  '    <a href="//imoti-karlovo.imot.bg" title="Имоти Карлово">Карлово</a>\n' +
  '    <a href="//imoti-karnobat.imot.bg" title="Имоти Карнобат">Карнобат</a>\n' +
  '    <a href="//imoti-kardjali.imot.bg" title="Имоти Кърджали">Кърджали</a>\n' +
  '    <a href="//imoti-kustendil.imot.bg" title="Кюстендил">Кюстендил</a>\n' +
  '    <a href="//imoti-lovech.imot.bg" title="Имоти Ловеч">Ловеч</a>\n' +
  '    <a href="//imoti-mezdra.imot.bg" title="Имоти Мездра">Мездра</a>\n' +
  '    <a href="//imoti-melnik.imot.bg" title="Имоти Мелник">Мелник</a>\n' +
  '    <a href="//imoti-montana.imot.bg" title="Имоти Монтана">Монтана</a>\n' +
  '    <a href="//imoti-nesebar.imot.bg" title="Имоти Несебър">Несебър</a>\n' +
  '    <a href="//imoti-nikopol.imot.bg" title="Имоти Никопол">Никопол</a>\n' +
  '    <a href="//imoti-nova-zagora.imot.bg" title="Имоти Нова Загора">Нова Загора</a>\n' +
  '    <a href="//imoti-panagiurishte.imot.bg" title="Имоти Панагюрище">Панагюрище</a>\n' +
  '    <a href="//imoti-pernik.imot.bg" title="Имоти Перник">Перник</a>\n' +
  '    <a href="//imoti-petrich-blagoevgrad.imot.bg" title="Имоти Петрич">Петрич</a>\n' +
  '    <a href="//imoti-peshtera-pazardjik.imot.bg" title="Имоти Пещера">Пещера</a>\n' +
  '    <a href="//imoti-pirdop.imot.bg" title="Имоти Пирдоп">Пирдоп</a>\n' +
  '    <a href="//imoti-pleven.imot.bg" title="Имоти Плевен">Плевен</a>\n' +
  '    <a href="//imoti-plovdiv.imot.bg" title="Имоти Пловдив">Пловдив</a>\n' +
  '    <a href="//imoti-polski-trambesh.imot.bg" title="Имоти Полски Тръмбеш">Полски Тръмбеш</a>\n' +
  '    <a href="//imoti-pomorie.imot.bg" title="Имоти Поморие">Поморие</a>\n' +
  '    <a href="//imoti-pravec.imot.bg" title="Имоти Правец">Правец</a>\n' +
  '    <a href="//imoti-primorsko.imot.bg" title="Имоти Приморско">Приморско</a>\n' +
  '    <a href="//imoti-razgrad.imot.bg" title="Имоти Разград">Разград</a>\n' +
  '    <a href="//imoti-razlog.imot.bg" title="Имоти Разлог">Разлог</a>\n' +
  '    <a href="//imoti-ruse.imot.bg" title="Имоти Русе">Русе</a>\n' +
  '    <a href="//imoti-sandanski.imot.bg" title="Имоти Сандански">Сандански</a>\n' +
  '    <a href="//imoti-svilengrad.imot.bg" title="Имоти Свиленград">Свиленград</a>\n' +
  '    <a href="//imoti-svishtov.imot.bg" title="Имоти Свищов">Свищов</a>\n' +
  '    <a href="//imoti-svoge.imot.bg" title="Имоти Своге">Своге</a>\n' +
  '    <a href="//imoti-sevlievo.imot.bg" title="Имоти Севлиево">Севлиево</a>\n' +
  '    <a href="//imoti-silistra.imot.bg" title="Имоти Силистра">Силистра</a>\n' +
  '    <a href="//imoti-sliven.imot.bg" title="Имоти Сливен">Сливен</a>\n' +
  '    <a href="//imoti-slivnica-sofia.imot.bg" title="Имоти Сливница">Сливница</a>\n' +
  '    <a href="//imoti-smolian.imot.bg" title="Имоти Смолян">Смолян</a>\n' +
  '    <a href="//imoti-sozopol.imot.bg" title="Имоти Созопол">Созопол</a>\n' +
  '    <a href="//imoti-sopot-lovech.imot.bg" title="Имоти Сопот">Сопот</a>\n' +
  '    <a href="//imoti-sofia.imot.bg" title="Имоти София">София</a>\n' +
  '    <a href="//imoti-stara-zagora.imot.bg" title="Имоти Стара Загора">Стара Загора</a>\n' +
  '    <a href="//imoti-teteven.imot.bg" title="Имоти Тетевен">Тетевен</a>\n' +
  '    <a href="//imoti-troian-lovech.imot.bg" title="Имоти Троян">Троян</a>\n' +
  '    <a href="//imoti-triavna.imot.bg" title="Имоти Трявна">Трявна</a>\n' +
  '    <a href="//imoti-targovishte.imot.bg" title="Имоти Търговище">Търговище</a>\n' +
  '    <a href="//imoti-haskovo.imot.bg" title="Имоти Хасково">Хасково</a>\n' +
  '    <a href="//imoti-hisaria.imot.bg" title="Имоти Хисаря">Хисаря</a>\n' +
  '    <a href="//imoti-carevo.imot.bg" title="Имоти Царево">Царево</a>\n' +
  '    <a href="//imoti-cherven-briag.imot.bg"" title="Имоти Червен бряг">Червен бряг</a>\n' +
  '    <a href="//imoti-chernomorec.imot.bg" title="Имоти Черноморец">Черноморец</a>\n' +
  '    <a href="//imoti-shabla.imot.bg" title="Имоти Шабла">Шабла</a>\n' +
  '    <a href="//imoti-shumen.imot.bg" title="Имоти Шумен">Шумен</a>\n' +
  '    <a href="//imoti-iablanica-lovech.imot.bg" title="Имоти Ябланица">Ябланица</a>\n' +
  '    <a href="//imoti-yambol.imot.bg" title="Имоти Ямбол">Ямбол</a>\n' +
  '  </div>\n' +
  '  <div class="footerLinks" style="margin-top: 10px">\n' +
  '    <div style="height:25px; line-height:25px; font-weight:bold; font-size:14px; border-bottom:#900 3px solid; margin-bottom:10px;">\n' +
  '      Преглед на обявите за имоти от Гърция\n' +
  '    </div>\n' +
  '    <a href="//imoti-argolis.imot.bg/pcgi/imot.cgi" title="Арголида">Арголида</a>\n' +
  '    <a href="//imoti-athens.imot.bg" title="Атина">Атина</a>\n' +
  '    <a href="//imoti-achaea.imot.bg" title="Ахая">Ахая</a>\n' +
  '    <a href="//imoti-drama.imot.bg" title="Драма">Драма</a>\n' +
  '    <a href="//imoti-euboea.imot.bg" title="Евбея">Евбея</a>\n' +
  '    <a href="//imoti-zakynthos.imot.bg" title="Закинтос">Закинтос</a>\n' +
  '    <a href="//imoti-eastern-attica.imot.bg" title="Източна Атика">Източна Атика</a>\n' +
  '    <a href="//imoti-kavala.imot.bg" title="Кавала">Кавала</a>\n' +
  '    <a href="//imoti-cephalonia-ithaca.imot.bg" title="Кефалония и Итака">Кефалония и Итака</a>\n' +
  '    <a href="//imoti-corfu.imot.bg" title="Корфу">Корфу</a>\n' +
  '    <a href="//imoti-xanthi.imot.bg" title="Ксанти">Ксанти</a>\n' +
  '    <a href="//imoti-larissa.imot.bg" title="Лариса">Лариса</a>\n' +
  '    <a href="//imoti-lasithi.imot.bg" title="Ласити">Ласити</a>\n' +
  '    <a href="//imoti-lefkada.imot.bg" title="Левкада">Левкада</a>\n' +
  '    <a href="//imoti-pieria.imot.bg" title="Пиерия">Пиерия</a>\n' +
  '    <a href="//imoti-rhodopes.imot.bg" title="Родопи">Родопи</a>\n' +
  '    <a href="//imoti-thessaloniki.imot.bg" title="Солун">Солун</a>\n' +
  '    <a href="//imoti-serres.imot.bg" title="Сяр">Сяр</a>\n' +
  '    <a href="//imoti-phthiotide.imot.bg" title="Фтиотида">Фтиотида</a>\n' +
  '    <a href="//imoti-halkidiki.imot.bg" title=""Халкидики>Халкидики</a>\n' +
  '    <a href="//imoti-chania.imot.bg" title="Ханя">Ханя</a>\n' +
  '    <a href="//imoti-cyclades.imot.bg" title="Циклади">Циклади</a>\n' +
  '  </div>\n' +
  '  <div style="width:100%; margin-top:10px;">\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=1" class="footLinks1">КОНТАКТИ</a> |\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=11" class="footLinks1">ОБЯВИ</a> |\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=12" class="footLinks1">SMS КОДОВЕ</a> |\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=14" class="footLinks1">СТАТИСТИКА</a> |\n' +
  '    <a data-link="//www.imot.bg/pcgi/imot.cgi?act=16&mode=2" class="clever-link footLinks1">ПОМОЩ</a> |\n' +
  '    <a data-link="//www.imot.bg/pcgi/imot.cgi?act=16&mode=3" class="clever-link footLinks1">ОБЩИ УСЛОВИЯ</a> |\n' +
  '    <a href="https://rezonmedia.bg/tarifi/imot" class="footLinks1" target="_blank">РЕКЛАМА</a> |\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=5" class="footLinks1">ТОП ОФЕРТА</a> |\n' +
  '\n' +
  '    <a href="//www.imot.bg/pcgi/imot.cgi?act=16&mode=1" class="footLinks1" style="font-weight:normal; text-decoration:underline; float:right">Въпроси и предложения към imot.bg</a>\n' +
  '  </div>\n' +
  '  <div style="margin-top:10px; background-color: #900; color:#FFF; padding-left:10px; height:26px; line-height:26px;">\n' +
  '    <a href="https://rezonmedia.bg" target="_blank" class="footLinks2">Резон Медия</a> |\n' +
  '    <a href="//www.imot.bg" target="_blank" class="footLinks2">Имоти</a> |\n' +
  '    <a href="http://www.mobile.bg" target="_blank" class="footLinks2">Автомобили</a> |\n' +
  '    <a href="https://www.zaplata.bg" target="_blank" class="footLinks2" title="Обяви за работа в България и чужбина">Работа</a> |\n' +
  '    <a href="https://www.fakti.bg" target="_blank" class="footLinks2" title="Събития от България и света">Новини</a> |\n' +
  '    <a href="https://bazar.bg" target="_blank" class="footLinks2">Обяви</a> |\n' +
  '    <a href="https://prevodirezon.bg" target="_blank" class="footLinks2">Преводи и легализация</a>\n' +
  '    <span style="float: right; margin-right:5px;">2002-2024 &reg;  Copyright imot.bg</span>\n' +
  '  </div>\n' +
  '  <div id="mob_version" style="width:100%; text-align:center;"></div>\n' +
'      <!-- results?rub=2&type_home=2~3~&currency=EUR&sort=1&town=43&fe_agkinds=0&fromdesktop=1&slink=aphgk0 -->\n' +
'      </body>\n' +
'    </html>\n' +
'    '

async function scrapeImotBG() {
  try {
    // const response = await axios.get(URL, {
    //   responseType: 'arraybuffer',
    //   reponseEncoding: 'binary',
    // });
    // const html = response.data;
    const $ = cheerio.load(___draft);

    const posts = [];
    const tables = $('table');
    const filtered = $(tables).find('.price').closest('tbody');
    filtered.each((index, element) => {
      if (index < tables.length) {
        // Limit to 10 posts
        const price = $(element).find('tr:first').next().find('.price');
        const description = $(element).find('tr:first').next().next().find('td');
        const link =  $(element).find('tr:first').next().find('a').attr('href');
        const preview = $(element).find('tr:first').next().find('img').attr('src');
        // const location = $(element).find('.location').text().trim();
        // const link = $(element).find('.val1 a').attr('href');

        posts.push({
          price: price.text().trim(),
          description: description.text().trim(),
          link: link.substring(2, link.length),
          preview: 'https:' + preview
          // location,
          // link: `https://www.imot.bg${link}`,
        });
      }
    });

    fs.writeFile('./test.json', JSON.stringify(posts, null, 2), err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });

    console.log(JSON.stringify(posts, null, 2));
    return posts;
  } catch (error) {
    console.error('Error scraping imot.bg:', error);
  }
}

scrapeImotBG();

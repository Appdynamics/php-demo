;/* Version 7ee08ffc80eb95c73b3f07237ad42c17 v:4.1.2.2, c:f205d26c00c253b69f770b13514528ac7c31d8d2, b:10339 n:1-4.1.2.next-controller */(function(){(function(){if(!window.ADRUM&&!0!==window["adrum-disable"]){var f=window.ADRUM={};window["adrum-start-time"]=window["adrum-start-time"]||(new Date).getTime();(function(a){(function(a){a.Ub=function(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];for(b=0;b<a.length;b++){var c=a[b];c&&c.A()}}})(a.monitor||(a.monitor={}))})(f||(f={}));(function(a){a=a.conf||(a.conf={});a.beaconUrlHttp="http://54.244.95.83:9001";a.beaconUrlHttps="https://54.244.95.83:9001";a.corsEndpointPath="/eumcollector/beacons/browser/v1";
a.imageEndpointPath="/eumcollector/adrum.gif?";a.appKey=window["adrum-app-key"]||"DEMO-AAB-AXF";var e="https:"===document.location.protocol;a.adrumExtUrl=(e?"https://cdn.appdynamics.com":"http://cdn.appdynamics.com")+"/adrum-ext.7ee08ffc80eb95c73b3f07237ad42c17.js";a.agentVer="4.1.2.2";a.sendImageBeacon="false";if(window["adrum-geo-resolver-url"]){var d=window["adrum-geo-resolver-url"],b=d.indexOf("://");-1!=b&&(d=d.substring(b+3));d=(e?"https://":"http://")+d}else d=e?"":
"";a.geoResolverUrl=d;a.useStrictDomainCookies=!0===window["adrum-use-strict-domain-cookies"];a.userConf=window["adrum-config"];a.Ec=10})(f||(f={}));(function(a){(function(e){e.Tb=function(a){setTimeout(a,0)};e.addEventListener=function(d,b,c){function g(){try{return c.apply(this,Array.prototype.slice.call(arguments))}catch(t){a.exception(t,"M1",b,d,t)}}a.isDebug&&a.log("M0",b,d);d.addEventListener?d.addEventListener(b,g,!1):d.attachEvent&&d.attachEvent("on"+b,g)};e.loadScriptAsync=
function(d){var b=document.createElement("script");b.async=!0;b.src=d;var c=document.getElementsByTagName("script")[0];c?(c.parentNode.insertBefore(b,c),a.log("M2",d)):a.log("M3",d)};e.ne=function(a,b){for(var c in b){var g=b[c];b.hasOwnProperty(c)&&g&&(a[c]=g)}};e.generateGUID="undefined"!==typeof window.crypto&&"undefined"!==typeof window.crypto.getRandomValues?function(){function a(b){for(b=b.toString(16);4>b.length;)b="0"+b;return b}var b=new Uint16Array(8);window.crypto.getRandomValues(b);return a(b[0])+
a(b[1])+"_"+a(b[2])+"_"+a(b[3])+"_"+a(b[4])+"_"+a(b[5])+a(b[6])+a(b[7])}:function(){return"xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})};e.parseURI=function(a){return(a=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/))?{href:a[0]||"",protocol:a[1]||"",D:a[2]||"",host:a[3]||"",hostname:a[4]||"",port:a[5]||"",pathname:a[6]||
"",search:a[7]||"",hash:a[8]||""}:null};e.absolutizeURI=function(a,b){function c(a){var b=[];a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)});return b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}b=e.parseURI(b||"");a=e.parseURI(a||"");return b&&a?(b.protocol||a.protocol)+(b.protocol||b.D?b.D:a.D)+c(b.protocol||b.D||"/"===b.pathname.charAt(0)?b.pathname:b.pathname?(a.D&&!a.pathname?"/":"")+a.pathname.slice(0,
a.pathname.lastIndexOf("/")+1)+b.pathname:a.pathname)+(b.protocol||b.D||b.pathname?b.search:b.search||a.search)+b.hash:null};e.getFullyQualifiedUrl=function(d){try{return e.absolutizeURI(document.location.href,d)}catch(b){return a.exception(b,"M4",d,document.location.href),d}};e.tryExtractingErrorStack=function(a){return a?(a=a.stack)&&"string"===typeof a?a:null:null}})(a.utils||(a.utils={}))})(f||(f={}));(function(a){function e(b,c,g,d){b=a.conf.beaconUrlHttps+"/eumcollector/error.gif?version=1&appKey="+
g+"&msg="+encodeURIComponent(b.substring(0,500));d&&(b+="&stack=",b+=encodeURIComponent(d.substring(0,1500-b.length)));return b}function d(b,c){2<=g||((new Image).src=e(b,0,a.conf.appKey,c),g++)}function b(a){return 0<=a.location.search.indexOf("ADRUM_debug=true")||0<=a.cookie.search(/(^|;)\s*ADRUM_debug=true/)}a.iDR=b;a.isDebug=b(document);var c=[];a.log=function(b){for(var g=1;g<arguments.length;g++);a.isDebug&&c.push(Array.prototype.slice.call(arguments).join(" | "))};a.error=function(b){for(var c=
1;c<arguments.length;c++);c=Array.prototype.slice.call(arguments).join(" | ");a.log(c);d(c,null)};a.exception=function(){for(var b=[],c=0;c<arguments.length;c++)b[c-0]=arguments[c];1>arguments.length||(b=Array.prototype.slice.call(arguments),c=a.utils.tryExtractingErrorStack(b[0]),b=b.slice(1).join(" | "),a.log(b),d(b,c))};a.assert=function(b,c){b||a.error("Assert fail: "+c)};a.dumpLog=a.isDebug?function(){for(var a="",b=0;b<c.length;b++)a+=c[b].replace(RegExp("<br/>","g"),"\n\t")+"\n";return a}:
function(){};a.cIEBU=e;var g=0;a.log("M5")})(f||(f={}));(function(a){var e=function(){function a(b){this.max=b;this.qa=0}a.prototype.Vd=function(){this.V()||this.qa++};a.prototype.V=function(){return this.qa>=this.max};a.prototype.reset=function(){this.qa=0};return a}(),d=function(){function b(){this.R=[];this.Fa=new e(b.Sc);this.Aa=new e(b.Hc)}b.prototype.submit=function(b){this.push(b)&&a.initEXTDone&&this.processQ()};b.prototype.processQ=function(){for(var b=this.xd(),g=0;g<b.length;g++){var t=
b[g];"function"===typeof a.commands[t[0]]?(a.isDebug&&a.log("M6",t[0],t.slice(1).join(", ")),a.commands[t[0]].apply(a,t.slice(1))):a.error("M7",t[0])}};b.prototype.ee=function(a){return"reportXhr"===a||"reportPageError"===a};b.prototype.push=function(b){var g=b[0],t=this.ee(g),p=t?this.Fa:this.Aa;if(p.V())return a.log("M8",t?"spontaneous":"non spontaneous",g),!1;this.R.push(b);p.Vd();return!0};b.prototype.xd=function(){var a=this.R;this.reset();return a};b.prototype.size=function(){return this.R.length};
b.prototype.reset=function(){this.R=[];this.Fa.reset();this.Aa.reset()};b.prototype.isSpontaneousQueueDead=function(){return this.Fa.V()};b.prototype.isNonSpontaneousQueueDead=function(){return this.Aa.V()};b.Sc=100;b.Hc=100;return b}();a.gc=d})(f||(f={}));(function(a){a.q=new a.gc;a.command=function(e){for(var d=1;d<arguments.length;d++);a.isDebug&&a.log("M9",e,Array.prototype.slice.call(arguments).slice(1).join(", "));a.q.submit(Array.prototype.slice.call(arguments))}})(f||(f={}));(function(a){(function(e){window.ADRUM.aop=
e;e.support=function(a){return!a||"apply"in a};e.around=function(d,b,c,g){a.assert(e.support(d),"aop.around called on a function which does not support interception");d=d||function(){};return function(){a.isDebug&&a.log("M10",g,Array.prototype.slice.call(arguments).join(", "));var t=Array.prototype.slice.call(arguments),p;try{b&&(p=b.apply(this,t))}catch(e){a.exception(e,"M11",g,e)}a.assert(!p||"[object Array]"===Object.prototype.toString.call(p));var n=void 0;try{n=d.apply(this,p||t)}finally{try{c&&
c.apply(this,t)}catch(f){a.exception(f,"M12",g,f)}}return n}};e.before=function(a,b){return e.around(a,b)};e.after=function(a,b){return e.around(a,null,b)}})(a.aop||(a.aop={}))})(f||(f={}));(function(a){(function(e){var d=function(){function b(){}b.prototype.A=function(){a.aop.support(window.onerror)?(window.onerror=a.aop.around(window.onerror,function(c,g,t,p,d){b.xa||(b.errorsSent>=a.conf.Ec?a.log("M13"):(p=a.utils.tryExtractingErrorStack(d),a.command("reportPageError",c,g,t,p),b.errorsSent++,b.xa=
!0))},function(){b.xa=!1},"onerror"),a.log("M14")):a.log("M15")};b.xa=!1;b.errorsSent=0;return b}();e.ErrorMonitor=d;e.Dd=new e.ErrorMonitor})(a.monitor||(a.monitor={}))})(f||(f={}));(function(a){var e=function(){function d(){this.Ia=[];this.Y(d.ma,0)}d.prototype.se=function(a){this.Y(d.cb,a)};d.prototype.ue=function(a){this.Y(d.gb,a)};d.prototype.te=function(a){this.Y(d.eb,a)};d.prototype.Y=function(a,c){this.Ia.push({re:(new Date).getTime(),qe:c,n:a});this.td=a};d.prototype.getPhaseName=function(){return this.td};
d.prototype.getPhaseID=function(a){for(var c=0;c<d.fb.length;c++)if(d.fb[c]===a)return c;return null};d.prototype.getPhaseCallbackTime=function(a){for(var c=this.Ia,g=0;g<c.length;g++)if(c[g].n===a)return c[g].re;return null};d.prototype.findPhaseAtNominalTime=function(b){a.assert(0<=b);for(var c=this.Ia,g=c.length-1;0<=g;g--)if(b>=c[g].qe)return c[g].n;a.error("M16",b,a.utils.yd(c));return d.ma};d.ma="AFTER_FIRST_BYTE";d.cb="AFTER_DOM_INTERACTIVE";d.gb="AT_ONLOAD";d.eb="AFTER_ONLOAD";d.fb=[d.ma,
d.cb,d.gb,d.eb];return d}();a.ff=e;a.lifecycle=new e;a.lifecycle=a.lifecycle})(f||(f={}));(function(a){(function(e){var d=function(){function b(){}b.prototype.A=function(){b.Me();b.Le()};b.Le=function(){a.utils.addEventListener(window,"load",b.Z);a.utils.addEventListener(window,"load",b.xe)};b.xe=function(b){a.lifecycle.ue(b&&b.timeStamp);a.utils.Tb(function(){var b=(new Date).getTime();a.lifecycle.te(b);a.command("mark","onload",b);e.ab.b&&(e.perfMonitor.rd(),e.perfMonitor.ib());a.command("reportOnload");
a.utils.loadScriptAsync(a.conf.adrumExtUrl)});a.log("M17")};b.Me=function(){if(document.addEventListener)document.addEventListener("DOMContentLoaded",b.N,!1);else{document.attachEvent("onreadystatechange",b.N);var c=null;try{c=null===window.frameElement?document.documentElement:null}catch(g){}null!=c&&c.doScroll&&function p(){if(!b.isReady){try{c.doScroll("left")}catch(a){setTimeout(p,10);return}b.Z()}}()}a.log("M18")};b.Z=function(c){b.Hb||(a.lifecycle.se(c&&c.timeStamp),a.command("mark","onready",
(new Date).getTime()),b.Hb=!0)};b.N=function(a){document.addEventListener?(document.removeEventListener("DOMContentLoaded",b.N,!1),b.Z(a)):"complete"===document.readyState&&(document.detachEvent("onreadystatechange",b.N),b.Z(a))};b.isReady=!1;b.Hb=!1;return b}();e.hc=d;e.wd=new e.hc})(a.monitor||(a.monitor={}))})(f||(f={}));(function(a){(function(e){var d=function(){function b(){this.navTiming=this.resTiming=null}b.prototype.A=function(){b.b=window.performance||window.mozPerformance||window.msPerformance||
window.webkitPerformance};b.prototype.rd=function(){var c=b.b.timing;if(c)if(c.navigationStart&&c.navigationStart<=c.loadEventEnd){var g={},t;for(t in c){var p=c[t];"number"===typeof p&&(g[t]=p)}this.navTiming=g}else a.log("M20");else a.log("M19")};b.prototype.ib=function(){var c=b.b;c.getEntriesByType&&(c=c.getEntriesByType("resource"))&&c.length&&0<c.length&&c.unshift&&(this.resTiming=c);this.resTiming||a.log("M21")};b.b=null;return b}();e.ab=d;e.perfMonitor=new e.ab})(a.monitor||(a.monitor={}))})(f||
(f={}));(function(a){(function(e){var d=function(){function b(){this.conf=null;this.Ga=!1;this.status={};if(!0===window["adrum-xhr-disable"])a.log("M22");else if(window.XMLHttpRequest){this.conf={exclude:{urls:[{pattern:a.conf.beaconUrlHttp+a.conf.corsEndpointPath,type:"regex"},{pattern:a.conf.beaconUrlHttps+a.conf.corsEndpointPath,type:"regex"}]}};this.jb(this.conf.exclude.urls);this.conf.include=a.conf.userConf&&a.conf.userConf.xhr&&a.conf.userConf.xhr.include;var b=this.conf.include&&this.conf.include.urls;
b&&this.jb(b);(this.d=window.XMLHttpRequest.prototype)?"open"in this.d&&"send"in this.d?(this.Ga=a.aop.support(this.d.open)&&a.aop.support(this.d.send))||a.log("M26"):a.log("M25"):a.log("M24")}else a.log("M23")}b.prototype.jb=function(b){for(var g=0;g<b.length;g++){var t=b[g];if("regex"!==t.type||"string"!==typeof t.pattern)a.exception("only regex pattern type is supported in the xhr filter, pattern should be a string");else try{t.regex=new RegExp(t.pattern)}catch(p){a.exception(p,"Parse regex pattern failed.")}}};
b.prototype.set=function(a,b){this.status[a]=b};b.prototype.A=function(){if(this.Ga){a.log("M27");a.xhrConstructor=window.XMLHttpRequest;a.xhrOpen=this.xhrOpen=this.d.open;a.xhrSend=this.xhrSend=this.d.send;var c=this;this.d.open=a.aop.around(this.d.open,function(){var g=1<=arguments.length?String(arguments[0]):"",t=2<=arguments.length?String(arguments[1]):"",p=c.conf.exclude.urls;b.Eb(t,c.conf&&c.conf.include&&c.conf.include.urls)&&!b.Eb(t,p)&&(this._adrumXhrData={method:g,url:t,sendTime:null,firstByteTime:null,
respAvailTime:null,respProcTime:null,parentPhase:null},a.utils.ne(this._adrumXhrData,c.status))},null,"XHR.open");this.d.send=a.aop.around(this.d.send,function(){var g=this,t=g._adrumXhrData;if(t){var p=(new Date).getTime();a.assert(null===t.sendTime,"M28");t.sendTime=t.sendTime||p;t.parentPhase=a.lifecycle.getPhaseName();b.ce(t.url)?g.setRequestHeader("ADRUM","isAjax:true"):a.log("M29",document.location.href,t.url);var d=0,e=function(){if(4==g.readyState)a.log("M30"),c.ha(g);else{var b=null;try{b=
g.onreadystatechange}catch(t){a.log("M31",t);c.ha(g);return}d++;b?a.aop.support(b)?(g.onreadystatechange=c.kb(b,g,"XHR.onReadyStateChange"),a.log("M32",d)):(a.log("M33"),c.ha(g)):5>d?a.utils.Tb(e):(a.log("M34"),c.ha(g))}};e()}},null,"XHR.send");"addEventListener"in this.d&&"removeEventListener"in this.d&&a.aop.support(this.d.addEventListener)&&a.aop.support(this.d.removeEventListener)?(this.d.addEventListener=a.aop.around(this.d.addEventListener,this.sd(),null,"XHR.addEventListener"),this.d.removeEventListener=
a.aop.around(this.d.removeEventListener,function(b,c){if(this._adrumXhrData){var p=Array.prototype.slice.call(arguments);c.__adrumInterceptor?(p[1]=c.__adrumInterceptor,a.log("M35")):a.log("M36");return p}},null,"XHR.removeEventListener")):a.log("M37");a.log("M38")}};b.me=function(a,b){for(var t=!1,p=0;p<b.length;p++){var d=b[p];if(d.regex&&d.regex.test(a)){t=!0;break}}return t};b.Eb=function(a,g){var t=!0;a&&g&&(t=b.me(a,g));return t};b.ce=function(a){var b=document.createElement("a");b.href=a;a=
document.location;return":"===b.protocol&&""===b.hostname&&""===b.port||b.protocol===a.protocol&&b.hostname===a.hostname&&b.port===a.port};b.xb=function(b){var g=b._adrumXhrData;if(g){var t=(new Date).getTime();2==b.readyState?g.firstByteTime=g.firstByteTime||t:4==b.readyState&&(a.assert(null===g.respAvailTime,"M39"),g.respAvailTime=g.respAvailTime||t,g.firstByteTime=g.firstByteTime||t)}};b.prototype.kb=function(c,g,t){return b.df(c,function(){b.xb(this)},function(){var b=g._adrumXhrData;if(b&&4==
g.readyState){var c=(new Date).getTime();a.assert(null===b.respProcTime,"M40");b.respProcTime=b.respProcTime||c;a.command("reportXhr",g,b);delete g._adrumXhrData}},t)};b.prototype.ha=function(c){if(c._adrumXhrData){var g=(new Date).getTime()+3E4,t=function(){b.xb(c);var p=c._adrumXhrData;if(p){var d=(new Date).getTime();4==c.readyState?(a.assert(null===p.respProcTime,"M41"),p.respProcTime=p.respProcTime||d,a.log("M42"),a.command("reportXhr",c,p),delete c._adrumXhrData):d<g?setTimeout(t,50):(delete c._adrumXhrData,
a.log("M43"))}};t()}};b.df=function(b,g,t,p){var d=b;b&&"object"===typeof b&&"toString"in b&&"[xpconnect wrapped nsIDOMEventListener]"===b.toString()&&"handleEvent"in b&&(d=function(){b.handleEvent.apply(this,Array.prototype.slice.call(arguments))});return a.aop.around(d,g,t,p)};b.prototype.sd=function(){for(var b=0;b<arguments.length;b++);var g=this;return function(b,c){if(("load"===b||"error"===b)&&c&&this._adrumXhrData){var d;d=c;if(d.__adrumInterceptor)d=d.__adrumInterceptor;else if(a.aop.support(d)){var e=
g.kb(d,this,"XHR.invokeEventListener");d=d.__adrumInterceptor=e}else d=null;if(d)return e=Array.prototype.slice.call(arguments),e[1]=d,a.log("M44"),e;a.log("M45",b,c)}}};return b}();e.hd=d;e.B=new e.hd})(a.monitor||(a.monitor={}))})(f||(f={}));(function(a){(function(e){function d(a,b){var c=[],d=/^\s*(ADRUM_BT\w*)=(.*)\s*$/i.exec(a);if(d){var e=d[1],d=d[2].replace(/^"|"$/g,""),d=decodeURIComponent(d).split("|"),f=d[0].split(":");if("R"===f[0]&&Number(f[1])===b)for(g(e),e=1;e<d.length;e++)c.push(d[e])}return c}
function b(a,b){var c=/^\s*(ADRUM_(\d+)_(\d+)_(\d+))=(.*)\s*$/i.exec(a);if(c){var d=c[1],e=c[4],f=c[5];if(Number(c[3])===b)return g(d),{index:Number(e),value:f}}return null}function c(b){var c=/^\s*ADRUM=s=([\d]+)&r=(.*)\s*/.exec(b);if(c){a.log("M48",b);if(3===c.length)return g("ADRUM"),{startTime:Number(c[1]),startPage:c[2]};a.error("M49",b);return null}}function g(b){a.log("M47",b);var c=new Date;c.setTime(c.getTime()-1E3);document.cookie=b+"=;Expires="+c.toUTCString()}e.startTimeCookie=null;e.cookieMetadataChunks=
null;e.lb=function(g,p){a.log("M46");for(var f=p?p.length:0,n=[],k=g.split(";"),h=0;h<k.length;h++){var m=k[h],v=b(m,f);v?n.push(v):(m=c(m),null!=m&&(e.startTimeCookie=m))}Array.prototype.sort.call(n,function(a,b){return a.index-b.index});m=[];for(h=0;h<n.length;h++)m.push(n[h].value);for(h=0;h<k.length;h++)(n=d(k[h],f))&&0<n.length&&(m=m.concat(n));e.cookieMetadataChunks=m};a.correlation.eck=e.lb})(a.correlation||(a.correlation={}))})(f||(f={}));(function(a){"APP_KEY_NOT_SET"===a.conf.appKey&&"undefined"!==
typeof console&&"undefined"!==typeof console.log&&console.log("AppDynamics EUM cloud application key missing. Please specify window['adrum-app-key']");a.correlation.lb(document.cookie,document.referrer);a.command("mark","firstbyte",window["adrum-start-time"]);a.monitor.Ub(a.monitor.Dd,a.monitor.wd,a.monitor.perfMonitor,a.monitor.B)})(f||(f={}));(function(a){var e=function(){function a(){this.l={}}a.prototype.now=function(){return d.now()};a.prototype.mark=function(a){d.mark.call(this,a)};a.prototype.measure=
function(a,b,t){d.measure.apply(this,arguments)};a.prototype.getEntryByName=function(a){return d.getEntryByName.call(this,a)};return a}();a.Xc=e;var d;(function(b){b.now;b.mark;b.measure;b.getEntryByName;var c=g&&g.timing&&g.timing.navigationStart?g.timing.navigationStart:window["adrum-start-time"],g=window.performance;b.now=g&&g.now?function(){return g.now()}:g&&g.timing&&g.timing.navigationStart?function(){return(new Date).getTime()-g.timing.navigationStart}:function(){return(new Date).getTime()-
c};b.mark=function(a){this.l[a]={name:a,entryType:"mark",startTime:b.now(),duration:0}};b.measure=function(g,d,e){this.l.hasOwnProperty(d)&&this.l.hasOwnProperty(e)?this.l[g]={name:g,entryType:"measure",startTime:d?this.l[d].startTime:c,duration:(e?this.l[e].startTime:b.now())-(d?this.l[d].startTime:0)}:a.error("M50"+(this.l.hasOwnProperty(d)?e:d)+" does not exist. ")};b.getEntryByName=function(a){return this.l[a]}})(d||(d={}))})(f||(f={}));(function(a){(function(e){var d=function(){function b(b,
g){this.ca=this.ya=null;this.ra=0;this.J={};this.n="";this.b=new a.Xc;this.Db=!1;this.ca=b;this.name=g;this.Ud=a.utils.generateGUID()}b.prototype.ud=function(){this.ra++};b.prototype.he=function(){this.b.mark("locationChangeStart");this.oa("locationChanging");this.ra=0};b.prototype.ie=function(){this.b.mark("locationChangeSuccess");this.pa();this.ya=location.href};b.prototype.Qe=function(){this.b.mark("stateChangeStart");this.oa("stateChanging")};b.prototype.Re=function(){this.b.mark("stateChangeSuccess");
this.pa()};b.prototype.Ee=function(){this.b.mark("routeChangeStart");this.oa("routeChanging")};b.prototype.Fe=function(){this.b.mark("routeChangeSuccess");this.pa()};b.prototype.bf=function(){this.b.mark("viewContentLoaded");this.J=this.pd();this.ya=location.href};b.prototype.Lb=function(){this.b.mark("outstandingRequestsComplete")};b.prototype.oa=function(a){this.n=a};b.prototype.pa=function(){this.n=null};b.prototype.pd=function(){var a={fa:0},g=document.querySelectorAll("ng-view, [ng-view], .ng-view, [ui-view]");
if(g&&0<g.length){var d=0,e;for(e in b.aa)for(var f=0;f<g.length;f++){var n=angular.element(g[f]).find(e);if(0<n.length){a[e]=[];for(var k=0;k<n.length;k++){var h=n[k];h[b.aa[e].ga]&&a[e].push(h)}d+=a[e].length}}}a.fa=d;return a};b.prototype.qd=function(a){var b=null;if(0<this.J.fa){var d=this.buildResourceTimingInfo();if(d.length===this.J.fa){for(var e=[],f=0;f<d.length;f++)e.push(d[f].responseEnd);d=Math.max.apply(Math,e);a=this.b.getEntryByName(a);e=this.b.getEntryByName("DOM");a&&a.startTime&&
e&&e.duration&&(b=Math.max(d-a.startTime,e.duration))}}else b=(e=this.b.getEntryByName("DOM"))&&e.duration||null;return b};b.prototype.S=function(a){for(var b={},d=0;d<a.length;d++){var e=a[d];if(this.b.getEntryByName(e[1])&&this.b.getEntryByName(e[2])){this.b.measure(e[0],e[1],e[2]);var f=this.b.getEntryByName(e[0]);b[e[0]]=f&&0<=f.duration&&f.duration||null}}b.PLT=this.qd(a[0][1]);b.PLC=1;b.VDC=this.ra;for(var n in b)b[n]=Math.round(b[n]);return b};b.prototype.getGUID=function(){return this.Ud};
b.prototype.buildMetrics=function(){return e.cc.La?this.S(b.Ze):this.S(b.Ge)};b.prototype.getRouteUrl=function(){return this.ca};b.prototype.getName=function(){return this.name?this.name:this.ca.substring(this.ca.lastIndexOf("/")+1)};b.prototype.getLocationUrl=function(){return this.ya};b.prototype.buildResourceTimingInfo=function(){a.monitor.perfMonitor.ib();var b=this,d=[];0<this.J.fa&&(d=a.monitor.perfMonitor.resTiming.filter(function(a){return b.od(a)}));return d};b.prototype.od=function(a){if(a.initiatorType in
b.aa){var d=b.aa[a.initiatorType].ga,e=this.J[a.initiatorType];if(e)for(var f=0;f<e.length;f++){var l=e[f];if(l.tagName.toUpperCase()===a.initiatorType.toUpperCase()&&decodeURIComponent(l[d])===decodeURIComponent(a.name))return!0}}return!1};b.aa={img:{ga:"src"},script:{ga:"src"},link:{ga:"href"}};b.Ge=[["DOM","locationChangeStart","outstandingRequestsComplete"],["DDT","routeChangeStart","routeChangeSuccess"],["DRT","routeChangeStart","outstandingRequestsComplete"],["DPT","routeChangeSuccess","outstandingRequestsComplete"]];
b.Ze=[["DDT","stateChangeStart","stateChangeSuccess"],["DRT","stateChangeStart","stateChangeSuccess"],["DOM","stateChangeStart","viewContentLoaded"],["DPT","stateChangeSuccess","viewContentLoaded"]];return b}();e.NgRouteTracker=d})(a.ng||(a.ng={}))})(f||(f={}));(function(a){(function(e){var d=function(){function b(){this.ready=!1;this.channel=null}b.prototype.Ea=function(a){if(this.ready=a)this.onReady();else this.Vb()};b.prototype.isReady=function(){return this.ready};b.prototype.Vb=function(){var a=
this;setTimeout(function(){a.Ea(!0)},1E4)};b.prototype.onReady=function(){var b=this;a.command("call",function(){b.channel.onResolverReady()})};b.prototype.init=function(a){this.channel=a};return b}();e.la=d;a.ng.la.prototype.init=a.ng.la.prototype.init})(a.ng||(a.ng={}))})(f||(f={}));(function(a){(function(e){var d=function(){function b(){this.c=new e.NgRouteTracker(document.URL);this.ba=new e.la}b.prototype.A=function(){var b=this;a.utils.addEventListener(document,"DOMContentLoaded",function(){b.init()})};
b.prototype.init=function(){if("undefined"!=typeof angular){b.La=b.ae();a.command("addResolver",this.ba);this.ba.Vb();var d=this,e=angular.module("ng");e.config(["$provide",function(a){d.Yd(a);d.Xd(a)}]);e.run(["$browser",function(a){b.pe=a}])}};b.ae=function(){try{angular.module("ui.router")}catch(a){return!1}return!0};b.prototype.Xd=function(b){var d=a.aop,e=this;b.decorator("$httpBackend",["$delegate",function(b){return b=d.around(b,function(){if("routeChanging"===e.c.n||"stateChanging"===e.c.n)a.monitor.B.set("parentGUID",
e.c.getGUID()),a.monitor.B.set("parentType",3),a.monitor.B.set("parentUrl",e.c.getLocationUrl())},function(){if("routeChanging"===e.c.n||"stateChanging"===e.c.n)a.monitor.B.set("parentGUID",null),a.monitor.B.set("parentType",null),a.monitor.B.set("parentUrl",null)})}])};b.prototype.Yd=function(d){var e=a.aop,t=this;d.decorator("$rootScope",["$delegate",function(d){d.$digest=e.after(d.$digest,function(){t.c.ud()});d.$on("$locationChangeStart",function(d,e){a.log("M51");b.La||t.Wb(e);t.c.he()});d.$on("$locationChangeSuccess",
function(){a.log("M52");t.c.ie()});d.$on("$routeChangeStart",function(){a.log("M53");t.c.Ee()});d.$on("$routeChangeSuccess",function(){a.log("M54");t.c.Fe();t.Kb(function(){t.c.Lb()})});d.$on("$stateChangeStart",function(b,d){a.log("M55");t.Wb(d.url,d.name);t.c.Qe()});d.$on("$stateChangeSuccess",function(){a.log("M56");t.c.Re();t.Kb(function(){t.c.Lb()})});d.$on("$viewContentLoaded",function(){a.log("M57");t.c.bf();if(!t.c.Db){var d=t.c;setTimeout(function(){t.Cd(d)},b.bd);d.Db=!0}});return d}])};
b.prototype.Wb=function(a,b){this.ba.Ea(!1);this.c=new e.NgRouteTracker(a,b)};b.prototype.Cd=function(a){b.Be(a);this.ba.Ea(!0)};b.prototype.Kb=function(a){var d=b.pe;d&&d.notifyWhenNoOutstandingRequests&&d.notifyWhenNoOutstandingRequests(a)};b.Be=function(b){a.command("reportEvent","VPLoad",b)};b.bd=5E3;b.La=!1;return b}();e.cc=d;e.ngMonitor=new d})(a.ng||(a.ng={}))})(f||(f={}));(function(a){var e=a.ng||(a.ng={});a.conf.userConf&&a.conf.userConf.spa&&a.conf.userConf.spa.angular&&a.conf.userConf.spa.angular.disable||
a.monitor.Ub(e.ngMonitor)})(f||(f={}))}})();})();

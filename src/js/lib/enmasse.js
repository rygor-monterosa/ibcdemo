/*!
 *	Copyright (c) Monterosa Productions Limited 2014
 */
!function(){for(var n=(function(){var n="probe";try{return localStorage.setItem(n,n),localStorage.removeItem(n),"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}()),e="proxy",t="websocket",o="flashsocket",s="enmasse_override_methods",i="enmasse_debug",r="enmasse_config",a=1,c=2,u=4,E=8,l={"brief":a,"full":a|c|u|E},d=(n&&s in localStorage?localStorage[s].split(","):!1),f=(n&&i in localStorage?localStorage[i]:!1),S=!1,h=window.location.search.substr(1).split("&"),T=h.length;T--;){var N=h[T].split("=");switch(N[0]){case s:d=N[1].split(",");break;case i:f=N[1];break;case r:S=N[1]}}var C=function(){};f&&(C=function(){if("undefined"!=typeof console&&console.log){var n=Array.prototype.slice.call(arguments),e=n[0];if(n=n.slice(1),n.unshift(p.nowHumanised()),0!==(l[f]&e))return console.log.apply?console.log.apply(console,n):console.log(n.join(" "))}}),/*!
 * asEvented v0.4.3 - an event emitter mixin which provides the observer pattern to JavaScript object.
 *
 * Copyright 2012, Michal Kuklis
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Tweaked by Monterosa Productions Limited 2014
 *
 **/
window.asEvented=function(){function n(n,e,t){var o,s,i=this.events=this.events||{},r=n.split(/\s+/),a=r.length;for(e.__context=t||this,o=0;a>o;o++)i[s=r[o]]=i[s]||[],i[s].push(e);return this}function e(n,e,t){t=t||this;var o=function(){this.unbind(n,o),e.apply(t,a.call(arguments))};return this.bind(n,o,t),this}function t(n,e){var t,o,i,r,a,c;if(this.events){for(c=n.split(/\s+/),i=0,r=c.length;r>i;i++)if((o=c[i])in this.events!=!1)if(t=this.events[o],void 0===e)for(;t.length>0;)t.pop();else a=s(t,e),-1!==a&&t.splice(a,1);return this}}function o(n){var e,t,o,s=this.events;if(s&&n in s!=!1){for(e=a.call(arguments,1),t=s[n].length-1;t>=0;t--)o=s[n][t],o.apply(o.__context||this,e);return this}}function s(n,e){var t,o;if(r&&n.indexOf===r)return n.indexOf(e);for(t=0,o=n.length;o>t;t++)if(n[t]===e)return t;return-1}var i=Array.prototype,r=i.indexOf,a=i.slice;return function(){return this.bind=this.on=n,this.unbind=this.off=this.removeListener=t,this.trigger=this.emit=o,this.one=this.once=e,this}}();/*!
 * domready (c) Dustin Diaz 2012 - License MIT
 */
var g=function(n){function e(n){for(f=1;n=o.shift();)n()}var t,o=[],s=!1,i=document,r=i.documentElement,a=r.doScroll,c="DOMContentLoaded",u="addEventListener",E="onreadystatechange",l="readyState",d=a?/^loaded|^c/:/^loaded|c/,f=d.test(i[l]);return i[u]&&i[u](c,t=function(){i.removeEventListener(c,t,s),e()},s),a&&i.attachEvent(E,t=function(){/^c/.test(i[l])&&(i.detachEvent(E,t),e())}),n=a?function(e){self!=top?f?e():o.push(e):function(){try{r.doScroll("left")}catch(t){return setTimeout(function(){n(e)},50)}e()}()}:function(n){f?n():o.push(n)}}();window.Enmasse=function(){var e={};asEvented.call(e),e.VERSION="3.3.0",e.PROTOCOL_VERSION="7",e.SSCP_KLASS_AUTH="auth",e.SSCP_KLASS_AUTHR="authr",e.SSCP_KLASS_PING="ping",e.SSCP_KLASS_SUB="sub",e.SSCP_KLASS_UNSUB="unsub",e.SSCP_KLASS_EOC="eoc",e.SSCP_KLASS_USER="user",e.SSCP_KLASS_COUNTER="counter",e.ON_STATE="on_state",e.ON_MESSAGE="on_message",e.ON_READY="on_ready",e.ON_ERROR="on_error",e.STATE_DISCONNECTED="disconnected",e.STATE_CONNECTED="connected",e.STATE_CONNECTING="connecting";var t="__enmasse_callback",o=5e3,s="enmasse_session_id",i=null,r=[],c=null,u=null,E=e.STATE_DISCONNECTED,l=null,d=function(e){n&&(window.localStorage[s]=e)},f=function(){return n&&s in window.localStorage?window.localStorage[s]:null},h=function(){c=null,n&&delete window.localStorage[s]},T=function(n){return/^[a-f\d]{8}\-[a-f\d]{4}\-[a-f\d]{4}-[a-f\d]{4}\-[a-f\d]{12}$/i.test(n)},N=function(n,e){n=n||function(){},e=e||function(){};var s=document.getElementsByTagName("head")[0],r=document.createElement("script"),a=null,c=function(){s.removeChild(r),clearTimeout(a),window[t]=function(){}};window[t]=function(e){c(),n(e)},a=setTimeout(function(){c(),e()},o),r.setAttribute("src",i),s.appendChild(r)},g=function(){C(a,"Enmasse::setStateToDisconnected()"),E=e.STATE_DISCONNECTED,l=null,e.trigger(e.ON_STATE,E)},_=function(){C(a,"Enmasse::setStateToConnected()");var n=p.now();E=e.STATE_CONNECTED,e.trigger(e.ON_STATE,E,n)},O=function(n,t){C(a,"Enmasse::setStateToConnecting()"),E=e.STATE_CONNECTING,e.trigger(e.ON_STATE,E,n,t)},m=function(n){var e={"channel":0,"klass":"","sent_at":0,"body":[]},t=n.indexOf("/");if(-1!==t){var o=n.indexOf("/",t+1);if(-1!==o){e.channel=n.substr(0,t),e.klass=n.substr(t+1,o-t-1);var s=n.indexOf("/",o+1);if(-1!==s){e.sent_at=parseInt(n.substr(o+1,s-o-1));var i=n.substr(s+1);if(""!==i)for(var r=i.split("|"),a=0,c=r.length;c>a;a++)e.body[a]=decodeURIComponent(r[a])}}}return e},v=function(n){return[n.channel,n.klass,Math.floor(new Date/1e3),n.body.join("|")].join("/")},D=function(n){var t=function(){u.success(),n.klass===e.SSCP_KLASS_AUTHR&&_()},o=function(){u.failure()};Enmasse.ConnectionManager.send(v(n),t,o)},A=function(){C(a,"Enmasse::handleTransportManagerReady"),e.trigger(e.ON_READY)},b=function(){C(a,"Enmasse::handleConnectionManagerState",arguments);var n=Array.prototype.slice.call(arguments);switch(n[0]){case Enmasse.ConnectionManager.STATE_DISCONNECTED:g();break;case Enmasse.ConnectionManager.STATE_CONNECTING:O(n[1],n[2]);break;case Enmasse.ConnectionManager.STATE_CONNECTED:}},w=function(n){C(a,"Enmasse::handleConnectionManagerMessage",n);var t=m(n);switch(t.klass){case e.SSCP_KLASS_AUTH:var o=t.sent_at,s=["enmassejs-"+e.VERSION,navigator.userAgent].concat(r),i=u.getSubscriptions();l=t.channel;for(var E=s.length;E--;)s[E]=encodeURIComponent(s[E]);null===c&&(c=t.body[0],d(c)),p.setTime(o),u.stash(),u.push({"channel":l,"klass":e.SSCP_KLASS_AUTHR,"body":[c,e.PROTOCOL_VERSION,s.join(",")]},!0),i.forEach(function(n){u.push({"channel":n,"klass":e.SSCP_KLASS_SUB,"body":[c,e.PROTOCOL_VERSION,s.join(",")]},!0)}),u.unstash(),u.run();break;case e.SSCP_KLASS_PING:break;default:case e.SSCP_KLASS_EOC:e.trigger(e.ON_MESSAGE,t)}};return e.connect=function(){C(a,"Enmasse::connect"),Enmasse.ConnectionManager.connect()},e.disconnect=function(){C(a,"Enmasse:disconnect"),Enmasse.ConnectionManager.disconnect()},e.send=function(n,t,o){C(a,"Enmasse::send",n,t,o),o=o||[],u.push({"channel":n,"klass":t,"body":o}),E===e.STATE_CONNECTED&&u.run()},e.getSessionId=function(){return c},e.signIn=function(n,t,o){null!==l&&e.send(l,e.SSCP_KLASS_USER,[n,t,o])},e.init=function(n){if(n=n||{},i=S?S:n.config||null,r=n.info||[],c=f(),null===i)throw"Enmasse config file is not set";null===c||T(c)||h(),u=new Enmasse.Queue({"runner":D}),Enmasse.TransportManager.bind(Enmasse.TransportManager.ON_READY,A),Enmasse.ConnectionManager.bind(Enmasse.ConnectionManager.ON_STATE,b),Enmasse.ConnectionManager.bind(Enmasse.ConnectionManager.ON_MESSAGE,w);var t=function(n){Enmasse.ConnectionManager.init(n),Enmasse.TransportManager.init(n)},o=function(){e.trigger(e.ON_ERROR)};N(t,o)},e}(),Enmasse.Queue=function(n){n=n||{};var e=[],t=[],o=[],s=!1,i="function"==typeof n.runner?n.runner:null;this.push=function(n,t){void 0===t&&(t=!1);var s=n.klass,i=n.channel;if(!t)switch(s){case Enmasse.SSCP_KLASS_USER:case Enmasse.SSCP_KLASS_AUTHR:break;case Enmasse.SSCP_KLASS_SUB:if(-1!==o.indexOf(i))return;o.push(i);break;case Enmasse.SSCP_KLASS_UNSUB:var r=o.indexOf(i);if(-1===r)return;o.splice(r,1);break;default:if(-1===o.indexOf(i))return}e.push(n)},this.getSubscriptions=function(){return o},this.run=function(){null!==i&&!s&&e[0]&&(s=!0,i(e.shift()))},this.success=function(){s=!1,this.run()},this.failure=function(){s=!1},this.stash=function(){for(var n;void 0!==(n=e.shift());)t.push(n)},this.unstash=function(){for(var n;void 0!==(n=t.shift());)e.push(n)},window.queue=e,window.subscriptions=o};var p=function(){var n,e={},t=1,o=0,s=null,i=function(){return new Date/1e3},r=function(){var e=function(){n++;var e=i()-n;Math.abs(e-o)>t&&(n=Math.round(i()-o))};clearInterval(s),s=setInterval(e,1e3)};return e.setTime=function(e){n=e,o=i()-n,r()},e.now=function(){return n},e.nowHumanised=function(){var n=new Date(1e3*e.now()),t=n.getMinutes(),o=n.getSeconds();return(10>t?"0"+t:t)+":"+(10>o?"0"+o:o)},e.setTime(i()),e}();Enmasse.Driver=function(){this.ON_READY="ready",this.ON_MESSAGE="message",this.ON_CONNECTED="connected",this.ON_DISCONNECTED="disconnected",this.connected=!1,this.connect=function(){},this.disconnect=function(){},this.send=function(n,e,t){n=n||null,e=e||function(){},t=t||function(){}},this.init=function(){this.trigger(this.ON_READY)}},asEvented.call(Enmasse.Driver.prototype),Enmasse.FlashSocketDriver=function(){var n=this,e="enmasseflash",t=l.hasOwnProperty(f)&&l[f]&E,o=t?350:1,s=t?200:1,i="//api.lvis.tv",r=i+"/enmasse/"+Enmasse.VERSION+"/SocketConnector.swf",a="top: 0; left: 0; display: block; position: fixed; z-index: 9999; width: "+o+"px; height: "+s+"px; background: transparent;",c=/Microsoft Internet Explorer/.test(navigator.appName)&&/MSIE/.test(navigator.userAgent),u={"on_log":"Enmasse.FlashSocketBridge.onLog","on_ready":"Enmasse.FlashSocketBridge.onReady","on_connected":"Enmasse.FlashSocketBridge.onConnected","on_disconnected":"Enmasse.FlashSocketBridge.onDisconnected","on_recieved":"Enmasse.FlashSocketBridge.onRecieved"},d=function(){C(E,"FlashSocketDriver::embed");var n,i={"flashvars":"","allowscriptaccess":"always","menu":!1,"wmode":"transparent"};for(n in u)u.hasOwnProperty(n)&&(i.flashvars+=n+"="+u[n]+"&");t?i.flashvars+="&flash_log=1":i.flashvars=i.flashvars.slice(0,-1);var l=document.createElement("div");if(document.body.appendChild(l),c){var d='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="'+e+'" name="'+e+'" width="'+o+'" height="'+s+'" style="'+a+'"><param name="movie" value="'+r+'" />';for(n in i)i.hasOwnProperty(n)&&(d+='<param name="'+n+'" value="'+i[n]+'" />');d+="</object>",l.outerHTML=d}else{var f=document.createElement("object");f.setAttribute("type","application/x-shockwave-flash"),f.setAttribute("data",r),f.setAttribute("id",e),f.setAttribute("name",e),f.setAttribute("width",o),f.setAttribute("height",s),f.setAttribute("style",a);var S;for(n in i)i.hasOwnProperty(n)&&(S=document.createElement("param"),S.setAttribute("name",n),S.setAttribute("value",i[n]),f.appendChild(S));l.parentNode.replaceChild(f,l)}};this.getFlash=function(){return document.getElementById(e)},this.connect=function(n,e){C(E,"FlashSocketDriver::connect",n,e),this.connected||this.getFlash().connect(n,e)},this.disconnect=function(){C(E,"FlashSocketDriver::disconnect"),this.connected?this.getFlash().disconnect():this.trigger(this.ON_DISCONNECTED)},this.send=function(n,e,t){e=e||function(){},t=t||function(){},this.getFlash().send(n),e()},this.init=function(){d()},Enmasse.FlashSocketBridge={},Enmasse.FlashSocketBridge.onReady=function(){C(E,"FlashSocketBridge::onReady"),n.trigger(n.ON_READY)},Enmasse.FlashSocketBridge.onRecieved=function(e){C(E,"FlashSocketBridge::onRecieved",n.ON_MESSAGE,e),n.trigger(n.ON_MESSAGE,e)},Enmasse.FlashSocketBridge.onLog=function(){},Enmasse.FlashSocketBridge.onConnected=function(){C(E,"FlashSocketBridge::onConnected",n.connected),n.connected=!0,n.trigger(n.ON_CONNECTED),n.send("RAWSSCP")},Enmasse.FlashSocketBridge.onDisconnected=function(){C(E,"FlashSocketBridge::onDisconnected"),n.connected=!1,n.trigger(n.ON_DISCONNECTED)}},Enmasse.FlashSocketDriver.hasSupport=function(){/*!
	 * Detects if brower supports flash and if there is a flash blocking plugins
	 * inspired by flash detection plugin Modernizr
	 * modernizr v3.0.0pre
	 * modernizr.com
	 *
	 * Source: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/flash.js
	 *
	 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton, Ryan Seddon, Alexander Farkas, Patrick Kettner, Stu Cox
	 * MIT License
	 */
var n,e=!0,t=/^.*AppleWebKit\/.*?\s.*?Version\/7.*?\s.*?Safari\/.*$/;try{n="ActiveXObject"in window&&"Pan"in new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(o){}var s="plugins"in navigator&&"Shockwave Flash"in navigator.plugins||n;return s===!1?e=!1:t.test(navigator.userAgent)?e=!1:g(function(){var t=document.createElement("embed");t.setAttribute("type","application/x-shockwave-flash"),document.body.appendChild(t),"Pan"in t||n?setTimeout(function(){document.documentElement.contains(t)?(""!==t.style.cssText&&(e=!1),document.body.removeChild(t)):e=!1},10):(e=!1,document.body.removeChild(t))}),function(){return e}}(),Enmasse.FlashSocketDriver.prototype=new Enmasse.Driver,Enmasse.FlashSocketDriver.prototype.constructor=Enmasse.FlashSocketDriver,Enmasse.WebSocketDriver=function(){var n=this,e=null,t=null,o=function(e){C(E,"WebSocketDriver::onMessage",e.data),n.trigger(n.ON_MESSAGE,e.data)},s=function(){C(E,"WebSocketDriver::onOpen"),n.connected=!0,n.trigger(n.ON_CONNECTED)},i=function(){C(E,"WebSocketDriver::onClose"),a()},r=function(){C(E,"WebSocketDriver::onError")},a=function(){n.connected=!1,null!==e&&(e.onmessage=function(){},e.onopen=function(){},e.onclose=function(){},e.onerror=function(){},e=null),clearTimeout(t),n.trigger(n.ON_DISCONNECTED)};this.connect=function(t,a){n.connected||(C(E,"WebSocketDriver::connect",t,a),e=new WebSocket("ws://"+t+":"+a+"/ws"),e.onmessage=o,e.onopen=s,e.onclose=i,e.onerror=r)},this.disconnect=function(){C(E,"WebSocketDriver::disconnect"),this.connected?(e.close(),t=setTimeout(a,2e3)):a()},this.send=function(n,t,o){C(E,"WebSocketDriver::send",n),t=t||function(){},o=o||function(){},e.send(n),t()}},Enmasse.WebSocketDriver.hasSupport=function(){return"WebSocket"in window},Enmasse.WebSocketDriver.prototype=new Enmasse.Driver,Enmasse.WebSocketDriver.prototype.constructor=Enmasse.WebSocketDriver,Enmasse.XHRDriver=function(n){n=n||{};var e={},t=0,o=function(n,e,o){e=e||function(){},o=o||function(){};var i=null,r="POST";return"undefined"!=typeof XDomainRequest?(i=new XDomainRequest,i.open(r,n)):(i=new XMLHttpRequest)&&"withCredentials"in i&&(i.open(r,n,!0),i.setRequestHeader("Content-type","application/x-www-form-urlencoded")),null!==i&&(i.onload=function(){this.responseText.length>0?e(s(this.responseText)):o(this.responseText)},i.onerror=function(){o(this.responseText)}),i._idx=++t,i},s=function(n){for(var e,t,o,s={},i=n.split("&"),r=0,a=i.length;a>r;r++)e=i[r].split("="),t=e[0],o=decodeURIComponent(e[1].replace("\x00","")),t in s?(s[t].constructor!==Array&&(s[t]=[s[t]]),s[t].push(o)):s[t]=o;return s},i=function(n){e.hasOwnProperty(n)&&delete e[n]};this.connect=function(){C(E,"XHRDriver::connect"),this.connected||(this.connected=!0,this.trigger(this.ON_CONNECTED))},this.disconnect=function(){if(C(E,"XHRDriver::disconnect"),this.connected){for(var n in e)e.hasOwnProperty(n)&&e[n].abort&&(e[n].abort(),i(n));this.connected=!1}this.trigger(this.ON_DISCONNECTED)},this.send=function(t,s,r,a){C(E,"XHRDriver::send",s),r=r||function(){},a=a||function(){};var c,u=1,l=function(){c=o(t,d,f),c.send(s),e[c._idx]=c},d=function(n){C(E,"XHRDriver::success",s),i(c._idx),r(n)},f=function(e){C(E,"XHRDriver::failure, retry: ",u),i(c._idx),u<=n.request_retries?setTimeout(function(){l(),u++},1e3*n.request_retry_delay):a(e)};l()}},Enmasse.XHRDriver.hasSupport=function(){return"XDomainRequest"in window||"withCredentials"in new XMLHttpRequest},Enmasse.XHRDriver.prototype=new Enmasse.Driver,Enmasse.XHRDriver.prototype.constructor=Enmasse.XHRDriver,Enmasse.Transport=function(){this.ON_READY="ready",this.ON_MESSAGE="message",this.ON_CONNECTED="connected",this.ON_CONNECT_FAILED="connect_failed",this.ON_CONNECT_LOST="connect_lost",this.ON_DISCONNECTED="disconnected",this.STATE_CONNECTED="connected",this.STATE_CONNECTING="connecting",this.STATE_DISCONNECTED="disconnected",this.STATE_DISCONNECTING="disconnecting",this.state=this.STATE_DISCONNECTED},asEvented.call(Enmasse.Transport.prototype),Enmasse.ProxyTransport=function(n){n=n||{};var e=n.driver||null,t=n.host||null,o=n.port||null,s=this,i=null,r=null,a=null,c=null,E="connect",l="pass",d="poll",f=function(){return"http://"+(i?i:t)+":"+o+"/"+(null!==r?r+"/":"")+"?_r="+(new Date).getTime()},S=function(n,t,o){n=n||"",t=t||function(){},o=o||function(){};var i=function(n){n.sscp.constructor===String&&(n.sscp=[n.sscp]);for(var e=0,o=n.sscp.length;o>e;e++)""!==n.sscp[e]&&s.trigger(s.ON_MESSAGE,n.sscp[e]);t(n)},r=function(){switch(s.state){case s.STATE_CONNECTED:s.state=s.STATE_DISCONNECTING,s.trigger(s.ON_CONNECT_FAILED);break;case s.STATE_CONNECTING:s.state=s.STATE_DISCONNECTING,s.trigger(s.ON_CONNECT_FAILED);break;case s.STATE_DISCONNECTING:s.state=s.STATE_DISCONNECTED,s.trigger(s.ON_DISCONNECTED)}o()};e.send(f(),n,i,r)},h=function(){var n="command="+d+"&clientid="+a+"&sid="+c;S(n,h)},T=function(){var n=function(n){i=n.proxy,a=parseInt(n.clientid,10),r=parseInt(n.childid,10),c=n.sid,s.state=s.STATE_CONNECTED,s.trigger(s.ON_CONNECTED),h()},e=function(){s.state=s.STATE_DISCONNECTED,s.trigger(s.ON_CONNECT_FAILED)},t="command="+E;S(t,n,e)},N=function(){s.trigger(s.ON_READY)},g=function(){T()},p=function(){C(u,"ProxyTransport::handleDriverDisconnected");var n=s.state;switch(s.state=s.STATE_DISCONNECTED,n){case s.STATE_CONNECTED:s.trigger(s.ON_CONNECT_LOST);break;case s.STATE_CONNECTING:s.trigger(s.ON_CONNECT_FAILED);break;case s.STATE_DISCONNECTING:s.trigger(s.ON_DISCONNECTED)}};this.send=function(n,e,t){e=e||function(){},t=t||function(){};var o="command="+l+"&clientid="+a+"&sscp="+n+"&sid="+c;S(o,e,t)},this.connect=function(){C(u,"ProxyTransport::connect",t,o),s.state=s.STATE_CONNECTING,e.connect()},this.disconnect=function(){C(u,"ProxyTransport::disconnect"),i=null,r=null,c=null,this.state=this.STATE_DISCONNECTING,e.disconnect()},this.init=function(){e.init()},e.bind(e.ON_READY,N),e.bind(e.ON_CONNECTED,g),e.bind(e.ON_DISCONNECTED,p)},Enmasse.ProxyTransport.prototype=new Enmasse.Transport,Enmasse.ProxyTransport.prototype.constructor=Enmasse.ProxyTransport,Enmasse.SocketTransport=function(n){n=n||{};var e=n.driver||null,t=n.host||null,o=n.port||null,s=this,i=function(){C(u,"SocketTransport::handleDriverReady"),s.trigger(s.ON_READY)},r=function(n){C(u,"SocketTransport::handleDriverMessage"),s.trigger(s.ON_MESSAGE,n)},a=function(){C(u,"SocketTransport::handleDriverConnected"),s.state=s.STATE_CONNECTED,s.trigger(s.ON_CONNECTED)},c=function(){C(u,"SocketTransport::handleDriverDisconnected");var n=s.state;switch(s.state=s.STATE_DISCONNECTED,n){case s.STATE_CONNECTED:s.trigger(s.ON_CONNECT_LOST);break;case s.STATE_CONNECTING:s.trigger(s.ON_CONNECT_FAILED);break;case s.STATE_DISCONNECTING:s.trigger(s.ON_DISCONNECTED)}};this.send=function(n,t,o){t=t||function(){},o=o||function(){},e.send(n,t,o)},this.connect=function(){C(u,"SocketTransport::connect",t,o),s.state=s.STATE_CONNECTING,e.connect(t,o)},this.disconnect=function(){C(u,"SocketTransport::disconnect"),s.state=s.STATE_DISCONNECTING,e.disconnect()},this.init=function(){e.init()},e.bind(e.ON_READY,i),e.bind(e.ON_MESSAGE,r),e.bind(e.ON_CONNECTED,a),e.bind(e.ON_DISCONNECTED,c)},Enmasse.SocketTransport.prototype=new Enmasse.Transport,Enmasse.SocketTransport.prototype.constructor=Enmasse.SocketTransport,Enmasse.TransportManager=function(){var n={};asEvented.call(n),n.ON_READY="ready";var s=null,i=0,r={},a={},u=0,E=[],l=[],f=[],S=function(){C(c,"TransportManager::instantiate");for(var n,e,t,o,s=0,i=l.length;i>s;s++)n=l[s],e=h(n),t=e.hosts[Math.floor(Math.random()*e.hosts.length)],o=new r[n].transport({"driver":new r[n].driver(e.driver||{}),"host":t,"port":e.port}),a[n]=o,o.bind(o.ON_READY,N);for(n in a)a.hasOwnProperty(n)&&a[n].init()},h=function(n){for(var e=0,t=s.methods.length;t>e;e++)if(s.methods[e].type===n)return s.methods[e];return null},T=function(n){for(var e=f.length;e--;)if(f[e]===n)return!0;return!1},N=function(){++u==l.length&&n.trigger(n.ON_READY)};return n.current=function(){return a[l[i]]},n.next=function(){if(i++,i>=l.length)return!1;var e=l[i];return e===t&&T(o)||e===o&&T(t)?n.next():n.current()},n.reset=function(){l=[],f=[];for(var n=0,e=E.length;e>n;n++){var t=E[(n+i)%e];r[t].driver.hasSupport()&&l.push(t)}i=0},n.addUnsuccessful=function(n){for(var e in a)a.hasOwnProperty(e)&&a[e]==n&&f.push(e)},n.init=function(a){if(s=a||{},i=0,u=0,E=[],r[e]={"driver":Enmasse.XHRDriver,"transport":Enmasse.ProxyTransport},r[t]={"driver":Enmasse.WebSocketDriver,"transport":Enmasse.SocketTransport},r[o]={"driver":Enmasse.FlashSocketDriver,"transport":Enmasse.SocketTransport},d)E=d;else for(var c=0,l=s.methods.length;l>c;c++)E.push(s.methods[c].type);n.reset(),S()},n}(),Enmasse.ConnectionManager=function(){var n={};asEvented.call(n);var e=[0,3,5,10,20,30,45,60];n.STATE_DISCONNECTED="state_disconnected",n.STATE_DISCONNECTING="state_disconnecting",n.STATE_CONNECTING="state_connecting",n.STATE_CONNECTED="state_connected",n.ON_MESSAGE="message",n.ON_STATE="state";var t=null,o=n.STATE_DISCONNECTED,s=null,i=1,r={"start":function(){var n=p.now();this.interval=setInterval(function(){p.now()-n>=t.inactivity_timeout&&g()},1e3)},"stop":function(){clearInterval(this.interval)},"reset":function(){this.stop(),this.start()}},a={"start":function(){this.timeout=setTimeout(function(){N()},1e3*t.connect_timeout)},"stop":function(){clearTimeout(this.timeout)}},u={"active":!1,"start":function(n){var e=this;this.active=!0,this.timeout=setTimeout(function(){e.resolve()},1e3*n)},"stop":function(){this.active=!1,clearTimeout(this.timeout)},"resolve":function(){this.stop(),b()}},E=function(n){C(c,"ConnectionManager::initTransport"),s=n,s.bind(s.ON_MESSAGE,d),s.bind(s.ON_CONNECTED,f),s.bind(s.ON_CONNECT_FAILED,S),s.bind(s.ON_CONNECT_LOST,h),s.bind(s.ON_DISCONNECTED,T)},l=function(){C(c,"ConnectionManager::teardownTransport"),null!==s&&(s.unbind(s.ON_MESSAGE,d),s.unbind(s.ON_CONNECTED,f),s.unbind(s.ON_CONNECT_FAILED,S),s.unbind(s.ON_CONNECT_LOST,h),s.unbind(s.ON_DISCONNECTED,T),s=null)},d=function(e){C(c,"ConnectionManager::handleTransportMessage",e);for(var t=e.split("\x00"),o=0;o<t.length;o++)t[o].length>0&&(r.reset(),C(c,"ConnectionManager::handleTransportMessage","send upstream m:",t[o]),n.trigger(n.ON_MESSAGE,t[o]))},f=function(){C(c,"ConnectionManager::handleTransportConnected"),v()},S=function(){C(c,"ConnectionManager::handleTransportConnectFailed"),N()},h=function(){C(c,"ConnectionManager::handleTransportConnectLost"),g()},T=function(){switch(C(c,"ConnectionManager::handleTransportDisconnected"),o){case n.STATE_CONNECTED:_();break;case n.STATE_CONNECTING:O();break;case n.STATE_DISCONNECTING:A()}},N=function(){C(c,"ConnectionManager::disconnectingOnConnectFailed()"),w()},g=function(){C(c,"ConnectionManager::disconnectingOnConnectLost()"),w()},_=function(){C(c,"ConnectionManager::disconnectedOnConnectLost()"),l(),m()},O=function(){C(c,"ConnectionManager::disconnectedOnConnectFailed()"),Enmasse.TransportManager.addUnsuccessful(s),l(),Enmasse.TransportManager.next()===!1?m():b()},m=function(){C(c,"ConnectionManager::setStateToConnecting()");var t;t=i>=e.length?e[e.length-1]:e[i-1],o=n.STATE_CONNECTING,n.trigger(n.ON_STATE,o,i,t),Enmasse.TransportManager.reset(),i++,u.start(t)},v=function(){C(c,"ConnectionManager::setStateToConnected()"),i=1,Enmasse.TransportManager.reset(),r.reset(),a.stop(),u.stop(),o=n.STATE_CONNECTED,n.trigger(n.ON_STATE,o)},D=function(){C(c,"ConnectionManager::setStateToDisconnecting()"),o=n.STATE_DISCONNECTING,n.trigger(n.ON_STATE,o),w()},A=function(){C(c,"ConnectionManager::setStateToDisconnected()"),i=1,l(),Enmasse.TransportManager.reset(),o=n.STATE_DISCONNECTED,n.trigger(n.ON_STATE,o)},b=function(){o===n.STATE_CONNECTING&&(a.start(),E(Enmasse.TransportManager.current()),s.connect())},w=function(){r.stop(),a.stop(),u.stop(),s?s.disconnect():A()};return n.connect=function(){C(c,"ConnectionManager::connect()"),u.active?u.resolve():m()},n.disconnect=function(){C(c,"ConnectionManager::disconnect()"),D()},n.send=function(n,e,t){C(c,"ConnectionManager::send",n),e=e||function(){},t=t||function(){},s.send(n,e,t)},n.getConnectAttempt=function(){return i},n.init=function(n){C(c,"ConnectionManager::init()",n),t=n},n}()}();
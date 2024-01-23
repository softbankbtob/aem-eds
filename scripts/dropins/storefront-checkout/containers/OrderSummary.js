import*as t from"@dropins/elsie/event-bus.js";import*as e from"@dropins/elsie/fetch-graphql.js";import*as r from"@dropins/elsie/preact-compat.js";import*as i from"@dropins/elsie/preact-hooks.js";import*as n from"@dropins/elsie/preact-jsx-runtime.js";import*as o from"@dropins/elsie/preact.js";export const id=166;export const ids=[166];export const modules={6364:(t,e,r)=>{r.d(e,{td:()=>m,qs:()=>k});var i=r(3474),n=r(5437);function o(){throw new Error("Cycle detected")}var s=Symbol.for("preact-signals");function a(){if(v>1)v--;else{for(var t,e=!1;void 0!==c;){var r=c;for(c=void 0,d++;void 0!==r;){var i=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&y(r))try{r.c()}catch(r){e||(t=r,e=!0)}r=i}}if(d=0,v--,e)throw t}}var u=void 0;var f,c=void 0,v=0,d=0,l=0;function p(t){if(void 0!==u){var e=t.n;if(void 0===e||e.t!==u)return e={i:0,S:t,p:u.s,n:void 0,t:u,e:void 0,x:void 0,r:e},void 0!==u.s&&(u.s.n=e),u.s=e,t.n=e,32&u.f&&t.S(e),e;if(-1===e.i)return e.i=0,void 0!==e.n&&(e.n.p=e.p,void 0!==e.p&&(e.p.n=e.n),e.p=u.s,e.n=void 0,u.s.n=e,u.s=e),e}}function h(t){this.v=t,this.i=0,this.n=void 0,this.t=void 0}function m(t){return new h(t)}function y(t){for(var e=t.s;void 0!==e;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function b(t){for(var e=t.s;void 0!==e;e=e.n){var r=e.S.n;if(void 0!==r&&(e.r=r),e.S.n=e,e.i=-1,void 0===e.n){t.s=e;break}}}function _(t){for(var e=t.s,r=void 0;void 0!==e;){var i=e.p;-1===e.i?(e.S.U(e),void 0!==i&&(i.n=e.n),void 0!==e.n&&(e.n.p=i)):r=e,e.S.n=e.r,void 0!==e.r&&(e.r=void 0),e=i}t.s=r}function g(t){h.call(this,void 0),this.x=t,this.s=void 0,this.g=l-1,this.f=4}function S(t){var e=t.u;if(t.u=void 0,"function"==typeof e){v++;var r=u;u=void 0;try{e()}catch(e){throw t.f&=-2,t.f|=8,x(t),e}finally{u=r,a()}}}function x(t){for(var e=t.s;void 0!==e;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,S(t)}function j(t){if(u!==this)throw new Error("Out-of-order effect");_(this),u=t,this.f&=-2,8&this.f&&x(this),a()}function O(t){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}function w(t){var e=new O(t);try{e.c()}catch(t){throw e.d(),t}return e.d.bind(e)}function C(t,e){i.options[t]=e.bind(null,i.options[t]||function(){})}function E(t){f&&f(),f=t&&t.S()}function P(t){var e=this,r=t.data,o=k(r);o.value=r;var s=(0,n.useMemo)((function(){for(var t=e.__v;t=t.__;)if(t.__c){t.__c.__$f|=4;break}return e.__$u.c=function(){var t;(0,i.isValidElement)(s.peek())||3!==(null==(t=e.base)?void 0:t.nodeType)?(e.__$f|=1,e.setState({})):e.base.data=s.peek()},function(t){return new g(t)}((function(){var t=o.value.value;return 0===t?0:!0===t?"":t||""}))}),[]);return s.value}function Z(t,e,r,i){var n=e in t&&void 0===t.ownerSVGElement,o=m(r);return{o:function(t,e){o.value=t,i=e},d:w((function(){var r=o.value.value;i[e]!==r&&(i[e]=r,n?t[e]=r:r?t.setAttribute(e,r):t.removeAttribute(e))}))}}function k(t){return(0,n.useMemo)((function(){return m(t)}),[])}h.prototype.brand=s,h.prototype.h=function(){return!0},h.prototype.S=function(t){this.t!==t&&void 0===t.e&&(t.x=this.t,void 0!==this.t&&(this.t.e=t),this.t=t)},h.prototype.U=function(t){if(void 0!==this.t){var e=t.e,r=t.x;void 0!==e&&(e.x=r,t.e=void 0),void 0!==r&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r)}},h.prototype.subscribe=function(t){var e=this;return w((function(){var r=e.value,i=32&this.f;this.f&=-33;try{t(r)}finally{this.f|=i}}))},h.prototype.valueOf=function(){return this.value},h.prototype.toString=function(){return this.value+""},h.prototype.toJSON=function(){return this.value},h.prototype.peek=function(){return this.v},Object.defineProperty(h.prototype,"value",{get:function(){var t=p(this);return void 0!==t&&(t.i=this.i),this.v},set:function(t){if(u instanceof g&&function(){throw new Error("Computed cannot have side-effects")}(),t!==this.v){d>100&&o(),this.v=t,this.i++,l++,v++;try{for(var e=this.t;void 0!==e;e=e.x)e.t.N()}finally{a()}}}}),(g.prototype=new h).h=function(){if(this.f&=-3,1&this.f)return!1;if(32==(36&this.f))return!0;if(this.f&=-5,this.g===l)return!0;if(this.g=l,this.f|=1,this.i>0&&!y(this))return this.f&=-2,!0;var t=u;try{b(this),u=this;var e=this.x();(16&this.f||this.v!==e||0===this.i)&&(this.v=e,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return u=t,_(this),this.f&=-2,!0},g.prototype.S=function(t){if(void 0===this.t){this.f|=36;for(var e=this.s;void 0!==e;e=e.n)e.S.S(e)}h.prototype.S.call(this,t)},g.prototype.U=function(t){if(void 0!==this.t&&(h.prototype.U.call(this,t),void 0===this.t)){this.f&=-33;for(var e=this.s;void 0!==e;e=e.n)e.S.U(e)}},g.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;void 0!==t;t=t.x)t.t.N()}},g.prototype.peek=function(){if(this.h()||o(),16&this.f)throw this.v;return this.v},Object.defineProperty(g.prototype,"value",{get:function(){1&this.f&&o();var t=p(this);if(this.h(),void 0!==t&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),O.prototype.c=function(){var t=this.S();try{if(8&this.f)return;if(void 0===this.x)return;var e=this.x();"function"==typeof e&&(this.u=e)}finally{t()}},O.prototype.S=function(){1&this.f&&o(),this.f|=1,this.f&=-9,S(this),b(this),v++;var t=u;return u=this,j.bind(this,t)},O.prototype.N=function(){2&this.f||(this.f|=2,this.o=c,c=this)},O.prototype.d=function(){this.f|=8,1&this.f||x(this)},P.displayName="_st",Object.defineProperties(h.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:P},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}}),C("__b",(function(t,e){if("string"==typeof e.type){var r,i=e.props;for(var n in i)if("children"!==n){var o=i[n];o instanceof h&&(r||(e.__np=r={}),r[n]=o,i[n]=o.peek())}}t(e)})),C("__r",(function(t,e){E();var r,i=e.__c;i&&(i.__$f&=-2,void 0===(r=i.__$u)&&(i.__$u=r=function(t){var e;return w((function(){e=this})),e.c=function(){i.__$f|=1,i.setState({})},e}())),i,E(r),t(e)})),C("__e",(function(t,e,r,i){E(),void 0,t(e,r,i)})),C("diffed",(function(t,e){var r;if(E(),void 0,"string"==typeof e.type&&(r=e.__e)){var i=e.__np,n=e.props;if(i){var o=r.U;if(o)for(var s in o){var a=o[s];void 0===a||s in i||(a.d(),o[s]=void 0)}else r.U=o={};for(var u in i){var f=o[u],c=i[u];void 0===f?(f=Z(r,u,c,n),o[u]=f):f.o(c,n)}}}t(e)})),C("unmount",(function(t,e){if("string"==typeof e.type){var r=e.__e;if(r){var i=r.U;if(i)for(var n in r.U=void 0,i){var o=i[n];o&&o.d()}}}else{var s=e.__c;if(s){var a=s.__$u;a&&(s.__$u=void 0,a.d())}}t(e)})),C("__h",(function(t,e,r,i){(i<3||9===i)&&(e.__$f|=2),t(e,r,i)})),i.Component.prototype.shouldComponentUpdate=function(t,e){var r=this.__$u;if(!(r&&void 0!==r.s||4&this.__$f))return!0;if(3&this.__$f)return!0;for(var i in e)return!0;for(var n in t)if("__source"!==n&&t[n]!==this.props[n])return!0;for(var o in this.props)if(!(o in t))return!0;return!1}},9614:(t,e,r)=>{r.d(e,{i:()=>_});var i=r(5587),n=r(1892),o=r.n(n),s=r(5760),a=r.n(s),u=r(8311),f=r.n(u),c=r(8192),v=r.n(c),d=r(8060),l=r.n(d),p=r(4865),h=r.n(p),m=r(5278),y={};y.styleTagTransform=h(),y.setAttributes=v(),y.insert=f().bind(null,"head"),y.domAPI=a(),y.insertStyleElement=l();o()(m.Z,y);m.Z&&m.Z.locals&&m.Z.locals;var b=r(7188),_=function(t){var e=t.variant,r=void 0===e?"primary":e,n=t.className;return(0,b.jsx)("hr",{role:"separator",className:(0,i.S)(["elsie-divider","elsie-divider--".concat(r),n])})}},5140:(t,e,r)=>{r.d(e,{t:()=>w});var i=r(5587),n=r(1892),o=r.n(n),s=r(5760),a=r.n(s),u=r(8311),f=r.n(u),c=r(8192),v=r.n(c),d=r(8060),l=r.n(d),p=r(4865),h=r.n(p),m=r(733),y={};y.styleTagTransform=h(),y.setAttributes=v(),y.insert=f().bind(null,"head"),y.domAPI=a(),y.insertStyleElement=l();o()(m.Z,y);m.Z&&m.Z.locals&&m.Z.locals;var b=r(7188);function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}var g=["amount","currency","locale","variant","className","children","sale","formatOptions"];function S(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?S(Object(r),!0).forEach((function(e){j(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function j(t,e,r){return(e=function(t){var e=function(t,e){if("object"!=_(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var i=r.call(t,e||"default");if("object"!=_(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==_(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function O(t,e){if(null==t)return{};var r,i,n=function(t,e){if(null==t)return{};var r,i,n={},o=Object.keys(t);for(i=0;i<o.length;i++)r=o[i],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)r=o[i],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var w=function(t){var e=t.amount,r=void 0===e?0:e,n=t.currency,o=t.locale,s=void 0===o?void 0:o,a=t.variant,u=void 0===a?"default":a,f=t.className,c=(t.children,t.sale),v=void 0!==c&&c,d=t.formatOptions,l=void 0===d?{}:d,p=O(t,g),h=new Intl.NumberFormat(s,x({style:"currency",currency:n||"USD",minimumFractionDigits:2,maximumFractionDigits:2},l));return(0,b.jsx)("span",x(x({},p),{},{className:(0,i.S)(["elsie-price","elsie-price--".concat(u),["elsie-price--sale",v],f]),children:h.format(r)}))}},7553:(t,e,r)=>{r.d(e,{X:()=>b});var i=r(1892),n=r.n(i),o=r(5760),s=r.n(o),a=r(8311),u=r.n(a),f=r(8192),c=r.n(f),v=r(8060),d=r.n(v),l=r(4865),p=r.n(l),h=r(4553),m={};m.styleTagTransform=p(),m.setAttributes=c(),m.insert=u().bind(null,"head"),m.domAPI=s(),m.insertStyleElement=d();n()(h.Z,m);h.Z&&h.Z.locals&&h.Z.locals;var y=r(7188),b=function(t){var e=t.className,r=t.children,i=t.level,n=void 0===i?2:i,o=n>=1&&n<=6?"h".concat(n):"h2";return(0,y.jsx)(o,{className:e,children:r})}},1970:(t,e,r)=>{r.d(e,{He:()=>i.H,Yj:()=>i.Y,ZP:()=>i.H});var i=r(2449)},5963:(t,e,r)=>{r.d(e,{b:()=>i});var i=(0,r(6364).td)({localData:void 0})},5278:(t,e,r)=>{r.d(e,{Z:()=>a});var i=r(4933),n=r.n(i),o=r(3476),s=r.n(o)()(n());s.push([t.id,".elsie-divider{\n  border:none;\n}\n\n.elsie-divider--primary{\n  border-top:var(--shape-border-width-3) solid var(--color-neutral-400);\n  margin:var(--spacing-xbig) auto;\n}\n\n.elsie-divider--secondary{\n  border-top:var(--shape-border-width-2) solid var(--color-neutral-400);\n  margin:var(--spacing-medium) auto;\n}\n",""]);const a=s},733:(t,e,r)=>{r.d(e,{Z:()=>a});var i=r(4933),n=r.n(i),o=r(3476),s=r.n(o)()(n());s.push([t.id,".elsie-price{\n  color:var(--color-neutral-800);\n  font:var(--type-body-2-emphasized-font);\n}\n\n.elsie-price--strikethrough{\n  text-decoration:line-through;\n}\n\n.elsie-price--sale{\n  color:var(--color-alert-800);\n}\n",""]);const a=s},4553:(t,e,r)=>{r.d(e,{Z:()=>a});var i=r(4933),n=r.n(i),o=r(3476),s=r.n(o)()(n());s.push([t.id,"\n",""]);const a=s},6765:(e,r,i)=>{e.exports=(t=>{var e={};return i.d(e,t),e})({events:()=>t.events})},9699:(t,r,i)=>{t.exports=(t=>{var e={};return i.d(e,t),e})({FetchGraphQL:()=>e.FetchGraphQL})},4853:(t,e,i)=>{t.exports=(t=>{var e={};return i.d(e,t),e})({createContext:()=>r.createContext,forwardRef:()=>r.forwardRef,useCallback:()=>r.useCallback,useContext:()=>r.useContext,useEffect:()=>r.useEffect,useImperativeHandle:()=>r.useImperativeHandle,useMemo:()=>r.useMemo,useRef:()=>r.useRef,useState:()=>r.useState})},5437:(t,e,r)=>{t.exports=(t=>{var e={};return r.d(e,t),e})({useCallback:()=>i.useCallback,useContext:()=>i.useContext,useDebugValue:()=>i.useDebugValue,useEffect:()=>i.useEffect,useId:()=>i.useId,useImperativeHandle:()=>i.useImperativeHandle,useLayoutEffect:()=>i.useLayoutEffect,useMemo:()=>i.useMemo,useReducer:()=>i.useReducer,useRef:()=>i.useRef,useState:()=>i.useState})},4142:(t,e,r)=>{t.exports=(t=>{var e={};return r.d(e,t),e})({Fragment:()=>n.Fragment,jsx:()=>n.jsx,jsxs:()=>n.jsxs})},3474:(t,e,r)=>{t.exports=(t=>{var e={};return r.d(e,t),e})({Component:()=>o.Component,Fragment:()=>o.Fragment,cloneElement:()=>o.cloneElement,createContext:()=>o.createContext,createElement:()=>o.createElement,createRef:()=>o.createRef,h:()=>o.h,hydrate:()=>o.hydrate,isValidElement:()=>o.isValidElement,options:()=>o.options,render:()=>o.render,toChildArray:()=>o.toChildArray})}};import s from"../runtime.js";import*as a from"../757.js";s.C(a);import*as u from"../323.js";s.C(u);import*as f from"../965.js";s.C(f);import*as c from"../449.js";s.C(c);import*as v from"./OrderSummary.js";s.C(v);var d,l=(d=1970,s(s.s=d)),p=l.He,h=l.ZP,m=l.Yj;export{p as OrderSummary,h as default,m as useOrderSummary};
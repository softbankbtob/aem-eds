import*as e from"@dropins/elsie/event-bus.js";import*as r from"@dropins/elsie/fetch-graphql.js";import*as t from"@dropins/elsie/preact-compat.js";import*as s from"@dropins/elsie/preact-hooks.js";import*as o from"@dropins/elsie/preact-jsx-runtime.js";import*as n from"@dropins/elsie/preact.js";export const id=812;export const ids=[812];export const modules={1392:(e,r,t)=>{t.d(r,{Hd:()=>s.H,IL:()=>o.I,ZP:()=>o.y,yJ:()=>o.y});var s=t(9688),o=t(9636)},7294:(e,r,t)=>{t.d(r,{c:()=>f,l:()=>c});var s=t(3474),o=t(5437),n=t(2460),a=t(7188);function u(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var s,o,n,a,u=[],i=!0,l=!1;try{if(n=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;i=!1}else for(;!(i=(s=n.call(t)).done)&&(u.push(s.value),u.length!==r);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(e,r)||function(e,r){if(!e)return;if("string"==typeof e)return i(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return i(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,s=new Array(r);t<r;t++)s[t]=e[t];return s}var l=(0,s.createContext)(void 0);function f(e){var r=e.children,t=u((0,o.useState)({}),2),s=t[0],i=t[1];return(0,o.useEffect)((function(){(0,n.w)().then((function(e){return i({fields:e})}))}),[]),(0,a.jsx)(l.Provider,{value:s,children:r})}function c(){var e=(0,o.useContext)(l);if(void 0!==e)return e;throw new Error("useAddressFormFields must be used within an AddressFormFieldsProvider")}},6765:(r,t,s)=>{r.exports=(e=>{var r={};return s.d(r,e),r})({events:()=>e.events})},9699:(e,t,s)=>{e.exports=(e=>{var r={};return s.d(r,e),r})({FetchGraphQL:()=>r.FetchGraphQL})},4853:(e,r,s)=>{e.exports=(e=>{var r={};return s.d(r,e),r})({createContext:()=>t.createContext,forwardRef:()=>t.forwardRef,useCallback:()=>t.useCallback,useContext:()=>t.useContext,useEffect:()=>t.useEffect,useImperativeHandle:()=>t.useImperativeHandle,useMemo:()=>t.useMemo,useRef:()=>t.useRef,useState:()=>t.useState})},5437:(e,r,t)=>{e.exports=(e=>{var r={};return t.d(r,e),r})({useCallback:()=>s.useCallback,useContext:()=>s.useContext,useDebugValue:()=>s.useDebugValue,useEffect:()=>s.useEffect,useId:()=>s.useId,useImperativeHandle:()=>s.useImperativeHandle,useLayoutEffect:()=>s.useLayoutEffect,useMemo:()=>s.useMemo,useReducer:()=>s.useReducer,useRef:()=>s.useRef,useState:()=>s.useState})},4142:(e,r,t)=>{e.exports=(e=>{var r={};return t.d(r,e),r})({Fragment:()=>o.Fragment,jsx:()=>o.jsx,jsxs:()=>o.jsxs})},3474:(e,r,t)=>{e.exports=(e=>{var r={};return t.d(r,e),r})({Component:()=>n.Component,Fragment:()=>n.Fragment,cloneElement:()=>n.cloneElement,createContext:()=>n.createContext,createElement:()=>n.createElement,createRef:()=>n.createRef,h:()=>n.h,hydrate:()=>n.hydrate,isValidElement:()=>n.isValidElement,options:()=>n.options,render:()=>n.render,toChildArray:()=>n.toChildArray})}};import a from"../runtime.js";import*as u from"../757.js";a.C(u);import*as i from"../840.js";a.C(i);import*as l from"../965.js";a.C(l);import*as f from"../483.js";a.C(f);import*as c from"../378.js";a.C(c);import*as d from"../636.js";a.C(d);import*as m from"./BillToShippingAddress.js";a.C(m);var p,v=(p=1392,a(a.s=p)),h=v.Hd,x=v.yJ,y=v.IL,C=v.ZP;export{h as BILL_TO_SHIPPING_KEY,x as BillToShippingAddress,y as compareAddresses,C as default};
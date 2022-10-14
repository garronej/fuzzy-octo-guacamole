var n=Symbol("@ts-pattern/matcher"),t="@ts-pattern/anonymous-select-key",e=function(n){return Boolean(n&&"object"==typeof n)},r=function(t){return t&&!!t[n]},u=function t(u,i,c){if(e(u)){if(r(u)){var o=u[n]().match(i),a=o.matched,f=o.selections;return a&&f&&Object.keys(f).forEach(function(n){return c(n,f[n])}),a}if(!e(i))return!1;if(Array.isArray(u))return!!Array.isArray(i)&&u.length===i.length&&u.every(function(n,e){return t(n,i[e],c)});if(u instanceof Map)return i instanceof Map&&Array.from(u.keys()).every(function(n){return t(u.get(n),i.get(n),c)});if(u instanceof Set){if(!(i instanceof Set))return!1;if(0===u.size)return 0===i.size;if(1===u.size){var s=Array.from(u.values())[0];return r(s)?Array.from(i.values()).every(function(n){return t(s,n,c)}):i.has(s)}return Array.from(u.values()).every(function(n){return i.has(n)})}return Object.keys(u).every(function(e){var o,a=u[e];return(e in i||r(o=a)&&"optional"===o[n]().matcherType)&&t(a,i[e],c)})}return Object.is(i,u)},i=function t(u){var i,o,a;return e(u)?r(u)?null!=(i=null==(o=(a=u[n]()).getSelectionKeys)?void 0:o.call(a))?i:[]:Array.isArray(u)?c(u,t):c(Object.values(u),t):[]},c=function(n,t){return n.reduce(function(n,e){return n.concat(t(e))},[])};function o(t){var e;return(e={})[n]=function(){return{match:function(n){var e={},r=function(n,t){e[n]=t};return void 0===n?(i(t).forEach(function(n){return r(n,void 0)}),{matched:!0,selections:e}):{matched:u(t,n,r),selections:e}},getSelectionKeys:function(){return i(t)},matcherType:"optional"}},e}function a(t){var e;return(e={})[n]=function(){return{match:function(n){if(!Array.isArray(n))return{matched:!1};var e={};if(0===n.length)return i(t).forEach(function(n){e[n]=[]}),{matched:!0,selections:e};var r=function(n,t){e[n]=(e[n]||[]).concat([t])};return{matched:n.every(function(n){return u(t,n,r)}),selections:e}},getSelectionKeys:function(){return i(t)}}},e}function f(){var t,e=[].slice.call(arguments);return(t={})[n]=function(){return{match:function(n){var t={},r=function(n,e){t[n]=e};return{matched:e.every(function(t){return u(t,n,r)}),selections:t}},getSelectionKeys:function(){return c(e,i)},matcherType:"and"}},t}function s(){var t,e=[].slice.call(arguments);return(t={})[n]=function(){return{match:function(n){var t={},r=function(n,e){t[n]=e};return c(e,i).forEach(function(n){return r(n,void 0)}),{matched:e.some(function(t){return u(t,n,r)}),selections:t}},getSelectionKeys:function(){return c(e,i)},matcherType:"or"}},t}function l(t){var e;return(e={})[n]=function(){return{match:function(n){return{matched:!u(t,n,function(){})}},getSelectionKeys:function(){return[]},matcherType:"not"}},e}function h(t){var e;return(e={})[n]=function(){return{match:function(n){return{matched:Boolean(t(n))}}}},e}function v(){var e,r=[].slice.call(arguments),c="string"==typeof r[0]?r[0]:void 0,o=2===r.length?r[1]:"string"==typeof r[0]?void 0:r[0];return(e={})[n]=function(){return{match:function(n){var e,r=((e={})[null!=c?c:t]=n,e);return{matched:void 0===o||u(o,n,function(n,t){r[n]=t}),selections:r}},getSelectionKeys:function(){return[null!=c?c:t].concat(void 0===o?[]:i(o))}}},e}var y=h(function(n){return!0}),m=y,d=h(function(n){return"string"==typeof n}),g=h(function(n){return"number"==typeof n}),p=h(function(n){return"boolean"==typeof n}),b=h(function(n){return"bigint"==typeof n}),w=h(function(n){return"symbol"==typeof n}),A=h(function(n){return null==n}),S={__proto__:null,optional:o,array:a,intersection:f,union:s,not:l,when:h,select:v,any:y,_:m,string:d,number:g,boolean:p,bigint:b,symbol:w,nullish:A,instanceOf:function(n){return h(function(n){return function(t){return t instanceof n}}(n))},typed:function(){return{array:a,optional:o,intersection:f,union:s,not:l,select:v,when:h}}},K=function(n){return new O(n,[])},O=/*#__PURE__*/function(){function n(n,t){this.value=void 0,this.cases=void 0,this.value=n,this.cases=t}var e=n.prototype;return e.with=function(){var e=[].slice.call(arguments),r=e[e.length-1],i=[e[0]],c=[];return 3===e.length&&"function"==typeof e[1]?(i.push(e[0]),c.push(e[1])):e.length>2&&i.push.apply(i,e.slice(1,e.length-1)),new n(this.value,this.cases.concat([{match:function(n){var e={},r=Boolean(i.some(function(t){return u(t,n,function(n,t){e[n]=t})})&&c.every(function(t){return t(n)}));return{matched:r,value:r&&Object.keys(e).length?t in e?e[t]:e:n}},handler:r}]))},e.when=function(t,e){return new n(this.value,this.cases.concat([{match:function(n){return{matched:Boolean(t(n)),value:n}},handler:e}]))},e.otherwise=function(t){return new n(this.value,this.cases.concat([{match:function(n){return{matched:!0,value:n}},handler:t}])).run()},e.exhaustive=function(){return this.run()},e.run=function(){for(var n=this.value,t=void 0,e=0;e<this.cases.length;e++){var r=this.cases[e],u=r.match(this.value);if(u.matched){n=u.value,t=r.handler;break}}if(!t){var i;try{i=JSON.stringify(this.value)}catch(n){i=this.value}throw new Error("Pattern matching error: no pattern matches value "+i)}return t(n,this.value)},n}();function j(){var n=[].slice.call(arguments);if(1===n.length){var t=n[0];return function(n){return u(t,n,function(){})}}if(2===n.length){var e=n,r=e[0],i=e[1];return u(r,i,function(){})}throw new Error("isMatching wasn't given the right number of arguments: expected 1 or 2, received "+n.length+".")}export{S as P,S as Pattern,j as isMatching,K as match};
//# sourceMappingURL=index.module.js.map

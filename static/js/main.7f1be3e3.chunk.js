(this.webpackJsonpproblems=this.webpackJsonpproblems||[]).push([[0],{23:function(n,e,t){},24:function(n,e,t){},26:function(n,e,t){},27:function(n,e,t){var r={"./alg.js":[32,3],"./calc.js":[33,4],"./math.js":[34,5],"./physics.js":[35,6]};function i(n){if(!t.o(r,n))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=r[n],i=e[0];return t.e(e[1]).then((function(){return t(i)}))}i.keys=function(){return Object.keys(r)},i.id=27,n.exports=i},30:function(n,e,t){},31:function(n,e,t){"use strict";t.r(e);var r=t(1),i=t.n(r),a=t(13),o=t.n(a),c=(t(23),t(2)),s=(t(24),t(4)),u=t.n(s),l=t(9),f=(t(26),t(5)),d=t(8),h={},j={Algebra:{d:["alg"],p:["l1","l2"]},"Exponents and compound interest":{d:["math"],p:["e1"]},Calculus:{d:["calc"],p:["c1"]},Physics:{d:["physics"],p:["thermal1"]},"Simultaneous equations":{d:["alg"],p:["simult1"]}},b=[];function m(n){return p.apply(this,arguments)}function p(){return(p=Object(l.a)(u.a.mark((function n(e){var r,i,a;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=Object(d.a)(j[e].d),n.prev=1,r.s();case 3:if((i=r.n()).done){n.next=15;break}if(a=i.value,-1!==b.indexOf(a)){n.next=13;break}return n.t0=f.a,n.t1=Object(f.a)({},h),n.next=10,t(27)("./".concat(a,".js"));case 10:n.t2=n.sent.default,h=(0,n.t0)(n.t1,n.t2),b.push(a);case 13:n.next=3;break;case 15:n.next=20;break;case 17:n.prev=17,n.t3=n.catch(1),r.e(n.t3);case 20:return n.prev=20,r.f(),n.finish(20);case 23:return n.abrupt("return",j[e].p);case 24:case"end":return n.stop()}}),n,null,[[1,17,20,23]])})))).apply(this,arguments)}var v={};function O(){var n=v;return v={},function(){v=n}}function x(n,e){n in v||(v[n]={});var t=JSON.stringify(e);for(var r in v[n]){var i,a=Object(d.a)(v[n][r]);try{for(a.s();!(i=a.n()).done;){var o=i.value;if(JSON.stringify(o)===t)return!1}}catch(s){a.e(s)}finally{a.f()}}var c=g(new Date);return c in v[n]||(v[n][c]=[]),v[n][c].push(e),!0}function w(n){var e,t=0,r=new Date;for(var i in v[n])(e=k(i))<r&&(r=e),t+=v[n][i].length;t>h[n].turnover&&v[n][g(r)].shift()}function g(n){var e=(n.getMonth()+1<10?"0":"")+(n.getMonth()+1),t=(n.getDate()<10?"0":"")+n.getDate();return"".concat(n.getFullYear()).concat(e).concat(t)}function k(n){var e=parseInt(n.slice(0,4)),t=parseInt(n.slice(4,6))-1,r=parseInt(n.slice(6,8));return new Date(e,t,r)}function y(n){var e=function(n){for(var e,t=0;t<200;t++){if(x(n,(e=h[n].generate()).q))return e;w(n)}return console.warn("Unable to create unique problem (id: ".concat(n,", data: ").concat(e,")")),e}(n),t=h[n].format(e);return void 0===t.id&&(t.id=JSON.stringify(e.q)+n),t}var S=t(6),C=t(18),N=t(0);function M(n){var e=Object(r.useRef)(null),t=n.onClickOutside,i=n.active,a=Object(C.a)(n,["onClickOutside","active"]);return Object(r.useEffect)((function(){if(i){var n=function(n){null===e.current||e.current.contains(n.target)||t()};return document.addEventListener("mousedown",n),document.addEventListener("focusin",n),function(){document.removeEventListener("mousedown",n),document.removeEventListener("focusin",n)}}}),[e,t,i]),Object(N.jsx)("div",Object(f.a)(Object(f.a)({ref:e},a),{},{children:n.children}))}M.defaultProps={className:"",onClickOutside:function(){return console.warn("No onClickOutside passed to OutsideClickDetector")},active:!0};var E=M;function L(n){var e=Object(r.useState)(!1),t=Object(c.a)(e,2),i=t[0],a=t[1];return Object(N.jsxs)(E,{className:"DotsMenu",onClickOutside:function(){return a(!1)},active:i,children:[Object(N.jsx)("button",{className:"DotsMenu__button",onClick:function(){return a(!i)},"aria-label":"Actions Menu",children:Object(N.jsx)("svg",{width:"24",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(N.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"})})}),Object(N.jsx)("ul",{className:"DotsMenu__popup"+(i?" open":""),children:n.items.map((function(n,e){return Object(N.jsx)("li",{children:Object(N.jsx)("button",{onClick:function(){n[1](),a(!1)},children:n[0]})},e)}))})]})}function A(n){var e=n.problem,t=Object(r.useState)(!1),i=Object(c.a)(t,2),a=i[0],o=i[1],s=Object(r.useState)(!1),u=Object(c.a)(s,2),l=u[0],f=u[1];return Object(N.jsxs)("li",{children:[Object(N.jsx)("div",{className:"SetItem__question",children:e.question}),Object(N.jsx)("button",{className:"link-button",onClick:function(){return o(!a)},children:a?"Hide answer":"Show answer"}),Object(N.jsxs)("div",{className:"SetItem__answer-section"+(a?" open":""),children:[Object(N.jsx)("div",{className:"SetItem__answer",children:e.answer}),e.explanation&&Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)("button",{className:"link-button",onClick:function(){return f(!l)},children:l?"Hide explanation":"Show explanation"}),Object(N.jsx)("div",{className:"SetItem__explanation"+(l?" open":""),children:e.explanation})]})]})]})}function _(n){return I.apply(this,arguments)}function I(){return(I=Object(l.a)(u.a.mark((function n(e){var t,r,i,a,o,s,l,f;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=Object(c.a)(e,2),r=t[0],i=t[1],n.next=3,m(r);case 3:for(a=n.sent,o=[],s=O(),S.g.initialize(i),l=0;l<5;l++)f=a[Math.floor(S.g.random()*a.length)],o.push(y(f));return s(),n.abrupt("return",o);case 10:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function R(n){var e=n.route,t=n.newSet,i=n.goto,a=Object(c.a)(e,2),o=a[0],s=a[1],u=Object(r.useState)(null),l=Object(c.a)(u,2),f=l[0],d=l[1];return Object(r.useLayoutEffect)((function(){_(e).then((function(n){return d(n)}))}),[e]),Object(N.jsxs)("div",{className:"SetCard",children:[Object(N.jsxs)("div",{className:"SetCard__header",children:[Object(N.jsx)("h2",{children:o}),Object(N.jsxs)("div",{className:"SetCard__buttons",children:[Object(N.jsx)("button",{onClick:function(){return t(o)},children:Object(N.jsx)("svg",{width:"24px",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(N.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})}),Object(N.jsx)(L,{items:[["Export worksheet",function(){return i([o,s,1])}],["Export answer sheet",function(){return i([o,s,2])}],["Export answers and explanations",function(){return i([o,s,3])}],["Reload all problems",function(){return t(o)}]]})]})]}),Object(N.jsx)("hr",{}),null===f?Object(N.jsx)("p",{children:"Loading problems..."}):Object(N.jsx)("ol",{className:"SetCard__list",children:f.map((function(n){return Object(N.jsx)(A,{problem:n},n.id)}))})]})}function D(n){var e=n.route,t=n.printPage,r=Object(c.a)(e,3),i=r[0],a=(r[1],r[2]),o=_(e);return Object(N.jsxs)("div",{className:"SetCard",children:[Object(N.jsxs)("div",{className:"SetCard__header",children:[Object(N.jsx)("h2",{children:i}),Object(N.jsx)("button",{className:"link-button no-print",onClick:function(){return t()},children:"Print"})]}),Object(N.jsx)("hr",{}),Object(N.jsx)("ol",{className:"SetCard__list",children:o.map((function(n){var e;switch(a){case 1:e=n.question;break;case 2:e=n.answer;break;case 3:e=n.explanation?Object(N.jsxs)(N.Fragment,{children:[n.answer,Object(N.jsx)("br",{}),n.explanation]}):n.answer;break;default:throw new Error("Unrecognized mode: ".concat(a))}return Object(N.jsx)("li",{children:Object(N.jsx)("div",{children:e})},n.id)}))})]})}var q=t(14),F=t(15),J=t(17),P=t(16),z=(t(30),function(n){Object(J.a)(t,n);var e=Object(P.a)(t);function t(n){var r;return Object(q.a)(this,t),(r=e.call(this,n)).state={error:null,errorInfo:null},r}return Object(F.a)(t,[{key:"componentDidCatch",value:function(n,e){console.log(n,e),this.setState({error:n,errorInfo:e})}},{key:"render",value:function(){return null!==this.state.error?this.props.onError(this.state.error,this.state.errorInfo):this.props.children}}]),t}(i.a.Component));function B(n){var e=n.children;return Object(N.jsx)(z,{onError:function(n,e){return Object(N.jsxs)("div",{className:"SetError",children:[Object(N.jsx)("h2",{children:"Something went wrong."}),Object(N.jsxs)("p",{children:["There was an error creating or displaying the problems you requested. This is almost certainly my fault, and if you email me at ",Object(N.jsx)("a",{href:"mailto://muzioclavecin@gmail.com",children:"muzioclavecin@gmail.com"})," I'll try to fix it as soon as possible. Please include the following text:"]}),Object(N.jsxs)("p",{children:["URL: ",window.location.href,", Error: ",n.toString()," \u2013 ",JSON.stringify(e)]})]})},children:e})}var H="/problems";function T(n){var e=n.name,t=n.onClick;return Object(N.jsxs)("button",{className:"Choice",onClick:t,children:[Object(N.jsx)("span",{children:e}),Object(N.jsx)("svg",{width:"24px",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(N.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})}function U(n){var e=n.newSet;return Object(N.jsx)("div",{className:"Chooser",children:Object.entries(j).map((function(n,t){var r=Object(c.a)(n,2),i=r[0];r[1];return Object(N.jsx)(T,{name:i,onClick:function(){return e(i)}},t)}))})}function Y(){var n=window.location.href.split("#!").filter((function(n){return""!==n}));if(1===n.length)return[null];var e,t=n[1].split("/");try{var r=decodeURIComponent(t[0]),i=(e=t[1],[parseInt(e.slice(1),36),parseInt(e[0])]),a=Object(c.a)(i,2);return[r,a[0],a[1]]}catch(o){return console.error("Couldn't resolve url data fragment, redirecting to home."),G([null]),[null]}}function G(n){var e=Object(c.a)(n,3),t=e[0],r=e[1],i=e[2];null!==t?(window.history.pushState(n,"","".concat(H,"#!").concat(t,"/").concat(function(n,e){return e.toString()+n.toString(36)}(r,i))),document.title="".concat(t).concat(0===i?"":" (".concat(1===i?"worksheet":"answers",")")," | Adrian's endless source of problems")):(window.history.pushState(null,"","".concat(H)),document.title="Adrian's endless source of problems")}var W=function(){var n=Object(r.useState)(Y()),e=Object(c.a)(n,2),t=e[0],i=e[1];Object(r.useEffect)((function(){var n=function(){i(Y())};return window.addEventListener("popstate",n),function(){window.removeEventListener("popstate",n)}})),function(){var n=new Date;for(var e in v)for(var t in v[e])n-k(t)>18144e5&&delete v[e][t]}();var a=function(n){G(n),i(n)},o=function(n){var e=S.g.newRandomSeed();a([n,e,0])},s=Object(r.useState)(!1),u=Object(c.a)(s,2),l=u[0],f=u[1];return Object(r.useEffect)((function(){l&&(window.print(),f(!1))}),[l]),Object(N.jsxs)("div",{className:"App"+(l?" print":""),children:[Object(N.jsx)("header",{className:"App__header no-print",children:Object(N.jsx)("h1",{children:"Adrian's endless source of problems"})}),Object(N.jsx)("main",{children:null===t[0]?Object(N.jsx)(U,{newSet:o}):Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)("nav",{className:"no-print",children:[Object(N.jsxs)("button",{className:"link-button",onClick:function(){return window.history.back()},children:[Object(N.jsx)("svg",{width:"15px",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:Object(N.jsx)("path",{fillRule:"evenodd",d:"M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z",clipRule:"evenodd"})}),"Back"]}),Object(N.jsxs)("button",{className:"link-button",onClick:function(){return a([null])},children:[Object(N.jsx)("svg",{width:"15px",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:Object(N.jsx)("path",{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"})}),"Home"]})]}),Object(N.jsx)(B,{children:0===t[2]?Object(N.jsx)(R,{route:t,newSet:o,goto:a}):Object(N.jsx)(D,{route:t,printPage:function(){f(!0)}})})]})})]})},V=function(n){n&&n instanceof Function&&t.e(7).then(t.bind(null,36)).then((function(e){var t=e.getCLS,r=e.getFID,i=e.getFCP,a=e.getLCP,o=e.getTTFB;t(n),r(n),i(n),a(n),o(n)}))};o.a.render(Object(N.jsx)(i.a.StrictMode,{children:Object(N.jsx)(W,{})}),document.getElementById("root")),V()},6:function(n,e,t){"use strict";t.d(e,"g",(function(){return b})),t.d(e,"e",(function(){return m})),t.d(e,"c",(function(){return l})),t.d(e,"b",(function(){return f})),t.d(e,"a",(function(){return d})),t.d(e,"f",(function(){return h})),t.d(e,"d",(function(){return p}));var r=t(8),i=t(10),a=t(2),o=t(1),c=t(12),s=t.n(c),u=t(0);function l(n){var e=n.children,t=n.display;void 0===t&&(t=!1),Array.isArray(e)&&(e=e.join("")),"string"!==typeof e&&(e=e.toString());var r=Object(o.useRef)();return Object(o.useLayoutEffect)((function(){null!==r&&s.a.render(e,r.current,{displayMode:t,fleqn:!0})}),[r,e,t]),Object(u.jsx)("span",{ref:r})}function f(n){var e=n.m;return Object(u.jsx)(l,{children:e})}function d(n){var e=n.n,t=n.d,r=p.simplifyFraction(e,t),i=Object(a.a)(r,2);return e=i[0],1===(t=i[1])?Object(u.jsx)(f,{m:e}):Object(u.jsxs)(l,{children:["\\frac","{".concat(e,"}{").concat(t,"}")]})}function h(n){return"\\pu{".concat(n,"}")}t(29);var j=function(n,e){return Array(e-n).fill().map((function(e,t){return t+n}))},b={names:{male:["Bill","Bob","Jebediah","Mohamed","Karim","Habib","Santiago","Gabriel","Jayden","Liam","Noah","James","Ali","Omar","Yusif","Wei","Jie","Hao","Arjun","Reyansh","Ayaan","Ori","Ahmad","Haruki","Riku","Lucas","Nathan","Stefan","Leonardo","Francesco","Alessandro","Leo","Jack","Sergei","Taika"],female:["Valentina","Roxanne","Lola","Fatima","Mariam","Rowan","Mariana","Lucia","Camila","Olivia","Charlotte","Emma","Leyla","Zeynab","Salma","Jing","Ying","Yan","Aadya","Diya","Saanvi","Sarah","Jana","Honoka","Akari","Anna","Sophia","Yasmine","Ginevra","Beatrice","Aurora","Stella","Lucy","Anastasia","Mia"]},nouns:["shoe","car","carpet","rocket","microscope","tambourine","guitar","envelope","jetpack","parachute","donut","vegetable"],currencies:["$","\u20ac","\uffe1"],variables:["a","b","c","d","m","n","p","q","r","t","w","x","y","z"],newRandomSeed:function(){return Math.random()*(-1>>>0)>>>0},initialize:function(n){var e=31415926535,t=71828182845,r=16180339887;void 0===n&&(n=this.newRandomSeed()),this.random=function(){var i=(e>>>=0)+(t>>>=0)|0;return e=t^t>>>9,t=(r>>>=0)+(r<<3)|0,r=(r=r<<21|r>>>11)+(i=i+(n=(n>>>=0)+1|0)|0)|0,(i>>>0)/4294967296};for(var i=0;i<15;i++)this.random()},random:function(){throw new Error("PRNG has not been initialized.")},int:function(n,e){return Math.floor((1+e-n)*this.random())+n},nonZeroInt:function(n,e){if(n>0||e<0)return this.int(n,e);var t=this.int(n,e-1);return t>=0?t+1:t},uniqueInts:function(n,e,t,r){if(t>e-n&&(t>1+e-n||r&&e>=0&&n<=0))throw new Error("Range is too small to generate enough ints");for(var i,a=[],o=0;o<t;o++){do{i=r?this.nonZeroInt(n,e):this.int(n,e)}while(-1!==a.indexOf(i));a.push(i)}return a},bool:function(){return this.random()>=.5},sign:function(){return this.bool()?1:-1},float:function(n,e,t){var r=this.random()*(e-n)+n;return void 0===t?r:m.round(r,t)},choice:function(n){return n[Math.floor(n.length*this.random())]},uniqueVariables:function(n){var e=this;return this.uniqueInts(0,this.variables.length-1,n,!1).map((function(n){return e.variables[n]}))},name:function(){return this.choice(this.names.male.concat(this.names.female))},nameAndGender:function(){var n=this.names.male.concat(this.names.female),e=Math.floor(n.length*this.random());return[n[e],e>=this.names.male.length]},noun:function(){return this.choice(this.nouns)},currency:function(){return this.choice(this.currencies)},money:function(n,e){return this.float(n,e,2)}},m={indArticle:function(n){return n[0]in["a","e","i","o","u"]?"an":"a"},round:function(n,e){return Math.round(n*Math.pow(10,e))/Math.pow(10,e)},toNPlaces:function(n,e){var t=this.round(n,e).toString();if(e>0){var r=t.indexOf(".");-1===r&&(r=(t+=".").length-1);for(var i=e-(t.length-1-r),a=0;a<i;a++)t+="0"}return t}},p={primes:function(){for(var n=10,e=0,t=j(2,Math.pow(n,2)),r=function(n){t=t.filter((function(e){return e===n||e%n!==0}))},a=2;a<n;a++)r(a);var o=function(){var e;n++;for(var r=j(Math.pow(n-1,2)+1,Math.pow(n,2)),a=function(n){r=r.filter((function(e){return e%n!==0}))},o=2;o<n;o++)a(o);(e=t).push.apply(e,Object(i.a)(r))};return{reset:function(){e=0},next:function(){var n=this.get(e);return e++,n},get:function(n){for(var e=t[n];void 0===e;)o(),e=t[n];return e},indexOf:function(n){for(;;){if(!(n>t[t.length-1]))return t.indexOf(n);o()}},isPrime:function(n){return-1!==this.indexOf(n)},factors:function(n){var e=[];if(n<2)return e;for(var t=0;!this.isPrime(n);){for(var r=this.get(t);n%r===0&&n!==r;)n/=r,e.push(r);t++}return e.push(n),e}}}(),gcf:function(n,e){var t=this.primes.factors(e);return this.primes.factors(n).filter((function(n){var e=t.indexOf(n);return-1!==e&&(delete t[e],!0)})).reduce((function(n,e){return n*e}),1)},simplifyFraction:function(n,e){var t=this.gcf(n,e);return[n/t,e/t]},formatTerm:function(n){var e,t=1,i="",a=Object(r.a)(n);try{for(a.s();!(e=a.n()).done;){var o=e.value;"number"===typeof o?t*=o:i+=o}}catch(c){a.e(c)}finally{a.f()}return i&&(1===t?t="":-1===t&&(t="-")),t+i},formatExpression:function(){for(var n=this,e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.map((function(e){return Array.isArray(e)?n.formatTerm(e):"number"===typeof e?e.toString():e})).reduce((function(n,e,t){return n+("-"===e[0]||0===t?"":"+")+e}),"")},formatEquation:function(n,e){return this.formatExpression.apply(this,Object(i.a)(n))+"="+this.formatExpression.apply(this,Object(i.a)(e))}}}},[[31,1,2]]]);
//# sourceMappingURL=main.7f1be3e3.chunk.js.map
(this.webpackJsonpproblems=this.webpackJsonpproblems||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),a=n(9),c=n.n(a),s=(n(16),n(2)),o=(n(17),n(18),n(6)),u=n(5),l=n(10),j=n(8),h=n.n(j),d=n(0);function b(e){var t=e.children,n=e.display;void 0===n&&(n=!1),Array.isArray(t)&&(t=t.join("")),"string"!==typeof t&&(t=t.toString());var i=Object(r.useRef)();return Object(r.useEffect)((function(){null!==i&&h.a.render(t,i.current,{displayMode:n,fleqn:!0})}),[i,t,n]),Object(d.jsx)("span",{ref:i})}function f(e){var t=e.m;return Object(d.jsx)(b,{children:t})}function m(e){var t=e.n,n=e.d,r=g.simplifyFraction(t,n),i=Object(s.a)(r,2);return t=i[0],1===(n=i[1])?Object(d.jsx)(f,{m:t}):Object(d.jsxs)(b,{children:["\\frac","{".concat(t,"}{").concat(n,"}")]})}function O(e){return"\\pu{".concat(e,"}")}n(20);var x=function(e,t){return Array(t-e).fill().map((function(t,n){return n+e}))},p={names:{male:["Bill","Bob","Jebediah","Mohamed","Karim","Habib","Santiago","Gabriel","Jayden","Liam","Noah","James","Ali","Omar","Yusif","Wei","Jie","Hao","Arjun","Reyansh","Ayaan","Ori","Ahmad","Haruki","Riku","Lucas","Nathan","Stefan","Leonardo","Francesco","Alessandro","Leo","Jack","Sergei","Taika"],female:["Valentina","Roxanne","Lola","Fatima","Mariam","Rowan","Mariana","Lucia","Camila","Olivia","Charlotte","Emma","Leyla","Zeynab","Salma","Jing","Ying","Yan","Aadya","Diya","Saanvi","Sarah","Jana","Honoka","Akari","Anna","Sophia","Yasmine","Ginevra","Beatrice","Aurora","Stella","Lucy","Anastasia","Mia"]},nouns:["shoe","car","carpet","rocket","microscope","tambourine","guitar","envelope","jetpack","parachute","donut","vegetable"],currencies:["$","\u20ac","\uffe1"],newRandomSeed:function(){return Math.random()*(-1>>>0)>>>0},initialize:function(e){var t=31415926535,n=71828182845,r=16180339887;void 0===e&&(e=this.newRandomSeed()),this.random=function(){var i=(t>>>=0)+(n>>>=0)|0;return t=n^n>>>9,n=(r>>>=0)+(r<<3)|0,r=(r=r<<21|r>>>11)+(i=i+(e=(e>>>=0)+1|0)|0)|0,(i>>>0)/4294967296};for(var i=0;i<15;i++)this.random()},random:function(){throw new Error("PRNG has not been initialized.")},int:function(e,t){return Math.floor((1+t-e)*this.random())+e},nonZeroInt:function(e,t){if(e>0||t<0)return this.int(e,t);var n=this.int(e,t-1);return n>=0?n+1:n},bool:function(){return this.random()>=.5},sign:function(){return this.bool()?1:-1},float:function(e,t,n){var r=this.random()*(t-e)+e;return void 0===n?r:v.round(r,n)},choice:function(e){return e[Math.floor(e.length*this.random())]},name:function(){return this.choice(this.names.male.concat(this.names.female))},nameAndGender:function(){var e=this.names.male.concat(this.names.female),t=Math.floor(e.length*this.random());return[e[t],t>=this.names.male.length]},noun:function(){return this.choice(this.nouns)},currency:function(){return this.choice(this.currencies)},money:function(e,t){return this.float(e,t,2)}},v={indArticle:function(e){return e[0]in["a","e","i","o","u"]?"an":"a"},round:function(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)},toNPlaces:function(e,t){var n=this.round(e,t).toString();if(t>0){var r=n.indexOf(".");-1===r&&(r=(n+=".").length-1);for(var i=t-(n.length-1-r),a=0;a<i;a++)n+="0"}return n}},g={primes:function(){for(var e=10,t=0,n=x(2,Math.pow(e,2)),r=function(e){n=n.filter((function(t){return t===e||t%e!==0}))},i=2;i<e;i++)r(i);var a=function(){var t;e++;for(var r=x(Math.pow(e-1,2)+1,Math.pow(e,2)),i=function(e){r=r.filter((function(t){return t%e!==0}))},a=2;a<e;a++)i(a);(t=n).push.apply(t,Object(l.a)(r))};return{reset:function(){t=0},next:function(){var e=this.get(t);return t++,e},get:function(e){for(var t=n[e];void 0===t;)a(),t=n[e];return t},indexOf:function(e){for(;;){if(!(e>n[n.length-1]))return n.indexOf(e);a()}},isPrime:function(e){return-1!==this.indexOf(e)},factors:function(e){var t=[];if(e<2)return t;for(var n=0;!this.isPrime(e);){for(var r=this.get(n);e%r===0&&e!==r;)e/=r,t.push(r);n++}return t.push(e),t}}}(),gcf:function(e,t){var n=this.primes.factors(t);return this.primes.factors(e).filter((function(e){var t=n.indexOf(e);return-1!==t&&(delete n[t],!0)})).reduce((function(e,t){return e*t}),1)},simplifyFraction:function(e,t){var n=this.gcf(e,t);return[e/n,t/n]},formatTerm:function(e){var t,n=1,r="",i=Object(o.a)(e);try{for(i.s();!(t=i.n()).done;){var a=t.value;"number"===typeof a?n*=a:r+=a}}catch(c){i.e(c)}finally{i.f()}return n+r},formatExpression:function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.map((function(t){return Array.isArray(t)?e.formatTerm(t):"number"===typeof t?t.toString():t})).reduce((function(e,t,n){return e+("-"===t[0]||0===n?"":"+")+t}),"")}},w={thermal1:{name:"heating water energy calculations",generate:function(){return{q:{volume:100*p.int(1,9),dv:p.choice([.1,.5,1,2,5,10,15,20]),dT:p.choice([.01,.05,.1,.5,1,2,5]),initial:p.int(12,25),final:p.int(35,95),time:p.int(1,20)/2},heater:p.choice(["spirit burner","kettle","gas stove"])}},format:function(e){var t=e.q,n=t.volume,r=t.dv,i=t.dT,a=t.initial,c=t.final,s=t.time,o=e.heater,u=v.round(4.2*n*(c-a),0),l=v.round(u/s/60,2),j=r/n+2*i/(c-a),h=v.round(u*j,1);return{question:Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("p",{children:[Object(d.jsxs)(b,{children:[n,"\xb1",r,O("ml")]})," of water are heated by a ",o,". The water temperature is measured with a thermometer accurate to ",Object(d.jsxs)(b,{children:["\xb1",i,O("\xb0C")]}),". The thermometer reading rises from ",Object(d.jsxs)(b,{children:[a,O("\xb0C")]})," to ",Object(d.jsxs)(b,{children:[c,O("\xb0C")]})," over the course of ",Object(d.jsx)(f,{m:s})," minutes."]}),Object(d.jsx)("p",{children:"a) Calculate the rise in thermal energy in the water."}),Object(d.jsxs)("p",{children:["b) Assuming that all the ",o,"'s thermal energy is transferred to the water, calculate the average thermal power output of the ",o,"."]}),Object(d.jsx)("p",{children:"c) Calculate the absolute uncertainty in your answer to part a."})]}),answer:Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("p",{children:["a) ",Object(d.jsxs)(b,{children:[u," \\pu J"]})]}),Object(d.jsxs)("p",{children:["b) ",Object(d.jsxs)(b,{children:[l," \\pu W"]})]}),Object(d.jsxs)("p",{children:["c) ",Object(d.jsxs)(b,{children:["\xb1",h,"\\pu J"]})]})]}),explanation:Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("p",{children:["a) The change in thermal energy in an object is given by: ",Object(d.jsx)(b,{display:!0,children:"\\Delta E = mc\\Delta T"})]}),Object(d.jsxs)("p",{children:["Where ",Object(d.jsx)(f,{m:"m"})," is the object's mass, ",Object(d.jsx)(f,{m:"c"})," is the object's specific heat capacity, and ",Object(d.jsx)(f,{m:"\\Delta T"})," is the change in temperature."]}),Object(d.jsxs)("p",{children:["Since water's density is ",Object(d.jsx)(f,{m:"1 \\pu{g\\,ml^-1}"}),", the mass of the water is just ",Object(d.jsxs)(b,{children:[n,"\\pu g"]}),". Water's specific heat capacity is ",Object(d.jsx)(f,{m:"4200\\,\\pu{J\\,kg^-1K^-1}"}),", or equivalently ",Object(d.jsx)(f,{m:"4.2\\,\\pu{J\\,g^-1K^-1}"}),"."]}),Object(d.jsxs)("p",{children:["The change in energy is therefore ",Object(d.jsxs)(b,{children:["4.2 * ",n," * (",c," - ",a,")"]}),", or ",Object(d.jsxs)(b,{children:[u," \\pu J"]})]}),Object(d.jsxs)("p",{children:["b) Power is the rate of change of energy, so it can be found by dividing the total change in energy by the time taken. ",Object(d.jsx)(f,{m:s})," minutes is ",Object(d.jsx)(f,{m:60*s})," seconds, so the power is ",Object(d.jsxs)(b,{children:[u," / ",60*s,"=",l,"\\pu W"]})]}),Object(d.jsx)("p",{children:"c) When calculating the uncertainty of quantities multiplied together, we add the fractional uncertainties in those quantities. To find the fractional uncertainties, we divide the absolute uncertainty by the data value."}),Object(d.jsxs)("ul",{children:[Object(d.jsxs)("li",{children:["Mass: ",Object(d.jsxs)(b,{children:[r," / ",n," = ",v.round(r/n,5)]})]}),Object(d.jsx)("li",{children:"Specific heat capacity is a literature value, so we assume it is infinitely precise."}),Object(d.jsxs)("li",{children:["Temperature rise: when finding the uncertainty of an added sum, we add the absolute uncertainties. Here, the uncertainty in both the initial and final temperature is ",Object(d.jsx)(f,{m:i}),", so the absolute uncertainty in the temperature rise is ",Object(d.jsxs)(b,{children:["2 * ",i," = ",2*i,"\\,\\pu K"]}),". Dividing this by the temperature rise (",Object(d.jsxs)(b,{children:[c-a,"\\,\\pu K"]}),") gives us ",Object(d.jsx)(f,{m:v.round(2*i/(c-a),5)})]})]}),Object(d.jsxs)("p",{children:["Adding these fractional uncertainties gives us an overall fractional uncertainty of ",Object(d.jsx)(f,{m:v.round(j,5)}),". Multiplying this by the change in energy (",Object(d.jsxs)(b,{children:[u,"\\pu J"]}),") gives us ",Object(d.jsxs)(b,{children:["\xb1",h,"\\pu J"]})]})]})}}}},y=Object(u.a)({l1:{name:"solving simple linear equations",generate:function(){var e=p.nonZeroInt(-10,10),t=p.nonZeroInt(-10,10);return{q:[e,t],a:t-e}},format:function(e){var t=e.q,n=e.a;return{question:Object(d.jsxs)("span",{children:[Object(d.jsxs)(b,{children:[g.formatExpression("x",t[0]),"=",t[1]]}),Object(d.jsx)("br",{}),"Solve for ",Object(d.jsx)(f,{m:"x"})]}),answer:Object(d.jsxs)(b,{children:["x = ",n]}),explanation:Object(d.jsxs)("span",{children:["To get only ",Object(d.jsx)(f,{m:"x"})," on the left side, we can subtract ",Object(d.jsx)(f,{m:t[0]})," from both sides.",Object(d.jsx)("br",{}),"This gives us ",Object(d.jsxs)(b,{children:[t[1]," - ",t[0]]})," on the right-hand-side: ",Object(d.jsx)(f,{m:n}),"."]})}},turnover:200,documented:!1,calculator:!1},l2:{name:"solving simple linear equations with multiplication",generate:function(){var e=p.sign()*p.int(3,25),t=p.sign()*p.int(1,10);return{q:[e,e*t],a:t}},format:function(e){var t=e.q,n=e.a;return{question:Object(d.jsxs)("span",{children:[Object(d.jsxs)(b,{children:[t[0],"x = ",t[1]]}),Object(d.jsx)("br",{}),"Solve for ",Object(d.jsx)(f,{m:"x"})]}),answer:Object(d.jsxs)(b,{children:["x = ",n]})}}},e1:{name:"calculating exponential growth",generate:function(){var e=p.bool();return{q:[p.int(15,1e4),p.bool(),p.int(1,10)/2,p.int(3,20)],name:p.name(),noun:e?p.noun():0,currency:p.currency(),variant:e}},format:function(e){var t=e.q,n=e.name,r=e.noun,i=e.currency,a=e.variant,c=1+(t[1]?.01:-.01)*t[2],s=t[0]*Math.pow(c,t[3]);return{question:Object(d.jsxs)("span",{children:[n," ",a?"buys":"deposits"," ",i,Object(d.jsx)(f,{m:v.toNPlaces(t[0],2)})," ",a?"worth of stock":""," in ",a?"".concat(v.indArticle(r)," ").concat(r," company"):"a bank",". Every year, their ",a?"stock price":"balance"," ",t[1]?"increases":"decreases"," by ",Object(d.jsx)(f,{m:t[2]}),"%. After ",Object(d.jsx)(f,{m:t[3]})," years, how much money is ",a?"the stock worth":"in their bank account","?"]}),answer:Object(d.jsxs)("span",{children:[i,Object(d.jsx)(f,{m:v.toNPlaces(s,2)})]}),explanation:Object(d.jsxs)("span",{children:[n,"'s ",a?"stock price":"balance"," ",t[1]?"increases":"decreases"," by ",Object(d.jsx)(f,{m:t[2]}),"% per year, so each year its value changes by a factor of ",Object(d.jsx)(f,{m:c}),".",Object(d.jsx)("br",{}),"Repeatedly multiplying by ",Object(d.jsx)(f,{m:c}),", ",Object(d.jsx)(f,{m:t[3]})," times, is the same as taking ",Object(d.jsx)(f,{m:c})," to the power of ",Object(d.jsx)(f,{m:t[3]}),", which is ",Object(d.jsx)(f,{m:v.round(Math.pow(c,t[3]),3)}),".",Object(d.jsx)("br",{}),"Multiplying this by the initial amount gives us ",Object(d.jsx)(f,{m:v.round(s,3)}),"."]})}},turnover:1e3,documented:!1,calculator:!0},dummy:{name:"dummy",generate:function(){return{q:1}},format:function(e){var t=e.q;return{question:"".concat(t),answer:"".concat(t)}},turnover:0,documented:!1,calculator:!1},c1:{name:"integration",generate:function(){return{q:[p.int(1,9),p.int(2,10)]}},format:function(e){var t=e.q,n=g.simplifyFraction(t[0],t[1]+1),r=Object(s.a)(n,2),i=r[0],a=r[1];return{question:Object(d.jsxs)("span",{children:["Work out the indefinite integral:",Object(d.jsx)("br",{}),Object(d.jsxs)(b,{display:!0,children:["\\int ",t[0],"x^","{".concat(t[1],"}"),"dx"]})]}),answer:Object(d.jsxs)("span",{children:[Object(d.jsx)(m,{n:i,d:a}),Object(d.jsxs)(b,{children:["x^","{".concat(t[1]+1,"}")]})]})}},turnover:30,documented:!1,calculator:!1}},w),k={Algebra:["l1","l2"],"Exponents and compound interest":["e1"],Calculus:["c1"],Physics:["thermal1"]},S={};function C(e,t){e in S||(S[e]={});var n=JSON.stringify(t);for(var r in S[e]){var i,a=Object(o.a)(S[e][r]);try{for(a.s();!(i=a.n()).done;){var c=i.value;if(JSON.stringify(c)===n)return!1}}catch(u){a.e(u)}finally{a.f()}}var s=N(new Date);return s in S[e]||(S[e][s]=[]),S[e][s].push(t),!0}function M(e){var t,n=0,r=new Date;for(var i in S[e])(t=q(i))<r&&(r=t),n+=S[e][i].length;n>y[e].turnover&&S[e][N(r)].shift()}function N(e){var t=(e.getMonth()+1<10?"0":"")+(e.getMonth()+1),n=(e.getDate()<10?"0":"")+e.getDate();return"".concat(e.getFullYear()).concat(t).concat(n)}function q(e){var t=parseInt(e.slice(0,4)),n=parseInt(e.slice(4,6))-1,r=parseInt(e.slice(6,8));return new Date(t,n,r)}function A(e){var t=function(e){for(var t,n=0;n<200;n++){if(C(e,(t=y[e].generate()).q))return t;M(e)}return console.warn("Unable to create unique problem (id: ".concat(e,", data: ").concat(t,")")),t}(e),n=y[e].format(t);return void 0===n.id&&(n.id=JSON.stringify(t.q)+e),n}var E=n(11);function L(e){var t=Object(r.useRef)(null),n=e.onClickOutside,i=e.active,a=Object(E.a)(e,["onClickOutside","active"]);return Object(r.useEffect)((function(){if(i){var e=function(e){null===t.current||t.current.contains(e.target)||n()};return document.addEventListener("mousedown",e),document.addEventListener("focusin",e),function(){document.removeEventListener("mousedown",e),document.removeEventListener("focusin",e)}}}),[t,n,i]),Object(d.jsx)("div",Object(u.a)(Object(u.a)({ref:t},a),{},{children:e.children}))}L.defaultProps={className:"",onClickOutside:function(){return console.warn("No onClickOutside passed to OutsideClickDetector")},active:!0};var _=L;function J(e){var t=Object(r.useState)(!1),n=Object(s.a)(t,2),i=n[0],a=n[1];return Object(d.jsxs)(_,{className:"DotsMenu",onClickOutside:function(){return a(!1)},active:i,children:[Object(d.jsx)("button",{className:"DotsMenu__button",onClick:function(){return a(!i)},"aria-label":"Actions Menu",children:Object(d.jsx)("svg",{width:"24",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"})})}),Object(d.jsx)("ul",{className:"DotsMenu__popup"+(i?" open":""),children:e.items.map((function(e,t){return Object(d.jsx)("li",{children:Object(d.jsx)("button",{onClick:function(){e[1](),a(!1)},children:e[0]})},t)}))})]})}function T(e){var t=e.problem,n=Object(r.useState)(!1),i=Object(s.a)(n,2),a=i[0],c=i[1],o=Object(r.useState)(!1),u=Object(s.a)(o,2),l=u[0],j=u[1];return Object(d.jsxs)("li",{children:[Object(d.jsx)("div",{className:"SetItem__question",children:t.question}),Object(d.jsx)("button",{className:"link-button",onClick:function(){return c(!a)},children:a?"Hide answer":"Show answer"}),Object(d.jsxs)("div",{className:"SetItem__answer-section"+(a?" open":""),children:[Object(d.jsx)("div",{className:"SetItem__answer",children:t.answer}),t.explanation&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("button",{className:"link-button",onClick:function(){return j(!l)},children:l?"Hide explanation":"Show explanation"}),Object(d.jsx)("div",{className:"SetItem__explanation"+(l?" open":""),children:t.explanation})]})]})]})}function D(e){var t=Object(s.a)(e,2),n=t[0],r=t[1],i=[],a=function(){var e=S;return S={},function(){S=e}}();p.initialize(r);for(var c=0;c<5;c++){var o=k[n][Math.floor(p.random()*k[n].length)];i.push(A(o))}return a(),i}function F(e){var t=e.route,n=e.newSet,r=e.goto,i=Object(s.a)(t,2),a=i[0],c=i[1],o=D(t);return Object(d.jsxs)("div",{className:"SetCard",children:[Object(d.jsxs)("div",{className:"SetCard__header",children:[Object(d.jsx)("h2",{children:a}),Object(d.jsx)(J,{items:[["Export worksheet",function(){return r([a,c,1])}],["Export answer sheet",function(){return r([a,c,2])}],["Export answers and explanations",function(){return r([a,c,3])}],["Reload all problems",function(){return n(a)}]]})]}),Object(d.jsx)("hr",{}),Object(d.jsx)("ol",{className:"SetCard__list",children:o.map((function(e){return Object(d.jsx)(T,{problem:e},e.id)}))})]})}function I(e){var t=e.route,n=e.printPage,r=Object(s.a)(t,3),i=r[0],a=(r[1],r[2]),c=D(t);return Object(d.jsxs)("div",{className:"SetCard",children:[Object(d.jsxs)("div",{className:"SetCard__header",children:[Object(d.jsx)("h2",{children:i}),Object(d.jsx)("button",{className:"link-button no-print",onClick:function(){return n()},children:"Print"})]}),Object(d.jsx)("hr",{}),Object(d.jsx)("ol",{className:"SetCard__list",children:c.map((function(e){var t;switch(a){case 1:t=e.question;break;case 2:t=e.answer;break;case 3:t=e.explanation?Object(d.jsxs)(d.Fragment,{children:[e.answer,Object(d.jsx)("br",{}),e.explanation]}):e.answer;break;default:throw new Error("Unrecognized mode: ".concat(a))}return Object(d.jsx)("li",{children:Object(d.jsx)("div",{children:t})},e.id)}))})]})}var R="/problems";function P(e){var t=e.name,n=e.onClick;return Object(d.jsxs)("button",{className:"Choice",onClick:n,children:[Object(d.jsx)("span",{children:t}),Object(d.jsx)("svg",{width:"24px",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})}function B(e){var t=e.newSet;return Object(d.jsx)("div",{className:"Chooser",children:Object.entries(k).map((function(e,n){var r=Object(s.a)(e,2),i=r[0];r[1];return Object(d.jsx)(P,{name:i,onClick:function(){return t(i)}},n)}))})}function H(){var e=window.location.href.split("#!").filter((function(e){return""!==e}));if(1===e.length)return[null];var t,n=e[1].split("/");try{var r=decodeURIComponent(n[0]),i=(t=n[1],[parseInt(t.slice(1),36),parseInt(t[0])]),a=Object(s.a)(i,2);return[r,a[0],a[1]]}catch(c){return console.error("Couldn't resolve url data fragment, redirecting to home."),z([null]),[null]}}function z(e){var t=Object(s.a)(e,3),n=t[0],r=t[1],i=t[2];null!==n?(window.history.pushState(e,"","".concat(R,"#!").concat(n,"/").concat(function(e,t){return t.toString()+e.toString(36)}(r,i))),document.title="".concat(n).concat(0===i?"":" (".concat(1===i?"worksheet":"answers",")")," | Adrian's endless source of problems")):(window.history.pushState(null,"","".concat(R)),document.title="Adrian's endless source of problems")}var W=function(){var e=Object(r.useState)(H()),t=Object(s.a)(e,2),n=t[0],i=t[1];Object(r.useEffect)((function(){var e=function(){i(H())};return window.addEventListener("popstate",e),function(){window.removeEventListener("popstate",e)}})),function(){var e=new Date;for(var t in S)for(var n in S[t])e-q(n)>18144e5&&delete S[t][n]}();var a=function(e){z(e),i(e)},c=function(e){var t=p.newRandomSeed();a([e,t,0])},o=Object(r.useState)(!1),u=Object(s.a)(o,2),l=u[0],j=u[1];return Object(r.useEffect)((function(){l&&(window.print(),j(!1))}),[l]),Object(d.jsxs)("div",{className:"App"+(l?" print":""),children:[Object(d.jsx)("header",{className:"App__header no-print",children:Object(d.jsx)("h1",{children:"Adrian's endless source of problems"})}),Object(d.jsx)("main",{children:null===n[0]?Object(d.jsx)(B,{newSet:c}):Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("nav",{className:"no-print",children:[Object(d.jsxs)("button",{className:"link-button",onClick:function(){return window.history.back()},children:[Object(d.jsx)("svg",{width:"15px",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:Object(d.jsx)("path",{fillRule:"evenodd",d:"M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z",clipRule:"evenodd"})}),"Back"]}),Object(d.jsxs)("button",{className:"link-button",onClick:function(){return a([null])},children:[Object(d.jsx)("svg",{width:"15px",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:Object(d.jsx)("path",{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"})}),"Home"]})]}),0===n[2]?Object(d.jsx)(F,{route:n,newSet:c,goto:a}):Object(d.jsx)(I,{route:n,printPage:function(){j(!0)}})]})})]})},K=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),i(e),a(e),c(e)}))};c.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(W,{})}),document.getElementById("root")),K()}},[[21,1,2]]]);
//# sourceMappingURL=main.e99683c1.chunk.js.map
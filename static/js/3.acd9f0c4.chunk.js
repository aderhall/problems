(this.webpackJsonpproblems=this.webpackJsonpproblems||[]).push([[3],{389:function(e,n,t){"use strict";t.r(n);t(12);var s=t(52),r=t(1),i={simult1:{generate:function(){var e=[s.g.int(-5,5),s.g.int(-5,5)],n=s.g.uniqueInts(-5,5,2,!0),t=s.g.uniqueInts(-5,5,2,!0);return{q:{eq1:[n[1],-n[0],n[1]*e[0]-n[0]*e[1]],eq2:[t[1],-t[0],t[1]*e[0]-t[0]*e[1]]},varnames:s.g.uniqueVariables(2),a:e}},format:function(e){var n=e.q,t=n.eq1,i=n.eq2,a=e.varnames,c=e.a;return{question:Object(r.jsxs)("span",{children:["Solve the simultaneous equations to find the values of ",Object(r.jsx)(s.b,{m:a[0]})," and ",Object(r.jsx)(s.b,{m:a[1]}),".",Object(r.jsx)(s.c,{display:!0,children:s.d.formatEquation([[t[0],a[0]],[t[1],a[1]]],[[t[2]]])}),Object(r.jsx)(s.c,{display:!0,children:s.d.formatEquation([[i[0],a[0]],[i[1],a[1]]],[[i[2]]])})]}),answer:Object(r.jsxs)(s.c,{children:[a[0],"=",c[0],",\\,",a[1],"=",c[1]]})}}},l1:{name:"solving simple linear equations",generate:function(){var e=s.g.nonZeroInt(-10,10),n=s.g.nonZeroInt(-10,10);return{q:[e,n],a:n-e}},format:function(e){var n=e.q,t=e.a;return{question:Object(r.jsxs)("span",{children:[Object(r.jsxs)(s.c,{children:[s.d.formatExpression("x",n[0]),"=",n[1]]}),Object(r.jsx)("br",{}),"Solve for ",Object(r.jsx)(s.b,{m:"x"})]}),answer:Object(r.jsxs)(s.c,{children:["x = ",t]}),explanation:Object(r.jsxs)("span",{children:["To get only ",Object(r.jsx)(s.b,{m:"x"})," on the left side, we can subtract ",Object(r.jsx)(s.b,{m:n[0]})," from both sides.",Object(r.jsx)("br",{}),"This gives us ",Object(r.jsxs)(s.c,{children:[n[1]," - ",n[0]]})," on the right-hand-side: ",Object(r.jsx)(s.b,{m:t}),"."]})}},turnover:200,documented:!1,calculator:!1},l2:{name:"solving simple linear equations with multiplication",generate:function(){var e=s.g.sign()*s.g.int(3,9),n=s.g.sign()*s.g.int(1,10);return{q:[e,e*n],a:n}},format:function(e){var n=e.q,t=e.a;return{question:Object(r.jsxs)("span",{children:[Object(r.jsx)(s.c,{children:s.d.formatEquation([[n[0],"x"]],[n[1]])}),Object(r.jsx)("br",{}),"Solve for ",Object(r.jsx)(s.b,{m:"x"})]}),answer:Object(r.jsxs)(s.c,{children:["x = ",t]})}}}};n.default=i}}]);
//# sourceMappingURL=3.acd9f0c4.chunk.js.map
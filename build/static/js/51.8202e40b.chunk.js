(this["webpackJsonpsales-tracker"]=this["webpackJsonpsales-tracker"]||[]).push([[51],{1345:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));function a(e){return e.toLowerCase()}var i=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],n=/[^A-Z0-9]+/gi;function s(e,t){void 0===t&&(t={});for(var r=t.splitRegexp,s=void 0===r?i:r,l=t.stripRegexp,o=void 0===l?n:l,d=t.transform,u=void 0===d?a:d,j=t.delimiter,b=void 0===j?" ":j,m=c(c(e,s,"$1\0$2"),o,"\0"),p=0,x=m.length;"\0"===m.charAt(p);)p++;for(;"\0"===m.charAt(x-1);)x--;return m.slice(p,x).split("\0").map(u).join(b)}function c(e,t,r){return t instanceof RegExp?e.replace(t,r):t.reduce((function(e,t){return e.replace(t,r)}),e)}},1346:function(e,t,r){"use strict";function a(e){return e.charAt(0).toUpperCase()+e.substr(1)}r.d(t,"a",(function(){return a}))},1419:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var a=r(10),i=r(1345),n=r(1346);function s(e){return Object(n.a)(e.toLowerCase())}function c(e,t){return void 0===t&&(t={}),Object(i.a)(e,Object(a.a)({delimiter:" ",transform:s},t))}},2080:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return D}));var a=r(4),i=r(1419),n=r(39),s=r(6),c=r(1334),l=r(322),o=r(1238),d=r(1318),u=r(125),j=r(1239),b=r(90),m=r(71),p=r(28),x=r(424),f=r(61),h=r(126),O=r(29),g=r(11),v=r(17),y=r.n(v),w=r(244),A=r(1),k=r(34),N=r(426),S=r(1223),q=r(1309),C=r(1242),E=r(646),I=r(1335),L=r(247),P=r(26),R=r(207),z=r(0);function F(){var e=Object(b.a)().register,t=Object(L.a)(),r=Object(A.useState)(!1),a=Object(g.a)(r,2),i=a[0],n=a[1],s=w.b().shape({firstName:w.d().required("First name required"),lastName:w.d().required("Last name required"),email:w.d().email("Email must be a valid email address").required("Email is required"),password:w.d().required("Password is required")}),c=Object(k.f)({resolver:Object(N.a)(s),defaultValues:{firstName:"",lastName:"",email:"",password:""}}),l=c.reset,o=c.setError,d=c.handleSubmit,u=c.formState,j=u.errors,m=u.isSubmitting,p=function(){var r=Object(O.a)(y.a.mark((function r(a){return y.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e(a.email,a.password,a.firstName,a.lastName);case 3:r.next=10;break;case 5:r.prev=5,r.t0=r.catch(0),console.error(r.t0),l(),t.current&&o("afterSubmit",r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,5]])})));return function(e){return r.apply(this,arguments)}}();return Object(z.jsx)(R.a,{methods:c,onSubmit:d(p),children:Object(z.jsxs)(S.a,{spacing:3,children:[!!j.afterSubmit&&Object(z.jsx)(q.a,{severity:"error",children:j.afterSubmit.message}),Object(z.jsxs)(S.a,{direction:{xs:"column",sm:"row"},spacing:2,children:[Object(z.jsx)(R.i,{name:"firstName",label:"First name"}),Object(z.jsx)(R.i,{name:"lastName",label:"Last name"})]}),Object(z.jsx)(R.i,{name:"email",label:"Email address"}),Object(z.jsx)(R.i,{name:"password",label:"Password",type:i?"text":"password",InputProps:{endAdornment:Object(z.jsx)(C.a,{position:"end",children:Object(z.jsx)(E.a,{edge:"end",onClick:function(){return n(!i)},children:Object(z.jsx)(P.a,{icon:i?"eva:eye-fill":"eva:eye-off-fill"})})})}}),Object(z.jsx)(I.a,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:m,children:"Register"})]})})}var Z=Object(s.a)("div")((function(e){var t=e.theme;return Object(a.a)({},t.breakpoints.up("md"),{display:"flex"})})),M=Object(s.a)("header")((function(e){var t=e.theme;return Object(a.a)({top:0,zIndex:9,lineHeight:0,width:"100%",display:"flex",alignItems:"center",position:"absolute",padding:t.spacing(3),justifyContent:"space-between"},t.breakpoints.up("md"),{alignItems:"flex-start",padding:t.spacing(7,5,0,7)})})),W=Object(s.a)(c.a)((function(e){return{width:"100%",maxWidth:464,display:"flex",flexDirection:"column",justifyContent:"center",margin:e.theme.spacing(2,0,2,2)}})),B=Object(s.a)("div")((function(e){return{maxWidth:480,margin:"auto",display:"flex",minHeight:"100vh",flexDirection:"column",justifyContent:"center",padding:e.theme.spacing(12,0)}}));function D(){var e=Object(b.a)().method,t=Object(m.a)("up","sm"),r=Object(m.a)("up","md");return Object(z.jsx)(x.a,{title:"Register",children:Object(z.jsxs)(Z,{children:[Object(z.jsxs)(M,{children:[Object(z.jsx)(f.a,{}),t&&Object(z.jsxs)(l.a,{variant:"body2",sx:{mt:{md:-2}},children:["Already have an account?"," ",Object(z.jsx)(o.a,{variant:"subtitle2",component:n.b,to:p.a.login,children:"Login"})]})]}),r&&Object(z.jsxs)(W,{children:[Object(z.jsx)(l.a,{variant:"h3",sx:{px:5,mt:10,mb:5},children:"Manage the job more effectively with Minimal"}),Object(z.jsx)(h.a,{alt:"register",src:"https://minimal-assets-api.vercel.app/assets/illustrations/illustration_register.png"})]}),Object(z.jsx)(d.a,{children:Object(z.jsxs)(B,{children:[Object(z.jsxs)(u.a,{sx:{mb:5,display:"flex",alignItems:"center"},children:[Object(z.jsxs)(u.a,{sx:{flexGrow:1},children:[Object(z.jsx)(l.a,{variant:"h4",gutterBottom:!0,children:"Get started absolutely free."}),Object(z.jsx)(l.a,{sx:{color:"text.secondary"},children:"Free forever. No credit card needed."})]}),Object(z.jsx)(j.a,{title:Object(i.a)(e),children:Object(z.jsx)(z.Fragment,{children:Object(z.jsx)(h.a,{disabledEffect:!0,src:"https://minimal-assets-api.vercel.app/assets/icons/auth/ic_".concat(e,".png"),sx:{width:32,height:32}})})})]}),Object(z.jsx)(F,{}),Object(z.jsxs)(l.a,{variant:"body2",align:"center",sx:{color:"text.secondary",mt:3},children:["By registering, I agree to Minimal\xa0",Object(z.jsx)(o.a,{underline:"always",color:"text.primary",href:"#",children:"Terms of Service"}),"and",Object(z.jsx)(o.a,{underline:"always",color:"text.primary",href:"#",children:"Privacy Policy"}),"."]}),!t&&Object(z.jsxs)(l.a,{variant:"body2",sx:{mt:3,textAlign:"center"},children:["Already have an account?"," ",Object(z.jsx)(o.a,{variant:"subtitle2",to:p.a.login,component:n.b,children:"Login"})]})]})})]})})}}}]);
//# sourceMappingURL=51.8202e40b.chunk.js.map
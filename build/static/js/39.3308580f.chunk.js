(this["webpackJsonpsales-tracker"]=this["webpackJsonpsales-tracker"]||[]).push([[39],{1339:function(t,e,n){"use strict";n.d(e,"a",(function(){return f}));var a=n(3),c=n(25),r=n(128),i=n.n(r),o=n(125),s=n(322),l=n(1238),u=n(39),d=n(1357),h=n(0),j=["links","activeLast"];function b(t){var e=t.links,n=t.activeLast,r=void 0!==n&&n,i=Object(c.a)(t,j),l=e[e.length-1].name,u=e.map((function(t){return Object(h.jsx)(p,{link:t},t.name)})),b=e.map((function(t){return Object(h.jsx)("div",{children:t.name!==l?Object(h.jsx)(p,{link:t}):Object(h.jsx)(s.a,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:l})},t.name)}));return Object(h.jsx)(d.a,Object(a.a)(Object(a.a)({separator:Object(h.jsx)(o.a,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},i),{},{children:r?u:b}))}function p(t){var e=t.link,n=e.href,a=e.name,c=e.icon;return Object(h.jsxs)(l.a,{variant:"body2",component:u.b,to:n||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[c&&Object(h.jsx)(o.a,{sx:{mr:1,"& svg":{width:20,height:20}},children:c}),a]},a)}var O=["links","action","heading","moreLink","sx"];function f(t){var e=t.links,n=t.action,r=t.heading,u=t.moreLink,d=void 0===u?[]:u,j=t.sx,p=Object(c.a)(t,O);return Object(h.jsxs)(o.a,{sx:Object(a.a)({mb:5},j),children:[Object(h.jsxs)(o.a,{sx:{display:"flex",alignItems:"center"},children:[Object(h.jsxs)(o.a,{sx:{flexGrow:1},children:[Object(h.jsx)(s.a,{variant:"h4",gutterBottom:!0,children:r}),Object(h.jsx)(b,Object(a.a)({links:e},p))]}),n&&Object(h.jsx)(o.a,{sx:{flexShrink:0},children:n})]}),Object(h.jsx)(o.a,{sx:{mt:2},children:i()(d)?Object(h.jsx)(l.a,{href:d,target:"_blank",rel:"noopener",variant:"body2",children:d}):d.map((function(t){return Object(h.jsx)(l.a,{noWrap:!0,href:t,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:t},t)}))})]})}},1348:function(t,e,n){"use strict";var a=n(4),c=n(3),r=n(6),i=n(1306),o=Object(r.a)(i.a,{shouldForwardProp:function(t){return"stretchStart"!==t}})((function(t){var e=t.stretchStart,n=t.theme;return{"& .MuiOutlinedInput-root":Object(c.a)({transition:n.transitions.create(["box-shadow","width"],{easing:n.transitions.easing.easeInOut,duration:n.transitions.duration.shorter}),"&.Mui-focused":{boxShadow:n.customShadows.z12}},e&&{width:e,"&.Mui-focused":Object(a.a)({boxShadow:n.customShadows.z12},n.breakpoints.up("sm"),{width:e+60})}),"& fieldset":{borderWidth:"1px !important",borderColor:"".concat(n.palette.grey[50032]," !important")}}}));e.a=o},1352:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n(3),c=n(25),r=n(647),i=n(322),o=n(0),s=["searchQuery"];function l(t){var e=t.searchQuery,n=void 0===e?"":e,l=Object(c.a)(t,s);return n?Object(o.jsxs)(r.a,Object(a.a)(Object(a.a)({},l),{},{children:[Object(o.jsx)(i.a,{gutterBottom:!0,align:"center",variant:"subtitle1",children:"Not found"}),Object(o.jsxs)(i.a,{variant:"body2",align:"center",children:["No results found for \xa0",Object(o.jsxs)("strong",{children:['"',n,'"']}),". Try checking for typos or using complete words."]})]})):Object(o.jsx)(i.a,{variant:"body2",children:" Please enter keywords"})}},1441:function(t,e,n){"use strict";n.d(e,"a",(function(){return h})),n.d(e,"b",(function(){return C})),n.d(e,"c",(function(){return q}));var a=n(3),c=n(2097),r=n(2098),i=n(2099),o=n(1310),s=n(2086),l=n(125),u=n(0),d={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:-1,overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"};function h(t){var e=t.order,n=t.orderBy,h=t.rowCount,j=t.headLabel,b=t.numSelected,p=t.onRequestSort,O=t.onSelectAllClick;return Object(u.jsx)(c.a,{children:Object(u.jsxs)(r.a,{children:[Object(u.jsx)(i.a,{padding:"checkbox",children:Object(u.jsx)(o.a,{indeterminate:b>0&&b<h,checked:h>0&&b===h,onChange:O})}),j.map((function(t){return Object(u.jsx)(i.a,{align:t.alignRight?"right":"left",sortDirection:n===t.id&&e,children:Object(u.jsxs)(s.a,{hideSortIcon:!0,active:n===t.id,direction:n===t.id?e:"asc",onClick:(c=t.id,function(t){p(t,c)}),children:[t.label,n===t.id?Object(u.jsx)(l.a,{sx:Object(a.a)({},d),children:"desc"===e?"sorted descending":"sorted ascending"}):null]})},t.id);var c}))]})})}var j=n(6),b=n(52),p=n(1324),O=n(1239),f=n(646),x=n(1306),g=n(322),m=n(1242),y=n(1308),v=n(26),k=n(1348),S=Object(j.a)(p.a)((function(t){return{height:96,display:"flex",justifyContent:"space-between",padding:t.theme.spacing(0,1,0,3)}})),w=Object(j.a)("div")((function(t){t.theme;return{width:450,display:"flex",justifyContent:"space-between"}}));function C(t){var e=t.numSelected,n=t.filterName,c=t.onFilterName,r=t.onDeleteProducts,i=t.startDate,o=t.endDate,s=t.selecteStartdDate,l=t.selecteEnddDate,d=t.clearDate,h=t.placeholder,j=t.enable,p="light"===Object(b.a)().palette.mode;return Object(u.jsxs)(S,{sx:Object(a.a)({},e>0&&{color:p?"primary.main":"text.primary",bgcolor:p?"primary.lighter":"primary.dark"}),children:[e>0?Object(u.jsx)(O.a,{title:"Delete",children:Object(u.jsx)(f.a,{onClick:r,children:Object(u.jsx)(v.a,{icon:"eva:trash-2-outline"})})}):!j&&Object(u.jsxs)(w,{children:[Object(u.jsx)(y.a,{label:"From",value:i,onChange:function(t){return s(t)},maxDate:o?new Date(o):null,renderInput:function(t){return Object(u.jsx)(x.a,Object(a.a)({sx:{mr:1}},t))}}),Object(u.jsx)(y.a,{label:"To",value:o,onChange:function(t){return l(t)},minDate:i?new Date(i):null,renderInput:function(t){return Object(u.jsx)(x.a,Object(a.a)({},t))}}),Object(u.jsx)(O.a,{title:"Restart",sx:{width:36,height:36,ml:1,mt:1,color:p?"primary.main":"text.primary",bgcolor:p?"primary.lighter":"primary.dark"},children:Object(u.jsx)(f.a,{onClick:function(){return d()},children:Object(u.jsx)(v.a,{icon:"ic:round-restart-alt",sx:{fontSize:22}})})})]}),e>0?Object(u.jsxs)(g.a,{component:"div",variant:"subtitle1",children:[e," selected"]}):Object(u.jsx)(k.a,{stretchStart:240,value:n,onChange:function(t){return c(t.target.value)},placeholder:h,InputProps:{startAdornment:Object(u.jsx)(m.a,{position:"start",children:Object(u.jsx)(v.a,{icon:"eva:search-fill",sx:{color:"text.disabled",width:20,height:20}})})}})]})}var D=n(11),B=n(1633),I=n(1),L=n(39),R=n(1326),P=n(28),N=n(432);function q(t){var e=t.onDelete,n=t.productId,c=t.menu,r=Object(I.useState)(null),i=Object(D.a)(r,2),o=i[0],s=i[1],l={mr:2,width:20,height:20};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(f.a,{onClick:function(t){s(t.currentTarget)},children:Object(u.jsx)(v.a,{icon:"eva:more-vertical-fill",width:20,height:20})}),Object(u.jsxs)(N.a,{open:Boolean(o),anchorEl:o,onClose:function(){s(null)},anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},arrow:"right-top",sx:{mt:-1,width:160,"& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75}},children:[Object(u.jsxs)(R.a,{component:L.b,to:"".concat(P.b[c].root,"/").concat(Object(B.a)(n),"/edit"),children:[Object(u.jsx)(v.a,{icon:"eva:edit-fill",sx:Object(a.a)({},l)}),"Edit"]}),Object(u.jsxs)(R.a,{onClick:e,sx:{color:"error.main"},children:[Object(u.jsx)(v.a,{icon:"eva:trash-2-outline",sx:Object(a.a)({},l)}),"Delete"]})]})]})}},1467:function(t,e,n){"use strict";n.d(e,"b",(function(){return g})),n.d(e,"a",(function(){return y}));var a=n(29),c=n(3),r=n(21),i=n(17),o=n.n(i),s=n(96),l=n(435),u=n.n(l),d=n(442),h=n.n(d),j=n(100),b=n.n(j),p=n(23),O=n(22),f=Object(s.b)({name:"company",initialState:{isLoading:!1,error:null,companys:[],company:null,sortBy:null,filters:{gender:[],category:"All",colors:[],priceRange:"",rating:""},checkout:{activeStep:0,cart:[],subtotal:0,total:0,discount:0,shipping:0,billing:null}},reducers:{startLoading:function(t){t.isLoading=!0},hasError:function(t,e){t.isLoading=!1,t.error=e.payload},getcompanysSuccess:function(t,e){t.isLoading=!1,t.companys=e.payload},getcompanySuccess:function(t,e){t.isLoading=!1,t.company=e.payload},sortBycompanys:function(t,e){t.sortBy=e.payload},filtercompanys:function(t,e){t.filters.gender=e.payload.gender,t.filters.category=e.payload.category,t.filters.colors=e.payload.colors,t.filters.priceRange=e.payload.priceRange,t.filters.rating=e.payload.rating},getCart:function(t,e){var n=e.payload,a=u()(n.map((function(t){return t.price*t.quantity}))),c=0===n.length?0:t.checkout.discount,r=0===n.length?0:t.checkout.shipping,i=0===n.length?null:t.checkout.billing;t.checkout.cart=n,t.checkout.discount=c,t.checkout.shipping=r,t.checkout.billing=i,t.checkout.subtotal=a,t.checkout.total=a-c},addCart:function(t,e){var n=e.payload,a=0===t.checkout.cart.length;t.checkout.cart=a?[].concat(Object(r.a)(t.checkout.cart),[n]):t.checkout.cart.map((function(t){return t.id===n.id?Object(c.a)(Object(c.a)({},t),{},{quantity:t.quantity+1}):t})),t.checkout.cart=h()([].concat(Object(r.a)(t.checkout.cart),[n]),"id")},deleteCart:function(t,e){var n=t.checkout.cart.filter((function(t){return t.id!==e.payload}));t.checkout.cart=n},resetCart:function(t){t.checkout.activeStep=0,t.checkout.cart=[],t.checkout.total=0,t.checkout.subtotal=0,t.checkout.discount=0,t.checkout.shipping=0,t.checkout.billing=null},onBackStep:function(t){t.checkout.activeStep-=1},onNextStep:function(t){t.checkout.activeStep+=1},onGotoStep:function(t,e){var n=e.payload;t.checkout.activeStep=n},increaseQuantity:function(t,e){var n=e.payload,a=t.checkout.cart.map((function(t){return t.id===n?Object(c.a)(Object(c.a)({},t),{},{quantity:t.quantity+1}):t}));t.checkout.cart=a},decreaseQuantity:function(t,e){var n=e.payload,a=t.checkout.cart.map((function(t){return t.id===n?Object(c.a)(Object(c.a)({},t),{},{quantity:t.quantity-1}):t}));t.checkout.cart=a},createBilling:function(t,e){t.checkout.billing=e.payload},applyDiscount:function(t,e){var n=e.payload;t.checkout.discount=n,t.checkout.total=t.checkout.subtotal-n},applyShipping:function(t,e){var n=e.payload;t.checkout.shipping=n,t.checkout.total=t.checkout.subtotal-t.checkout.discount+n}}}),x=(f.reducer,f.actions);x.getCart,x.addCart,x.resetCart,x.onGotoStep,x.onBackStep,x.onNextStep,x.deleteCart,x.createBilling,x.applyShipping,x.applyDiscount,x.increaseQuantity,x.decreaseQuantity,x.sortBycompanys,x.filtercompanys;function g(t,e,n,a,c){return m.apply(this,arguments)}function m(){return(m=Object(a.a)(o.a.mark((function t(e,n,a,c,r){var i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.post("".concat(O.b,"dealers/list"),{skip:e,limit:n,search:a,from:c,to:r});case 3:return i=t.sent,t.abrupt("return",i.data.response);case 7:t.prev=7,t.t0=t.catch(0),Object(p.a)(f.actions.hasError(t.t0));case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}function y(t){return v.apply(this,arguments)}function v(){return(v=Object(a.a)(o.a.mark((function t(e){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.post("".concat(O.b,"dealers/Details"),{_id:e});case 3:return n=t.sent,t.abrupt("return",n.data.response);case 7:t.prev=7,t.t0=t.catch(0),Object(p.a)(f.actions.hasError(t.t0));case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}},2046:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return q}));var a=n(3),c=n(29),r=n(11),i=n(17),o=n.n(i),s=n(1),l=n(39),u=n(1318),d=n(1236),h=n(1334),j=n(2095),b=n(2096),p=n(2100),O=n(2098),f=n(2099),x=n(1310),g=n(648),m=n(322),y=n(125),v=n(2087),k=n(1467),S=n(28),w=n(59),C=n(424),D=n(171),B=n(1352),I=n(1339),L=n(26),R=n(1441),P=n(0),N=[{id:"name",label:"Name",alignRight:!1},{id:"phone",label:"Phone",alignRight:!1},{id:"address",label:"Address",alignRight:!1},{id:"",alignRight:!0}];function q(){var t=Object(w.a)().themeStretch,e=Object(s.useState)([]),n=Object(r.a)(e,2),i=n[0],q=n[1],E=Object(s.useState)(0),Q=Object(r.a)(E,2),A=Q[0],W=Q[1],z=Object(s.useState)("asc"),F=Object(r.a)(z,2),M=F[0],_=F[1],G=Object(s.useState)([]),T=Object(r.a)(G,2),J=T[0],H=T[1],K=Object(s.useState)(""),U=Object(r.a)(K,2),V=U[0],X=U[1],Y=Object(s.useState)(10),Z=Object(r.a)(Y,2),$=Z[0],tt=Z[1],et=Object(s.useState)(""),nt=Object(r.a)(et,2),at=nt[0],ct=(nt[1],Object(s.useState)(0)),rt=Object(r.a)(ct,2),it=rt[0],ot=rt[1],st=Object(s.useState)(null),lt=Object(r.a)(st,2),ut=lt[0],dt=lt[1],ht=Object(s.useState)(null),jt=Object(r.a)(ht,2),bt=jt[0],pt=jt[1],Ot=Object(s.useState)(1),ft=Object(r.a)(Ot,2),xt=(ft[0],ft[1],Object(s.useState)([])),gt=Object(r.a)(xt,2),mt=(gt[0],gt[1],Object(s.useState)()),yt=Object(r.a)(mt,2),vt=(yt[0],yt[1]);Object(s.useEffect)((function(){wt()}),[$,A,V,ut,bt]);var kt=function(){var t=Object(c.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log(e.target.value),tt(parseInt(e.target.value,10)),W(0);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),St=function(){var t=Object(c.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:X(e);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),wt=function(){var t=Object(c.a)(o.a.mark((function t(e){var n,a,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=A*$,a=$,console.log("page",A),console.log("skip",n),console.log("limit",a),console.log("startDate,endDate",ut,bt),t.next=8,Object(k.b)(n,a,V,ut,bt);case 8:(c=t.sent)&&(q(c.data),ot(c.count),vt(c.totalDocData));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function Ct(t){var e,n=0;if(t)for(e=0;e<t.length;e+=1)n=t.charCodeAt(e)+((n<<5)-n);else n="";var a="#";for(e=0;e<3;e+=1){a+="00".concat((n>>16*e&255).toString(16)).slice(-2)}return a}function Dt(t){return{sx:{bgcolor:Ct(t),mr:2},children:t?"".concat(t.split(" ")[0][0]).concat(t.split(" ")[0][1]):""}}var Bt=!i.length&&Boolean(!V),It=!i.length&&Boolean(V);return Object(P.jsx)(C.a,{title:" Company List",children:Object(P.jsxs)(u.a,{maxWidth:!t&&"lg",children:[Object(P.jsx)(I.a,{heading:"Company List",links:[{name:"Dashboard",href:S.b.root},{name:"Company",href:S.b.company.root},{name:"Company List"}],action:Object(P.jsx)(d.a,{variant:"contained",component:l.b,to:S.b.company.newcompany,startIcon:Object(P.jsx)(L.a,{icon:"eva:plus-fill"}),children:"New Company"})}),Object(P.jsxs)(h.a,{children:[Object(P.jsx)(R.b,{numSelected:J.length,filterName:V,clearDate:function(){return dt(null),void pt(null)},onFilterName:St,onDeleteProducts:function(){return function(t){var e=i.filter((function(e){return!t.includes(e.name)}));H([]),q(e)}(J)},startDate:ut,endDate:bt,enable:!0,placeholder:"Search Companies",selecteStartdDate:function(t){return dt(t)},selecteEnddDate:function(t){return pt(t)}}),Object(P.jsx)(D.a,{children:Object(P.jsx)(j.a,{sx:{minWidth:800},children:Object(P.jsxs)(b.a,{children:[Object(P.jsx)(R.a,{order:M,orderBy:at,headLabel:N,rowCount:i.length,numSelected:J.length,onRequestSort:function(t){_(at===t&&"asc"===M?"desc":"asc")}}),Object(P.jsxs)(p.a,{children:[i.map((function(t){var e=t._id,n=t.name,c=t.phone,r=t.address,o=(t.createsAt,-1!==J.indexOf(e));return Object(P.jsxs)(O.a,{hover:!0,tabIndex:-1,role:"checkbox",selected:o,"aria-checked":o,children:[Object(P.jsx)(f.a,{padding:"checkbox",children:Object(P.jsx)(x.a,{checked:o,onClick:function(){return function(t){var e=J.indexOf(t),n=[];-1===e?n=n.concat(J,t):0===e?n=n.concat(J.slice(1)):e===J.length-1?n=n.concat(J.slice(0,-1)):e>0&&(n=n.concat(J.slice(0,e),J.slice(e+1))),H(n)}(e)}})}),Object(P.jsxs)(f.a,{sx:{display:"flex",alignItems:"center"},children:[Object(P.jsx)(g.a,Object(a.a)({},Dt(n))),Object(P.jsx)(m.a,{variant:"subtitle2",noWrap:!0,children:n})]}),c&&Object(P.jsx)(f.a,{children:c}),!c&&Object(P.jsx)(f.a,{children:" ---- "}),r&&Object(P.jsxs)(f.a,{children:[" ",r," "]}),!r&&Object(P.jsx)(f.a,{children:" ---- "}),Object(P.jsx)(f.a,{align:"right",children:Object(P.jsx)(R.c,{menu:"company",productId:e,onDelete:function(){return function(t){var e=i.filter((function(e){return e.id!==t}));H([]),q(e)}(e)}})})]},e)})),Bt>0&&Object(P.jsx)(O.a,{style:{height:53*Bt},children:Object(P.jsx)(f.a,{align:"center",colSpan:8,children:"No Record"})})]}),It&&Object(P.jsx)(p.a,{children:Object(P.jsx)(O.a,{children:Object(P.jsx)(f.a,{align:"center",colSpan:8,children:Object(P.jsx)(y.a,{sx:{py:3},children:Object(P.jsx)(B.a,{searchQuery:V})})})})})]})})}),Object(P.jsx)(v.a,{rowsPerPageOptions:[5,10,25],component:"div",count:it,rowsPerPage:$,page:A,onPageChange:function(t,e){console.log("onPageChange",e),function(t){W(t)}(e)},onRowsPerPageChange:kt})]})]})})}}}]);
//# sourceMappingURL=39.3308580f.chunk.js.map
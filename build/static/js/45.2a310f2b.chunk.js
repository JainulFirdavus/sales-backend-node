(this["webpackJsonpsales-tracker"]=this["webpackJsonpsales-tracker"]||[]).push([[45],{1339:function(e,t,i){"use strict";i.d(t,"a",(function(){return g}));var l=i(3),c=i(25),n=i(128),s=i.n(n),r=i(125),a=i(322),j=i(1238),o=i(39),b=i(1357),d=i(0),x=["links","activeLast"];function h(e){var t=e.links,i=e.activeLast,n=void 0!==i&&i,s=Object(c.a)(e,x),j=t[t.length-1].name,o=t.map((function(e){return Object(d.jsx)(O,{link:e},e.name)})),h=t.map((function(e){return Object(d.jsx)("div",{children:e.name!==j?Object(d.jsx)(O,{link:e}):Object(d.jsx)(a.a,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:j})},e.name)}));return Object(d.jsx)(b.a,Object(l.a)(Object(l.a)({separator:Object(d.jsx)(r.a,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},s),{},{children:n?o:h}))}function O(e){var t=e.link,i=t.href,l=t.name,c=t.icon;return Object(d.jsxs)(j.a,{variant:"body2",component:o.b,to:i||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[c&&Object(d.jsx)(r.a,{sx:{mr:1,"& svg":{width:20,height:20}},children:c}),l]},l)}var y=["links","action","heading","moreLink","sx"];function g(e){var t=e.links,i=e.action,n=e.heading,o=e.moreLink,b=void 0===o?[]:o,x=e.sx,O=Object(c.a)(e,y);return Object(d.jsxs)(r.a,{sx:Object(l.a)({mb:5},x),children:[Object(d.jsxs)(r.a,{sx:{display:"flex",alignItems:"center"},children:[Object(d.jsxs)(r.a,{sx:{flexGrow:1},children:[Object(d.jsx)(a.a,{variant:"h4",gutterBottom:!0,children:n}),Object(d.jsx)(h,Object(l.a)({links:t},O))]}),i&&Object(d.jsx)(r.a,{sx:{flexShrink:0},children:i})]}),Object(d.jsx)(r.a,{sx:{mt:2},children:s()(b)?Object(d.jsx)(j.a,{href:b,target:"_blank",rel:"noopener",variant:"body2",children:b}):b.map((function(e){return Object(d.jsx)(j.a,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},1709:function(e,t){},1710:function(e,t){},1828:function(e,t){},2077:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return J}));var l=i(435),c=i.n(l),n=i(6),s=i(2098),r=i(1318),a=i(1334),j=i(1314),o=i(125),b=i(322),d=i(2095),x=i(2096),h=i(2097),O=i(2099),y=i(2100),g=i(1290),m=i(28),u=i(243),p=i(1341),f=i(59),w=i(424),v=i(425),T=i(126),V=i(171),C=i(1339),_=i(1469);_.Font.register({family:"Roboto",fonts:[{src:"/fonts/Roboto-Regular.ttf"},{src:"/fonts/Roboto-Bold.ttf"}]});var S=_.StyleSheet.create({col4:{width:"25%"},col8:{width:"75%"},col6:{width:"50%"},mb8:{marginBottom:8},mb40:{marginBottom:40},overline:{fontSize:8,marginBottom:8,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase"},h3:{fontSize:16,fontWeight:700},h4:{fontSize:13,fontWeight:700},body1:{fontSize:10},subtitle2:{fontSize:9,fontWeight:700},alignRight:{textAlign:"right"},page:{padding:"40px 24px 0 24px",fontSize:9,lineHeight:1.6,fontFamily:"Roboto",backgroundColor:"#fff",textTransform:"capitalize"},footer:{left:0,right:0,bottom:0,padding:24,margin:"auto",borderTopWidth:1,borderStyle:"solid",position:"absolute",borderColor:"#DFE3E8"},gridContainer:{flexDirection:"row",justifyContent:"space-between"},table:{display:"flex",width:"auto"},tableHeader:{},tableBody:{},tableRow:{padding:"8px 0",flexDirection:"row",borderBottomWidth:1,borderStyle:"solid",borderColor:"#DFE3E8"},noBorder:{paddingTop:8,paddingBottom:0,borderBottomWidth:0},tableCell_1:{width:"5%"},tableCell_2:{width:"50%",paddingRight:16},tableCell_3:{width:"15%"}}),k=i(0);function R(e){var t=e.invoice,i=t.id,l=t.items,n=t.taxes,s=t.status,r=t.discount,a=t.invoiceTo,j=t.invoiceFrom,o=c()(l.map((function(e){return e.price*e.qty}))),b=o-r+n;return Object(k.jsx)(_.Document,{children:Object(k.jsxs)(_.Page,{size:"A4",style:S.page,children:[Object(k.jsxs)(_.View,{style:[S.gridContainer,S.mb40],children:[Object(k.jsx)(_.Image,{source:"/logo/logo_full.jpg",style:{height:32}}),Object(k.jsxs)(_.View,{style:{alignItems:"flex-end",flexDirection:"column"},children:[Object(k.jsx)(_.Text,{style:S.h3,children:s}),Object(k.jsxs)(_.Text,{children:["INV-",i]})]})]}),Object(k.jsxs)(_.View,{style:[S.gridContainer,S.mb40],children:[Object(k.jsxs)(_.View,{style:S.col6,children:[Object(k.jsx)(_.Text,{style:[S.overline,S.mb8],children:"Invoice from"}),Object(k.jsx)(_.Text,{style:S.body1,children:j.name}),Object(k.jsx)(_.Text,{style:S.body1,children:j.address}),Object(k.jsx)(_.Text,{style:S.body1,children:j.phone})]}),Object(k.jsxs)(_.View,{style:S.col6,children:[Object(k.jsx)(_.Text,{style:[S.overline,S.mb8],children:"Invoice to"}),Object(k.jsx)(_.Text,{style:S.body1,children:a.name}),Object(k.jsx)(_.Text,{style:S.body1,children:a.address}),Object(k.jsx)(_.Text,{style:S.body1,children:a.phone})]})]}),Object(k.jsx)(_.Text,{style:[S.overline,S.mb8],children:"Invoice Details"}),Object(k.jsxs)(_.View,{style:S.table,children:[Object(k.jsx)(_.View,{style:S.tableHeader,children:Object(k.jsxs)(_.View,{style:S.tableRow,children:[Object(k.jsx)(_.View,{style:S.tableCell_1,children:Object(k.jsx)(_.Text,{style:S.subtitle2,children:"#"})}),Object(k.jsx)(_.View,{style:S.tableCell_2,children:Object(k.jsx)(_.Text,{style:S.subtitle2,children:"Description"})}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{style:S.subtitle2,children:"Qty"})}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{style:S.subtitle2,children:"Unit price"})}),Object(k.jsx)(_.View,{style:[S.tableCell_3,S.alignRight],children:Object(k.jsx)(_.Text,{style:S.subtitle2,children:"Total"})})]})}),Object(k.jsxs)(_.View,{style:S.tableBody,children:[l.map((function(e,t){return Object(k.jsxs)(_.View,{style:S.tableRow,children:[Object(k.jsx)(_.View,{style:S.tableCell_1,children:Object(k.jsx)(_.Text,{children:t+1})}),Object(k.jsxs)(_.View,{style:S.tableCell_2,children:[Object(k.jsx)(_.Text,{style:S.subtitle2,children:e.title}),Object(k.jsx)(_.Text,{children:e.description})]}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{children:e.qty})}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{children:e.price})}),Object(k.jsx)(_.View,{style:[S.tableCell_3,S.alignRight],children:Object(k.jsx)(_.Text,{children:Object(u.a)(e.price*e.qty)})})]},e.id)})),Object(k.jsxs)(_.View,{style:[S.tableRow,S.noBorder],children:[Object(k.jsx)(_.View,{style:S.tableCell_1}),Object(k.jsx)(_.View,{style:S.tableCell_2}),Object(k.jsx)(_.View,{style:S.tableCell_3}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{children:"Subtotal"})}),Object(k.jsx)(_.View,{style:[S.tableCell_3,S.alignRight],children:Object(k.jsx)(_.Text,{children:Object(u.a)(o)})})]}),Object(k.jsxs)(_.View,{style:[S.tableRow,S.noBorder],children:[Object(k.jsx)(_.View,{style:S.tableCell_1}),Object(k.jsx)(_.View,{style:S.tableCell_2}),Object(k.jsx)(_.View,{style:S.tableCell_3}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{children:"Discount"})}),Object(k.jsx)(_.View,{style:[S.tableCell_3,S.alignRight],children:Object(k.jsx)(_.Text,{children:Object(u.a)(-r)})})]}),Object(k.jsxs)(_.View,{style:[S.tableRow,S.noBorder],children:[Object(k.jsx)(_.View,{style:S.tableCell_1}),Object(k.jsx)(_.View,{style:S.tableCell_2}),Object(k.jsx)(_.View,{style:S.tableCell_3}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{children:"Taxes"})}),Object(k.jsx)(_.View,{style:[S.tableCell_3,S.alignRight],children:Object(k.jsx)(_.Text,{children:Object(u.a)(n)})})]}),Object(k.jsxs)(_.View,{style:[S.tableRow,S.noBorder],children:[Object(k.jsx)(_.View,{style:S.tableCell_1}),Object(k.jsx)(_.View,{style:S.tableCell_2}),Object(k.jsx)(_.View,{style:S.tableCell_3}),Object(k.jsx)(_.View,{style:S.tableCell_3,children:Object(k.jsx)(_.Text,{style:S.h4,children:"Total"})}),Object(k.jsx)(_.View,{style:[S.tableCell_3,S.alignRight],children:Object(k.jsx)(_.Text,{style:S.h4,children:Object(u.a)(b)})})]})]})]}),Object(k.jsxs)(_.View,{style:[S.gridContainer,S.footer],children:[Object(k.jsxs)(_.View,{style:S.col8,children:[Object(k.jsx)(_.Text,{style:S.subtitle2,children:"NOTES"}),Object(k.jsx)(_.Text,{children:"We appreciate your business. Should you need us to add VAT or extra notes let us know!"})]}),Object(k.jsxs)(_.View,{style:[S.col4,S.alignRight],children:[Object(k.jsx)(_.Text,{style:S.subtitle2,children:"Have a Question?"}),Object(k.jsx)(_.Text,{children:"support@abcapp.com"})]})]})]})})}var I=i(3),B=i(11),D=i(25),W=i(1),z=i(1236),E=i(1332),F=i(1239),P=i(646),q=i(1335),A=i(26),H=i(51),N=["invoice"],L=Object(n.a)("div")((function(e){return{display:"flex",alignItems:"center",justifyContent:"flex-end",marginBottom:e.theme.spacing(5)}}));function Q(e){var t=e.invoice,i=Object(D.a)(e,N),l=Object(W.useState)(!1),c=Object(B.a)(l,2),n=c[0],s=c[1];return Object(k.jsxs)(L,Object(I.a)(Object(I.a)({},i),{},{children:[Object(k.jsx)(z.a,{color:"error",size:"small",variant:"contained",endIcon:Object(k.jsx)(A.a,{icon:"eva:share-fill"}),children:"Share"}),Object(k.jsx)(z.a,{color:"info",size:"small",variant:"contained",onClick:function(){s(!0)},endIcon:Object(k.jsx)(A.a,{icon:"eva:eye-fill"}),sx:{mx:1},children:"Preview"}),Object(k.jsx)(_.PDFDownloadLink,{document:Object(k.jsx)(R,{invoice:t}),fileName:"INVOICE-".concat(t.id),style:{textDecoration:"none"},children:function(e){var t=e.loading;return Object(k.jsx)(q.a,{size:"small",loading:t,variant:"contained",loadingPosition:"end",endIcon:Object(k.jsx)(A.a,{icon:"eva:download-fill"}),children:"Download"})}}),Object(k.jsx)(H.a,{fullScreen:!0,open:n,children:Object(k.jsxs)(o.a,{sx:{height:"100%",display:"flex",flexDirection:"column"},children:[Object(k.jsx)(E.a,{sx:{zIndex:9,padding:"12px !important",boxShadow:function(e){return e.customShadows.z8}},children:Object(k.jsx)(F.a,{title:"Close",children:Object(k.jsx)(P.a,{color:"inherit",onClick:function(){s(!1)},children:Object(k.jsx)(A.a,{icon:"eva:close-fill"})})})}),Object(k.jsx)(o.a,{sx:{flexGrow:1,height:"100%",overflow:"hidden"},children:Object(k.jsx)(_.PDFViewer,{width:"100%",height:"100%",style:{border:"none"},children:Object(k.jsx)(R,{invoice:t})})})]})})]}))}var G=Object(n.a)(s.a)((function(e){var t=e.theme;return{"& td":{paddingTop:t.spacing(1),paddingBottom:t.spacing(1)}}}));function J(){var e=Object(f.a)().themeStretch,t=c()(p.y.items.map((function(e){return e.price*e.qty}))),i=t-p.y.discount+p.y.taxes;return Object(k.jsx)(w.a,{title:"Ecommerce: Invoice",children:Object(k.jsxs)(r.a,{maxWidth:!e&&"lg",children:[Object(k.jsx)(C.a,{heading:"Invoice Details",links:[{name:"Dashboard",href:m.b.root},{name:"E-Commerce",href:m.b.eCommerce.root},{name:"Invoice"}]}),Object(k.jsx)(Q,{invoice:p.y}),Object(k.jsxs)(a.a,{sx:{pt:5,px:5},children:[Object(k.jsxs)(j.a,{container:!0,children:[Object(k.jsx)(j.a,{item:!0,xs:12,sm:6,sx:{mb:5},children:Object(k.jsx)(T.a,{disabledEffect:!0,visibleByDefault:!0,alt:"logo",src:"/logo/logo_full.svg",sx:{maxWidth:120}})}),Object(k.jsx)(j.a,{item:!0,xs:12,sm:6,sx:{mb:5},children:Object(k.jsxs)(o.a,{sx:{textAlign:{sm:"right"}},children:[Object(k.jsx)(v.a,{color:"success",sx:{textTransform:"uppercase",mb:1},children:p.y.status}),Object(k.jsxs)(b.a,{variant:"h6",children:["INV-",p.y.id]})]})}),Object(k.jsxs)(j.a,{item:!0,xs:12,sm:6,sx:{mb:5},children:[Object(k.jsx)(b.a,{paragraph:!0,variant:"overline",sx:{color:"text.disabled"},children:"Invoice from"}),Object(k.jsx)(b.a,{variant:"body2",children:p.y.invoiceFrom.name}),Object(k.jsx)(b.a,{variant:"body2",children:p.y.invoiceFrom.address}),Object(k.jsxs)(b.a,{variant:"body2",children:["Phone: ",p.y.invoiceFrom.phone]})]}),Object(k.jsxs)(j.a,{item:!0,xs:12,sm:6,sx:{mb:5},children:[Object(k.jsx)(b.a,{paragraph:!0,variant:"overline",sx:{color:"text.disabled"},children:"Invoice to"}),Object(k.jsx)(b.a,{variant:"body2",children:p.y.invoiceTo.name}),Object(k.jsx)(b.a,{variant:"body2",children:p.y.invoiceTo.address}),Object(k.jsxs)(b.a,{variant:"body2",children:["Phone: ",p.y.invoiceTo.phone]})]})]}),Object(k.jsx)(V.a,{children:Object(k.jsx)(d.a,{sx:{minWidth:960},children:Object(k.jsxs)(x.a,{children:[Object(k.jsx)(h.a,{sx:{borderBottom:function(e){return"solid 1px ".concat(e.palette.divider)},"& th":{backgroundColor:"transparent"}},children:Object(k.jsxs)(s.a,{children:[Object(k.jsx)(O.a,{width:40,children:"#"}),Object(k.jsx)(O.a,{align:"left",children:"Description"}),Object(k.jsx)(O.a,{align:"left",children:"Qty"}),Object(k.jsx)(O.a,{align:"right",children:"Unit price"}),Object(k.jsx)(O.a,{align:"right",children:"Total"})]})}),Object(k.jsxs)(y.a,{children:[p.y.items.map((function(e,t){return Object(k.jsxs)(s.a,{sx:{borderBottom:function(e){return"solid 1px ".concat(e.palette.divider)}},children:[Object(k.jsx)(O.a,{children:t+1}),Object(k.jsx)(O.a,{align:"left",children:Object(k.jsxs)(o.a,{sx:{maxWidth:560},children:[Object(k.jsx)(b.a,{variant:"subtitle2",children:e.title}),Object(k.jsx)(b.a,{variant:"body2",sx:{color:"text.secondary"},noWrap:!0,children:e.description})]})}),Object(k.jsx)(O.a,{align:"left",children:e.qty}),Object(k.jsx)(O.a,{align:"right",children:Object(u.a)(e.price)}),Object(k.jsx)(O.a,{align:"right",children:Object(u.a)(e.price*e.qty)})]},t)})),Object(k.jsxs)(G,{children:[Object(k.jsx)(O.a,{colSpan:3}),Object(k.jsxs)(O.a,{align:"right",children:[Object(k.jsx)(o.a,{sx:{mt:2}}),Object(k.jsx)(b.a,{children:"Subtotal"})]}),Object(k.jsxs)(O.a,{align:"right",width:120,children:[Object(k.jsx)(o.a,{sx:{mt:2}}),Object(k.jsx)(b.a,{children:Object(u.a)(t)})]})]}),Object(k.jsxs)(G,{children:[Object(k.jsx)(O.a,{colSpan:3}),Object(k.jsx)(O.a,{align:"right",children:Object(k.jsx)(b.a,{children:"Discount"})}),Object(k.jsx)(O.a,{align:"right",width:120,children:Object(k.jsx)(b.a,{sx:{color:"error.main"},children:Object(u.a)(-p.y.discount)})})]}),Object(k.jsxs)(G,{children:[Object(k.jsx)(O.a,{colSpan:3}),Object(k.jsx)(O.a,{align:"right",children:Object(k.jsx)(b.a,{children:"Taxes"})}),Object(k.jsx)(O.a,{align:"right",width:120,children:Object(k.jsx)(b.a,{children:Object(u.a)(p.y.taxes)})})]}),Object(k.jsxs)(G,{children:[Object(k.jsx)(O.a,{colSpan:3}),Object(k.jsx)(O.a,{align:"right",children:Object(k.jsx)(b.a,{variant:"h6",children:"Total"})}),Object(k.jsx)(O.a,{align:"right",width:140,children:Object(k.jsx)(b.a,{variant:"h6",children:Object(u.a)(i)})})]})]})]})})}),Object(k.jsx)(g.a,{sx:{mt:5}}),Object(k.jsxs)(j.a,{container:!0,children:[Object(k.jsxs)(j.a,{item:!0,xs:12,md:9,sx:{py:3},children:[Object(k.jsx)(b.a,{variant:"subtitle2",children:"NOTES"}),Object(k.jsx)(b.a,{variant:"body2",children:"We appreciate your business. Should you need us to add VAT or extra notes let us know!"})]}),Object(k.jsxs)(j.a,{item:!0,xs:12,md:3,sx:{py:3,textAlign:"right"},children:[Object(k.jsx)(b.a,{variant:"subtitle2",children:"Have a Question?"}),Object(k.jsx)(b.a,{variant:"body2",children:"support@minimals.cc"})]})]})]})]})})}}}]);
//# sourceMappingURL=45.2a310f2b.chunk.js.map
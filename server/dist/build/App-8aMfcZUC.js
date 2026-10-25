import{r as c,j as t,db as M,h0 as Ae,h1 as Pe,h2 as $e,h3 as ct,eZ as dt,h4 as ut,h5 as ft,h6 as pt,h7 as gt,h8 as ht,h9 as we,a as D,ha as ee,hb as f,T as x,I as y,k as m,R as F,F as te,u as Le,hc as mt,hd as U,bG as ve,da as xt,he as jt,hf as vt,hg as ge,H as L,aY as ke,N as bt,U as Q,g2 as oe,s as se,dQ as ae,dl as yt,di as Ct,dj as It,c as be,eS as he,eU as wt,eW as St,eR as Rt,eT as Mt,eV as Ne,q as Dt,cq as A,A as ne,bx as Tt,hh as Et,hi as Ft,hj as At,hk as Pt,L as ce,gg as $t,gh as Lt,dV as kt,hl as de,ah as Nt,hm as _t,fG as Gt,hn as Ot,P as Se,O as Ut,Q as Vt}from"./strapi--X8wYuEq.js";import{g as Bt}from"./users-DLc-PG84.js";function ye(e,n=[]){let r=[];function o(a,i){const l=c.createContext(i),u=r.length;r=[...r,i];const g=p=>{const{scope:j,children:v,...C}=p,b=j?.[e]?.[u]||l,h=c.useMemo(()=>C,Object.values(C));return t.jsx(b.Provider,{value:h,children:v})};g.displayName=a+"Provider";function d(p,j){const v=j?.[e]?.[u]||l,C=c.useContext(v);if(C)return C;if(i!==void 0)return i;throw new Error(`\`${p}\` must be used within \`${a}\``)}return[g,d]}const s=()=>{const a=r.map(i=>c.createContext(i));return function(l){const u=l?.[e]||a;return c.useMemo(()=>({[`__scope${e}`]:{...l,[e]:u}}),[l,u])}};return s.scopeName=e,[o,zt(s,...n)]}function zt(...e){const n=e[0];if(e.length===1)return n;const r=()=>{const o=e.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(a){const i=o.reduce((l,{useScope:u,scopeName:g})=>{const p=u(a)[`__scope${g}`];return{...l,...p}},{});return c.useMemo(()=>({[`__scope${n.scopeName}`]:i}),[i])}};return r.scopeName=n.scopeName,r}function Re(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function _e(...e){return n=>{let r=!1;const o=e.map(s=>{const a=Re(s,n);return!r&&typeof a=="function"&&(r=!0),a});if(r)return()=>{for(let s=0;s<o.length;s++){const a=o[s];typeof a=="function"?a():Re(e[s],null)}}}}function me(...e){return c.useCallback(_e(...e),e)}function xe(e){const n=Ht(e),r=c.forwardRef((o,s)=>{const{children:a,...i}=o,l=c.Children.toArray(a),u=l.find(qt);if(u){const g=u.props.children,d=l.map(p=>p===u?c.Children.count(g)>1?c.Children.only(null):c.isValidElement(g)?g.props.children:null:p);return t.jsx(n,{...i,ref:s,children:c.isValidElement(g)?c.cloneElement(g,void 0,d):null})}return t.jsx(n,{...i,ref:s,children:a})});return r.displayName=`${e}.Slot`,r}function Ht(e){const n=c.forwardRef((r,o)=>{const{children:s,...a}=r;if(c.isValidElement(s)){const i=Zt(s),l=Kt(a,s.props);return s.type!==c.Fragment&&(l.ref=o?_e(o,i):i),c.cloneElement(s,l)}return c.Children.count(s)>1?c.Children.only(null):null});return n.displayName=`${e}.SlotClone`,n}var Wt=Symbol("radix.slottable");function qt(e){return c.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Wt}function Kt(e,n){const r={...n};for(const o in n){const s=e[o],a=n[o];/^on[A-Z]/.test(o)?s&&a?r[o]=(...l)=>{const u=a(...l);return s(...l),u}:s&&(r[o]=s):o==="style"?r[o]={...s,...a}:o==="className"&&(r[o]=[s,a].filter(Boolean).join(" "))}return{...e,...r}}function Zt(e){let n=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=n&&"isReactWarning"in n&&n.isReactWarning;return r?e.ref:(n=Object.getOwnPropertyDescriptor(e,"ref")?.get,r=n&&"isReactWarning"in n&&n.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}var Qt=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],W=Qt.reduce((e,n)=>{const r=xe(`Primitive.${n}`),o=c.forwardRef((s,a)=>{const{asChild:i,...l}=s,u=i?r:n;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),t.jsx(u,{...l,ref:a})});return o.displayName=`Primitive.${n}`,{...e,[n]:o}},{});function V(e,n,{checkForDefaultPrevented:r=!0}={}){return function(s){if(e?.(s),r===!1||!s.defaultPrevented)return n?.(s)}}function Yt(e){const n=e+"CollectionProvider",[r,o]=ye(n),[s,a]=r(n,{collectionRef:{current:null},itemMap:new Map}),i=b=>{const{scope:h,children:S}=b,E=M.useRef(null),I=M.useRef(new Map).current;return t.jsx(s,{scope:h,itemMap:I,collectionRef:E,children:S})};i.displayName=n;const l=e+"CollectionSlot",u=xe(l),g=M.forwardRef((b,h)=>{const{scope:S,children:E}=b,I=a(l,S),R=me(h,I.collectionRef);return t.jsx(u,{ref:R,children:E})});g.displayName=l;const d=e+"CollectionItemSlot",p="data-radix-collection-item",j=xe(d),v=M.forwardRef((b,h)=>{const{scope:S,children:E,...I}=b,R=M.useRef(null),k=me(h,R),w=a(d,S);return M.useEffect(()=>(w.itemMap.set(R,{ref:R,...I}),()=>void w.itemMap.delete(R))),t.jsx(j,{[p]:"",ref:k,children:E})});v.displayName=d;function C(b){const h=a(e+"CollectionConsumer",b);return M.useCallback(()=>{const E=h.collectionRef.current;if(!E)return[];const I=Array.from(E.querySelectorAll(`[${p}]`));return Array.from(h.itemMap.values()).sort((w,P)=>I.indexOf(w.ref.current)-I.indexOf(P.ref.current))},[h.collectionRef,h.itemMap])}return[{Provider:i,Slot:g,ItemSlot:v},C,o]}var Ge=globalThis?.document?c.useLayoutEffect:()=>{},Xt=Ae[" useId ".trim().toString()]||(()=>{}),Jt=0;function en(e){const[n,r]=c.useState(Xt());return Ge(()=>{r(o=>o??String(Jt++))},[e]),n?`radix-${n}`:""}function tn(e){const n=c.useRef(e);return c.useEffect(()=>{n.current=e}),c.useMemo(()=>(...r)=>n.current?.(...r),[])}var nn=Ae[" useInsertionEffect ".trim().toString()]||Ge;function ie({prop:e,defaultProp:n,onChange:r=()=>{},caller:o}){const[s,a,i]=rn({defaultProp:n,onChange:r}),l=e!==void 0,u=l?e:s;{const d=c.useRef(e!==void 0);c.useEffect(()=>{const p=d.current;p!==l&&console.warn(`${o} is changing from ${p?"controlled":"uncontrolled"} to ${l?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=l},[l,o])}const g=c.useCallback(d=>{if(l){const p=on(d)?d(e):d;p!==e&&i.current?.(p)}else a(d)},[l,e,a,i]);return[u,g]}function rn({defaultProp:e,onChange:n}){const[r,o]=c.useState(e),s=c.useRef(r),a=c.useRef(n);return nn(()=>{a.current=n},[n]),c.useEffect(()=>{s.current!==r&&(a.current?.(r),s.current=r)},[r,s]),[r,o,a]}function on(e){return typeof e=="function"}var sn=c.createContext(void 0);function Oe(e){const n=c.useContext(sn);return e||n||"ltr"}var ue="rovingFocusGroup.onEntryFocus",an={bubbles:!1,cancelable:!0},q="RovingFocusGroup",[je,Ue,ln]=Yt(q),[cn,Ve]=ye(q,[ln]),[dn,un]=cn(q),Be=c.forwardRef((e,n)=>t.jsx(je.Provider,{scope:e.__scopeRovingFocusGroup,children:t.jsx(je.Slot,{scope:e.__scopeRovingFocusGroup,children:t.jsx(fn,{...e,ref:n})})}));Be.displayName=q;var fn=c.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:r,orientation:o,loop:s=!1,dir:a,currentTabStopId:i,defaultCurrentTabStopId:l,onCurrentTabStopIdChange:u,onEntryFocus:g,preventScrollOnEntryFocus:d=!1,...p}=e,j=c.useRef(null),v=me(n,j),C=Oe(a),[b,h]=ie({prop:i,defaultProp:l??null,onChange:u,caller:q}),[S,E]=c.useState(!1),I=tn(g),R=Ue(r),k=c.useRef(!1),[w,P]=c.useState(0);return c.useEffect(()=>{const T=j.current;if(T)return T.addEventListener(ue,I),()=>T.removeEventListener(ue,I)},[I]),t.jsx(dn,{scope:r,orientation:o,dir:C,loop:s,currentTabStopId:b,onItemFocus:c.useCallback(T=>h(T),[h]),onItemShiftTab:c.useCallback(()=>E(!0),[]),onFocusableItemAdd:c.useCallback(()=>P(T=>T+1),[]),onFocusableItemRemove:c.useCallback(()=>P(T=>T-1),[]),children:t.jsx(W.div,{tabIndex:S||w===0?-1:0,"data-orientation":o,...p,ref:v,style:{outline:"none",...e.style},onMouseDown:V(e.onMouseDown,()=>{k.current=!0}),onFocus:V(e.onFocus,T=>{const Z=!k.current;if(T.target===T.currentTarget&&Z&&!S){const B=new CustomEvent(ue,an);if(T.currentTarget.dispatchEvent(B),!B.defaultPrevented){const le=R().filter(G=>G.focusable),at=le.find(G=>G.active),it=le.find(G=>G.id===b),lt=[at,it,...le].filter(Boolean).map(G=>G.ref.current);We(lt,d)}}k.current=!1}),onBlur:V(e.onBlur,()=>E(!1))})})}),ze="RovingFocusGroupItem",He=c.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:r,focusable:o=!0,active:s=!1,tabStopId:a,children:i,...l}=e,u=en(),g=a||u,d=un(ze,r),p=d.currentTabStopId===g,j=Ue(r),{onFocusableItemAdd:v,onFocusableItemRemove:C,currentTabStopId:b}=d;return c.useEffect(()=>{if(o)return v(),()=>C()},[o,v,C]),t.jsx(je.ItemSlot,{scope:r,id:g,focusable:o,active:s,children:t.jsx(W.span,{tabIndex:p?0:-1,"data-orientation":d.orientation,...l,ref:n,onMouseDown:V(e.onMouseDown,h=>{o?d.onItemFocus(g):h.preventDefault()}),onFocus:V(e.onFocus,()=>d.onItemFocus(g)),onKeyDown:V(e.onKeyDown,h=>{if(h.key==="Tab"&&h.shiftKey){d.onItemShiftTab();return}if(h.target!==h.currentTarget)return;const S=hn(h,d.orientation,d.dir);if(S!==void 0){if(h.metaKey||h.ctrlKey||h.altKey||h.shiftKey)return;h.preventDefault();let I=j().filter(R=>R.focusable).map(R=>R.ref.current);if(S==="last")I.reverse();else if(S==="prev"||S==="next"){S==="prev"&&I.reverse();const R=I.indexOf(h.currentTarget);I=d.loop?mn(I,R+1):I.slice(R+1)}setTimeout(()=>We(I))}}),children:typeof i=="function"?i({isCurrentTabStop:p,hasTabStop:b!=null}):i})})});He.displayName=ze;var pn={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function gn(e,n){return n!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function hn(e,n,r){const o=gn(e.key,r);if(!(n==="vertical"&&["ArrowLeft","ArrowRight"].includes(o))&&!(n==="horizontal"&&["ArrowUp","ArrowDown"].includes(o)))return pn[o]}function We(e,n=!1){const r=document.activeElement;for(const o of e)if(o===r||(o.focus({preventScroll:n}),document.activeElement!==r))return}function mn(e,n){return e.map((r,o)=>e[(n+o)%e.length])}var xn=Be,jn=He,qe="Toggle",Ke=c.forwardRef((e,n)=>{const{pressed:r,defaultPressed:o,onPressedChange:s,...a}=e,[i,l]=ie({prop:r,onChange:s,defaultProp:o??!1,caller:qe});return t.jsx(W.button,{type:"button","aria-pressed":i,"data-state":i?"on":"off","data-disabled":e.disabled?"":void 0,...a,ref:n,onClick:V(e.onClick,()=>{e.disabled||l(!i)})})});Ke.displayName=qe;var _="ToggleGroup",[Ze]=ye(_,[Ve]),Qe=Ve(),Ce=M.forwardRef((e,n)=>{const{type:r,...o}=e;if(r==="single"){const s=o;return t.jsx(vn,{...s,ref:n})}if(r==="multiple"){const s=o;return t.jsx(bn,{...s,ref:n})}throw new Error(`Missing prop \`type\` expected on \`${_}\``)});Ce.displayName=_;var[Ye,Xe]=Ze(_),vn=M.forwardRef((e,n)=>{const{value:r,defaultValue:o,onValueChange:s=()=>{},...a}=e,[i,l]=ie({prop:r,defaultProp:o??"",onChange:s,caller:_});return t.jsx(Ye,{scope:e.__scopeToggleGroup,type:"single",value:M.useMemo(()=>i?[i]:[],[i]),onItemActivate:l,onItemDeactivate:M.useCallback(()=>l(""),[l]),children:t.jsx(Je,{...a,ref:n})})}),bn=M.forwardRef((e,n)=>{const{value:r,defaultValue:o,onValueChange:s=()=>{},...a}=e,[i,l]=ie({prop:r,defaultProp:o??[],onChange:s,caller:_}),u=M.useCallback(d=>l((p=[])=>[...p,d]),[l]),g=M.useCallback(d=>l((p=[])=>p.filter(j=>j!==d)),[l]);return t.jsx(Ye,{scope:e.__scopeToggleGroup,type:"multiple",value:i,onItemActivate:u,onItemDeactivate:g,children:t.jsx(Je,{...a,ref:n})})});Ce.displayName=_;var[yn,Cn]=Ze(_),Je=M.forwardRef((e,n)=>{const{__scopeToggleGroup:r,disabled:o=!1,rovingFocus:s=!0,orientation:a,dir:i,loop:l=!0,...u}=e,g=Qe(r),d=Oe(i),p={role:"group",dir:d,...u};return t.jsx(yn,{scope:r,rovingFocus:s,disabled:o,children:s?t.jsx(xn,{asChild:!0,...g,orientation:a,dir:d,loop:l,children:t.jsx(W.div,{...p,ref:n})}):t.jsx(W.div,{...p,ref:n})})}),re="ToggleGroupItem",et=M.forwardRef((e,n)=>{const r=Xe(re,e.__scopeToggleGroup),o=Cn(re,e.__scopeToggleGroup),s=Qe(e.__scopeToggleGroup),a=r.value.includes(e.value),i=o.disabled||e.disabled,l={...e,pressed:a,disabled:i},u=M.useRef(null);return o.rovingFocus?t.jsx(jn,{asChild:!0,...s,focusable:!i,active:a,ref:u,children:t.jsx(Me,{...l,ref:n})}):t.jsx(Me,{...l,ref:n})});et.displayName=re;var Me=M.forwardRef((e,n)=>{const{__scopeToggleGroup:r,value:o,...s}=e,a=Xe(re,r),i={role:"radio","aria-checked":e.pressed,"aria-pressed":void 0},l=a.type==="single"?i:void 0;return t.jsx(Ke,{...l,...s,ref:n,onPressedChange:u=>{u?a.onItemActivate(o):a.onItemDeactivate(o)}})}),In=Ce,wn=et;const Sn=Pe.injectEndpoints({endpoints:e=>({getFolders:e.query({query:(n={})=>{const{parentId:r}=n,o={};return r!=null?o.filters={$and:[{parent:{id:r}}]}:o.filters={$and:[{parent:{id:{$null:!0}}}]},{url:"/upload/folders",method:"GET",config:{params:o}}},transformResponse:n=>n.data,providesTags:n=>n?[...n.map(({id:r})=>({type:"Folder",id:r})),{type:"Folder",id:"LIST"}]:[{type:"Folder",id:"LIST"}]}),createFolder:e.mutation({query:n=>({url:"/upload/folders",method:"POST",data:n}),transformResponse:n=>n.data,invalidatesTags:[{type:"Folder",id:"LIST"}]}),getFolder:e.query({query:({id:n})=>({url:`/upload/folders/${n}`,method:"GET",config:{params:{populate:{parent:{populate:{parent:"*"}},children:{count:!0},files:{count:!0}}}}}),transformResponse:n=>n.data,providesTags:(n,r,{id:o})=>[{type:"Folder",id:o}]})})}),{useCreateFolderMutation:Rn,useGetFoldersQuery:Mn,useGetFolderQuery:Dn}=Sn;var N=function(e){return e.Video="video",e.Image="image",e.Document="doc",e.Audio="audio",e}({});const Tn=Pe.injectEndpoints({endpoints:e=>({getAssets:e.query({query:(n={})=>{const{folder:r,...o}=n,s={...o};return r!=null?s.filters={$and:[{folder:{id:r}}]}:s.filters={$and:[{folder:{id:{$null:!0}}}]},{url:"/upload/files",method:"GET",config:{params:s}}},transformResponse:n=>n,providesTags:n=>n?[...n.results.map(({id:r})=>({type:"Asset",id:r})),{type:"Asset",id:"LIST"}]:[{type:"Asset",id:"LIST"}]}),getAsset:e.query({query:n=>({url:`/upload/files/${n}`,method:"GET"}),providesTags:(n,r,o)=>[{type:"Asset",id:o}]})})}),{useGetAssetsQuery:tt,useGetAssetQuery:En}=Tn,Fn={pdf:ht,csv:gt,xls:pt,zip:ft},K=(e,n)=>{const r=$e(n);return e?.includes(N.Image)?ct:e?.includes(N.Video)?dt:e?.includes(N.Audio)?ut:r?Fn[r]||we:we},z=m(F)`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 24rem;
  overflow: hidden;
  border-radius: ${({theme:e})=>e.borderRadius};
  padding: ${({theme:e})=>e.spaces[3]};
  background: repeating-conic-gradient(
      ${({theme:e})=>e.colors.neutral100} 0% 25%,
      transparent 0% 50%
    )
    50% / 20px 20px;
`,Y=m(x)`
  justify-content: center;
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
`,An=m.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`,Pn=m.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`,$n=m.audio`
  width: 100%;
`,Ln=m.iframe`
  width: 100%;
  height: 100%;
  min-height: 200px;
  border: none;
`,kn=m(x)`
  height: 100%;
  aspect-ratio: 1;
  width: auto;
  max-width: 100%;
  margin: 0 auto;
  color: ${({theme:e})=>e.colors.neutral500};
  background: ${({theme:e})=>e.colors.neutral150};
`,Nn=m(x)`
  position: absolute;
  inset: 0;
  z-index: 1;
`,X=()=>{const{formatMessage:e}=D();return t.jsx(Nn,{justifyContent:"center",alignItems:"center",children:t.jsx(te,{children:e({id:"app.loading",defaultMessage:"Loading..."})})})},_n=({asset:e})=>{const{formatMessage:n}=D(),{alternativeText:r,ext:o,mime:s,url:a}=e,i=ee(a),[l,u]=c.useState(!1);if(c.useEffect(()=>{u(!1)},[i]),s?.includes(N.Image)){const p=ee(a);if(p)return t.jsxs(z,{children:[!l&&t.jsx(X,{}),t.jsx(Y,{children:t.jsx(An,{src:p,alt:r||e.name||"",onLoad:()=>u(!0),onError:()=>u(!0)})})]})}if(s?.includes(N.Video)&&i)return t.jsxs(z,{children:[!l&&t.jsx(X,{}),t.jsx(Y,{children:t.jsx(Pn,{src:i,controls:!0,title:e.name,onLoadedData:()=>u(!0),onError:()=>u(!0),children:n({id:f("asset-details.videoNotSupported"),defaultMessage:"Your browser does not support the video tag."})})})]});if(s?.includes(N.Audio)&&i)return t.jsxs(z,{children:[!l&&t.jsx(X,{}),t.jsx(Y,{children:t.jsx(x,{width:"100%",padding:4,justifyContent:"center",alignItems:"center",height:"100%",minHeight:"12rem",children:t.jsx($n,{src:i,controls:!0,onLoadedData:()=>u(!0),onError:()=>u(!0)})})})]});if((o?.toLowerCase()==="pdf"||o?.toLowerCase()===".pdf"||s==="application/pdf")&&i)return t.jsxs(z,{children:[!l&&t.jsx(X,{}),t.jsx(Y,{children:t.jsx(Ln,{src:`${i}#toolbar=0`,title:e.name,onLoad:()=>u(!0)})})]});const d=K(s,o);return t.jsx(z,{children:t.jsxs(kn,{justifyContent:"center",alignItems:"center",gap:1,direction:"column",hasRadius:!0,children:[t.jsx(d,{width:24,height:24}),t.jsx(y,{variant:"pi",children:n({id:f("asset-details.noPreview"),defaultMessage:"No preview available"})})]})})},fe="assetId",nt=()=>{const[{query:e},n]=Le(),r=e?.[fe],o=r?parseInt(r,10):null,s=o!==null&&!Number.isNaN(o),[a,i]=c.useState(!1),l=c.useRef(null),u=s&&!a;c.useEffect(()=>{s&&(l.current=o)},[s,o]);const g=c.useCallback(v=>{i(!1),n({[fe]:String(v)})},[n]),d=c.useCallback(()=>{s&&i(!0)},[s]);c.useEffect(()=>{if(!a)return;const v=window.setTimeout(()=>{n({[fe]:void 0},"remove"),i(!1),l.current=null},mt);return()=>window.clearTimeout(v)},[a,n]);const p=s||a;return{assetId:a?l.current??o:o,isVisible:u,shouldRenderDrawer:p,openDetails:g,closeDetails:d}},Gn=m(x)`
  flex: 0 0 calc(50% - ${({theme:e})=>e.spaces[2]});
`,O=({label:e,value:n})=>t.jsxs(Gn,{direction:"column",justifyContent:"flex-start",alignItems:"flex-start",gap:1,children:[t.jsx(y,{variant:"sigma",textColor:"neutral600",fontWeight:"semiBold",textTransform:"uppercase",children:e}),t.jsx(y,{variant:"pi",textColor:"neutral700",children:n??"-"})]}),On=m(bt)`
  width: 1.6rem;
  height: 1.6rem;

  path {
    fill: ${({theme:e})=>e.colors.warning500};
  }
`,pe=({name:e,label:n,value:r,required:o})=>t.jsxs(L.Root,{name:e,required:o,children:[t.jsx(L.Label,{children:n}),t.jsx(ke,{value:r??"",onChange:()=>{},endAction:r?void 0:t.jsx(On,{}),type:"text"})]}),Un=({asset:e})=>{const{formatMessage:n,formatDate:r}=D(),o=e.mime?.includes(N.Image);return t.jsxs(x,{direction:"column",alignItems:"stretch",gap:4,paddingTop:4,paddingBottom:4,paddingLeft:5,paddingRight:5,children:[t.jsx(y,{variant:"beta",fontWeight:"semiBold",tag:"h3",children:n({id:f("asset-details.fileInfo"),defaultMessage:"File info"})}),t.jsxs(x,{wrap:"wrap",gap:4,background:"neutral100",paddingTop:4,paddingBottom:4,paddingLeft:6,paddingRight:6,alignItems:"flex-start",children:[t.jsx(O,{label:n({id:f("asset-details.creationDate"),defaultMessage:"Creation date"}),value:e.createdAt?r(new Date(e.createdAt),{dateStyle:"long",timeStyle:"short"}):null}),t.jsx(O,{label:n({id:f("asset-details.lastUpdated"),defaultMessage:"Last updated"}),value:e.updatedAt?r(new Date(e.updatedAt),{dateStyle:"long",timeStyle:"short"}):null}),t.jsx(O,{label:n({id:f("asset-details.createdBy"),defaultMessage:"Created by"}),value:e.createdBy?Bt({firstname:e.createdBy.firstname??void 0,lastname:e.createdBy.lastname??void 0,username:e.createdBy.username??void 0,email:e.createdBy.email??void 0})??"-":null}),t.jsx(O,{label:n({id:f("asset-details.size"),defaultMessage:"Size"}),value:e.size?ge(e.size,1):null}),o&&(e.width!=null||e.height!=null)&&t.jsx(O,{label:n({id:f("asset-details.dimensions"),defaultMessage:"Dimensions"}),value:e.width!=null&&e.height!=null?`${e.width} × ${e.height}`:null}),t.jsx(O,{label:n({id:f("asset-details.extension"),defaultMessage:"Extension"}),value:$e(e.ext)}),t.jsx(O,{label:n({id:f("asset-details.assetId"),defaultMessage:"Asset ID"}),value:String(e.id)})]}),t.jsx(pe,{name:"fileName",label:n({id:f("asset-details.fileName"),defaultMessage:"File name"}),value:e.name,required:!0}),o&&t.jsxs(t.Fragment,{children:[t.jsx(pe,{name:"caption",label:n({id:f("asset-details.caption"),defaultMessage:"Caption"}),value:e.caption}),t.jsx(pe,{name:"alternativeText",label:n({id:f("asset-details.alternativeText"),defaultMessage:"Alternative text"}),value:e.alternativeText})]})]})},Vn=({asset:e,closeDetails:n})=>{const r=e?K(e.mime,e.ext):jt;return t.jsxs(x,{gap:2,paddingLeft:5,paddingTop:3,paddingBottom:3,paddingRight:3,children:[t.jsx(r,{width:20,height:20}),t.jsx(U.Title,{asChild:!0,children:t.jsx(y,{variant:"omega",fontWeight:"semiBold",overflow:"hidden",ellipsis:!0,tag:"h2",children:e.name})}),t.jsx(F,{marginLeft:"auto",children:t.jsx(U.CloseButton,{onClose:n,children:t.jsx(vt,{})})})]})},Bn=({assetId:e,closeDetails:n})=>{const{formatMessage:r}=D(),{data:o,isLoading:s,error:a}=En(e,{refetchOnMountOrArgChange:!1,refetchOnReconnect:!1,refetchOnFocus:!1});return s?t.jsx(x,{justifyContent:"center",padding:8,children:t.jsx(te,{children:r({id:"app.loading",defaultMessage:"Loading..."})})}):a||!o?t.jsx(x,{direction:"column",alignItems:"stretch",gap:4,padding:4,children:t.jsx(xt,{variant:"danger",closeLabel:r({id:"global.close",defaultMessage:"Close"}),onClose:n,children:r({id:f("asset-details.error"),defaultMessage:"Failed to load file details."})})}):t.jsxs(t.Fragment,{children:[t.jsx(Vn,{asset:o,closeDetails:n}),t.jsxs(U.ScrollableContent,{children:[t.jsx(_n,{asset:o}),t.jsx(Un,{asset:o})]})]})},zn=()=>{const{formatMessage:e}=D(),{assetId:n,isVisible:r,shouldRenderDrawer:o,closeDetails:s}=nt();return!o||n===null?null:t.jsxs(U.Root,{isVisible:r,onClose:s,children:[t.jsx("div",{children:t.jsxs(ve,{children:[t.jsx(U.Title,{children:e({id:f("asset-details.title"),defaultMessage:"File details"})}),t.jsx(U.Description,{children:e({id:f("asset-details.description"),defaultMessage:"Displays file information and metadata"})})]})}),t.jsx(U.Body,{animationDirection:"left",width:"41.6rem",height:"100vh",children:t.jsx(Bn,{assetId:n,closeDetails:s})})]})},Ie=()=>{const[{query:e},n]=Le();return{currentFolderId:e?.folder?Number(e.folder):null,navigateToFolder:s=>{n({folder:String(s.id)})}}},Hn=m(Ct)`
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.primary600};
    outline-offset: 2px;
  }
`,Wn=m(F)`
  grid-column: 1 / -1;
`,qn=m(x)`
  width: 100%;
  padding: ${({theme:e})=>`${e.spaces[2]} ${e.spaces[3]}`}; // 8px 12px
  align-items: center;
  gap: ${({theme:e})=>e.spaces[2]}; // 8px
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: ${({theme:e})=>e.borderRadius};
  background: ${({theme:e})=>e.colors.neutral0};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.primary600};
    outline-offset: 2px;
  }
`,Kn=m(x)`
  flex-shrink: 0;
  color: ${({theme:e})=>e.colors.neutral600};
`,Zn=m(y)`
  flex: 1;
  min-width: 0;
`,Qn=({folder:e})=>{const{formatMessage:n}=D(),{navigateToFolder:r}=Ie(),o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),r(e))};return t.jsxs(qn,{onClick:()=>r(e),onKeyDown:o,role:"listitem",tabIndex:0,children:[t.jsx(Kn,{children:t.jsx(oe,{width:20,height:20})}),t.jsx(Zn,{textColor:"neutral800",ellipsis:!0,children:e.name}),t.jsx(se,{label:n({id:f("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",onClick:s=>s.stopPropagation(),children:t.jsx(ae,{})})]})},De=m(F)`
  position: relative;
  width: 100%;
  padding-bottom: 62.5%;
  height: 0;
  overflow: hidden;
  background: repeating-conic-gradient(
      ${({theme:e})=>e.colors.neutral100} 0% 25%,
      transparent 0% 50%
    )
    50% / 20px 20px;
`,Yn=m.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`,Xn=m(x)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${({theme:e})=>e.colors.neutral500};
  background: ${({theme:e})=>e.colors.neutral100};
`,Jn=({asset:e})=>{const{alternativeText:n,ext:r,formats:o,mime:s,url:a}=e;if(s?.includes(N.Image)){const l=ee(o?.thumbnail?.url)??ee(a);if(l)return t.jsx(De,{children:t.jsx(Yn,{src:l,alt:n||""})})}const i=K(s,r);return t.jsx(De,{children:t.jsx(Xn,{justifyContent:"center",alignItems:"center",children:t.jsx(i,{width:48,height:48})})})},er=m(It)`
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral200};
`,tr=m(x)`
  min-width: 0;
  width: 100%;
`,nr=m(x)`
  color: ${({theme:e})=>e.colors.neutral600};
  flex-shrink: 0;
`,rr=m(y)`
  flex: 1;
  min-width: 0;
`,or=({asset:e,onAssetItemClick:n})=>{const{formatMessage:r}=D(),o=K(e.mime,e.ext),s=a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),n(e.id))};return t.jsxs(Hn,{tabIndex:0,role:"listitem",onClick:()=>n(e.id),onKeyDown:s,children:[t.jsx(er,{children:t.jsx(Jn,{asset:e})}),t.jsx(yt,{children:t.jsxs(tr,{alignItems:"center",gap:2,children:[t.jsx(nr,{children:t.jsx(o,{width:20,height:20})}),t.jsx(rr,{textColor:"primary800",ellipsis:!0,children:e.name}),t.jsx(se,{label:r({id:f("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",children:t.jsx(ae,{})})]})})]})},sr=({assets:e,folders:n=[],onAssetItemClick:r})=>{const{formatMessage:o}=D();return n.length+e.length===0?t.jsx(F,{padding:8,children:t.jsx(y,{textColor:"neutral600",children:o({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})}):t.jsxs(Q.Root,{gap:4,role:"list",children:[n.length>0&&t.jsx(Wn,{children:t.jsx(Q.Root,{gap:4,children:n.map(a=>t.jsx(Q.Item,{col:3,m:4,s:6,xs:12,children:t.jsx(Qn,{folder:a})},`folder-${a.id}`))})}),e.map(a=>t.jsx(Q.Item,{col:3,m:4,s:6,xs:12,direction:"column",alignItems:"stretch",children:t.jsx(or,{asset:a,onAssetItemClick:r})},a.id))]})},ar={view:"STRAPI_UPLOAD_LIBRARY_VIEW"},H={GRID:0,TABLE:1},Te=[{name:"name",label:{id:f("list.table.header.name"),defaultMessage:"name"}},{name:"createdAt",label:{id:f("list.table.header.creationDate"),defaultMessage:"creation date"}},{name:"updatedAt",label:{id:f("list.table.header.lastModified"),defaultMessage:"last modified"}},{name:"size",label:{id:f("list.table.header.size"),defaultMessage:"size"}},{name:"actions",label:{id:f("list.table.header.actions"),defaultMessage:"actions"},isVisuallyHidden:!0}],ir=m(St)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid ${({theme:e})=>e.colors.neutral150};
  border-radius: 4px;
  overflow: hidden;
`,lr=m(Rt)`
  background: ${({theme:e})=>e.colors.neutral100};

  tr {
    border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
  }
`,Ee=m(Mt)`
  height: 40px;
  padding: 0 ${({theme:e})=>e.spaces[4]};
  text-align: left;
`,$=m(Ne)`
  padding: 0 ${({theme:e})=>e.spaces[4]};
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
`,rt=m(he)`
  height: 48px;
  background: ${({theme:e})=>e.colors.neutral0};
  cursor: pointer;

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.primary600};
    outline-offset: -2px;
  }

  &:last-child {
    ${$} {
      border-bottom: 0;
    }
  }
`,cr=m(Ne)`
  padding: ${({theme:e})=>e.spaces[4]};
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
`,dr=({asset:e})=>{const{ext:n,mime:r}=e,o=K(r,n);return t.jsx(x,{justifyContent:"center",alignItems:"center",borderRadius:"4px",color:"neutral500",width:"3.2rem",height:"3.2rem",shrink:0,children:t.jsx(o,{width:20,height:20})})},ur=({asset:e,onAssetItemClick:n})=>{const r=be(),{formatDate:o,formatMessage:s}=D(),a=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),n(e.id))};return t.jsxs(rt,{tabIndex:0,role:"row",onClick:()=>n(e.id),onKeyDown:a,children:[t.jsx($,{children:t.jsxs(x,{gap:3,alignItems:"center",children:[t.jsx(dr,{asset:e}),t.jsxs(x,{direction:"column",alignItems:"flex-start",children:[t.jsx(y,{textColor:"neutral800",fontWeight:"semiBold",ellipsis:!0,children:e.name}),r&&t.jsx(y,{textColor:"neutral600",variant:"pi",children:e.size?ge(e.size,1):"-"})]})]})}),!r&&t.jsxs(t.Fragment,{children:[t.jsx($,{children:t.jsx(y,{textColor:"neutral600",children:e.createdAt?o(new Date(e.createdAt),{dateStyle:"long"}):"-"})}),t.jsx($,{children:t.jsx(y,{textColor:"neutral600",children:e.updatedAt?o(new Date(e.updatedAt),{dateStyle:"long"}):"-"})}),t.jsx($,{children:t.jsx(y,{textColor:"neutral600",children:e.size?ge(e.size,1):"-"})})]}),t.jsx($,{children:t.jsx(x,{justifyContent:"flex-end",children:t.jsx(se,{label:s({id:f("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",children:t.jsx(ae,{})})})})]})},fr=m(rt)`
  cursor: pointer;

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }
`,pr=({folder:e})=>{const n=be(),{formatDate:r,formatMessage:o}=D(),{navigateToFolder:s}=Ie(),a=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(e))};return t.jsxs(fr,{tabIndex:0,role:"row",onClick:()=>s(e),onKeyDown:a,children:[t.jsx($,{children:t.jsxs(x,{gap:3,alignItems:"center",children:[t.jsx(x,{justifyContent:"center",alignItems:"center",borderRadius:"4px",color:"neutral600",width:"3.2rem",height:"3.2rem",shrink:0,children:t.jsx(oe,{width:20,height:20})}),t.jsx(y,{textColor:"neutral800",fontWeight:"semiBold",ellipsis:!0,children:e.name})]})}),!n&&t.jsxs(t.Fragment,{children:[t.jsx($,{children:t.jsx(y,{textColor:"neutral600",children:e.createdAt?r(new Date(e.createdAt),{dateStyle:"long"}):"-"})}),t.jsx($,{children:t.jsx(y,{textColor:"neutral600",children:e.updatedAt?r(new Date(e.updatedAt),{dateStyle:"long"}):"-"})}),t.jsx($,{children:t.jsx(y,{textColor:"neutral600",children:"-"})})]}),t.jsx($,{children:t.jsx(x,{justifyContent:"flex-end",children:t.jsx(se,{label:o({id:f("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",onClick:i=>i.stopPropagation(),children:t.jsx(ae,{})})})})]})},gr=({assets:e,folders:n=[],onAssetItemClick:r})=>{const o=be(),{formatMessage:s}=D(),a=o?Te.filter(l=>l.name==="name"||l.name==="actions"):Te,i=n.length+e.length;return t.jsxs(ir,{colCount:a.length,rowCount:i+1,children:[t.jsx(lr,{children:t.jsx(he,{children:a.map(l=>{const u=s(l.label);return"isVisuallyHidden"in l&&l.isVisuallyHidden?t.jsx(Ee,{children:t.jsx(ve,{children:s({id:f("table.header.actions"),defaultMessage:"actions"})})},l.name):t.jsx(Ee,{children:t.jsx(y,{textColor:"neutral600",variant:"sigma",children:u})},l.name)})})}),t.jsx(wt,{children:i===0?t.jsx(he,{children:t.jsx(cr,{colSpan:a.length,children:t.jsx(y,{textColor:"neutral600",children:s({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})})}):t.jsxs(t.Fragment,{children:[n.map(l=>t.jsx(pr,{folder:l},`folder-${l.id}`)),e.map(l=>t.jsx(ur,{asset:l,onAssetItemClick:r},l.id))]})})]})},hr=m(A.Content)`
  max-width: 51.6rem;
`,mr=({open:e,folderName:n,parentFolderId:r,onClose:o})=>{const{formatMessage:s}=D(),{toggleNotification:a}=Dt(),[i,l]=c.useState(""),[u,g]=c.useState(),[d,{isLoading:p}]=Rn();c.useEffect(()=>{e&&(l(""),g(void 0))},[e]);const j=async v=>{v.preventDefault();const C=i.trim();if(!C){g(s({id:f("folder.create.form.error.name-required"),defaultMessage:"Name is required"}));return}try{await d({name:C,parent:r}).unwrap(),a({type:"success",message:s({id:f("folder.create.success"),defaultMessage:"Folder has been created"})}),o()}catch(b){const h=b;h?.message?g(h.message):a({type:"danger",message:s({id:f("folder.create.form.error.unknown"),defaultMessage:"An error occurred while creating the folder"})})}};return t.jsx(A.Root,{open:e,onOpenChange:o,children:t.jsxs(hr,{children:[t.jsx(A.Header,{children:t.jsx(A.Title,{children:s({id:f("folder.create.title-in"),defaultMessage:"New folder in {folderName}"},{folderName:n})})}),t.jsxs("form",{onSubmit:j,children:[t.jsx(A.Body,{children:t.jsxs(L.Root,{error:u,name:"name",required:!0,children:[t.jsx(L.Label,{children:s({id:f("folder.form.name.label"),defaultMessage:"Folder name"})}),t.jsx(ke,{value:i,onChange:v=>{l(v.target.value),g(void 0)},autoFocus:!0}),t.jsx(L.Error,{})]})}),t.jsx(A.Footer,{children:t.jsxs(x,{gap:2,justifyContent:"space-between",width:"100%",children:[t.jsx(ne,{variant:"tertiary",onClick:o,type:"button",children:s({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),t.jsx(ne,{type:"submit",loading:p,children:s({id:f("folder.create.submit"),defaultMessage:"Create folder"})})]})})]})]})})},ot=c.createContext(null),xr=m(F)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`,jr=({children:e,onDrop:n})=>{const[r,o]=c.useState(!1),s=c.useRef(0),a={isDragging:r};c.useEffect(()=>{const d=()=>{o(!1),s.current=0},p=j=>{j.relatedTarget||(o(!1),s.current=0)};return document.addEventListener("dragend",d),document.addEventListener("dragleave",p),()=>{document.removeEventListener("dragend",d),document.removeEventListener("dragleave",p)}},[]);const i=c.useCallback(d=>{d.preventDefault(),d.stopPropagation(),s.current+=1,d.dataTransfer.types.includes("Files")&&o(!0)},[]),l=c.useCallback(d=>{d.preventDefault(),d.stopPropagation(),s.current-=1,s.current<=0&&(o(!1),s.current=0)},[]),u=c.useCallback(d=>{d.preventDefault(),d.stopPropagation(),d.dataTransfer.dropEffect="copy"},[]),g=c.useCallback(d=>{d.preventDefault(),d.stopPropagation(),o(!1),s.current=0;const{files:p}=d.dataTransfer;p?.length&&n&&n(Array.from(p))},[n]);return t.jsx(ot.Provider,{value:a,children:t.jsx(xr,{"data-testid":"assets-dropzone",onDragEnter:i,onDragLeave:l,onDragOver:u,onDrop:g,children:e})})},st=()=>{const e=c.useContext(ot);if(!e)throw new Error("useUploadDropZone must be used within UploadDropZone");return{isDragging:e.isDragging}},vr=(e,n)=>`${e}${Math.floor(n*255).toString(16).padStart(2,"0")}`,br=m(F)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>vr(e.colors.primary200,.3)};
  border: 1px solid ${({theme:e})=>e.colors.primary700};
  border-radius: ${({theme:e})=>e.borderRadius};
  z-index: 1;
  pointer-events: none;
`,yr=({children:e})=>{const{isDragging:n}=st();return t.jsxs(F,{position:"relative",children:[n&&t.jsx(br,{}),e]})},Cr=m(F)`
  position: fixed;
  bottom: ${({theme:e})=>e.spaces[8]};
  left: 50%;
  transform: translateX(calc(-50% + ${({$leftContentWidth:e})=>e/2}px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spaces[2]};
  background: ${({theme:e})=>e.colors.primary600};
  padding: ${({theme:e})=>e.spaces[4]} ${({theme:e})=>e.spaces[6]};
  border-radius: ${({theme:e})=>e.borderRadius};
  z-index: 2;
`,Ir=({uploadDropZoneRef:e,folderName:n})=>{const{formatMessage:r}=D(),{isDragging:o}=st(),[s,a]=c.useState(0);return c.useEffect(()=>{if(!e?.current)return;const i=()=>{const u=e.current?.getBoundingClientRect();u&&a(g=>g!==u.left?u.left:g)};i();const l=new ResizeObserver(i);return l.observe(e.current),()=>l.disconnect()},[e]),o?t.jsxs(Cr,{$leftContentWidth:s,children:[t.jsx(y,{textColor:"neutral0",children:r({id:f("dropzone.upload.message"),defaultMessage:"Drop here to upload to"})}),t.jsxs(x,{gap:2,alignItems:"center",children:[t.jsx(oe,{width:20,height:20,fill:"neutral0"}),t.jsx(y,{textColor:"neutral0",fontWeight:"semiBold",children:n})]})]}):null},wr=({open:e,onClose:n,onUpload:r})=>{const{formatMessage:o}=D(),[s,a]=c.useState(""),[i,l]=c.useState(null),u=()=>{a(""),l(null),n()},g=async d=>{d.preventDefault();const{urls:p,error:j}=Et(s);if(j){l(j);return}l(null),u(),await r(p)};return t.jsx(A.Root,{open:e,onOpenChange:d=>!d&&u(),children:t.jsx(A.Content,{children:t.jsxs("form",{onSubmit:g,children:[t.jsx(A.Header,{children:t.jsx(A.Title,{children:o({id:f("modal.url.title"),defaultMessage:"Import from URL"})})}),t.jsx(A.Body,{children:t.jsxs(L.Root,{error:i||void 0,hint:o({id:f("input.url.description"),defaultMessage:"Separate your URL links by a carriage return."}),children:[t.jsx(L.Label,{children:o({id:f("input.url.label"),defaultMessage:"URL(s)"})}),t.jsx(Tt,{name:"urls",minHeight:"unset",rows:Math.min(s.split(`
`).length,7),maxHeight:"10.5rem",placeholder:o({id:f("input.url.placeholder"),defaultMessage:"Empty"}),value:s,onChange:d=>{a(d.target.value),l(null)}}),t.jsx(L.Hint,{}),t.jsx(L.Error,{})]})}),t.jsxs(A.Footer,{children:[t.jsx(ne,{variant:"tertiary",onClick:u,children:o({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),t.jsx(ne,{type:"submit",children:o({id:f("modal.url.upload"),defaultMessage:"Upload"})})]})]})})})},Sr=e=>{const{formatMessage:n}=D(),{data:r,isLoading:o}=Dn({id:e},{skip:e===null}),{data:s,isLoading:a}=tt({folder:null,pageSize:1},{skip:e!==null}),i=n({id:f("plugin.home"),defaultMessage:"Home"});return e===null?a?{title:i,itemCount:0}:{title:i,itemCount:s?.pagination?.total??0}:o?{title:i,itemCount:0}:{title:r?.name??i,itemCount:r?.files?.count??0}},J=20,Rr=({folder:e=null,sort:n}={})=>{const[r,o]=c.useState(1),s=c.useRef([]),a=c.useRef(!0),{currentData:i,isLoading:l,isFetching:u,error:g}=tt({folder:e,page:r,pageSize:J,sort:n}),d=i?.pagination,p=c.useMemo(()=>{if(!i)return s.current;const b=i.results;if(r===1)s.current=b;else{const h=(r-1)*J;if(s.current.length<h-J)return s.current;s.current.length<r*J&&(s.current=[...s.current,...b])}return s.current},[i,r]);c.useEffect(()=>{if(a.current){a.current=!1;return}o(1),s.current=[]},[e,n]);const j=d?r<d.pageCount:!1,v=u&&r>1,C=c.useCallback(()=>{o(b=>b+1)},[]);return{assets:p,pagination:d,isLoading:l,isFetchingMore:v,hasNextPage:j,fetchNextPage:C,error:g}},Mr={threshold:.1},Dr=({view:e,folderId:n,onAssetItemClick:r})=>{const{formatMessage:o}=D(),{assets:s,isLoading:a,isFetchingMore:i,hasNextPage:l,fetchNextPage:u,error:g}=Rr({folder:n}),{data:d=[],isLoading:p}=Mn({parentId:n}),j=e===H.GRID,v=a||p,C=Ot(c.useCallback(b=>{b&&l&&!i&&u()},[l,i,u]),Mr);return v?t.jsx(x,{justifyContent:"center",padding:8,children:t.jsx(te,{children:o({id:"app.loading",defaultMessage:"Loading..."})})}):g?t.jsx(F,{padding:8,children:t.jsx(y,{textColor:"danger600",children:o({id:f("list.assets.error"),defaultMessage:"An error occurred while fetching assets."})})}):d.length===0&&s.length===0?t.jsx(F,{padding:8,children:t.jsx(y,{textColor:"neutral600",children:o({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})}):t.jsxs(t.Fragment,{children:[j?t.jsx(sr,{folders:d,assets:s,onAssetItemClick:r}):t.jsx(gr,{assets:s,folders:d,onAssetItemClick:r}),t.jsx("div",{ref:C,style:{height:1}}),i&&t.jsx(x,{justifyContent:"center",padding:4,children:t.jsx(te,{children:o({id:f("list.assets.loading-more"),defaultMessage:"Loading more assets..."})})})]})},Tr=m(In)`
  display: flex;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: ${({theme:e})=>e.borderRadius};
  overflow: hidden;
`,Fe=m(wn)`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spaces[2]};
  padding: ${({theme:e})=>`${e.spaces[2]} ${e.spaces[4]}`};
  border: none;
  background: ${({theme:e})=>e.colors.neutral0};
  color: ${({theme:e})=>e.colors.neutral800};
  cursor: pointer;
  font-size: ${({theme:e})=>e.fontSizes[1]};
  font-weight: ${({theme:e})=>e.fontWeights.semiBold};

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }

  &[data-state='on'] {
    background: ${({theme:e})=>e.colors.neutral150};
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`,Er=m(F)`
  [data-strapi-header] {
    background: ${({theme:e})=>e.colors.neutral0};

    h1 {
      font-size: 1.8rem;
    }
  }
`,Fr=()=>{const{formatMessage:e}=D(),{openDetails:n}=nt(),{currentFolderId:r}=Ie(),{title:o,itemCount:s}=Sr(r),a=e({id:f("header.content.item-count"),defaultMessage:"{count, plural, =1 {# item} other {# items}}"},{count:s}),[i,l]=c.useState(!1),[u,g]=Ft(ar.view,H.GRID),d=u===H.GRID,[p,j]=c.useState(!1),v=c.useRef(null),C=c.useRef(null),[b]=At(),[h]=Pt(),S=async(w,P)=>{if(w.length===0)return;const T=new FormData,Z=[];w.forEach(B=>{T.append("files",B),Z.push({name:B.name,caption:null,alternativeText:null,folder:P})}),T.append("fileInfo",JSON.stringify(Z));try{await b({formData:T,totalFiles:w.length}).unwrap()}catch{}},E=()=>{v.current?.click()},I=async w=>{const P=w.target.files;P&&P.length>0&&await S(Array.from(P),r),w.target.value=""},R=async w=>{await S(w,r)},k=async w=>{try{await h({urls:w,folderId:r}).unwrap()}catch{}};return t.jsxs(t.Fragment,{children:[t.jsx(jr,{onDrop:R,children:t.jsx(F,{ref:C,children:t.jsxs(ce.Root,{minHeight:"100vh",background:"neutral0",children:[t.jsx(ve,{children:t.jsx("input",{type:"file",ref:v,onChange:I,multiple:!0})}),t.jsx(Er,{children:t.jsx(ce.Header,{title:`${o} (${a})`,primaryAction:t.jsxs(kt,{popoverPlacement:"bottom-end",variant:"default",endIcon:t.jsx(Gt,{}),label:e({id:f("new"),defaultMessage:"New"}),children:[t.jsx(de,{onSelect:()=>l(!0),startIcon:t.jsx(oe,{}),children:e({id:f("folder.create.title"),defaultMessage:"New folder"})}),t.jsx(de,{onSelect:E,startIcon:t.jsx(Nt,{}),children:e({id:f("import-files"),defaultMessage:"Import files"})}),t.jsx(de,{onSelect:()=>j(!0),startIcon:t.jsx(_t,{}),children:e({id:f("import-from-url"),defaultMessage:"Import from URL"})})]}),subtitle:t.jsxs(x,{justifyContent:"space-between",alignItems:"center",gap:4,width:"100%",children:[t.jsx(x,{gap:4,alignItems:"center",children:"TODO: Filters and search"}),t.jsxs(x,{gap:4,alignItems:"center",children:[t.jsx(F,{children:"TODO: Sort"}),t.jsxs(Tr,{type:"single",value:d?"grid":"table",onValueChange:w=>w&&g(w==="grid"?H.GRID:H.TABLE),"aria-label":e({id:f("view.switch.label"),defaultMessage:"View options"}),children:[t.jsxs(Fe,{value:"table","aria-label":e({id:f("view.table"),defaultMessage:"Table view"}),children:[t.jsx($t,{}),e({id:f("view.table"),defaultMessage:"Table view"})]}),t.jsxs(Fe,{value:"grid","aria-label":e({id:f("view.grid"),defaultMessage:"Grid view"}),children:[t.jsx(Lt,{}),e({id:f("view.grid"),defaultMessage:"Grid view"})]})]})]})]})})}),t.jsx(ce.Content,{children:t.jsxs(yr,{children:[t.jsx(Ir,{uploadDropZoneRef:C,folderName:o}),t.jsx(Dr,{view:u,folderId:r,onAssetItemClick:n})]})})]})})}),t.jsx(mr,{open:i,folderName:o,parentFolderId:r,onClose:()=>l(!1)}),t.jsx(wr,{open:p,onClose:()=>j(!1),onUpload:k}),t.jsx(zn,{})]})},Lr=()=>{const{formatMessage:e}=D(),n=e({id:f("plugin.name"),defaultMessage:"Media Library"});return t.jsxs(Se.Main,{children:[t.jsx(Se.Title,{children:n}),t.jsx(Ut,{children:t.jsx(Vt,{index:!0,element:t.jsx(Fr,{})})})]})};export{Lr as UnstableMediaLibrary};

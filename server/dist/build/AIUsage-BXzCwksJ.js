import{a as p,bY as j,j as e,I as a,T as i,k as u,U as b,bZ as v}from"./strapi--X8wYuEq.js";const d=u(v)`
  width: 100%;
  background-color: ${({theme:s})=>s.colors.neutral200};
  > div {
    background-color: ${({theme:s})=>s.colors.neutral700};
  }
`,f=u(b.Item)`
  ${({theme:s})=>s.breakpoints.large} {
    grid-column: 7 / 13;
  }
`,C=()=>{const{formatMessage:s}=p(),{data:r,isLoading:g,error:m}=j(void 0,{refetchOnMountOrArgChange:!0});if(g||m||!r||!r.subscription?.cmsAiEnabled)return null;const t=r.subscription.cmsAiCreditsBase,n=r.cmsAiCreditsUsed,o=r.subscription.cmsAiCreditsMaxUsage,c=n-t,x=n/t*100,h=n/o*100,l=c>0&&o!==t;return e.jsxs(f,{col:6,s:12,direction:"column",alignItems:"start",gap:2,children:[e.jsx(a,{variant:"sigma",textColor:"neutral600",children:s({id:"Settings.application.ai-usage",defaultMessage:"AI Usage"})}),e.jsxs(i,{gap:2,direction:"column",alignItems:"flex-start",children:[!l&&e.jsxs(e.Fragment,{children:[e.jsx(i,{width:"100%",children:e.jsx(d,{value:x,size:"M"})}),e.jsx(a,{variant:"omega",children:`${n.toFixed(2)} credits used from ${t} credits available in your plan`})]}),l&&e.jsxs(e.Fragment,{children:[e.jsx(i,{width:"100%",children:e.jsx(d,{value:h,size:"M",color:"danger"})}),e.jsx(a,{variant:"omega",textColor:"danger600",children:`${c.toFixed(2)} credits used above the ${t} credits available in your plan`})]})]})]})};export{C as AIUsage};

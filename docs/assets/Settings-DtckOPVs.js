import{_ as f,r as u,c as k,a as b,w as B,u as I,b as t,d as c,v as r,o as S,R as L,p as h,e as y}from"./index-BuRsDP99.js";const s=l=>(h("data-v-673126b6"),l=l(),y(),l),U={class:"main"},V=s(()=>t("span",{class:"material-symbols-outlined"}," home ",-1)),w={class:"contents"},R=s(()=>t("h1",null,"LocalStorage",-1)),T={class:"typeBox"},F=s(()=>t("label",{class:"dialogLabel"},"urlBox",-1)),N=s(()=>t("label",{class:"dialogLabel"},"readingLists",-1)),C=s(()=>t("label",{class:"dialogLabel"},"bookmarks",-1)),D={__name:"Settings",setup(l){const n=u(""),i=u(""),d=u("");function p(){const e=localStorage.getItem("urlBox");e&&(n.value=e)}function g(){const e=localStorage.getItem("readingLists");e&&(i.value=e)}function m(){const e=localStorage.getItem("bookmarks");e&&(d.value=e)}function _(){localStorage.setItem("urlBox",n.value)}function v(){localStorage.setItem("readingLists",i.value)}function x(){localStorage.setItem("bookmarks",d.value)}return p(),g(),m(),(e,o)=>(S(),k("div",U,[b(I(L),{to:"/",class:"homeButton"},{default:B(()=>[V]),_:1}),t("div",w,[R,t("div",T,[F,c(t("input",{type:"text",class:"dialogTextField","onUpdate:modelValue":o[0]||(o[0]=a=>n.value=a),onInput:_},null,544),[[r,n.value]]),N,c(t("input",{type:"text",class:"dialogTextField","onUpdate:modelValue":o[1]||(o[1]=a=>i.value=a),onInput:v},null,544),[[r,i.value]]),C,c(t("input",{type:"text",class:"dialogTextField","onUpdate:modelValue":o[2]||(o[2]=a=>d.value=a),onInput:x},null,544),[[r,d.value]])])])]))}},M=f(D,[["__scopeId","data-v-673126b6"]]);export{M as default};

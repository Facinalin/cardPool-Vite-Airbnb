import{d as p,a as i}from"./index-14e50f67.js";import{S as a}from"./sweetalert2.all-742031dd.js";const{VITE_APP_URL2:c,VITE_APP_PATH:n}={VITE_APP_URL:"https://card-pool-json-vercel.vercel.app",VITE_APP_URL2:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"lk1025cina",BASE_URL:"/cardPool-Vite-Airbnb/",MODE:"production",DEV:!1,PROD:!0},g=p("productsStore",{state:()=>({products:[],cardGroupProduct:[],isLoading:!0,leftMemberQty:0,AdminCardGroupProduct:[],danceGroups:[],pagination:{},category:"",loadingStatus:{loadingItem:""}}),actions:{getProduct(){const e=`${c}/api/${n}/products/all`;i.get(e).then(t=>{const o=t.data.products;o.splice(0,10);const r=o.filter(s=>s.category==="一般");this.products=r,this.isLoading=!1}).catch(t=>{this.isLoading=!1,a.fire({position:"center",icon:"error",title:`${t.message}`,showConfirmButton:!1,timer:1800})})},getCardProducts(){const e=`${c}/api/${n}/products/all`;i.get(e).then(t=>{const o=t.data.products;o.splice(0,10);const r=o.filter(s=>s.category==="出卡");this.products=r,this.isLoading=!1}).catch(t=>{this.isLoading=!1,a.fire({position:"center",icon:"error",title:`${t.message}`,showConfirmButton:!1,timer:1800})})},getCardGroupProduct(){const e=`${c}/api/${n}/products/all`;i.get(e).then(t=>{const o=t.data.products;o.splice(0,10);const r=o.filter(s=>s.category==="拆卡"&&s.created_At);this.cardGroupProduct=r,this.isLoading=!1}).catch(t=>{this.isLoading=!1,a.fire({position:"center",icon:"error",title:`${t.message}`,showConfirmButton:!1,timer:1800})})},getDanceGroupProduct(e,t=1){if(e==="/danceclub"){this.category="跳舞";const o=`${c}/api/${n}/products?page=${t}&category=${this.category}`;i.get(o).then(r=>{this.isLoading=!1;const{products:s,pagination:d}=r.data;this.pagination=d,this.danceGroups=s}).catch(r=>{this.isLoading=!1,a.fire({position:"center",icon:"error",title:`${r.message}`,showConfirmButton:!1,timer:1800})})}}}});export{g as p};
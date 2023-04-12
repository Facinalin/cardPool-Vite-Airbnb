import{_ as D,a as p,m as A,b as k,c as v,e,t as l,h as m,z as C,D as y,L as V,N as U,f as n,w as T,K as P,r as x,o as g,C as b,M as S}from"./index-14e50f67.js";import{S as I}from"./sweetalert2.all-742031dd.js";import{c as w}from"./cartsStore-1cbb6115.js";const{VITE_APP_URL2:f,VITE_APP_PATH:_}={VITE_APP_URL:"https://card-pool-json-vercel.vercel.app",VITE_APP_URL2:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"lk1025cina",BASE_URL:"/cardPool-Vite-Airbnb/",MODE:"production",DEV:!1,PROD:!0},B={data(){return{signedBefore:!1,loadingStatus:{loadingItem:""},product:{},productCategory:"跳舞",signUpForm:!1,perOrder:{data:{user:{name:"",email:"test@test.com",tel:"",address:"",socialAccount:"",nickName:""},message:""}},danceCurId:"",danceTemp:[]}},methods:{phoneVali(o){return/^(09)\d{8}$/.test(o)?!0:"請填入正確的電話號碼！"},isRequired(o){return o?!0:"此欄位為必填！"},confirmSignUpDance(o){JSON.stringify(o,null,2)||alert("無法提交");const t=`${f}/api/${_}/order`;p.post(t,this.perOrder).then(a=>{console.log(a.data),console.log(a.data.orderId),I.fire({position:"center",icon:"success",title:`團號${this.product.id}成功報名，請等待主揪訊息通知下一步驟。`,showConfirmButton:!1,timer:1800}),this.deleteAllCartToOrder(),this.perOrder={data:{user:{name:"",email:"test@test.com",tel:"",address:"",socialAccount:"",nickName:""},message:""}},this.signUpForm=!1,this.signedBefore=!0}).catch(a=>{console.log(a),I.fire({position:"center",icon:"error",title:`${a.message}`,showConfirmButton:!1,timer:1800})})},getPerProduct(){const{id:o}=this.$route.params,t=`${f}/api/${_}/product/${o}`;p.get(t).then(a=>{this.product=a.data.product}).catch(a=>{console.log(a)})},toFillInInfo(){this.signUpForm=!0;const o=document.getElementById("danceInfoAccordion");window.scrollTo(0,o.offsetTop),document.getElementById("flush-collapseOne").classList.add("show")},signUpDance(){this.loadingStatus.loadingItem=this.product.id;let o={};o={product_id:this.product.id,qty:1,category:"跳舞"},console.log(o);const t=`${f}/api/${_}/cart`;p.post(t,{data:o}).then(a=>{console.log(a.data),this.loadingStatus.loadingItem="",this.checkDanceCart()}).catch(a=>{console.log(a),this.loadingStatus.loadingItem="",I.fire({position:"center",icon:"error",title:"無法報名！",showConfirmButton:!1,timer:1800})})},checkDanceCart(){const o=`${f}/api/${_}/cart`;p.get(o).then(t=>{this.danceTemp=t.data.data.carts.filter(h=>h.category==="跳舞");const a=this.danceTemp.find(h=>h.product_id===this.product.id);this.danceCurId=a.id}).catch(t=>{console.log(t)})},getDanceTemp(){const o=`${f}/api/${_}/cart`;p.get(o).then(t=>{console.log(t.data.data.carts.filter(a=>a.category==="跳舞"))}).catch(t=>{console.log(t)})},...A(w,["getCart","deleteAllCartToOrder"])},mounted(){this.getPerProduct(),this.getDanceTemp(),console.log(this.signedBefore)},computed:{...k(w,["carts","curCartId"])}},N={class:"container container-sm container-md container-lg my-5"},E={class:"row"},F={class:"product-img col-sm-12 col-md-12 col-lg-5 col-xl-5 mb-80 mt-9"},R={class:"d-flex justify-content-center mb-6"},L=["src","alt"],j={class:"perDance-cta col-sm-12 col-md-12 col-lg-7 col-xl-7 ps-lg-9 ch-font mt-9 d-flex flex-column justfy-content-between"},q={class:"txt-area"},M={class:"mb-3 fs-1"},Y={class:"text-primary fs-3 mb-6"},J={class:"text-maingray fs-6 mb-4"},z=e("span",{class:"dance-list"},"主揪",-1),G={class:"text-maingray fs-6 mb-4"},H=e("span",{class:"dance-list"},"表演",-1),K={class:"text-maingray fs-6 mb-6"},Q=e("span",{class:"dance-list"},"首次練習時間",-1),W=e("li",null,[e("p")],-1),X={class:"btn-area btns d-flex justify-content-start"},Z={key:1,type:"button",class:"product-btn btn text-white btn-mainorange border-0 bd-rd-12 py-1 px-3 me-3 confirmJoinBtn d-flex disabled"},$=e("button",{type:"button",class:"product-btn btn btn-white border-primary bd-rd-12 py-1 px-3"},"有興趣",-1),ee={class:"col-lg-12 mb-9"},te={class:"accordion accordion-flush",id:"danceInfoAccordion"},se={class:"accordion-item"},oe={class:"accordion-header",id:"flush-headingOne"},ae={class:"accordion-button collapsed py-3 px-3 fs-5 text-mainorange",type:"button","data-bs-toggle":"collapse","data-bs-target":"#flush-collapseOne","aria-expanded":"false","aria-controls":"flush-collapseOne"},le=e("span",{class:"text-maingray fs-6"},"確定報名後將等待主揪審核。",-1),ce={id:"flush-collapseOne",class:"accordion-collapse collapse","aria-labelledby":"flush-headingOne","data-bs-parent":"#danceInfoAccordion"},ne={class:"accordion-body d-flex justify-content-center"},ie={class:"mb-3"},re=e("label",{for:"socialAccount",class:"form-label me-2 mb-3"},"社群媒體聯絡帳號",-1),de={name:"socialAccount",class:"invalid-feedback"},me={class:"mb-3"},ue=e("label",{for:"name",class:"form-label me-2 mb-3"},"真實姓名",-1),pe={name:"name",class:"invalid-feedback"},fe={class:"mb-3"},_e=e("label",{for:"nickName",class:"form-label me-2 mb-3"},"暱稱",-1),he={class:"mb-3"},ge=e("label",{for:"tel",class:"form-label me-2 mb-3"},"手機（現場聯絡用）",-1),be={name:"tel",class:"invalid-feedback"},ve={class:"mb-3"},ye=e("label",{for:"address",class:"form-label me-2 mb-3"},"收件人地址",-1),xe={name:"address",class:"invalid-feedback"},Ie={class:"mb-3"},Ve=e("label",{for:"message",class:"form-label mb-3"},"給主揪的訊息",-1),we={class:"text-end"},Oe={class:"col-12 ch-font"},De={class:"product-details"},Ae={class:"details-dance bd-top-opa col-12 d-flex flex-wrap mt-5 text-maingray"},ke={class:"seller col-12 py-3 px-3 d-flex align-items-center justify-content-between"},Ce=P('<div class="seller-left d-flex align-items-center"><img class="seller-pic" src="https://i.imgur.com/YxLmY3t.png" alt="sellerpic"><h5 class="ms-2">Tracy</h5><p class="ms-6">主揪成團 <span class="text-primary">4</span> 筆</p></div>',1),Ue={class:"seller-right"},Te={type:"button",class:"seller-btn btn btn-white border-secondary bd-rd-12 py-1 px-2 me-2"},Pe=e("ul",{class:"pic-area"},null,-1),Se={class:"col-12 mt-9"},Be={class:"ch-font"};function Ne(o,t,a,h,s,r){const d=x("font-awesome-icon"),u=x("v-field"),O=x("v-form");return g(),v("div",N,[e("div",E,[e("div",F,[e("div",R,[e("img",{src:s.product.imageUrl,alt:s.product.title,class:"dance-cardImg bd-rd-12"},null,8,L)])]),e("div",j,[e("div",q,[e("h1",M,l(s.product.title),1),e("h2",Y,l(s.product.county),1),e("ul",null,[e("li",J,[z,m(l(s.product.leader),1)]),e("li",G,[H,m(l(new Date(s.product.d_day*1e3).getFullYear())+"年"+l(new Date(s.product.d_day*1e3).getMonth()+1)+"月"+l(new Date(s.product.d_day*1e3).getDate())+"日",1)]),e("li",K,[Q,m(l(new Date(s.product.first_practice*1e3).getFullYear())+"年"+l(new Date(s.product.first_practice*1e3).getMonth()+1)+"月"+l(new Date(s.product.first_practice*1e3).getDate())+"日",1)]),W])]),e("div",X,[s.signedBefore===!1?(g(),v("button",{key:0,type:"button",class:"product-btn btn text-white btn-mainorange border-0 bd-rd-12 py-1 px-3 me-3 confirmJoinBtn d-flex",onClick:t[0]||(t[0]=(...i)=>r.toFillInInfo&&r.toFillInInfo(...i))},[m("確定參加"),s.loadingStatus.loadingItem===s.product.id?(g(),C(d,{key:0,icon:"fa-solid fa-spinner",class:"ms-1"})):y("",!0)])):y("",!0),s.signedBefore===!0?(g(),v("button",Z,"已報名")):y("",!0),$])]),V(e("div",ee,[e("div",te,[e("div",se,[e("h2",oe,[e("button",ae,[n(d,{icon:"fa-solid fa-user",class:"me-3 text-mainorange fs-5"}),m(" 請填寫報名資訊！！"),le])]),e("div",ce,[e("div",ne,[n(O,{ref:"form",class:"vform dance-vform",onSubmit:r.confirmSignUpDance},{default:T(({errors:i})=>[e("div",ie,[re,n(d,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon fs-7"}),n(u,{id:"socialAccount",name:"socialAccount",type:"text",class:b(["form-control custom-vf",{"is-invalid":i.socialAccount}]),placeholder:"範例：ig/stay_0325",rules:r.isRequired,modelValue:s.perOrder.data.user.socialAccount,"onUpdate:modelValue":t[1]||(t[1]=c=>s.perOrder.data.user.socialAccount=c)},null,8,["rules","class","modelValue"]),e("p",de,l(i.socialAccount),1)]),e("div",me,[ue,n(d,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon fs-7"}),n(u,{id:"name",name:"name",type:"text",class:b(["form-control custom-vf",{"is-invalid":i.name}]),placeholder:"範例：朴珍永",rules:r.isRequired,modelValue:s.perOrder.data.user.name,"onUpdate:modelValue":t[2]||(t[2]=c=>s.perOrder.data.user.name=c)},null,8,["class","rules","modelValue"]),e("p",pe,l(i.name),1)]),e("div",fe,[_e,n(u,{id:"nickName",name:"nickName",type:"text",class:"form-control custom-vf",placeholder:"習慣叫暱稱的可以填喔",modelValue:s.perOrder.data.user.nickName,"onUpdate:modelValue":t[3]||(t[3]=c=>s.perOrder.data.user.nickName=c)},null,8,["modelValue"])]),e("div",he,[ge,n(d,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon fs-7"}),n(u,{id:"tel",name:"tel",type:"tel",class:b(["form-control custom-vf",{"is-invalid":i.tel}]),placeholder:"範例：0912345678",modelValue:s.perOrder.data.user.tel,"onUpdate:modelValue":t[4]||(t[4]=c=>s.perOrder.data.user.tel=c),rules:r.phoneVali},null,8,["modelValue","class","rules"]),e("p",be,l(i.tel),1)]),e("div",ve,[ye,n(d,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon fs-7"}),n(u,{id:"address",name:"address",type:"text",class:b(["form-control custom-vf",{"is-invalid":i.address}]),placeholder:"請輸入地址",rules:r.isRequired,modelValue:s.perOrder.data.user.address,"onUpdate:modelValue":t[5]||(t[5]=c=>s.perOrder.data.user.address=c)},null,8,["rules","class","modelValue"]),e("p",xe,l(i.address),1)]),e("div",Ie,[Ve,V(e("textarea",{id:"message",class:"form-control custom-vf",cols:"30",rows:"3","onUpdate:modelValue":t[6]||(t[6]=c=>s.perOrder.data.message=c)},null,512),[[S,s.perOrder.data.message]])]),e("div",we,[e("button",{type:"submit",class:"btn btn-primary text-white bd-rd-12 ch-font",onClick:t[7]||(t[7]=(...c)=>r.signUpDance&&r.signUpDance(...c))},"確定報名資訊")])]),_:1},8,["onSubmit"])])])])])],512),[[U,s.signUpForm]]),e("div",Oe,[e("div",De,[e("div",Ae,[e("div",ke,[Ce,e("div",Ue,[e("button",Te,[n(d,{icon:"fa-solid fa-comment",class:"me-3 text-secondary fs-5"}),m(" 訊息")])])]),Pe])])]),e("div",Se,[e("p",Be,l(s.product.description),1)])])])}const Le=D(B,[["render",Ne]]);export{Le as default};
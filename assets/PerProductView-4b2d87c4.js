import{_ as y,a as f,m as x,b as v,c as l,e as t,D as d,t as i,h as p,z as P,f as _,K as C,o as a,r as w}from"./index-14e50f67.js";import{S as g}from"./sweetalert2.all-742031dd.js";import{c as b}from"./cartsStore-1cbb6115.js";const{VITE_APP_URL2:m,VITE_APP_PATH:h}={VITE_APP_URL:"https://card-pool-json-vercel.vercel.app",VITE_APP_URL2:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"lk1025cina",BASE_URL:"/cardPool-Vite-Airbnb/",MODE:"production",DEV:!1,PROD:!0},T={data(){return{loadingStatus:{loadingItem:""},product:{},domestic:{amount:0,courier:"",courier_Note:""},international:{amount:0,complement:""},productCategory:"一般"}},methods:{getPerProduct(){const{id:n}=this.$route.params,c=`${m}/api/${h}/product/${n}`;f.get(c).then(e=>{this.product=e.data.product,this.domestic.amount=e.data.product.domestic_Transport.amount,this.domestic.courier=e.data.product.domestic_Transport.courier,this.domestic.courier_Note=e.data.product.domestic_Transport.courier_Note,this.international.amount=e.data.product.international_Transport.amount,this.international.complement=e.data.product.international_Transport.complement,this.product.category==="出卡"&&(this.productCategory="出卡")}).catch(e=>{console.log(e)})},addToCart(n,c=1){this.loadingStatus.loadingItem=n;let e="post",u=`${m}/api/${h}/cart`,o={};const r=this.carts.find(s=>s.productId===n);r?(e="put",u=`${m}/api/${h}/cart/${r.id}`,o={...r,qty:r.qty+c}):o={product_id:n,qty:c,category:"一般"},this.productCategory==="出卡"&&(o.category="出卡"),f[e](u,{data:o}).then(s=>{console.log(s.data),this.loadingStatus.loadingItem="",g.fire({position:"center",icon:"success",title:"成功加入購物車!",showConfirmButton:!1,timer:1800}),this.getCart()}).catch(s=>{this.loadingStatus.loadingItem="",g.fire({position:"center",icon:"error",title:`${s.message}`,showConfirmButton:!1,timer:1800})})},...x(b,["getCart"])},mounted(){this.getPerProduct(),this.getCart()},computed:{...v(b,["carts"])}},V={class:"container my-5"},k={class:"row"},S={key:0,class:"product-img col-md-12 col-lg-5 mb-80 mt-9"},E={class:"d-flex justify-content-center mb-6"},I=["src","alt"],A={key:1,class:"product-img col-md-12 col-lg-5 mb-80 mt-9"},N={class:"d-flex justify-content-center mb-6"},B=["src","alt"],j={class:"col-md-12 col-lg-7 ps-lg-9 ch-font mt-9 d-flex flex-column justfy-content-between general-product-des"},O={class:"ge-txt-area mb-9"},R={class:"mb-3 fs-1"},U={class:"text-primary fs-3"},D={class:"ge-btn-area btns d-flex justify-content-start"},L=t("button",{type:"button",class:"product-btn btn btn-white border-primary bd-rd-12 py-1 px-3"},"收藏",-1),q={class:"col-12"},F={class:"col-12 ch-font"},H={class:"product-details"},Y={class:"details-1 bd-top-opa col-12 d-flex flex-wrap mt-5 text-maingray"},z={class:"seller col-12 py-3 px-3 d-flex align-items-center justify-content-between"},J=C('<div class="seller-left d-flex align-items-center"><img class="seller-pic" src="https://i.imgur.com/YxLmY3t.png" alt="sellerpic"><h5 class="ms-2">Tracy</h5><p class="ms-6">主拆成團 <span class="text-primary">4</span> 筆</p></div>',1),K={class:"seller-right"},M={type:"button",class:"seller-btn btn btn-white border-secondary bd-rd-12 py-1 px-2 me-2"},G=t("a",{href:"#",class:"seller-btn btn btn-white border-secondary bd-rd-12 py-1 px-2"},"查看賣場",-1),W={class:"internationalFee col-12 py-3 px-3 bd-top-opa d-flex justify-content-between"},X={key:0,class:"text-mainorange pe-1"},Z={key:1,class:"text-orange pe-1"},Q={key:2,class:"text-mainorange pe-1"},$={class:"accordion accordion-flush bd-top-opa",id:"accordionFlushExample"},tt={class:"accordion-item"},ot={class:"accordion-header",id:"flush-headingOne"},et={class:"accordion-button collapsed py-3 px-3",type:"button","data-bs-toggle":"collapse","data-bs-target":"#flush-collapseOne","aria-expanded":"false","aria-controls":"flush-collapseOne"},st={id:"flush-collapseOne",class:"accordion-collapse collapse","aria-labelledby":"flush-headingOne","data-bs-parent":"#accordionFlushExample"},ct={class:"accordion-body"},it={class:"domesticCourier"},at={class:"product-description col-12 bd-top-opa py-2 px-3 mb-8"},nt={class:"description"},rt=t("ul",{class:"pic-area"},null,-1);function lt(n,c,e,u,o,r){const s=w("font-awesome-icon");return a(),l("div",V,[t("div",k,[o.productCategory==="一般"?(a(),l("div",S,[t("div",E,[t("img",{src:o.product.imgUrl,class:"cardImg",alt:o.product.title},null,8,I)])])):d("",!0),o.productCategory==="出卡"?(a(),l("div",A,[t("div",N,[t("img",{src:o.product.imgUrl,class:"cardProductCardImg",alt:o.product.title},null,8,B)])])):d("",!0),t("div",j,[t("div",O,[t("h1",R,i(o.product.title),1),t("h2",U,"$"+i(o.product.price)+"元",1)]),t("div",D,[t("button",{type:"button",class:"product-btn btn btn-white border-primary bd-rd-12 py-1 px-3 me-3 confirmJoinBtn d-flex",onClick:c[0]||(c[0]=dt=>r.addToCart(o.product.id))},[p("加入購物車"),o.loadingStatus.loadingItem===o.product.id?(a(),P(s,{key:0,icon:"fa-solid fa-spinner",class:"ms-1"})):d("",!0)]),L])]),t("div",q,[t("div",F,[t("div",H,[t("div",Y,[t("div",z,[J,t("div",K,[t("button",M,[_(s,{icon:"fa-solid fa-comment",class:"me-3 text-secondary fs-5"}),p(" 訊息")]),G])]),t("div",W,[t("p",null,[_(s,{icon:"fa-solid fa-plane",class:"me-3 text-primary fs-5"}),p(" 國際運費 ")]),o.international.complement===!0?(a(),l("p",X,"需二補")):(a(),l("p",Z,"無需二補")),o.international.amount!==0?(a(),l("p",Q,i(o.international.amount)+"元",1)):d("",!0)]),t("div",$,[t("div",tt,[t("h2",ot,[t("button",et,[_(s,{icon:"fa-solid fa-truck",class:"me-3 text-primary fs-5"}),p(" 國內運費 ")])]),t("div",st,[t("div",ct,[t("ul",it,[t("li",null,i(o.domestic.courier)+i(o.domestic.amount)+"元"+i(o.domestic.courier_Note),1)])])])])]),t("div",at,[t("p",nt,i(o.product.description),1)]),rt])])])])])])}const mt=y(T,[["render",lt]]);export{mt as default};

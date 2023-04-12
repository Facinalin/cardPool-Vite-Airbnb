import{_ as T,a as g,O as V,c as d,e,F as B,y as D,D as u,f as a,w as x,r as w,o as c,t as p,C as _,z as y,L as N,P as U,h as C}from"./index-14e50f67.js";import{S as v}from"./sweetalert2.all-742031dd.js";const{VITE_APP_URL2:P,VITE_APP_PATH:k}={VITE_APP_URL:"https://card-pool-json-vercel.vercel.app",VITE_APP_URL2:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"lk1025cina",BASE_URL:"/cardPool-Vite-Airbnb/",MODE:"production",DEV:!1,PROD:!0};let b=null;const F={data(){return{userProductList:[],perProduct:{category:"",origin_price:null,price:null,unit:"個",description:"",content:"",is_enabled:1,imageUrl:"",imagesUrl:[],member:"Bangchan",domestic_Transport:{courier:"711賣貨便",courier_Note:"",amount:null},international_Transport:{complement:!1,amount:null}},isNew:"",ifDomesticFee:!1,ifInternational:!1,mustFillOut:!0,ifMeet:!1,ifComplement:!1,curUId:"",chooseMember:[],modalState:"",leftMember:{1:!1,2:!1,3:!1,4:!1,5:!1,6:!1,7:!1,8:!1},mustChoose:[],scarcity:[],normalArea:[]}},methods:{choosingMember(l,t){console.log(t.target.checked)},openModal(l,t){if(l==="new")this.isNew="new",b.show(),this.perProduct={category:"",origin_price:0,price:0,unit:"個",description:"",content:"",is_enabled:1,imageUrl:"",imagesUrl:[],domestic_Transport:{courier:"請選擇出貨方式",courier_Note:"",amount:0},international_Transport:{complement:!1,amount:0}};else if(l==="edit"){if(this.isNew="edit",b.show(),this.perProduct={...t},console.log(this.perProduct),this.perProduct.domestic_Transport.courier!=="面交"&&(console.log("非面交，金額大於0"),this.ifDomesticFee=!0,this.$refs.hasDomestic.setAttribute("checked","")),this.perProduct.international_Transport.complement===!0){console.log("需二補，金額為0"),this.ifInternational=!0,this.ifComplement=!0;const r=this.$refs.hasInternational,f=this.$refs.needComplement;console.log(f),r.setAttribute("checked","")}if(this.perProduct.international_Transport.complement===!1&&this.perProduct.international_Transport.amount!==0){console.log("不需二補，金額大於0"),this.ifInternational=!0,this.ifComplement=!1,this.$refs.hasInternational.setAttribute("checked","");const f=this.$refs.needComplement;console.log(f)}b.show()}else l==="card"&&(this.isNew="card",b.show(),this.perProduct={category:"",origin_price:0,price:0,unit:"個",description:"",content:"",is_enabled:1,imageUrl:"",imagesUrl:[],domestic_Transport:{courier:"請選擇出貨方式",courier_Note:"",amount:0},international_Transport:{complement:!1,amount:0}})},getProductList(){const l=`${P}/api/${k}/admin/products/all`;g.get(l).then(t=>{const r=Object.values(t.data.products);r.splice(0,10);const f=r.filter(o=>o.category==="一般"||o.category==="出卡");this.userProductList=f}).catch(t=>{v.fire({position:"center",icon:"error",title:`${t.message}`,showConfirmButton:!1,timer:1800})})},updateProduct(l){let t=`${P}/api/${k}/admin/product`,r="post";l==="new"&&(this.perProduct.id=new Date().getTime(),this.perProduct.category="拆卡"),l==="edit"&&(r="put",t=`${P}/api/${k}/admin/product`),l==="card"&&(this.perProduct.id=new Date().getTime(),this.perProduct.category="出卡"),this.ifDomesticFee||(this.perProduct.domestic_Transport.amount=0,this.perProduct.domestic_Transport.courier="面交"),this.ifComplement?(this.perProduct.international_Transport.amount=0,this.perProduct.international_Transport.complement=!0):this.perProduct.international_Transport.complement=!1,g[r](t,{data:this.perProduct}).then(f=>{v.fire({position:"center",icon:"success",title:f.data.message,showConfirmButton:!1,timer:1800}),b.hide(),this.getProductList()}).catch(f=>{v.fire({position:"center",icon:"error",title:`${f.message}`,showConfirmButton:!1,timer:1800})})},hasDomestic(){this.ifDomesticFee=!0},hasNoDomestic(){this.ifDomesticFee=!1},hasNoInternational(){this.ifInternational=!1},hasInternational(){this.ifInternational=!0},needComplement(){this.ifComplement=!0},needNoComplement(){this.ifComplement=!1},onSubmit(l){console.log(JSON.stringify(l,null,2))},isRequired(l){return l?!0:"此欄位為必填！"},isNumber(l){return/^[0-9]+$/.test(l)?!0:"僅能填入0-9的數字！"},deletePerProduct(l){const t=`${P}/api/${k}/admin/product/${l}`;g.delete(t).then(r=>{v.fire({position:"center",icon:"success",title:`${r.data.message}`,showConfirmButton:!1,timer:1800}),this.getProductList()}).catch(r=>{v.fire({position:"center",icon:"error",title:`${r.message}`,showConfirmButton:!1,timer:1800})})},addDance(){const l={category:"跳舞",origin_price:0,price:0,unit:"個",description:"The View清新舞風，一起練最快！各位熱情stay快來報名！",content:"",is_enabled:1,imageUrl:"https://external-preview.redd.it/kG6REF3Rj2-h5B_v9B353eKx_UZveqQTmE4P64D-JFI.jpg?auto=webp&s=db8b9a5f88d6374d71e65b9f3d01e52e42dc7eda",imagesUrl:[],leader:"水手服少女",first_practice:1686187695,d_day:1688952495,county:"台北市",title:"The View",leftMember:2},t=`${P}/api/${k}/admin/product`;g.post(t,{data:l}).then(r=>{console.log(r.data)}).catch(r=>{console.log(r)})}},mounted(){const l=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");g.defaults.headers.common.Authorization=l;const t=document.getElementById("addProductModal");b=new V(t,{keyboard:!1,backdrop:"static"}),this.getProductList()}},M={class:"col-10 d-flex flex-column"},R={class:"text-end mt-4 mb-4"},A={class:"table mt-4 text-center"},L=e("thead",null,[e("tr",{class:"text-primary fs-5 pb-4"},[e("th",{width:"120"}," 分類 "),e("th",{width:"400"},"產品名稱"),e("th",{width:"180"}," 價格（元） "),e("th",{width:"110"}," 成員 "),e("th",{width:"160"}," 編輯 ")])],-1),S={class:"text-center"},E={class:"text-center"},q={class:"btn-group-edit d-flex justify-content-center px-4"},j=["onClick"],H=["onClick"],O={class:"modal fade",tabindex:"-1",id:"addProductModal"},z={class:"modal-dialog modal-xl"},J={class:"modal-content"},G={class:"modal-header bg-maingray"},K={key:0,class:"modal-title text-secondary-trans fs-4 ls-4"},Q={key:1,class:"modal-title text-primary-trans fs-4 ls-4"},Z={key:2,class:"modal-title text-secondary-trans fs-4 ls-4"},W={type:"button",class:"btn-close text-white","data-bs-dismiss":"modal","aria-label":"Close"},X={class:"modal-body"},Y={class:"col-sm-4 has-validation"},$=e("label",{for:"imgUrl",class:"form-label"},"商品圖片",-1),ee={name:"link",class:"invalid-feedback"},te={class:"modalPic"},oe=["src","alt"],se={key:0},ie={key:1},ne={class:"col-sm-8"},le={class:"row"},re={class:"col-sm-12"},ae={class:"form-group mb-3"},ce=e("label",{for:"title",class:"form-label"},"標題",-1),de={name:"title",class:"invalid-feedback"},me={class:"col-sm-6"},ue={class:"form-group mb-3"},pe=e("label",{for:"price",class:"form-label"},"價格（元）",-1),fe={name:"price",class:"invalid-feedback"},he={class:"col-sm-6"},_e=e("label",{for:"member",class:"form-label"},"成員",-1),be=e("option",{value:"Bangchan",selected:""},"Bangchan",-1),ge=e("option",{value:"Leeknow"},"Leeknow",-1),ve=e("option",{value:"Changbin"},"Changbin",-1),Pe=e("option",{value:"Hyunjin"},"Hyunjin",-1),ke=e("option",{value:"Han"},"Han",-1),ye=e("option",{value:"Felix"},"Felix",-1),we=e("option",{value:"Seungmin"},"Seungmin",-1),xe=e("option",{value:"I.N"},"I.N",-1),Ce=e("option",{value:"非特定成員"},"非特定成員",-1),Ie=[be,ge,ve,Pe,ke,ye,we,xe,Ce],Te={class:"row"},Ve={class:"col-sm-6"},Be={class:"form-group mb-3"},De=e("label",{for:"title",class:"form-label"},"國內運費",-1),Ne={class:"btn-group",role:"group","aria-label":"Basic radio toggle button group"},Ue={type:"radio",class:"btn-check",name:"domesticBtnRadio",id:"hasDomestic",autocomplete:"off",ref:"hasDomestic"},Fe=e("input",{type:"radio",class:"btn-check",name:"domesticBtnRadio",id:"btnradio2",autocomplete:"off",checked:""},null,-1),Me=e("option",{disabled:"",selected:"",value:""},"請選擇出貨",-1),Re=e("option",{value:"711賣貨便"},"711賣貨便",-1),Ae=e("option",{value:"711店到店"},"711店到店",-1),Le=e("option",{value:"全家"},"全家店到店",-1),Se=e("option",{value:"萊爾富"},"萊爾富",-1),Ee={name:"domesitcFreightAmount",class:"invalid-feedback"},qe={key:2},je=e("h4",{class:"text-secondary"},[C("面交"),e("span",null,"0"),C("元")],-1),He={name:"note",class:"invalid-feedback"},Oe={class:"col-sm-6"},ze={class:"form-group mb-3"},Je=e("label",{for:"title",class:"form-label"},"國際運費",-1),Ge={class:"btn-group",role:"group","aria-label":"Basic radio toggle button group"},Ke={type:"radio",class:"btn-check",name:"internationalBtnRadio",ref:"hasInternational",id:"hasInternational",autocomplete:"off"},Qe=e("input",{type:"radio",class:"btn-check",name:"internationalBtnRadio",id:"btnradio4",autocomplete:"off",checked:""},null,-1),Ze={key:0,class:"btn-group btn-group-wider",role:"group","aria-label":"Basic radio toggle button group"},We={type:"radio",class:"btn-check",name:"internationalDetailBtnRadio",ref:"needComplement",id:"needComplement",autocomplete:"off"},Xe=e("input",{type:"radio",class:"btn-check",name:"internationalDetailBtnRadio",id:"btnradio6",autocomplete:"off"},null,-1),Ye={key:1,class:"text-mainorange"},$e={name:"internationalFreight",class:"invalid-feedback"},et={class:"col-sm-12"},tt=e("label",{for:"floatingTextarea2",class:"mb-3"},"商品描述",-1),ot={class:"form-floating"},st={name:"price",class:"invalid-feedback"},it={class:"modal-footer"},nt=e("button",{type:"button",class:"btn btn-secondary text-white","data-bs-dismiss":"modal"},"取消",-1);function lt(l,t,r,f,o,i){const m=w("font-awesome-icon"),h=w("v-field"),I=w("v-form");return c(),d("div",M,[e("div",R,[e("button",{class:"btn btn-primary me-4 text-white",onClick:t[0]||(t[0]=n=>i.openModal("new"))}," 新增一般產品 "),e("button",{class:"btn btn-secondary me-4 text-white",onClick:t[1]||(t[1]=n=>i.openModal("card"))}," 新增成員小卡 ")]),e("table",A,[L,e("tbody",null,[(c(!0),d(B,null,D(o.userProductList,n=>(c(),d("tr",{key:n.id},[e("td",null,p(n.category),1),e("td",null,p(n.title),1),e("td",S,p(n.price),1),e("td",E,p(n.member),1),e("td",null,[e("div",q,[e("button",{type:"button",class:"btn btn-primary btn-sm text-white me-2",onClick:s=>i.openModal("edit",n)},[a(m,{icon:"fa-solid fa-pen-to-square"})],8,j),e("button",{type:"button",class:"btn btn-mainorange btn-sm text-white",onClick:s=>i.deletePerProduct(n.id)},[a(m,{icon:"fa-solid fa-trash"})],8,H)])])]))),128))])]),e("div",O,[e("div",z,[e("div",J,[e("div",G,[o.isNew==="group"?(c(),d("h4",K,"新增拆卡團")):u("",!0),o.isNew==="new"?(c(),d("h4",Q,"新增產品")):u("",!0),o.isNew==="edit"?(c(),d("h4",Z,"編輯產品")):u("",!0),e("button",W,[a(m,{icon:"fa-solid fa-xmark",class:"text-white",style:{"font-size":"24px"}})])]),e("div",X,[a(I,{class:"row",onSubmit:i.onSubmit},{default:x(({errors:n})=>[e("div",Y,[$,a(m,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon"}),a(h,{id:"imgUrl",modelValue:o.perProduct.imgUrl,"onUpdate:modelValue":t[2]||(t[2]=s=>o.perProduct.imgUrl=s),name:"link",class:_(["form-control",{"is-invalid":n.link}]),placeholder:"請輸入圖片連結",rules:i.isRequired},null,8,["modelValue","rules","class"]),e("p",ee,p(n.link),1),e("div",te,[e("img",{class:"img-fluid",src:o.perProduct.imgUrl,alt:o.perProduct.title},null,8,oe)]),!o.perProduct.imagesUrl.length||o.perProduct.imagesUrl[o.perProduct.imagesUrl.length-1]?(c(),d("div",se,[e("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:t[3]||(t[3]=s=>o.perProduct.imagesUrl.push(""))}," 新增圖片 ")])):(c(),d("div",ie,[e("button",{class:"btn btn-outline-danger btn-sm d-block w-100",onClick:t[4]||(t[4]=s=>o.perProduct.imagesUrl.pop())}," 刪除圖片 ")]))]),e("div",ne,[e("div",le,[e("div",re,[e("div",ae,[ce,a(m,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon"}),a(h,{id:"title",modelValue:o.perProduct.title,"onUpdate:modelValue":t[5]||(t[5]=s=>o.perProduct.title=s),name:"title",class:_(["form-control",{"is-invalid":n.title}]),placeholder:"請輸入標題",rules:i.isRequired},null,8,["modelValue","rules","class"]),e("p",de,p(n.title),1)])]),e("div",me,[e("div",ue,[pe,a(m,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon"}),a(h,{id:"price",modelValue:o.perProduct.price,"onUpdate:modelValue":t[6]||(t[6]=s=>o.perProduct.price=s),modelModifiers:{number:!0},type:"number",name:"price",class:_(["form-control",{"is-invalid":n.price}]),placeholder:"請填入未含運的商品價格",rules:i.isNumber},null,8,["modelValue","rules","class"]),e("p",fe,p(n.price),1)])]),e("div",he,[_e,o.isNew==="card"?(c(),y(m,{key:0,icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon"})):u("",!0),N(e("select",{"onUpdate:modelValue":t[7]||(t[7]=s=>o.perProduct.member=s),class:"form-select","aria-label":"Default select example",id:"member"},Ie,512),[[U,o.perProduct.member]])]),e("div",Te,[e("div",Ve,[e("div",Be,[De,a(m,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon"}),e("div",Ne,[e("input",Ue,null,512),e("label",{class:"btn btn-outline-mainorange toggleBtn",for:"hasDomestic",onClick:t[8]||(t[8]=(...s)=>i.hasDomestic&&i.hasDomestic(...s))},[a(m,{icon:"fa-solid fa-check"})]),Fe,e("label",{class:"btn btn-outline-maingray toggleBtn",for:"btnradio2",onClick:t[9]||(t[9]=(...s)=>i.hasNoDomestic&&i.hasNoDomestic(...s))},[a(m,{icon:"fa-solid fa-xmark"})])]),o.ifDomesticFee?(c(),y(h,{key:0,id:"name",name:"domesitcFreight",class:_(["form-control",{"is-invalid":n.domesitcFreight}]),placeholder:"請choose出貨",modelValue:o.perProduct.domestic_Transport.courier,"onUpdate:modelValue":t[10]||(t[10]=s=>o.perProduct.domestic_Transport.courier=s),as:"select",rules:i.isRequired},{default:x(()=>[Me,Re,Ae,Le,Se]),_:2},1032,["modelValue","rules","class"])):u("",!0),o.ifDomesticFee?(c(),y(h,{key:1,id:"domesitcFreight",modelValue:o.perProduct.domestic_Transport.amount,"onUpdate:modelValue":t[11]||(t[11]=s=>o.perProduct.domestic_Transport.amount=s),modelModifiers:{number:!0},type:"number",name:"domesitcFreightAmount",class:_(["form-control",{"is-invalid":n.domesitcFreightAmount}]),rules:i.isNumber},null,8,["modelValue","rules","class"])):u("",!0),e("p",Ee,p(n.domesitcFreightAmount),1),o.ifDomesticFee?u("",!0):(c(),d("div",qe,[je,a(h,{id:"note",modelValue:o.perProduct.domestic_Transport.courier_Note,"onUpdate:modelValue":t[12]||(t[12]=s=>o.perProduct.domestic_Transport.courier_Note=s),name:"note",class:_(["form-control",{"is-invalid":n.note}]),placeholder:"請填寫可面交縣市及日期限制",rules:i.isRequired},null,8,["modelValue","rules","class"]),e("p",He,p(n.note),1)]))])]),e("div",Oe,[e("div",ze,[Je,e("div",Ge,[e("input",Ke,null,512),e("label",{class:"btn btn-outline-mainorange toggleBtn",for:"hasInternational",onClick:t[13]||(t[13]=(...s)=>i.hasInternational&&i.hasInternational(...s))},[a(m,{icon:"fa-solid fa-check"})]),Qe,e("label",{class:"btn btn-outline-maingray toggleBtn",for:"btnradio4",onClick:t[14]||(t[14]=(...s)=>i.hasNoInternational&&i.hasNoInternational(...s))},[a(m,{icon:"fa-solid fa-xmark"})])]),o.ifInternational?(c(),d("div",Ze,[e("input",We,null,512),e("label",{class:"btn btn-outline-primary toggleBtn",for:"needComplement",onClick:t[15]||(t[15]=(...s)=>i.needComplement&&i.needComplement(...s))},"需二補"),Xe,e("label",{class:"btn btn-outline-primary toggleBtn",for:"btnradio6",onClick:t[16]||(t[16]=(...s)=>i.needNoComplement&&i.needNoComplement(...s))},"本次付清")])):u("",!0),o.ifComplement&&o.ifInternational?(c(),d("h4",Ye,"本次結帳總額未收國際運費，最終出貨前請至訂單管理新增運費金額，系統將自動通知買家付款。")):u("",!0),!o.ifComplement&&o.ifInternational?(c(),y(h,{key:2,id:"domesitcFreight",modelValue:o.perProduct.international_Transport.amount,"onUpdate:modelValue":t[17]||(t[17]=s=>o.perProduct.international_Transport.amount=s),modelModifiers:{number:!0},type:"number",name:"internationalFreight",class:_(["form-control",{"is-invalid":n.internationalFreight}]),rules:i.isNumber,placeholder:"不需二補的最終國際運費"},null,8,["modelValue","rules","class"])):u("",!0),e("p",$e,p(n.internationalFreight),1)])])]),e("div",et,[tt,a(m,{icon:"fa-solid fa-star-of-life",class:"text-mainorange modalIcon"}),e("div",ot,[a(h,{modelValue:o.perProduct.description,"onUpdate:modelValue":t[18]||(t[18]=s=>o.perProduct.description=s),id:"domesitcFreight",type:"text",name:"description",class:_(["form-control",{"is-invalid":n.description}]),rules:i.isRequired,height:"200px"},null,8,["modelValue","rules","class"]),e("p",st,p(n.description),1)])])])]),e("div",it,[nt,o.isNew==="new"?(c(),d("button",{key:0,type:"submit",class:"btn btn-primary text-white",onClick:t[19]||(t[19]=s=>i.updateProduct("new"))},"確認新增")):u("",!0),o.isNew==="edit"?(c(),d("button",{key:1,type:"submit",class:"btn btn-primary text-white",onClick:t[20]||(t[20]=s=>i.updateProduct("edit"))},"確認修改")):u("",!0),o.isNew==="card"?(c(),d("button",{key:2,type:"submit",class:"btn btn-primary text-white",onClick:t[21]||(t[21]=s=>i.updateProduct("card"))},"確認新增")):u("",!0)])]),_:1},8,["onSubmit"])])])])])])}const ct=T(F,[["render",lt]]);export{ct as default};

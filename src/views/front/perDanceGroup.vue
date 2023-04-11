<template>
    <div class="container container-sm container-md container-lg my-5">
        <div class="row">
            <div class="product-img col-sm-12 col-md-12 col-lg-5 col-xl-5 mb-80 mt-9">
                <div class="d-flex justify-content-center mb-6">
                    <img :src="product.imageUrl" :alt="product.title" class="dance-cardImg bd-rd-12"></div>
        </div>
        <!--商品選項-右-->
        <div class="perDance-cta col-sm-12 col-md-12 col-lg-7 col-xl-7 ps-lg-9 ch-font mt-9 d-flex flex-column justfy-content-between">
          <div class="txt-area">
          <h1 class="mb-3 fs-1">{{ product.title }}</h1>
          <h2 class="text-primary fs-3 mb-6">{{ product.county }}</h2>
          <ul>
            <li class="text-maingray fs-6 mb-4"><span class="dance-list">主揪</span>{{ product.leader }}</li>
            <li class="text-maingray fs-6 mb-4"><span class="dance-list">表演</span>{{ (new Date(product.d_day * 1000)).getFullYear() }}年{{ (new Date(product.d_day * 1000)).getMonth()+1 }}月{{ (new Date(product.d_day * 1000)).getDate() }}日</li>
            <li class="text-maingray fs-6 mb-6"><span class="dance-list">首次練習時間</span>{{ (new Date(product.first_practice * 1000)).getFullYear() }}年{{ (new Date(product.first_practice * 1000)).getMonth()+1 }}月{{ (new Date(product.first_practice * 1000)).getDate() }}日</li>
            <li><p></p></li>
          </ul>
        </div>
          <div class="btn-area btns d-flex justify-content-start">
          <button v-if="signedBefore===false" type="button" class="product-btn btn text-white btn-mainorange border-0 bd-rd-12 py-1 px-3 me-3 confirmJoinBtn d-flex" @click="toFillInInfo">確定參加<font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="ms-1" /></button>
          <button v-if="signedBefore===true" type="button" class="product-btn btn text-white btn-mainorange border-0 bd-rd-12 py-1 px-3 me-3 confirmJoinBtn d-flex disabled">已報名</button>
          <button type="button" class="product-btn btn btn-white border-primary bd-rd-12 py-1 px-3">有興趣</button>
      </div></div>
      <div v-show="signUpForm" class="col-lg-12 mb-9">
        <div class="accordion accordion-flush" id="danceInfoAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed py-3 px-3 fs-5 text-mainorange" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  <font-awesome-icon icon="fa-solid fa-user" class="me-3 text-mainorange fs-5"/>
                  請填寫報名資訊！！<span class="text-maingray fs-6">確定報名後將等待主揪審核。</span>
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#danceInfoAccordion">
                <div class="accordion-body d-flex justify-content-center">
                 <v-form ref="form" class="vform dance-vform" v-slot="{ errors }" @submit="confirmSignUpDance">
    <div class="mb-3">
      <label for="socialAccount" class="form-label me-2 mb-3">社群媒體聯絡帳號</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="socialAccount" name="socialAccount" type="text" class="form-control custom-vf"
               placeholder="範例：ig/stay_0325"  :rules="isRequired" :class="{ 'is-invalid': errors.socialAccount }"
               v-model="perOrder.data.user.socialAccount"></v-field>
               <p name="socialAccount" class="invalid-feedback">{{ errors.socialAccount }}</p>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label me-2 mb-3">真實姓名</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="name" name="name" type="text" class="form-control custom-vf"
                placeholder="範例：朴珍永" :class="{ 'is-invalid': errors.name }" :rules="isRequired"
                v-model="perOrder.data.user.name"
              ></v-field>
              <p name="name" class="invalid-feedback">{{ errors.name }}</p>
    </div>
    <div class="mb-3">
      <label for="nickName" class="form-label me-2 mb-3">暱稱</label>
      <v-field id="nickName" name="nickName" type="text" class="form-control custom-vf"
                placeholder="習慣叫暱稱的可以填喔"
                v-model="perOrder.data.user.nickName"
              ></v-field>
    </div>
    <div class="mb-3">
      <label for="tel" class="form-label me-2 mb-3">手機（現場聯絡用）</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="tel" name="tel" type="tel" class="form-control custom-vf"
               placeholder="範例：0912345678" v-model="perOrder.data.user.tel" :class="{ 'is-invalid': errors.tel }" :rules="phoneVali"></v-field>
               <p name="tel" class="invalid-feedback">{{ errors.tel }}</p>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label me-2 mb-3">收件人地址</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="address" name="address" type="text" class="form-control custom-vf"
               placeholder="請輸入地址"  :rules="isRequired" :class="{ 'is-invalid': errors.address }"
               v-model="perOrder.data.user.address"></v-field>
               <p name="address" class="invalid-feedback">{{ errors.address }}</p>
    </div>
    <div class="mb-3">
      <label for="message" class="form-label mb-3">給主揪的訊息</label>
      <textarea id="message" class="form-control custom-vf" cols="30" rows="3" v-model="perOrder.data.message"></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-primary text-white bd-rd-12 ch-font" @click="signUpDance">確定報名資訊</button>
    </div>

  </v-form>
                </div>
              </div>
            </div>
          </div>
      </div>
  <div class="col-12 ch-font">
          <div class="product-details">
          <div class="details-dance bd-top-opa col-12 d-flex flex-wrap mt-5 text-maingray">
            <div class="seller col-12 py-3 px-3 d-flex align-items-center justify-content-between">
              <div class="seller-left d-flex align-items-center">
                <img class="seller-pic" src="https://i.imgur.com/YxLmY3t.png" alt="sellerpic">
          <h5 class="ms-2">Tracy</h5>
    <p class="ms-6">主揪成團 <span class="text-primary">4</span> 筆</p>
            </div>
              <div class="seller-right">
              <button type="button" class="seller-btn btn btn-white border-secondary bd-rd-12 py-1 px-2 me-2">
                <font-awesome-icon icon="fa-solid fa-comment" class="me-3 text-secondary fs-5"/>
                訊息</button>
            </div>
            </div>
            <ul class="pic-area">
          </ul>

          </div>
        </div>

        </div>
        <div class="col-12 mt-9">
          <p class="ch-font"> {{ product.description }}</p>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'pinia'
import cartsStore from '../../store/cartsStore.js'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      signedBefore: false,
      loadingStatus: {
        loadingItem: ''
      },
      product: {
      },
      productCategory: '跳舞',
      signUpForm: false,
      perOrder: {
        data: {
          user: {
            name: '',
            email: 'test@test.com',
            tel: '',
            address: '',
            socialAccount: '',
            nickName: ''
          },
          message: ''
        }
      },
      danceCurId: '',
      danceTemp: []
    }
  },
  methods: {
    phoneVali (value) {
      const phoneNumber = /^(09)\d{8}$/
      return phoneNumber.test(value) ? true : '請填入正確的電話號碼！'
    },
    isRequired (value) {
      if (!value) {
        return '此欄位為必填！'
      }
      return true
    },
    confirmSignUpDance (values) {
      if (!JSON.stringify(values, null, 2)) {
        alert('無法提交')
      }
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/order`
      axios.post(url, this.perOrder)
        .then(res => {
          console.log(res.data)
          console.log(res.data.orderId)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `團號${this.product.id}成功報名，請等待主揪訊息通知下一步驟。`,
            showConfirmButton: false,
            timer: 1800
          })
          this.deleteAllCartToOrder()
          this.perOrder = {
            data: {
              user: {
                name: '',
                email: 'test@test.com',
                tel: '',
                address: '',
                socialAccount: '',
                nickName: ''
              },
              message: ''
            }
          }
          this.signUpForm = false
          this.signedBefore = true
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    getPerProduct () {
      // /v2/api/{api_path}/product/{id}
      const { id } = this.$route.params
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/product/${id}`
      axios.get(url)
        .then(res => {
          this.product = res.data.product
        })
        .catch(err => {
          console.log(err)
        })
    },
    toFillInInfo () {
      this.signUpForm = true
      const infoAccordion = document.getElementById('danceInfoAccordion')
      window.scrollTo(0, infoAccordion.offsetTop)
      const flushCollapseOne = document.getElementById('flush-collapseOne')
      flushCollapseOne.classList.add('show')
      // this.addToCart()
    },
    signUpDance () {
      this.loadingStatus.loadingItem = this.product.id
      let cart = {}
      cart = {
        product_id: this.product.id,
        qty: 1,
        category: '跳舞'
      }
      console.log(cart)
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      axios.post(url, { data: cart })
        .then(res => {
          console.log(res.data)
          this.loadingStatus.loadingItem = ''
          this.checkDanceCart()
          // const curcart = this.carts.find(el => el.product_id === this.product.id)
          // // this.curCartId = curcart.id
          // console.log(curcart)
        })
        .catch(err => {
          console.log(err)
          this.loadingStatus.loadingItem = ''
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '無法報名！',
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    checkDanceCart () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      axios.get(url)
        .then(res => {
          this.danceTemp = res.data.data.carts.filter(el => el.category === '跳舞')
          const curDance = this.danceTemp.find(el => el.product_id === this.product.id)
          this.danceCurId = curDance.id
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDanceTemp () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      axios.get(url)
        .then(res => {
          console.log(res.data.data.carts.filter(el => el.category === '跳舞'))
        })
        .catch(err => {
          console.log(err)
        })
    },
    ...mapActions(cartsStore, ['getCart', 'deleteAllCartToOrder'])
  },
  mounted () {
    this.getPerProduct()
    // this.getCart()
    this.getDanceTemp()
    console.log(this.signedBefore)
  },
  computed: {
    ...mapState(cartsStore, ['carts', 'curCartId'])
  }
}
</script>

<style>
.product-img{
    max-width: 100%;
    height: auto;
}

.cardImg{
    max-width: 300px;
    border-radius: 12px;
    object-fit: cover;
}

.product-btn{
    color: #9B9BE3;
}

.product-btn:hover{
    color: #ffffff;
    background: #9B9BE3
    }

.notice{
    margin-top: 7px;
    position: relative;
    line-height: 2;
    border-radius: 20px;
}
</style>

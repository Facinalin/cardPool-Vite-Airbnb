<template>
    <div class="container my-5">
        <div class="row">
            <div class="product-img col-md-12 col-lg-5 mb-80 mt-9">
                <div class="d-flex justify-content-center mb-6">
                    <img :src="product.imageUrl" alt="" class="cardImg"></div>
        </div>
        <!--商品選項-右-->
        <div class="col-md-12 col-lg-7 ps-lg-9 ch-font mt-9 d-flex flex-column justfy-content-between">
          <div class="txt-area">
          <h1 class="mb-3 fs-1">{{ product.title }}</h1>
          <h2 class="text-primary fs-3">主揪：{{ product.leader }}</h2>
        </div>
          <div class="btn-area btns d-flex justify-content-start">
          <button type="button" class="product-btn btn text-white btn-mainorange border-0 bd-rd-12 py-1 px-3 me-3 confirmJoinBtn d-flex" @click="addToCart(product.id)">確定參加<font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="ms-1" /></button>
          <button type="button" class="product-btn btn btn-white border-primary bd-rd-12 py-1 px-3">有興趣</button>
      </div></div>

        <div class="col-12">
  <div class="col-12 ch-font">
          <div class="product-details">
          <div class="details-1 bd-top-opa col-12 d-flex flex-wrap mt-5 text-maingray">
            <div class="seller col-12 py-3 px-3 d-flex align-items-center justify-content-between">
              <div class="seller-left d-flex align-items-center">
                <img class="seller-pic" src="https://i.imgur.com/YxLmY3t.png" alt="sellerpic">
          <h5 class="ms-2">Tracy</h5>
    <p class="ms-6">主拆成團 <span class="text-primary">4</span> 筆</p>
            </div>
              <div class="seller-right">
              <button type="button" class="seller-btn btn btn-white border-secondary bd-rd-12 py-1 px-2 me-2">
                <font-awesome-icon icon="fa-solid fa-comment" class="me-3 text-secondary fs-5"/>
                訊息</button>
              <a href="#" class="seller-btn btn btn-white border-secondary bd-rd-12 py-1 px-2">查看賣場</a>
            </div>
            </div>
            <ul class="pic-area">
          </ul>

          </div>
        </div>

        </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'Pinia'
import cartsStore from '../../store/cartsStore.js'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      product: {
      },
      productCategory: '跳舞'
    }
  },
  methods: {
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
    addToCart (curProductId, curQty = 1) {
      this.loadingStatus.loadingItem = curProductId
      let httpRequest = 'post'
      let url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      let cart = {}
      const currentCart = this.carts.find(item => item.productId === curProductId)
      if (currentCart) {
        httpRequest = 'put'
        url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart/${currentCart.id}`
        cart = {
          ...currentCart,
          qty: currentCart.qty + curQty
        }
      } else {
        // const indicateProduct = products.find(el => el.id === curProductId)
        cart = {
          product_id: curProductId,
          qty: curQty,
          category: '一般'
        }
      }
      if (this.productCategory === '出卡') {
        cart.category = '出卡'
      }
      axios[httpRequest](url, { data: cart })
        .then(res => {
          console.log(res.data)
          this.loadingStatus.loadingItem = ''
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '成功加入購物車!',
            showConfirmButton: false,
            timer: 1800
          })
          this.getCart()
        })
        .catch(err => {
          this.loadingStatus.loadingItem = ''
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    ...mapActions(cartsStore, ['getCart'])
  },
  mounted () {
    this.getPerProduct()
    this.getCart()
  },
  computed: {
    ...mapState(cartsStore, ['carts'])
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

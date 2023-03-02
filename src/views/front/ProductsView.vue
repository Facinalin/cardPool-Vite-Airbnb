<template>
    <div class="my-5 container border border-primary border-2">
      <div class="row gx-5">
      <div class="col-lg-3 col-md-4 col-sm-12 my-5 card-group" v-for="product in products" :key="product.id">
  <div class="card rounded-0 border-0">
  <img :src="product.imgUrl" class="card-img-top" alt="">
  <div class="card-body px-0 py-4 text-center">
    <h5 class="card-title fs-6 mb-3 text-maingray">{{ product.title }}</h5>
    <p class="card-text fs-7 pri-aux">{{ product.price }}元</p>
    <div class="d-flex justify-content-center mt-4">
    <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 me-2 fs-7"><RouterLink :to="`/product/${product.id}`">看商品</RouterLink></button>
    <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 fs-7" @click="addToCart(product.id)">加購物車</button>
  </div>
  </div>
</div>
</div>
</div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import { RouterLink } from 'vue-router'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const userToken = localStorage.getItem('user1hrToken')
const userId = localStorage.getItem('userId')

export default {
  data () {
    return {
      products: [],
      carts: []
    }
  },
  methods: {
    getProduct () {
      const url = `${VITE_APP_URL}/products`
      this.$http.get(url)
        .then(res => {
          console.log(res.data)
          this.products = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (curProductId, curQty = 1) {
      let httpRequest = 'post'
      let url = `${VITE_APP_URL}/600/users/${userId}/carts`
      let data = {}
      const currentCart = this.carts.find(item => item.productId === curProductId)
      const products = this.products
      if (currentCart) {
        httpRequest = 'patch'
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${currentCart.id}`
        data = {
          id: currentCart.id,
          product_id: curProductId,
          qty: currentCart.qty += curQty
        }
      } else {
        const indicateProduct = products.find(el => el.id === curProductId)
        data = {
          id: new Date().getTime(),
          product_id: curProductId,
          qty: 1,
          userId,
          product: indicateProduct,
          subtotal: indicateProduct.price * 1
        }
      }
      this.$http[httpRequest](url, data, {
        headers: {
          authorization: `Bearer ${userToken}`
        }
      })
        .then(res => {
          console.log(res.data)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '成功加入購物車!',
            showConfirmButton: false,
            timer: 1800
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCart () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      const products = this.products
      this.$http.get(url)
        .then(res => {
          this.carts = res.data.data.carts
          // 整理cart
          const cartWithProduct = this.carts.map(item => {
            const indicateProduct = products.find(el => el.id === item.productId)
            return {
              ...item,
              indicateProduct,
              subtotal: indicateProduct.price * item.qty
            }
          })
          console.log(this.carts)
          console.log(cartWithProduct)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    RouterLink
  },
  mounted () {
    this.getProduct()
  }
}</script>

<style>
    .product-pic{
    width: 130px;
    height: 130px;
    object-fit: cover;
    }
    .product-btn{
    color: #9B9BE3;
}

.product-btn:hover{
    color: #ffffff;
    background: #9B9BE3
    }

.card .card-img-top{
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0px;
}
.col-lg-3 .card{
  max-height: 550px;
}

.pri-aux{
  color: #7171D0;
}

</style>

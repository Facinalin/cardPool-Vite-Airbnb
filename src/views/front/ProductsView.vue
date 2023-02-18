<template>
    <div class="my-5 container">
      <div class="row gx-5">
      <div class="col-lg-3 my-5 card-group" v-for="product in products" :key="product.id">
  <div class="card rounded-0 border-0">
  <img :src="product.imageUrl" class="card-img-top" alt="">
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
import { RouterLink } from 'vue-router'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      carts: []
    }
  },
  methods: {
    getProduct () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`
      this.$http.get(url)
        .then(res => {
          console.log(res.data)
          this.products = res.data.products
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (curProductId, curQty = 1) {
      let httpRequest = 'post'
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      let data = {}
      const currentCart = this.carts.find(item => item.productId === curProductId)
      if (currentCart) {
        httpRequest = 'put'
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${currentCart.id}`
        data = {
          id: currentCart.id,
          product_id: curProductId,
          qty: currentCart.qty += curQty
        }
      } else {
        data = {
          id: new Date().getTime(),
          product_id: curProductId,
          qty: 1
        }
      }
      this.$http[httpRequest](url, { data })
        .then(res => {
          console.log(res.data)
          alert('成功加入購物車！')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCart () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          this.carts = res.data.data.carts
          console.log(this.carts)
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
.container{
    padding: 60px;
}

.pri-aux{
  color: #7171D0;
}

</style>

<template>
    <div v-if="isLoading" class="container d-flex justify-content-center">
   <img src="https://i.imgur.com/hRNLPLv.gif" alt="heart.gif" class="loadingGif">
    </div>
      <div v-else class="my-5 container">
        <div class="row gx-5">
        <div class="col-lg-3 col-md-4 col-sm-12 my-5 card-group" v-for="product in products" :key="product.id">
    <div class="card rounded-0 border-0 px-5">
      <div class="card-img-member">
    <img :src="product.imgUrl" class="card-img-top-rec bd-rd-20" alt="">
  </div>
    <div class="card-body px-0 py-4 text-center">
      <h5 class="card-title fs-6 mb-3 text-maingray">{{ product.title }}</h5>
      <p class="card-text fs-7 pri-aux">{{ product.price }}元</p>
      <p class="card-text fs-7 pri-aux">{{ product.member }}</p>
      <div class="d-flex justify-content-center mt-4">
      <button type="button" class="btn btn-white border-secondary rounded-xxl py-1 px-3 me-2 fs-7"><RouterLink :to="`/product/${product.id}`"><font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="me-1" />看商品</RouterLink></button>
      <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 fs-7" @click="addToCart(product.id)" :disabled="loadingStatus.loadingItem === product.id || !product.is_enabled"><font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="me-1" />加購物車</button>
    </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  </template>

<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'Pinia'
import cartsStore from '../../store/cartsStore.js'
import productsStore from '../../store/productsStore.js'

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      }
    }
  },
  components: {
    RouterLink
  },
  methods: {
    ...mapActions(cartsStore, ['getCart', 'addToCart']),
    ...mapActions(productsStore, ['getCardProducts'])
  },
  computed: {
    ...mapState(productsStore, ['products', 'isLoading'])
  },
  mounted () {
    setTimeout(() => {
      this.getCardProducts()
    }, 1900)
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

  .loadingGif{
    margin-top: 70px;
    width: 160px;
  }

  </style>

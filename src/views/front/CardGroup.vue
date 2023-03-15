<template>
    <div v-if="isLoading" class="container d-flex justify-content-center">
   <img src="https://i.imgur.com/hRNLPLv.gif" alt="heart.gif" class="loadingGif">
    </div>
      <div v-else class="my-5 container border border-primary border-2">
        <div class="row gx-5">
        <div class="col-lg-3 col-md-4 col-sm-12 my-5 card-group" v-for="product in cardGroupProduct" :key="product.id">
    <div class="card rounded-0 border-0">
    <img :src="product.imgUrl" class="card-img-top" alt="">
    <div class="card-body px-0 py-4 text-center">
      <h5 class="card-title fs-6 mb-3 text-maingray">{{ product.title }}</h5>
      <p class="card-text fs-7 pri-aux">{{ product.price }}元</p>
      <p class="card-text fs-6 ls-4 pri-aux bg-primary text-white my-3 py-2 bd-rd-12"> <RouterLink :to="`/cardgroup/${product.id}`" class="text-white addBtn">
          <font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="me-1" />
          差<strong>{{ ((Object.values(product.leftMember)).filter(el => el === true)).length }}</strong>位成團
        </RouterLink></p>
      <div class="d-flex justify-content-center mt-4">
    </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  </template>

<script>
// import Swal from 'sweetalert2'
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'Pinia'
import productsStore from '../../store/productsStore.js'
// import Loading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/css/index.css'

// const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

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
    ...mapActions(productsStore, ['getCardGroupProduct'])
  },
  computed: {
    ...mapState(productsStore, ['cardGroupProduct', 'isLoading'])
  },
  mounted () {
    setTimeout(() => {
      this.getCardGroupProduct()
    }, 1900)
    console.log(this.cardGroupProduct)
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

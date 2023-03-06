
<template>
  <div class="container border border-primary border-2">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><router-link to="/"><img src="https://i.imgur.com/gmA3prD.png" alt="logo" class="logo-img"></router-link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/">首頁</router-link></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/about">活動</router-link></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/products">代購</router-link></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#"><router-link to="/cart/cartToOrder" class="position-relative"><font-awesome-icon icon="fa-solid fa-cart-shopping" /><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-mainorange">
    {{number}}
  </span></router-link></a>
      </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/admin"><font-awesome-icon icon="fa-solid fa-user" /></router-link></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
 <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
import { mapState, mapActions } from 'Pinia'
import cartsStore from '../store/cartsStore'

export default {
  data () {
    return {
    }
  },
  components: {
    RouterView
  },
  methods: {
    checkLogged () {

    },
    ...mapActions(cartsStore, ['getCart', 'addToCart'])
  },
  computed: {
    ...mapState(cartsStore, ['number'])
  },
  mounted () {
    this.checkLogged()
    this.getCart()
  }
}

</script>

<style>
.logo-img{
  width: 100px;
}
.nav-item .nav-link{
  text-decoration: none;
}
</style>

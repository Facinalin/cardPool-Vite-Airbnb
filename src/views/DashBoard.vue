<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
<div class="container-fluid">
  <a class="navbar-brand" href="#"><router-link to="/"><img src="https://i.imgur.com/gmA3prD.png" alt="logo" class="logo-img"></router-link></a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item d-flex align-items-center">
            <a class="nav-link" href="#"><router-link to="/"><font-awesome-icon icon="fa-solid fa-house" /></router-link></a>
        </li>
        <li class="nav-item d-flex align-items-center">
            <a class="nav-link" href="#"><router-link to="/activities" class="ch-font fz-18">活動</router-link></a>
        </li>
        <li class="nav-item d-flex align-items-center">
  <div class="btn-group btn-group-adj">
    <a class="nav-link text-primary ch-font fz-18 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">逛逛</a>
  <ul class="dropdown-menu dropdown-menu-center">
    <li class="my-1"><a class="dropdown-item text-center" href="#"><router-link to="/products" class="text-primary ch-font">一般商品</router-link></a></li>
    <li class="my-1"><a class="dropdown-item text-center" href="#"><router-link to="/cardproducts" class="text-primary ch-font">成員小卡</router-link></a></li>
  </ul>
</div>
        </li>
        <li class="nav-item d-flex align-items-center">
            <a class="nav-link" href="#"><router-link to="/cardgroups" class="ch-font fz-18">卡團</router-link></a>
        </li>
        <li class="nav-item d-flex align-items-center">
        <a class="nav-link" href="#"><router-link to="/cart/cartToOrder" class="position-relative"><font-awesome-icon icon="fa-solid fa-cart-shopping" /><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-mainorange">
    {{number}}
  </span></router-link></a>
      </li>
      <li class="nav-item d-flex align-items-center">
  <div class="btn-group">
  <button type="button" class="btn bg-transparent dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    <a class="nav-link" href="#"><font-awesome-icon icon="fa-solid fa-user" class="text-primary" /></a>
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li class="my-1"><a class="dropdown-item text-center" href="#"><router-link to="/admin/orders" class="text-maingray ch-font fwt-light">我的訂單</router-link></a></li>
    <li class="my-1"><a class="dropdown-item text-center" href="#"><router-link to="/admin/dashboard/adminrcardgroup" class="text-maingray ch-font fwt-light">我的後台</router-link></a></li>
    <li class="my-1"><a class="dropdown-item text-center ch-font fwt-light" href="#" @click.prevent="logOut">登出</a></li>
  </ul>
</div>
        </li>
      </ul>
  </div>
</div>
</nav>
</div>
<RouterView></RouterView>
<div class="footer d-flex flex-column justify-content-center align-items-center">
  <h4 class="en-font me-2 mb-3 fs-5">CardPool is Designed and Created by Facina Lin.</h4>
  <h4 class="text-center ch-font px-1 d-flex fs-6 justify-content-center align-items-center">本站僅作品用途，尚無商用。聯絡我</h4>
 </div>
</template>

<script>
import Swal from 'sweetalert2'
import { RouterView } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import cartsStore from '../store/cartsStore'
import axios from 'axios'

const { VITE_APP_URL2 } = import.meta.env
const userToken = localStorage.getItem('user1hrToken')
const userId = localStorage.getItem('userId')

export default {
  data () {
    return {
    }
  },
  components: {
    RouterView
  },
  methods: {
    checkLoggedIn () {
      if (userToken && userId) {
        console.log('已登入')
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '你尚未登入，無法查看後台!',
          showConfirmButton: false,
          timer: 1800
        })
        this.$router.push('/logIn')
      }
    },
    clearAllCookies () {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    },
    logOut () {
      // document.cookie = `hexToken=;expires=${new Date()};`
      this.clearAllCookies()
      const url = `${VITE_APP_URL2}/logout`
      axios.post(url)
        .then((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1800
          })
          this.$router.push('/logIn')
        })
        .catch((err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    ...mapActions(cartsStore, ['getCart'])
  },
  computed: {
    ...mapState(cartsStore, ['number'])
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.getCart()
    // this.checkLoggedIn()
    // TTO
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

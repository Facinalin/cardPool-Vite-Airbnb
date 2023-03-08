<template>
  <div class="container border border-mainorange border-2">
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
        <a class="nav-link" href="#"><router-link to="/cart" class="position-relative"><font-awesome-icon icon="fa-solid fa-cart-shopping" /><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-mainorange">
    {{number}}
  </span></router-link></a>
      </li>
    </ul>
    <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="#"><router-link to="/admin/products">我的產品</router-link></a></li>
          <li class="nav-item"><a class="nav-link" href="#"><router-link to="/admin/orders">我的訂單</router-link></a></li>
          <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 fs-7" @click.prevent="logOut">登出</button>
        </ul>
  </div>
</div>
</nav>
</div>
<RouterView></RouterView>
</template>

<script>
import Swal from 'sweetalert2'
import { RouterView } from 'vue-router'
import { mapState, mapActions } from 'Pinia'
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

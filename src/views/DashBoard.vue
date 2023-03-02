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
          <a class="nav-link" href="#"><router-link to="/cart"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></router-link></a>
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
    logOut () {
      document.cookie = `hexToken=;expires=${new Date()};`
      localStorage.clear()
      this.$router.push('/logIn')
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
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

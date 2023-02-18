<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
          <a class="nav-link" href="#"><router-link to="/cart">購物車</router-link></a>
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
<RouterView></RouterView>
</template>

<script>

import { RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env

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
      const url = `${VITE_APP_URL}/api/user/check`
      this.$http.post(url)
        .then((res) => {
          if (!res.data.success) {
            alert('登入後才能查看後台！')
            this.$router.push('/logIn')
          }
        })
        .catch(() => {
          alert('登入後才能查看後台！')
          // alert(err.response.data.message)
          this.$router.push('/logIn')
        })
    },
    logOut () {
      document.cookie = `hexToken=;expires=${new Date()};`
      this.$router.push('/logIn')
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.checkLogged()
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

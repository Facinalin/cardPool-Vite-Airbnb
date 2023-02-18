
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
        <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/admin">我的後台</router-link></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
 <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'

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

    }
  },
  mounted () {
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

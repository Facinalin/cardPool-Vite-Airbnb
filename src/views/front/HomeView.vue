<template>
<div class="banner bg-maingray text-white d-flex flex-column justify-content-center">
    <div class="banner-txt">
    <img src="../../assets/banner-txt.svg" alt="" class="mb-5">
    <img src="../../assets/banner-aux-txt.svg" alt="">
  </div>
  <div class="btn-area">
    <button type="button" class="product-btn btn btn-primary text-white border-primary rounded-xxl py-1 px-3 fs-5"><RouterLink to="/products">選擇你的本命！</RouterLink></button>
  </div>
</div>
</template>

<script>

import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>

<style scoped>
.banner{
  height: 100vh;
  padding: 0 90px;
}

.banner-txt{
  max-width: 100%;
}

.banner-ch-txt{
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 60px;
}
.btn-area{
  max-width: 100%;
  margin-top: 36px;
}
</style>

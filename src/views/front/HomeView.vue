<template>
<div id="banner" class="banner bg-black text-white d-flex flex-column justify-content-center">
    <div class="banner-txt">
      <h1 class="text-size banner-upper-text">只有卡舖</h1>
      <img src="../../assets/maxident.png" alt="" class="banner-pic">
      <h1 class="text-size banner-bottom-text">拆換自如</h1>
  </div>
  <div class="btn-area">
    <button type="button" class="border-0 cta-btn bd-rd-20 btn btn-primary text-white border-primary py-2 px-4 fs-5"><RouterLink to="/products" class="text-white cta-btn-txt fs-4">逛逛卡舖</RouterLink></button>
  </div>
  <h1 class="en-slogan text-center">"I wanna send my Card to you. CardPool is all it takes."</h1>
</div>
  <div class="swiper bg-black">
</div>

</template>

<script>

import { RouterLink } from 'vue-router'

export default {
  data () {
    return {
    }
  },
  components: {
    RouterLink
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const bannerPic = document.querySelector('.banner-pic')
      bannerPic.style.transform = `translateY(${window.scrollY * 0.6}px)`
    })
  }
}
</script>

<style scoped>

.banner-ch-txt{
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 60px;
}

</style>

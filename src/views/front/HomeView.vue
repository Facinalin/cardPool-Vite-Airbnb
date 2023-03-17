<template>
<div id="banner" class="banner bg-black text-white d-flex flex-column justify-content-center">
    <div class="banner-txt">
      <h1 class="text-size banner-upper-text ch-font ls-10">只有卡舖</h1>
      <img src="../../assets/maxident.png" alt="" class="banner-pic">
      <h1 class="text-size banner-bottom-text ch-font ls-10">拆換自如</h1>
  </div>
  <div class="btn-area">
    <button type="button" class="border-0 cta-btn bd-rd-20 btn btn-primary text-white border-primary py-2 px-4 fs-5 ch-font"><RouterLink to="/products" class="text-white cta-btn-txt fs-4">逛逛卡舖</RouterLink></button>
  </div>
  <h1 class="en-slogan en-font text-center fwt-light" style="margin-bottom:40px;margin-top: 120px;">"I wanna send my Card to you. CardPool is all it takes."</h1>
  <h1 class="en-font text-center fs-4 fwt-light" style="margin-bottom:130px;"> - Inspired by lyrics of Case 143 by Stray Kids.</h1>
</div>
  <div class="content bg-black">
    <!-- 拆卡團 -->
    <div class="container d-flex section">
   <div class="d-flex flex-column card-container justify-content-center">
    <div class="d-flex flex-row justify-content-center mb-6">
  <div class="perCard bg-primary me-6">
  </div>
  <div class="perCard bg-primary me-6">
  </div>
  <div class="perCard bg-primary">
  </div>
</div>
<div class="d-flex flex-row justify-content-center mb-6">
  <div class="perCard bg-primary me-6">
  </div>
  <div class="perCard bg-primary me-6">
  </div>
  <div class="perCard bg-secondary">
  </div>
</div>
<div class="d-flex flex-row justify-content-center">
  <div class="perCard bg-primary me-6">
  </div>
  <div class="perCard bg-primary me-6">
  </div>
  <div class="perCard bg-primary">
  </div>
</div>
   </div>
   <div class="txt text-white d-flex flex-column align-items-center justify-content-center mb-6">
    <h1 class="fz-60 ch-font ls-10 mb-9">快速成團</h1>
    <p class="ch-font fs-5 mt-4 fwt-light px-6 ls-10 lh1-5 mb-8">厭倦在社團留言排單嗎？卡舖了解你的麻煩，加入卡舖，快速開團，效率媒合，自動通知！</p>
    <button type="button" class="border-0 cta-btn bd-rd-20 btn btn-primary border-primary py-2 px-4 fs-5 ch-font">
      <router-link to="/cardgroups" class="ch-font fz-18 text-white">
        拆卡盛況
      </router-link>
    </button>
   </div>
  </div>
  <!-- 賣卡換卡 -->
  <div class="d-flex swiper-section">
    <swiper :slides-per-view="6" :space-between="55" :autoplay="true" :loop="true" :speed="600"
  class="swiperWrapper">
    <swiper-slide class="perSlide" v-for="product in products.slice(0, 12)" :key="product.id">
      <RouterLink :to="`/product/${product.id}`">
        <img :src="product.imgUrl" alt="" class="bd-rd-20 swiperImg">
      </RouterLink>
    </swiper-slide>
  </swiper>
  </div>
  <h1 class="fs-1 ch-font ls-10 text-center mt-9 text-white">看看我的本命</h1>
  <div class="container d-flex flex-column mt-150 dance-section mb-9">
    <div class="circle-parent">
      <div class="circle"></div>
    </div>
    <div class="d-flex ">
   <div class="txt text-white d-flex flex-column align-items-center justify-content-center">
    <h1 class="fz-60 ch-font ls-10 mb-9">揪團跳舞</h1>
    <p class="ch-font fs-5 mt-4 fwt-light px-6 ls-10 lh1-5 mb-8">不論是百人隨機舞蹈，還是小組團練，只要你肯出來，我們肯邀！</p>
    <button type="button" class="border-0 cta-btn bd-rd-20 btn btn-primary text-white border-primary py-2 px-4 fs-5 ch-font">我有舞擔夢</button>
   </div>

   <div class="d-flex flex-column card-container justify-content-center">
<img src="../../assets/dance-cta.svg" alt="" class="dance-cta-img">
   </div>
  </div>
  </div>
</div>

</template>

<script>

import { RouterLink } from 'vue-router'
// Import Swiper Vue.js components
import SwiperCore, { Autoplay, Pagination } from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { mapActions, mapState } from 'Pinia'
import productsStore from '../../store/productsStore.js'

SwiperCore.use([Autoplay, Pagination])

export default {
  data () {
    return {
      cardWidth: 118,
      cardHeight: 180,
      borderRadius: 20,
      swiperUrl: [
        'https://i.imgur.com/5f0nzij.png',
        'https://i.imgur.com/E6IuT9A.png',
        'https://i.imgur.com/nIHroqh.png',
        'https://i.imgur.com/FSaFWkK.png',
        'https://i.imgur.com/NYW3H8d.png',
        'https://i.imgur.com/DrfiAYg.png',
        'https://i.imgur.com/iXna25F.png',
        'https://i.imgur.com/gKjAgi1.png',
        'https://i.imgur.com/j8H8qCl.png',
        'https://i.imgur.com/U5VSwTi.jpg',
        'https://i.imgur.com/2r8Hd2d.png',
        'https://i.imgur.com/cBEe9Ox.jpg'
      ]
    }
  },
  components: {
    RouterLink,
    Swiper,
    SwiperSlide
  },
  methods: {
    ...mapActions(productsStore, ['getCardProducts'])
  },
  computed: {
    ...mapState(productsStore, ['products', 'isLoading'])
  },
  mounted () {
    // const danceSection = document.querySelector('.dance-section')
    const circle = document.querySelector('.circle')
    window.addEventListener('scroll', () => {
      const bannerPic = document.querySelector('.banner-pic')
      bannerPic.style.transform = `translateY(${window.scrollY * 0.6}px)`
      // const wrapperHeight = danceSection.getBoundingClientRect().height
      // const viewportHeight = window.innerHeight
      if (window.scrollY > 2200) {
        circle.style.animationPlayState = 'running'
      }
    })
    this.getCardProducts()
  }
}
</script>

<style scoped>

.banner-ch-txt{
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 60px;
}

</style>

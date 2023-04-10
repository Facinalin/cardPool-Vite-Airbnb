<template>
<div id="banner" class="banner bg-black text-white d-flex flex-column justify-content-center">
    <div class="banner-txt">
      <h1 class="text-size banner-upper-text ch-font ls-10">只有卡舖</h1>
      <img src="../../assets/maxident.png" alt="" class="banner-pic">
      <h1 class="text-size banner-bottom-text ch-font ls-10">拆換自如</h1>
  </div>
  <div class=" d-flex justify-content-center mt-9">
    <button type="button" class="border-0 cta-btn bd-rd-20 btn btn-primary text-white border-primary py-2 px-4 fs-5 ch-font"><RouterLink to="/cardproducts" class="text-white cta-btn-txt fs-4">逛逛卡舖</RouterLink></button>
  </div>
  <h1 class="en-slogan en-font text-center fwt-light" style="margin-bottom:40px;margin-top: 120px;">"I wanna send my Card to you. CardPool is all it takes."</h1>
  <h1 class="en-font text-center fs-4 fwt-light" style="margin-bottom:130px;"> - Inspired by lyrics of Case 143 by Stray Kids.</h1>
</div>
  <div class="content bg-black">
    <!-- 拆卡團 -->
    <div class="container d-flex flex-wrap card-group-section">
   <div class="d-flex flex-column card-container justify-content-center">
<img src="../../assets/takeaseat.svg" alt="" class="takeaseat">
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
    <swiper :slides-per-view="slidesPerView" :space-between="spaceBetween" :autoplay="true" :loop="true" :speed="600"
  class="swiperWrapper">
    <swiper-slide class="perSlide" v-for="product in products.slice(0, 12)" :key="product.id">
      <RouterLink :to="`/product/${product.id}`">
        <img :src="product.imgUrl" alt="" class="bd-rd-20 swiperImg">
      </RouterLink>
    </swiper-slide>
  </swiper>
  </div>
  <h1 class="swiper-txt fs-1 ch-font ls-10 text-center mt-9 text-white">看看我的本命</h1>
   <!-- 舞團cta -->
  <div class="container d-flex flex-column mt-150 dance-section mb-9">
    <div class="circle-parent">
      <div class="circle"></div>
    </div>
    <div class="d-flex flex-wrap-reverse">
   <div class="txt text-white d-flex flex-column align-items-center justify-content-center">
    <h1 class="fz-60 ch-font ls-10 mb-9">揪團跳舞</h1>
    <p class="ch-font fs-5 mt-4 fwt-light px-6 ls-10 lh1-5 mb-8">不論是百人隨機舞蹈，還是小組團練，只要你肯出來，我們肯邀！</p>
    <button type="button" class="border-0 cta-btn bd-rd-20 btn btn-primary text-white border-primary py-2 px-4 fs-5 ch-font">
      <router-link to="/danceclub" class="ch-font fz-18 text-white">
        我有舞擔夢
      </router-link>
    </button>
   </div>

   <div class="dance-pic-area d-flex flex-column card-container justify-content-center">
<img src="../../assets/dance-cta.svg" alt="" class="dance-cta-img">
   </div>
  </div>
  </div>
  <div class="container d-flex mt-90 flex-wrap">
   <div class="account-img-left">
<img src="../../assets/booklet.svg" alt="" class="account-cta-img ps-lg-9 ps-sm-0 ps-xs-0">
   </div>
   <div class="account-img-right account-cta-txt d-flex flex-column justify-content-center">
    <h1 class="text-white mb-9 ch-font fs-5 mt-4 fwt-light px-6 ls-6 lh1-5" >歡迎光臨！卡舖匯集了全台灣最豐富的追星資訊，馬上加入會員，你就可以：</h1>
    <ul class="text-white fwt-light ls-6 fs-5 text-start mb-9 px-6">
      <li class="mb-1"><font-awesome-icon icon="fa-solid fa-heart" class="me-2"/>拆卡開團/ 出卡</li>
      <li class="mb-1"><font-awesome-icon icon="fa-solid fa-heart" class="me-2"/>周邊代購</li>
      <li class="mb-1"><font-awesome-icon icon="fa-solid fa-heart" class="me-2"/>舞蹈揪團</li>
      <li class="mb-1"><font-awesome-icon icon="fa-solid fa-heart" class="me-2"/>應援宣傳</li>
    </ul>
    <router-link to="/logIn" class="account-cta-link text-white bg-mainorange ch-font px-6 py-4 bd-rd-12 fs-4">成為我們的一員</router-link>
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
import { mapActions, mapState } from 'pinia'
import productsStore from '../../store/productsStore.js'

SwiperCore.use([Autoplay, Pagination])

export default {
  data () {
    return {
      slidesPerView: 6,
      spaceBetween: 55,
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
    updateSwiper () {
      if (window.innerWidth >= 1169) {
        this.slidesPerView = 6
        this.spaceBetween = 55
      }
      if (window.innerWidth <= 1168) {
        this.slidesPerView = 5
        this.spaceBetween = 40
      } if (window.innerWidth <= 900) {
        this.slidesPerView = 4
        this.spaceBetween = 60
      } if (window.innerWidth <= 779) {
        this.slidesPerView = 3
        this.spaceBetween = 60
      } if (window.innerWidth <= 550) {
        this.slidesPerView = 2
        this.spaceBetween = 30
      }
      if (window.innerWidth <= 500) {
        this.slidesPerView = 1
        this.spaceBetween = 30
      }
    },
    ...mapActions(productsStore, ['getCardProducts'])
  },
  computed: {
    ...mapState(productsStore, ['products', 'isLoading'])
  },
  onBeforeUnmount () {
    window.removeEventListener('resize', this.updateSwiper)
  },
  mounted () {
    window.addEventListener('resize', this.updateSwiper)
    this.updateSwiper(this.slidesPerView)
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

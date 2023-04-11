<template>
  <div class="activity-wrapper bg-maingray">
  <div class="container text-white ch-font fwt-light py-2">
    <div class="row py-8">
      <div class="col-lg-6" v-for="activity in activities" :key="activity.imgUrl">
        <RouterLink :to="`/${activity.router}`">
        <div class="perBtn px-3 mb-6">
      <h1 class="ls-10 text-white fwt-light">{{ activity.name }}</h1>
      <img :src="activity.imgUrl" :alt="activity.title" class="activity-btn-pic bd-rd-20">
    </div>
      </RouterLink>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
  data () {
    return {
      activities: [
        {
          name: '應援',
          imgUrl: 'https://i.imgur.com/ELMJeCE.jpg',
          router: 'fanmerch'
        }, {
          name: '跳舞',
          imgUrl: 'https://i.imgur.com/TGE8JQL.png',
          router: 'danceclub'
        },
        {
          name: '抽獎',
          imgUrl: 'https://i.imgur.com/7j257dx.png',
          router: 'fandrawevent'
        },
        {
          name: '飯繪',
          imgUrl: 'https://i.imgur.com/sN9hATo.png',
          router: 'fanart'
        }]
    }
  },
  components: {
    RouterLink
  }
}
</script>

<style>
.check-product:hover {
  color: #ffffff;
}
</style>

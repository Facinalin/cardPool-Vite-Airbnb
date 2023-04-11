<template>
    <div v-if="isLoading" class="container d-flex justify-content-center">
 <img src="https://i.imgur.com/hRNLPLv.gif" alt="heart.gif" class="loadingGif">
  </div>
    <div class="container container-sm container-lg container-xl py-6">
        <div class="row">
            <div class="col-lg-12 ch-font">
                <div v-for="danceGroup in danceGroups" :key="danceGroup.id" class="perClub bd-rd-12 border border-primary py-4 px-6 mb-3">
                  <RouterLink :to="`/dancegroup/${danceGroup.id}`" class="d-flex flex-wrap justify-content-between">
                    <div class="start d-flex">
                    <div class="me-4 dance-per-group">
                        <img :src="danceGroup.imageUrl" :alt="danceGroup.title" class="perClub-pic bd-rd-12">

                    </div>
                    <div class="per-club-txt d-flex align-items-center">
                        <div class="d-flex flex-column justify-content-between py-2 me-4">
<h1 class="fs-3 en-font mb-4">{{danceGroup.title}}</h1>
<h2 class="text-primary fs-3">{{danceGroup.county}}</h2></div>
<div class="dance-pra">
<p class="mb-3 text-aidgray">預計 <span class="text-mainorange">{{ (new Date(danceGroup.d_day * 1000)).getMonth()+1 }}月{{ (new Date(danceGroup.d_day * 1000)).getDate() }}日</span > 表演</p>
<p class="mb-3 text-aidgray">一練 <span class="text-maingray">{{ (new Date(danceGroup.first_practice * 1000)).getMonth()+1 }}月{{ (new Date(danceGroup.first_practice * 1000)).getDate() }}日</span></p>
<p class="text-aidgray">主揪 <span class="text-maingray">{{danceGroup.leader}}</span></p>
</div>
                    </div>
                </div>
                    <div class="club-btn-group d-flex flex-column">
                        <p class="text-end">名額 <span class="text-mainorange">{{danceGroup.leftMember}}</span> 位</p>
                        <div class="d-flex align-items-end mt-3">
    <button type="button" class="btn btn-mainorange bd-rd-12 text-white" @click="signUpDance(danceGroup.id)">查看詳情</button>
    </div>

</div>
</RouterLink>
                </div>
            </div>
            <div class="col-lg-12 d-flex justify-content-center pt-9">
              <paginationComponent :pagination="pagination" :path="path" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productsStore from '../../store/productsStore.js'
import paginationComponent from '../../components/PaginationView.vue'
import axios from 'axios'
// import Swal from 'sweetalert2'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      path: ''
    }
  },
  components: {
    paginationComponent
  },
  methods: {
    signUpDance (danceGroupId) {
      this.$router.push(`/dancegroup/${danceGroupId}`)
    },
    getDanceGroupCart () {
      const curCartGetUrl = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      axios.get(curCartGetUrl)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    ...mapActions(productsStore, ['getDanceGroupProduct'])
  },
  computed: {
    ...mapState(productsStore, ['danceGroups', 'pagination', 'isLoading'])
  },
  mounted () {
    this.path = this.$route.path
    this.getDanceGroupProduct(this.path)
  }
}
</script>

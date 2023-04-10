<template>
    <div class="container container-sm container-lg container-xl py-6">
        <div class="row">
            <div class="col-lg-12 ch-font">
                <div v-for="danceGroup in danceGroups" :key="danceGroup.id" class="perClub bd-rd-12 border border-primary d-flex flex-wrap justify-content-between py-4 px-6 mb-3">
                    <div class="start d-flex">
                    <div class="me-4 dance-per-group">
                       <RouterLink :to="`/dancegroup/${danceGroup.id}`" class="text-secondary check-product">
                        <img :src="danceGroup.imageUrl" alt="" class="perClub-pic bd-rd-12">
                      </RouterLink>
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
                    <div class="club-btn-group d-flex flex-column ">
                        <p class="text-end">還差 <span class="text-mainorange">{{danceGroup.leftMember}}</span> 位</p>
                        <div class="d-flex align-items-end mt-3">
    <button type="button" class="btn btn-secondary bd-rd-12 me-2 text-white">有興趣</button>
    <button type="button" class="btn btn-mainorange bd-rd-12 text-white">報名</button>
    </div>

</div>
                </div>
            </div>
            <div class="col-lg-12 d-flex justify-content-center pt-9">
              <pagination-component :pagination="pagination" :path="path"></pagination-component>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productsStore from '../../store/productsStore.js'
import paginationComponent from '../../components/PaginationView.vue'

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
    ...mapActions(productsStore, ['getDanceGroupProduct'])
  },
  computed: {
    ...mapState(productsStore, ['danceGroups', 'pagination'])
  },
  mounted () {
    this.path = this.$route.path
    this.getDanceGroupProduct(this.path)
  }
}
</script>

<template>
    <div class="container py-6">
        <h3></h3>
        <div class="row">
            <div class="col-lg-12 ch-font">
                <div v-for="danceGroup in danceGroups" :key="danceGroup.id" class="perClub bd-rd-12 border border-primary d-flex justify-content-between py-4 px-6 mb-3">
                    <div class="start d-flex">
                    <div class="me-4 dance-per-group">
                        <a href="" >
                        <img :src="danceGroup.imageUrl" alt="" class="perClub-pic bd-rd-12">
                    </a>
                    </div>
                    <div class="per-club-txt d-flex align-items-center">
                        <div class="d-flex flex-column justify-content-between py-2 me-4">
<h1 class="fs-3 en-font mb-4">{{danceGroup.title}}</h1>
<h2 class="text-primary fs-3">{{danceGroup.county}}</h2></div>
<div>
<p class="mb-3">預計 <span class="dark-pink">{{ (new Date(danceGroup.d_day * 1000)).getMonth()+1 }}月{{ (new Date(danceGroup.d_day * 1000)).getDate() }}日</span > 表演</p>
<p class="mb-3">一練 <span class="dark-pink">{{ (new Date(danceGroup.first_practice * 1000)).getMonth()+1 }}月{{ (new Date(danceGroup.first_practice * 1000)).getDate() }}日</span></p>
<p>主揪 <span class="text-secondary">{{danceGroup.leader}}</span></p>
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
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'Pinia'
import productsStore from '../../store/productsStore.js'

export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(productsStore, ['getDanceGroupProduct'])
  },
  computed: {
    ...mapState(productsStore, ['danceGroups'])
  },
  mounted () {
    this.getDanceGroupProduct()
  }
}
</script>

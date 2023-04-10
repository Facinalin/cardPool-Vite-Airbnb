<template>
    <div v-if="isLoading" class="container d-flex justify-content-center">
   <img src="https://i.imgur.com/hRNLPLv.gif" alt="heart.gif" class="loadingGif">
    </div>
      <div v-else class="my-5 container">
        <div class="row gx-5">
          <div class="col-lg-12">
            <div class="d-flex flex-wrap mt-5 text-maingray">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed py-3 px-3 fs-5 dark-pink" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  <font-awesome-icon icon="fa-solid fa-user" class="me-3 dark-pink fs-5"/>
                  篩選成員
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <div class="memberFilter">
                    <div class="first-step container-fluid d-flex justify-content-center mb-60">
        <div class="filterWrapper d-flex flex-wrap justify-content-center en-font">
      <div class="member-row d-flex justify-content-between flex-wrap mb-2">
    <div v-for="perMember in domLeftMember" :key="perMember.member" class="perMemberFilter d-flex flex-column justify-content-center align-items-center mb-2" @click="(evt) =>filterMember(perMember, evt)">
            <div class="member-img mb-1" :class="{ 'memberDisabled': !perMember.left }">
                <img class="per-member" :src="perMember.imgUrl" :alt="perMember.member" :data-id="perMember.memberNo">
            </div>
            <h2 class="per-member-txt text-maingray text-center mb-1" :class="{ 'txtDisabled': !perMember.left }">{{ perMember.member }}</h2>
          </div>

      </div>
<!--  -->

     </div>
    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="accordion accordion-flush bd-top-opa mb-9" id="channelAccordionFlush">
            <div class="accordion-item">
              <h2 class="accordion-header" id="channelAccordionFlushHeading">
                <button class="accordion-button collapsed py-3 px-3 fs-5 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#channelAccordionFlushCollapse" aria-expanded="false" aria-controls="channelAccordionFlushCollapse">
                  <font-awesome-icon icon="fa-solid fa-tag" class="me-3 text-primary fs-5" />
                  篩選通路
                </button>
              </h2>
              <div id="channelAccordionFlushCollapse" class="accordion-collapse collapse" aria-labelledby="channelAccordionFlushHeading" data-bs-parent="#channelAccordionFlush">
                <div class="accordion-body">
                  <Multiselect
      v-model="channels.value"
      v-bind="channels"
      placeholder="請選擇通路"
      class="en-font"
    ></Multiselect>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          <div class="col-lg-12 d-flex justify-content-center mb-8">
            <button type="button" class="btn btn-primary text-white fs-5 bd-rd-12 py-2 px-8" @click="filterCardGroup">
              <font-awesome-icon v-if="loadingStatus.loadingItem === true " icon="fa-solid fa-spinner" class="me-1" />
              開始篩選</button>
          </div>
          <div v-if="!cardGroupBeenFiltered" class="row">
        <div class="col-lg-3 col-md-4 col-sm-12 my-5 card-group" v-for="product in cardGroupProduct" :key="product.id">
    <div class="card rounded-0 border-0">
    <img :src="product.imgUrl" class="card-img-top" alt="">
    <div class="card-body px-0 py-4 text-center">
      <h5 class="card-title fs-6 mb-3 text-maingray">{{ product.title }}</h5>
      <p class="card-text fs-6 pri-aux">{{ product.price }}元</p>
      <p class="card-text fs-6 dark-pink">{{ product.channel }}</p>
 <RouterLink :to="`/cardgroup/${product.id}`" class="nav-link cta-btn text-white addBtn card-text fs-6 ls-4 pri-aux bg-primary text-white my-3 py-2 bd-rd-12">
          <font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="me-1" />
          差<strong>{{ ((Object.values(product.leftMember)).filter(el => el === true)).length }}</strong>位成團
        </RouterLink>
      <div class="d-flex justify-content-center mt-4">
    </div>
    </div>
  </div>
  </div>
</div>
<div v-if="cardGroupBeenFiltered && filteredCardGroupList.length > 0" class="row">
        <div class="col-lg-3 col-md-4 col-sm-12 my-5 card-group" v-for="product in filteredCardGroupList" :key="product.id">
    <div class="card rounded-0 border-0">
    <img :src="product.imgUrl" class="card-img-top" alt="">
    <div class="card-body px-0 py-4 text-center">
      <h5 class="card-title fs-6 mb-3 text-maingray">{{ product.title }}</h5>
      <p class="card-text fs-6 pri-aux">{{ product.price }}元</p>
      <p class="card-text fs-6 dark-pink">{{ product.channel }}</p>
 <RouterLink :to="`/cardgroup/${product.id}`" class="nav-link cta-btn text-white addBtn card-text fs-6 ls-4 pri-aux bg-primary text-white my-3 py-2 bd-rd-12">
          <font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="me-1" />
          差<strong>{{ ((Object.values(product.leftMember)).filter(el => el === true)).length }}</strong>位成團
        </RouterLink>
      <div class="d-flex justify-content-center mt-4">
    </div>
    </div>
  </div>
  </div>
</div>
<div v-if="cardGroupBeenFiltered && filteredCardGroupList.length === 0">
<h2 class="text-mainorange fs-5">無符合商品！請修改篩選條件！</h2>
</div>
  </div>
  </div>
  </template>

<script>
import Swal from 'sweetalert2'
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import productsStore from '../../store/productsStore.js'
import Multiselect from '@vueform/multiselect'
// import Loading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/css/index.css'
// const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      cardGroupBeenFiltered: false,
      filteredCardGroupList: [],
      loadingStatus: {
        loadingItem: ''
      },
      domLeftMember: [
        {
          memberNo: '1',
          member: 'Bangchan',
          imgUrl: 'https://i.imgur.com/5PlS2aH.png',
          left: true
        },
        {
          memberNo: '2',
          member: 'Leeknow',
          imgUrl: 'https://i.imgur.com/ATWXtR9.png',
          left: true
        },
        {
          memberNo: '3',
          member: 'Changbin',
          imgUrl: 'https://i.imgur.com/XhAHWYu.png',
          left: true
        },
        {
          memberNo: '4',
          member: 'Hyunjin',
          imgUrl: 'https://i.imgur.com/AANylPt.png',
          left: true
        },
        {
          memberNo: '5',
          member: 'Han',
          imgUrl: 'https://i.imgur.com/UQ7he1p.png',
          left: true
        },
        {
          memberNo: '6',
          member: 'Felix',
          imgUrl: 'https://i.imgur.com/UFTzeFH.png',
          left: true
        },
        {
          memberNo: '7',
          member: 'Seungmin',
          imgUrl: 'https://i.imgur.com/UiFtZSu.png',
          left: true
        },
        {
          memberNo: '8',
          member: 'I.N',
          imgUrl: 'https://i.imgur.com/3JdX3kx.png',
          left: true
        },
        {
          memberNo: '9',
          member: 'All',
          imgUrl: 'https://i.imgur.com/1WwJvUn.png',
          left: true
        }
      ],
      channels: {
        mode: 'tags',
        value: [],
        closeOnSelect: false,
        options: [
          { value: 'Apple Music', label: 'Apple Music' },
          { value: 'Aladin', label: 'Aladin' },
          { value: 'JYP', label: 'JYP' },
          { value: 'KTown4U', label: 'KTown4U' },
          { value: 'Music Planet', label: 'Music Planet' },
          { value: 'Sony', label: 'Sony' },
          { value: 'SoundWave', label: 'SoundWave' },
          { value: 'Target', label: 'Target' },
          { value: 'WithMuu', label: 'WithMuu' },
          { value: 'YES24', label: 'YES24' },
          { value: '阿拉丁', label: '阿拉丁' },
          { value: '一直娛', label: '一直娛' }
        ],
        searchable: false,
        createOption: true
      },
      nomatched: false
    }
  },
  components: {
    RouterLink,
    Multiselect
  },
  methods: {
    // 按鈕區域個人與全員判斷
    filterMember (item, evt) {
      // console.log(item, evt.target)
      const allFilter = document.querySelectorAll('.per-member')
      const allMemberOption = allFilter[8]
      // if (!evt.target.parentNode.classList.contains('memberDisabled')) {
      //   evt.target.classList.toggle('active-lg')
      // }
      allFilter.forEach((el, i) => {
        const clickedId = evt.target.getAttribute('data-id')
        // 清個人留9：如果點到的是9號按鈕，且，9號按鈕元素沒有紫邊的話，先將1-9號的紫邊移除，再幫9號加上紫邊。
        if (clickedId === '9' && !evt.target.classList.contains('active-lg')) {
          allFilter.forEach(per => {
            per.classList.remove('active-lg')
            console.log(per.getAttribute('data-id'))
          })
          // allFilter[i].classList.remove('active-lg')
          evt.target.classList.add('active-lg')
          return
        }
        // 清9留個人：如果點到的不是9號按鈕，且，9號按鈕子層元素的class有紫邊的話，將9號按鈕的紫邊移除。
        if (clickedId !== '9' && allMemberOption.classList.contains('active-lg')) {
          allMemberOption.classList.remove('active-lg')
          evt.target.classList.add('active-lg')
        } else {
          evt.target.classList.toggle('active-lg')
        }
      })
      const chosen = document.querySelectorAll('.active-lg')
      if (chosen) {
        if (chosen.length === 8) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '選擇全部成員請點All按鈕',
            showConfirmButton: false,
            timer: 1800
          })
          allFilter.forEach(el => {
            el.classList.remove('active-lg')
          })
        }
      }
    },
    // 卡團篩選條件
    filterCardGroup () {
      this.cardGroupBeenFiltered = false
      const chosenMember = document.querySelectorAll('.active-lg')
      const filterCardGroupProduct = [...this.cardGroupProduct]
      if (chosenMember.length === 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '尚未選擇成員！',
          showConfirmButton: false,
          timer: 1800
        })
      }
      chosenMember.forEach(el => {
        const dataId = el.getAttribute('data-id')
        // 如果dataid為'9'的foreach完全不一樣
        filterCardGroupProduct.forEach((per, i, arr) => {
          if (arr[i].leftMember[dataId] === false) {
            arr.splice(i, 1)
          }
        })
      })
      console.log(filterCardGroupProduct)
      // 如果連第一層filter都沒有產品，就可以值接回傳無符合。
      if (filterCardGroupProduct.length === 0) {
        this.cardGroupBeenFiltered = true
        console.log('無符合商品，請修改篩選條件！')
      }
      // this.channels.value為一個array
      const chosenChannels = this.channels.value
      const finalData = []
      chosenChannels.forEach((el, index, array) => {
        filterCardGroupProduct.forEach((per, i, arr) => {
          if (arr[i].channel === array[index]) {
            finalData.push(arr[i])
          }
        })
      })
      console.log(this.channels.value)
      console.log(finalData)
      this.filteredCardGroupList = finalData
      this.cardGroupBeenFiltered = true
    },
    ...mapActions(productsStore, ['getCardGroupProduct'])
  },
  computed: {
    ...mapState(productsStore, {
      cardGroupProduct: state => state.cardGroupProduct,
      isLoading: state => state.isLoading
    })
  },
  mounted () {
    window.scrollTo(0, 0)
    this.getCardGroupProduct()
  }
}</script>

  <style src="@vueform/multiselect/themes/default.css">
      .product-pic{
      width: 130px;
      height: 130px;
      object-fit: cover;
      }
      .product-btn{
      color: #9B9BE3;
  }

  .product-btn:hover{
      color: #ffffff;
      background: #9B9BE3
      }

  .card .card-img-top{
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 0px;
  }
  .col-lg-3 .card{
    max-height: 550px;
  }

  .pri-aux{
    color: #7171D0;
  }

  </style>

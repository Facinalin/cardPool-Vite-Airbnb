<template>
    <div class="container my-5">
        <div class="row">
            <div class="product-img col-md-12 col-lg-5 mt-9 bordr border-maingray">
                <div class="d-flex justify-content-center mb-6">
                    <img :src="product.imgUrl" alt="" class="cardImg"></div>
        </div>
        <!--商品選項-右-->
        <div class="col-md-12 col-lg-7 ps-lg-9 ch-font mt-9">
          <h1 class="mb-3 fs-1 lh1-5">{{ product.title }}</h1>
    <p class="mb-1 fs-7">卡團編號：#{{ product.id }}</p>
    <p class="mb-2 dark-pink fs-7">{{ product.channel }}</p>
    <div class="member-option">
    <div class="member-row member-row-sm d-flex justify-content-between flex-wrap mb-2">
    <div v-for="perMember in domLeftMember" :key="perMember.member" class="perMemberOption d-flex flex-column justify-content-center align-items-center mb-2" :class="{ 'red-area': perMember.note === 'mustChoose', 'blue-area': perMember.note === 'scarcity', 'white-area': perMember.note === 'normal' }" @click="(evt) =>chooseMember(perMember, evt)">
            <div class="member-img-sm mb-1" :class="{ 'memberDisabled': !perMember.left }">
                <img class="per-member small-head" :src="perMember.imgUrl" :alt="perMember.member" :data-id="perMember.memberNo">
            </div>
            <h2 class="text-maingray text-center fs-7 mb-1" :class="{ 'txtDisabled': !perMember.left }">{{ perMember.member }}</h2>
          </div>

      </div>

    </div>

      <h2 class="text-primary fs-3">${{ product.price }}元</h2>

      <div class="px-lg-2 d-flex flex-column align-items-end mt-50">
        <p class="fs-7 mb-1">＊請仔細檢查卡位成員後再送出，送出後更改成員若影響到排卡順序自行負擔。</p>
        <p v-if="mustWithScarce === true && product.mustChoose.length === product.scarcity.length" class="fs-7 mb-1">＊帶藍區必帶紅區（1:1帶），請確認是否達成必填門檻，否則將無法送出。</p>
      </div>
          </div>
        <div class="btn-area btns d-flex justify-content-end">
          <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 me-3 confirmJoinBtn d-flex bd-rd-12" @click="confirmJoin(product.id, memberQty)" :class="{'disabled':loadingStatus.loadingItem === product.id}">
            <font-awesome-icon v-if="loadingStatus.loadingItem === product.id" icon="fa-solid fa-spinner" class="me-1" />
            確認卡位<span class="memberQty">{{ memberQty }}</span></button>
          <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 bd-rd-12">收藏<font-awesome-icon icon="fa-solid fa-heart" class="ms-1"/></button>
      </div>
        <!--拆卡注意事項-全-->
        <div class="notice col-12 border border-2 border-secondary rounded-xxl d-flex flex-wrap mt-5 mb-80">
          <p class="col-sm-12 col-md-6 col-lg-6 py-4 px-5">
            Q：我要如何知道成團與否？<br>
            （1) 請至註冊信箱內檢查email。<br>
            （2) 請至『會員專區>收藏與排卡>卡位狀態查詢』查看成團進度。
        </p>
        <p class="col-sm-12 col-md-6 col-lg-6 py-4 px-5">
            Q：我要如何取消卡位？<br>
            * 本站取消規定：當初卡的成員位數全部取消。請私訊賣家告知取消理由，賣方可從後台手動取消。
        </p>
        </div>
<!-- 下方客製商品敘述及運費注意事項 -->
        <div class="col-12 ch-font">
          <div class="product-details">
          <div class="details-1 bd-top-opa col-12 d-flex flex-wrap mt-5 text-maingray">
            <div class="seller col-12 py-3 px-3 d-flex align-items-center justify-content-between">
              <div class="seller-left d-flex align-items-center">
                <img class="seller-pic" src="https://i.imgur.com/YxLmY3t.png" alt="sellerpic">
          <h5 class="ms-2">Tracy</h5>
    <p class="ms-6">主拆成團 <span class="text-primary">4</span> 筆</p>
            </div>
              <div class="seller-right">
              <button type="button" class="seller-btn btn btn-white border-secondary rounded-xxl py-1 px-2 me-2">
                <font-awesome-icon icon="fa-solid fa-comment" class="me-3 text-secondary fs-5"/>
                訊息</button>
              <a href="#" class="seller-btn btn btn-white border-secondary rounded-xxl py-1 px-2">查看賣場</a>
            </div>
            </div>
          <div class="internationalFee col-12 py-3 px-3 bd-top-opa d-flex justify-content-between">
            <p>
              <font-awesome-icon icon="fa-solid fa-plane" class="me-3 text-primary fs-5"/>
            國際運費
          </p>
          <p v-if="international.complement === true" class="text-mainorange pe-1">需二補</p>
          <p v-else class="text-orange pe-1">無需二補</p>
          <p v-if="international.amount !== 0" class="text-mainorange pe-1">{{ international.amount }}元</p>
          </div>
          <div class="accordion accordion-flush bd-top-opa" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed py-3 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  <font-awesome-icon icon="fa-solid fa-truck" class="me-3 text-primary fs-5"/>
                  國內運費
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                 <ul class="domesticCourier">
                  <li>{{ domestic.courier }}{{ domestic.amount }}元{{ domestic.courier_Note }}</li>
                 </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="product-description col-12 bd-top-opa py-2 px-3 mb-8">
            <p class="description">
              {{ product.description }}
            </p>
          </div>
            <ul class="pic-area">
          </ul>

          </div>
        </div>

        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapState, mapActions } from 'Pinia'
import cartsStore from '../../store/cartsStore.js'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {
      },
      domestic: {
        amount: 0,
        courier: '',
        courier_Note: ''
      },
      international: {
        amount: 0,
        complement: ''
      },
      finalLeftMember: {},
      domLeftMember: [
        {
          memberNo: '1',
          member: 'Bangchan',
          imgUrl: 'https://i.imgur.com/5PlS2aH.png',
          left: false
        },
        {
          memberNo: '2',
          member: 'Leeknow',
          imgUrl: 'https://i.imgur.com/ATWXtR9.png',
          left: false
        },
        {
          memberNo: '3',
          member: 'Changbin',
          imgUrl: 'https://i.imgur.com/XhAHWYu.png',
          left: false
        },
        {
          memberNo: '4',
          member: 'Hyunjin',
          imgUrl: 'https://i.imgur.com/AANylPt.png',
          left: false
        },
        {
          memberNo: '5',
          member: 'Han',
          imgUrl: 'https://i.imgur.com/UQ7he1p.png',
          left: false
        },
        {
          memberNo: '6',
          member: 'Felix',
          imgUrl: 'https://i.imgur.com/UFTzeFH.png',
          left: false
        },
        {
          memberNo: '7',
          member: 'Seungmin',
          imgUrl: 'https://i.imgur.com/UiFtZSu.png',
          left: false
        },
        {
          memberNo: '8',
          member: 'I.N',
          imgUrl: 'https://i.imgur.com/3JdX3kx.png',
          left: false
        }
      ],
      memberQty: 0,
      loadingStatus: {
        loadingItem: ''
      },
      ifLogged: false,
      mustWithScarce: false
    }
  },
  methods: {
    getPerProduct () {
      // /v2/api/{api_path}/product/{id}
      const { id } = this.$route.params
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/product/${id}`
      this.$http.get(url)
        .then(res => {
          this.product = res.data.product
          console.log(this.product)
          // 原本沒有要寫這段，但不清楚到底是api或proxy有問題，每四次開發渲染時成功一次，報錯三次，只好這樣改
          this.domestic.amount = res.data.product.domestic_Transport.amount
          this.domestic.courier = res.data.product.domestic_Transport.courier
          this.domestic.courier_Note = res.data.product.domestic_Transport.courier_Note
          this.international.amount = res.data.product.international_Transport.amount
          this.international.complement = res.data.product.international_Transport.complement
          const normalMember = { ...this.product.leftMember }
          const checkNull = Object.values(normalMember)
          const checkTrue = []
          for (let i = 0; i < checkNull.length; i++) {
            if (normalMember[i] === null) {
              delete normalMember[i]
            }
            if (normalMember[i] === true) {
              checkTrue.push(`${i}`)
            }
          }
          this.finalLeftMember = normalMember
          if (this.product.mustChoose) {
            this.mustWithScarce = true
            this.product.mustChoose.forEach(el => {
              this.domLeftMember.forEach(per => {
                if (per.memberNo === el) {
                  per.note = 'mustChoose'
                }
              })
            })
          }
          if (this.product.scarcity) {
            this.product.scarcity.forEach(el => {
              this.domLeftMember.forEach(per => {
                if (per.memberNo === el) {
                  per.note = 'scarcity'
                }
              })
            })
          }
          checkTrue.forEach(el => {
            this.domLeftMember.forEach(per => {
              if (per.memberNo === el) {
                per.left = true
              }
              if (per.memberNo === el && !per.note) {
                per.note = 'normal'
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    chooseMember (item, evt) {
      if (!evt.target.parentNode.classList.contains('memberDisabled')) {
        evt.target.classList.toggle('activeSm')
        if (evt.target.classList.contains('activeSm')) {
          this.memberQty += 1
        } else {
          this.memberQty -= 1
        }
      }
    },
    confirmJoin (curProductId, curQty) {
      const chosenMemberDom = document.querySelectorAll('.perMemberOption img')
      const chosenMember = []
      chosenMemberDom.forEach(el => {
        const dataId = el.getAttribute('data-id')
        if (el.classList.contains('activeSm')) {
          chosenMember.push(dataId)
        }
      })
      // 記得驗證失敗要清空chosenMember
      // 同一卡團不能加入購物車兩次
      const checkClicked = [...chosenMemberDom].some(item => item.classList.contains('activeSm'))
      console.log(checkClicked)
      if (!checkClicked) {
        // 驗證是否有選擇至少一名成員
        // 也可以用memberQty，因為怕memberQty出錯所以另外寫
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '請選擇至少一名成員！',
          showConfirmButton: false,
          timer: 1800
        })
      } else {
        const redArea = document.querySelector('.red-area')
        const blueArea = document.querySelector('.blue-area')
        // 不用all是因為只要有一組紅藍區域就要啟動紅藍驗證
        const perMemberRed = document.querySelectorAll('.red-area .per-member')
        const perMemberBlue = document.querySelectorAll('.blue-area .per-member')
        // 紅藍驗證
        // 紅藍一比一帶區
        if (redArea && blueArea) {
          let countRed = 0
          let countBlue = 0
          perMemberRed.forEach(el => {
            if (el.classList.contains('activeSm')) {
              countRed++
            }
          })
          perMemberBlue.forEach(el => {
            if (el.classList.contains('activeSm')) {
              countBlue++
            }
          })
          if (countRed !== countBlue) {
            Swal.fire({
              icon: 'error',
              title: '無法卡位！',
              text: '紅區跟藍區須1:1帶！',
              allowOutsideClick: true
            })
            return
          }
        }
        this.loadingStatus.loadingItem = curProductId
        let cart = {}
        const currentCart = this.cardGroupCart.find(item => item.product_id === curProductId)
        if (currentCart) {
          this.loadingStatus.loadingItem = ''
          const chosenMemberDom = document.querySelectorAll('.perMemberOption img')
          chosenMemberDom.forEach(el => {
            el.classList.remove('activeSm')
          })
          this.memberQty = 0
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '本團已經有你的卡位紀錄，欲編輯成員請至後台修改！',
            showConfirmButton: true
          })
          return
          // httpRequest = 'put'
          // url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart/${currentCart.id}`
          // cart = {
          //   product_id: curProductId,
          //   qty: curQty
          // }
        } else {
        // const indicateProduct = products.find(el => el.id === curProductId)
          cart = {
            product_id: curProductId, // 這個相當於卡團編號
            qty: curQty, // 總金額是price*memberQty
            category: '拆卡',
            chooseMember: chosenMember, // 買家賣家需要核對的就是成員，跟張數chooseMember.length進而計算總價格
            user: { name: 'Mr.Demo', creatorSuccessHistory: 3, participantSuccessHistory: 5 }, // 只能先寫死資料
            created_at: new Date().getTime()// 列表時列出哪個比較早排
          }
        }
        const httpRequest = 'post'
        const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
        this.checkAdminToAdd(cart, url, httpRequest)
      }
      // 購物車api資料結構參考：
      //       {
      //   "data": {
      //     "category":"拆卡",
      //     "product_id": "-L9tH8jxVb2Ka_DYPwng", //這個相當於卡團編號
      //     "qty": 1, //數量是price*memberQty
      //     "chooseMember": ['1','3'], //買家賣家需要核對的就是成員，跟張數chooseMember.length進而計算總價格
      //     "user": { successRate:22, name:'Mr.Demo'}, //只能先寫死資料
      //     "created_at": //列表時列出哪個比較早排
      //   }
      // }
      // 取消卡位的話：買家：刪除購物車id，則賣家那邊也看不到了
    },
    joinGroupLining (cart, purl, httpRequest) {
      axios[httpRequest](purl, { data: cart })
        .then(res => {
          this.loadingStatus.loadingItem = ''
          this.memberQty = 0
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '成功卡位，請至後台查詢排卡狀態!',
            showConfirmButton: false,
            timer: 1800
          })
          const chosenMemberDom = document.querySelectorAll('.perMemberOption img')
          chosenMemberDom.forEach(el => {
            el.classList.remove('activeSm')
          })
          this.getCardGroupCart()
        })
        .catch(err => {
          this.loadingStatus.loadingItem = ''
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    checkAdminToAdd (cart, purl, httpRequest) {
      const url = `${VITE_APP_URL2}/api/user/check`
      axios.post(url)
        .then((res) => {
          this.ifLogged = true
          this.joinGroupLining(cart, purl, httpRequest)
        })
        .catch((err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1800
          })
          this.$router.push('/logIn')
        })
    },
    ...mapActions(cartsStore, ['getCardGroupCart'])
  },
  computed: {
    ...mapState(cartsStore, ['cardGroupCart'])
  },
  mounted () {
    this.getCardGroupCart()
    this.getPerProduct()
  }
}
</script>

<style>
.product-img{
    max-width: 100%;
    height: auto;
}

.cardImg{
    max-width: 400px;
    border-radius: 12px;
    object-fit: cover;
}

.product-btn{
    color: #9B9BE3;
}

.product-btn:hover{
    color: #ffffff;
    background: #9B9BE3
    }

.notice{
    margin-top: 7px;
    position: relative;
    line-height: 2;
    border-radius: 20px;
}
</style>

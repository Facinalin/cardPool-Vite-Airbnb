<template>
    <div class="container container-sm container-md container-lg mb-9 border-bottom border border-mainorange pb-9">
       <div class="row">
         <!--結帳步驟頁一-->
        <div class="col-lg-12">
            <ul class="d-flex my-9 mx-6 justify-content-center checkout-step px-2 en-font">
    <li class="step px-md-4 px-1 fs-3 d-flex align-items-center"><div class="step-num" :class="{'navigate': ifFirstStep}"><p class="num">1</p></div><p class="fs-6 ms-md-4 ms-1 fs-sm-7">購物明細</p></li>
    <li class="step px-md-4 px-1 fs-3 d-flex align-items-center"><div class="step-num" :class="{'navigate': ifSecondStep}"><p class="num">2</p></div><p class="fs-6 ms-md-4 ms-1 fs-sm-6">付款方式</p></li>
    <li class="step px-md-4 px-1 fs-3 d-flex align-items-center"><div class="step-num" :class="{'navigate': ifThirdStep}"><p class="num">3</p></div><p class="fs-6 ms-md-4 ms-1 fs-sm-6">最終確認</p></li>
</ul>
        </div>
        <div v-if="!carts.length && ifThirdStep===false" class="col-lg-12">
          <h4 class="fs-4 text-center">購物車尚無商品！</h4>
        </div>
        <!--S1-1.購物車最後確認-->
        <div v-if="ifFirstStep" class="pink-box total-detail col-lg-12 border-top border-bottom border-6 border-secondary" :class="{'border-0':!carts.length}">
            <div class="row gx-6">
            <div class="col-lg-7">
            <router-view name="cart"></router-view>
        </div>
        <div class="col-lg-5">
            <router-view name="orderInfo" @post-new-order="postNewOrder"></router-view>
        </div>
    </div>
        </div>

              <div v-if="ifSecondStep" class="col-lg-6">
                <h4 class="fs-4 text-center text-primary mb-3 fwt-heavy">訂單資料</h4>
              <ul class="mb-8 fs-5 border border-primary border-2 py-4 px-8 bd-rd-12">
                    <li class="fs-6 mb-2"><span class="text-maingray fw-heavy">訂單成立時間：</span><span class="text-primary">{{ (new Date(curOrder.create_at)).getMonth()+1 }}月{{ (new Date(curOrder.create_at)).getDate() }}日{{ (new Date(curOrder.create_at)).getHours() }}:{{ (new Date(curOrder.create_at)).getMinutes() }}</span></li>
                    <li class="fs-6 mb-2"><span class="text-maingray fw-heavy">訂單編號：</span><span class="text-primary">{{ curOrderId }}</span></li>
                    <li class="fs-6 mb-2"><span class="text-maingray fw-heavy">訂單總額：</span><span class="text-mainorange">{{ finalTotal + courierTotal }}</span>元</li>
                    <li><span class="text-maingray fw-heavy">訂單狀態：</span><span class="text-mainorange">待付款</span></li>
                  </ul>
                </div>
                  <div v-if="ifSecondStep" class="col-lg-6">
                  <h4 class="fs-4 text-center text-primary mb-3 fwt-heavy">運送資料</h4>
                  <ul class="mb-8 fs-5 bg-primary text-white py-4 px-8 bd-rd-12 d-flex flex-column justify-content-between">

                    <!-- <li class="fs-6 mb-2"><span class="fw-heavy">聯絡信箱：</span>{{ curOrder.user.email }}</li>
                    <li class="fs-6 mb-2"><span class="fw-heavy">取貨人姓名：</span>{{ curOrder.user.name }}</li>
                    <li class="fs-6 mb-2"><span class="fw-heavy">取貨人手機：</span>{{ curOrder.user.tel }}</li>
                    <li class="fs-6"><span class="fw-heavy">寄送地址：</span>{{ curOrder.user.address }}</li> -->
                    <li class="fs-6 mb-2"><span class="fw-heavy">聯絡信箱：</span></li>
                    <li class="fs-6 mb-2"><span class="fw-heavy">取貨人姓名：</span></li>
                    <li class="fs-6 mb-2"><span class="fw-heavy">取貨人手機：</span></li>
                    <li class="fs-6"><span class="fw-heavy">寄送地址：</span></li>
                  </ul>
                </div>
            <!--  -->

          <div v-if="ifSecondStep" class="col-lg-12">
            <div class="accordion accordion-flush bd-top-opa mb-9" id="orderAccordionFlush">
            <div class="accordion-item">
              <h2 class="accordion-header" id="orderAccordion">
                <button class="accordion-button collapsed py-3 px-3 fs-5 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#channelAccordionFlushCollapse" aria-expanded="false" aria-controls="channelAccordionFlushCollapse">
                  <font-awesome-icon icon="fa-solid fa-tag" class="me-3 dark-pink fs-6" /><span class="dark-pink fs-6">購買明細</span>
                </button>
              </h2>
              <div id="channelAccordionFlushCollapse" class="accordion-collapse collapse" aria-labelledby="channelAccordionFlushHeading" data-bs-parent="#orderAccordionFlush">
                <div class="accordion-body">
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="mx-auto btn btn-mainorange px-4 py-2 text-white fwt-heavy fs-5 bd-rd-12" @click="confirmToPay"><font-awesome-icon icon="fa-solid fa-dollar-sign me-2" class="text-white fs-3 mb-1"/><p>付款</p><font-awesome-icon v-if="loadingStatus.loadingItem === curOrderId" icon="fa-solid fa-spinner" /></button>
          </div>

          </div>

        <div v-if="ifThirdStep" class="col-lg-12">
          <h1 class="fs-3 my-6 text-center">等待賣家確認訂單中，請至『我的後台』查詢訂單狀態</h1>
         <div class="d-flex justify-content-center align-items-center">
              <router-link to="/" class="me-4 btn btn-primary px-4 py-2 text-white fwt-heavy fs-6 bd-rd-12"><p>回首頁</p></router-link>
              <router-link to="/products" class="btn btn-primary px-4 py-2 text-white fwt-heavy fs-6 bd-rd-12"><p>繼續逛逛</p></router-link>
          </div>
        </div>

       </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

import cartsStore from '../../store/cartsStore.js'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    // -NQnw_-sBXJJrEsfC53i
    return {
      ifFirstStep: true,
      ifSecondStep: false,
      ifThirdStep: false,
      curOrderId: '-NQnw_-sBXJJrEsfC53i',
      curOrder: {},
      finalTotal: 0,
      loadingStatus: {
        loadingItem: ''
      }
    }
  },
  methods: {
    postNewOrder (perOrder) {
      perOrder.data.courierTotal = this.courierTotal
      console.log(perOrder.data.courierTotal)
      this.perOrder = perOrder
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/order`
      axios.post(url, perOrder)
        .then(res => {
          console.log(res.data)
          this.curOrderId = res.data.orderId
          this.ifFirstStep = false
          this.ifSecondStep = true
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '成功送出訂單',
            showConfirmButton: false,
            timer: 1800
          })
          this.getPerOrder()
          this.deleteAllCartToOrder()
          // 成功送出訂單需清空購物車
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    getPerOrder () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/order/${this.curOrderId}`
      axios.get(url)
        .then(res => {
          console.log(res.data.order)
          this.curOrder = res.data.order
          this.finalTotal = res.data.order.total
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    confirmToPay () {
      this.loadingStatus.loadingItem = this.curOrderId
      console.log(this.curOrderId)
      // /v2/api/{api_path}/pay/{order_id}
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/pay/${this.curOrderId}`
      axios.post(url)
        .then(res => {
          console.log(res.data)
          this.loadingStatus.loadingItem = ''
          this.ifSecondStep = false
          this.ifThirdStep = true
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '付款成功',
            showConfirmButton: false,
            timer: 1800
          })
          // this.deleteAllCartToOrder()
          // 成功送出訂單需清空購物車
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    ...mapActions(cartsStore, ['deleteAllCartToOrder', 'getCart'])
  },
  mounted () {
    this.ifFirstStep = true
    this.ifThirdStep = false
    this.getCart()
    if (this.ifSecondStep === true) {
      this.getPerOrder()
    }
  },
  computed: {
    courierTotal () {
      const amount = this.carts.reduce((a, b) => a + b.product.domestic_Transport.amount, 0)
      return amount
    },
    ...mapState(cartsStore, ['final_total', 'carts'])
  }
}
</script>

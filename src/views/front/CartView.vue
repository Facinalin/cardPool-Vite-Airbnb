<template>
<div v-if="!carts.length" class="border-0 d-flex justify-content-center">
    </div>
    <div v-else class="shopping-cart">
    <table class="cart-table mt-4 text-center">
        <thead>
            <!--padding寫thead/ th皆無用，寫th才有用-->
            <tr class="text-primary fs-5 pb-4">
                <th width="40%" class="py-3 bd-l-12">品項</th>
                <th width="15%">單價</th>
                <th width="10%">數量</th>
                <th width="15%">小計</th>
                <th width="10%">運費</th>
                <th width="10%">刪除</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="cart in carts" :key="cart.id">
            <tr class="perItemCheckout py-4">
      <td>
      <div class="cardItem-title d-flex align-items-center py-4">
          <img :src="cart.product.imgUrl" :alt="cart.product.title" class="per-cart-pic">
          <p class="text-center align-middle pt-0 pb-3 ps-4 pe-4 fz-20 ms-2">{{ cart.product.title }}</p>
      </div>
  </td>
  <td class="fz-20 text-center align-middle">{{ cart.product.price }}</td>
  <td class="text-center align-middle pt-4">
    <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input min="1" type="number" class="form-control" :value="cart.qty" @change="(evt) =>setCartQty(cart, evt)" >

              </div>
            </div>
  </td>
  <td class="text-center align-middle mt-2"><span class="checkoutSubtotal fz-20">{{ cart.product.price*cart.qty }}</span></td>
  <td class="text-center align-middle mt-2">
    {{ cart.product.domestic_Transport.amount }}
  </td>
  <td class="text-center align-middle">
            <button type="button" class="btn btn-sm text-mainorange"  @click="deletePerCart(cart.id)">
              <font-awesome-icon v-if="loadingStatus.loadingItem === cart.id" icon="fa-solid fa-spinner" class="me-1 fs-4" /> <font-awesome-icon icon="fa-solid fa-trash" class="fs-5" />
                </button>
  </td>
</tr>
</template>
        </tbody>
        <tfoot>
          <tr scope="row" class="border-top border-secondary border-1">
                <td></td>
                <td></td>
                <td></td>
                <td class="mt-4 text-end">
                    <p class="fz-20 mt-3 me-2">小計</p>
                </td>
                <td class="fz-20 dark-pink">NT${{ final_total }}</td>
            </tr>
          <tr scope="row">
                <td></td>
                <td></td>
                <td></td>
                <td class="mt-4 text-end">
                    <p class="fz-20 mt-3 me-2">運費</p>
                </td>
                <td class="fz-20 dark-pink">NT${{ courierTotal }}</td>
            </tr>
            <tr scope="row">
                <td></td>
                <td></td>
                <td></td>
                <td class="mt-4 text-end">
                    <p class="fz-20 mt-3 me-2">總金額</p>
                </td>
                <td class="fz-20 text-mainorange cartTotal">NT${{ final_total +courierTotal }}</td>
            </tr>
        </tfoot>
    </table>
    <div class="deleteAllCart text-center my-5">
  <button class="btn btn-mainorange text-white bd-rd-12" type="button" @click="deleteAllCart">清空購物車</button>
</div>
</div>
</template>

<script>
import productsStore from '../../store/productsStore.js'
import cartsStore from '../../store/cartsStore.js'
import Swal from 'sweetalert2'
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
// import OrderInfoComponent from '../../components/OrderInfo.js'

const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env
const userToken = localStorage.getItem('user1hrToken')
const userId = Number(localStorage.getItem('userId'))

export default {
  data () {
    return {
      cartTotal: 0,
      perCart: {},
      thisUserCart: [],
      ifLoggedIn: true,
      loadingStatus: {
        loadingItem: ''
      }
    }
  },
  // components: {
  //   'order-info-component': OrderInfoComponent
  // },
  methods: {
    deletePerCart (cartId) {
      // /v2/api/{api_path}/cart/{id}
      this.loadingStatus.loadingItem = cartId
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart/${cartId}`
      this.$http.delete(url)
        .then(res => {
          console.log(res.data)
          console.log(url)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '成功刪除一筆購物車!',
            showConfirmButton: false,
            timer: 1800
          })
          this.loadingStatus.loadingItem = ''
          this.getCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAllCart () {
      // /v2/api/{api_path}/carts
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/carts`
      this.$http.delete(url)
        .then(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '購物車已清空！',
            showConfirmButton: false,
            timer: 1800
          })
          this.loadingStatus.loadingItem = ''
          this.getCart()
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
      this.getCart()
    },
    setCartQty (perCart, event) {
      // /v2/api/{api_path}/cart/{id}
      // 改好六api
      this.loadingStatus.loadingItem = perCart.id
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart/${perCart.id}`
      const selectQty = event.target.value * 1
      // 更改的是該購物車的數量
      const cart = {
        product_id: perCart.product_id,
        qty: selectQty
      }
      this.$http.put(url, { data: cart })
        .then(res => {
          console.log(res.data)
          this.loadingStatus.loadingItem = ''
          this.getCart()
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1800
          })
        })
    },
    phoneVali (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請填入正確的電話號碼！'
    },
    checkLoggedIn () {
      if (userToken && userId) {
        this.ifLoggedIn = true
      }
    },
    ...mapActions(productsStore, ['getProductS']),
    ...mapActions(cartsStore, ['getCart'])
  },
  mounted () {
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/)
    // this.$http.defaults.headers.common.Authorization = localStorage.getItem('user1hrToken')
    // this.getProductS()
    // this.checkLoggedIn()
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    this.getCart()
  },
  computed: {
    courierTotal () {
      const amount = this.carts.reduce((a, b) => a + b.product.domestic_Transport.amount, 0)
      return amount
    },
    ...mapState(productsStore, ['products']),
    ...mapState(cartsStore, ['carts', 'final_total'])
  }
}
</script>

<style>
.shopping-cart{
    width: 100%;
    max-width: 100%;
}
.perCartPic{
    width: 140px;
    height: 140px;
    display: block;
    object-fit: cover;
}
.deleteAllCart{
    width: 100%;
}
.cart-table{
    width: 100%;
    padding: 0px 18px;
}

.alertPic{
  width: 12%;
    height: auto;
    border-radius: 50%;
    border: 12px solid #1E1C1C;
    margin-right: 32px;
}

.alertMsg{
  width: 50%;
}

.toLogPageBtn{
  display: inline-block;
  font-size: 16px;
  width: 20%;
  vertical-align: middle;
}

.pic-area{
  margin-top: 32px;
}

</style>

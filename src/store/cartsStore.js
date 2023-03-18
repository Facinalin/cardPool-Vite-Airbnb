import { defineStore } from 'Pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default defineStore('cartsStore', {
  state: () => {
    return {
      carts: [],
      number: 0,
      total: 0,
      final_total: 0,
      loadingStatus: {
        loadingItem: ''
      },
      cardGroupCart: [],
      ifDomestic: false,
      ifInternational: false,
      ifComplement: false,
      domesticAmount: 0,
      InternationalAmount: 0

    }
    // cart是單純使用者對購物車的動作html元素能獲得的資料
    // 下方carts是整理過後，有帶上關聯資料集（渲染用）的購物車打包資料
  },
  actions: {
    getCart () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      axios.get(url)
        .then(res => {
          this.carts = res.data.data.carts.filter(el => el.category === '一般' || el.category === '出卡')
          // this.total = res.data.data.total
          // this.final_total = res.data.data.final_total
          const test = this.carts.reduce((a, b) => a + b.total, 0)
          this.final_total = test
          this.number = this.carts.length
          // this.carts.forEach(el => {
          //   if (el.domestic_Transport.amount !== 0) {

          //   }
          // })
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
    deleteAllCartToOrder () {
      // /v2/api/{api_path}/carts
      // 送出訂單後使用
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/carts`
      axios.delete(url)
        .then(res => {
          this.carts = []
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
    addToCart (curProductId, curQty = 1) {
      this.loadingStatus.loadingItem = curProductId
      let httpRequest = 'post'
      let url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      let cart = {}
      const currentCart = this.carts.find(item => item.productId === curProductId)
      if (currentCart) {
        httpRequest = 'put'
        url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart/${currentCart.id}`
        cart = {
          ...currentCart,
          qty: currentCart.qty + curQty
        }
      } else {
        // const indicateProduct = products.find(el => el.id === curProductId)
        cart = {
          product_id: curProductId,
          qty: curQty,
          category: '一般'
        }
      }
      axios[httpRequest](url, { data: cart })
        .then(res => {
          console.log(res.data)
          this.loadingStatus.loadingItem = ''
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '成功加入購物車!',
            showConfirmButton: false,
            timer: 1800
          })
          this.getCart()
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
    getCardGroupCart () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      axios.get(url)
        .then(res => {
          console.log(res.data.data.carts)
          // this.carts = res.data.data.carts
          this.cardGroupCart = res.data.data.carts.filter(el => el.category === '拆卡')
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
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
    }
  }
})

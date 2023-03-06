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
      }
    }
    // cart是單純使用者對購物車的動作html元素能獲得的資料
    // 下方carts是整理過後，有帶上關聯資料集（渲染用）的購物車打包資料
  },
  actions: {
    getCart () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/cart`
      axios.get(url)
        .then(res => {
          this.carts = res.data.data.carts
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
          this.number = this.carts.length
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
          product_id: curProductId,
          qty: curQty
        }
      } else {
        // const indicateProduct = products.find(el => el.id === curProductId)
        cart = {
          product_id: curProductId,
          qty: curQty
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
    }
  }
})

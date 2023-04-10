import { defineStore, mapActions } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
import cartsStore from './cartsStore.js'

const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env
export default defineStore('orderPaymentStore', {
  state: () => {
    return {
      orders: []
    }
  },
  actions: {
    // 一般商品
    postNewOrder (perOrder) {
      // {
      //   "data": {
      //     "user": {
      //       "name": "test",
      //       "email": "test@gmail.com",
      //       "tel": "0912346768",
      //       "address": "kaohsiung"
      //     },
      //     "message": "這是留言"
      //   }
      // }
      // /v2/api/{api_path}/order
      // 改好六api
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/order`
      axios.post(url, { data: perOrder })
        .then(res => {
          console.log(res.data)
          this.ifFirstStep = false
          this.ifSecondStep = true
          this.deleteAllCartToOrder()
          console.log('這是store的', this.ifFirstStep, this.ifSecondStep)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${res.message}`,
            showConfirmButton: false,
            timer: 1800
          })
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
    ...mapActions(cartsStore, ['deleteAllCartToOrder'])
  }
})

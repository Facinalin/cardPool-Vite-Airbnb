import { defineStore } from 'Pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default defineStore('adminStore', {
  state: () => {
    return {
      userProductList: []
    }
    // cart是單純使用者對購物車的動作html元素能獲得的資料
    // 下方carts是整理過後，有帶上關聯資料集（渲染用）的購物車打包資料
  },
  actions: {
    getProductList () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/products/all`
      axios.get(url).then(res => {
        const sortPro = Object.values(res.data.products)
        sortPro.splice(0, 10)
        const cardgroup = sortPro.filter(el => el.category === '拆卡' && el.created_At)
        this.userProductList = cardgroup
        console.log(this.userProductList)
      }).catch(err => {
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

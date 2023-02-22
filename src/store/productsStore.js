import { defineStore } from 'Pinia'
import axios from 'axios'

const { VITE_APP_URL } = import.meta.env

export default defineStore('productsStore', {
  state: () => ({
    products: []
    // cart是單純使用者對購物車的動作html元素能獲得的資料
    // 下方carts是整理過後，有帶上關聯資料集（渲染用）的購物車打包資料
  }),
  actions: {
    async getProductS () {
      const url = `${VITE_APP_URL}/products`
      try {
        const get = await axios.get(url)
        const { data } = get
        this.products = data
      } catch (err) {
        console.log(err)
      }
    }
  }
})

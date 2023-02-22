import { defineStore } from 'Pinia'
import productsStore from './productsStore.js'
import axios from 'axios'
const { VITE_APP_URL } = import.meta.env
const userToken = localStorage.getItem('user1hrToken')
const userId = localStorage.getItem('userId')

export default defineStore('cartsStore', {
  state: () => ({
    carts: []
    // cart是單純使用者對購物車的動作html元素能獲得的資料
    // 下方carts是整理過後，有帶上關聯資料集（渲染用）的購物車打包資料
  }),
  actions: {
    productToCart () {
      const url = `${VITE_APP_URL}/600/users/${userId}/carts?_expand=product`
      axios.get(url,
        {
          headers: {
            authorization: `Bearer ${userToken}`
          }
        })
        .then(res => {
          console.log(res.data)
          this.carts = res.data
          console.log(this.products)
          // const total = this.carts.reduce((a, b) => a + b.qty * b.product.price, 0)
          // console.log(total)
          // this.cartTotal = total
        })
        .catch(err => {
          console.log(err)
        })

      const { products } = productsStore()
      console.log(products)
    }
  }
})

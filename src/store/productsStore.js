import { defineStore } from 'Pinia'
import axios from 'axios'

const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env
export default defineStore('productsStore', {
  state: () => ({
    products: [],
    cardGroupProduct: [],
    isLoading: true,
    leftMemberQty: 0
    // loading技巧：在統一狀態管理區預設先設置true，傳到元件時會在非同步請求結束後改為false
  }),
  actions: {
    // 一般商品
    getProduct () {
      // /v2/api/{api_path}/products/all
      // 改好六api
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/products/all`
      axios.get(url)
        .then(res => {
          console.log(res.data.products)
          const sortPro = res.data.products
          sortPro.splice(0, 10)
          const filterProduct = sortPro.filter(el => el.category === '一般')
          this.products = filterProduct
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCardProducts () {
      // /v2/api/{api_path}/products/all
      // 改好六api
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/products/all`
      axios.get(url)
        .then(res => {
          console.log(res.data.products)
          const sortPro = res.data.products
          sortPro.splice(0, 10)
          const filterProduct = sortPro.filter(el => el.category === '出卡')
          this.products = filterProduct
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 拆卡團
    getCardGroupProduct () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/products/all`
      axios.get(url)
        .then(res => {
          console.log(res.data.products)
          const sortPro = res.data.products
          sortPro.splice(0, 10)
          const filterGroup = sortPro.filter(el => el.category === '拆卡' && el.created_At)
          this.cardGroupProduct = filterGroup
          this.isLoading = false
          console.log(this.cardGroupProduct)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // async getProductS () {
    //   const url = `${VITE_APP_URL}/products`
    //   try {
    //     const get = await axios.get(url)
    //     const { data } = get
    //     this.products = data
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }
})

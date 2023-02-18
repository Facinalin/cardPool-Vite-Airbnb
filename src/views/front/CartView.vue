<template>
    <div class="container">
        <div class="row">
    <div class="col-12 border border-2 border-secondary rounded-xxl d-flex py-4 px-6">
    <div v-if="!carts.length">購物車目前是空的！</div>
    <div v-else class="shopping-cart">
    <table class="cart-table text-start">
        <thead class="border-bottom border-primary">
            <!--padding寫thead/ th皆無用，寫th才有用-->
            <tr class="py-4">
                <th width="45%" class="py-3">品項</th>
                <th width="15%">單價</th>
                <th width="15%">數量</th>
                <th width="15%">小計</th>
                <th width="10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-for="cart in carts" :key="cart.id">
            <tr class="perItemCheckout py-4">
      <td>
      <div class="cardItem-title d-flex align-items-center py-4">
          <img :src="cart.product.imageUrl" alt="Product-img" class="perCartPic">
          <p class="text-start pt-0 pb-3 ps-4 pe-4 fz-20 ms-2">{{ cart.product.title }}</p>
      </div>
  </td>
  <td class="fz-20">{{ cart.product.price }}</td>
  <td class="text-center">
    <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input min="1" type="number" class="form-control" :value="cart.qty" @change="(evt) =>setCartQty(cart, evt)" >
                <span class="input-group-text" id="basic-addon2"></span>
              </div>
            </div>
  </td>
  <td class="text-end mt-2">NT$<span class="checkoutSubtotal fz-20">{{ cart.total }}</span></td>
  <td>
    <button type="button" class="btn btn-outline-danger btn-sm ms-4" @click="deletePerCart(cart.id)">
              X
            </button>
  </td>
</tr>
</template>
        </tbody>
        <tfoot>
            <tr scope="row">
                <td></td>
                <td></td>
                <td></td>
                <td class="mt-4">
                    <p class="fz-20">總金額</p>
                </td>
                <td class="fz-20">NT$<span class="jsTotalCheckout">{{ cartTotal }}</span></td>
            </tr>
        </tfoot>
    </table>
    <div class="deleteAllCart text-end mt-5">
  <button class="btn btn-outline-danger" type="button" @click.prevent="deleteAllCart">清空購物車</button>
</div>
</div>
  </div>
</div>
</div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      carts: [],
      cartTotal: 0,
      perCart: {}
    }
  },
  methods: {
    getCart () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          this.carts = res.data.data.carts
          const total = this.carts.reduce((a, b) => a + b.total, 0)
          this.cartTotal = total
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletePerCart (cartId) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cartId}`
      this.$http.delete(url)
        .then(res => {
          console.log(res.data.message)
          alert('成功刪除一筆購物車！')
          this.getCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAllCart () {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`
      this.$http.delete(url)
        .then(res => {
          console.log(res.data.message)
          alert('你的購物車已清空！')
          this.getCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    setCartQty (perCart, event) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${perCart.id}`
      const selectQty = event.target.value * 1
      // 更改的是該購物車的數量
      this.perCart = perCart
      this.perCart.qty = selectQty
      this.$http.put(url, { data: this.perCart })
        .then(res => {
          this.getCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    phoneVali (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請填入正確的電話號碼！'
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>

<style>
.shopping-cart{
    width: 100%;
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

</style>

<template>
    <div class="container border border-primary border-2">
    <table class="mt-4 text-center">
  <thead class="p-4 mb-5">
    <tr class="text-primary fs-5 pb-4">
      <th width="270">訂單編號</th>
      <th width="270">下單時間</th>
      <th width="170">訂購人</th>
      <th width="170">訂單總額</th>
      <th width="200">是否付清</th>
      <th width="200">狀態查詢</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item) in orders" :key="item.id">
      <td>{{ item.id}}</td>
      <td>{{ (new Date(item.create_at * 1000)).getMonth()+1 }}月{{ (new Date(item.create_at * 1000)).getDate() }}日</td>
      <td>{{ item.user.email }}</td>
      <td>{{ item.total }}</td>
      <td><font-awesome-icon v-if="item.is_paid" icon="fa-solid fa-check" /><font-awesome-icon v-else icon="fa-solid fa-xmark" class="text-mainorange" /></td>
      <td><button type="button" class="btn text-secondary"><font-awesome-icon icon="fa-solid fa-comment-dots" /></button></td>
    </tr>
  </tbody>
</table>

</div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      orders: []
    }
  },
  methods: {
    // 狀態查詢：接物流系統
    getAdminOrders () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/orders`
      axios.get(url)
        .then(res => {
          this.orders = res.data.orders
          console.log(this.orders)
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
    checkAdmin () {
      const url = `${VITE_APP_URL2}/api/user/check`
      axios.post(url)
        .then(() => {
          this.getAdminOrders()
        })
        .catch((err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1800
          })
          this.$router.push('/logIn')
        })
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>

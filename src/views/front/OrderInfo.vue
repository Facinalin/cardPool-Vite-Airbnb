<template>
    <div v-if="carts.length >0" class="my-5 row d-flex justify-content-center">
        <h2 class="text-primary text-center">訂單資料確認</h2>
  <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="cartToOrder">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <v-field id="email" name="email" type="email" class="form-control"
                placeholder="請輸入 Email" :class="{ 'is-invalid': errors.email }" :rules="isRequired"
                v-model="perOrder.data.user.email"
              ></v-field>
              <p name="email" class="invalid-feedback">{{ errors.email }}</p>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <v-field id="name" name="name" type="text" class="form-control"
                placeholder="請輸入訂購人姓名" :class="{ 'is-invalid': errors.name }" :rules="isRequired"
                v-model="perOrder.data.user.name"
              ></v-field>
              <p name="name" class="invalid-feedback">{{ errors.name }}</p>
    </div>
    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <v-field id="tel" name="tel" type="tel" class="form-control"
               placeholder="請輸入電話" v-model="perOrder.data.user.tel" :class="{ 'is-invalid': errors.tel }" :rules="phoneVali"></v-field>
               <p name="tel" class="invalid-feedback">{{ errors.tel }}</p>
    </div>
    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <v-field id="address" name="address" type="text" class="form-control"
               placeholder="請輸入地址"  :rules="isRequired" :class="{ 'is-invalid': errors.address }"
               v-model="perOrder.data.user.address"></v-field>
               <p name="address" class="invalid-feedback">{{ errors.address }}</p>
    </div>
    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <textarea id="message" class="form-control" cols="30" rows="10" v-model="perOrder.data.message"></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-primary text-white">送出訂單</button>
    </div>
  </v-form>
</div>
</template>

<script>
import cartsStore from '../../store/cartsStore.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'Pinia'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      perOrder: {
        data: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: ''
          },
          message: ''
        }
      },
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'lk1025cina',
      message: ''
    }
  },
  methods: {
    phoneVali (value) {
      const phoneNumber = /^(09)\d{8}$/
      return phoneNumber.test(value) ? true : '請填入正確的電話號碼！'
    },
    isRequired (value) {
      if (!value) {
        return '此欄位為必填！'
      }
      return true
    },
    cartToOrder (values) {
      if (!JSON.stringify(values, null, 2)) {
        alert('測試失敗')
      }
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/order`
      console.log(this.data)
      axios.post(url, this.perOrder)
        .then(res => {
          console.log(res.data)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '訂單成功送出!',
            showConfirmButton: false,
            timer: 1800
          })
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
    ...mapActions(cartsStore, ['getCart'])
  },
  mounted () {
    this.getCart()
    console.log('在這')
  },
  computed: {
    ...mapState(cartsStore, ['carts'])
  }
}
</script>

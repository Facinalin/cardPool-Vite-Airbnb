<template>
    <div v-if="carts.length >0" class="my-5 row d-flex justify-content-center">
        <v-form ref="form" class="vform" v-slot="{ errors }" @submit="cartToOrder">
            <div class="mb-3">
      <label for="email" class="form-label me-2">Email</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="email" name="email" type="email" class="form-control custom-vf"
                placeholder="請輸入 Email" :class="{ 'is-invalid': errors.email }" :rules="isRequired"
                v-model="perOrder.data.user.email"
              ></v-field>
              <p name="email" class="invalid-feedback">{{ errors.email }}</p>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label me-2">收件人姓名</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="name" name="name" type="text" class="form-control custom-vf"
                placeholder="請輸入訂購人姓名" :class="{ 'is-invalid': errors.name }" :rules="isRequired"
                v-model="perOrder.data.user.name"
              ></v-field>
              <p name="name" class="invalid-feedback">{{ errors.name }}</p>
    </div>
    <div class="mb-3">
      <label for="tel" class="form-label me-2">收件人電話</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="tel" name="tel" type="tel" class="form-control custom-vf"
               placeholder="請輸入電話" v-model="perOrder.data.user.tel" :class="{ 'is-invalid': errors.tel }" :rules="phoneVali"></v-field>
               <p name="tel" class="invalid-feedback">{{ errors.tel }}</p>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label me-2">收件人地址</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon fs-7" />
      <v-field id="address" name="address" type="text" class="form-control custom-vf"
               placeholder="請輸入地址"  :rules="isRequired" :class="{ 'is-invalid': errors.address }"
               v-model="perOrder.data.user.address"></v-field>
               <p name="address" class="invalid-feedback">{{ errors.address }}</p>
    </div>
    <div class="mb-3">
      <label for="message" class="form-label">備註</label>
      <textarea id="message" class="form-control custom-vf" cols="30" rows="3" v-model="perOrder.data.message"></textarea>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-primary text-white bd-rd-12">下一步</button>
    </div>

  </v-form>
</div>
</template>

<script>
import cartsStore from '../../store/cartsStore.js'
// import orderPaymentStore from '../../store/orderPaymentStore.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'Pinia'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      ifFirstStep: true,
      ifSecondStep: false,
      ifThirdStep: false,
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
    cartToOrder (values) {
      if (!JSON.stringify(values, null, 2)) {
        alert('無法提交')
      }
      // 觸發父層的postneworder方法
      this.$emit('postNewOrder', this.perOrder)
    },
    ...mapActions(cartsStore, ['getCart'])
    // ...mapActions(orderPaymentStore, ['postNewOrder'])
  },
  mounted () {
    this.getCart()
    console.log('在這')
  },
  computed: {
    ...mapState(cartsStore, ['carts'])
    // ...mapState(orderPaymentStore, ['ifFirstStep', 'ifSecondStep', 'ifThirdStep'])
  }
}
</script>

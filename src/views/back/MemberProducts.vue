<template>
    <div class="container border border-primary border-2 d-flex flex-column">
      <div class="text-end mt-4 mb-4">
        <button class="btn btn-primary me-4 text-white" @click="openModal('new')">
          建立新的產品
        </button>
        <button class="btn btn-secondary text-white" @click="openModal">
          拆卡開團
        </button>
      </div>
      <table class="table mt-4 text-center">
        <thead>
          <tr class="text-primary fs-5 pb-4">
            <th width="120">
              分類
            </th>
            <th width="400">產品名稱</th>
            <th width="110">
              價格
            </th>
            <th width="110">
              成員
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="160">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in userProductList" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-center">
              {{ item.price }}
            </td>
            <td class="text-center">
              {{ item.member }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group-edit d-flex justify-content-center px-4">
                <button type="button" class="btn btn-primary btn-sm text-white me-2" @click="openModal('edit', item)">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </button>
                <button type="button" class="btn btn-mainorange btn-sm text-white">
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="modal fade" tabindex="-1" id="addProductModal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h4 v-if="isNew" class="modal-title text-primary fs-4">新增產品</h4>
        <h4 v-else class="modal-title text-secondary fs-4">編輯產品</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <div class="modal-body">
      <v-form class="row" v-slot="{ errors }" @submit="onSubmit">
  <div class="container-fluid py-3">

  <div class="col-sm-4 has-validation">
    <label for="imgUrl" class="form-label">商品圖片</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
  <v-field id="imgUrl" v-model="perProduct.imgUrl" name="link"
  class="form-control" placeholder="請輸入圖片連結" :rules="isRequired" :class="{ 'is-invalid': errors.link }" ></v-field>
  <p name="link" class="invalid-feedback">{{ errors.link }}</p>
    <img class="img-fluid" :src="perProduct.imgUrl">
  </div>
      <div class="col-sm-8">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group mb-3">
              <label for="title" class="form-label">標題</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
              <v-field id="title" v-model="perProduct.title" name="title"
  class="form-control" placeholder="請輸入標題" :rules="isRequired" :class="{ 'is-invalid': errors.title }" ></v-field>
  <p name="title" class="invalid-feedback">{{ errors.title }}</p>
            </div>
          </div>
            <div class="col-sm-6">
      <div class="form-group mb-3">
              <label for="price" class="form-label">價格（元）</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
              <v-field id="price" v-model.number="perProduct.price" type="number" name="price"
  class="form-control" placeholder="請填入未含運的商品價格" :rules="isNumber" :class="{ 'is-invalid': errors.price }" ></v-field>
  <p name="price" class="invalid-feedback">{{ errors.price }}</p>
            </div>
    </div>
    <div class="col-sm-6">
      <label for="member" class="form-label">成員</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <select v-model="perProduct.member" class="form-select" aria-label="Default select example" id="member">
  <option value="Bangchan" selected>Bangchan</option>
  <option value="Leeknow">Leeknow</option>
  <option value="Changbin">Changbin</option>
  <option value="Hyunjin">Hyunjin</option>
  <option value="Han">Han</option>
  <option value="Felix">Felix</option>
  <option value="Seungmin">Seungmin</option>
  <option value="I.N">I.N</option>
  <option value="非特定成員">非特定成員</option>
</select>

    </div>
  </div>

  <div class="row">
            <div class="col-sm-6">
      <div class="form-group mb-3">
              <label for="title" class="form-label">國內運費</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="domesticBtnRadio" id="hasDomestic" autocomplete="off">
  <label class="btn btn-outline-mainorange toggleBtn" for="hasDomestic" @click="hasDomestic"><font-awesome-icon icon="fa-solid fa-check" /></label>

  <input type="radio" class="btn-check" name="domesticBtnRadio" id="btnradio2" autocomplete="off" checked>
  <label class="btn btn-outline-maingray toggleBtn" for="btnradio2" @click="hasNoDomestic"><font-awesome-icon icon="fa-solid fa-xmark" /></label>

</div>

<!-- <select v-if="ifDomesticFee" v-model="perProduct.domestic_Transport.courier" class="form-select" aria-label="Default select example" @change="ifMeetInPerson($event)">
  <option id="defaultOpt">請選擇出貨方式</option>
  <option selected value="711賣貨便">711賣貨便</option>
  <option value="711店到店">711店到店</option>
  <option value="全家">全家店到店</option>
  <option value="萊爾富">萊爾富</option>
</select> -->
<v-field v-if="ifDomesticFee"
  id="name"
  name="domesitcFreight"
  class="form-control"
  placeholder="請choose出貨"
  v-model="perProduct.domestic_Transport.courier"
  as="select"
  :rules="isRequired" :class="{ 'is-invalid': errors.domesitcFreight }"
>
  <option disabled selected value="">請選擇出貨</option>
  <option value="711賣貨便">711賣貨便</option>
  <option value="711店到店">711店到店</option>
  <option value="全家">全家店到店</option>
  <option value="萊爾富">萊爾富</option>
</v-field>
<v-field v-if="ifDomesticFee" id="domesitcFreight" v-model.number="perProduct.domestic_Transport.amount" type="number" name="domesitcFreightAmount"
  class="form-control" :rules="isNumber" :class="{ 'is-invalid': errors.domesitcFreightAmount }" ></v-field>
  <p name="domesitcFreightAmount" class="invalid-feedback">{{ errors.domesitcFreightAmount }}</p>
<div v-if="!ifDomesticFee">
<h4 class="text-secondary">面交<span>0</span>元</h4>
<v-field id="note" v-model="perProduct.domestic_Transport.courier_Note" name="note"
  class="form-control" placeholder="請填寫可面交縣市及日期限制" :rules="isRequired" :class="{ 'is-invalid': errors.note }" ></v-field>
  <p name="note" class="invalid-feedback">{{ errors.note }}</p>
</div>

            </div>
    </div>
    <div class="col-sm-6">
      <div class="form-group mb-3">
              <label for="title" class="form-label">國際運費</label>
              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="internationalBtnRadio" ref="hasInternational" id="hasInternational" autocomplete="off">
  <label class="btn btn-outline-mainorange toggleBtn" for="hasInternational" @click="hasInternational"><font-awesome-icon icon="fa-solid fa-check" /></label>

  <input type="radio" class="btn-check" name="internationalBtnRadio" id="btnradio4" autocomplete="off" checked>
  <label class="btn btn-outline-maingray toggleBtn" for="btnradio4" @click="hasNoInternational"><font-awesome-icon icon="fa-solid fa-xmark" /></label>

</div>

<div v-if="ifInternational" class="btn-group btn-group-wider" role="group" aria-label="Basic radio toggle button group">

  <input type="radio" class="btn-check" name="internationalDetailBtnRadio" ref="needComplement" id="needComplement" autocomplete="off">
  <label class="btn btn-outline-primary toggleBtn" for="needComplement" @click="needComplement">需二補</label>

  <input type="radio" class="btn-check" name="internationalDetailBtnRadio" id="btnradio6" autocomplete="off">
  <label class="btn btn-outline-primary toggleBtn" for="btnradio6" @click="needNoComplement">本次付清</label>

</div>
<h4 v-if="ifComplement&&ifInternational" class="text-mainorange">本次結帳總額未收國際運費，最終出貨前請至訂單管理新增運費金額，系統將自動通知買家付款。</h4>
<v-field v-if="!ifComplement&&ifInternational" id="domesitcFreight" v-model.number="perProduct.international_Transport.amount" type="number" name="internationalFreight"
  class="form-control" :rules="isNumber" :class="{ 'is-invalid': errors.internationalFreight }" placeholder="不需二補的最終國際運費"></v-field>
  <p name="internationalFreight" class="invalid-feedback">{{ errors.internationalFreight }}</p>
            </div>
    </div>
  </div>
  <div class="col-sm-12">
    <label for="floatingTextarea2" class="mb-3">商品描述</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <div class="form-floating">
  <v-field v-model="perProduct.description" id="domesitcFreight" type="text" name="description"
  class="form-control" :rules="isRequired" :class="{ 'is-invalid': errors.description }" height="200px" ></v-field>
  <p name="price" class="invalid-feedback">{{ errors.description }}</p>
</div>
          </div>
    </div>

</div>
<div class="modal-footer">
        <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
        <button v-if="isNew" type="submit" class="btn btn-primary text-white" @click="updateProduct">確認新增</button>
        <button v-else type="submit" class="btn btn-primary text-white" @click="updateProduct">確認修改</button>
      </div>
    </v-form>
    </div>
  </div>
</div>

    </div>
  </div>
</template>

<script type="module">
import { Modal } from 'bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env
let productModal = null

export default {
  data () {
    return {
      userProductList: [],
      perProduct: {
        category: '',
        origin_price: null,
        price: null,
        unit: '個',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: [],
        member: 'Bangchan',
        domestic_Transport: {
          courier: '711賣貨便',
          courier_Note: '',
          amount: null
        },
        international_Transport: {
          complement: false,
          amount: null
        }
      },
      isNew: true,
      ifDomesticFee: false,
      ifInternational: false,
      mustFillOut: true,
      ifMeet: false,
      ifComplement: false,
      user: {
        username: 'lovemistborn13@gmail.com',
        password: '1997faCI'
      }
    }
  },
  //   // {"id": 8,
  // "title": "Skzoo娃衣",
  // "imgUrl": "https://i.imgur.com/kBYi7Cx.jpg",
  // "price": "450",
  // "sellerId": 1,
  // "channel": "WithMuu",
  // "type": "拆卡",
  // "domesticFee": 60,
  // "internationalFee": {
  // "complement": false,
  // "amount": 0
  // },
  // "leftmember": {
  // "1": false,
  // "2": true,
  // "3": true,
  // "4": true,
  // "5": false,
  // "6": false,
  // "7": true,
  // "8": false
  // },
  // "description": "#拆 推特收卡請注意",
  // "imgsUrl": [
  // "https://i.imgur.com/rYO7eET.png",
  // "https://i.imgur.com/gJt30Ua.png",
  // "https://i.imgur.com/KduMq6i.png",
  // "https://i.imgur.com/tqtF0e9.png"
  // ],
  // "domesticCourier": {
  // "711店到店": 60,
  // "全家店到店": 60,
  // "711賣貨便": 35
  // },
  // "mustChoose": [
  // 2,
  // 4
  // ],
  // "scarcity": [
  // 3,
  // 7
  // ]
  // }
  methods: {
    openModal (isNew, item) {
      if (isNew === 'new') {
        // modal回復default,0302testok
        this.perProduct = {
          category: '',
          origin_price: 0,
          price: 0,
          unit: '個',
          description: '',
          content: '',
          is_enabled: 1,
          imageUrl: '',
          imagesUrl: [],
          domestic_Transport: {
            courier: '請選擇出貨方式',
            courier_Note: '',
            amount: 0
          },
          international_Transport: {
            complement: false,
            amount: 0
          }
        }
        this.isNew = true
        productModal.show()
      } else if (isNew === 'edit') {
        this.perProduct = { ...item }
        if (this.perProduct.domestic_Transport.courier !== '面交') {
          console.log('面交')
          // TBC
        }
        if (this.perProduct.international_Transport.complement === true) {
          this.ifInternational = true
          this.ifComplement = true
          const ifInternationalBtn = this.$refs.hasInternational
          const ifComplementBtn = this.$refs.needComplement
          console.log(ifComplementBtn)
          // 第二層refs取不到
          ifInternationalBtn.setAttribute('checked', '')
          // ifComplementBtn.setAttribute('checked', '')
        }
        if (this.perProduct.international_Transport.complement === false && this.perProduct.international_Transport.amount !== 0) {
          console.log('不需二補，不等於0')
        }
        this.isNew = false
        productModal.show()
      }
    },
    getProductList () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/products/all`
      axios.get(url).then(res => {
        console.log(res.data.products)
        const sortPro = Object.values(res.data.products)
        this.userProductList = sortPro.splice(10, 2)
        console.log(this.userProductList)
      }).catch(err => {
        console.log(err)
      })
    },
    updateProduct () {
      // 新增商品
      if (!this.ifDomesticFee) {
        this.perProduct.domestic_Transport.amount = 0
        this.perProduct.domestic_Transport.courier = '面交'
      }
      if (this.ifComplement) {
        this.perProduct.international_Transport.amount = 0
        this.perProduct.international_Transport.complement = true
      } else {
        this.perProduct.international_Transport.complement = false
      }
      this.perProduct.id = new Date().getTime()
      this.perProduct.category = '一般'
      console.log(this.perProduct)
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
      axios.post(url, { data: this.perProduct }).then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1800
        })
        productModal.hide()
        this.getProductList()
        // here 並沒有新增的那一筆，但無admin的產品就get得到新增的那一筆
        // 如果是登入權限問題，應該不會成功新增，應該會擋掉才對，新增都不會成功
      }).catch(err => {
        console.log(err.response.data.message)
      })
      // 資料需要sellerId/ type記得引入localstorage
      // let url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
      // let httpMethod = 'post'
      // this.$http[httpMethod](url, { data: this.perProduct }).then((res) => {
      //   console.log(res.data)
      //   // this.hideModal()
      //   // 下面這句目標：想要觸發getData方法，但因為該方法儲存在根元件，所以要emit出去向父層要方法。
      //   // html78跟79行：因為（修改+編輯）或（刪除）都會需要再調用getData所以要寫在html那邊（如果已拆成元件的話就是網往template找）
      //   // this.$emit('update')
      //   // 預設：如果沒有多張圖片，則沒有imagesUrl這個屬性
      // }).catch((err) => {
      //   alert(err.response.data.message)
      // })
      // // 編輯現有商品
      // httpMethod = 'put'
      // url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product/${this.product.id}`
    },
    hasDomestic () {
      this.ifDomesticFee = true
    },
    hasNoDomestic () {
      this.ifDomesticFee = false
    },
    hasNoInternational () {
      this.ifInternational = false
    },
    hasInternational () {
      this.ifInternational = true
    },
    ifMeetInPerson (evt) {
      console.log(evt.target.value)
      // 不理解
      const defaultOption = document.getElementById('defaultOpt')
      console.log(defaultOption.classList)
      defaultOption.classList.remove('selected')
      defaultOption.classList.add('disabled')
      if (!this.ifDomesticFee) {
        this.ifMeet = true
      } else {
        this.ifMeet = false
      }
    },
    needComplement () {
      this.ifComplement = true
    },
    needNoComplement () {
      this.ifComplement = false
    },
    onSubmit (values) {
      console.log(JSON.stringify(values, null, 2))
    },
    isRequired (value) {
      if (!value) {
        return '此欄位為必填！'
      }
      return true
    },
    isNumber (value) {
      const regex = /^[0-9]+$/
      if (!regex.test(value)) {
        console.log('test沒過')
        return '僅能填入0-9的數字！'
      }
      console.log('test過')
      return true
    },
    checkAdmin () {
      const url = `${VITE_APP_URL2}/api/user/check`
      axios.post(url)
        .then(() => {
          this.getProductList()
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
    // this.getUserProduct()
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    const addProductModal = document.getElementById('addProductModal')
    productModal = new Modal(addProductModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.checkAdmin()
  }
}
</script>

<style>
.toggleBtn{
  width: 38px;
  height: 38px;
}

.modalIcon{
  width: 12px;
  margin-left: 8px;
}

.btn-group{
  width: 100%;
  padding: 8px 25%;
}

.btn-group-wider{
  padding: 8px 10%;
}

</style>

<template>
        <div class="col-10 d-flex flex-column">
          <div class="text-end mt-4 mb-4">
        <button class="btn btn-primary me-4 text-white" @click="openModal('new')">
          新增一般產品
        </button>
        <button class="btn btn-secondary me-4 text-white" @click="openModal('card')">
          新增成員小卡
        </button>
      </div>
      <table class="table mt-4 text-center">
        <thead>
          <tr class="text-primary fs-5 pb-4">
            <th width="120">
              分類
            </th>
            <th width="400">產品名稱</th>
            <th width="180">
              價格（元）
            </th>
            <th width="110">
              成員
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
              <div class="btn-group-edit d-flex justify-content-center px-4">
                <button type="button" class="btn btn-primary btn-sm text-white me-2" @click="openModal('edit', item)">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </button>
                <button type="button" class="btn btn-mainorange btn-sm text-white" @click="deletePerProduct(item.id)">
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
      <div class="modal-header bg-maingray">
        <h4 v-if="isNew === 'group'" class="modal-title text-secondary-trans fs-4 ls-4">新增拆卡團</h4>
        <h4 v-if="isNew === 'new'" class="modal-title text-primary-trans fs-4 ls-4">新增產品</h4>
        <h4 v-if="isNew === 'edit'" class="modal-title text-secondary-trans fs-4 ls-4">編輯產品</h4>
        <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"><font-awesome-icon icon="fa-solid fa-xmark" class="text-white" style="font-size:24px"/></button>
      </div>
    <div class="modal-body">
      <v-form class="row" v-slot="{ errors }" @submit="onSubmit">
  <div class="col-sm-4 has-validation">
    <label for="imgUrl" class="form-label">商品圖片</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
  <v-field id="imgUrl" v-model="perProduct.imgUrl" name="link"
  class="form-control" placeholder="請輸入圖片連結" :rules="isRequired" :class="{ 'is-invalid': errors.link }" ></v-field>
  <p name="link" class="invalid-feedback">{{ errors.link }}</p>
  <div class="modalPic">
    <img class="img-fluid" :src="perProduct.imgUrl">
  </div>
  <div
      v-if="!perProduct.imagesUrl.length || perProduct.imagesUrl[perProduct.imagesUrl.length - 1]">
      <button class="btn btn-outline-primary btn-sm d-block w-100"
        @click="perProduct.imagesUrl.push('')">
        新增圖片
      </button>
    </div>
    <div v-else>
      <button class="btn btn-outline-danger btn-sm d-block w-100" @click="perProduct.imagesUrl.pop()">
        刪除圖片
      </button>
    </div>
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
      <label for="member" class="form-label">成員</label><font-awesome-icon v-if="isNew === 'card'" icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
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

  <div class="row">
            <div class="col-sm-6">
      <div class="form-group mb-3">
              <label for="title" class="form-label">國內運費</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="domesticBtnRadio" id="hasDomestic" autocomplete="off" ref="hasDomestic">
  <label class="btn btn-outline-mainorange toggleBtn" for="hasDomestic" @click="hasDomestic"><font-awesome-icon icon="fa-solid fa-check" /></label>

  <input type="radio" class="btn-check" name="domesticBtnRadio" id="btnradio2" autocomplete="off" checked>
  <label class="btn btn-outline-maingray toggleBtn" for="btnradio2" @click="hasNoDomestic"><font-awesome-icon icon="fa-solid fa-xmark" /></label>

</div>
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
        <button v-if="isNew==='new'" type="submit" class="btn btn-primary text-white" @click="updateProduct('new')">確認新增</button>
        <button v-if="isNew==='edit'" type="submit" class="btn btn-primary text-white" @click="updateProduct('edit')">確認修改</button>
        <button v-if="isNew==='card'" type="submit" class="btn btn-primary text-white" @click="updateProduct('card')">確認新增</button>
      </div>
    </v-form>
    </div>
  </div>
</div>
    </div>
  </div>
</template>

<script>
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
      isNew: '',
      ifDomesticFee: false,
      ifInternational: false,
      mustFillOut: true,
      ifMeet: false,
      ifComplement: false,
      curUId: '',
      chooseMember: [],
      modalState: '',
      leftMember: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
      },
      mustChoose: [],
      scarcity: [],
      normalArea: []
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
    choosingMember (i, evt) {
      console.log(evt.target.checked)
    },
    openModal (isNew, item) {
      if (isNew === 'new') {
        this.isNew = 'new'
        productModal.show()
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
      } else if (isNew === 'edit') {
        // edit二分：一般edit，拆卡edit
        this.isNew = 'edit'
        productModal.show()
        this.perProduct = { ...item }
        console.log(this.perProduct)
        if (this.perProduct.domestic_Transport.courier !== '面交') {
          console.log('非面交，金額大於0')
          this.ifDomesticFee = true
          const hasDomestic = this.$refs.hasDomestic
          hasDomestic.setAttribute('checked', '')
        }
        if (this.perProduct.international_Transport.complement === true) {
          console.log('需二補，金額為0')
          this.ifInternational = true
          this.ifComplement = true
          const ifInternationalBtn = this.$refs.hasInternational
          const ifComplementBtn = this.$refs.needComplement
          console.log(ifComplementBtn)
          ifInternationalBtn.setAttribute('checked', '')
          // ifComplementBtn.setAttribute('checked', '')
        }
        if (this.perProduct.international_Transport.complement === false && this.perProduct.international_Transport.amount !== 0) {
          console.log('不需二補，金額大於0')
          this.ifInternational = true
          this.ifComplement = false
          const ifInternationalBtn = this.$refs.hasInternational
          ifInternationalBtn.setAttribute('checked', '')
          const ifComplementBtn = this.$refs.needComplement
          console.log(ifComplementBtn)
        }
        productModal.show()
      } else if (isNew === 'card') {
        this.isNew = 'card'
        productModal.show()
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
      }
      console.log(isNew)
      // productModal.show()
    },
    getProductList () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/products/all`
      axios.get(url).then(res => {
        const sortPro = Object.values(res.data.products)
        sortPro.splice(0, 10)
        const generalProducts = sortPro.filter(el => el.category === '一般' || el.category === '出卡')
        this.userProductList = generalProducts
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1800
        })
      })
    },
    updateProduct (type) {
      let url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 新增商品
      if (type === 'new') {
        this.perProduct.id = new Date().getTime()
        this.perProduct.category = '拆卡'
      }
      // 編輯商品
      if (type === 'edit') {
        httpMethod = 'put'
        url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
      }
      // 新增成員小卡
      if (type === 'card') {
        this.perProduct.id = new Date().getTime()
        this.perProduct.category = '出卡'
      }
      // 三種方式皆共用運費選項/ axios非同步
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
      axios[httpMethod](url, { data: this.perProduct }).then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1800
        })
        productModal.hide()
        this.getProductList()
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1800
        })
      })
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
        return '僅能填入0-9的數字！'
      }
      return true
    },
    checkAdmin () {
      const url = `${VITE_APP_URL2}/api/user/check`
      axios.post(url)
        .then((res) => {
          this.curUId = res.data.uid
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
    },
    deletePerProduct (curProductId) {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product/${curProductId}`
      axios.delete(url).then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1800
        })
        this.getProductList()
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1800
        })
      })
    },
    addDance () {
      const perDance = {
        category: '跳舞',
        origin_price: 0,
        price: 0,
        unit: '個',
        description: 'Gods Menu，影片拍攝Gods Menu舞蹈cover（完整版）。',
        content: '',
        is_enabled: 1,
        imageUrl: 'data:image/jpeg;base64,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',
        imagesUrl: [],
        leader: '萬華李旻浩',
        first_practice: 1680857958,
        d_day: 1684659558,
        county: '台北市',
        title: 'Gods Menu Cover',
        leftMember: 1
      }
      console.log({ data: perDance })
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
      axios.post(url, { data: perDance }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    const addProductModal = document.getElementById('addProductModal')
    productModal = new Modal(addProductModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.checkAdmin()
    // this.getProductList()
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

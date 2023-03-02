<template>
    <div class="container border border-primary border-2">
      <div class="text-end mt-4">
        <button class="btn btn-primary me-4" @click="openModal('new')">
          建立新的產品
        </button>
        <button class="btn btn-secondary" @click="openModal">
          拆卡開團
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in userProductList" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">
              {{ item.origin_price }}
            </td>
            <td class="text-end">
              {{ item.price }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  刪除
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
  <div class="container-fluid py-3">
    <div class="row">
  <div class="col-sm-4">
    <label for="title" class="form-label">商品圖片</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
    <input v-model="perProduct.imgUrl" id="title" type="text" class="form-control" placeholder="請輸入圖片連結">
    <img class="img-fluid">
  </div>
      <div class="col-sm-8">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group mb-3">
              <label for="title" class="form-label">標題</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
              <input v-model="perProduct.title" id="title" type="text" class="form-control" placeholder="中文不得超過20字，英文不得超過30個字元">
            </div>
          </div>
            <div class="col-sm-6">
      <div class="form-group mb-3">
              <label for="title" class="form-label">價格（元）</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
              <input v-model.number="perProduct.price" id="title" type="number" class="form-control" placeholder="請填入未含運的商品價格">
            </div>
    </div>
    <div class="col-sm-6">
      <label for="member" class="form-label">成員</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <select v-model="perProduct.member" class="form-select" aria-label="Default select example" id="member">
  <option selected>請選擇成員（一位）</option>
  <option value="非特定成員">非特定成員</option>
  <option value="Bangchan">Bangchan</option>
  <option value="Leeknow">Leeknow</option>
  <option value="Changbin">Changbin</option>
  <option value="Hyunjin">Hyunjin</option>
  <option value="Han">Han</option>
  <option value="Felix">Felix</option>
  <option value="Seungmin">Seungmin</option>
  <option value="I.N">I.N</option>
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

<select v-if="ifDomesticFee" v-model="perProduct.domestic_Transport.courier" class="form-select" aria-label="Default select example" @change="ifMeetInPerson($event)">
  <option id="defaultOpt">請選擇出貨方式</option>
  <option value="711賣貨便">711賣貨便</option>
  <option value="711店到店">711店到店</option>
  <option value="全家">全家店到店</option>
  <option value="萊爾富">萊爾富</option>
</select>
<input v-if="ifDomesticFee" v-model.number="perProduct.domestic_Transport.amount"  id="internationalFee" type="number" class="form-control" placeholder="運費（元）">
<div v-if="!ifDomesticFee">
<h4 class="text-secondary">面交<span>0</span>元</h4>
<input v-model="perProduct.domestic_Transport.courier_Note" id="domesticMeet" type="text" class="form-control mt-4" placeholder="請填寫可面交縣市及日期限制">
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
<input v-if="!ifComplement&&ifInternational" v-model.number="perProduct.international_Transport.amount" id="internationalFee" type="number" class="form-control" placeholder="不需二補的最終國際運費">
            </div>
    </div>
  </div>
  <div class="col-sm-12">
    <label for="floatingTextarea2" class="mb-3">商品描述</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
      <div class="form-floating">
  <textarea v-model.number="perProduct.description" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
</div>
          </div>
    </div>

  </div>
</div>
<div class="modal-footer">
        <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
        <button v-if="isNew" type="button" class="btn btn-primary text-white" @click="updateProduct">確認新增</button>
        <button v-else type="button" class="btn btn-primary text-white" @click="updateProduct">確認修改</button>
      </div>
    </div>
  </div>
</div>

    </div>
  </div>
</template>

<script type="module">
import { Modal } from 'bootstrap'
import axios from 'axios'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env
// const userId = localStorage.getItem('userId')
// const userToken = localStorage.getItem('user1hrToken')
//  VITE_APP_URL
// here
let productModal = null

export default {
  data () {
    return {
      userProductList: [],
      perProduct: {
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
        // modal回復default,0301testok
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
          // const checkedBtn = document.getElementById('hasDomestic')
          // checkedBtn.setAttribute('checked')
        }
        if (this.perProduct.international_Transport.complement === true) {
          this.ifInternational = true
          this.ifComplement = true
          const ifInternationalBtn = this.$refs.hasInternational
          console.log(this.$refs)
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
    // getUserProduct () {
    //   const url2 = `${VITE_APP_URL}/600/users/${userId}/products`
    //   // const url = `${VITE_APP_URL}/products?sellerId=${userId}`
    //   this.$http.get(url2)
    //     .then(res => {
    //     })
    //     .catch(err => {
    //       console.log(err.data)
    //     })
    // },
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
        console.log(res.data)
        this.getProductList()
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
    login () {
      const api = 'https://vue3-course-api.hexschool.io/admin/signin'
      axios.post(api, this.user).then((response) => {
        const { token, expired } = response.data
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
        // window.location = 'products.html'
      }).catch((err) => {
        console.log(err.response.data.message)
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
    this.login()
    this.getProductList()
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

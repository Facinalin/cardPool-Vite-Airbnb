<template>
    <div class="container border border-primary border-2 d-flex flex-column">
      <div class="text-end mt-4 mb-4">
        <button class="btn btn-secondary text-white" @click="openModal('group')">
          拆卡開團
        </button>
      </div>
      <table class="table mt-4 text-center">
        <thead>
          <tr class="text-secondary fs-5 pb-4">
            <th width="120">
              成團進度
            </th>
            <th width="110">開團日期</th>
            <th width="400">
              隨卡商品
            </th>
            <th width="110">
              編輯收團
            </th>
            <th width="100">
              刪除
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in userProductList" :key="item.id">
            <td>剩餘{{ ((Object.values(item.leftMember)).filter(el => el === true)).length }}位</td>
            <td>{{ item.id }}</td>
            <td class="text-center">
              {{ item.title }}
            </td>
            <td class="text-center">
                <button type="button" class="btn btn-primary btn-sm text-white me-2" @click="openModal('edit', item)">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </button>
            </td>
            <td>
                <button type="button" class="btn btn-mainorange btn-sm text-white" @click="deletePerProduct(item.id)">
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
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
  <div v-if="isNew === 'group' || isNew === 'edit'" class="col-sm-12 mb-4">
      <h4>剩餘成員<font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" /></h4>
      <p class="fs-7 mt-1"><font-awesome-icon icon="fa-solid fa-star" />請將下方成員拖曳至對應區域。除（已被卡位成員區）外，其他區域都是買家可以卡位的。</p>
      <div class="memberWrapper d-flex mt-2">
       <div class="perArea">
      <h1 class="text-center py-2 fs-5">必帶區</h1>
      <div id="redDragArea" class="sprint-section bg-mainorange mustArea" ref="redArea">
        <div class="droppable-container bg-mainorange"></div>
      </div>
    </div>

    <div class="perArea">
      <h1 class="text-center py-2 fs-5">必帶才可帶區</h1>
      <div id="blueDragArea" class="sprint-section bg-primary scarceArea" ref="blueArea">
        <div class="droppable-container bg-primary"></div>
      </div>
    </div>
    <div class="perArea">
      <h1 class="text-center py-2 fs-5">無限制區</h1>
      <div class="sprint-section bg-secondary normalArea" ref="normalArea">
        <div class="droppable-container bg-secondary"></div>
      </div>
    </div>
    <div class="perArea">
      <h1 class="text-center py-2 fs-5">已被卡位成員區</h1>
      <div class="sprint-section bg-maingray takenArea" ref="takenArea">
        <div class="droppable-container bg-maingray"></div>
      </div>
    </div>
    </div>
    <div class="choosePlate" ref="choosePlate">

    </div>
    </div>
    <div v-if="isNew === 'new' || isNew === 'edit'" class="col-sm-6">
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
        <button v-if="isNew==='group'" type="submit" class="btn btn-primary text-white" @click="updateProduct('group')">確認開團</button>
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
import Sortable from 'sortablejs'
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
      ifGroup: false,
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
      } else if (isNew === 'group') {
        this.isNew = 'group'
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
        productModal.show()
        this.ifGroup = true
        const unpopularMem = this.$refs.redArea
        const popularMem = this.$refs.blueArea
        const normalArea = this.$refs.normalArea
        const takenArea = this.$refs.takenArea
        const choosePlate = this.$refs.choosePlate
        // const unpopularMem = document.getElementById('redDragArea')
        // const popularMem = document.getElementById('blueDragArea')
        console.log(unpopularMem)
        const backlogArr = [
          { content: '<img src="https://i.imgur.com/5VrxHl4.png" alt="Bangchan" data-id="1"><p>Bangchan</p>' },
          { content: '<img src="https://i.imgur.com/Uf8hp4X.png" alt="Leeknow" data-id="2"><p>Leeknow</p>' },
          { content: '<img src="https://i.imgur.com/DlrpnvJ.png" alt="Changbin" data-id="3"><p>Changbin</p>' },
          { content: '<img src="https://i.imgur.com/lBM4VXu.png" alt="Hyunjin" data-id="4"><p>Hyunjin</p>' },
          { content: '<img src="https://i.imgur.com/sdkVX6b.png" alt="Han" data-id="5"><p>Han</p>' },
          { content: '<img src="https://i.imgur.com/vnEW0jA.png" alt="Felix" data-id="6"><p>Felix</p>' },
          { content: '<img src="https://i.imgur.com/vee74L9.png" alt="Seungmin" data-id="7"><p>Seungmin</p>' },
          { content: '<img src="https://i.imgur.com/OHOP739.png" alt="IN" data-id="8"><p>IN</p>' }
        ]
        const checkDrag = document.querySelectorAll('.draggable')
        if (unpopularMem && checkDrag.length < 8) {
          backlogArr.map((ele) => {
            const draggableCard = document.createElement('div')
            draggableCard.setAttribute('draggable', 'true')
            draggableCard.classList.add('draggable')
            draggableCard.innerHTML = ele.content

            choosePlate.appendChild(draggableCard)
            return choosePlate
          })

          const blueAreaSortableObj = Sortable.create(popularMem, {
            group: 'dnd',
            animation: 10
          })
          const redAreaSortableObj = Sortable.create(unpopularMem, {
            group: 'dnd',
            animation: 10
          })
          const normalAreaSortableObj = Sortable.create(normalArea, {
            group: 'dnd',
            animation: 10
          })
          const takenAreaSortableObj = Sortable.create(takenArea, {
            group: 'dnd',
            animation: 10
          })

          const choosePlateSortableObj = Sortable.create(choosePlate, {
            group: 'dnd',
            animation: 10
          })

          console.log(blueAreaSortableObj, redAreaSortableObj, takenAreaSortableObj, normalAreaSortableObj, choosePlateSortableObj)
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
        const cardgroup = sortPro.filter(el => el.category === '拆卡')
        this.userProductList = cardgroup
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
      let httpMethod = ''
      // 新增商品
      if (type === 'new') {
        httpMethod = 'post'
        console.log('新增商品')
        this.perProduct.id = new Date().getTime()
        this.perProduct.category = '拆卡'
        console.log(this.perProduct)
      }
      if (type === 'edit') {
        httpMethod = 'put'
        url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
        console.log('編輯現有商品')
      }
      if (type === 'group') {
        httpMethod = 'post'
        const mustChoose = document.querySelectorAll('.mustArea .draggable img')
        mustChoose.forEach(i => {
          const dataIdValue = i.getAttribute('data-id')
          this.mustChoose.push(dataIdValue)
        })
        const scarcity = document.querySelectorAll('.scarceArea .draggable img')
        scarcity.forEach(i => {
          const dataIdValue = i.getAttribute('data-id')
          this.scarcity.push(dataIdValue)
        })
        const normalChoose = document.querySelectorAll('.normalArea .draggable img')
        normalChoose.forEach(i => {
          const dataIdValue = i.getAttribute('data-id')
          this.normalArea.push(dataIdValue)
        })

        this.mustChoose.forEach((el, i, arr) => {
          this.leftMember[arr[i]] = true
        })

        this.scarcity.forEach((el, i, arr) => {
          this.leftMember[arr[i]] = true
        })

        this.normalArea.forEach((el, i, arr) => {
          this.leftMember[arr[i]] = true
        })

        console.log(this.leftMember)
        this.perProduct.id = new Date().getTime()
        // this.perProduct.leftMember為filter用
        this.perProduct.leftMember = this.leftMember
        // this.perProduct.mustChoose跟scarcity為render用
        if (this.mustChoose.length !== 0) {
          this.perProduct.mustChoose = this.mustChoose
        }
        if (this.scarcity.length !== 0) {
          this.perProduct.scarcity = this.scarcity
        }
        this.perProduct.category = '拆卡'
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
      console.log(this.perProduct)
      console.log(httpMethod, url)
      axios[httpMethod](url, { data: this.perProduct }).then(res => {
        console.log(this.perProduct)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1800
        })
        this.mustChoose = []
        this.scarcity = []
        this.leftMember = {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false
        }
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
      // 資料需要sellerId/ type記得引入localstorage
      // let url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
      // let httpMethod = 'post'
      // this.$http[httpMethod](url, { data: this.perProduct }).then((res) => {
      //   (res.data)
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

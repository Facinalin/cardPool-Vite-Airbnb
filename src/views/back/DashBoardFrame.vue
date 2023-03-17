<template>
    <div class="container d-flex flex-column mb-8 ch-font">
        <div class="text-end mt-4 mb-4">
        <button v-if="ifGroupCreator" class="btn btn-secondary text-white bd-rd-12" @click="openModal('group')">
          拆卡開團
        </button>
        <button v-else class="btn btn-primary text-white bd-rd-12">
          放棄所有卡位
        </button>
      </div>
       <div class="row">
        <div class="col-2 bg-secondary bd-rd-12 px-7 py-6">
          <ul class="ch-font admin-sidebar pt-2">
            <li class="fs-5 mb-3 text-center text-white cursor-p">訂單管理</li>
            <li class="fs-5 mb-3 text-center text-white cursor-p" @click="toGeneralProductPanel">一般產品</li>
            <li class="fs-5 mb-3 text-center text-white cursor-p d-flex align-items-center justify-content-center" data-bs-toggle="collapse" data-bs-target="#cardGroupCollapse" aria-expanded="false" aria-controls="collapseExample" @click="checkDrop">拆卡團<img src="../../assets/polygon.svg" alt="" class="dropdown-icon ms-2" :class="{ 'tr-rotate':dropdownList}"></li>
            <div class="collapse bg-secondary" id="cardGroupCollapse">
  <div class="card card-body bg-secondary border-0">
    <ul>
      <li class="fs-6 mb-2 text-center cursor-p dropdown-list dark-pink" @click="toGroupCreatorPanel">我要開團</li>
      <li class="fs-6 mb-2 text-center cursor-p dropdown-list dark-pink" @click="toGroupParticipantPanel">我拆的團</li>
    </ul>
  </div>
</div>
<li class="fs-5 mb-3 text-center text-white">會員設定</li>
          </ul>
        </div>
            <router-view v-if="checkCardGroup" name="membercardgroup" :ifGroupCreator="ifGroupCreator"></router-view>
            <router-view v-if="checkGeneralProduct" name="generalproduct"></router-view>
        <div class="modal fade" tabindex="-1" id="addProductModal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-maingray">
        <h4 v-if="isNew === 'group'" class="modal-title text-secondary-trans fs-4 ls-4">新增拆卡團</h4>
        <h4 v-if="isNew === 'edit'" class="modal-title text-secondary-trans fs-4 ls-4">編輯拆卡團</h4>
        <button type="button" class="btn-close text-white" @click=closeModal aria-label="Close"><font-awesome-icon icon="fa-solid fa-xmark" class="text-white" style="font-size:24px"/></button>
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
  <div v-if="Array.isArray(perProduct.imagesUrl)">
    <div class="mb-1" v-for="(image, key) in perProduct.imagesUrl" :key="key">
      <div class="form-group">
        <label for="imageUrl" class="form-label">圖片網址</label>
        <input v-model="perProduct.imagesUrl[key]" type="text" class="form-control"
          placeholder="請輸入圖片連結">
      </div>
      <img class="img-fluid" :src="image">
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
  <div v-else>
    <button class="btn btn-outline-primary btn-sm d-block w-100"
      @click="createImages">
      新增圖片
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
      <div class="form-group mb-3">
              <label for="price" class="form-label">通路</label><font-awesome-icon icon="fa-solid fa-star-of-life" class="text-mainorange modalIcon" />
              <select v-model="perProduct.channel" class="form-select" aria-label="Default select example" id="member">
  <option v-for="channel in channels" :key="channel" :value="channel" selected>{{ channel}}</option>
</select>
            </div>
  </div>
  <div class="col-sm-12 mb-4">
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
        <button type="button" class="btn btn-secondary text-white" @click="closeModal">取消</button>
        <button v-if="isNew ==='edit'" type="submit" class="btn btn-primary text-white" @click="updateProduct('edit', perProduct)">確認修改</button>
        <button v-if="isNew ==='group'" type="submit" class="btn btn-primary text-white" @click="updateProduct('group')">確認開團</button>
      </div>
    </v-form>
    </div>
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
import { mapActions, mapState } from 'Pinia'
import cartsStore from '../../store/cartsStore.js'
import adminStore from '../../store/adminStore.js'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env
let productModal = null

export default {
  data () {
    return {
      checkCardGroup: false,
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
        channel: '非特定通路',
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
      normalArea: [],
      channels: ['非特定通路', '阿拉丁', 'Music Planet', 'JYP', 'YES24', 'KTown4U', 'WithMuu', 'SoundWave', '其它通路'],
      ifGroupCreator: false,
      dropdownList: false,
      checkGeneralProduct: false
    }
  },
  methods: {
    openModal (isNew, item) {
      if (isNew === 'edit') {
        this.isNew = 'edit'
        productModal.show()
        this.perProduct = { ...item }
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
      } if (isNew === 'group') {
        console.log('我是dashboard')
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
        this.ifGroup = true
      } else if (isNew === 'production') {
        console.log('production')
      }
      productModal.show()
      const unpopularMem = this.$refs.redArea
      const popularMem = this.$refs.blueArea
      const normalArea = this.$refs.normalArea
      const takenArea = this.$refs.takenArea
      const choosePlate = this.$refs.choosePlate
      // const unpopularMem = document.getElementById('redDragArea')
      // const popularMem = document.getElementById('blueDragArea')
      console.log(unpopularMem) // 點開第一次為undefined，點開第二次取到該dom元素，已經試過document.querySelector結果一樣
      const backlogArr = [
        { content: '<img src="https://i.imgur.com/5VrxHl4.png" alt="Bangchan" data-id="1"><p class="en-font" style="font-weight:100;">Bangchan</p>' },
        { content: '<img src="https://i.imgur.com/Uf8hp4X.png" alt="Leeknow" data-id="2"><p class="en-font" style="font-weight:100;">Leeknow</p>' },
        { content: '<img src="https://i.imgur.com/DlrpnvJ.png" alt="Changbin" data-id="3"><p class="en-font" style="font-weight:100;">Changbin</p>' },
        { content: '<img src="https://i.imgur.com/lBM4VXu.png" alt="Hyunjin" data-id="4"><p class="en-font" style="font-weight:100;">Hyunjin</p>' },
        { content: '<img src="https://i.imgur.com/sdkVX6b.png" alt="Han" data-id="5"><p class="en-font" style="font-weight:100;">Han</p>' },
        { content: '<img src="https://i.imgur.com/vnEW0jA.png" alt="Felix" data-id="6"><p class="en-font" style="font-weight:100;">Felix</p>' },
        { content: '<img src="https://i.imgur.com/vee74L9.png" alt="Seungmin" data-id="7"><p class="en-font" style="font-weight:100;">Seungmin</p>' },
        { content: '<img src="https://i.imgur.com/OHOP739.png" alt="IN" data-id="8"><p class="en-font" style="font-weight:100;">IN</p>' }
      ]
      const checkDrag = document.querySelectorAll('.draggable')
      console.log(checkDrag) // 點開第一次nodelist長度為0
      if (unpopularMem && checkDrag.length === 0) {
      // 新增時尚未指定成員
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
      const allDraggable = document.querySelectorAll('.draggable img')
      if (isNew === 'edit' && allDraggable.length === 8) {
        // 編輯時已有各區指定成員
        console.log('8個')
        console.log(this.perProduct)
        console.log(allDraggable)
        const mustChoose = this.perProduct.mustChoose
        const scarcity = this.perProduct.scarcity
        const normalMember = { ...this.perProduct.leftMember }
        const checkNullFalse = Object.values(normalMember)
        const takenMember = []

        for (let i = 0; i < checkNullFalse.length; i++) {
          if (normalMember[i] === false) {
            takenMember.push(i)
            delete normalMember[i]
          }
          if (normalMember[i] === null) {
            delete normalMember[i]
          }
        }
        mustChoose.forEach((el, i, arr) => {
          if (normalMember[arr[i]] === true) {
            delete normalMember[arr[i]]
          }
        })
        scarcity.forEach((el, i, arr) => {
          if (normalMember[arr[i]] === true) {
            delete normalMember[arr[i]]
          }
        })
        console.log(takenMember)
        const normalChoose = Object.keys(normalMember)
        //   const popularMem = this.$refs.blueArea
        // const normalArea = this.$refs.normalArea
        // const takenArea = this.$refs.takenArea
        // const choosePlate = this.$refs.choosePlate
        allDraggable.forEach(function (element) {
          const dataId = element.getAttribute('data-id')
          const imgUrl = element.getAttribute('src')
          const memberName = element.getAttribute('alt')
          if (mustChoose.length > 0) {
            mustChoose.forEach(el => {
              if (el === dataId) {
                const draggableCard = document.createElement('div')
                draggableCard.setAttribute('draggable', 'true')
                draggableCard.classList.add('draggable')
                draggableCard.innerHTML = `<img src="${imgUrl}" alt="${memberName}" data-id="${dataId}"><p>${memberName}</p>`
                unpopularMem.appendChild(draggableCard)
              }
            })
          }

          if (scarcity.length > 0) {
            scarcity.forEach(el => {
              if (el === dataId) {
                const draggableCard = document.createElement('div')
                draggableCard.setAttribute('draggable', 'true')
                draggableCard.classList.add('draggable')
                draggableCard.innerHTML = `<img src="${imgUrl}" alt="${memberName}" data-id="${dataId}"><p>${memberName}</p>`
                popularMem.appendChild(draggableCard)
              }
            })
          }

          if (normalChoose.length > 0) {
            normalChoose.forEach(el => {
              if (el === dataId) {
                const draggableCard = document.createElement('div')
                draggableCard.setAttribute('draggable', 'true')
                draggableCard.classList.add('draggable')
                draggableCard.innerHTML = `<img src="${imgUrl}" alt="${memberName}" data-id="${dataId}"><p>${memberName}</p>`
                normalArea.appendChild(draggableCard)
              }
            })
          }

          if (takenMember.length > 0) {
            takenMember.forEach(el => {
              if (el === dataId * 1) {
                const draggableCard = document.createElement('div')
                draggableCard.setAttribute('draggable', 'true')
                draggableCard.classList.add('draggable')
                draggableCard.innerHTML = `<img src="${imgUrl}" alt="${memberName}" data-id="${dataId}"><p>${memberName}</p>`
                takenArea.appendChild(draggableCard)
              }
            })
          }
          choosePlate.innerHTML = ''
        })
      }
      console.log(isNew)
    },
    // findFirstDuplicateElement (arr) {
    //   const elementCount = {}
    //   for (let i = 0; i < arr.length; i++) {
    //     if (elementCount[arr[i]]) {
    //       return arr[i]
    //     } else {
    //       elementCount[arr[i]] = 1
    //     }
    //   }
    //   return null
    // },
    closeModal () {
      this.perProduct = {
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
      }
      const unpopularMem = this.$refs.redArea
      const popularMem = this.$refs.blueArea
      const normalArea = this.$refs.normalArea
      const takenArea = this.$refs.takenArea
      console.log(unpopularMem)
      unpopularMem.innerHTML = ''
      popularMem.innerHTML = ''
      normalArea.innerHTML = ''
      takenArea.innerHTML = ''
      productModal.hide()
    },
    getProductList () {
      const url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/products/all`
      axios.get(url).then(res => {
        const sortPro = Object.values(res.data.products)
        sortPro.splice(0, 10)
        const cardgroup = sortPro.filter(el => el.category === '拆卡' && el.created_At)
        this.userProductList = cardgroup
        console.log(this.userProductList)
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
    updateProduct (type, perProduct) {
      let url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product`
      let httpMethod = ''
      if (type === 'edit') {
        // 編輯現有拆卡團
        httpMethod = 'put'
        url = `${VITE_APP_URL2}/api/${VITE_APP_PATH}/admin/product/${perProduct.id}`
      }
      if (type === 'group') {
        // 新增拆卡團
        httpMethod = 'post'
        this.perProduct.created_At = new Date().getTime()
        // Math.floor(this.perProduct.id / 1000)
        // 想記錄成團時間
      }
      const checkSortable = document.querySelectorAll('.choosePlate .draggable')
      if (checkSortable.length !== 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '卡位成員資訊有誤，請檢查！',
          showConfirmButton: false,
          timer: 1800
        })
      } else {
        // 編輯與新增皆共用以下：
        const mustChoose = document.querySelectorAll('.mustArea .draggable img')
        mustChoose.forEach(i => {
          const dataIdValue = i.getAttribute('data-id')
          this.mustChoose.push(dataIdValue)
          console.log(`must${dataIdValue}`)
        })
        const scarcity = document.querySelectorAll('.scarceArea .draggable img')
        scarcity.forEach(i => {
          const dataIdValue = i.getAttribute('data-id')
          this.scarcity.push(dataIdValue)
          console.log(`scarce${dataIdValue}`)
        })
        const normalChoose = document.querySelectorAll('.normalArea .draggable img')
        normalChoose.forEach(i => {
          const dataIdValue = i.getAttribute('data-id')
          this.normalArea.push(dataIdValue)
          console.log(`normal${dataIdValue}`)
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
        this.perProduct.leftMember = this.leftMember
        // this.perProduct.mustChoose跟scarcity為render用
        if (this.mustChoose.length !== 0) {
          this.perProduct.mustChoose = []
          this.perProduct.mustChoose = this.mustChoose
        }
        if (this.scarcity.length !== 0) {
          this.perProduct.scarcity = []
          this.perProduct.scarcity = this.scarcity
        }
        this.perProduct.category = '拆卡'
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
          let msg = '新增'
          if (type === 'edit') {
            msg = '修改'
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `成功${msg}卡團！`,
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
          this.closeModal()
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
    toGroupCreatorPanel () {
      this.checkCardGroup = true
      this.ifGroupCreator = true
      this.checkGeneralProduct = false
    },
    toGroupParticipantPanel () {
      this.checkCardGroup = true
      this.ifGroupCreator = false
      this.checkGeneralProduct = false
    },
    checkDrop () {
      if (this.dropdownList === false) { this.dropdownList = true } else { this.dropdownList = false }
    },
    toGeneralProductPanel () {
      this.checkGeneralProduct = true
    },
    ...mapActions(cartsStore, ['getCardGroupCart']),
    ...mapActions(adminStore, ['getProductList'])
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
  },
  computed: {
    ...mapState(cartsStore, ['cardGroupCart']),
    ...mapState(adminStore, ['userProductList'])
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

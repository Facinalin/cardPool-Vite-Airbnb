<template>
        <div v-if="ifGroupCreator" class="col-10">
          <h2 class="ch-font text-center text-white mb-6 fs-2 bg-dark-pink py-4 creator-title bb-dark-pink">我主拆的團們</h2>
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
              編輯資料
            </th>
            <th width="110">
              收團
            </th>
            <th width="100">
              刪除
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in userProductList" :key="item.id">
            <td>剩餘{{ ((Object.values(item.leftMember)).filter(el => el === true)).length }}位</td>
            <td>{{ (new Date(item.created_At)).getMonth()+1 }}月{{ (new Date(item.created_At)).getDate() }}日</td>
            <td class="text-center">
              {{ item.title }}
            </td>
            <td class="text-center">
              <button class="btn" data-bs-toggle="collapse" data-bs-target="#groupWaiterCollapse" aria-expanded="false" aria-controls="groupWaiterCollapse" @click="openModal('edit',item)"> <font-awesome-icon icon="fa-solid fa-pen-to-square" class="dark-pink fs-4"/></button>
            </td>
            <td class="text-center">
                <button type="button" class="btn btn-sm text-white me-2" @click="openModal('closing',item)">
                  <font-awesome-icon icon="fa-solid fa-clock" class="text-primary fs-4"/>
                </button>
            </td>
            <td>
                <button type="button" class="btn btn-sm text-white" @click="deletePerProduct(item.id)">
                  <font-awesome-icon icon="fa-solid fa-trash" class="text-mainorange fs-4"/>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="col-10">
      <h2 class="ch-font text-center text-white mb-6 fs-2 bg-dark-purple bb-dark-purple py-4 creator-title">我卡位中的團們</h2>
      <table class="table mt-4 text-center">
        <thead>
          <tr class="text-primary fs-5 pb-4">
            <th width="120">
              團主
            </th>
            <th width="110">開團日期</th>
            <th width="400">
              隨卡商品
            </th>
            <th width="110">
              卡位總人數
            </th>
            <th width="100">
              取消卡位
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in cardGroupCart" :key="item.id">
            <td>{{ item.user.name }}</td>
            <td>{{ (new Date(item.created_at)).getMonth()+1 }}月{{ (new Date(item.created_at)).getDate() }}日</td>
            <td class="text-center">
              {{ item.product.title }}
            </td>
            <td class="text-center">
                <button type="button" class="btn btn-primary btn-sm text-white me-2" @click="openModal('edit', item)">
                  99
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
    </div>

    <div class="modal fade" tabindex="-1" id="addProductModal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-maingray border-bottom-0">
        <h4 v-if="isNew === 'group'" class="modal-title text-secondary-trans fs-4 ls-4">新增拆卡團</h4>
        <h4 v-if="isNew === 'edit'" class="modal-title text-secondary-trans fs-4 ls-4">編輯拆卡團</h4>
        <h4 v-if="isNew === 'closing'" class="modal-title text-secondary-trans fs-4 ls-4">收團確認</h4>
        <button type="button" class="btn-close text-white" @click="closeModal" aria-label="Close"><font-awesome-icon icon="fa-solid fa-xmark" class="text-white" style="font-size:24px"/></button>
      </div>

      <div v-if="isNew === 'closing'" class="modal-body p-0">
        <div class="member-list bg-maingray">
    <div class="member-row member-row-sm d-flex justify-content-between mb-2 py-4 px-3">
    <div v-for="perMember in domLeftMember" :key="perMember.member" class="perMemberOption d-flex flex-column justify-content-center align-items-center mb-2" @click="(evt) =>chooseMember(perMember, evt)">
            <div class="member-img-sm mb-1 border-0" :class="{ 'memberDisabled': !perMember.left }">
                <img class="per-member small-head" :src="perMember.imgUrl" :alt="perMember.member" :data-id="perMember.memberNo" :class="{ 'bd-gray': perMember.left, 'cursor-a': perMember.left }">
            </div>
            <h2 class="text-white text-center fs-7 mb-1" :class="{ 'txtDisabled': !perMember.left }">{{ perMember.member }}</h2>
          </div>
      </div>
    </div>
<div class="py-6 px-5">
      <div class="row">
        <div class="col-sm-12">
          <div class="perLiner border border-primary bd-rd-12 py-3 px-4 mb-2">
<div class="upper d-flex justify-content-between mb-4">
  <div class="des d-flex justify-content-between align-items-center"><h2>順序：<span class="text-mainorange">2</span></h2><p>絲帶姐</p><p>主拆<span class="text-secondary ps-1">5</span></p><p>合拆<span class="text-primary ps-1">3</span></p></div>
<button type="button" class="btn btn-mainorange text-white bd-rd-20">收</button>
</div>
<div class="lower d-flex justify-content-start">
  <img src="https://i.imgur.com/5PlS2aH.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/ATWXtR9.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
</div>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="perLiner border border-primary bd-rd-12 py-3 px-4 mb-2">
<div class="upper d-flex justify-content-between mb-4">
  <div class="des d-flex justify-content-between align-items-center"><h2>順序：<span class="text-mainorange">1</span></h2><p>絲帶姐</p><p>主拆<span class="text-secondary ps-1">5</span></p><p>合拆<span class="text-primary ps-1">3</span></p></div>
<button type="button" class="btn btn-mainorange text-white bd-rd-20">收</button>
</div>
<div class="lower d-flex justify-content-start">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
  <img src="https://i.imgur.com/AANylPt.png" alt="" class="closing-liner-pic bd-rd-12">
</div>
          </div>
        </div>

      </div>
    </div>
<div class="modal-footer mt-6">
        <button type="button" class="btn btn-secondary text-white" @click="closeModal">取消</button>
        <button type="submit" class="btn btn-primary text-white" @click="updateProduct('edit', perProduct)">確認收團</button>
      </div>
    </div>

    <div v-else class="modal-body">
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
<!--  -->
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
  <div v-if="isNew !== 'closing'" class="col-sm-12 mb-4">
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
  <input type="radio" class="btn-check" name="domesticBtnRadio" id="hasDomestic" autocomplete="off" ref="hasDomestic" value="true" v-model="ifDomesticFee">
  <label class="btn btn-outline-mainorange toggleBtn" for="hasDomestic" @click="hasDomestic"><font-awesome-icon icon="fa-solid fa-check" /></label>

  <input type="radio" class="btn-check" name="domesticBtnRadio" id="btnradio2" autocomplete="off" value="false" v-model="ifDomesticFee">
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
  <input type="radio" class="btn-check" name="internationalBtnRadio" ref="hasInternational" id="hasInternational" autocomplete="off" value="true" v-model="ifInternational">
  <label class="btn btn-outline-mainorange toggleBtn" for="hasInternational" @click="hasInternational"><font-awesome-icon icon="fa-solid fa-check" /></label>

  <input type="radio" class="btn-check" name="internationalBtnRadio" id="btnradio4" autocomplete="off" value="false" v-model="ifInternational">
  <label class="btn btn-outline-maingray toggleBtn" for="btnradio4" @click="hasNoInternational"><font-awesome-icon icon="fa-solid fa-xmark" /></label>

</div>

<div v-if="ifInternational" class="btn-group btn-group-wider" role="group" aria-label="Basic radio toggle button group">

  <input type="radio" class="btn-check" name="internationalDetailBtnRadio" ref="needComplement" id="needComplement" autocomplete="off" value="true" v-model="ifComplement">
  <label class="btn btn-outline-primary toggleBtn" for="needComplement" @click="needComplement">需二補</label>

  <input type="radio" class="btn-check" name="internationalDetailBtnRadio" id="btnradio6" autocomplete="off" value="false" v-model="ifComplement">
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
<div class="modal-footer mt-6">
        <button type="button" class="btn btn-secondary text-white" @click="closeModal">取消</button>
        <button v-if="isNew==='edit'" type="submit" class="btn btn-primary text-white" @click="updateProduct('edit', perProduct)">確認修改</button>
        <button v-if="isNew==='group'" type="submit" class="btn btn-primary text-white" @click="updateProduct('group')">確認開團</button>
      </div>
    </v-form>
    </div>

  </div>
</div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'pinia'
import cartsStore from '../../store/cartsStore.js'
import adminStore from '../../store/adminStore.js'
import { Modal } from 'bootstrap'
import Sortable from 'sortablejs'
const { VITE_APP_URL2, VITE_APP_PATH } = import.meta.env

let productModal = null

export default {
  props: ['ifGroupCreator'],
  watch: {
    userProductList: {
      handler (newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          console.log('someData length has changed:', newVal.length)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      checkLiningUp: false,
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
      dropdownList: false,
      domLeftMember: [
        {
          memberNo: '1',
          member: 'Bangchan',
          imgUrl: 'https://i.imgur.com/5PlS2aH.png',
          left: false
        },
        {
          memberNo: '2',
          member: 'Leeknow',
          imgUrl: 'https://i.imgur.com/ATWXtR9.png',
          left: false
        },
        {
          memberNo: '3',
          member: 'Changbin',
          imgUrl: 'https://i.imgur.com/XhAHWYu.png',
          left: false
        },
        {
          memberNo: '4',
          member: 'Hyunjin',
          imgUrl: 'https://i.imgur.com/AANylPt.png',
          left: false
        },
        {
          memberNo: '5',
          member: 'Han',
          imgUrl: 'https://i.imgur.com/UQ7he1p.png',
          left: false
        },
        {
          memberNo: '6',
          member: 'Felix',
          imgUrl: 'https://i.imgur.com/UFTzeFH.png',
          left: false
        },
        {
          memberNo: '7',
          member: 'Seungmin',
          imgUrl: 'https://i.imgur.com/UiFtZSu.png',
          left: false
        },
        {
          memberNo: '8',
          member: 'I.N',
          imgUrl: 'https://i.imgur.com/3JdX3kx.png',
          left: false
        }
      ]
    }
  },
  methods: {
    openModal (isNew, item) {
      if (isNew === 'edit') {
        this.isNew = 'edit'
        productModal.show()
        this.perProduct = { ...item }
        if (this.perProduct.domestic_Transport.courier !== '面交') {
          this.ifDomesticFee = true
        }
        if (this.perProduct.domestic_Transport.courier === '面交') {
          this.ifDomesticFee = false
        }
        if (this.perProduct.international_Transport.complement === true) {
          this.ifInternational = true
          this.ifComplement = true
        }
        if (this.perProduct.international_Transport.complement === false && this.perProduct.international_Transport.amount !== 0) {
          this.ifInternational = true
          this.ifComplement = false
        }
        if (this.perProduct.international_Transport.complement === false && this.perProduct.international_Transport.amount === 0) {
          this.ifInternational = false
          this.ifComplement = false
        }
      } if (isNew === 'group') {
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
      } else if (isNew === 'closing') {
        this.isNew = 'closing'
        this.perProduct = { ...item }
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
        const normalChoose = Object.keys(normalMember)
        console.log(normalChoose, takenMember)
        normalChoose.forEach(el => {
          this.domLeftMember.forEach(per => {
            if (per.memberNo === el) {
              per.left = true
            }
          })
        })
        console.log(this.domLeftMember)
        console.log('here')
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

        if (mustChoose) {
          mustChoose.forEach((el, i, arr) => {
            if (normalMember[arr[i]] === true) {
              delete normalMember[arr[i]]
            }
          })
        }

        if (scarcity) {
          scarcity.forEach((el, i, arr) => {
            if (normalMember[arr[i]] === true) {
              delete normalMember[arr[i]]
            }
          })
        }

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
          if (mustChoose) {
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

          if (scarcity) {
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
      if (unpopularMem || popularMem || normalArea || takenArea) {
        unpopularMem.innerHTML = ''
        popularMem.innerHTML = ''
        normalArea.innerHTML = ''
        takenArea.innerHTML = ''
      }
      productModal.hide()
    },
    filterCardGroupCart () {
      this.cardGroupCart = this.carts
    },
    toCheckLiningUp () {
      this.checkLiningUp = true
    },
    toGroupCreator () {
      this.checkLiningUp = false
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
    ...mapActions(cartsStore, ['getCardGroupCart']),
    ...mapActions(adminStore, ['getProductList'])
  },
  computed: {
    ...mapState(cartsStore, ['cardGroupCart']),
    ...mapState(adminStore, ['userProductList'])
  },
  mounted () {
    const addProductModal = document.getElementById('addProductModal')
    productModal = new Modal(addProductModal, {
      keyboard: false,
      backdrop: 'static'
    })
    this.getCardGroupCart()
    this.getProductList()
    // chatGPT版本：無效
    // const checkDrag = document.querySelectorAll('.draggable')
    // console.log(checkDrag) // 點開第一次nodelist長度為0
    // const unpopularMem = this.$refs.redArea
    // if (unpopularMem && checkDrag.length === 0) {
    //   const backlogArr = [
    //     { content: '<img src="https://i.imgur.com/5VrxHl4.png" alt="Bangchan" data-id="1"><p class="en-font" style="font-weight:100;">Bangchan</p>' },
    //     { content: '<img src="https://i.imgur.com/Uf8hp4X.png" alt="Leeknow" data-id="2"><p class="en-font" style="font-weight:100;">Leeknow</p>' },
    //     { content: '<img src="https://i.imgur.com/DlrpnvJ.png" alt="Changbin" data-id="3"><p class="en-font" style="font-weight:100;">Changbin</p>' },
    //     { content: '<img src="https://i.imgur.com/lBM4VXu.png" alt="Hyunjin" data-id="4"><p class="en-font" style="font-weight:100;">Hyunjin</p>' },
    //     { content: '<img src="https://i.imgur.com/sdkVX6b.png" alt="Han" data-id="5"><p class="en-font" style="font-weight:100;">Han</p>' },
    //     { content: '<img src="https://i.imgur.com/vnEW0jA.png" alt="Felix" data-id="6"><p class="en-font" style="font-weight:100;">Felix</p>' },
    //     { content: '<img src="https://i.imgur.com/vee74L9.png" alt="Seungmin" data-id="7"><p class="en-font" style="font-weight:100;">Seungmin</p>' },
    //     { content: '<img src="https://i.imgur.com/OHOP739.png" alt="IN" data-id="8"><p class="en-font" style="font-weight:100;">IN</p>' }
    //   ]
    //   const choosePlate = this.$refs.choosePlate
    //   backlogArr.map((ele) => {
    //     const draggableCard = document.createElement('div')
    //     draggableCard.setAttribute('draggable', 'true')
    //     draggableCard.classList.add('draggable')
    //     draggableCard.innerHTML = ele.content

    //     choosePlate.appendChild(draggableCard)
    //     return choosePlate
    //   })
    //   const redAreaSortableObj = Sortable.create(unpopularMem, {
    //     group: 'dnd',
    //     animation: 10
    //   })
    //   console.log(redAreaSortableObj)
    // }
  }
  // chatGPT版本：無效
  // created () {
  //   const checkDrag = document.querySelectorAll('.draggable')
  //   console.log(checkDrag) // 點開第一次nodelist長度為0
  //   const unpopularMem = this.$refs.redArea
  //   if (unpopularMem && checkDrag.length === 0) {
  //     const redAreaSortableObj = Sortable.create(unpopularMem, {
  //       group: 'dnd',
  //       animation: 10
  //     })
  //     console.log(redAreaSortableObj)
  //   }
  // }
}
</script>

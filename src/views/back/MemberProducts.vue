<template>
    <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary" @click="openModal('new')">
          建立新的產品
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
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" tabindex="-1" id="addProductModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">測試標題</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <div class="modal-body">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">.col-md-4</div>
      <div class="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
    </div>
    <div class="row">
      <div class="col-md-3 ms-auto">.col-md-3 .ms-auto</div>
      <div class="col-md-2 ms-auto">.col-md-2 .ms-auto</div>
    </div>
    <div class="row">
      <div class="col-md-6 ms-auto">.col-md-6 .ms-auto</div>
    </div>
    <div class="row">
      <div class="col-sm-9">
        Level 1: .col-sm-9
        <div class="row">
          <div class="col-8 col-sm-6">
            Level 2: .col-8 .col-sm-6
          </div>
          <div class="col-4 col-sm-6">
            Level 2: .col-4 .col-sm-6
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import 'bootstrap'
import 'popper.js'
const { VITE_APP_URL } = import.meta.env
const userId = localStorage.getItem('userId')
// here
// let productModal = null

export default {
  data () {
    return {
      userProductList: []
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
    openModal () {
    },
    getUserProduct () {
      const url2 = `${VITE_APP_URL}/600/users/${userId}/products`
      // const url = `${VITE_APP_URL}/products?sellerId=${userId}`
      this.$http.get(url2)
        .then(res => {
          // TBC
          this.userProductList = res.data
        })
        .catch(err => {
          console.log(err.data)
        })
    }
  },
  mounted () {
    // this.getUserProduct()
    // here
    // productModal = new bootstrap.Modal(document.getElementById('addProductModal'), {
    //   keyboard: false,
    //   backdrop: 'static'
    // })
  }
}
</script>

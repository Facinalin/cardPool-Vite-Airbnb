<template>
    <div class="container my-5">
        <div class="row">
            <div class="product-img col-md-12 col-lg-5">
                <div class="d-flex justify-content-center mb-6">
                    <img :src="product.imgUrl" alt="" class="cardImg"></div>
        </div>
        <!--商品選項-右-->
        <div class="col-md-12 col-lg-7 ps-lg-9">
            <h2>{{ product.title }}</h2>
            <h4>${{ product.price }}元</h4>
            <p>{{ product.description }}</p></div>
        <div class="btn-area btns d-flex justify-content-end">
          <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 me-3 confirmJoinBtn d-flex">確認卡位<span></span></button>
          <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3">收藏</button>
      </div>
        <!--拆卡注意事項-全-->
        <div class="notice col-12 border border-2 border-secondary rounded-xxl d-flex flex-wrap mt-5 mb-5">
          <p class="col-sm-12 col-md-6 col-lg-6 py-4 px-5">
            Q：我要如何知道成團與否？<br>
            （1) 請至註冊信箱內檢查email。<br>
            （2) 請至『會員專區>收藏與排卡>卡位狀態查詢』查看成團進度。
        </p>
        <p class="col-sm-12 col-md-6 col-lg-6 py-4 px-5">
            Q：我要如何取消卡位？<br>
            * 本站取消規定：當初卡的成員位數全部取消。請私訊賣家告知取消理由，賣方可從後台手動取消。
        </p>
        </div>
        </div>
    </div>
</template>

<script>

const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getPerProduct () {
      const { id } = this.$route.params
      const url = `${VITE_APP_URL}/products/${id}`
      this.$http.get(url)
        .then(res => {
          this.product = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getPerProduct()
  }
}
</script>

<style>
.product-img{
    max-width: 100%;
    height: auto;
}

.cardImg{
    max-width: 300px;
    border-radius: 12px;
    object-fit: cover;
}

.product-btn{
    color: #9B9BE3;
}

.product-btn:hover{
    color: #ffffff;
    background: #9B9BE3
    }

.notice{
    margin-top: 7px;
    position: relative;
    line-height: 2;
    border-radius: 20px;
}
</style>

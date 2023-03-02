<template>
  <div class="container">
    <div class="d-flex justify-content-center mt-5 wrap">
    <div class="border border-0 d-flex flex-column justify-content-center" style="width: 18rem;">
  <img src="https://i.imgur.com/uUGHNYj.png" class="card-img-top error-pic" alt="...">
  <div class="text-center mt-3">
    <h3>404錯誤：此頁面不存在！</h3>
    <p>網址輸入有誤</p>
    <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 fs-7"><router-link to="/">點此回卡舖首頁</router-link></button>
  </div>
</div>
</div>
</div>
</template>

<style>
.error-pic{
    width: 350px;
    height: auto;
    border-radius: 50%;
    border: 16px solid #1E1C1C;
}

.wrap{
  height: 100vh;
  padding-top: 10vh;
  line-height: 1.5;
}
</style>

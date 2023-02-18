<template>
      <div class="wrapper">
    <div class="row">
        <div class="poster-area login-bg col-5">
        </div>
        <div class="col-1">
        </div>
      <div class="col-6 pt-8 pb-80">
        <img src="../../assets/會員登入.svg" alt="">
        <form action="" class="my-4">
         <label for="logAccountInput" class="mb-2"><h3 class="fz-20">帳號 Account/ Email Address</h3></label>
         <input v-model="user.username" type="text" id="logAccountInput" class="form-control rounded-xl border border-secondary mb-5 py-2 px-3" placeholder="請輸入信箱" aria-label="Username" aria-describedby="basic-addon1">
         <label for="logPasswordInput" class="mb-2"><h3 class="fz-20">密碼 Password</h3></label>
         <input v-model="user.password" type="text" id="logPasswordInput" class="form-control rounded-xl border border-secondary mb-5 py-2 px-3" placeholder="請輸入8位數密碼，含英文數字" aria-label="Password" aria-describedby="basic-addon1">
         <button type="button"  class="logInInfo-btn btn btn-secondary rounded-xxl text-white py-2 px-9 mb-4 fz-20" @click.prevent="login">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = `${VITE_APP_URL}/admin/signin`
      this.$http.post(api, this.user).then((response) => {
        const { token, expired } = response.data
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
        alert('登入成功！')
        this.$router.push('/admin/products')
        // 轉址先關掉
        // window.location = 'products.html'
      }).catch((err) => {
        alert(err.response.data.message)
      })
    }
  }
}

</script>

<style>
.poster-area{
    background-repeat: no-repeat;
    background-size:contain;
    max-width: 100%;
    height: 100vh;
    max-height: 950px;
}

.login-bg{
    background-image: url(../../assets/logInPic.png);
}

.log-sign-title{
    -webkit-text-stroke: 1.4px #1E1C1C;
}

.fz-66-w{
  font-size: 66px;
  font-weight: 500;
  /* 全域 */
}

.wrapper{
  padding: 0px 60px;
}

.pb-80{
    padding-bottom: 80px;
}

</style>

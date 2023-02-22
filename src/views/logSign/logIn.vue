<template>
      <div class="container">
      <div v-if="isLogInPanel" class="loginPanel row">
        <div class="poster-area login-bg col-lg-5 col-md-12 col-sm-12">
        </div>
        <div class="col-lg-1">
        </div>
      <div class="col-lg-6 pt-8 pb-80 col-md-12 col-sm-12">
        <img src="../../assets/會員登入.svg" alt="" class="mb-8">
        <form action="" class="my-4">
          <div class="inputGroup">
    <input id="email" v-model="user.email" type="text" required="" autocomplete="off"  class="mb-5 py-2 px-3">
    <label for="email">帳號 Account/ Email Address</label>
</div>
<div class="inputGroup">
    <input id="password" v-model="user.password" type="text" required="" autocomplete="off"  class="mb-5 py-2 px-3">
    <label for="password">密碼 Password</label>
</div>
<button type="button"  class="logInInfo-btn btn btn-secondary rounded-xxl text-white py-2 px-9 mb-4 fz-20" @click.prevent="login">登入</button>
<div class="d-flex justify-content-between">
        <button type="button" class="toLogin-btn btn btn-white border border-primary rounded-xxl text-primary py-2 px-3 fz-16-o" @click="toSignUpPanel">沒有帳號？點此註冊</button>
        <button type="button" class="toLogin-btn btn btn-white border border-primary rounded-xxl text-primary py-2 px-3 fz-16-o">忘記密碼</button>
      </div>
        </form>
      </div>
    </div>

    <div v-else class="signUpPanel row">
      <div class="col-6 py-8">
        <img src="../../assets/signUpTitle.svg" alt="" class="mb-8">
        <form action="">
         <div class="inputGroup">
    <input id="email" v-model="perUser.email" type="text" required="" autocomplete="off"  class="mb-5 py-2 px-3">
    <label for="email">帳號 Account/ Email Address</label>
</div>
<div class="inputGroup">
    <input id="password" type="text" required="" autocomplete="off"  class="mb-5 py-2 px-3">
    <label for="password">密碼 Password</label>
</div>
<div class="inputGroup">
    <input id="password" v-model="perUser.password" type="text" required="" autocomplete="off"  class="mb-5 py-2 px-3">
    <label for="password">確認密碼 Confirm Password</label>
</div>

         <button type="button"  class="signUpInfo-btn btn btn-secondary rounded-xxl text-white py-2 px-9 mb-4 fz-20" @click="signUp">註冊</button>
        </form>
        <button type="button" id="toLogin-btn" class="btn btn-white border border-primary rounded-xxl text-primary py-2 px-3 fz-16-o" @click="toLoginPanel">已有帳號？點此登入</button>
      </div>
      <div class="col-1">
      </div>
      <div class="poster-area signup-bg col-5">
      </div>
    </div>
  </div>

</template>

<script>
import Swal from 'sweetalert2'

const { VITE_APP_URL } = import.meta.env
let token = ''

export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      perUser: {
        email: '',
        password: ''
      },
      isLogInPanel: true
    }
  },
  methods: {
    login () {
      const api = `${VITE_APP_URL}/login`
      this.$http.post(api, this.user).then((response) => {
        // const { token, expired } = response.data
        // 寫入 cookie token
        // // expires 設置有效時間
        // document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
        console.log(response.data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '登入成功!',
          showConfirmButton: false,
          timer: 1800
        })
        this.$router.push('/admin/products')
        token = response.data.accessToken
        localStorage.setItem('user1hrToken', token)
        localStorage.setItem('userId', response.data.user.id) // 這句重要
        // 轉址先關掉
        // window.location = 'products.html'
      }).catch((err) => {
        console.log(err)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '帳密有誤，請重新輸入！',
          showConfirmButton: false,
          timer: 1800
        })
        this.user.email = ''
        this.user.password = ''
      })
    },
    toLoginPanel () {
      this.isLogInPanel = true
    },
    toSignUpPanel () {
      this.isLogInPanel = false
    },
    signUp () {
      const api = `${VITE_APP_URL}/register`
      this.$http.post(api, this.perUser).then((response) => {
        console.log(response)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '註冊成功!',
          showConfirmButton: false,
          timer: 1800
        })
        this.isLogInPanel = true
      }).catch((err) => {
        console.log(err)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '信箱或密碼格式不全!',
          showConfirmButton: false,
          timer: 1800
        })
      })
    }
  },
  mounted () {

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

.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin: 1em 0 1em 0;
  max-width: 100%;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em 0.8em 0em 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 20px;
  width: 100%;
}

.inputGroup label {
  font-size: 100%;
  position: absolute;
  left: 0;
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: #1E1C1C
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #ffffff;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: #E8A8D4;
}

@media (max-width:767px){
  .login-bg{
    background-image: url(../../assets/logInPic-sm-png)
  }
  .poster-area{
    background-repeat: no-repeat;
    background-size:contain;
    max-width: 100%;
    height: 140px;
}
  }

.signup-bg{
  background-image: url(../../assets/signUpPic.png);
}

</style>

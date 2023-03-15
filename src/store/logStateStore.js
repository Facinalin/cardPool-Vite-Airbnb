import { defineStore } from 'Pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
const { VITE_APP_URL2 } = import.meta.env

export default defineStore('logStateStore', {
  state: () => {
    return {
      ifLogged: false
    }
  },
  actions: {
    checkAdmin () {
      const url = `${VITE_APP_URL2}/api/user/check`
      axios.post(url)
        .then((res) => {
          this.ifLogged = true
          console.log('到這')
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
    clearAllCookies () {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    }
  }
})

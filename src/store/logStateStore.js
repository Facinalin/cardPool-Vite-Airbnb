import { defineStore } from 'Pinia'

export default defineStore('logStateStore', {
  actions: {
    checkLogged () {
      const userToken = localStorage.getItem('user1hrToken')
      const userId = localStorage.getItem('userId')
      return !!(!userToken && !userId)
    }
  }
})

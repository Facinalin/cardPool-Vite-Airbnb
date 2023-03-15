import { createApp } from 'vue'
import { createPinia } from 'Pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faUser, faCheck, faXmark, faStarOfLife, faPenToSquare, faTrash, faSpinner, faCommentDots, faStar, faHouse, faHeart, faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineRule, configure, Field, Form, ErrorMessage } from 'vee-validate'
import { required, email, max } from '@vee-validate/rules'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import './assets/all.scss'

configure({
  generateMessage: ({ field, rule }) => {
    const messages = {
      required: `${field} is required`,
      email: `Invalid ${field} format`
    }
    return messages[rule]
  }
})
defineRule('required', required)
defineRule('email', email)
defineRule('max', max)

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(VueAxios, axios)
app.use(router)
app.use(bootstrap)
library.add(faCartShopping, faUser, faCheck, faXmark, faStarOfLife, faPenToSquare, faTrash, faSpinner, faCommentDots, faStar, faHouse, faHeart, faArrowLeft, faClock)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')

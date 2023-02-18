import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/all.scss'

const app = createApp(App)

// app.component('VForm', VeeValidate.Form);
// app.component('VField', VeeValidate.Field);
// app.component('ErrorMessage', VeeValidate.ErrorMessage);

// VeeValidate.defineRule('email', VeeValidateRules['email']);
// VeeValidate.defineRule('required', VeeValidateRules['required']);
// VeeValidate.defineRule('min', VeeValidateRules['min']);
// VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')

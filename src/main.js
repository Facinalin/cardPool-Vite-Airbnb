import { createApp } from 'vue'
import { createPinia } from 'Pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faUser, faCheck, faXmark, faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Sortable from '@shopify/draggable/lib/sortable'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import './assets/all.scss'

const app = createApp(App)
const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li'
})

sortable.on('sortable:start', () => console.log('sortable:start'))
sortable.on('sortable:sort', () => console.log('sortable:sort'))
sortable.on('sortable:sorted', () => console.log('sortable:sorted'))
sortable.on('sortable:stop', () => console.log('sortable:stop'))

// app.component('VForm', VeeValidate.Form);
// app.component('VField', VeeValidate.Field);
// app.component('ErrorMessage', VeeValidate.ErrorMessage);

// VeeValidate.defineRule('email', VeeValidateRules['email']);
// VeeValidate.defineRule('required', VeeValidateRules['required']);
// VeeValidate.defineRule('min', VeeValidateRules['min']);
// VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
const pinia = createPinia()
app.use(pinia)
app.use(VueAxios, axios)
app.use(router)
app.use(bootstrap)
library.add(faCartShopping, faUser, faCheck, faXmark, faStarOfLife)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

const backlogDOM = document.querySelector(
  '.backlog-section .droppable-container'
)
const sprintDOM = document.querySelector(
  '.sprint-section .droppable-container'
)

const backlogArr = [
  { content: 'test1', score: 5 },
  { content: 'test2', score: 13 },
  { content: 'test3', score: 8 },
  { content: 'test4', score: 8 }
]

let totalScore = 0
const totalScoreDOM = document.querySelector('.total-score')
totalScoreDOM.textContent = totalScore

// 以map方式創造DOM node, 並塞入backlog的container
backlogArr.map((ele) => {
  const draggableCard = document.createElement('div')
  draggableCard.setAttribute('data-score', ele.score)
  draggableCard.setAttribute('draggable', 'true')
  draggableCard.classList.add('draggble')
  draggableCard.textContent = ele.content

  const timeAvatar = document.createElement('div')
  timeAvatar.classList.add('time-avatar')
  timeAvatar.textContent = ele.score

  draggableCard.appendChild(timeAvatar)

  backlogDOM.appendChild(draggableCard)
  return draggableCard
})

const sprintSortableObj = Sortable.create(sprintDOM, {
  group: 'dnd',
  animation: 10,
  dataIdAttr: 'data-score',

  onEnd: (event) => {
    // 更新t// 更新totalSccore
    totalScore = sprintSortableObj
      .toArray()
      .map((ele) => parseInt(ele, 10))
      .reduce((a, b) => a + b, 0)
    totalScoreDOM.textContent = totalScore

    const warningTextDOM = document.querySelector('.warning-text')

    warningTextDOM.classList.add('hidden')
    if (totalScore > 20) {
      warningTextDOM.classList.remove('hidden')
    }
  }
})

const backlogSortableObj = Sortable.create(backlogDOM, {
  group: 'dnd',
  animation: 10,
  dataIdAttr: 'data-score',

  onEnd: (event) => {
    totalScore = backlogSortableObj
      .toArray()
      .map((ele) => parseInt(ele, 10))
      .reduce((a, b) => a + b, 0)
    totalScoreDOM.textContent = totalScore

    const warningTextDOM = document.querySelector('.warning-text')

    warningTextDOM.classList.add('hidden')
    if (totalScore > 20) {
      warningTextDOM.classList.remove('hidden')
    }
  }
})

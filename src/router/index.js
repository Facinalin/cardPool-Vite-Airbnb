import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/FrontLayout.vue'),
    children: [{
      path: '',
      name: 'Home',
      component: () => import('../views/front/HomeView.vue')
    },
    {
      path: 'about',
      name: 'About',
      component: () => import('../views/front/AboutView.vue')
    },
    {
      path: 'products',
      component: () => import('../views/front/ProductsView.vue')
    },
    {
      path: 'cart',
      component: () => import('../views/front/CartCheckout.vue'),
      children: [{
        path: 'cartToOrder',
        components: {
          cart: () => import('../views/front/CartView.vue'),
          orderInfo: () => import('../views/front/OrderInfo.vue')
        }
      }]
    },
    {
      path: 'product/:id',
      component: () => import('../views/front/PerProductView.vue')
    },
    {
      path: 'logIn',
      component: () => import('../views/front/logIn.vue')
    }]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/404err/ErrorFour04.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/back/MemberProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/back/MemberOrders.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router

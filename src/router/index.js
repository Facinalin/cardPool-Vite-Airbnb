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
      path: 'activities',
      name: 'Activity',
      component: () => import('../views/front/ActivityView.vue')
    },
    {
      path: 'fanmerch',
      component: () => import('../views/front/FanMerch.vue')
    },
    {
      path: 'danceclub',
      component: () => import('../views/front/DanceClub.vue')
    },
    {
      path: 'fandrawevent',
      component: () => import('../views/front/FanDrawEvent.vue')
    },
    {
      path: 'fanart',
      component: () => import('../views/front/FanArt.vue')
    },
    {
      path: 'products',
      component: () => import('../views/front/ProductsView.vue')
    },
    {
      path: 'cardgroups',
      component: () => import('../views/front/CardGroup.vue')
    },
    {
      path: 'cardproducts',
      component: () => import('../views/front/CardProducts.vue')
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
      path: 'cardgroup/:id',
      component: () => import('../views/front/perCardGroup.vue')
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
      },
      {
        path: 'dashboard',
        component: () => import('../views/back/DashBoardFrame.vue'),
        children: [{
          path: 'adminrcardgroup',
          components: {
            membercardgroup: () => import('../views/back/MemberCardGroup.vue'),
            generalproduct: () => import('../views/back/MemberProducts.vue')
          }
        }]
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

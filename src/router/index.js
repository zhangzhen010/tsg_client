import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/column',
      name: 'column',
      component: () => import('../views/Column.vue')
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: () => import('../views/Lottery.vue')
    },
    {
      path: '/redeem',
      name: 'redeem',
      meta:{
        isLogin:true
      },
      component: () => import('../views/Redeem.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue')
    },
    {
      path: '/generate',
      name: 'generate',
      component: () => import('../views/Generate.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('../views/Submit.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/Help.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User.vue'),
      children: [
        {
          path: 'profile',
          name: 'profile',
          meta:{
            isLogin:true
          },
          component: () => import('../views/Children/Profile.vue')
        },
        {
          path: 'manage',
          name: 'manage',
          meta:{
            isLogin:true
          },
          component: () => import('../views/Children/Manageoffers.vue')
        },
        {
          path: 'made',
          name: 'made',
          meta:{
            isLogin:true
          },
          component: () => import('../views/Children/Made.vue')
        },
        {
          path: 'activity',
          name: 'activity',
          meta:{
            isLogin:true
          },
          component: () => import('../views/Children/Activity.vue')
        }
      ]
    },
    {
      path: '/auction',
      name: 'auction',
      component: () => import('../views/Auction.vue')
    },
    {
      path: '/mycards',
      name: 'mycards',
      component: () => import('../views/Mycards.vue')
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: () => import('../views/Testpage/Inventory.vue')
    },
    {
      path: '/details/:userId',
      name: 'details',
      component: () => import('../views/Details.vue'),
      props: true
    },
    {
      path: '/GachaDetail/:userId',
      name: 'GachaDetail',
      component: () => import('../views/GachaDetail.vue'),
      props: true
    }
  ]
})

// router.beforeEach((to, from, next) => {
//     const loginToken = localStorage.getItem('token')
//     if(!to.meta.isLogin && !loginToken){
//       next()
//     }else {
//       next({ name: 'home' })
//     }
    

// })

export default router

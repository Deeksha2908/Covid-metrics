import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomeView.vue'
import FilterData from './components/FilterData.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: ()=> import('./components/LoginButton')

    },
    {
      path: '/signup',
      name: 'Signup',
      component: ()=> import('./components/SignupButton')

    },

    {
      path: '/about',
      name: 'about',
      component: () => import('./views/ThumbnailView.vue')
    },
    {
      path: '/card/:id',
      name: 'card',
      component: FilterData,
      props:true
    }

  ]
})
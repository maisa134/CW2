import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue' 
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
]
const router = new VueRouter({
  routes
})
export default router

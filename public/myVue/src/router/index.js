import Vue from 'vue'
import vueResource from 'vue-resource'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Admin from '@/components/Admin'

Vue.use(Router);
Vue.use(vueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Hello
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    /*{
      path: '/',
      name: 'Hello',
      component: Hello
    }*/
  ]
})

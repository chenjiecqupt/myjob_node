import Vue from 'vue'
import vue_resource from 'vue-resource'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Hello
    }/*,
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }*/
  ]
})

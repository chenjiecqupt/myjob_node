// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jquery from 'jquery'
import jqueryInit from './js/jquery_init'
import './css/loyout.css'
import '../../bootstrap/css/bootstrap.css'

const VueResource = require('vue-resource');
Vue.use(VueResource);
Vue.use(jquery);
Vue.use(jqueryInit);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

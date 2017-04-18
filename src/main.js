// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './style/style.scss'
import iView from 'iview';
import '../node_modules/iview/dist/styles/iview.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import DebugLogger from './util/logger'

import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/angle-right'
import 'vue-awesome/icons/gear'
import 'vue-awesome/icons/sort'

Vue.use(DebugLogger);
Vue.use(iView);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Array.prototype.contains = function ( needle ) {
  for (var i=0;i<this.length;i++) {
    if (this[i] == needle)
      return true;
  }
  return false;
}

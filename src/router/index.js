import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index.vue'
import Home from '../pages/Home.vue'
import GatewayAdmin from '../pages/GatewayAdmin.vue'
import GatewayUser from '../pages/GatewayUser.vue'
import NodeAdmin from '../pages/NodeAdmin.vue'
import NodeUser from '../pages/NodeUser.vue'

import Login from '../pages/Login.vue'
import GateWayAdminInfo from '../pages/GateWayAdminInfo.vue'
import GatewayUserInfo from '../pages/GatewayUserInfo.vue'
import NodeInfo from '../pages/NodeInfo.vue'

import Register from '../pages/Register.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [{
        path: '/',
        component: Home
      },{
        path: 'GatewayAdmin',
        component: GatewayAdmin
      },{
        path: 'GatewayUser',
        component: GatewayUser
      },{
        path: 'NodeAdmin',
        component: NodeAdmin
      },{
        path: 'NodeUser',
        component: NodeUser
      },{
        path: 'GateWayAdminInfo',
        component: GateWayAdminInfo
      },{
        path: 'GatewayUserInfo',
        component: GatewayUserInfo
      },{
        path: 'NodeInfo',
        component: NodeInfo
      }]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
    },
  ]
})

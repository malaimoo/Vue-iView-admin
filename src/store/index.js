/**
 * Created by wiki on 2017/2/27.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import {actions,mutations}from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const state = {
  appid:null,
  stores:[],
  userwx:{'nickname':"as"},
  gatewaytype:[],
  gatewayversion:[],
  nodetype:[]
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})

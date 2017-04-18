/**
 * Created by wiki on 2017/2/27.
 */
import * as types from './mutation-types'
import apinew from '../api/apinew'

export const actions = {
  setAppId({commit}, appid){
    commit(types.SET_APPID, {
      appid: appid
    })
  },

  fetchStores({commit}){
    return new Promise((resolve, reject) => {
      api.shopManage.queryShop(resp => {
        commit(types.SET_STORES, {
          stores: resp.data
        })
        resolve();
      })
    })
  },

  fetchUser({commit}){
    return new Promise((resolve, reject) => {
      apinew.user.getUserInfo({},resp => {
        commit(types.SET_USERWX, {
          userwx: resp.data
        });
        resolve();
      },error=>{
      })
    })
  },

  fetchGatewayversion({commit}){
    return new Promise((resolve, reject) => {
      apinew.user.getUserInfo({},resp => {
        commit(types.SET_GATEWAYVER, {
          gatewayversion: resp.info
        });
        resolve();
      },error=>{
      })
    })
  },


  fetchGatewayversion({commit}){
    return new Promise((resolve, reject) => {
      apinew.gatewayversion({},resp => {
        commit(types.SET_GATEWAYVER, {
          gatewayversion: resp.info
        });
        resolve();
      },error=>{
        reject();
      })
    })
  },

  fetchGatewaytype({commit}){
    return new Promise((resolve, reject) => {
      apinew.gatewaytype({},resp => {
        commit(types.SET_GATEWAYTYPE, {
          gatewaytype: resp.info
        });
        resolve();
      },error=>{
        reject();
      })
    })
  },

};


export const mutations = {
  [types.SET_APPID] (state, {appid}) {
    state.appid = appid
  },
  [types.SET_STORES] (state, {stores}) {
    state.stores = stores
  },
  [types.SET_USERWX] (state, {userwx}) {
    state.userwx = userwx
  },

  [types.SET_GATEWAYVER] (state, {gatewayversion}) {
    state.gatewayversion = gatewayversion
  },

  [types.SET_GATEWAYTYPE] (state, {gatewaytype}) {
    state.gatewaytype = gatewaytype
  }
};

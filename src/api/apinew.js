/**
 * Created by wiki on 2017/3/17.
 */
import config from './config'
import http from './http'

export default {

  login:function (param, success, error) {
    config.url = 'login';
    http.post(param, config, success, error);
  },
  gatewaytype:function (param, success, error) {
    config.url = 'gateway_type';
    http.get(param, config, success, error);
  },
  gatewayversion:function (param, success, error) {
    config.url = 'gateway_version';
    http.get(param, config, success, error);
  },

  node_type:function (param, success, error) {
    config.url = 'node_type';
    http.get(param, config, success, error);
  },

  gateway:{
    getall(param, success, error){
      config.url = 'gateway';
      http.get(param, config, success, error);
    },
    getNumber(param, success, error){
      config.url = 'gateway/total';
      http.get(param, config, success, error);
    },
    create(param, success, error){
      config.url = 'gateway';
      http.post(param, config, success, error);
    },
    delete(param, success, error){
      config.url = 'gateway/delete';
      http.post(param, config, success, error);
    },
    update(param, success, error){
      config.url = 'gateway/update';
      http.post(param, config, success, error);
    },

    opera(param, success, error){
      config.url = 'gateway/opera';
      http.post(param, config, success, error);
    },

    edit(param, success, error){
      config.url = 'gateway/edit';
      http.post(param, config, success, error);
    },


    gatewaynode(param, success, error){
      config.url = 'gateway_node/' + param.geui;
      http.get(param, config, success, error);
    },

    creategatewaynode(param, success, error){
      config.url = 'gateway_node/' + param.geui;
      http.post(param, config, success, error);
    },

    deletegatewaynode(param, success, error){
      config.url = 'gateway_node/' + param.geui +'/delete';
      http.post(param, config, success, error);
    },

  },



  gatewayuser:{
    getall(param, success, error){
      config.url = 'user_gateway';
      http.get(param, config, success, error);
    },
    getNumber(param, success, error){
      config.url = 'user_gateway/total';
      http.get(param, config, success, error);
    },
    create(param, success, error){
      config.url = 'user_gateway';
      http.post(param, config, success, error);
    },
    delete(param, success, error){
      config.url = 'user_gateway/delete';
      http.post(param, config, success, error);
    },
    update(param, success, error){
      config.url = 'user_gateway/update';
      http.post(param, config, success, error);
    },
    opera(param, success, error){
      config.url = 'user_gateway/opera';
      http.post(param, config, success, error);
    },
  },


  node: {
    getall(param, success, error){
      config.url = 'node';
      http.get(param, config, success, error);
    },
    getNumber(param, success, error){
      config.url = 'node/total';
      http.get(param, config, success, error);
    },
    create(param, success, error){
      config.url = 'node';
      http.post(param, config, success, error);
    },
    delete(param, success, error){
      config.url = 'node/delete';
      http.post(param, config, success, error);
    },

    edit(param, success, error){
      config.url = 'node/edit';
      http.post(param, config, success, error);
    },
  },


  nodeuser: {
    getall(param, success, error){
      config.url = 'user_node';
      http.get(param, config, success, error);
    },

    getNumber(param, success, error){
      config.url = 'user_node/total';
      http.get(param, config, success, error);
    },

    create(param, success, error){
      config.url = 'user_node';
      http.post(param, config, success, error);
    },

    delete(param, success, error){
      config.url = 'user_node/delete';
      http.post(param, config, success, error);
    },

    info(param, success, error){
      config.url = 'user_node/info/' + param.deui;
      http.get(param, config, success, error);
    },

  },

  log: {
    position(param, success, error){
      config.url = 'log/position/gateway';
      http.get(param, config, success, error);
    },
    gatewaylog(param, success, error){
      config.url = 'log/gateway/' + param.geui;
      http.get(param, config, success, error);
    },
    gatewaylognumber(param, success, error){
      config.url = 'log/gateway/' + param.geui + '/total';
      http.get(param, config, success, error);
    },

    nodelog(param, success, error){
      config.url = 'log/node/' + param.deui;
      http.get(param, config, success, error);
    },
    nodelognumber(param, success, error){
      config.url = 'log/node/' + param.deui + '/total';
      http.get(param, config, success, error);
    },
    nodepayload(param, success, error){
      config.url = 'log/node/' + param.deui + '/payload';
      http.get(param, config, success, error);
    },


  }

}



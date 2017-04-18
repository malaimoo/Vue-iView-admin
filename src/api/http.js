/**
 * Created by wiki on 2017/2/25.
 */
import axios from 'axios'
import loading from '../components/loading'
import Router from 'vue-router'
import Qs from 'qs'


export default {
  config: {
    isloading: false
  },

  post: function (param, config, success, error) {
    param.access_token = sessionStorage.getItem('accesstoken');
    param.username = sessionStorage.getItem('smartkitusername');
    param.type = 'web';

    param = JSON.stringify(param)

    config.data = param;
    this.request('POST', param, config, success, error)
  },

  get: function (param, config, success, error) {
    param.access_token = sessionStorage.getItem('accesstoken');
    param.username = sessionStorage.getItem('smartkitusername');
    param.type = 'web';

    config.params = param;
    this.request('GET', param, config, success, error)
  },

  request: function (method, param, config, success, error) {
    this.config.isloading = true;
    config.method = method;

    loading.showloading(true);
    axios.request(config).then(res => {

      loading.showloading(false);
      this.config.isloading = false;
      console.log(res.data);

      if (res.data.code === 200) {
        success(res.data);
      } else if (res.data.code == 400) {
        loading.showMessage('重新登录...');

        var router = new Router;
        // router.push('Login');

        error(res.data);
      } else {
        var errormap = {
          200: '请求成功',
          400: '没有权限',
          401: '参数错误',
          402: '没有权限',
          403: '超过最大值限制',
          404: '节点不存在',
          405: '节点已经被该网关绑定',
          406: '未知错误',
          407: '类型不存在',
          408: '请求超时',
          409: '没有数据',
          410: '网关不存在',
          411: '验证码错误',
          412: '网关已经被绑定',
          413: '节点已经被绑定'
        }
        loading.showMessage(res.data.error?res.data.error:errormap[res.data.code]);
        error(res.data);
      }
    }).catch(errors => {
      this.config.isloading = false;
      // loading.showMessage(errors);
      error(errors.toString());
      loading.showloading(false);

      if(errors.toString().indexOf('Network')> 0 ){
        var router = new Router;
        router.push('Login');
      }

      console.log('--------------request start--------------')
      console.log(config.url)
      console.log(errors);
      console.log('--------------request end--------------')
    })
  }
}

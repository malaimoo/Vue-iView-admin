// /**
//  * Created by wiki on 2017/2/27.
//  */
// export default function (message) {
//   let dev = true;
//   if (dev){
//     console.log(message);
//   }
// }
// var DebugLogger = {};
// DebugLogger.install = function (Vue, options) {
//   Vue.debuglog = function (message) {
//     if(true) {
//       console.log(message);
//     }
//   }
// }
//
// export default DebugLogger;
//
//
// export let _Vue
import config from '../../config'
var DebugLogger ={};
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  // 4. 添加实例方法
  Vue.prototype.$logger = function (message) {
    if(config.dev.env.NODE_ENV) {
      console.log(message);
    }
  }
}
DebugLogger.install = install;
export default DebugLogger;

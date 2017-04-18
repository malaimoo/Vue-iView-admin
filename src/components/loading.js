// import '../assets/loading.svg'
// import vue from 'vue'
import iView from 'iview';

function toasts(message) {
  // vue.$vux.toast.show({
  //   text: message,
  //   type: 'text',
  //   position: 'bottom'
  // });
  // var MyComponent = vue.component('#app')
  iView.Message.warning(message)
  // vue.$iView.Message.error('对方不想说话，并且向你抛出了一个异常');
}

// function isVisible(elem) {
//   return elem.offsetWidth > 0 || elem.offsetHeight > 0;
// }
// export function showLoading(show) {
//   var loading = document.getElementById('loading')
//   if (!loading) {
//     loading = document.createElement('img');
//     loading.id = 'loading';
//     loading.className = 'loading';
//     loading.src = "../loading.svg";
//     document.body.appendChild(loading)
//   }
//   showLoading = function (show) {
//     if (show && !isVisible(loading)) {
//       return loading.style.display = 'block';
//     }
//     loading.style.display = 'none';
//   }
//   showLoading(show)
// }

var toast = {
  show: function (type, message) {
    var finalMessage = message;

    if (!finalMessage) {
      switch (type) {

        case 1000:
          finalMessage = '没有权限';
          break;

        case -201:
          finalMessage = '没有用户';
          break;

        case -1:
          finalMessage = '没有权限';
          break;

        case 500:
          finalMessage = '网络错误';
          break;

        default:
          finalMessage = '网络错误';
          break;
      }
      finalMessage += type;
    }
    toasts(finalMessage);
  },

  showMessage: function (message) {
    toasts(message);
  },

  showloading:function (show) {
    if(show){
      iView.LoadingBar.start();
    }else {
      iView.LoadingBar.finish();
    }
  }

}


export default toast

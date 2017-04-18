import Qs from 'qs'

export default{
  baseURL: '',
  method: 'GET',
  transformRequest: [
    function (data) {
    return data
      // return Qs.stringify(data);
    }],

  transformResponse: [
    function (data) {
      return data;
    }
  ],

  headers: {
    'Accept': 'application/json,text/html',
    'Content-Type': 'application/json;charset=UTF-8'
  },

  params: {},
  paramsSerializer: function (params) {
    return Qs.stringify(params)
  },

  timeout: 10000,
  withCredentials: false, // default
  responseType: 'json', // default

  //将upload事件注释掉，防止跨域状态下发起option请求
  // onUploadProgress: function(progressEvent) {
  // 	// Do whatever you want with the native progress event
  // },
  // onDownloadProgress: function(progressEvent) {
  // 	// Do whatever you want with the native progress event
  // },

  maxContentLength: 2000,
  validateStatus: function (status) {
    return status >= 200 && status < 500; // default
  },
  maxRedirects: 5, // default
}

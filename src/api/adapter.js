/**
 * Created by wiki on 2017/3/14.
 */
import config from './config'
import http from './http'

export function get(url, data, success, options) {
  config.url = url;
  return http.get(data, config, success, options.error);

};

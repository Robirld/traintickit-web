import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

const tajax = function(targetServer, url){
  return axios.create({
    baseURL: debug ? targetServer : url,
    timeout: 30000,
    responseType: 'JSON',
    withCredentials: false,
    headers: {
      // x-www-form-urlencoded
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
}

export default tajax

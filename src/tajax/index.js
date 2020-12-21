import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

const tajax = axios.create({
  baseURL: debug ? 'tt' : 'http://127.0.0.1:1236',
  timeout: 30000,
  responseType: 'JSON',
  withCredentials: false,
  headers: {
    // x-www-form-urlencoded
    'Content-Type': 'application/json;charset=utf-8'
  }
})

export default tajax

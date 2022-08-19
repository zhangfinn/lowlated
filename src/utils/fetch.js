import qs from 'qs'
import { message } from 'antd'

const isPlainObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/* 核心方法 */
const http = function http(config) {
  // init config & validate
  if (!isPlainObject(config)) config = {}
  config = Object.assign(
    {
      url: '',
      method: 'GET',
      credentials: 'include',
      headers: null,
      body: null,
      params: null,
      responseType: 'json',
      signal: null
    },
    config
  )
  if (!isPlainObject(config.headers)) config.headers = {}
  if (config.params !== null && !isPlainObject(config.params)) config.params = null
  let { url, method, credentials, headers, body, params, responseType, signal } = config

  // 处理URL:params存在，我们需要把params中的每一项拼接到URL末尾
  if (params) url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`

  // 处理请求主体:只针对于POST系列请求；body是个纯粹对象，根据当前后台要求，把其变为urlencoded格式！
  if (isPlainObject(body)) {
    body = qs.stringify(body)
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  // 类似于Axios的请求拦截器，例如：把存储在客户端本地的token信息携带给服务器「根据当前后台要求处理」
  let token = localStorage.getItem('token')
  if (token) headers['authorzation'] = token

  // 发送请求
  method = method.toUpperCase()
  config = {
    method,
    credentials,
    headers,
    cache: 'no-cache',
    mode: 'cors'
  }
  if (/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body
  if (signal) config.signal = signal
  return fetch(url, config)
    .then(response => {
      // 成功则返回响应主体信息
      let { status, statusText } = response,
        result
      if (!/^(2|3)\d{2}$/.test(status)) return Promise.reject({ code: -1, status, statusText })
      switch (responseType.toLowerCase()) {
        case 'text':
          result = response.text()
          break
        case 'arraybuffer':
          result = response.arrayBuffer()
          break
        case 'blob':
          result = response.blob()
          break
        default:
          result = response.json()
      }
      return result.then(null, reason => Promise.reject({ code: -2, reason }))
    })
    .catch(reason => {
      // 根据不同的失败情况做不同的统一提示
      /* let code = reason?.code;
        if (+code === -1) {
            // 状态码问题
            switch (+reason.status) {
                case 404:
                    // ...
                    break;
            }
        } else if (+code === -1) {
            // 读取数据出现问题
        } else if (+code === 20) {
            // 请求被中断
        } else {
            // 网络问题
        } */
      message.error('小主，当前网络出现异常，请稍后再试~~')
      return Promise.reject(reason)
    })
}

/* 快捷方法 */
;['GET', 'HEAD', 'DELETE', 'OPTIONS'].forEach(item => {
  http[item.toLowerCase()] = function (url, config) {
    if (!isPlainObject(config)) config = {}
    config['url'] = url
    config['method'] = item
    return http(config)
  }
})
;['POST', 'PUT', 'PATCH'].forEach(item => {
  http[item.toLowerCase()] = function (url, body, config) {
    if (!isPlainObject(config)) config = {}
    config['url'] = url
    config['method'] = item
    config['body'] = body
    return http(config)
  }
})

export default http

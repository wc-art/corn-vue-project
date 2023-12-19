import axios from 'axios'
import {ElNotification,ElMessage} from 'element-plus'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;    
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
   if (code === 500) {
    ElMessage({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    ElNotification.error({
      title: msg
    })
    return Promise.reject('error')
  } else {
    return  Promise.resolve(res.data)
  }
},
error => {
  let { message } = error;
  if (message == "Network Error") {
    message = "Network Error";
  }
  else if (message.includes("timeout")) {
    message = "timeout";
  }
  ElMessage({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service

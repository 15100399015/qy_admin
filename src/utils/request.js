import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code === 20000) {
      return response.data.data
    }
    Notification.error({
      title: 'Error',
      message: response.data.message
    })
    return Promise.reject(response.data)
  },
  error => {
    Notification.error({
      title: 'Error',
      message: error
    })
    return Promise.reject(error)
  }
)

export default service

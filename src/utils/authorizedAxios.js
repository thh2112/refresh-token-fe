// Author: HuyHoangDev
import axios from 'axios'
import { toast } from 'react-toastify'

const axiosClient = axios.create()

axiosClient.defaults.timeout = 1000 * 60 * 5
axiosClient.defaults.withCredentials = true

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // get token from local storage assign to header
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with esponse data
    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response?.status === 410) {
      toast.error(error.response?.data?.message)
    }
    return Promise.reject(error)
  }
)

export default axiosClient
import axios from 'axios'

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_LOGIN_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})

const axiosNoToken = axios.create({
  baseURL: import.meta.env.VITE_API_LOGIN_URL,
})

axiosBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export { axiosBase, axiosNoToken }

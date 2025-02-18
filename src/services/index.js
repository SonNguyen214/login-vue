import { axiosBase, axiosNoToken } from '@/utils/axios'

export const requestLogin = ({ user_id, password }) => {
  let config = {
    method: 'POST',
    url: '/api/auth/login',
    data: {
      user_id: user_id,
      password: password,
    },
  }

  return axiosNoToken(config)
}

export const requestLogout = () => {
  const config = {
    method: 'POST',
    url: '/api/auth/logout',
    data: {},
  }

  return axiosBase(config)
}

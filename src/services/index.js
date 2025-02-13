import { axiosBase } from '@/components/utils/axios'

export const requestLogin = ({ user_id, password }) => {
  let config = {
    method: 'POST',
    url: '/api/auth/login',
    data: {
      user_id: user_id,
      password: password,
    },
  }

  return axiosBase(config)
}

export const requestLogout = (accessToken) => {
  const config = {
    method: 'POST',
    url: '/api/auth/logout',
    data: {},
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  return axiosBase(config)
}

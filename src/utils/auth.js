import { localStorageKey, pages } from '@/constants'
import { requestLogin, requestLogout } from '@/services'
import { notification } from '.'

export const handleLogin = async ({ toast, username, password }) => {
  try {
    const res = await requestLogin({ user_id: username, password: password })
    if (res.status === 200) {
      localStorage.setItem(localStorageKey.accessToken, res.data.token)
      notification(toast, 'success', 'Congratulation', 'Login success')
      window.open(pages.home)
    }
  } catch (error) {
    if (error?.response) {
      notification(
        toast,
        'error',
        'Login Failed!',
        error?.response?.data?.message || 'Something went wrong!! Please try again',
      )
    }
  }
}

export const handleLogout = async ({ toast }) => {
  try {
    const response = await requestLogout()
    if (response.status === 200) {
      localStorage.removeItem(localStorageKey.accessToken)
      notification(toast, 'info', 'Logged out', response.data.message || 'You logged out!')
    }
  } catch (error) {
    if (error?.response) {
      notification(
        toast,
        'error',
        'Logout Failed!',
        error?.response?.data?.message || 'Something went wrong!! Please try again',
      )
    }
  }
}

import axios from 'axios'

const Authorization = 'Authorization'

export const setAuthToken = (token: string) => {
  // put token from localStorage into Auth Bearer header
  if (token) {
    axios.defaults.headers.common[Authorization] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common[Authorization]
  }
}

import axios from 'axios'

export const forgotPassword = (email) => {
  return axios.post('/forgotpassword', { email })
}

export const updatePassword = (token, password) => {
  return axios.post('/updatepassword', { token, password })
}

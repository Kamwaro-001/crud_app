import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users'

export const login = async (form_data) => {
  const response = await axios.post(API_URL + '/login/', {
    email: form_data.email,
    password: form_data.password
  })
  if (response.data.token) {
    localStorage.setItem('token', JSON.stringify(response.data.token))
  }
  return response.data.token
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const register = (user) => {
  return axios.post(API_URL + '/register', {
    email: user.email,
    password: user.password
  })
}

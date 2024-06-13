import axios from 'axios'

// const API_URL = process.env.API_URL

export const login = async (form_data) => {
  const response = await axios.post('/login', {
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
  return axios.post('/', {
    email: user.email,
    password: user.password
  })
}

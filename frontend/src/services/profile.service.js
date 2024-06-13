import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/users'

export const getProfile = async () => {
  try {
    const response = await axios.get(API_URL + '/me/', { headers: authHeader() })
    return response.data
  } catch (error) {
    return {
      message: error.response.data.message
    }
  }
}

export const editProfile = async (form_data) => {
  try {
    await axios.put(API_URL + '/me/', form_data, { headers: authHeader() })
  } catch (error) {
    return {
      message: error.response.data.message
    }
  }
}

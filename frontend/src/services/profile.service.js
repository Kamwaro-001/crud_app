import axios from 'axios'
import authHeader from './auth-header'

// const API_URL = process.env.API_URL

export const getProfile = async () => {
  try {
    const response = await axios.get('/me', { headers: authHeader() })
    return response.data
  } catch (error) {
    return {
      message: error.response.data.message
    }
  }
}

export const editProfile = async (form_data) => {
  try {
    await axios.put('/me', form_data, { headers: authHeader() })
  } catch (error) {
    return {
      message: error.response.data.message
    }
  }
}

import { defineStore } from 'pinia'
import { login, register, logout } from '@/services/auth.service'
import { useMessageStore } from './message'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = JSON.parse(localStorage.getItem('token'))
    return token
      ? { status: { loggedIn: true }, token }
      : { status: { loggedIn: false }, token: null }
  },
  actions: {
    async login(user) {
      try {
        const token = await login(user)
        this.loginSuccess(token)
        return token
      } catch (error) {
        this.loginFailure()
        throw error
      }
    },
    logout() {
      logout()
      this.logoutAction()
    },
    async register(user) {
      try {
        const response = await register(user)
        this.registerSuccess()
        return response.data
      } catch (error) {
        this.registerFailure()
        throw error
      }
    },
    loginSuccess(token) {
      this.$state.status.loggedIn = true
      this.$state.token = token
      useMessageStore().clearMessage()
    },
    loginFailure() {
      this.$state.status.loggedIn = false
      this.$state.token = null
      useMessageStore().setMessage('Login failed! Please check your credentials.')
    },
    logoutAction() {
      this.$state.status.loggedIn = false
      this.$state.token = null
      useMessageStore().clearMessage()
    },
    registerSuccess() {
      this.$state.status.loggedIn = false
      useMessageStore().clearMessage()
    },
    registerFailure() {
      this.$state.status.loggedIn = false
      useMessageStore().setMessage('Registration failed! The user already exists.')
    }
  }
})

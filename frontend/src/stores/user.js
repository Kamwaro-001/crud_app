import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token_status = JSON.parse(localStorage.getItem('token'))

  let loggedIn = token_status ? true : false

  const user = {
    first_name: '',
    last_name: '',
    age: '',
    town: '',
    gender: '',
    email: ''
  }

  const setUserDetails = (details) => {
    for (let key in details) {
      if (Object.prototype.hasOwnProperty.call(user, key)) {
        user[key] = details[key]
      }
    }
    localStorage.setItem('user', JSON.stringify(user))
  }

  const setLoggedIn = (status) => {
    loggedIn = status
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
  }

  return {
    user,
    loggedIn,
    setUserDetails,
    setLoggedIn
  }
})

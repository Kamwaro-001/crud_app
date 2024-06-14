import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
  id: 'message',
  state: () => ({
    message: ''
  }),
  actions: {
    setMessage(payload) {
      this.message = payload
      setTimeout(() => {
        this.clearMessage()
      }, 2000)
    },
    clearMessage() {
      this.message = ''
    }
  }
})

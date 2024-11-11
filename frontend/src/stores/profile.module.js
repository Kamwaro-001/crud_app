// user profile details store
import { defineStore } from 'pinia'
import { getProfile, editProfile } from '@/services/profile.service'
import { useMessageStore } from './message'

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => ({
    userDetails: {
      first_name: '',
      last_name: '',
      age: '',
      town: '',
      gender: '',
      email: ''
    }
  }),
  getters: {
    getDetails: (state) => state.userDetails
  },
  actions: {
    async fetchProfileDetails() {
      const data = await getProfile()
      this.userDetails = {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        gender: data.gender,
        town: data.town,
        email: data.email
      }
    },
    async updateUserDetails(form_data) {
      try {
        await editProfile(form_data)
        await this.fetchProfileDetails()
        useMessageStore().setMessage('Profile updated successfully.')
      } catch (error) {
        console.log(error)
        useMessageStore().setMessage(
          'An error occurred. A user with this email probably already exists.'
        )
        throw error
      }
    }
  }
})

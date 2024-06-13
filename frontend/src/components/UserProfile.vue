<script setup>
import { useProfileStore } from '@/stores/profile.module'
import { ref, watchEffect } from 'vue'

const useStore = useProfileStore()
const userProfile = ref({})

watchEffect(() => {
  useStore.fetchProfileDetails()
  userProfile.value = useProfileStore().userDetails
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title text-capitalize">
        {{ userProfile.first_name + ' ' + userProfile.last_name }}
      </h5>
      <div class="w-50 bg-light rounded-3 m-auto p-3">
        <p class="card-text">
          Email: <span>{{ userProfile.email }}</span> <br />
          Age: <span>{{ userProfile.age }}</span> <br />
          Gender: <span>{{ userProfile.gender }}</span> <br />
          Town: <span>{{ userProfile.town }}</span>
        </p>
      </div>
      <router-link to="/edit" class="btn btn-success mt-3">Edit Profile</router-link>
    </div>
  </div>
</template>

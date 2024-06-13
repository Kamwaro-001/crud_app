<script setup>
import { useProfileStore } from '@/stores/profile.module'
import { onMounted, ref, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import router from '@/router'

const useStore = useProfileStore()
const userProfile = ref({})

watchEffect(() => {
  useStore.fetchProfileDetails()
  userProfile.value = useProfileStore().userDetails
})

onMounted(() => {
  if (!useAuthStore().$state.status.loggedIn) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="col-lg-8 m-auto">
    <div class="card">
      <div class="card-body">
        <h4 class="text-center pb-2">Personal Details</h4>
        <table class="table table-striped">
          <tbody>
            <tr>
              <th scope="row">First Name</th>
              <td>{{ userProfile.first_name }}</td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>{{ userProfile.last_name }}</td>
            </tr>
            <tr>
              <th scope="row">Age</th>
              <td>{{ userProfile.age }}</td>
            </tr>
            <tr>
              <th scope="row">Gender</th>
              <td>{{ userProfile.gender }}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{{ userProfile.email }}</td>
            </tr>
          </tbody>
        </table>
        <router-link to="/edit" class="btn btn-success mt-3">Edit Profile</router-link>
      </div>
    </div>
  </div>
</template>

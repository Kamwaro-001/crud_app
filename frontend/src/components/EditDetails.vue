<script setup>
import { useMessageStore } from '@/stores/message'
import { useProfileStore } from '@/stores/profile.module'
import { onMounted, ref, watchEffect } from 'vue'

const msg = ref('')

let userProfile = ref({
  first_name: '',
  last_name: '',
  age: '',
  gender: '',
  email: '',
  password: ''
})

// get user details
const useStore = useProfileStore()

watchEffect(() => {
  msg.value = useMessageStore().message
  userProfile.value = useProfileStore().userDetails
})

onMounted(() => {
  useStore.fetchProfileDetails()
})

const saveChanges = async () => {
  useStore.updateUserDetails(userProfile.value)
}
</script>

<template>
  <div class="col-lg-8 m-auto">
    <div class="card">
      <div class="card-body">
        <h4 class="text-center pb-2">Personal Details</h4>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">First Name</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input
              type="text"
              name="first_name"
              class="form-control"
              v-model="userProfile.first_name"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Last Name</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input
              type="text"
              name="last_name"
              class="form-control"
              v-model="userProfile.last_name"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Age</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="number" name="age" class="form-control" v-model="userProfile.age" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Gender</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <select name="gender" class="form-control" v-model="userProfile.gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Town</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" name="town" class="form-control" v-model="userProfile.town" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Email</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="email" name="email" class="form-control" v-model="userProfile.email" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-9 text-secondary  m-auto">
            <button type="submit" class="btn btn-success  " @click.prevent="saveChanges">
              Save Changes
            </button>
          </div>
          <div class="form-group mt-2" v-if="msg">
            <div class="alert alert-success" role="alert">
              {{ msg }} 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

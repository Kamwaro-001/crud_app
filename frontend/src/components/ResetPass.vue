<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePasswordStore } from '@/stores/password.module'
import { useMessageStore } from '@/stores/message'
import router from '@/router';

const password = ref('')
const confirmPassword = ref('')
const passwordStore = usePasswordStore()
const route = useRoute()
const msg = ref('')
const passCheck = ref(true)

const feedback = 'Password updated successfully. Use it to login'

const comparePasswords = () => {
  passCheck.value = password.value === confirmPassword.value
}

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    passCheck.value = false
  }
  passwordStore.updatePassword(route.query.token, password.value)
}

watch(
  () => useMessageStore().message,
  () => {
    msg.value = useMessageStore().message
    if (msg.value === feedback) {
      setTimeout(() => router.push({ name: 'login' }), 2000)
    }
  }
)
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h3>Reset Password</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleResetPassword">
              <div class="mb-3">
                <label for="password" class="form-label">New Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Enter new password"
                  @input="comparePasswords"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  class="form-control"
                  v-model="confirmPassword"
                  placeholder="Confirm new password"
                  @input="comparePasswords"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100" :disabled="!passCheck">Submit</button>
            </form>
            <div class="mt-3 bg-light rounded-2" v-if="!passCheck">
              <p class="text-danger">Passwords must match!</p>
            </div>
            <div class="mt-3 bg-info rounded-2" v-if="msg">
              <p class="text-dark">{{ msg }}</p>
            </div>
            <div>
              <router-link to="/login" class="text-muted text-sm-end text-success"
                >Go back to Login</router-link
              ><br />
              <router-link to="/change-password" class="text-muted text-sm-end text-success"
                >Request another link</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { usePasswordStore } from '@/stores/password.module'
import { useMessageStore } from '@/stores/message'
import router from '@/router'

const email = ref('')
const msg = ref('')
const check = 'Password reset link sent to email.'

const handleForgotPassword = () => {
  usePasswordStore().forgotPassword(email.value)
}

watchEffect(() => {
  msg.value = useMessageStore().message

  if (msg.value === check) {
    setTimeout(() => router.push({ name: 'login' }), 2000)
  }
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h3>Forgot Password</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleForgotPassword">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100">Submit</button>
            </form>
            <div class="mt-3 bg-info rounded-2" v-if="msg">
              <p class="text-dark">{{ msg }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

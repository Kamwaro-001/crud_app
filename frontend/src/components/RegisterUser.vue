<script setup>
import { ref, watchEffect } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.module'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()
const msg = ref('')

const confirm = ref(true)

const user = ref({
  email: '',
  password: '',
  re_password: ''
})

const comparePasswords = () => {
  confirm.value = user.value.password === user.value.re_password
}

const handleRegister = async () => {
  try {
    await authStore.register(user.value)
    router.push('/login')
  } catch (error) {
    authStore.registerFailure()
  }
}

watchEffect(() => {
  msg.value = useMessageStore().message
  if (authStore.$state.status.loggedIn) {
    router.push('/profile')
  }
})
</script>

<template>
  <div class="signup text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="handleRegister">
        <h1 class="h3 mb-3 fw-normal">Create an account</h1>

        <div class="form-floating">
          <input
            name="email"
            type="email"
            class="form-control form-email"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="user.email"
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            name="password"
            type="password"
            class="form-control form-pw1"
            id="floatingPassword"
            placeholder="Password"
            v-model="user.password"
            @input="comparePasswords"
            required
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-floating">
          <input
            name="re_password"
            type="password"
            class="form-control form-pw2"
            id="floatingPassword2"
            placeholder="Re-enter password"
            v-model="user.re_password"
            @input="comparePasswords"
            required
          />
          <label for="floatingPassword">Re-enter password</label>
        </div>

        <div class="confirm" v-if="!confirm">
          <p class="text-danger">passwords must match!</p>
        </div>

        <button class="w-100 btn btn-lg btn-success" type="submit" :disabled="!confirm">
          Sign up
        </button>

        <div class="auth-extras">
          <p class="mt-3 mb-3 text-muted">
            Already have an account? <router-link to="/login">Login</router-link>
          </p>
        </div>

        <div class="form-group" v-if="msg">
          <div class="alert alert-danger" role="alert">{{ msg }}</div>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.signup {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  max-width: 370px;
  padding: 15px;
  background-color: #f9f7f7;
  border-radius: 0.5em;
  box-shadow:
    0 2px 6px 0 rgb(218 218 253 / 65%),
    0 2px 6px 0 rgb(206 206 238 / 54%);
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin label {
  color: #5d5d5d;
}

.form-signin .btn {
  border-radius: 5px;
  font-size: large;
}

.form-signin .form-username {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin .form-email,
.form-pw1 {
  margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin .form-pw2 {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form-signin .auth-extras {
  text-align: left;
  font-size: smaller;
}

.auth-extras a {
  text-decoration: none;
  color: green;
}
</style>

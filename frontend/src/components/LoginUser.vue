<script setup>
import { ref, watchEffect } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.module'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()

const status = authStore.$state.status
const msg = ref('')

const user = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  await authStore.login(user.value)
}

watchEffect(() => {
  msg.value = useMessageStore().message
  if (status.loggedIn) {
    router.push('/')
  }
})
</script>

<template>
  <div class="login text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="handleLogin">
        <h1 class="h3 mb-3 fw-normal">Please login</h1>

        <div class="form-floating">
          <input
            name="email"
            type="email"
            class="form-control"
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
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="user.password"
            required
          />
          <label for="floatingPassword">Password</label>
        </div>

        <button class="w-100 mt-2 btn btn-lg btn-success" type="submit">Login</button>

        <div class="auth-extras">
          <p class="mt-3 mb-3 text-muted">
            Trouble logging in? <router-link to="#">Reset password</router-link><br />
            Don't have an account? <router-link to="/register">Create account here</router-link>
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
.login {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  /* background-color: #f5f5f5; */
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

.form-signin label {
  color: #5d5d5d;
}

.form-signin .btn {
  border-radius: 5px;
  font-size: large;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
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

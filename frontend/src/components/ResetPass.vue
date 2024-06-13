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
                <input type="password" id="password" class="form-control" v-model="password" placeholder="Enter new password" required />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm New Password</label>
                <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" placeholder="Confirm new password" required />
              </div>
              <button type="submit" class="btn btn-success w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async handleResetPassword() {
      const token = this.$route.query.token
      try {
        await axios.post('/api/reset-password', { token, password: this.password })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

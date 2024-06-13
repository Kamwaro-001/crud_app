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
                <input type="email" id="email" class="form-control" v-model="email" placeholder="Enter your email" required />
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
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    async handleForgotPassword() {
      try {
        await axios.post('/api/forgot-password', { email: this.email });
        
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>
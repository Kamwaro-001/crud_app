<script setup>
import axios from 'axios'
import { RouterView } from 'vue-router'
import NavComponent from './components/NavComponent.vue'

if (window.location.origin === 'http://localhost:5173') {
  axios.defaults.baseURL = 'http://localhost:5000/api/users'
} else {
  //  axios.defaults.baseURL = window.location.origin;
  axios.defaults.baseURL = 'https://crud-app-backend-seven.vercel.app/api/users'
}
</script>

<template>
  <NavComponent />
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped></style>

<style scoped>
.app {
  display: block;
  width: 100%;
  margin: 0 auto;
  margin-top: 85px;
  margin-bottom: 23px;
  padding: 0rem;
  font-weight: normal;
  text-align: center;
}

header {
  text-align: center;
  color: white;
}

body {
  background: linear-gradient(135deg, var(--colorPrimary), #4e085f);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
</style>

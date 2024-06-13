<script setup>
import { RouterView } from 'vue-router'

import NavComponent from './components/NavComponent.vue'
</script>

<template>
  <NavComponent />
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped>
</style>

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

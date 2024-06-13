<script setup>
// implement the handleLogout function
import { useAuthStore } from '@/stores/auth.module'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const check = authStore.$state.status.loggedIn
console.log(check)
</script>

<template>
  <header id="nav-menu" class="fixed-top bg-light bg-opacity-75" aria-label="navigation bar">
    <div class="container">
      <div class="nav-start"></div>
      <div class="nav-mid m-auto">
        <nav class="menu">
          <ul class="menu-bar">
            <li><router-link class="nav-link" to="/">Home</router-link></li>

            <li><router-link class="nav-link" to="/add">Add User</router-link></li>
          </ul>
        </nav>
      </div>

      <div class="nav-end">
        <!-- {#if check} -->
        <div class="right-container">
          <button class="btn btn-success" @click.prevent="handleLogout">Log out</button>
        </div>
        <!-- {:else} -->
        <div class="right-container">
          <router-link class="nav-link text-success login-link" to="/login">Login</router-link>
          <!-- <button class="btn btn-success">
            <router-link class="nav-link" to="/register">Create an account</router-link>
          </button> -->
        </div>
        <!-- {/if} -->

        <button id="hamburger" aria-label="hamburger" aria-haspopup="true" aria-expanded="false">
          <i class="bi bi-list" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
#nav-menu {
  border: 1px solid #eeeeee;
  text-transform: capitalize;
}

.menu ul {
  list-style: none;
}

.menu .nav-link {
  text-decoration: none;
  color: black;
}

.menu .nav-link:hover {
  color: #72c387;
}

.btn {
  display: block;
  background-color: #83d299;
  color: black;
  text-align: center;
  padding: 0.6rem 0.8rem;
  border-style: none;
  font-weight: 600;
}

.btn:hover {
  background-color: rgb(147, 217, 167);
}

#nav-menu .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 2rem;
  height: 80px;
  padding: 1.2rem 3rem;
}

.menu {
  position: relative;
  font-size: 1rem;
  font-weight: 500;
}

.menu-bar li:first-child .dropdown {
  flex-direction: initial;
  min-width: 480px;
}

.menu-bar li:first-child ul:nth-child(1) {
  border-right: 1px solid #eeeeee;
}

.menu-bar li:nth-child(n + 2) ul:nth-child(1) {
  border-bottom: 1px solid #eeeeee;
}

.menu-bar .nav-link {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.6px;
  padding: 0.3rem;
  min-width: 60px;
  margin: 0 0.6rem;
}

.menu-bar .dropdown-item {
  background-color: white;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.6px;
}

.menu-bar .dropdown-menu {
  border: none;
}

.nav-start,
.nav-end,
.menu-bar,
.right-container {
  display: flex;
  align-items: center;
}

.right-container {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.right-container .login-link {
  font-weight: bold;
}

#hamburger {
  display: none;
  padding: 0.1rem;
  margin-left: 1rem;
  font-size: 1.9rem;
}
</style>

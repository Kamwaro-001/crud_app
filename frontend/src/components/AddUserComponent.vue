<template>
  <div class="container">
    <form @submit.prevent="addUser" class="form" >
      <input type="text" v-model="firstName" placeholder="First Name" />
      <input type="text" v-model="lastName" placeholder="Last Name" />
      <input type="number" v-model="age" placeholder="Age" />
      <input type="text" v-model="town" placeholder="Town" />
      <button id="inptBtn" type="submit">Add User</button>
    </form>
    <router-link to="/">
      <button id="addBtn" class="btn btn-success">Back to Home</button>
    </router-link>
  </div>
</template>
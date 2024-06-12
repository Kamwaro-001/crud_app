<template>
  <div class="text-center m-1 p-1 bg-light text-dark rounded">
    <h1 class="text-center mt-1 p-1 w-100">Welcome</h1>
    <h2 class="text-center m-1 font-weight-light ">User Details App</h2>
    <router-link to="/users">
      <button class="btn m-1 w-50">View Users</button>
    </router-link>
    <router-link to="/add">
      <button class="btn m-1 w-50">Add User</button>
    </router-link>
  </div>
</template>

<style scoped>
.btn {
  /* width: 50%; */
  border: 1px solid rgb(0, 0, 0) !important;
  padding: 10px;
  background-color: transparent;
  color: black;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
}

.btn:hover {
  background-color: #65b86c;
}
</style>

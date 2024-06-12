<script setup>
import {
  // onMounted,
  ref
} from 'vue'

// let id = 0
// const newUser = ref('')
const users = ref([])

// add user
async function createUser(text) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    }
    const response = await fetch('/api/persons', requestOptions)
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

async function deleteUser(id) {
  try {
    const requestOptions = {
      method: 'DELETE'
    }
    const response = await fetch(`/api/persons/${id}`, requestOptions)
    if (response.ok) {
      users.value = users.value.filter((user) => user.id !== id)
    } else {
      console.error('Error while deleting user')
    }
  } catch (error) {
    console.error(error)
  }
}

async function addUser() {
  const newUser = await createUser(newUser.value)
  users.value.push(newUser)
  newUser.value = ''
}

// async function fetchUsers() {
//   try {
//     const response = await fetch('api/persons')
//     users.value = await response.json()
//   } catch (error) {
//     console.error(error)
//   }
// }
</script>

<template>
  <div id="containerr" class="container text-center d-inline-block w-49 bg-danger">
    <form @submit.prevent="addUser">
      <input autofocus placeholder="add your text here" id="inptBtn" v-model="newTodo" />
      <button id="addBtn">Add User</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.text }}
        <!-- TODO: change to bootstrap -->
        <button
          class="remode-user"
          style="height: 39px; width: 39px; border-radius: 23px"
          @click="deleteUser(user)"
        >
          X
        </button>
      </li>
    </ul>
    <router-link to="/">
      <button style="width: 157px">Back to Home</button>
    </router-link>
  </div>
</template>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

form {
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 23px;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 34px;
  padding-top: 34px;
  padding-bottom: 34px;
  background-color: transparent;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  color: black;
}

#inptBtn {
  border-radius: 23px;
  height: 59px;
  margin-bottom: 5%;
  width: 89%;
  background: transparent;
  color: white;
}

#addBtn {
  width: 50%;
  border: 1px solid white !important;
}

button {
  padding: 10px;
  background-color: transparent;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
}

button:hover {
  background-color: #aaaaaa23;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ffffff4a;
  border-radius: 23px;
  background-color: #fff;
  color: rgb(255, 255, 255);
  background-color: transparent;
}
</style>

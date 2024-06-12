<script setup>
// import ListComponent from '../components/ListComponent.vue'
import UsersTable from '../components/UsersTable.vue'
</script>
<template>
  <main class="container">
    <!-- <ListComponent /> -->
    <!-- <UsersTable
      :data="users"
      :fields="[
        { key: 'id', label: '#' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'age', label: 'Age' },
        { key: 'town', label: 'Town' }
      ]"
    ></UsersTable> -->
  <UsersTable/>
  </main>
</template>

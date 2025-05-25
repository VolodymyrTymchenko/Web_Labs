<script setup>
import { onMounted } from 'vue'
import { AuthStore } from '../store/index'

const auth = AuthStore()

onMounted(() => {
  if (!auth.isAuthenticated && auth.token) {
    auth.fetchProfile()
  }
})
</script>

<template>
  <div>
    <div class="d-flex flex-column align-items-center">
      <h2 class="mb-4 text-center">User Profile</h2>

      <table class="bg-light table table-bordered table-striped w-100 shadow">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>{{ auth.user.name }}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>{{ auth.user.email }}</td>
          </tr>
          <tr>
            <th scope="row">Gender</th>
            <td>{{ auth.user.gender }}</td>
          </tr>
          <tr>
            <th scope="row">Date of birth</th>
            <td>{{ auth.user.dateOfBirth }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

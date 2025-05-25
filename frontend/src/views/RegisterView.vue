<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { AuthStore } from '../store/index'

const name = ref('')
const email = ref('')
const password = ref('')
const gender = ref('')
const dateOfBirth = ref('')
const router = useRouter()
const auth = AuthStore()
const notify = getCurrentInstance().appContext.config.globalProperties.$notify

const handleRegister = async () => {
  const success = await auth.register({
    name: name.value,
    email: email.value,
    password: password.value,
    gender: gender.value,
    dateOfBirth: dateOfBirth.value
  })

  if (success) {
    notify('Successful registration!', 'success')
    router.push({ name: 'login' })
  } else {
    notify('A profile with this email already exists', 'error')
  }
}
</script>

<template>
  <div>
    <div class="card bg-light p-4 shadow" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-3">Registration</h3>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter your name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter your email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter your password" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Gender</label>
          <div class="d-flex">
            <div class="form-check form-check-inline">
              <input v-model="gender" class="form-check-input" type="radio" name="gender" id="male" value="male" required>
              <label class="form-check-label" for="male">Male</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="gender" class="form-check-input" type="radio" name="gender" id="female" value="female">
              <label class="form-check-label" for="female">Female</label>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="dob" class="form-label">Date of birth</label>
          <input v-model="dateOfBirth" type="date" class="form-control" id="dob" required>
        </div>
        <button type="submit" class="btn btn-primary btn-success w-100">Register</button>
      </form>
    </div>
  </div>
</template>

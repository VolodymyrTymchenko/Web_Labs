<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { AuthStore } from '../store/index'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = AuthStore()
const notify = getCurrentInstance().appContext.config.globalProperties.$notify

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value)

  if (success) {
    notify?.('Successful login!', 'success')
    router.push({ name: 'profile' })
  } else {
    notify?.('Incorrect email or password', 'error')
  }
}
</script>

<template>
  <div>
    <div class="card bg-light p-4 shadow" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-3">Login</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter your email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="btn btn-primary btn-success w-100">Log in</button>
      </form>
    </div>
  </div>
</template>

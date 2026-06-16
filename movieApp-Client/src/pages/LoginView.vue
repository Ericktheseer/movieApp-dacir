<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const router = useRouter()
const notyf = new Notyf()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

async function loginUser() {
  try {
    isLoading.value = true

    const response = await api.post('/users/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', response.data.access)
    localStorage.setItem('email', email.value)

    if (email.value === 'admin@mail.com') {
      localStorage.setItem('isAdmin', 'true')
    } else {
      localStorage.setItem('isAdmin', 'false')
    }

    window.dispatchEvent(new Event('loginStatusChanged'))

    notyf.success('Login successful')
    router.push('/movies')
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Login failed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-4">Login</h2>

            <form @submit.prevent="loginUser">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" required>
              </div>

              <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </button>
            </form>

            <p class="text-center mt-3">
              No account yet?
              <RouterLink to="/register">Register here</RouterLink>
            </p>

            <p class="text-center mt-2 text-muted small">
              Admin: admin@mail.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
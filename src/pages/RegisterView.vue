<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const router = useRouter()
const notyf = new Notyf()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

async function registerUser() {
  if (password.value !== confirmPassword.value) {
    notyf.error('Passwords do not match')
    return
  }

  try {
    isLoading.value = true

    await api.post('/users/register', {
      email: email.value,
      password: password.value
    })

    notyf.success('Registration successful')
    router.push('/login')
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Registration failed')
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
            <h2 class="text-center mb-4">Register</h2>

            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <input v-model="confirmPassword" type="password" class="form-control" required>
              </div>

              <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
                {{ isLoading ? 'Registering...' : 'Register' }}
              </button>
            </form>

            <p class="text-center mt-3">
              Already have an account?
              <RouterLink to="/login">Login here</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)

function checkLoginStatus() {
  isLoggedIn.value = !!localStorage.getItem('token')
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('isAdmin')

  isLoggedIn.value = false
  router.push('/login')
}

onMounted(() => {
  checkLoginStatus()

  window.addEventListener('storage', checkLoginStatus)
  window.addEventListener('loginStatusChanged', checkLoginStatus)
})
</script>

<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container">
      <RouterLink class="navbar-brand" to="/movies">
        Movie App
      </RouterLink>

      <button
        v-if="isLoggedIn"
        class="btn btn-danger"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </nav>

  <RouterView />
</template>
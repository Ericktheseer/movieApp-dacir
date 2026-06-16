<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const notyf = new Notyf()
const movies = ref([])
const isAdmin = ref(false)

async function getMovies() {
  try {
    const response = await api.get('/movies/getMovies')
    console.log('MOVIES RESPONSE:', response.data)

    movies.value =
      response.data.movies ||
      response.data.result ||
      response.data.data ||
      response.data
  } catch (error) {
    console.log('MOVIES ERROR:', error.response?.data || error)
    notyf.error('Failed to load movies')
  }
}

onMounted(() => {
  isAdmin.value = localStorage.getItem('isAdmin') === 'true'
  getMovies()
})
</script>

<template>
  <div class="container py-5">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold">
        🎬 Movie Catalog
      </h1>

      <RouterLink
        v-if="isAdmin"
        to="/admin"
        class="btn btn-success"
      >
        <i class="bi bi-speedometer2"></i>
        Dashboard
      </RouterLink>
    </div>

    <div class="row">

      <div
        v-for="movie in movies"
        :key="movie._id"
        class="col-md-4 mb-4"
      >

        <div class="card shadow h-100">

          <div class="card-body">

            <h4 class="card-title">
              {{ movie.title }}
            </h4>

            <p>
              <strong>Director:</strong>
              {{ movie.director }}
            </p>

            <p>
              <strong>Year:</strong>
              {{ movie.year }}
            </p>

            <p>
              <strong>Genre:</strong>
              {{ movie.genre }}
            </p>

            <RouterLink
              :to="`/movie/${movie._id}`"
              class="btn btn-primary"
            >
              View Movie
            </RouterLink>

          </div>

        </div>

      </div>

    </div>

  </div>
</template> 
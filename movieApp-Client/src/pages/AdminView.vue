<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const notyf = new Notyf()
const movies = ref([])

async function getMovies() {
  try {
    const response = await api.get('/movies/getMovies')
    movies.value = response.data.movies || response.data.result || response.data.data || response.data
  } catch (error) {
    notyf.error('Failed to load movies')
  }
}

async function deleteMovie(id) {
  if (!confirm('Are you sure you want to delete this movie?')) {
    return
  }

  try {
    await api.delete(`/movies/deleteMovie/${id}`)
    notyf.success('Movie deleted')
    getMovies()
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Failed to delete movie')
  }
}

onMounted(() => {
  getMovies()
})
</script>

<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Admin Dashboard</h1>

      <RouterLink to="/addMovie" class="btn btn-success">
        Add Movie
      </RouterLink>
    </div>

    <div class="card shadow">
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="movie in movies" :key="movie._id">
              <td>{{ movie.title }}</td>
              <td>{{ movie.director }}</td>
              <td>{{ movie.year }}</td>
              <td>{{ movie.genre }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteMovie(movie._id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <RouterLink to="/movies" class="btn btn-secondary mt-3">
      Back to Movies
    </RouterLink>
  </div>
</template>
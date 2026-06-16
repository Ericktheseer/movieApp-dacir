<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const router = useRouter()
const notyf = new Notyf()

const title = ref('')
const director = ref('')
const year = ref('')
const description = ref('')
const genre = ref('')
const isLoading = ref(false)

async function addMovie() {
  try {
    isLoading.value = true

    await api.post('/movies/addMovie', {
      title: title.value,
      director: director.value,
      year: Number(year.value),
      description: description.value,
      genre: genre.value
    })

    notyf.success('Movie added successfully')
    router.push('/movies')
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Failed to add movie')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container py-5">
    <RouterLink to="/movies" class="btn btn-secondary mb-3">
      Back to Movies
    </RouterLink>

    <div class="card shadow">
      <div class="card-body">
        <h2 class="mb-4">Add Movie</h2>

        <form @submit.prevent="addMovie">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input v-model="title" type="text" class="form-control" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Director</label>
            <input v-model="director" type="text" class="form-control" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Year</label>
            <input v-model="year" type="number" class="form-control" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Genre</label>
            <input v-model="genre" type="text" class="form-control" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="description" class="form-control" rows="4" required></textarea>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Adding...' : 'Add Movie' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
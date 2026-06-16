<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const route = useRoute()
const notyf = new Notyf()

const movie = ref({})
const comments = ref([])
const comment = ref('')

async function getMovie() {
  try {
    const response = await api.get(`/movies/getMovie/${route.params.id}`)
    console.log('MOVIE RESPONSE:', response.data)

    movie.value = response.data.movie || response.data
  } catch (error) {
    console.log(error)
    notyf.error('Failed to load movie')
  }
}

async function getComments() {
  try {
    const response = await api.get(`/movies/getComments/${route.params.id}`)
    comments.value = response.data.comments || response.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getMovie()
  getComments()
})

async function addComment() {
  if (!comment.value) {
    notyf.error('Please enter a comment')
    return
  }

  try {
    await api.post(`/movies/addComment/${route.params.id}`, {
      comment: comment.value
    })

    notyf.success('Comment added')
    comment.value = ''
    getComments()
  } catch (error) {
    notyf.error('Failed to add comment')
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
        <h1>{{ movie.title }}</h1>

        <hr>

        <p><strong>Director:</strong> {{ movie.director }}</p>
        <p><strong>Year:</strong> {{ movie.year }}</p>
        <p><strong>Genre:</strong> {{ movie.genre }}</p>
        <p><strong>Description:</strong> {{ movie.description }}</p>
      </div>
    </div>

    <div class="card shadow mt-4">
      <div class="card-body">
        <h4>Comments</h4>

        <div v-if="comments.length === 0" class="alert alert-info">
          No comments yet.
        </div>

        <div
          v-for="comment in comments"
          :key="comment._id"
          class="border rounded p-2 mb-2"
        >
          {{ comment.comment }}
        </div>
      </div>
    </div>

    <form @submit.prevent="addComment" class="mb-3 mt-3">
      <label class="form-label">Add Comment</label>
      <textarea
        v-model="comment"
        class="form-control mb-2"
        rows="3"
        required
      ></textarea>

      <button class="btn btn-primary" type="submit">
        Add Comment
      </button>
    </form>
  </div>
</template>
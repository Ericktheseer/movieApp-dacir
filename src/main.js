// Importing Bootstrap After 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import the default Notyf styles.
import 'notyf/notyf.min.css';
import './assets/main.css'

import App from './App.vue'

// Pages
import LoginView from './pages/LoginView.vue'
import RegisterView from './pages/RegisterView.vue'
import MoviesView from './pages/MoviesView.vue'
import MovieDetailsView from './pages/MovieDetailsView.vue'
import AddMovieView from './pages/AddMovieView.vue'
import AdminView from './pages/AdminView.vue'

// Routes
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/movies'
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/movies',
      component: MoviesView
    },
    {
      path: '/movie/:id',
      component: MovieDetailsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      component: AdminView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/addMovie',
      component: AddMovieView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/movies')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/movies')
  } else {
    next()
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

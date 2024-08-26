// middleware/auth.js
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth state
  authStore.initializeAuth()

  console.log('Auth middleware running', { to, from, isAuthenticated: authStore.checkAuth() })

  if (!authStore.checkAuth() && to.path !== '/login') {
    console.log('Redirecting to login')
    return navigateTo('/login')
  }
  
  if (authStore.checkAuth() && to.path === '/login') {
    console.log('Redirecting to home')
    return navigateTo('/')
  }
})
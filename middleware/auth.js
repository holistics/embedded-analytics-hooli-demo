// middleware/auth.js
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth state
  authStore.initializeAuth()

  if (!authStore.checkAuth() && to.path !== '/login') {
    return navigateTo('/login')
  }
  
  if (authStore.checkAuth() && to.path === '/login') {
    return navigateTo('/')
  }
})
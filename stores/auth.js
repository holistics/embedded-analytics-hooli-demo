/// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null
  }),
  actions: {
    login(user) {
      this.currentUser = user
      if (process.client) {
        localStorage.setItem('lastLoggedInUser', user)
      }
    },
    logout() {
      this.currentUser = null
      if (process.client) {
        localStorage.removeItem('lastLoggedInUser')
      }
    },
    checkAuth() {
      if (!this.currentUser && process.client) {
        const lastUser = localStorage.getItem('lastLoggedInUser')
        if (lastUser) {
          this.currentUser = lastUser
        }
      }
      return !!this.currentUser
    },
    initializeAuth() {
      if (process.client) {
        const lastUser = localStorage.getItem('lastLoggedInUser')
        if (lastUser) {
          this.currentUser = lastUser
        }
      }
    }
  },
  persist: true
})
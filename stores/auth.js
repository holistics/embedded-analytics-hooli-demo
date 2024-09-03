// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null
  }),
  actions: {
    login(user) {
      this.currentUser = user
      if (process.client) {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
      // Sync with users store
      const usersStore = useUsersStore()
      usersStore.setCurrentUser(user)
    },
    logout() {
      this.currentUser = null
      if (process.client) {
        localStorage.removeItem('currentUser')
      }
      // Sync with users store
      const usersStore = useUsersStore()
      usersStore.clearCurrentUser()
    },
    checkAuth() {
      if (!this.currentUser && process.client) {
        const lastUser = localStorage.getItem('currentUser')
        if (lastUser) {
          this.currentUser = JSON.parse(lastUser)
          // Sync with users store
          const usersStore = useUsersStore()
          usersStore.setCurrentUser(this.currentUser)
        }
      }
      return !!this.currentUser
    },
    initializeAuth() {
      if (process.client) {
        const lastUser = localStorage.getItem('currentUser')
        if (lastUser) {
          this.currentUser = JSON.parse(lastUser)
          // Sync with users store
          const usersStore = useUsersStore()
          usersStore.setCurrentUser(this.currentUser)
        }
      }
    }
  },
  persist: true
})
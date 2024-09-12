import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useUsersStore = defineStore('users', {
  state: () => ({
    availableUsers: [
      {
        id: 'RM001',
        name: 'Gavin Belson',
        mail: 'gavin.belson@hooli.com',
        role: 'Regional Manager',
        merchantId: ['561','483', '126', '315'],
        avatar: "https://cdn.holistics.io/hooli/gavin_belson.png"
      },
      {
        id: 'RM002',
        name: 'Richard Hendricks',
        mail: 'richard.hendricks@hooli.com',
        role: 'Regional Manager',
        merchantId: ['255', '353', '661'],
        avatar: "https://cdn.holistics.io/hooli/richard_hendricks.png"
      },
      {
        id: 'MM001',
        name: 'Erlich Bachman',
        mail: 'erlich.bachman@hooli.com',
        role: 'Merchant Manager',
        merchantId: ['561'],
        avatar: "https://cdn.holistics.io/hooli/erligh_bachman.png"
      },
      {
        id: 'MM002',
        name: 'Jian Yang',
        mail: 'jian.yang@hooli.com',
        role: 'Merchant Manager',
        merchantId: ['483'],
        avatar: "https://cdn.holistics.io/hooli/jian_yang.png"
      },
      {
        id: 'MM003',
        name: 'Jared Dunn',
        mail: 'jared.dunn@hooli.com',
        role: 'Merchant Manager',
        merchantId: ['255'],
        avatar: "https://cdn.holistics.io/hooli/jared_dunn.png"
      },
      {
        id: 'MM004',
        name: 'Monica',
        mail: 'monica@hooli.com',
        role: 'Merchant Manager',
        merchantId: ['353'],
        avatar: "https://cdn.holistics.io/hooli/monica_hall.png"
      }
    ],
  }),
  actions: {
    setCurrentUser(user) {
      const authStore = useAuthStore()
      authStore.currentUser = user
    },

    clearCurrentUser() {
      const authStore = useAuthStore()
      authStore.currentUser = null
    },
    getUserById(userId) {
      return this.availableUsers.find(u => u.id === userId) || null
    },

    addUser(user) {authStore
    },

    removeUser(userId) {
      const index = this.availableUsers.findIndex(u => u.id === userId)
      if (index > -1) {
        this.availableUsers.splice(index, 1)
      }
    },

    initializeCurrentUser() {
      this.loadCurrentUserFromLocalStorage()
      if (!this.currentUser && this.availableUsers.length > 0) {
        this.setCurrentUser(this.availableUsers[0].id)
      }
    },

    // New method to save current user to local storage
    saveCurrentUserToLocalStorage() {
      if (this.currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      }
    },

    // New method to load current user from local storage
    loadCurrentUserFromLocalStorage() {
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser)
      }
    },

    // New method to remove current us  er from local storage
    removeCurrentUserFromLocalStorage() {
      localStorage.removeItem('currentUser')
    }
  },

  getters: {
    currentUser() {
      const authStore = useAuthStore()
      return authStore.currentUser
    },
    getDefaultUser: (state) => state.availableUsers[0] || null,
  }
})
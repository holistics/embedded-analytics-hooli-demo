import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useUsersStore = defineStore('users', {
  state: () => ({
    availableUsers: [
      {
        id: 'RM001',
        name: 'Jared Dunn',
        mail: 'jared.dunn@hooli.com',
        role: 'Regional Manager',
        manages: ['MM001', 'MM002'],
        managedBy: null,
        merchantId: ['561','483', '126', '135']
      },
      {
        id: 'RM002',
        name: 'Peter Gregory',
        mail: 'peter.gregory@hooli.com',
        role: 'Regional Manager',
        manages: ['MM003'],
        managedBy: null,
        merchantId: ['255', '353', '661']
      },
      {
        id: 'MM001',
        name: 'Erlich Bachman',
        mail: 'erlich.backman@hooli.com',
        role: 'Merchant Manager',
        manages: [],
        managedBy: 'RM001',
        merchantId: '561'
      },
      {
        id: 'MM002',
        name: 'Jian Yang',
        mail: 'jian.yang@hooli.com',
        role: 'Merchant Manager',
        manages: [],
        managedBy: 'RM001',
        merchantId: '483'
      },
      {
        id: 'MM003',
        name: 'Gilfoyle',
        mail: 'gilfoyle@hooli.com',
        role: 'Merchant Manager',
        manages: [],
        managedBy: 'RM002',
        merchantId: '255'
      }
    ],
    userChangedFlag: false
  }),
  actions: {
    setCurrentUser(user) {
      const authStore = useAuthStore()
      authStore.currentUser = user
      this.userChangedFlag = true
    },

    clearCurrentUser() {
      const authStore = useAuthStore()
      authStore.currentUser = null
      this.userChangedFlag = true
    },
    getUserById(userId) {
      return this.availableUsers.find(u => u.id === userId) || null
    },

    addUser(user) {
      if (!this.availableUsers.some(u => u.id === user.id)) {
        this.availableUsers.push(user)
      }
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

    resetUserChangedFlag() {
      this.userChangedFlag = false
    },

    setUserChangedFlag(flag) {
      this.userChangedFlag = flag
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
        this.userChangedFlag = true
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
    hasUserChanged: (state) => state.userChangedFlag
  }
})
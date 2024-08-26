import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    availableUsers: ['A', 'B', 'C', 'D', 'E']
  }),
  actions: {
    addUser(user) {
      if (!this.availableUsers.includes(user)) {
        this.availableUsers.push(user)
      }
    },
    removeUser(user) {
      const index = this.availableUsers.indexOf(user)
      if (index > -1) {
        this.availableUsers.splice(index, 1)
      }
    }
  }
})
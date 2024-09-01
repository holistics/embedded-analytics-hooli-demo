import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    availableUsers: [
      {
        id: 'RM001',
        name: 'Jared Dunn',
        mail: 'jared.dunn@hooli.com',
        role: 'Regional Manager',
        manages: ['MM001', 'MM002'],
        managedBy: null
      },
      {
        id: 'RM002',
        name: 'Peter Gregory',
        mail: 'peter.gregory@hooli.com',
        role: 'Regional Manager',
        manages: ['MM003'],
        managedBy: null
      },
      {
        id: 'MM001',
        name: 'Erlich Bachman',
        mail: 'erlich.backman@hooli.com',
        role: 'Merchant Manager',
        manages: [],
        managedBy: 'RM001'
      },
      {
        id: 'MM002',
        name: 'Jian Yang',
        mail: 'jian.yang@hooli.com',
        role: 'Merchant Manager',
        manages: [],
        managedBy: 'RM001'
      },
      {
        id: 'MM003',
        name: 'Gilfoyle',
        mail: 'gilfoyle@hooli.com',
        role: 'Merchant Manager',
        manages: [],
        managedBy: 'RM002'
      }
    ]
  }),
  actions: {
    addUser(user) {
      if (!this.availableUsers.some(u => u.name === user.name)) {
        this.availableUsers.push(user)
      }
    },
    removeUser(user) {
      const index = this.availableUsers.findIndex(u => u.name === user.name)
      if (index > -1) {
        this.availableUsers.splice(index, 1)
      }
    },
    getUserByName(name) {
      return this.availableUsers.find(u => u.name === name) || null
    }
  },
  getters: {
    getDefaultUser: (state) => state.availableUsers[0] || null
  }
})
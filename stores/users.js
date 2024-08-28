import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    availableUsers: [
      { name: 'Erlich Bachman', role: 'Merchant', mail: 'erlich.backman@hooli.com', avatar: 'https://ca.slack-edge.com/T02SY7XCK-U03B1RQ294H-529398856197-512' },
      { name: 'Jian Yang', role: 'Merchant', mail: 'jian.yang@hooli.com', avatar: 'https://ca.slack-edge.com/T02SY7XCK-UKVL6B2VD-d82da0dd4d21-512' },
      { name: 'Gilfoyle', role: 'Merchant', mail: 'gilfoyle@hooli.com', avatar: 'https://ca.slack-edge.com/T02SY7XCK-U5YJPBRT2-b3eea2198518-512' },
      { name: 'Jared Dunn', role: 'Regional Manager', mail: 'jared.dunn@hooli.com', avatar: 'https://ca.slack-edge.com/T02SY7XCK-UB62ZD53R-06994a1cc074-512' },
      { name: 'Peter Gregory', role: 'Regional Manager', mail: 'peter.gregory@hooli.com', avatar: 'https://ca.slack-edge.com/T02SY7XCK-URP8AEA9X-95a2a54f49cc-512' },
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
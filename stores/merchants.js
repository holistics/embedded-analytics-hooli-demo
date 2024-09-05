import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useMerchantsStore = defineStore('merchants', {
  state: () => ({
    availableMerchants: [
        { id: '561', name: "Central Market Store", managerId: "MM001", img: "https://picsum.photos/seed/picsum/150" },
        { id: '483', name: "Riverfront Bazaar", managerId: "MM002", img: "https://picsum.photos/seed/picsum/150" },
        { id: '255', name: "Neighborhood Nook", managerId: "MM003", img: "https://picsum.photos/seed/picsum/150" },
    ]
  })
})
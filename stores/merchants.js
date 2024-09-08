import { defineStore } from 'pinia'

export const useMerchantsStore = defineStore('merchants', {
  state: () => ({
    availableMerchants: [
      { id: '561', name: "Dibbert, Abernathy and Mertz", managerId: "MM001", img: "https://picsum.photos/id/36/150" },
      { id: '483', name: "Nader Inc", managerId: "MM002", img: "https://picsum.photos/id/180/150" },
      { id: '255', name: "Gleichner, Dickinson and Jenkins", managerId: "MM003", img: "https://picsum.photos/id/7/150" },
    ],
    selectedMerchant: 'all'
  }),
  actions: {
    setSelectedMerchant(merchantId) {
      this.selectedMerchant = merchantId
    }
  },
  getters: {
    getSelectedMerchantName: (state) => {
      if (state.selectedMerchant === 'all') {
        return 'All Merchants'
      }
      const selected = state.availableMerchants.find(m => m.id === state.selectedMerchant)
      return selected ? selected.name : ''
    },
    getSelectedMerchantIds: (state) => (currentUser) => {
      if (state.selectedMerchant === 'all') {
        return currentUser.merchantId
      }
      return [state.selectedMerchant]
    }
  }
})
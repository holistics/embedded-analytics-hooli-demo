import { defineStore } from 'pinia'

export const useMerchantsStore = defineStore('merchants', {
  state: () => ({
    availableMerchants: [
      { id: '561', name: "Dibbert, Abernathy and Mertz" },
      { id: '483', name: "Nader Inc" },
      { id: '255', name: "Gleichner, Dickinson and Jenkins" },
      { id: '126', name: "Feest, Schumm and Walsh" },
      { id: '315', name: "Mayer and Sons" },
      { id: '353', name: "Bailey, Monahan and Nitzsche" },
      { id: '661', name: "Dooley Inc" },
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
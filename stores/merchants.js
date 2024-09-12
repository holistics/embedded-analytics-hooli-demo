import { defineStore } from 'pinia'

export const useMerchantsStore = defineStore('merchants', {
  state: () => ({
    availableMerchants: [
      { id: '561', name: "Dibbert, Abernathy and Mertz", img: "https://picsum.photos/id/36/150" },
      { id: '483', name: "Nader Inc", img: "https://picsum.photos/id/180/150" },
      { id: '255', name: "Gleichner, Dickinson and Jenkins", img: "https://picsum.photos/id/7/150" },
      { id: '126', name: "Feest, Schumm and Walsh", img: "https://picsum.photos/id/68/150" },
      { id: '315', name: "Mayer and Sons", img: "https://picsum.photos/id/93/150" },
      { id: '353', name: "Bailey, Monahan and Nitzsche", img: "https://picsum.photos/id/51/150" },
      { id: '661', name: "Dooley Inc", img: "https://picsum.photos/id/88/150" },
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
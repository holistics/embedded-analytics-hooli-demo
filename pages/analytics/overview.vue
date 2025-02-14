<template>
  <div class="p-3">
    <MerchantSelectMenu />
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Overview</h1>
    <p class="text-lg text-gray-500 mb-4">Dive deeper into sales trends, top products and categories.</p>
    <blockquote class="border-l-8 border-orange-500 bg-orange-100 py-4 pl-6 mb-6">
      <p class="mb-0">👉 Interact with the dashboard in several ways:</p>
      <ul class="ml-10 list-disc">
        <li>Using provided filters to filter out data.</li>
        <li>Cross-filter by clicking on any data point.</li>
        <li>Date-drill or Drill-through by right-click on any data points.</li>
      </ul>
    </blockquote>

    <DashboardOriginal 
      dashboardLink="https://playground.holistics.io/studio/projects/23200/explore/modules/demo/ecommerce/dashboards/hooli_overview.page.aml"
      dashboardName="Hooli Overview"  
    />
    
    <IframeLoader :iframe-url="iframeUrl"/>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch } from '#app'
import MerchantSelectMenu from '~/components/MerchantSelectMenu.vue'
import DashboardOriginal from '~/components/DashboardOriginal.vue'
import IframeLoader from '~/components/IframeLoader.vue'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const merchantsStore = useMerchantsStore()
const { availableMerchants, selectedMerchant } = storeToRefs(merchantsStore)

const iframeUrl = ref('')
const selectedMerchantLocal = ref(selectedMerchant.value)

const isRegionalManager = computed(() => {
  return currentUser.value?.role === 'Regional Manager'
}) 

const merchantIdToSend = computed(() => {
  if (!isRegionalManager.value) {
    return currentUser.value?.merchantId
  }
  return merchantsStore.getSelectedMerchantIds(currentUser.value)
})

const { data, error } = useFetch('/api/overview', {
  method: 'POST',
  body: computed(() => ({ merchantId: merchantIdToSend.value })),
  watch: [currentUser, selectedMerchant]
})

watch(() => data.value, (newData) => {
  if (newData && newData.embed_code && newData.token) {
    iframeUrl.value = `https://secure.holistics.io/embed/${newData.embed_code}?_token=${newData.token}`
  } else {
    iframeUrl.value = ''
  }
})

watch(() => error.value, (newError) => {
  if (newError) {
    console.error('Error fetching overview data:', newError)
    // Handle the error (e.g., show a notification to the user)
  }
})

const selectedMerchantName = computed(() => {
  if (selectedMerchantLocal.value === 'all') {
    return 'All Merchants'
  }
  const selected = filteredMerchants.value.find(m => m.id === selectedMerchantLocal.value)
  return selected ? selected.name : ''
})

const filteredMerchants = computed(() => {
  if (isRegionalManager.value && currentUser.value?.merchantId) {
    return availableMerchants.value.filter(merchant =>
      currentUser.value.merchantId.includes(merchant.id)
    )
  }
  return []
})

const merchantOptions = computed(() => {
  if (isRegionalManager.value) {
    return [
      { id: 'all', name: 'All Merchants' },
      ...filteredMerchants.value
    ]
  }
  return filteredMerchants.value
})

watch(selectedMerchantLocal, (newValue) => {
  merchantsStore.setSelectedMerchant(newValue)
})

watch(filteredMerchants, (newFilteredMerchants) => {
  if (newFilteredMerchants.length > 0 && !newFilteredMerchants.some(m => m.id === selectedMerchantLocal.value)) {
    selectedMerchantLocal.value = 'all'
  } else if (newFilteredMerchants.length === 0) {
    selectedMerchantLocal.value = null
  }
}, { immediate: true })

watch(selectedMerchant, (newValue) => {
  selectedMerchantLocal.value = newValue
})

authStore.initializeAuth()
</script>
<!-- pages/index.vue -->
<template>
  <div class="p-4">
      
    <div v-if="isRegionalManager" class="flex items-center space-x-4 mb-8">
      <h3 class="text-lg font-semibold whitespace-nowrap">Filter by Merchants</h3>
      <USelectMenu
        v-model="selectedMerchant"
        :options="filteredMerchants"
        option-attribute="name"
        value-attribute="id"
        placeholder="Select a merchant"
        class="flex min-w-[#150px]"
      >
        <template #trigger="{ open }">
          <UButton color="gray" :icon="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" block>
            {{ selectedMerchantName || 'Select a merchant' }}
          </UButton>
        </template>
      </USelectMenu>

    </div>
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Metrics</h1>

    <kpipanel class="mb-8" />
  </div>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Business Insights</h1>
    <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
      <iframe :src="iframeUrl" class="w-full h-full border rounded" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else class="text-center py-8 h-[calc(100vh-150px)]">
      <p>Loading iframe...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch, useRoute } from '#app'

const route = useRoute()
const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const iframeUrl = ref('')
const selectedMerchant = ref('')

authStore.initializeAuth()

const merchantsStore = useMerchantsStore()
const { availableMerchants } = storeToRefs(merchantsStore)

const isRegionalManager = computed(() => {
  return currentUser.value?.role === 'Regional Manager'
})

const merchantIdToSend = computed(() => {
  if (!isRegionalManager.value) {
    return currentUser.value?.merchantId
  }
  return [selectedMerchant.value]
})

const { data, error } = useFetch('/api/business', {
  method: 'POST',
  body: computed(() => ({ merchantId: merchantIdToSend.value })),
  watch: [currentUser, selectedMerchant]
})

// Watch for changes in the API response
watch(() => data.value, (newData) => {
  console.log('API response received')
  if (newData && newData.embed_code && newData.token) {
    iframeUrl.value = `https://secure.holistics.io/embed/${newData.embed_code}?_token=${newData.token}`
  } else {
    iframeUrl.value = ''
  }
}, { immediate: true })

// Handle potential errors
watch(() => error.value, (newError) => {
  if (newError) {
    console.error('Error fetching business data:', newError)
    // Handle the error (e.g., show a notification to the user)
  }
})

const selectedMerchantName = computed(() => {
  const selected = filteredMerchants.value.find(m => m.id === selectedMerchant.value)
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

watch(filteredMerchants, (newFilteredMerchants) => {
  if (newFilteredMerchants.length > 0 && !newFilteredMerchants.some(m => m.id === selectedMerchant.value)) {
    selectedMerchant.value = newFilteredMerchants[0].id
  } else if (newFilteredMerchants.length === 0) {
    selectedMerchant.value = ''
  }
}, { immediate: true })

// Watch for changes in the route query
watch(() => route.query.selectedMerchant, (newSelectedMerchant) => {
  if (newSelectedMerchant && filteredMerchants.value.some(m => m.id === newSelectedMerchant)) {
    selectedMerchant.value = newSelectedMerchant
  }
}, { immediate: true })

</script>
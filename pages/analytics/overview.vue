<template>
  <div class="p-4">
    <div v-if="isRegionalManager" class="flex items-center space-x-4 mb-8">
      <h3 class="text-lg font-semibold whitespace-nowrap">Filter by Merchants</h3>
      <USelectMenu
        v-model="selectedMerchantLocal"
        :options="merchantOptions"
        option-attribute="name"
        value-attribute="id"
        placeholder="Select a merchant"
        class="flex w-64"
      >
        <template #trigger="{ open }">
          <UButton color="gray" :icon="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" block>
            {{ selectedMerchantName || 'Select a merchant' }}
          </UButton>
        </template>
      </USelectMenu>
    </div>
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Overview</h1>
    <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
      <iframe :src="iframeUrl" class="w-full h-full border rounded" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else class="text-center py-8">
      <p>Loading iframe...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch } from '#app'

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
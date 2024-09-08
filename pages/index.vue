<template>
  <div class="p-4">
    <MerchantSelectMenu />
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Metrics</h1>
    <kpipanel class="mb-8" />
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Business Insights</h1>
      <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
        <iframe :src="iframeUrl" class="w-full h-full border rounded" frameborder="0" allowfullscreen></iframe>
      </div>
      <div v-else class="text-center py-8 h-[calc(100vh-150px)]">
        <p>Loading iframe...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch } from '#app'
import MerchantSelectMenu from '~/components/MerchantSelectMenu.vue'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const merchantsStore = useMerchantsStore()
const { selectedMerchant } = storeToRefs(merchantsStore)
const iframeUrl = ref('')

const merchantIdToSend = computed(() => {
  if (currentUser.value?.role !== 'Regional Manager') {
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
</script>
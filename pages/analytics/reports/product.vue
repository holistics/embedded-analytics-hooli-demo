<template>
  <div class="py-4">
    <NuxtLink :to="`https://playground.holistics.io/studio/projects/23200/explore/modules/demo/ecommerce/dashboards/hooli_products.page.aml`" target="_blank">
      <UButton
        icon="i-heroicons-arrow-top-right-on-square"
        size="sm" 
        color="gray"
        variant="solid"
        label="Go to original dashboard"
        :trailing="false"
        class="mb-3"
      />
    </NuxtLink>
    <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
      <iframe :src="iframeUrl" class="w-full h-full border rounded" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else class="text-center py-8">
      <p>Loading iframe...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch } from '#app'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const merchantsStore = useMerchantsStore()
const { selectedMerchant } = storeToRefs(merchantsStore)
const iframeUrl = ref('')

const merchantIdToSend = computed(() => {
  if (currentUser.value?.role !== 'Regional Manager') {
    return currentUser.value?.merchantId
  }
  return merchantsStore.getSelectedMerchantIds(currentUser.value)
})

const { data, error } = useFetch('/api/product', {
  method: 'POST',
  body: computed(() => ({ merchantId: merchantIdToSend.value })),
  watch: [currentUser, selectedMerchant]
})

// Watch for changes in the API response
watch(() => data.value, (newData) => {
  if (newData && newData.embed_code && newData.token) {
    iframeUrl.value = `https://secure.holistics.io/embed/${newData.embed_code}?_token=${newData.token}`
  } else {
    iframeUrl.value = ''
  }
})

// Handle potential errors
watch(() => error.value, (newError) => {
  if (newError) {
    console.error('Error fetching product data:', newError)
    // Handle the error (e.g., show a notification to the user)
  }
})

authStore.initializeAuth()
</script>
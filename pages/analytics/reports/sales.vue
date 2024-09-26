<template>
  <div class="py-4">
    <DashboardOriginal />
 
    <IframeLoader :iframe-url="iframeUrl"/>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch } from '#app'
import DashboardOriginal from '~/components/DashboardOriginal.vue'
import IframeLoader from '~/components/IframeLoader.vue'

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

const { data, error } = useFetch('/api/sale', {
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
    console.error('Error fetching business data:', newError)
    // Handle the error (e.g., show a notification to the user)
  }
})

authStore.initializeAuth()
</script>
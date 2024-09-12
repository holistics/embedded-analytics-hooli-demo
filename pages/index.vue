<template>
  <div class="p-4">
    <MerchantSelectMenu />
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Metrics</h1>
    <kpipanel class="mb-8" />
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
import { ref, computed, watch, watchEffect } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch, useRouter } from '#app'
import MerchantSelectMenu from '~/components/MerchantSelectMenu.vue'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const merchantsStore = useMerchantsStore()
const { selectedMerchant } = storeToRefs(merchantsStore)
const iframeUrl = ref('')
const router = useRouter()

const merchantIdToSend = computed(() => {
  if (currentUser.value?.role !== 'Regional Manager') {
    return currentUser.value?.merchantId
  }
  return merchantsStore.getSelectedMerchantIds(currentUser.value)
})

const shouldFetchData = computed(() => {
  return !!currentUser.value && !!selectedMerchant.value
})

const { data, error, execute } = useFetch(
  '/api/business',
  {
    method: 'POST',
    body: computed(() => ({ merchantId: merchantIdToSend.value })),
  },
  {
    server: false,
    immediate: false,
    lazy: true,
  }
)

watchEffect(() => {
  if (shouldFetchData.value) {
    execute()
  }
})

watch(data, (newData) => {
  if (newData && newData.embed_code && newData.token) {
    iframeUrl.value = `https://secure.holistics.io/embed/${newData.embed_code}?_token=${newData.token}`
  } else {
    iframeUrl.value = ''
  }
})

watch(error, (newError) => {
  if (newError) {
    console.error('Error fetching business data:', newError)
    // Handle the error (e.g., show a notification to the user)
  }
})

// Watch for auth state changes
watch(currentUser, (newUser) => {
  if (!newUser) {
    router.push('/login')
  }
}, { immediate: true })

// Initialize auth
authStore.initializeAuth()
</script>
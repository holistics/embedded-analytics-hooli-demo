<!-- pages/index.vue -->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Metrics</h1>
    
    <kpipanel class="mb-8" />
  </div>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Business Insights</h1>
    <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
      <iframe :src="iframeUrl" class="w-full h-full border rounded" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else class="text-center py-8">
      <p>Loading iframe...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
import { useFetch } from '#app'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

const iframeUrl = ref('')
const isLoading = ref(true)
const error = ref(null)

// Function to make the API call
const fetchBusinessData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const { data: responseData, error: responseError } = await useFetch('/api/business', {
      method: 'POST',
      body: { user: currentUser.value }
    })

    if (responseError.value) {
      throw new Error(responseError.value.message)
    }

    if (responseData.value && responseData.value.embed_code && responseData.value.token) {
      iframeUrl.value = `https://secure.holistics.io/embed/${responseData.value.embed_code}?_token=${responseData.value.token}`
    } else {
      iframeUrl.value = ''
    }
  } catch (e) {
    console.error('Error fetching business data:', e)
    error.value = e.message || 'An error occurred while fetching data'
  } finally {
    isLoading.value = false
  }
}

// Make initial API call when component mounts
onMounted(() => {
  if (currentUser.value) {
    fetchBusinessData()
  }
})

// Watch for changes in currentUser
watch(currentUser, (newUser) => {
  if (newUser) {
    fetchBusinessData()
  } else {
    iframeUrl.value = ''
  }
})
</script>
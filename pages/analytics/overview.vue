<template>
  <div class="p-4">
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
import { ref, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
import { useFetch } from '#app'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const iframeUrl = ref('')

const { data, error } = useFetch('/api/overview', {
  method: 'POST',
  body: computed(() => ({ user: currentUser.value })),
  watch: [currentUser]
})

// Watch for changes in the API response
watch(() => data.value, (newData) => {
  console.log('test')
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
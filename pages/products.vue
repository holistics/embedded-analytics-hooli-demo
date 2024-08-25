<!-- pages/products.vue -->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
      <iframe :src="iframeUrl" class="w-full h-full border-0" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else class="text-center py-8">
      <p>Loading iframe...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const iframeUrl = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/generate-iframe-token')
    const data = await response.json()
    iframeUrl.value = `https://demo4.holistics.io/embed/${data.embed_code}?_token=${data.token}`
  } catch (error) {
    console.error('Error fetching iframe token:', error)
  }
})
</script>
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
import { ref } from 'vue'
import { useFetch } from '#app'

const iframeUrl = ref('')

const { data, error } = await useFetch('/api/overview')

if (data.value) {
  iframeUrl.value = `https://secure.holistics.io/embed/${data.value.embed_code}?_token=${data.value.token}`
}

if (error.value) {
  console.error('Error fetching iframe token:', error.value)
}
</script>
<template>
  <div class="py-4">
    <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
      <iframe :src="iframeUrl" class="w-full h-full border" frameborder="0" allowfullscreen></iframe>
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

const { data, error } = await useFetch('/api/product')

if (data.value) {
  iframeUrl.value = `https://demo4.holistics.io/embed/${data.value.embed_code}?_token=${data.value.token}`
}

if (error.value) {
  console.error('Error fetching iframe token:', error.value)
}
</script>
<template>
  <div :class="containerClass">
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <img src="https://cdn.holistics.io/hooli/loading.gif" alt="Loading..." class="w-[180px] h-[180px]" />
    </div>
    <iframe 
      v-show="!isLoading && iframeUrl" 
      :src="iframeUrl" 
      class="w-full h-full" 
      frameborder="0" 
      allowfullscreen
      @load="onIframeLoad"
      ref="iframeRef"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  iframeUrl: {
    type: String,
    required: true
  },
  containerClass: {
    type: String,
    default: 'w-full h-[calc(100vh-150px)] border rounded'
  },
})

const isLoading = ref(true)
const iframeRef = ref(null)

watch(() => props.iframeUrl, (newUrl) => {
  isLoading.value = true
  if (!newUrl) {
    isLoading.value = false
  }
}, { immediate: true })

function onIframeLoad() {
  if (process.client) {
    checkIframeContent()
  } else {
    isLoading.value = false
  }
}

function checkIframeContent() {
  const checkContent = () => {
    if (iframeRef.value) {
      try {
        const iframeDocument = iframeRef.value.contentDocument || iframeRef.value.contentWindow.document
        if (iframeDocument.readyState === 'complete') {
          isLoading.value = false
        } else {
          requestAnimationFrame(checkContent)
        }
      } catch (error) {
        console.warn('Unable to check iframe load status:', error)
        isLoading.value = false
      }
    }
  }

  requestAnimationFrame(checkContent)
}
</script>
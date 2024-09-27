<template>
  <div class="flex flex-col h-screen">
    <!-- Sticky Banner -->
    <header class="bg-red-600 text-white p-2 sticky top-0 z-10 text-center">
        <div class="flex items-center justify-center space-x-2">
          <p class="font-bold">This is our demo app, try with your own databases 👉</p>
          <UButton 
            variant="outline" 
            label="free"
            color="white"
            to="https://www.holistics.io/request-trial/"
          >Get started free</UButton>
        </div>
    </header>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <sidebar />

      <!-- Scrollable Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 container mx-auto relative">
          <img src="https://cdn.holistics.io/hooli/hooli-blob.svg" class="absolute top-[-80px] right-[-20px]" />
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

authStore.initializeAuth()
</script>
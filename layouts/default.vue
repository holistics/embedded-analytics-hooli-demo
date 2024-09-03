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
          >Get started free</UButton>
        </div>
    </header>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <sidebar />

      <!-- Scrollable Content -->
      <main class="flex-1 p-4 overflow-y-auto">
        <slot />
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
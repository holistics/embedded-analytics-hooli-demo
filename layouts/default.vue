<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <sidebar />
    
    <!-- Main content area -->
    <div class="flex-1 overflow-auto">
      <div class="p-[60px]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})
</script>
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <sidebar />
    
    <!-- Main content area -->
    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>
import sidebar from '~/components/sidebar.vue'
</script>
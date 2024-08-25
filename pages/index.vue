<!-- pages/index.vue -->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
    
    <KpiPanel class="mb-8" />
    
    <!-- Other dashboard content goes here -->
    <p class="text-gray-600">Welcome to your dashboard. Here you can see an overview of your orders and other important metrics.</p>
  </div>
</template>

<script setup>
import KpiPanel from '~/components/kpipanel.vue'
</script>
<template>
  <div class="flex flex-col h-screen">
    <!-- Sticky Banner -->
    <header class="bg-blue-500 text-white p-4 sticky top-0 z-10">
      <h1 class="text-2xl font-bold">Your Banner</h1>
      <UButton 
        color="red" 
        variant="ghost" 
        class="w-full text-white hover:bg-[#dc4c3d] transition-colors duration-200"
        label="free"
      >Free Trial</UButton>
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
</script>
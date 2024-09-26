<template>
  <div class="mb-1">
    <UButton
      icon="i-heroicons-arrow-top-right-on-square"
      size="sm" 
      color="gray"
      variant="solid"
      label="Go to original dashboard"
      :trailing="false"
      class="mb-3"
      @click="isOpen = true"
    />
    <UModal v-model="isOpen">
      <div class="p-12">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-semibold">Go to Original Dashboard <br>in our Playground</h2>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
        </div>
        <div>
        <p class="mb-2">Please follow these steps:</p>
        <p class="flex mb-2"><span class="block text-sm text-center w-5 h-5 mr-2 bg-primary-500 text-white rounded-full">1</span><span>Visit this URL: <a class="text-primary hover:underline" href="https://playground.holistics.io/play" target="_blank">https://playground.holistics.io/play</a></span></p>
        <p class="flex mb-4"><span class="block text-sm text-center min-w-5 h-5 mr-2 bg-primary-500 text-white rounded-full">2</span><span>Search for “Hooli”, all the dashboards in Hooli are listed in the results.</span></p>
        <img src="https://cdn.holistics.io/hooli/search-hooli.png" alt="Hooli search" class="border-2 rounded-md"/>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
const isOpen = ref(false)
</script>
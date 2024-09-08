<template>
  <div v-if="isRegionalManager" class="flex items-center space-x-4 mb-8">
    <h3 class="text-lg font-semibold whitespace-nowrap">Filter by Merchants</h3>
    <USelectMenu
      v-model="selectedMerchant"
      :options="filteredMerchants"
      option-attribute="name"
      value-attribute="id"
      placeholder="Select a merchant"
      class="flex min-w-[#150px]"
    >
      <template #trigger="{ open }">
        <UButton color="gray" :icon="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" block>
          {{ selectedMerchantName || 'Select a merchant' }}
        </UButton>
      </template>
    </USelectMenu>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const merchantsStore = useMerchantsStore()
const { availableMerchants, selectedMerchant } = storeToRefs(merchantsStore)

const isRegionalManager = computed(() => {
  return currentUser.value?.role === 'Regional Manager'
})

const selectedMerchantName = computed(() => merchantsStore.getSelectedMerchantName)

const filteredMerchants = computed(() => {
  if (isRegionalManager.value && currentUser.value?.merchantId) {
    return availableMerchants.value.filter(merchant =>
      currentUser.value.merchantId.includes(merchant.id)
    )
  }
  return []
})

watch(filteredMerchants, (newFilteredMerchants) => {
  if (newFilteredMerchants.length > 0 && !newFilteredMerchants.some(m => m.id === selectedMerchant.value)) {
    merchantsStore.setSelectedMerchant(newFilteredMerchants[0].id)
  } else if (newFilteredMerchants.length === 0) {
    merchantsStore.setSelectedMerchant(null)
  }
}, { immediate: true })
</script>
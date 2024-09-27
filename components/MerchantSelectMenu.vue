<template>
  <div v-if="isRegionalManager" class="flex flex-col space-x-4 mb-8 w-full border-b-2 border-gray-100">
    <USelectMenu
      v-model="selectedMerchantLocal"
      :options="merchantOptions"
      option-attribute="name"
      value-attribute="id"
      placeholder="Select a merchant"
      class="flex w-[350px] pb-5"
    >
      <template #default="{ open }">
        <UButton size="lg" color="gray" class="w-full justify-between rounded-xl" block>
          Merchant: {{ selectedMerchantName }}
          <UIcon
            name="i-heroicons-chevron-down-20-solid"
            class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
            :class="{ 'transform rotate-180': open }"
          />
        </UButton>
      </template>
    </USelectMenu>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
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

const selectedMerchantLocal = ref(selectedMerchant.value)

const filteredMerchants = computed(() => {
  if (isRegionalManager.value && currentUser.value?.merchantId) {
    return availableMerchants.value.filter(merchant =>
      currentUser.value.merchantId.includes(merchant.id)
    )
  }
  return []
})

const merchantOptions = computed(() => {
  if (isRegionalManager.value) {
    return [
      { id: 'all', name: 'All Merchants' },
      ...filteredMerchants.value
    ]
  }
  return filteredMerchants.value
})

const selectedMerchantName = computed(() => {
  if (selectedMerchantLocal.value === 'all') {
    return 'All Merchants'
  }
  const selected = filteredMerchants.value.find(m => m.id === selectedMerchantLocal.value)
  return selected ? selected.name : ''
})

watch(selectedMerchantLocal, (newValue) => {
  merchantsStore.setSelectedMerchant(newValue)
})

watch(filteredMerchants, (newFilteredMerchants) => {
  if (newFilteredMerchants.length > 0 && !newFilteredMerchants.some(m => m.id === selectedMerchantLocal.value)) {
    selectedMerchantLocal.value = 'all'
  } else if (newFilteredMerchants.length === 0) {
    selectedMerchantLocal.value = null
  }
}, { immediate: true })

watch(selectedMerchant, (newValue) => {
  selectedMerchantLocal.value = newValue
})
</script>
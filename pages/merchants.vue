<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Merchants</h1>
    <template v-if="isLoading">
      <p>Loading...</p>
    </template>
    <template v-else-if="isRegionalManager">
      <UCard
        v-for="merchant in filteredMerchants"
        :key="merchant.name"
        class="mb-4"
      >
        <div class="flex">
          <img :src="merchant.img" :alt="merchant.name" class="w-[150px] h-[150px] object-cover rounded" />
          <div class="pl-4 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold">{{ merchant.name }}</h2>
              <p class="text-gray-600">Merchant Manager: {{ merchant.managerName }}</p>
            </div>
            <div class="flex mt-2 gap-2">
              <UButton color="primary" @click="goToOverview(merchant.id)">Overview</UButton>
              <UButton color="gray">See all orders</UButton>
            </div>
          </div>
        </div>
      </UCard>
    </template>
    <div v-else class="text-red-500 text-center py-4">
      You do not have permission to view this page. Only Regional Managers can access this information.
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useUsersStore } from '~/stores/users'
import { useMerchantsStore } from '~/stores/merchants'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const usersStore = useUsersStore()
const merchantsStore = useMerchantsStore()

const { currentUser } = storeToRefs(authStore)
const { availableUsers } = storeToRefs(usersStore)
const { availableMerchants } = storeToRefs(merchantsStore)

const isLoading = ref(true)

const getManagerName = (managerId) => {
  const manager = availableUsers.value?.find(user => user.id === managerId)
  return manager ? manager.name : 'Unknown'
}

const isRegionalManager = computed(() => {
  return currentUser.value?.role === 'Regional Manager'
})

const filteredMerchants = computed(() => {
  if (!isRegionalManager.value || !Array.isArray(availableUsers.value)) return []
  
  const managedMerchantIds = currentUser.value.manages || []
  
  return availableMerchants.value.filter(merchant =>
    managedMerchantIds.includes(merchant.managerId)
  ).map(merchant => ({
    ...merchant,
    managerName: getManagerName(merchant.managerId)
  }))
})

watch(currentUser, (newUser) => {
  if (newUser) {
    isLoading.value = false
  } else {
    isLoading.value = true
  }
}, { immediate: true })

const goToOverview = (merchantId) => {
  // Set the selected merchant in the store
  merchantsStore.setSelectedMerchant(merchantId)
  
  // Navigate to the index page
  router.push({ path: '/' })
}
</script>
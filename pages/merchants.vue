<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Merchants</h1>
    <template v-if="isLoading">
      <p>Loading...</p>
    </template>
    <template v-else-if="hasPermission">
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
              <UButton color="primary">Overview</UButton>
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

const authStore = useAuthStore()
const usersStore = useUsersStore()

const { currentUser } = storeToRefs(authStore)
const { availableUsers } = storeToRefs(usersStore)

const isLoading = ref(true)

const hasPermission = computed(() => currentUser.value?.role === 'Regional Manager')

const merchants = [
  { id: 'M001', name: "Central Market Store", managerId: "MM001", img: "https://picsum.photos/seed/picsum/150" },
  { id: 'M002', name: "Riverfront Bazaar", managerId: "MM002", img: "https://picsum.photos/seed/picsum/150" },
  { id: 'M003', name: "Neighborhood Nook", managerId: "MM003", img: "https://picsum.photos/seed/picsum/150" },
]

const getManagerName = (managerId) => {
  const manager = availableUsers.value?.find(user => user.id === managerId)
  return manager ? manager.name : 'Unknown'
}

const filteredMerchants = computed(() => {
  if (!hasPermission.value || !Array.isArray(availableUsers.value)) return []
  
  const managedMerchantIds = currentUser.value.manages || []
  
  return merchants.filter(merchant => 
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
</script>
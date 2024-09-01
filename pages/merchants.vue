<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Merchants</h1>
    <UCard
      v-for="merchant in filteredMerchants"
      :key="merchant.name"
    >
      <div class="flex gap-3">
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '~/stores/users'

const usersStore = useUsersStore()
const { availableUsers } = storeToRefs(usersStore)

const merchants = [
  { name: "Central Market Store", manager: "Erlich Bachman", img: "https://picsum.photos/seed/picsum/150" },
  { name: "Riverfront Bazaar", manager: "Jian Yang", img: "https://picsum.photos/seed/picsum/150" },
  { name: "Neighborhood Nook", manager: "Gilfoyle", img: "https://picsum.photos/seed/picsum/150" },
]

const getManagerId = (managerName) => {
  const manager = availableUsers.value.find(user => user.name === managerName)
  return manager?.id ?? 'Unknown'
}

const filteredMerchants = computed(() => 
  merchants.filter(merchant => 
    availableUsers.value.some(user => 
      user.name === merchant.manager && user.role === 'Merchant Manager'
    )
  ).map(merchant => ({
    ...merchant,
    managerName: merchant.manager,
    id: getManagerId(merchant.manager)
  }))
)
</script>
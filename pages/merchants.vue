<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Merchants</h1>
    <template v-if="isLoading">
      <p>Loading...</p>
    </template>
    <template v-else-if="isRegionalManager">
      <p class="text-lg mb-6">This is a list of all merchants that you manage.</p>
      <blockquote class="border-l-8 border-orange-500 bg-orange-100 py-4 pl-6 mb-6">
        <p class="mb-0">👉 Manage your merchant accounts and track their performance by clicking on “Overview”.</p>
      </blockquote>
      <UCard
        v-for="merchant in filteredMerchants"
        :key="merchant.id"
        class="mb-4"
      >
        <div class="flex">
          <img :src="merchant.img" :alt="merchant.name" class="w-[150px] h-[150px] object-cover rounded" />
          <div class="pl-4 flex flex-col justify-between w-full">
            <div>
              <h2 class="text-xl font-bold">{{ merchant.name }}</h2>
              <p class="text-gray-600">
                Admin:
                <span>
                  {{ merchant.users.map(user => user.name).join(', ') }}
                </span>
              </p>
            </div>
            <div class="flex mt-2 gap-2">
              <UButton color="primary" @click="goToOverview(merchant.id)">Overview</UButton>
              <UTooltip text="This function is not available in our demo app" :popper="{ placement: 'right' }">
                <UButton disabled color="gray">See all orders</UButton>
              </UTooltip>
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

const isRegionalManager = computed(() => {
  return currentUser.value?.role === 'Regional Manager'
})

const filteredMerchants = computed(() => {
  if (!isRegionalManager.value || !Array.isArray(availableUsers.value)) return []
  
  const userMerchantIds = currentUser.value.merchantId || []
  
  return availableMerchants.value
    .filter(merchant => userMerchantIds.includes(merchant.id))
    .map(merchant => ({
      ...merchant,
      users: availableUsers.value.filter(user => user.merchantId.includes(merchant.id))
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
  merchantsStore.setSelectedMerchant(merchantId)
  router.push({ path: '/analytics/overview' })
}
</script>
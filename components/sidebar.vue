<!-- components/sidebar.vue -->
<template>
  <aside class="w-64 bg-gray-900 text-white flex flex-col">

    <!-- Logo area -->
    <div class="p-4">
      <img src="https://cdn.holistics.io/logos/hooli-logo.svg" alt="Holistics Logo" class="h-8" />
    </div>

    <!-- User selection area -->
    <div class="p-4 border-t border-gray-800 flex">
      <USelectMenu
        v-model="selectedUser"
        :options="userOptions"
        placeholder="Select User"
        class="w-full cursor-pointer"
        :ui="selectUI"
      >
        <template #label>
          <div class="flex items-center w-full">
            <UAvatar
              v-if="selectedUser"
              :src="selectedUser.avatar"
              :alt="selectedUser.name"
              size="xs"
              class="mr-2"
            />
            <div class="flex flex-col cursor-pointer">
              <span>{{ selectedUser ? selectedUser.name : 'Select User' }}</span>
            </div>
          </div>
        </template>
        <template #option="{ option }">
          <div class="flex items-center w-full cursor-pointer">
            <UAvatar
              :src="option.avatar"
              :alt="option.name"
              size="sm"
              class="mr-2"
            />
            <div class="flex flex-col w-full">
              <span>{{ option.name }}</span>
              <span class="text-sm text-gray-500">{{ option.role }}</span>
            </div>
          </div>
        </template>
      </USelectMenu>
    </div>

    <!-- Navigation -->
    <nav class="flex-1">
    <ul class="space-y-2 px-4">
      <li v-for="item in filteredMenuItems" :key="item.label">
        <NuxtLink
          v-if="!item.children && !item.disabled"
          :to="item.to"
          class="flex items-center p-2 rounded-lg transition-colors duration-150 hover:bg-gray-800"
          :class="{ 'bg-red-600 hover:!bg-red-700': isActive(item.to) }"
        >
          <UIcon :name="item.icon" class="w-5 h-5 mr-3" />
          <span class="text-sm">{{ item.label }}</span>
        </NuxtLink>

        <div
          v-else-if="!item.children && item.disabled"
          class="flex items-center p-2 w-full rounded-lg transition-colors duration-150 "
        >
          <UTooltip text="This function is not available in our demo app" :popper="{ placement: 'right-end' }">
            <UIcon :name="item.icon" class="w-5 h-5 mr-3 cursor-not-allowed opacity-70" />
            <span class="text-sm cursor-not-allowed opacity-70">{{ item.label }}</span>
          </UTooltip>
        </div>
        
        <!-- Submenu -->
        <div v-else>
          <span class="font-bold mt-2 p-2 text-sm">{{ item.label }}</span>
          <ul class="mt-2 space-y-1">
            <li v-for="child in item.children" :key="child.label">
              <NuxtLink
                :to="child.to"
                class="flex items-center p-2 text-sm rounded-lg transition-colors duration-150 hover:bg-gray-800"
                :class="{ 'bg-red-600 hover:!bg-red-700': isActive(child.to) }"
              >
                <UIcon :name="child.icon" class="w-5 h-5 mr-3" />
                <span class="text-sm">{{ child.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    </nav>

    <!-- Logout button -->
    <div class="p-4 border-t border-gray-800">
      <UButton 
        @click="logout" 
        color="red" 
        variant="ghost" 
        class="w-full text-white hover:bg-red-700 transition-colors duration-200"
      >
        <template #leading>
          <UIcon name="i-heroicons-arrow-right-on-rectangle" />
        </template>
        Logout
      </UButton>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUsersStore } from '~/stores/users'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const usersStore = useUsersStore()

const { currentUser } = storeToRefs(authStore)

const selectedUser = ref(currentUser.value || null)

const userOptions = computed(() => usersStore.availableUsers)

watch(selectedUser, (newUser) => {
  if (newUser && newUser.name !== currentUser.value?.name) {
    authStore.login(newUser)
  }
})

const isRegionalManager = computed(() => currentUser.value?.role === 'Regional Manager')

const filteredMenuItems = computed(() => 
  menuItems.filter(item => item.label !== 'Merchants' || isRegionalManager.value)
)

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const selectUI = {
  size: 'sm',
  color: 'white',
  variant: 'none',
  button: {
    base: 'cursor-pointer',
  },
  loadingIcon: 'i-heroicons-arrow-path-20-solid',
  trailingIcon: 'i-heroicons-chevron-down-20-solid',
}

const menuItems = [
  { label: 'Home', to: '/', icon: 'i-heroicons-home' },
  { label: 'Orders', to: '/#', icon: 'i-heroicons-shopping-cart', disabled: true },
  { label: 'Products', to: '/#', icon: 'i-heroicons-tag', disabled: true },
  { label: 'Merchants', to: '/merchants', icon: 'i-heroicons-building-storefront' },
  { 
    label: 'Analytics', 
    
    children: [
      { label: 'Overview', to: '/analytics/overview', icon: 'i-heroicons-presentation-chart-line' },
      { label: 'Reports', to: '/analytics/reports', icon: 'i-heroicons-newspaper' },
    ]
  },
]

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
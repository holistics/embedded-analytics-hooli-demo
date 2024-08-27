<!-- components/sidebar.vue -->
<template>
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col">
    <!-- Welcome and user selection area -->
    <div class="p-4 border-b border-gray-800">
      <div class="flex items-center mb-2">
        <span class="text-sm font-medium">Welcome,</span>
      </div>
      <USelectMenu
        v-model="selectedUser"
        :options="userOptions"
        placeholder="Select User"
        class="w-full"
        :ui="selectMenuUI"
      >
        <template #label>
          <div class="flex justify-between items-center">
            <span>{{ selectedUser || 'Select User' }}</span>
          </div>
        </template>
        <template #option="{ option, selected }">
          <div class="flex items-center justify-between">
            <span>{{ option.label }}</span>
          </div>
        </template>
      </USelectMenu>
    </div>

    <!-- Logo area -->
    <div class="p-4">
      <img src="https://cdn.holistics.io/logos/merchify-logo.svg" alt="Holistics Logo" class="h-8" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1">
      <ul class="space-y-2 px-4">
        <li v-for="item in menuItems" :key="item.label">
          <NuxtLink 
            :to="item.to" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-800"
            :class="{ 'bg-[#DC4C3D]': isActive(item.to) }"
          >
            <UIcon :name="item.icon" class="w-5 h-5 mr-3" />
            <span class="text-sm">{{ item.label }}</span>
          </NuxtLink>
          
          <!-- Submenu -->
          <ul v-if="item.children" class="ml-7 mt-2 space-y-1">
            <li v-for="child in item.children" :key="child.label">
              <NuxtLink 
                :to="child.to" 
                class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-150 hover:bg-gray-800"
                :class="{ 'bg-[#DC4C3D]': isActive(child.to) }"
              >
                {{ child.label }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Logout button -->
    <div class="p-4 border-t border-gray-800">
      <UButton @click="logout" color="red" variant="ghost" class="w-full">
        <UIcon name="i-heroicons-logout" class="mr-2" />
        Logout
      </UButton>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUsersStore } from '~/stores/users'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const usersStore = useUsersStore()

const { currentUser } = storeToRefs(authStore)

const selectedUser = ref(currentUser.value)

onMounted(() => {
  authStore.checkAuth()
  selectedUser.value = currentUser.value
})

const userOptions = computed(() => 
  usersStore.availableUsers.map(user => ({
    label: user,
    value: user
  }))
)

watch(selectedUser, (newUser) => {
  if (newUser && newUser !== currentUser.value) {
    authStore.login(newUser)
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const selectMenuUI = {
  wrapper: 'relative',
  button: {
    base: 'flex w-full justify-between items-center rounded-md bg-gray-800 px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-700',
    icon: {
      base: 'h-5 w-5 text-gray-400',
      active: 'text-white'
    }
  },
  container: 'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  list: 'overflow-y-auto p-1',
  option: {
    base: 'relative flex cursor-default select-none items-center rounded-md px-3 py-2 text-white',
    active: 'bg-gray-700 text-white',
    inactive: 'text-white',
    selected: 'font-semibold',
  },
  empty: 'text-sm text-gray-400 text-center py-2 px-4'
}
const menuItems = [
  { label: 'Home', to: '/', icon: 'i-heroicons-home' },
  { label: 'Orders', to: '/#', icon: 'i-heroicons-shopping-cart' },
  { label: 'Products', to: '/#', icon: 'i-heroicons-tag' },
  { 
    label: 'Analytics', 
    icon: 'i-heroicons-presentation-chart-line',
    children: [
      { label: 'Overview', to: '/analytics/overview' },
      { label: 'Reports', to: '/analytics/reports' },
    ]
  },
]

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
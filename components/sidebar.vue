<!-- components/sidebar.vue -->
<template>
  <aside class="w-64 bg-gray-900 text-white flex flex-col">

    <!-- Logo area -->
    <div class="p-4">
      <NuxtLink to="/">
        <img src="https://cdn.holistics.io/logos/hooli-logo.svg" alt="Holistics Logo" class="h-8" />
      </NuxtLink>
    </div>

    <div 
      class="p-4 relative" 
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
    >
      <div
        class="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-md cursor-pointer"
      >
        <div class="flex items-center">
          <UAvatar
            :src="selectedUser.avatar"
            :alt="selectedUser.name"
            size="sm"
            class="mr-3"
          />
          <div>
            <div class="font-semibold">{{ selectedUser.name }}</div>
            <div class="text-sm text-gray-400">{{ selectedUser.role }}</div>
          </div>
        </div>
        <UIcon
          name="i-heroicons-chevron-down-20-solid"
          class="h-5 w-5 transition-transform"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isOpen" class="absolute left-4 right-4 mt-2 bg-gray-800 rounded-md py-2 z-10 shadow-lg">
          <div class="px-3 py-2 text-sm font-bold uppercase text-gray-500 ">
            Switch Account
          </div>
          
          <div v-for="(managers, role) in { 'Regional Manager': regionalManagers, 'Merchant Manager': merchantManagers }" :key="role">
            <div v-if="managers.length > 0">
              <div class="p-3 text-md text-white mt-2 flex items-center border-t border-gray-700">
              {{ role }}
              <UTooltip
                :popper="{ placement: 'right' }"  
                :ui="{
                  base: 'h-full text-wrap',
                }"
              >
                <UIcon name="i-heroicons-information-circle" class="ml-1 h-5 w-5 cursor-pointer" />
                <template #text>
                  <div v-if="role === 'Regional Manager'">
                    <b>Regional Manager</b> manages multiple merchants and can filter data by merchant to view their performance.
                  </div>
                  <div v-else>
                    <b>Merchant Manager</b> manages one merchant and only has access to data and insights related to this merchant. 
                  </div>
                </template>
              </UTooltip>
            </div>
            <div
              v-for="user in managers"
              :key="user.id"
              @click="selectUser(user)"
              class="px-3 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
              :class="{ 'bg-gray-700': user.id === selectedUser.id }"
            >
              <UTooltip 
                :popper="{ placement: 'right' }"
                :ui="{
                  base: 'h-full text-wrap',
                }"
              >
                <div class="flex items-center">
                  <UAvatar
                    :src="user.avatar"
                    :alt="user.name"
                    size="sm"
                    class="mr-3"
                  />
                  <div class="font-semibold">{{ user.name }}</div>
                </div>
                <template #text>
                  <div v-html="getUserTooltip(user)"></div>
                </template>
              </UTooltip>
            </div>
          </div>
        </div>

          <div class="border-t border-gray-700 mt-2 pt-2 px-3">
            <UButton
              @click="logout"
              color="red"
              variant="ghost"
              class="w-full text-white hover:bg-red-700 transition-colors duration-200"
            >
              <template #leading>
                <UIcon name="i-heroicons-arrow-right-on-rectangle" />
              </template>
              Log out
            </UButton>
          </div>
        </div>
      </Transition>
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

  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUsersStore } from '~/stores/users'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'

const merchantsStore = useMerchantsStore()
const { availableMerchants } = storeToRefs(merchantsStore)

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const usersStore = useUsersStore()

const { currentUser } = storeToRefs(authStore)

const isOpen = ref(false)
const selectedUser = ref(usersStore.getUserById(authStore.currentUser?.id) || usersStore.getDefaultUser.id)

const userOptions = computed(() => usersStore.availableUsers)

function selectUser(user) {
  selectedUser.value = user
  authStore.login(user)
  usersStore.setCurrentUser(user)
  isOpen.value = false
  router.push('/')
}

function logout() {
  authStore.logout()
  router.push('/login')
  isOpen.value = false
}

watch(selectedUser, (newUser) => {
  if (newUser && newUser.name !== currentUser.value?.name) {
    authStore.login(newUser)
    usersStore.setCurrentUser(newUser)
  }
})

const isRegionalManager = computed(() => currentUser.value?.role === 'Regional Manager')

const regionalManagers = computed(() => 
  userOptions.value.filter(user => user.role === 'Regional Manager')
)

const merchantManagers = computed(() => 
  userOptions.value.filter(user => user.role === 'Merchant Manager')
)

function getUserTooltip(user) {
  const merchantNames = user.merchantId
    .map(id => availableMerchants.value.find(m => m.id === id)?.name)
    .filter(name => name)

  const merchantCount = merchantNames.length
  const boldUserName = `<strong>${user.name}</strong>`

  if (merchantCount === 0) {
    return `${boldUserName} does not manage any merchants.`
  } else if (merchantCount === 1) {
    return `${boldUserName} manages <strong>${merchantNames[0]}</strong>.`
  } else {
    const merchantList = merchantNames.map((name, index) => 
      `<li>${index + 1}. <strong>${name}</strong></li>`
    ).join('')
    
    return `
      ${boldUserName} manages ${merchantCount} merchants:
      <ul style="list-style-type: none; padding-left: 0; margin-top: 5px;">
        ${merchantList}
      </ul>
    `
  }
}

const filteredMenuItems = computed(() => 
  menuItems.filter(item => item.label !== 'Merchants' || isRegionalManager.value)
)

const menuItems = [
  { label: 'Home', to: '/', icon: 'i-heroicons-home' },
  { label: 'About', to: '/about', icon: 'i-heroicons-information-circle' },
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

const isActive = computed(() => (path) => {
  return route.path === path || route.path.startsWith(path + '/')
})
</script>
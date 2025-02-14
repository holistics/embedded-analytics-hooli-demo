<!-- pages/login.vue -->
<template>
  <div class="min-h-screen flex pt-12 justify-center bg-gray-900">
    <div class="w-full flex flex-col items-center  p-8">
      <!-- Logo -->
      <div class="text-center">
        <img src="https://cdn.holistics.io/logos/hooli-logo.svg" alt="Holistics Logo" class="h-12 mx-auto" />
        <p class="mt-4 text-white text-2xl">
          Welcome to Hooli - Embedded Demo Application built by Holistics
        </p>
      </div>

    <div class="max-w-[900px] my-6 py-4 px-6 text-white border border-gray-500 rounded flex justify-between gap-12">
      <p class="w-6/12 mb-4">Hooli is a fictional ecommerce application designed to showcase the capabilities of <span class="text-[#009f6f]"><b>Holistics Embedded Analytics</b></span>.
        <br><br>
        This demo app lets you experience how our solution can be integrated into your ecommerce platform.
      </p>
      <div class="w-7/12">
        <p>On this Hooli app, there are 5 users with 2 roles:</p>
        <ul class="ml-10 list-disc">
          <li><span class="text-primary"><b>Regional Managers (2)</b></span>: Oversee multiple merchants. They can see how all merchant performance and easily switch between merchants.</li>
          <li><span class="text-primary"><b>Merchant Managers (3)</b></span>: Manages one merchant and only have access to data and insights related to this merchant.</li>
        </ul>
      </div>
    </div>

    <p class="my-4 text-white text-xl">
      Please select a user to log in:
    </p>

    <div 
      class="relative w-[400px] pb-4" 
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
    >
      <div
        class="flex items-center justify-between bg-white px-3 py-2 rounded-md cursor-pointer"
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
          <div v-if="isOpen" class="absolute left-0 right-0 mt-2 bg-white rounded-md py-2 z-10 shadow-lg max-h-[calc(50vh-120px)] overflow-y-auto">
            <div class="px-3 py-2 text-sm font-bold uppercase text-gray-500">
              Switch Account
            </div>
            
            <div v-for="(managers, role) in { 'Regional Manager': regionalManagers, 'Merchant Manager': merchantManagers }" :key="role">
              <div v-if="managers.length > 0">
                <div class="p-3 text-md mt-2 flex items-center border-t border-gray-200">
                  <UTooltip
                    :popper="{ placement: 'right' }"
                    :ui="{
                      base: 'h-full text-wrap',
                    }"
                  >
                    {{ role }}
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
              </div>
              <div
                v-for="user in managers"
                :key="user.id"
                @click="selectUser(user)"
                class="px-3 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                :class="{ 'bg-gray-200': user.id === selectedUser.id }"
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
        </Transition>
      </div>

      <!-- Password Field -->
      <UInput
        v-model="password"
        type="password"
        placeholder="Password: 123456"
        class="w-[400px] py-2 mb-4"
        size="lg"
        :disabled="!selectedUser"
      />

      <!-- Login Button -->
      <UButton
        class="w-[400px] bg-red-600 hover:bg-[#c03931] flex items-center justify-center text-white transition-colors duration-200"
        size="lg"
        :disabled="!selectedUser"
        @click="login"
      >
        Login
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUsersStore } from '~/stores/users'
import { useMerchantsStore } from '~/stores/merchants'

definePageMeta({
  layout: 'login',
  middleware: 'auth'
})

const router = useRouter()
const authStore = useAuthStore()
const usersStore = useUsersStore()
const merchantsStore = useMerchantsStore()
const { availableMerchants } = storeToRefs(merchantsStore)

const selectedUser = ref(null)
const password = ref('')
const isOpen = ref(false)

const userOptions = computed(() => usersStore.availableUsers)

watch(userOptions, (newOptions) => {
  if (newOptions.length > 0 && !selectedUser.value) {
    selectUser(newOptions[0])
  }
}, { immediate: true })

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
    return `${boldUserName} manages 1 merchant: "<strong>${merchantNames[0]}</strong>".`
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

const login = async () => {
  if (selectedUser.value) {
    await authStore.login(selectedUser.value)
    await usersStore.setCurrentUser(selectedUser.value)
    router.push('/')
  }
}

function selectUser(user) {
  selectedUser.value = user
  password.value = '***********'
  isOpen.value = false
}
</script>
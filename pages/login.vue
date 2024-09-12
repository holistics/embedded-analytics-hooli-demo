<!-- pages/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-md p-8">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="https://cdn.holistics.io/logos/hooli-logo.svg" alt="Holistics Logo" class="h-12 mx-auto" />
        <p class="mt-4 text-white">
          Welcome to Holistics Embedded Playground
          <br>
          Please select a role:
        </p>
      </div>

      <div 
          class="relative mb-4" 
          @mouseenter="isOpen = true"
          @mouseleave="isOpen = false">
        <div
          class="flex items-center justify-between bg-white p-3 rounded-md cursor-pointer"
        >
          <div class="flex items-center">
            <UAvatar
              v-if="selectedUser"
              :src="selectedUser.avatar"
              :alt="selectedUser.name"
              size="sm"
              class="mr-3"
            />
            <div>
              <div class="font-semibold">{{ selectedUser ? selectedUser.mail : 'Select User' }}</div>
              <div v-if="selectedUser" class="text-sm text-gray-500">{{ selectedUser.role }}</div>
            </div>
          </div>
          <UIcon
            name="i-heroicons-chevron-down-20-solid"
            class="h-5 w-5 transition-transform text-gray-400"
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
          <div v-if="isOpen" class="absolute left-0 right-0 mt-2 bg-white rounded-md py-2 z-10 shadow-lg">
            <div class="px-3 py-2 text-xs font-semibold text-gray-500">
              Switch Account
            </div>
            <div
              v-for="user in userOptions"
              :key="user.mail"
              @click="selectUser(user)"
              class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              :class="{ 'bg-gray-100': user.mail === selectedUser?.mail }"
            >
              <div class="flex items-center">
                <UAvatar
                  :src="user.avatar"
                  :alt="user.name"
                  size="sm"
                  class="mr-3"
                />
                <div>
                  <div class="font-semibold">{{ user.mail }}</div>
                  <div class="text-sm text-gray-500">{{ user.role }}</div>
                </div>
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
        class="w-full py-2 mb-4"
        size="lg"
        :disabled="!selectedUser"
      />

      <!-- Login Button -->
      <UButton
        class="w-full bg-red-600 hover:bg-[#c03931] flex items-center justify-center text-white transition-colors duration-200"
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

definePageMeta({
  layout: 'login',
  middleware: 'auth'
})

const router = useRouter()
const authStore = useAuthStore()
const usersStore = useUsersStore()

const selectedUser = ref(null)
const password = ref('')
const isOpen = ref(false)

const userOptions = computed(() => usersStore.availableUsers)

watch(userOptions, (newOptions) => {
  if (newOptions.length > 0 && !selectedUser.value) {
    selectUser(newOptions[0])
  }
}, { immediate: true })

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
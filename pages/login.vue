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

      <!-- User Selection -->
      <USelectMenu
        v-model="selectedUser"
        :options="userOptions"
        placeholder="Select User"
        class="w-full mb-4"
        :ui="selectMenuUI"
        size="lg"
        @update:model-value="onUserSelect"
      >
        <template #label>
          <div class="flex items-center">
            <UAvatar
              v-if="selectedUser"
              :src="selectedUser.avatar"
              :alt="selectedUser.name"
              size="sm"
              class="mr-2"
            />
            <div>
              <span>{{ selectedUser ? selectedUser.mail : 'Select User' }}</span>
              <p v-if="selectedUser" class="text-sm text-gray-500">{{ selectedUser.role }}</p>
            </div>
          </div>
        </template>
        <template #option="{ option }">
          <div class="flex items-center">
            <UAvatar
              :src="option.avatar"
              :alt="option.name"
              size="sm"
              class="mr-2"
            />
            <div>
              <span>{{ option.name }}</span>
              <p class="text-sm text-gray-500">{{ option.role }}</p>
            </div>
          </div>
        </template>
      </USelectMenu>

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
import { ref, computed } from 'vue'
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

const selectedUser = ref(usersStore.availableUsers[0] ||null)
const password = ref('')

const userOptions = computed(() => 
  usersStore.availableUsers.map(user => ({
    name: user.name,
    role: user.role,
    mail: user.mail,
    avatar: user.avatar
  }))
)

const login = () => {
  if (selectedUser.value) {
    authStore.login(selectedUser.value)
    router.push('/')
  }
}

function onUserSelect(user) {
  selectedUser.value = user
  password.value = '***********'
}

const selectMenuUI = {
  wrapper: 'relative',
  button: {
    base: 'flex w-full justify-between items-center rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
    icon: {
      base: 'h-5 w-5 text-gray-400',
      active: 'text-gray-700'
    }
  },
  container: 'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  list: 'overflow-y-auto p-1',
  option: {
    base: 'relative flex cursor-default select-none items-center rounded-md px-3 py-2 text-gray-900',
    active: 'bg-gray-100 text-gray-900',
    inactive: 'text-gray-900',
    selected: 'font-semibold',
  },
  empty: 'text-sm text-gray-400 text-center py-2 px-4'
}
</script>
<!-- pages/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="https://cdn.holistics.io/logos/holistics-logo-color.png" alt="Holistics Logo" class="h-12 mx-auto" />
        <p class="mt-4 text-gray-600">
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
        class="w-full"
        :ui="selectMenuUI"
        @update:model-value="login"
      >
        <template #label>
          <div class="flex justify-between items-center">
            <span>{{ selectedUser || 'Select User' }}</span>
          </div>
        </template>
        <template #option="{ option, selected }">
          <div class="flex items-center justify-between">
            <span>{{ option.label }}</span>
            <UIcon v-if="selected" name="i-heroicons-check-20-solid" class="w-5 h-5" />
          </div>
        </template>
      </USelectMenu>
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

const selectedUser = ref(null)

const userOptions = computed(() => 
  usersStore.availableUsers.map(user => ({
    label: user,
    value: user
  }))
)

const login = () => {
  if (selectedUser.value) {
    authStore.login(selectedUser.value)
    router.push('/')
  }
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
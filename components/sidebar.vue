<!-- components/sidebar.vue -->
<template>
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col">
    <!-- Logo area -->
    <div class="p-4 mb-6">
      <img src="https://cdn.holistics.io/logos/holistics-logo-white.png" alt="Logo" class="h-8" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1">
      <ul class="space-y-2 px-2">
        <li v-for="item in menuItems" :key="item.label">
          <NuxtLink 
            :to="item.to" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-800"
            :class="{ 'bg-[#DC4C3D]': isActive(item.to) }"
          >
            <UIcon :name="item.icon" class="w-5 h-5 mr-3" />
            <span>{{ item.label }}</span>
          </NuxtLink>
          
          <!-- Submenu -->
          <ul v-if="item.children" class="ml-6 mt-2 space-y-1">
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

    <!-- User profile section -->
    <div class="p-4 border-t border-gray-800">
      <div class="flex items-center">
        <img src="https://placekitten.com/40/40" alt="User" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <p class="font-medium">John Doe</p>
          <p class="text-sm text-gray-400">john@example.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { label: 'Home', to: '/', icon: 'i-heroicons-home' },
  { label: 'Orders', to: '/orders', icon: 'i-heroicons-shopping-cart' },
  { label: 'Products', to: '/products', icon: 'i-heroicons-cube' },
  { 
    label: 'Analytics', 
    icon: 'i-heroicons-chart-bar',
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
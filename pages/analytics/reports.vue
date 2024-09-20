<template>
  <div class="p-4">
    <MerchantSelectMenu />
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Reports</h1>
    <p class="text-lg text-gray-500 mb-6">Explore in-depth dashboards for products, sales, and marketing. Interact with the dashboard  by using provided filters, or cross-filter by clicking on any data point.</p>
    <UHorizontalNavigation :links="navigationItems" class="text-5xl border-b" />
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MerchantSelectMenu from '~/components/MerchantSelectMenu.vue'

const router = useRouter()
const route = useRoute()

if (route.path === '/analytics/reports') {
  // Navigate to the product report by default
  router.push('/analytics/reports/product')
}

const navigationItems = [
  {
    label: 'Product',
    icon: 'i-heroicons-currency-dollar',
    to: '/analytics/reports/product',
  },
  {
    label: 'Marketing',
    icon: 'i-heroicons-megaphone',
    to: '/analytics/reports/marketing',
  },
  {
    label: 'Sales',
    icon: 'i-heroicons-building-storefront',
    to: '/analytics/reports/sales',
  }
]
</script>
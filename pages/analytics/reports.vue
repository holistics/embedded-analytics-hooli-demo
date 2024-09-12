<template>
  <div class="p-4">
    <MerchantSelectMenu />
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
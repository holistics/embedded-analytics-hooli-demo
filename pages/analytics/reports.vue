<template>
  <div class="p-4">
    <MerchantSelectMenu />
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Reports</h1>
    <p class="text-lg text-gray-500 mb-4">Explore in-depth dashboards for products, sales, and marketing.</p>
    <blockquote class="border-l-8 border-orange-500 bg-orange-100 py-4 pl-6 mb-6">
      <p class="mb-0">👉 Interact with the dashboard in several ways:</p>
      <ul class="ml-10 list-disc">
        <li>Using provided filters to filter out data.</li>
        <li>Cross-filter by clicking on any data point.</li>
        <li>Date-drill or Drill-through by right-click on any data points.</li>
        <li>
          Explore available Actions by hovering over table columns with the blue flash icon
          <svg class="inline-block" width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25023 5.04032H5.64402L6.97525 0.951361C7.10025 0.47253 6.74088 0 6.25026 0H1.75031C1.37531 0 1.05657 0.280368 1.00657 0.655242L0.00658048 8.21573C-0.0527938 8.66935 0.297202 9.07258 0.750322 9.07258H4.45965L3.01905 15.1997C2.90655 15.6786 3.26904 16.129 3.74716 16.129C4.00966 16.129 4.25966 15.9904 4.39716 15.751L9.89709 6.1744C10.1877 5.67351 9.82834 5.04032 9.25023 5.04032Z" fill="#1B7CE4"/>
</svg>
        </li>
      </ul>
    </blockquote>
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
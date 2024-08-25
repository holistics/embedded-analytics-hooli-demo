<!-- components/KpiPanel.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard
      v-for="kpi in kpis"
      :key="kpi.title"
      :ui="{ background: 'bg-white', ring: 'ring-1 ring-gray-200' }"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">{{ kpi.title }}</p>
          <p class="text-2xl font-semibold text-gray-900">{{ kpi.value }}</p>
        </div>
        <UIcon
          :name="kpi.icon"
          class="text-2xl"
          :class="kpi.iconClass"
        />
      </div>
      <p class="mt-2 text-sm text-gray-600">
        <span :class="kpi.changeClass">{{ kpi.change }}</span>
        vs last month
      </p>
    </UCard>
  </div>
</template>

<script setup>
const kpis = [
  {
    title: 'Unpaid Orders',
    value: '32',
    icon: 'i-heroicons-currency-dollar',
    iconClass: 'text-yellow-500',
    change: '+2.5%',
    changeClass: 'text-green-600',
  },
  {
    title: 'To Ship',
    value: '45',
    icon: 'i-heroicons-truck',
    iconClass: 'text-blue-500',
    change: '-5%',
    changeClass: 'text-red-600',
  },
  {
    title: 'Shipped',
    value: '156',
    icon: 'i-heroicons-check-circle',
    iconClass: 'text-green-500',
    change: '+10%',
    changeClass: 'text-green-600',
  },
  {
    title: 'Canceled',
    value: '3',
    icon: 'i-heroicons-x-circle',
    iconClass: 'text-red-500',
    change: '-25%',
    changeClass: 'text-green-600',
  },
]
</script>
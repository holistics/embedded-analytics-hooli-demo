<!-- components/KpiPanel.vue -->
<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
    <UCard
      v-for="kpi in kpis"
      :key="kpi.title"
      :ui="{ background: 'bg-[#FEF3EE]', ring: 'ring-1 ring-gray-200' }"
    >
      <div class="flex gap-3">
        <UIcon
          :name="kpi.icon"
          class="text-5xl text-[#DC4C3D]"
          :class="kpi.iconClass"
        />
        <div>
          <p class="text-2xl font-medium text-[#0F172A]">{{ kpi.title }}</p>
          <p class="text-5xl font-semibold text-[#0F172A]">{{ kpi.value }}</p>
          <p class="mt-2 text-sm text-gray-600">
            <span :class="kpi.changeClass">{{ kpi.change }}</span>
            vs last month
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const kpis = [
  {
    title: 'Total Sales',
    value: '$5.8K',
    icon: 'i-heroicons-currency-dollar',
    iconClass: 'text-[#DC4C3D]',
    change: '+12.38%',
    changeClass: 'text-green-600',
  },
  {
    title: 'Total Orders',
    value: '1451',
    icon: 'i-heroicons-truck',
    iconClass: 'text-[#DC4C3D]',
    change: '-5%',
    changeClass: 'text-red-600',
  },
  {
    title: 'Average Order Value',
    value: '$356.2',
    icon: 'i-heroicons-check-circle',
    iconClass: 'text-[#DC4C3D]',
    change: '+10%',
    changeClass: 'text-green-600',
  },
]
</script>
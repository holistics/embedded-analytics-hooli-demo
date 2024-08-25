<!-- pages/orders.vue -->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Orders</h1>
    
    <UCard>
      <!-- Search input -->
      <div class="mb-4">
        <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search orders..." />
      </div>

      <!-- Table -->
      <UTable 
        v-model="selected"
        :columns="columns" 
        :rows="filteredOrders" 
        :sort="sort"
        @update:sort="updateSort"
      >
        <!-- Custom column renderers -->
        <template #id-data="{ row }">
          <span :class="[isSelected(row) && 'text-primary-500 dark:text-primary-400']" class="font-mono">{{ row.id }}</span>
        </template>
        
        <template #date-data="{ row }">
          <span :class="[isSelected(row) && 'text-primary-500 dark:text-primary-400']">
            {{ new Date(row.date).toLocaleDateString() }}
          </span>
        </template>
        
        <template #customer-data="{ row }">
          <span :class="[isSelected(row) && 'text-primary-500 dark:text-primary-400']">{{ row.customer }}</span>
        </template>
        
        <template #total-data="{ row }">
          <span :class="[isSelected(row) && 'text-primary-500 dark:text-primary-400']" class="font-semibold">{{ row.total }}</span>
        </template>
        
        <template #status-data="{ row }">
          <UBadge :color="getStatusColor(row.status)">{{ row.status }}</UBadge>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="getActionItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>

      <!-- Selected rows info -->
      <div v-if="selected.length" class="mt-4">
        <p>{{ selected.length }} order(s) selected</p>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex justify-end">
        <UPagination v-model="page" :total="filteredOrders.length" :per-page="perPage" />
      </div>
    </UCard>

    <!-- Iframe (if still needed) -->
    <div v-if="iframeUrl" class="mt-8 w-full h-[calc(100vh-500px)]">
      <iframe :src="iframeUrl" class="w-full h-full border-0" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const page = ref(1)
const perPage = ref(10)
const sort = ref({ column: 'date', direction: 'desc' })
const selected = ref([])

const columns = [
  { key: 'id', label: 'Order ID', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Actions' }
]

// Mock data
const orders = ref([
  { id: '1001', date: '2023-08-01', customer: 'John Doe', total: '$150.00', status: 'delivered' },
  { id: '1002', date: '2023-08-02', customer: 'Jane Smith', total: '$75.50', status: 'processing' },
  { id: '1003', date: '2023-08-03', customer: 'Bob Johnson', total: '$200.00', status: 'pending' },
  { id: '1004', date: '2023-08-04', customer: 'Alice Brown', total: '$50.00', status: 'shipped' },
  { id: '1005', date: '2023-08-05', customer: 'Charlie Davis', total: '$300.00', status: 'cancelled' },
  // Add more mock orders as needed
])

const filteredOrders = computed(() => {
  let result = orders.value.filter(order => 
    Object.values(order).some(value => 
      value.toString().toLowerCase().includes(search.value.toLowerCase())
    )
  )

  // Apply sorting
  if (sort.value) {
    const { column, direction } = sort.value
    result.sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

const getStatusColor = (status) => {
  const colors = {
    pending: 'yellow',
    processing: 'blue',
    shipped: 'green',
    delivered: 'green',
    cancelled: 'red',
  }
  return colors[status] || 'gray'
}

const updateSort = (newSort) => {
  sort.value = newSort
}

const isSelected = (row) => {
  return selected.value.some(item => item.id === row.id)
}

const getActionItems = (row) => [
  [{
    label: 'View Details',
    icon: 'i-heroicons-eye-20-solid',
    click: () => console.log('View Details', row.id)
  }, {
    label: 'Edit Order',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit Order', row.id)
  }], [{
    label: 'Cancel Order',
    icon: 'i-heroicons-x-circle-20-solid',
    click: () => console.log('Cancel Order', row.id)
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log('Delete Order', row.id)
  }]
]

</script>
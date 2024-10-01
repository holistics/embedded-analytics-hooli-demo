<template>
  <div class="p-4 relative">
    <img src="https://cdn.holistics.io/hooli/hooli-blob.svg" class="absolute top-[-80px] right-[-20px] -z-10" />
    <MerchantSelectMenu />

    <h2 class="text-xl font-semibold mb-2">{{ welcomeMessage }}</h2>
    <p class="text-lg text-gray-500 mb-6">{{ roleMessage }}</p>
    
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Latest News</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-[32px]">
      <UCard v-for="item in news" :key="item.id" class="flex flex-col"
          :ui="{
            header: {
              padding: 'p-0 sm:px-0',
            },
            body: {
              padding: 'p-3 sm:p-4',
            },
          }">
        <template #header>
          <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover rounded-t-lg" />
        </template>
        <div class="flex-grow">
          <p class="text-md mb-2">{{ item.title }}</p>
          <p class="text-sm text-gray-600 truncate">{{ item.description }}</p>
        </div>
      </UCard>
    </div>

    
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Business Insights</h1>
    <p class="text-lg text-gray-500 mb-4">Get a quick overview of your business performance.</p>
    <blockquote class="border-l-8 border-orange-500 bg-orange-100 py-4 pl-6 mb-6">
      <p class="mb-0">👉 Interact with the dashboard in several ways:</p>
      <ul class="ml-10 list-disc">
        <li>Cross-filter by clicking on any data point.</li>
        <li>Date-drill or Drill-through by right-click on any data points.</li>
      </ul>
    </blockquote>

    <DashboardOriginal />

    <IframeLoader :iframe-url="iframeUrl"/>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch, useRouter } from '#app'
import MerchantSelectMenu from '~/components/MerchantSelectMenu.vue'
import DashboardOriginal from '~/components/DashboardOriginal.vue'
import IframeLoader from '~/components/IframeLoader.vue'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const merchantsStore = useMerchantsStore()
const { availableMerchants, selectedMerchant } = storeToRefs(merchantsStore)
const iframeUrl = ref('')
const router = useRouter()

const news = ref([
  { 
    id: 1, 
    title: 'Nucleus Project Reaches New Milestone',
    description: 'Hooli\'s Nucleus project has achieved a groundbreaking compression rate, surpassing Pied Piper\'s middle-out algorithm.',
    image: 'https://cdn.holistics.io/hooli/nucleus.png',
  },
  { 
    id: 2, 
    title: 'Gavin Belson Announces "Box 3"',
    description: 'CEO Gavin Belson unveils Hooli\'s latest hardware innovation, the Box 3, promising unparalleled data storage capabilities.',
    image: 'https://cdn.holistics.io/hooli/box-3.png',
  },
  { 
    id: 3, 
    title: 'Hooli-Con 2024 Dates Announced',
    description: 'Mark your calendars! Hooli-Con 2024 is set to be our biggest tech conference yet, featuring keynotes from industry leaders.',
    image: 'https://cdn.holistics.io/hooli/hooli-con.png',
  },
  {
    id: 4,
    title: 'Hooli XYZ Division Explores AI Ethics',
    description: 'Our moonshot division, Hooli XYZ, is pioneering new frameworks for ethical AI development and implementation.',
    image: 'https://cdn.holistics.io/hooli/ai-ethics.png',
  }
])

const welcomeMessage = computed(() => {
  if (!currentUser.value) return 'Welcome to Hooli!'
  
  let greeting = 'Hello'
  return `👋 ${greeting}, ${currentUser.value.name}!`
})

const roleMessage = computed(() => {
  if (!currentUser.value) return 'We make the world a better place.'

  let roleSpecificMessage = ''
  if (currentUser.value.role === 'Regional Manager') {
    const managedMerchants = currentUser.value.merchantId.length
    roleSpecificMessage = `You're a Regional Manager, responsible for ${managedMerchants} merchants. Use the filter above to drill down and view each merchant’s performance individually.`
  } else if (currentUser.value.role === 'Merchant Manager') {
    const merchantName = availableMerchants.value?.find(m => m.id === currentUser.value.merchantId[0])?.name || 'Unknown Merchant'
    roleSpecificMessage = `You're a Merchant Manager, your merchant is ${merchantName}. You can only see data and insights related to this merchant.`
  }

  return roleSpecificMessage
})

const merchantIdToSend = computed(() => {
  if (currentUser.value?.role !== 'Regional Manager') {
    return currentUser.value?.merchantId
  }
  return merchantsStore.getSelectedMerchantIds(currentUser.value)
})

const shouldFetchData = computed(() => {
  return !!currentUser.value && !!selectedMerchant.value
})

const { data, error, execute } = useFetch(
  '/api/business',
  {
    method: 'POST',
    body: computed(() => ({ merchantId: merchantIdToSend.value })),
  },
  {
    server: false,
    immediate: false,
    lazy: true,
  }
)

watchEffect(() => {
  if (shouldFetchData.value) {
    execute()
  }
})

watch(data, (newData) => {
  if (newData && newData.embed_code && newData.token) {
    iframeUrl.value = `https://secure.holistics.io/embed/${newData.embed_code}?_token=${newData.token}`
  } else {
    iframeUrl.value = ''
  }
})

watch(error, (newError) => {
  if (newError) {
    console.error('Error fetching business data:', newError)
    // Handle the error (e.g., show a notification to the user)
  }
})

// Watch for auth state changes
watch(currentUser, (newUser) => {
  if (!newUser) {
    router.push('/login')
  }
}, { immediate: true })

// Initialize auth
authStore.initializeAuth()
</script>
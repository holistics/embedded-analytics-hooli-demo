<template>
  <div class="p-4">
    <h2 class="text-3xl mb-2">{{ welcomeMessage }}</h2>
    <p class="mb-6">Welcome to your dashboard. Here at Hooli, We Make The World A Better Place.</p>
    
    <h2 class="text-2xl font-semibold mb-4">Latest News</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[60px]">
      <UCard v-for="item in news" :key="item.id" class="flex flex-col">
        <template #header>
          <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover rounded-t-lg" />
        </template>
        <div class="flex-grow">
          <div class="flex flex-wrap gap-2 mb-2">
            <UBadge v-for="tag in item.tags" :key="tag" color="gray" class="mr-1 mb-1">
              {{ tag }}
            </UBadge>
          </div>
          <p class="text-lg mb-2">{{ item.title }}</p>
          <p class="text-sm text-gray-600">{{ item.description }}</p>
        </div>
      </UCard>
    </div>

    
    <h1 class="text-2xl font-bold mb-4">Business Insights</h1>
    <MerchantSelectMenu />
    
    <div v-if="iframeUrl" class="w-full h-[calc(100vh-150px)]">
      <iframe :src="iframeUrl" class="w-full h-full border rounded" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else class="text-center py-8 h-[calc(100vh-150px)]">
      <p>Loading iframe...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useMerchantsStore } from '~/stores/merchants'
import { storeToRefs } from 'pinia'
import { useFetch, useRouter } from '#app'
import MerchantSelectMenu from '~/components/MerchantSelectMenu.vue'

const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const merchantsStore = useMerchantsStore()
const { selectedMerchant } = storeToRefs(merchantsStore)
const iframeUrl = ref('')
const router = useRouter()

const news = ref([
  { 
    id: 1, 
    title: 'Nucleus Project Reaches New Milestone',
    description: 'Hooli\'s Nucleus project has achieved a groundbreaking compression rate, surpassing Pied Piper\'s middle-out algorithm.',
    image: 'https://thebrendans.wordpress.com/wp-content/uploads/2014/06/screen-shot-2014-06-02-at-10-30-57-am.png',
    tags: ['Nucleus', 'Innovation']
  },
  { 
    id: 2, 
    title: 'Gavin Belson Announces "Box 3"',
    description: 'CEO Gavin Belson unveils Hooli\'s latest hardware innovation, the Box 3, promising unparalleled data storage capabilities.',
    image: 'https://i.ytimg.com/vi/6KbRA2RjhgQ/maxresdefault.jpg',
    tags: ['Hardware', 'Box 3']
  },
  { 
    id: 3, 
    title: 'Hooli-Con 2024 Dates Announced',
    description: 'Mark your calendars! Hooli-Con 2024 is set to be our biggest tech conference yet, featuring keynotes from industry leaders.',
    image: 'https://pyxis.nymag.com/v1/imgs/91b/89f/115b81947eb676cd55a9bf1f3b2016eee8-16-silicon-valley.2x.rsocial.w600.jpg',
    tags: ['Hooli-Con', 'Events']
  }
])

const welcomeMessage = computed(() => {
  if (!currentUser.value) return 'Welcome to Hooli!'
  
  const timeOfDay = new Date().getHours()
  let greeting = 'Hello'
  if (timeOfDay < 12) greeting = 'Good morning'
  else if (timeOfDay < 18) greeting = 'Good afternoon'
  else greeting = 'Good evening'

  return `${greeting}, ${currentUser.value.name}!`
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
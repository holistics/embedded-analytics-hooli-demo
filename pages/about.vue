<template>
  <div class="p-4 flex gap-6">
    <div class="w-[700px]">
      <h2 class="text-2xl font-semibold mb-4">Hooli’s <span class="text-primary">Embedded Analytics</span> Solution</h2>
      <p class="mb-4">Hooli leverages <b>Holistics Embedded Analytics</b> solution to build and embed dashboards directly into their Hooli Web App, enabling their partners/customers to view and interact with these dashboards seamlessly within Hooli application, without compromising data access and security.</p>
      <p class="mb-12">On this Hooli app, there are 5 users with 2 roles: Merchant Manager and Regional Manager. Each role will have different data access permissions. For instance, Regional Managers can view the overall performance of their respective Merchants and can filter between Merchants to see more details. As for Merchant Managers, they can only view data related to the specific Merchant they manage.</p>

      <h2 class="text-2xl font-semibold mb-4">About <span class="text-primary">Hooli</span></h2>
      <blockquote class="border-l-4 border-primary-500 pl-6 mb-12">
        <p class="mb-2"><b>“What is Hooli?</b> Excellent question. Hooli isn't just another high-tech company. Hooli isn't just about software. Hooli, Hooli is about people. Hooli is about innovative technology that, makes a difference. Transforming the world as we know it. Making the world, a better place, through minimal message oriented transport layers. I firmly believe we can only achieve greatness, if first, we achieve goodness.”</p>
        <footer>
          <cite class="italic text-gray-500">- Gavin Belson, "Minimum Viable Product"</cite>
        </footer>
        <a href="https://silicon-valley.fandom.com/wiki/Hooli" class="italic text-gray-500 hover:underline">https://silicon-valley.fandom.com/wiki/Hooli</a>
      </blockquote>
      <div class="rounded-lg overflow-hidden">
        <iframe
          width="700"
          height="412"
          src="https://www.youtube.com/embed/VpcHvHQHxqE?si=gtftHIOnYkutXrIv"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div>
      <UCard class="mt-14">
        <h2 class="text-2xl font-semibold mb-2">Resources</h2>
        <ul class="mt-2 space-y-1">
          <li
            v-for="(child, index) in resourceLinks"
            :key="child.label"
            :class="[
              'py-3',
              { 'border-b border-gray-200': index !== resourceLinks.length - 1 }
            ]"
          >
            <div class="flex items-center gap-3">
              <span class="text-sm">{{ child.label }}</span>
              <NuxtLink :to="child.to">
                <UButton
                  icon="i-heroicons-arrow-top-right-on-square"
                  size="xs"
                  color="gray"
                  square
                  variant="solid"
                />
              </NuxtLink>
            </div>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const resourceLinks = [
  { label: 'Access the Embedded Dashboards', to: '#' },
  { label: 'Access the Git Repo', to: '#' },
  { label: 'Contact us to evaluate Embedded Analytics', to: '#' },
]
</script>
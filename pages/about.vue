<template>
  <div class="p-4">
    <div class="flex w-fit gap-16 p-6 border rounded-lg shadow-sm">
      <div class="w-[650px]">
        <h2 class="text-2xl font-semibold mb-4"><span class="text-[#009f6f]">Holistics</span> Embedded Analytics Solution</h2>
        <p class="mb-4">Hooli leverages <b>Holistics Embedded Analytics</b> solution to build and embed dashboards directly into their Hooli Web App, enabling their partners/customers to view and interact with these dashboards seamlessly within Hooli application, without compromising data access and security.</p>
        <p>On this Hooli app, there are 5 users with 2 roles:</p>
        <ul class="ml-10 list-disc">
          <li><b>Regional Managers (2)</b>: Oversee multiple merchants. They can see how all merchant performance and easily switch between merchants.</li>
          <li><b>Merchant Managers (3)</b>: Manages one merchant and only have access to data and insights related to this merchant.</li>
        </ul>
      </div>
      <div class="p-6 bg-gray-100 border-0 rounded-lg">
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
               <div class="inline-flex items-center justify-center w-6 h-6 bg-black rounded-full p-1">
                <UIcon
                  :name="child.icon"
                  class="w-full h-full text-white"
                />
              </div>
              <span class="text-sm">{{ child.label }}</span>
              <NuxtLink :to="child.to" target="_blank">
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
      </div>
    </div>
    <div class="w-[650px] mt-12">
      <h2 class="text-2xl font-semibold mb-4">About <span class="text-primary">Hooli</span></h2>
      <p class="text-lg mb-6">If you haven't watched the show, Hooli is a fictional company in the hilarious tech satire series <b>Silicon Valley</b>. Here's how Gavin Belson, the eccentric CEO of Hooli, describes his company:</p>
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
  </div>
</template>

<script setup>
const resourceLinks = [
  { label: 'Access the Embedded Dashboards', to: 'https://playground.holistics.io/play', icon: 'i-heroicons-presentation-chart-bar' },
  { label: 'Access the Git Repo of this Demo App', to: 'https://github.com/holistics/embedded-analytics-demo-hooli', icon: 'i-heroicons-code-bracket' },
  { label: 'Contact us to evaluate Embedded Analytics', to: 'https://www.holistics.io/request-trial/  ', icon: 'i-heroicons-globe-alt' },
]
</script>
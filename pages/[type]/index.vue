<script setup lang="ts">
import AdjustmentsVerticalIcon from '@heroicons/vue/24/outline/AdjustmentsVerticalIcon'

import PublicDrawer from '~~/components/Public/Drawer/Drawer.vue';

import { QUERY_LIST } from '~~/constants/lists';


import type { MediaType } from '~~/types';


definePageMeta({
    key: route => route.fullPath,
    validate: ({ params }) => {
        return ['movie', 'tv'].includes(params.type as MediaType)
    },
})

const route = useRoute()
const refDrawer = ref<InstanceType<typeof PublicDrawer> | null>(null)

const typeMedia = computed(() => route.params.type as MediaType || 'movie')

const queries = computed(() => QUERY_LIST[typeMedia.value])

const trendMedia = await getTrending(typeMedia.value)

const openDrawer = () => {
    console.log('@@')
    refDrawer.value?.openClose()
}
useHead({
    title: typeMedia.value === 'movie' ? 'Movies' : 'TV Shows',
})

</script>


<template>
    <NuxtLayout name="page">
        <PublicDrawer ref="refDrawer"></PublicDrawer>
        <div class="px-4 md:max-w-[1076px] xs:max-w-[614px] flex gap-2 h-full mx-auto my-0 relative">
            <div class="page_body w-full py-14">
                <div>
                    <div class="container_inner">
                        <HomeBanner :type="typeMedia" :item="trendMedia.results[0]" />
                        <HomeContentItem v-for="query in queries" :key="query.query" :query="query"
                            :type-media="typeMedia" />
                    </div>
                </div>
            </div>
        </div>
        <PublicBaseButton :onClick="openDrawer" class="xs:hidden fixed z-[100] left-0 bottom-0 mt-4 mr-4 mb-2 ml-4" icon>
            <AdjustmentsVerticalIcon class="w-5 h-5" />
        </PublicBaseButton>
    </NuxtLayout>
</template>
<script setup lang="ts">

import type { Media, FilterQuery, MediaType } from '~~/types';


definePageMeta({
    key: route => route.fullPath,
})



const route = useRoute()

const type = computed(() => route.params.type as MediaType)
const query = computed(() => route.query as FilterQuery)

const items: Media[] = reactive([])

useHead({
    title: type.value === 'movie' ? `Movies/filter` : `TV Shows/filter`,
})



const fetch = async (page: number) => {
    const mediaList = await getMediaByFilters(type.value, query.value, page)
    items.push(...mediaList.results)
}

</script>

<template>
    <NuxtLayout name="page">
        <div class="px-4 md:max-w-[1076px] xs:max-w-[614px] flex gap-2 h-full mx-auto my-0 relative">
            <div class="page_body w-full py-14">
                
                    <PublicGridAutoGrid :fetch="fetch" :type="type" :items="items" />
                
            </div>
        </div>
    </NuxtLayout>
</template>
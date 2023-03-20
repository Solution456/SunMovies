<script setup lang="ts">
import type { Media, MediaQueryType, MediaType } from '~~/types';


definePageMeta({
    
    key: route => route.fullPath,
})



const route = useRoute()

const type = computed(() => route.params.type as MediaType)
const no = computed(() => route.params.no as string)

const items: Media[] = reactive([])

useHead({
    title: type.value === 'movie' ? `Movie-category` : `TV Shows-category`,
})


const fetch = async (page: number) => {
    const mediaList = await getMediaByGenres(type.value, no.value.replace(' ', ','), page)
    items.push(...mediaList.results)
}


</script>

<template>
    <NuxtLayout name="page">
        <div class="px-4 md:max-w-[1076px] xs:max-w-[614px] flex gap-2 h-full mx-auto my-0 relative">
            <div class="page_body w-full py-14">
                <ClientOnly>
                    <PublicGridAutoGrid :fetch="fetch" :type="type" :items="items" />
                </ClientOnly>
            </div>
        </div>
    </NuxtLayout>
</template>
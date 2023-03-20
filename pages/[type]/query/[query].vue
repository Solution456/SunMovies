<script setup lang="ts">
import type { Media, MediaQueryType, MediaType } from '~~/types';


definePageMeta({
    key: route => route.fullPath,
})



const route = useRoute()

const type = computed(() => route.params.type as MediaType)
const query = computed(() => route.params.query as MediaQueryType)

const items: Media[] = reactive([])

useHead({
    title: type.value === 'movie' ? `Movies/${query.value}` : `TV Shows/${query.value}`,
})


const fetch = async (page: number) => {
    const mediaList = await getListMedia(type.value, query.value, page)
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
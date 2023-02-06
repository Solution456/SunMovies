<script setup lang="ts">
import { QUERY_LIST } from '~~/constants/lists';


import type { MediaType } from '~~/types';


definePageMeta({
    layout: 'page',
    key: route => route.fullPath,
    validate: ({ params }) => {
        return ['movie', 'tv'].includes(params.type as MediaType)
    },
})

const route = useRoute()

const typeMedia = computed(() => route.params.type as MediaType || 'movie')

const queries = computed(() => QUERY_LIST[typeMedia.value])

const trendMedia = await getTrending(typeMedia.value)

useHead({
    title: typeMedia.value === 'movie' ? 'Movies' : 'TV Shows',
})

</script>


<template>

    <div class="page_body w-full py-14">
        <div class="container pt-10">
            <div class="container_inner">
                <ClientOnly>
                    <template #fallback>
                        <PublicLoadersSkeletonImage />
                    </template>
                    <HomeBanner :item="trendMedia.results[0]" />
                </ClientOnly>

                <HomeContentItem v-for="query in queries" :key="query.query" :query="query" :type-media="typeMedia"/>
            </div>
        </div>

    </div>

</template>
<script lang="ts" setup>
import type { MediaType } from '~~/types';
import { QUERY_LIST } from '~~/constants/lists';

definePageMeta({
    layout: 'page'
})

const route = useRoute()
const typeMedia = computed( () => route.params.type as MediaType || 'movie')


const queries = computed(() => {
    if (typeMedia.value === 'movie') {
        return QUERY_LIST.movie
    }
    return QUERY_LIST.tv
})

const trending = await getTrending(typeMedia.value)



</script>



<template>
    <HomeSideBar />
        
    <div class="page_body w-full  py-14 sm:pl-[330px]">
        <div class="wrap">
            <div class="home pt-10">
                <div class="home_inner">
                        <ClientOnly>
                            <template #fallback>
                                <PublicLoadersSkeletonImage/>
                            </template>
                            <HomeBanner :item="trending.results[0]"/>
                        </ClientOnly>
                    <HomeContentItem v-for="query in queries" :key="query.query" :query="query" :type-media="typeMedia"/>
                </div>
            </div>
        </div>
    </div>
</template>
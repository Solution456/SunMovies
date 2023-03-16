<script lang="ts" setup>
import type { MediaType } from '~~/types';
import { QUERY_LIST } from '~~/constants/lists';

definePageMeta({
    layout: 'page'
})

const route = useRoute()
const typeMedia = computed(() => route.params.type as MediaType || 'movie')


const queries = computed(() =>
    [
        QUERY_LIST.movie[0],
        QUERY_LIST.tv[0]
    ]
)

const trending = await getTrending(typeMedia.value)



</script>



<template>
    <div class="px-4 max-w-[1076px] flex gap-2 h-full mx-auto my-0 relative">
        <HomeSideBar />

        <div class="page_body w-full  py-14 sm:pl-[330px]">
            <div class="wrap">
                <div class="home pt-10">
                    <div class="home_inner">
                        <HomeBanner :type="typeMedia" :item="trending.results[0]" />
                        <HomeFavouriteGenresItem typeMedia="movie" genres="28"/>
                        <HomeContentItem v-for="query in queries" :key="query.query" :query="query"
                            :type-media="query.type" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
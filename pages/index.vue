<script lang="ts" setup>
import PublicModal from '~~/components/Public/Modal/Modal.vue';

import { QUERY_LIST } from '~~/constants/lists';

import type { Genre, MediaType } from '~~/types';



const route = useRoute()
const typeMedia = computed(() => route.params.type as MediaType || 'movie')


const queries = computed(() =>
    [
        QUERY_LIST.movie[0],
        QUERY_LIST.tv[0]
    ]
)

const trending = await getTrending(typeMedia.value)
const genres = await getGenreList(typeMedia.value)

const FavouriteGenresList = ref<string[]>([])
const modal = ref<InstanceType<typeof PublicModal> | null>(null)


const handleEmit = (value: string[]) => {
    FavouriteGenresList.value = value
}



const openModal = () => {
    console.log('@@')
    modal.value?.openClose()
}

</script>



<template>
    <NuxtLayout name="page">
        <div class="px-4 md:max-w-[1076px] xs:max-w-[614px] flex gap-2 h-full mx-auto my-0 relative">
            <HomeSideBar @update="handleEmit" :SelectedFavouriteGenres="FavouriteGenresList" :genres="genres" />
            <div class="page_body w-full  py-14 sm:pl-[330px]">
                <div class="wrap">
                    <div class="home pt-10">
                        <div class="home_inner">
                            <button @click="openModal">MODAL</button>
                            <HomeBanner :type="typeMedia" :item="trending.results[0]" />
                            <HomeFavouriteGenresItem v-if="FavouriteGenresList.length > 0" typeMedia="movie"
                                :genres="FavouriteGenresList" />
                            <HomeContentItem v-for="query in queries" :key="query.query" :query="query"
                                :type-media="query.type" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PublicModal :fullscreen="false" ref="modal">
            <template #header>
                Header Modalki
            </template>
            <template #body>
                <div class="p-6">
                    BODY
                </div>
            </template>
        </PublicModal>
    </NuxtLayout>
</template>
<script setup lang="ts">
import PlayIcon from '@heroicons/vue/24/solid/PlayIcon';

import PublicModal from '~~/components/Public/Modal/Modal.vue';

import type { Media, MediaType, TorrentFile, TorrentInfo } from '~~/types';


const props = defineProps<{
    id: string,
    item: Media
    recommendations: Media[]
    type: MediaType
}>()

const torrents = ref<TorrentInfo[]>([])
const showTorrentList = ref(false)
const modal = ref<InstanceType<typeof PublicModal> | null>(null)


const creditsList = computed(() => {
    return props.item.credits?.cast.slice(0, 4)
})


const clickHandle = async (item: Media) => {
    const data = await getTorrentList(`${item.original_title || item.name} ${(item.release_date || item.first_air_date)?.split('-')[0]} AAC`)
    torrents.value = data
    modal.value?.openClose()
    showTorrentList.value = !showTorrentList.value

}


</script>


<template>
    <div class="movie-mobile relative">
        <div class="movie-mobile__cover fixed top-0 left-0 h-[150vw] w-full">
            <div :style="`background-image:url(${apiURL.imageW500(props.item.poster_path)})`"
                class="movie_bg bg-cover bg-center z-0 top-0 h-full  md:h-[610px] w-full">
            </div>
        </div>
        <div class="movie_bg__fade absolute w-full h-[300vw] z-0"></div>

        <div class="movie__titles px-4 pb-3 pt-[calc(100vw-100px)] relative">
            <div class="movie_title text-lg font-semibold font-oswald">{{ props.item.title || props.item.name }}</div>
            <div class="movie__other mt-2 text-sm text-gray-300 font-light">
                <span class="text-yellow-300">{{ props.item.release_date || props.item.first_air_date }}</span> / {{
                    props.item.status }}
            </div>
        </div>

        <div class="movie__content relative min-h-screen rounded-t-2xl bg-bgColor ">
            <div class="movie__content__wrapper px-4 py-2 ">
                <div class="my-2">
                    <PublicBaseButton @click="clickHandle(props.item)">
                            <template #start-icon>
                                <PlayIcon class="w-5 h-5" />
                            </template>
                            Play
                        </PublicBaseButton>
                </div>
                <div class="movie__information">
                    <PublicRaitingStars :raiting="props.item.vote_average" />
                    <div class="description text-sm mt-2">
                        <p>
                            {{ item.overview }}
                        </p>
                    </div>
                    <div class="genres mt-4">
                        <div class="title font-semibold uppercase text-sm text-gray-300">genres:</div>
                        <div class="genres-group flex gap-2 mt-3">
                            <PublicChip v-for="genre in props.item.genres">{{ genre.name }}</PublicChip>
                        </div>
                    </div>
                    <div class="credits flex flex-col gap-2 mt-10">
                        <MoviePageCreditsCard v-for="credit in creditsList" :key="credit.id" :charecters="credit.character"
                            :id="credit.id" :name="credit.name" :photo="credit.profile_path" />
                    </div>
                    <MoviePageRecommendationsMovies :items="props.recommendations" :type="props.type" />
                    <PublicModal fullscreen ref="modal">
                        <template #header>
                            Torrents
                        </template>
                        <template #body>
                            <div class="p-4">
                                <MoviePageTorrent :typeMedia="props.type" v-if="torrents.length > 0 || showTorrentList" :torrents="torrents" />
                            </div>
                        </template>
                    </PublicModal>
                </div>
            </div>
        </div>

    </div>
</template>


<style scoped>
.movie_bg__fade {
    background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 0%, rgb(0, 0, 0) 50%);
}
</style>
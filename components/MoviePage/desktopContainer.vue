<script setup lang="ts">
import StarIcon from '@heroicons/vue/24/solid/StarIcon'


import type { Media, MediaType, TorrentFile, TorrentInfo } from '~~/types';


const props = defineProps<{
    id:string,
    item:Media
    recommendations:Media[]
    type:MediaType
}>()

const torrents = ref<TorrentInfo[]>([])
const video = ref<TorrentFile>()
const showTorrentList = ref(false)



const creditsList = computed(() => {
    return props.item.credits?.cast.slice(0, 4)
})


const clickHandle = async (item:Media) => {
   console.log(item.release_date?.split('-')[0] || item.first_air_date)
   const data = await getTorrentList(`${item.original_title || item.name} ${(item.release_date || item.first_air_date)?.split('-')[0]} AAC`)
   torrents.value = data
   showTorrentList.value = !showTorrentList.value

}



</script>


<template>
    <div class="movie relative max-w-full flex flex-col md:w-full md:block  h-full ">
        <div :style="`background-image:url(${apiURL.originalImage(props.item.backdrop_path)})`"
            class="movie_bg bg-cover bg-center absolute z-0 top-0 h-[600px] w-full"></div>
        <div class="movie_bg__fade absolute w-full h-[610px] z-0"></div>

        <div class="movie__content md:max-w-[1076px] mx-auto w-full pt-24 relative">
            <div class="movie__content--left ">
                <div class="wrapper-grid justify-center">
                    <div class="div">
                        <PublicImageContainer width="300" min-height="400"
                            :url="apiURL.imageW500(props.item.poster_path)" />
                    </div>
                    <div class="div">
                        <MoviePageButtonPlay @click="clickHandle(props.item)" />
                    </div>
                </div>

            </div>
            <div class="movie__content--right  mt-4 md:mt-0">
                <div class="movie__content__body">
                    <div class="movie__content__info ml-6">
                        <div class="movie__content__info--left">
                            <div class="movie__other text-sm text-gray-300 font-light">
                                <span class="text-yellow-300">{{ props.item.release_date || props.item.first_air_date }}</span> / {{ props.item.status }}
                            </div>
                            <h2 class=" text-5xl font-medium font-oswald">
                                {{ props.item.title || props.item.name}}
                            </h2>
                            <div class="genres-group flex gap-2 mt-3">
                                <PublicChip v-for="genre in props.item.genres">{{ genre.name }}</PublicChip>
                            </div>
                            <div class="description text-sm font-light mt-4">{{ props.item.overview }}</div>
                            <div class="credits flex flex-col xs:flex-row gap-2 mt-10">
                                <MoviePageCreditsCard v-for="credit in creditsList" :key="credit.id"
                                    :charecters="credit.character" :id="credit.id" :name="credit.name"
                                    :photo="credit.profile_path" />
                            </div>
                            <MoviePageRecommendationsMovies :items="recommendations" :type="props.type"/>
                            <MoviePageTorrent v-if="torrents.length > 0 || showTorrentList" :torrents="torrents"/>
                        </div>
                        <div class="right">
                            <div class="raiting flex items-center gap-2">
                                <span class="text-2xl font-semibold">{{ item.vote_average }}</span>
                                <StarIcon class="w-5 h-6 text-yellow-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<style scoped>
.movie_bg__fade {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.95), #202020);
}

.movie__content {
    display: grid;
    gap: 1rem;
    grid-template-columns: 100%
}

.wrapper-grid {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto;
}


.movie__content__body {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0px, 1fr);
    min-width: 0px
}

.movie__content__info {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 120px;
}

@media (min-width: 1022px) {
    .movie__content {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: 300px minmax(0px, 1fr);
    }

}
</style>
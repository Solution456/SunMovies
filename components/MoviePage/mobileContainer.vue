<script setup lang="ts">
import StarIcon from '@heroicons/vue/24/solid/StarIcon'
import type { MediaType } from '~~/types';

const route = useRoute()

const id = computed(() => route.params.id as string)
const typeMedia = computed(() => route.params.type as MediaType || 'movie')

const item = await getMedia(typeMedia.value, id.value) 
</script>


<template>
    <div class="movie-mobile relative">
            <div class="movie-mobile__cover fixed top-0 left-0 h-[150vw] w-full">
                <div :style="`background-image:url(${apiURL.imagePoster(item.poster_path)})`" class="movie_bg bg-cover bg-center z-0 top-0 h-full  md:h-[600px] w-full">
            </div>
            </div>
            <div class="movie_bg__fade absolute w-full h-[300vw] z-0"></div>

            <div class="movie__titles px-4 pb-3 pt-[calc(100vw-100px)] relative">
                <div class="movie_title text-lg font-semibold font-oswald">{{ item.title }}</div>
                <div class="movie__other mt-2 text-sm text-gray-300 font-light">
                    <span class="text-yellow-300">{{ item.release_date }}</span> / {{ item.status }}
                </div>
            </div>

            <div class="movie__content relative min-h-screen rounded-t-2xl bg-bgColor ">
                <div class="movie__content__wrapper px-4 py-2 ">
                    <div class="movie__information">
                        <div class="raiting flex items-center gap-2">
                                <span class="text-xl font-semibold">{{ item.vote_average }}</span>
                                <StarIcon class="w-5 h-6 text-yellow-300"/>
                        </div>
                        <div class="description text-sm mt-2">
                            <p>
                                {{ item.overview }}
                            </p>
                        </div>
                        <div class="genres mt-4">
                            <div class="title font-light text-yellow-300">genres:</div>
                            <div class="genres-group flex gap-2 mt-3">
                                <PublicChip v-for="genre in item.genres">{{ genre.name }}</PublicChip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </div>
</template>


<style scoped>
.movie_bg__fade{
    background:linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 40%, rgb(0, 0, 0) 50%);
}  
</style>
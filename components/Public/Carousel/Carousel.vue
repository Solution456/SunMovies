<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import type { QueryItem, Genre } from '~~/types';

import apiURL from '~~/composables/apiURL';


const props = defineProps<{
    query: QueryItem
}>()

const isMobile = useDisplay()





const onSwiper = () => {
        console.log('swiper');
};
const onSlideChange = () => {
        console.log('slide change');
};




//Data Fetching
const list = await getListMedia(props.query.type, props.query.query, 1)

const genresList = await getGenreList('movie')

const genresName = (genres:number[]):Genre[] => {
    const tmpArray:Genre[] = []
    for (const item of genres) {
        let genreItem = genresList.findIndex( (genre) => genre.id === item)
        tmpArray.push(genresList[genreItem])
    }
    return tmpArray
}

</script>


<template>
    
    <swiper
    :slides-per-view='isMobile ? 1.5 : 2.5'
    :space-between="20"
    @swiper="onSwiper()"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in list.results" :key="item.id">
        <PublicMovieCard :id="item.id" :url="apiURL.imagePoster(item.poster_path)" :title="item.title" :raiting="item.vote_average" :genres="genresName(item.genre_ids)" />
    </swiper-slide>
  </swiper>
</template>


<style scoped>
.swiper-slide{
    width: 300px;
}
</style>
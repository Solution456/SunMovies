<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import {FreeMode} from 'swiper'

import 'swiper/css';
import 'swiper/css/free-mode';


import apiURL from '~~/composables/apiURL';


import type { Genre, MediaType, Media } from '~~/types';



const props = defineProps<{
    items: Media[]
    type:MediaType
}>()

const isMobile = useDisplay()





const onSwiper = () => {
        console.log('swiper');
};
const onSlideChange = () => {
        console.log('slide change');
};





//Data Fetching
// const list = await getListMedia(props.query.type, props.query.query, 1)

const genresList = await getGenreList(props.type)

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
    :free-mode="true"
    :modules="[FreeMode]"
    @swiper="onSwiper()"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item of items" :key="item.id">
        <PublicCarouselCard :id="item.id" :url="apiURL.imageW300(item.poster_path)" :title="item.title || item.name" :raiting="item.vote_average" :type="props.type" :genres="genresName(item.genre_ids)"/>
    </swiper-slide>
  </swiper>
</template>


<style scoped>
.swiper-slide{
    width: 300px;
}
</style>
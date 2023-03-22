<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Mousewheel } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';


import apiURL from '~~/composables/apiURL';


import type { Genre, MediaType, Media } from '~~/types';



const props = defineProps<{
    items: Media[]
    type: MediaType
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

const genresName = (genres: number[]): Genre[] => {
    const tmpArray: Genre[] = []
    for (const item of genres) {
        let genreItem = genresList.findIndex((genre) => genre.id === item)
        tmpArray.push(genresList[genreItem])
    }
    return tmpArray
}

</script>


<template>
    <div class="Carousel-wrapper w-full flex">
        <swiper slides-per-view="auto" :space-between="10" :free-mode="true" :auto-height="true" :mousewheel="true"
            :modules="[FreeMode, Mousewheel]" @swiper="onSwiper()" @slideChange="onSlideChange">
            <swiper-slide class="flex-[1_1_0%]" v-for="item of items" :key="item.id">
                <PublicCarouselCard :id="item.id" :url="apiURL.imageW500(item.poster_path)" :title="item.title || item.name"
                    :raiting="item.vote_average" :type="props.type" :genres="genresName(item.genre_ids)" />
            </swiper-slide>
        </swiper>
    </div>
</template>


<style scoped>

</style>
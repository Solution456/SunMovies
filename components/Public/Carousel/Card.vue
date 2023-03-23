<script setup lang="ts">


import type { Genre } from '~~/types';


interface MovieCardProps {
    type: 'tv' | 'movie'
    id: string | number,
    url: string,
    raiting?: string | number | null,
    title?: string,
    genres?: Genre[]
}

const props = defineProps<MovieCardProps>()

const route = computed(() => {
    return `/${props.type}/${props.id}`
})




</script>

<template>
    <div class="w-[200px]">
        <NuxtLink :to="route"
            class="CarouselCard group relative block box-border w-full cursor-pointer bg-transparent rounded-md">
            <div class="CarouselCard_container overflow-hidden relative flex flex-auto max-w-full">
                <div class="pb-[150%]"></div>
                <div class="CarouselCard_background-container absolute top-0 left-0 bg-bgColor bg-no-repeat bg-[50%] bg-cover max-w-full w-full h-full rounded-md"
                    :style="`background-image:url(${props.url})`">
                </div>

            </div>
            <div
                class="CarouselCard_content opacity-0 will-change-[opacity] transition group-hover:opacity-100  group-hover:bg-black/10 h-full w-full flex absolute inset-0 items-end">

                <div class="wrap h-1/3 relative rounded-md w-full flex items-center">
                    <div class="information h-full flex items-center p-3 flex-1 ">
                        <div class="wrap">
                            <h4 class="information__name text-sm font-oswald">
                                {{ props.title }}
                            </h4>
                            <div class="information__gengre text-[0.65rem] font-normal h-full flex flex-wrap ">
                                <span v-for="genre in props.genres" :key="genre.id" class="gengre__name">{{ genre.name }}
                                    &nbsp;</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="raiting" class="stars p-2  mr-2 flex h-full items-center justify-center flex-shrink">
                        <PublicRaitingStars :raiting="raiting" />
                    </div>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>
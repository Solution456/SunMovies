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

const router = useRouter()




</script>

<template>
    <div @click="() => router.push(`${props.type}/${props.id}`)"
        class="CarouselCard relative block box-border w-full cursor-pointer bg-transparent rounded-md">
        <div class="CarouselCard_container overflow-hidden relative">
            <div class="CarouselCard_background-container relative pt-[120%] bg-bgColor bg-no-repeat bg-[50%] bg-cover max-w-full w-full h-auto rounded-md" :style="`background-image:url(${props.url})`">
            </div>
            <div class="CarouselCard_content h-full w-full flex absolute inset-0 items-end">

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
        </div>
    </div>
</template>
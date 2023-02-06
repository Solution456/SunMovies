<script setup lang="ts">

import PlayIcon from '@heroicons/vue/24/solid/PlayIcon'
import {NAV_ROUTES} from '@/constants/routes' 

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




</script>

<template>
  <div class="movie_card relative w-full box-border inline-block whitespace-normal cursor-pointer">
    <div class="movie_card__wrap  overflow-hidden relative">
      <div class="movie_card__img relative pb-[100%]">
        <NuxtImg :src="props.url" class="
        rounded-md object-cover max-w-full align-middle bg-bgColor h-full w-full absolute top-0 left-0" />
      </div>
      <div class="
          movie_card__content
          h-full
          flex
          w-full
          absolute
          top-0
          right-0
          left-0
          bottom-0
          box-border
          items-end
          
        ">
        <div class="wrap h-1/3 
            relative
            backdrop-blur-sm bg-white/30
            rounded-md
           w-full flex items-center">
          <NuxtLink :to="`/${props.type}/${props.id}`"
            class="playButton p-4 flex-none h-full flex items-center justify-center border-r border-gray-300 border-opacity-40">
            <PlayIcon
              class="h-6 w-6 bg-white rounded-full text-yellow-300 p-1 hover:bg-black transition cursor-pointer" />
          </NuxtLink>

          <div
            class="information h-full flex justify-center items-center p-1 flex-1 border-r border-gray-300 border-opacity-40">
            <div class="wrap">
              <h4 class="information__name text-xs">
                {{ props.title}}
              </h4>
              <div class="information__gengre text-[0.65rem] font-light h-full flex flex-wrap ">
                <span v-for="genre in props.genres" :key="genre.id" class="gengre__name">{{ genre.name }} &nbsp;</span>
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
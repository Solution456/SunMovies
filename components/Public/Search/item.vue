<script setup lang="ts">

import StarIcon from '@heroicons/vue/24/solid/StarIcon'
import { NAV_ROUTES } from '@/constants/routes'

import type { Media } from '~~/types';



interface SearchItemProps{
    item:Media
}

defineProps<SearchItemProps>()


const router = useRouter()


</script>


<template>
    <div  class="search_item hover:bg-gray-300 hover:bg-opacity-10 transition p-2 rounded-md cursor-pointer" @click="router.push(`/${item.media_type}/${item.id}`)">
        <div class="search_item__container  grid grid-cols-search-item relative gap-2">
            <div
                class="search_item__poster w-32 relative pb-[150%] bg-bgColor rounded-md border-2 border-transparent hover:border-yellow-300 transition duration-200 cursor-pointer">
                <NuxtImg
                    v-if="item.poster_path"
                    class="rounded-md object-cover max-w-full align-middle bg-bgColor h-full w-full absolute top-0 left-0"
                    :src="apiURL.imageW300(item.poster_path)" />
            </div>
            <div class="search_item__info w-full">
                <div class="search_item__body">
                    <div class="search_item__date text-sm text-yellow-300 font-light">
                        {{ item.release_date || item.runtime }}
                    </div>
                    <h4>{{ item.title || item.name }}</h4>
                    <div class="raiting flex items-center gap-2">
                        <span class="text-2xl font-semibold">{{ item.vote_average }}</span>
                        <StarIcon class="w-5 h-6 text-yellow-300" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
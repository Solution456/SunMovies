<script setup lang="ts">
import type { Media, MediaType } from '~~/types';

interface MediaCardProps {
    item: Media
    type: MediaType
}

defineProps<MediaCardProps>()

const router = useRouter()




</script>

<template>
    <div @click="router.push(`/${item.media_type || type}/${item.id}`)"
        class="MediaCard w-full relative p-2 rounded-md hover:bg-gray-300 hover:bg-opacity-10 hover:scale-105 duration-300 will-change-transform transition ">

        <div class="MediaCard__poster relative pb-[150%] bg-bgColor rounded-md cursor-pointer">
            <NuxtImg v-if="item.poster_path" :src="apiURL.imageW500(item.poster_path)" :alt="item.title || item.name"
                class="rounded-md object-cover max-w-full align-middle bg-bgColor h-full w-full absolute top-0 left-0 " />
            <div class="rating absolute bottom-2 right-2">
                <PublicRaitingStars :raiting="item.vote_average"/>
            </div>
        </div>

        <div class="MediaCard__title text-center text-sm mt-3  font-semibold">
            <NuxtLink :to="`/${item.media_type || type}/${item.id}`" class="hover:text-white transition">
                {{ item.title || item.name }}
            </NuxtLink>
        </div>
    </div>
</template>
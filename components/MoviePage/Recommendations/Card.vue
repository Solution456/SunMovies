<script setup lang="ts">
import type { Media, MediaType } from '~~/types';

interface RecommendationsCardProps {
    item: Media
    type: MediaType
}

defineProps<RecommendationsCardProps>()

const router = useRouter()




</script>


<template>
    <div class="RecommendationsCard xs:w-32 relative ">
        
        <div @click="router.push(`/${item.media_type || type}/${item.id}`)"
            class="RecommendationsCard__poster relative pb-[150%] bg-bgColor rounded-md border-2 border-transparent hover:border-yellow-300 transition duration-200 cursor-pointer">
            <NuxtImg v-if="item.poster_path" :src="apiURL.imageW300(item.poster_path)" :alt="item.title || item.name"
                class="rounded-md object-cover max-w-full align-middle bg-bgColor h-full w-full absolute top-0 left-0 " />
        </div>

        <div class="RecommendationsCard__title text-center text-sm mt-3 text-yellow-300 font-semibold">
            <NuxtLink :to="`/${item.media_type || type}/${item.id}`" class="hover:text-white transition">
                {{ item.title || item.name}}
            </NuxtLink>
        </div>
        <!-- </NuxtLink> -->
    </div>
</template>
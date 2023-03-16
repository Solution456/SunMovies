<script setup lang="ts">
import type { MediaType} from '~~/types';


interface ContentItemProps {
    genres: string
    typeMedia: MediaType
}


const props = defineProps<ContentItemProps>()

const router = useRouter()

const toLink = computed(() => {
    return `tv`
})

const list = await getMediaByGenres(props.typeMedia,props.genres)
</script>


<template>
    <div class="home_item mt-6">
        <div class="flex justify-between items-center">
            <div class="home_item__title font-light flex items-center gap-4">
                <h4 class="home_item__text">{{ props.typeMedia }} by favourite Genres</h4>
                <span class="opacity-20">|</span>
                <div class="home_item__movCount">
                    <span class=" text-yellow-300 font-medium">{{ list.results.length }}</span> {{ props.typeMedia }}
                </div>
            </div>

            <div class="home_item__action h-full flex">
                <HomeActionButton :to="toLink">More</HomeActionButton>
            </div>
        </div>


        <div class="home_item__content mt-4 flex sm:w-full">
            <PublicCarousel :type="props.typeMedia" :items="list.results" />
        </div>
    </div>
</template>
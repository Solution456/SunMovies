<script setup lang="ts">
import type { MediaType, QueryItem } from '~~/types';


interface ContentItemProps {
    query: QueryItem
    typeMedia: MediaType
}


const props = defineProps<ContentItemProps>()

const router = useRouter()

const toLink = computed(() => {
    return `${props.typeMedia}/query/${props.query.query}`
})

const list = await getListMedia(props.typeMedia, props.query.query, 1)
</script>


<template>
    <div class="home_item mt-6">
        <div class="flex justify-between items-center">
            <div class="home_item__title font-light flex items-center gap-4">
                <h4 class="home_item__text uppercase font-semibold">{{ props.query.title }}</h4>
                <span class="opacity-20">|</span>
                <div class="home_item__movCount">
                    <span class=" text-yellow-300 font-medium">{{ list.results.length }}</span> {{ typeMedia }}
                </div>
            </div>

            <div class="home_item__action h-full flex">
                <HomeActionButton :to="toLink">More</HomeActionButton>
            </div>
        </div>


        <div class="home_item__content overflow-hidden mt-4 h-[300px] flex sm:w-full">
            <PublicCarousel :items="list.results" :type="props.typeMedia"/>
        </div>
    </div>
</template>
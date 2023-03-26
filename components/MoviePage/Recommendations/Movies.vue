<script setup lang="ts">
import type { Media, MediaType } from '~~/types';


const props = defineProps<{
    items: Media[]
    type:MediaType
}>()

const recommendationsList = computed(() => {
    return props.items.slice(0,5)
})

</script>



<template>
    <div class="recommendations mt-5 w-full">
        <div class="reccommendations__title text-lg mb-4">
            Recommendations
        </div>
        <div class="recommendations__items grid grid-cols-2 gap-2 xs:flex xs:flex-wrap overflow-hidden">
            <div v-for="recommendation in recommendationsList" :key="recommendation.id" class="item xs:w-28 xs:max-w-[50%] flex-grow-0 flex-shrink-0 basis-auto">
                <MoviePageRecommendationsCard  :item="recommendation" :type="props.type"/>
            </div>
            
        </div>
    </div>
</template>
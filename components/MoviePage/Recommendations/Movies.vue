<script setup lang="ts">
import type { Media } from '~~/types';


const props = defineProps<{
    items: Media[]
}>()

const recommendationsList = computed(() => {
    return props.items.slice(0,5)
})

</script>



<template>
    <div class="recommendations mt-5">
        <div class="reccommendations__title text-lg mb-4">
            Recommendations
        </div>
        <div class="recommendations__items flex gap-3 ">
            <div v-for="recommendation in recommendationsList" :key="recommendation.id" class="item">
                <MoviePageRecommendationsCard  :id="recommendation.id" :PosterUrl="recommendation.poster_path" :title="recommendation.title"/>
            </div>
            
        </div>
    </div>
</template>
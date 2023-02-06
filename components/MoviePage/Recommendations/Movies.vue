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
    <div class="recommendations mt-5">
        <div class="reccommendations__title text-lg mb-4">
            Recommendations
        </div>
        <div class="recommendations__items flex gap-3 ">
            <div v-for="recommendation in recommendationsList" :key="recommendation.id" class="item">
                <MoviePageRecommendationsCard  :item="recommendation" :type="props.type"/>
            </div>
            
        </div>
    </div>
</template>
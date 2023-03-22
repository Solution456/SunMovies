<script setup lang="ts">
import mobileContainer from '~~/components/MoviePage/mobileContainer.vue';
import desktopContainer from '~~/components/MoviePage/desktopContainer.vue';
import type { MediaType} from '~~/types';

const route = useRoute()



const Components = {
    mobileContainer,
    desktopContainer
}

const id = computed(() => route.params.id as string)
const typeMedia = computed(() => route.params.type as MediaType || 'movie')


const [item, recommendations] = await Promise.all([
    getMedia(typeMedia.value, id.value),
    getRecommendations(typeMedia.value, id.value),
])






useHead({
    title: item.name || item.title,
    meta: [
        { name: 'description', content: item.overview },
    ]
})





const isMobile = useDisplay()

</script>


<template>
    <NuxtLayout name="page">
        <div class="page_body overflow-hidden w-full h-full">
            <component :type="typeMedia" :id="id" :item="item" :recommendations="recommendations.results" :is="isMobile ? Components.mobileContainer : Components.desktopContainer"></component>
        </div>
    </NuxtLayout>
</template>

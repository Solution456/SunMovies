<script setup lang="ts">
import mobileContainer from '~~/components/MoviePage/mobileContainer.vue';
import desktopContainer from '~~/components/MoviePage/desktopContainer.vue';



const Components = [
    mobileContainer,
    desktopContainer
]

const isMobile = useDisplay()

</script>


<template>
    <NuxtLayout name="page">
        <div class="page_body overflow-hidden w-full pt-14 h-full">
            <component :is="isMobile ? Components[0] : Components[1]"></component>
        </div>
    </NuxtLayout>
</template>

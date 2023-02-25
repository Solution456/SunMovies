<script setup lang="ts">
import type { MediaQueryType, MediaType } from '~~/types';


definePageMeta({
    layout: 'page',
    key: route => route.fullPath,
})

const route = useRoute()


const type = computed(() => route.params.type as MediaType)
const query = computed(() => route.params.query as MediaQueryType)

useHead({
    title: type.value === 'movie' ? `Movies/${query.value}` : `TV Shows/${query.value}`,
})
</script>

<template>
    <div class="px-4 max-w-[1076px] flex gap-2 h-full mx-auto my-0 relative">
        <div class="page_body w-full  py-14 sm:pl-[330px]">
            {{ type }} - {{ query }}
        </div>
        
    </div>
</template>
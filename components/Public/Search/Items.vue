
<script setup lang="ts">

import type { Media } from '~~/types';


interface SearchItemsProps{
    SearchItems: Media[]
}

defineProps<SearchItemsProps>()

</script>


<template>
    <div v-if="SearchItems.length > 0" class="search mt-2">
        <h4>Result: <span class="text-yellow-300">{{ SearchItems.length }}</span></h4>
        <div class="search_items grid grid-cols-1 gap-4">
            <PublicSearchItem v-for="item in SearchItems" :key="item.id" :item="item"/>
        </div>
    </div>
    <div v-else class="search flex items-center justify-center">
        <h3>What <span class="text-yellow-300">will we look</span> for? 🐻</h3>
    </div>
</template>
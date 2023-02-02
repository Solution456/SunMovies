<script setup lang="ts">
import StarIcon from '@heroicons/vue/24/solid/StarIcon'

interface raitingProps {
    raiting:string | number
}

const props = defineProps<raitingProps>()
</script>

<template>
    <div class="stars_wrap flex items-center gap-1">
        <div class="stars__icon text-yellow-300">
            <StarIcon class="h-5 w-5"/>  
        </div>
        <div class="stars__raiting font-medium text-md">
            <span>{{ props.raiting }}</span>
        </div>
    </div>
    
</template>
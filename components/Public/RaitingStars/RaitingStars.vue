<script setup lang="ts">
import StarIcon from '@heroicons/vue/24/solid/StarIcon'

interface raitingProps {
    raiting: string | number
}

const props = defineProps<raitingProps>()
</script>

<template>
    <span class="inline-flex items-center font-bold font-poppins text-[16px]">
        <div class="flex items-center gap-1">
            <span class="stars__icon inline-flex items-center h-4 w-4 justify-center align-middle text-yellow-300">
                <StarIcon class="h-full w-full" />
            </span>
            <span>{{ props.raiting }}</span>
        </div>
    </span>
</template>
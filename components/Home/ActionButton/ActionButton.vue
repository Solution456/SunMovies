<script setup lang="ts">
import ChevronRight from '@heroicons/vue/24/outline/ChevronRightIcon'

interface ActionButtonProps {
    to:string
}

defineProps<ActionButtonProps>()

</script>


<template>
    <div class="Home_action__wrap text-xs hover:bg-opacity-10 hover:bg-gray-300 transition flex items-center p-1 rounded-sm text-gray-300 gap-1">
        <NuxtLink :to="to">
            <slot>Button</slot>
        </NuxtLink>
        <ChevronRight class="h-3 w-3"/>
    </div>
</template>
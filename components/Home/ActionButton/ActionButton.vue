<script setup>
import ChevronRight from '@heroicons/vue/24/outline/ChevronRightIcon'
</script>


<template>
    <div class="Home_action__wrap text-xs hover:bg-opacity-10 hover:bg-gray-300 transition flex items-center p-1 rounded-sm text-gray-300 gap-1">
        <a href="#">
            <slot>Button</slot>
        </a>
        <ChevronRight class="h-3 w-3"/>
    </div>
</template>
<script setup>
import PlusCircleIcon from '@heroicons/vue/24/outline/PlusCircleIcon'
</script>

<template>
    <div
        class="action-button w-full items-center flex flex-wrap gap-1 py-1 px-2 hover:bg-opacity-10 hover:bg-gray-300 transition rounded">
        <div class="action-button_button ">
            <div class="w-full flex items-center justify-center  ">
                <PlusCircleIcon class="w-4 h-4" />
            </div>
        </div>
        <div class="action-button_label h-full">
            <span class="text-sm font-light">add favourite genres</span>
        </div>
    </div>
</template>
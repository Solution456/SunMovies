<script setup>
import PlusCircleIcon from '@heroicons/vue/24/outline/PlusCircleIcon'
</script>

<template>
    <div class="action-button w-full items-center flex flex-wrap gap-1">
        <div class="action-button_button ">
            <button class="w-full flex items-center justify-center p-1 hover:bg-opacity-10 hover:bg-gray-300 transition rounded-full">
                <PlusCircleIcon class="w-4 h-4"/>
            </button>
        </div>
        <div class="action-button_label h-full">
            <span class="text-sm font-light">add favourite genres</span> 
        </div>

    </div>
</template>
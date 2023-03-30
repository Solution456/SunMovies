<script setup lang="ts">
const emit = defineEmits<{
    (event:'remove-option'):void
}>()


const handleClick = ()=> {
    emit('remove-option')
}
</script>


<template>
    <span class="px-2 rounded text-gray-400 text-sm bg-gray-200 bg-opacity-10">
        <span>
            <slot/>
        </span>
        <span class="cursor-pointer w-5 h-5 inline-block text-center hover:text-yellow-300" @click.stop="handleClick">×</span>
    </span>
</template>
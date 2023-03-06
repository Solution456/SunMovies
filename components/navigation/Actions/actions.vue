<script setup lang="ts">
import SearchIcon from '@heroicons/vue/24/outline/MagnifyingGlassIcon'
import ArrowDown from '@heroicons/vue/24/outline/ChevronDownIcon'

interface actionsProps {
    SearchActive: boolean
}

const props = defineProps<actionsProps>()

const emit = defineEmits<{
    (e: 'update'):void
}>()



const clickHandler = () => {
    emit('update')
}



</script>

<template>
    <div v-show="!SearchActive" class="button__search text-yellow-300 hover:bg-opacity-10 hover:bg-gray-300 transition">
        <button @click="clickHandler" class="h-14 w-14 px-1.5 py-1 flex justify-center  items-center">
            <SearchIcon class="h-5 w-5"></SearchIcon>
        </button>
        
    </div>
    <div class="Navigation__Actions__Avatar justify-center items-center relative h-full p-1 hover:bg-gray-300 hover:bg-opacity-10 transition hidden md:flex">
            <img class="rounded-full block h-6 w-6 m-0" src="https://i.pinimg.com/564x/6a/14/7e/6a147e528f6482c51632849024e314df.jpg" alt="">
            <div class="arrow h-3 w-3 ml-2">
                <ArrowDown></ArrowDown>
            </div>
    </div>
</template>
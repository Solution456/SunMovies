<script setup lang="ts">

interface SearchContainerProps {
    Show:boolean
}

const props = defineProps<SearchContainerProps>()

</script>




<template>
    <div v-show="Show" class="menu min-w-full right-9  bottom-0 origin-top-left z-[121] fixed inline-block max-w-[80%] overflow-x-hidden overflow-y-auto top-[50px]">
        <div class="search-menu mx-auto rounded-md max-w-[600px] w-[95%] bg-bgColor shadow-sm overflow-hidden">
            <div class="search-list p-3">
                fasfasf
            </div>
        </div>
    </div>

</template>
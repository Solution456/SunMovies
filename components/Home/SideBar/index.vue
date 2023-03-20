<script setup lang="ts">


import type { Genre } from "~~/types";

const props = defineProps<{
  genres: Genre[]
  SelectedFavouriteGenres: string[]
}>()

const emit = defineEmits<{
    (e: 'update', value:string[]):void
}>()

const dropdownOptions = ["Today", "Weak", "Month"];

const scrollWrapper = ref<HTMLDivElement>()
useScrollbar(scrollWrapper)




const handleEmit = (value: string[]) => {
    emit('update',value)
}




</script>



<template>
  <div class="sidebar hidden h-full sm:block sm:fixed z-10 w-80 top-0">
    <div class="sidebar_inner  h-full mt-14 w-full py-4 px-2">
      <div class="sidebar_header h-16  border-b pb-2 border-gray-600">
        <div class="sidebar_header__container h-full flex items-center justify-between">
          <h3 class="sidebar_header__title uppercase text-sm font-medium">
            Genres <span class="text-yellow-300">filter</span>
          </h3>
        </div>
      </div>

      <div ref="scrollWrapper" style="height:calc(100% - 100px)">
        <div class="sidebar_body mt-1 border-b pb-2 border-gray-600">
          <div class="sidebar_body__container flex flex-col">

          </div>
        </div>

        <div class="sidebar_footer">
          
            <HomeSideBarGenreFilter @update="handleEmit" :FavouriteGenres="SelectedFavouriteGenres" :Genres="props.genres" />
          
        </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import GengreFilter from "./GengreFilter/GengreFilter.vue";
import GenreFilter from "./GenreFilter/GenreFilter.vue";


const dropdownOptions = ["Today", "Weak", "Month"];

const scrollWrapper = ref<HTMLDivElement>()
useScrollbar(scrollWrapper)



</script>



<template>
  <div class="sidebar hidden h-full sm:block sm:fixed z-10 w-80 top-0">
    <div class="sidebar_inner  h-full mt-14 w-full py-4 px-2" >
      <div class="sidebar_header h-16  border-b pb-2 border-gray-600">
        <div
          class="sidebar_header__container h-full flex items-center justify-between"
        >
          <h3 class="sidebar_header__title uppercase text-sm font-medium">
            Genres <span class="text-yellow-300">filter</span>
          </h3>
          <div class="sidebar_header_actions flex items-center">
            <span
              class="header_action__title text-[10px] text-gray-300 font-normal"
            >
              Sort By
            </span>
            <div class="header_action__item">
              <PublicDropDownMenu
                :Options="dropdownOptions"
              ></PublicDropDownMenu>
            </div>
          </div>
        </div>
      </div>

        <div ref="scrollWrapper" style="height:calc(100% - 100px)">
          <div class="sidebar_body mt-2 border-b pb-2 border-gray-600">
            <div class="sidebar_body__container flex flex-col">
              
            </div>
          </div>

          <div class="sidebar_footer">
            <GenreFilter/>
          </div>
        </div>

    </div>
  </div>
</template>
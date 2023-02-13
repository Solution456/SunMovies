<script setup lang="ts">
const SearchState = ref(false)


</script>


<template>
  <div class="app-wrapper min-h-screen max-w-full relative flex-auto flex flex-col">
    <Navigation :SearchActive="SearchState=!SearchState"/>

    <div class="px-4 max-w-[1076px] flex gap-2 h-full mx-auto my-0 relative">
      <slot> </slot>
    </div>
    <PublicSearchContainer :Show="SearchState" />
  </div>

</template>
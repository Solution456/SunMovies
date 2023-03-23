<script setup lang="ts">



const SearchState = ref(false)
const search = ref('')

const handleSearchState = () => {
  SearchState.value = false
}

const updateSearchValue = (value:string)=> {
  search.value = value
}





</script>


<template>

  <div  class="app-wrapper min-h-screen max-w-full relative flex-auto flex flex-col">
    <PublicOverlay :State="SearchState"/>
    <Navigation @update-search="updateSearchValue"  @show-state="SearchState = !SearchState" :SearchActive="SearchState" />

    <div class="page">
      <slot> </slot>
    </div>
    <PublicSearchContainer @out-click="handleSearchState" :Show="SearchState" :Search="search"/>
    
  </div>
  

</template>
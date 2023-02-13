<script setup>


const SearchState = ref(false)

</script>


<template>
    <div class="app-wrapper min-h-screen max-w-full relative flex-auto flex flex-col">
        <Navigation @show-state="SearchState = !SearchState" :search-active="SearchState" />
        <div class="movie-layout h-full">
            <slot></slot>
        </div>

        <PublicSearchContainer :Show="SearchState" />
    </div>
</template>
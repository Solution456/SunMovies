<script setup lang="ts">
</script>


<template>
    <div class="genge_filter w-full bg-gray-600 bg-opacity-30 px-4 py-8">
        <div class="genre_filter_header h-10">
            <div class="genre_filter_header__container flex items-center justify-start h-full w-full">
                <h3 class="uppercase text-sm font-medium">
                    Favourite genres
                </h3>
            </div>
        </div>
        <div class="genre_filter_body h-full mt-2">
                <div class="genre_filter__chips flex items-center gap-2 flex-wrap">
                    <PublicChip>Action</PublicChip>
                    <PublicChip>Action</PublicChip>
                    <PublicChip>Action</PublicChip>
                    <PublicChip>Action</PublicChip>
                </div>

                <div class="genre_filter__actions mt-2">
                    <HomeSideBarGenreFilterActionButton/>
                </div>
            </div> 
    </div>
</template>
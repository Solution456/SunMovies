<script setup lang="ts">
import StarIcon from '@heroicons/vue/24/solid/StarIcon'



import type { Media } from '~~/types';

definePageMeta({
    layout: 'page'
})


const search = ref('')
const SearchItems = ref<Media[]>([])
const isLoading = ref<Boolean>(false)
const error = ref<unknown>()


const fetch = async () => {
    if (!search.value) {
        SearchItems.value = []
        return
    }

    try {
        isLoading.value = true
        const dataSearch = await searchTMDB(search.value)
        SearchItems.value = dataSearch.results
    } catch (er) {
        isLoading.value = false
        error.value = er
    } finally {
        isLoading.value = false
    }
}


const debounceFetch = debounce(() => fetch(), 350)

watch(search, () => {
    debounceFetch()

})
</script>

<template>

    <div class="page_body w-full  py-14">

        <PublicInput v-model="search" name="search" icon="search" />

        <PublicVideoPlayer :Source="'s'"/>
        
       

        <div v-if="SearchItems.length > 0" class="search mt-20">
            <div class="search_items grid grid-cols-1 gap-4">
                <div v-for="item in SearchItems" :key="item.id" class="search_item ">
                    <div class="search_item__container  grid grid-cols-search-item relative gap-2">
                        <div
                            class="search_item__poster w-32 relative pb-[150%] bg-bgColor rounded-md border-2 border-transparent hover:border-yellow-300 transition duration-200 cursor-pointer">
                            <NuxtImg
                                class="rounded-md object-cover max-w-full align-middle bg-bgColor h-full w-full absolute top-0 left-0"
                                :src="apiURL.imageW300(item.poster_path)" />
                        </div>
                        <div class="search_item__info w-full">
                            <div class="search_item__body">
                                <div class="search_item__date text-sm text-yellow-300 font-light">
                                    {{ item.release_date || item.runtime }}
                                </div>
                                <h4>{{ item.title || item.name }}</h4>
                                <div class="raiting flex items-center gap-2">
                                    <span class="text-2xl font-semibold">{{ item.vote_average }}</span>
                                    <StarIcon class="w-5 h-6 text-yellow-300" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<style scoped>
</style>
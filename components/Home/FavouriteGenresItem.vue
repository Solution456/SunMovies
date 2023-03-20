<script setup lang="ts">
import type { Media, MediaType, PageResult} from '~~/types';


interface ContentItemProps {
    genres: string[]
    typeMedia: MediaType
}


const props = defineProps<ContentItemProps>()

const router = useRouter()

const toLink = computed(() => {
    return `${props.typeMedia}/category/${props.genres.join(' ')}`
})

const list = ref<Media[]>([])
const isLoading = ref(false)
const error = ref<unknown>()


const fetch = async (genres:string[]) => {
    if (!props.genres) {
        list.value = []
        return
    }
    try {
        isLoading.value = true
        const data = await getMediaByGenres(props.typeMedia,genres.join(','))
        list.value = data.results
    } catch (er) {
        isLoading.value = false
        error.value = er
    } finally {
        isLoading.value = false
    }
}


watch(()=> props.genres, async (val) => {
    console.log('FETCH')
    await fetch(val)
}, {
    immediate:true
})
</script>


<template>
    <div class="home_item mt-6">
        <div class="flex justify-between items-center">
            <div class="home_item__title font-light flex items-center gap-4">
                <h4 class="home_item__text uppercase font-semibold">For you</h4>
                <span class="opacity-20">|</span>
                <div class="home_item__movCount">
                    <span class=" text-yellow-300 font-medium">{{ list.length }}</span> {{ props.typeMedia }}
                </div>
            </div>

            <div class="home_item__action h-full flex">
                <HomeActionButton :to="toLink">More</HomeActionButton>
            </div>
        </div>


        <div v-if="!isLoading" class="home_item__content mt-4 h-[300px] flex sm:w-full">
            <PublicCarousel :type="props.typeMedia" :items="list" />
        </div>
        <div v-if="isLoading">
            <PublicLoadersSpinner/>
        </div>
    </div>
</template>
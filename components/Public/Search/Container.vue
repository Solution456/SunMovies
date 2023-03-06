<script setup lang="ts">
import type { Media } from '~~/types';


interface SearchContainerProps {
    Show: boolean
    Search: string
}

const props = defineProps<SearchContainerProps>()

const emit = defineEmits<{
    (e: 'OutClick'):void
}>()

const menuRef = ref<HTMLDivElement>()


const handleOutSideClick = (e: any) => {
    const target = e.target

    if (menuRef.value === target && menuRef.value?.contains(target)) {

        emit('OutClick')
    }
}


const Items = ref<Media[]>([])
const isLoading = ref<Boolean>(false)
const error = ref<unknown>()


const fetch = async () => {
    if (!props.Search) {
        Items.value = []
        return
    }

    try {
        isLoading.value = true
        const dataSearch = await searchTMDB(props.Search)
        Items.value = dataSearch.results
    } catch (er) {
        isLoading.value = false
        error.value = er
    } finally {
        isLoading.value = false
    }
}



const debounceFetch = debounce(() => fetch(), 350)

watch(() => props.Search, () => {
    debounceFetch()

})


onMounted((): void => {
    document.addEventListener('click', handleOutSideClick)
})

onDeactivated((): void => {
    document.removeEventListener('click', handleOutSideClick)
})

</script>




<template>
    <Transition name="fade">
        <div ref="menuRef" v-show="Show"
            class="menu min-w-full inset-0 origin-top-left z-[121] fixed inline-block max-w-[80%] overflow-x-hidden overflow-y-auto top-[50px]">
            <div class="search-menu mx-auto rounded-md max-w-[600px] w-[85%] bg-bgColor shadow-sm overflow-hidden">
                <div class="search-list p-4">
                    <PublicLoadersSpinner v-if="isLoading"/>
                    <PublicSearchItems v-else :SearchItems="Items"/>
                </div>
            </div>
        </div>
    </Transition>


</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
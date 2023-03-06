<script setup lang="ts">
import type { Media, MediaType } from '~~/types';


interface AutoGridProps {
    items: Media[]
    type: MediaType
    fetch: (page: number) => Promise<void>
}


const props = defineProps<AutoGridProps>()

const autoLoadElement = ref<HTMLDivElement>()

const isLoading = ref(false)
const error = ref<unknown>()
let page = 0

const loadingNext = async () => {
    if (isLoading.value) {
        return
    }
    isLoading.value = true
    try {
        page += 1
        await props.fetch(page)
    } catch (er) {
        isLoading.value = false
        error.value = er
    }
    finally {
        isLoading.value = false
    }

}


if (process.client) {
    loadingNext()
    useInterval(() => {

        if (!autoLoadElement.value || isLoading.value)
            return
        const { top } = autoLoadElement.value.getBoundingClientRect()
        const delta = top - window.innerHeight

        if (delta < 400)
            loadingNext()
    }, 500)
}
else {
    await loadingNext()
}
</script>


<template>
    <div>
        <PublicGrid>
            <PublicMediaCard v-for="item of props.items" :key="item.id" :type="props.type" :item="item" />
        </PublicGrid>
        <div ref="autoLoadElement" />
        <PublicLoadersSpinner v-if="isLoading" />
    </div>
</template>
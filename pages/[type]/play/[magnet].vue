<script setup lang="ts">
import type { TorrentFile, TorrentInfo } from '~~/types';

definePageMeta({
    key: route => route.fullPath,
})

const route = useRoute()
const router = useRouter()

const magnet = computed(() => route.params.magnet as string)

const video = ref<TorrentFile>()
const error = ref<unknown>()
const isLoading = ref(false)


const videoUrl = computed(() => {
    return video.value?.fileName ? `torrent/stream/${video.value.magnet}/${video.value.fileName}` : ''
})

const Play = async (magnet: TorrentInfo['magnet']) => {
    isLoading.value = true
    try {
        const data = await addTorrent(magnet)
        video.value = {
            magnet: magnet,
            fileName: data[1] ? data[1].name : data[0].name
        }
    } catch (er) {
        console.log('ERROR')
        isLoading.value = false
        error.value = er
    } finally {
        isLoading.value = false
    }

}

onMounted( async () => {
    console.log('Mounted')
    await Play(magnet.value)
})

onUnmounted(async () => {
    console.log('onUnmounted')
    await removeTorrent(magnet.value)
})

onUpdated(async() => {
    console.log('onUpdated')
    await removeTorrent(magnet.value)
})

</script>


<template>
    <NuxtLayout name="page">
        <div
            class="px-4 py-14 md:max-w-[1076px] xs:max-w-[614px] items-center justify-center flex gap-2 min-h-screen mx-auto my-0 relative">
            <div v-if="!isLoading && !error" class="page_body w-full h-full flex flex-col items-center justify-center">
                <h4>
                    {{ video?.fileName }}
                </h4>
                <div class="media w-full">
                    <PublicVideoPlayer :Source="apiURL.videoURL(videoUrl)" />
                </div>
            </div>
            <div v-else class="flex flex-col gap-4 items-center justify-center">
                <PublicLoadersSpinner/>
                <PublicBaseButton @click="router.back">BACK</PublicBaseButton>
            </div>
        </div>
    </NuxtLayout>
</template>
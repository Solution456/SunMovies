<script setup lang="ts">
import type { MediaType, TorrentFile, TorrentInfo } from '~~/types';

definePageMeta({
    key: route => route.fullPath,
})

const route = useRoute()
const router = useRouter()

const magnet = computed(() => route.params.magnet as string)

const video = ref<TorrentFile[]>([])
const currentVideo = ref<TorrentFile | null>(null)
const error = ref<unknown>()
const isLoading = ref(false)


const videoUrl = computed(() => {
    return currentVideo.value?.fileName ? `torrent/stream/${currentVideo.value.magnet}/${currentVideo.value.fileName}` : ''
})
const type = computed(() => route.params.type as MediaType)

const setCurrentVideo = (item:TorrentFile) => {
    currentVideo.value = item
}

const Play = async (magnet: TorrentInfo['magnet']) => {
    isLoading.value = true
    try {
        const data = await addTorrent(magnet)
        if(data.length > 1){
            data.forEach(item => {
                video.value.push({
                    magnet: magnet,
                    fileName: item.name
                })
            })
        }
        else{
            currentVideo.value = {
                magnet:magnet,
                fileName:data[0].name
            }
        }
    } catch (er) {
        console.log('ERROR')
        isLoading.value = false
        error.value = er
    } finally {
        isLoading.value = false
    }

}

onMounted(async () => {
    console.log('Mounted')
    await Play(magnet.value)
})

onUnmounted(async () => {
    console.log('onUnmounted')
    await removeTorrent(magnet.value)
})

onUpdated(async () => {
    console.log('onUpdated')
    await removeTorrent(magnet.value)
})

</script>


<template>
    <NuxtLayout name="page">
        <div
            class="px-4 py-14 md:max-w-[1076px] xs:max-w-[614px] items-center justify-center flex gap-2 min-h-screen mx-auto my-0 relative">
            <!-- <div class="cover absolute -z-10 gradient"/> -->
            <div v-if="!isLoading && !error" class="page_body w-full h-full flex flex-col items-center justify-center">
                <h4 v-if="currentVideo">
                    {{ currentVideo?.fileName }}
                </h4>
                <div class="flex flex-col xs:flex-row " :class="[{'items-center justify-center':video.length<1}]">
                    <div class="media w-full transition-all" :class="[{'xs:w-2/3':video.length>1}]">
                        <PublicVideoPlayer :Source="apiURL.videoURL(videoUrl)" />
                    </div>
                    <div v-if="video.length>0" class="xs:w-1/3">
                        <ul>
                            <PublicTorrentListItem  v-for="torrent of video" :key="torrent.fileName" :item="torrent" @click.prevent="setCurrentVideo(torrent)"/>
                        </ul>
                    </div>
                </div>


            </div>
            <div v-else class="flex flex-col gap-4 items-center justify-center">
                <PublicLoadersSpinner />
                <PublicBaseButton @click="router.back">BACK</PublicBaseButton>
            </div>
        </div>
    </NuxtLayout>
</template>

<style>

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.gradient {
  --size: 250px;
  --speed: 50s;
  --easing: cubic-bezier(0.8, 0.2, 0.2, 0.8);

  width: var(--size);
  height: var(--size);
  filter: blur(calc(var(--size) / 5));
  background-image: linear-gradient(rgba(241, 255, 42, 0.8),rgb(255, 196, 0));
  animation: rotate var(--speed) var(--easing) alternate infinite;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

@media (min-width: 720px) {
  .gradient {
    --size: 500px;
  }
}

/* This is just to transition when you change the viewport size. */

</style>
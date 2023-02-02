<script setup lang="ts">
import type { Media } from '~~/types';



interface BannerProps {
    item: Media
}

const props = defineProps<BannerProps>()


const fadeColor = useColor(apiURL.originalImage(props.item.backdrop_path))

</script>




<template>
    <div class="banner mb-10 relative flex cursor-pointer bg-transparent h-96 overflow-hidden rounded-md">
        <NuxtImg :src="apiURL.originalImage(props.item.backdrop_path)" :alt="props.item.title"
            class="banner_img h-full w-full bg-slate-600 bg-no-repeat bg-center bg-cover object-cover" />
        <div class="banner__fade absolute inset-0 transition-all"
            :style="`background-image: linear-gradient(to right, ${fadeColor} , ${fadeColor} 30%, transparent 100%, transparent);`">
        </div>
        <div
            class="banner_content flex flex-col justify-between absolute bottom-0 top-0 left-0 right-1/2 overflow-hidden text-ellipsis min-h-0  py-12 pl-8">
            <div class="banner_content__body flex flex-col">
                <div class="banner_content__title text-2xl font-semibold font-oswald">
                    {{ props.item.title }}
                </div>
                <div class="banner_content_raiting">
                    <PublicRaitingStars :raiting="item.vote_average" />
                </div>
                <div class="banner_content__overview text-sm mt-4">
                    {{ props.item.overview }}
                </div>
            </div>
            <div class="banner_content__footer">
                <PublicLinkButton>Watch now</PublicLinkButton>
            </div>
        </div>
    </div>
</template>

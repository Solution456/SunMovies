<script setup lang="ts">
interface RecommendationsCardProps {
    id: string | number
    PosterUrl: string | null
    title: string
}

const props = defineProps<RecommendationsCardProps>()

const router = useRouter()




</script>


<template>
    <div class="RecommendationsCard w-32 relative ">
        <!-- <NuxtLink :to="`/movie/${props.id}`" > -->
        <div @click="router.push(`/movie/${props.id}`)"
            class="RecommendationsCard__poster relative pb-[150%] bg-bgColor rounded-md border-2 border-transparent hover:border-yellow-300 transition duration-200 cursor-pointer">
            <NuxtImg v-if="props.PosterUrl" :src="apiURL.imageW300(props.PosterUrl)" :alt="props.title"
                class="rounded-md object-cover max-w-full align-middle bg-bgColor h-full w-full absolute top-0 left-0 " />
        </div>

        <div class="RecommendationsCard__title text-center text-sm mt-3 text-yellow-300 font-semibold">
            <NuxtLink :to="`/movie/${props.id}`" class="hover:text-white transition">
                {{ props.title }}
            </NuxtLink>
        </div>
        <!-- </NuxtLink> -->
    </div>
</template>
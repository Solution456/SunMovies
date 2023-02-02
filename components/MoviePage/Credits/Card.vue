<script setup lang="ts">


interface CreditsCardProps {

    id: string | number,
    charecters: string | undefined,
    name: string
    photo: string | null
}

const props = defineProps<CreditsCardProps>()

</script>




<template>
    <div class="Credits-Card w-28">
        <div class="Credits-Card__photo rounded-md relative pb-[150%] bg-bgColor">
            <NuxtImg v-if="props.photo" :src="apiURL.imagePoster(props.photo)" :alt="props.name"
                class="rounded-md object-cover max-w-full align-middle bg-bgColor h-full w-full absolute top-0 left-0"
                loading="lazy" />
        </div>

        <div class="Credits-Card__body text-center mt-2 p-2">
            <div class="Credits-Card__name text-sm">
                {{ props.name }}
            </div>
            <div class="Credits-Card__role text-sm text-yellow-300">
                {{ props.charecters }}
            </div>
        </div>
    </div>
</template>
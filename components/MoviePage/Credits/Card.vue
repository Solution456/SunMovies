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
    <div class="Credits-Card flex min-h-[50px] xs:block xs:w-28">
        <div class="flex flex-row items-center justify-center xs:flex-col">
            <div class="flex items-center justify-center">
                <div class="Credits-Card__photo flex relative max-w-full w-28">
                    <div class="pb-[133.33%] flex-[1_0_0px]"></div>
                    <div v-if="props.photo" class="absolute top-0 left-0 bg-bgColor bg-no-repeat bg-center bg-cover w-full h-full rounded-md"
                        :style="`background-image:url(${apiURL.imageW500(props.photo)})`">
                    </div>
                </div>

            </div>
            <div class="Credits-Card__body xs:text-center mt-2 p-2">
                <div class="Credits-Card__name text-sm">
                    {{ props.name }}
                </div>
                <div class="Credits-Card__role text-sm text-yellow-300">
                    {{ props.charecters }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { NAV_ROUTES } from '@/constants/routes'


interface navigationProps {
    SearchActive: boolean,
}

const props = defineProps<navigationProps>()
const emit = defineEmits<{
    (e: 'ShowState'):void,
    (e: 'updateSearch', value:string):void

}>()


const search = ref('')

const ShowActive = () => {
    emit('ShowState')
}


watch(search, () => {
    emit('updateSearch',search.value)

})



</script>

<template>
    <header class="navigation fixed w-full bg-bgColor z-[120] left-0 top-0 h-14 border-b border-gray-600 mx-auto px-1">

        <div class="page_header w-full h-full  sm:max-w-[85%] relative sm:mx-auto">


            <nav class="flex h-full items-center xs:gap-0 gap-4 justify-between">
                <div
                    class="navigation__logo font-poppins font-bold text-xl xs:text-lg flex items-center justify-center h-full">
                    <a :href="NAV_ROUTES.HOME['to']">s<span class=" text-yellow-300">u</span>n</a>
                </div>

                <div v-if="!props.SearchActive" class="h-full">
                    <div class="navigation__items hidden font-poppins font-medium xs:block h-full ">
                        <ul class="flex gap-2 h-full">
                            <li v-for="route in NAV_ROUTES" :key="route.name"
                                class="navigation__item--link text-gray-400 hover:text-white hover:border-b hover:border-b-yellow-300 transition h-full">
                                <NuxtLink class="h-full flex items-center" :to="route.to">{{ route.name }}</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class="navigation__burger xs:hidden">
                        <NavigationHamburger></NavigationHamburger>
                    </div>
                </div>

                <!-- Search -->
                <div v-if="props.SearchActive"
                    class="search-container max-w-[600px] m-auto flex flex-grow flex-shrink-0 basis-auto">
                    <div class="content flex-grow flex-shrink-0 basis-0 max-w-full">
                        <PublicInput name="search" v-model="search"  icon="search" />
                    </div>
                </div>




                <div class="navigation__actions flex items-center h-full">
                    <NavigationActions :SearchActive="props.SearchActive" @update="ShowActive"></NavigationActions>
                </div>
            </nav>
        </div>
    </header>

</template>


<style scoped>
.router-link-active,
.router-link-exact-active {
    color: rgb(253 224 71);
    border-bottom: 1px solid rgb(253 224 71);
}
</style>
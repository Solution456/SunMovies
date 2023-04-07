<script setup lang="ts">
import { NAV_ROUTES } from '@/constants/routes'

import SearchIcon from '@heroicons/vue/24/outline/MagnifyingGlassIcon'


interface navigationProps {
    SearchActive: boolean,
}

const props = defineProps<navigationProps>()
const emit = defineEmits<{
    (e: 'ShowState'): void,
    (e: 'updateSearch', value: string): void

}>()


const search = ref('')
const AnimateHeader = ref(false)
const isOpen = ref(false)

const ShowActive = () => {
    emit('ShowState')
}

const openClose = () => {
    isOpen.value = !isOpen.value
}


watch(search, () => {
    emit('updateSearch', search.value)

})


onMounted(() => {
    const throttleListener = throttle(() => {
        if (Math.round(window.scrollY) > 40) {
            AnimateHeader.value = true
        } else {
            AnimateHeader.value = false
        }
    }, 300)

    window.addEventListener("scroll", throttleListener)

    return () => {
        window.removeEventListener("scroll", throttleListener)
    }
})



</script>

<template>
    <header class="navigation fixed overflow-hidden w-full z-[120] left-0 top-0 mx-auto transition-[height,background-color] ease-linear duration-200"
        :class="[{ 'bg-black/90 shadow-md': AnimateHeader || isOpen}, isOpen?'h-auto':'h-14' ]">
        <div class="page_header w-full h-full sm:max-w-[1076px] relative sm:mx-auto">


            <nav class="flex h-full items-center flex-wrap justify-between">
                <div
                    class="navigation__logo font-poppins ml-3 xs:ml-0 font-bold text-xl xs:text-lg flex items-center justify-center h-full">
                    <a :href="NAV_ROUTES.HOME['to']">s<span class=" text-yellow-300">u</span>n</a>
                </div>

                <div v-if="!props.SearchActive" class="h-full">
                    <div class="navigation__items hidden font-poppins font-medium xs:block h-full ">
                        <ul class="flex gap-2 h-full font-light text-white">
                            <li v-for="route in NAV_ROUTES" :key="route.name"
                                class="navigation__item--link  hover:text-yellow-300 transition h-full">
                                <NuxtLink class="h-full flex items-center" :to="route.to">{{ route.name }}</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class="navigation__burger xs:hidden">
                        <NavigationHamburger :state="isOpen" @setState="openClose"></NavigationHamburger>
                    </div>
                </div>

                <!-- Search -->
                <div v-if="props.SearchActive"
                    class="search-container max-w-[300px] xs:max-w-[600px] m-auto flex flex-grow flex-shrink-0 basis-auto">
                    <div class="content flex-grow flex-shrink-0 basis-0 max-w-full">
                        <PublicInput :start-icon="SearchIcon" name="search" v-model="search"/>
                    </div>
                </div>




                <div class="navigation__actions flex items-center h-full">
                    <NavigationActions :SearchActive="props.SearchActive" @update="ShowActive"></NavigationActions>
                </div>

                <div class="w-full block transition-[background-color] ease-linear duration-200" :class="isOpen?'':'hidden'">
                    <ul class="flex flex-col gap-4 p-3">
                        <li v-for="route in NAV_ROUTES" :key="route.name"
                            class="navigation__item--link  hover:text-yellow-300 transition h-full">
                            <NuxtLink class="h-full flex items-center" :to="route.to">{{ route.name }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>


<style scoped>
.router-link-active,
.router-link-exact-active {
    color: rgb(253 224 71);
}
</style>
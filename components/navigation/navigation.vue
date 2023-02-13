<script setup lang="ts">
import { NAV_ROUTES } from '@/constants/routes'

interface navigationProps {
    SearchActive: boolean
}

const props = defineProps<navigationProps>()

const emit = defineEmits<{
    (e: 'ShowState'):void

}>()

const links = [
    {
        name: 'General',
        to: '/'
    },
    {
        name: 'TvShow',
        to: '/Show'
    },
    {
        name: 'Serials',
        to: '/Serials'
    }

]


const ShowActive = () => {
    console.log('@@Click')
    emit('ShowState')
}



</script>

<template>
    <div class="navigation fixed w-full bg-bgColor z-[120] left-0 top-0 h-14 border-b border-gray-600 mx-auto my-0">

        <header class="page_header w-[1076px] h-full max-w-full relative xs:mx-auto">


            <nav class="flex h-full items-center justify-between">
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

                {{ props.SearchActive }}

                <!-- Search -->
                <div v-if="props.SearchActive"
                    class="search-container max-w-[600px] m-auto flex flex-grow flex-shrink-0 basis-auto">
                    <div class="content flex-grow flex-shrink-0 basis-0 max-w-full">
                        <PublicInput name="search" icon="search" />
                    </div>
                </div>




                <div class="navigation__actions flex items-center h-full">
                    <NavigationActions @update="ShowActive"></NavigationActions>
                </div>
            </nav>
        </header>
    </div>

</template>


<style scoped>
.router-link-active,
.router-link-exact-active {
    color: rgb(253 224 71);
    border-bottom: 1px solid rgb(253 224 71);
}
</style>
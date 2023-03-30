<script setup lang="ts">
import AdjustmentsVerticalIcon from '@heroicons/vue/24/outline/AdjustmentsVerticalIcon'

import PublicDrawer from '~~/components/Public/Drawer/Drawer.vue';

import { QUERY_LIST } from '~~/constants/lists';


import type { MediaType } from '~~/types';
import type { SelectOption } from '~~/components/Public/Select/Select.vue'

export type FromToFilterType = {
    from: number
    to: number
}

interface filterForm {
    selectedGenres: SelectOption[]
    selectedType: SelectOption | null
    year: FromToFilterType
}

definePageMeta({
    key: route => route.fullPath,
    validate: ({ params }) => {
        return ['movie', 'tv'].includes(params.type as MediaType)
    },
})

const router = useRouter()
const route = useRoute()
const refDrawer = ref<InstanceType<typeof PublicDrawer> | null>(null)


const typeOptions = [
    {
        name: 'Movie',
        value: 'movie'
    },
    {
        name: 'TvShow',
        value: 'tv'
    }
]



const form = ref<filterForm>({
    selectedGenres: [],
    selectedType: null,
    year: {
        from:0,
        to:0
    }
})

const genresArr = computed(() => {
    return form.value.selectedGenres.map((item) => {
        return item?.id
    })
})

const setSelectedGenres = (value: SelectOption[] | SelectOption | null) => {
    form.value.selectedGenres = (value as typeof form.value.selectedGenres)
    console.log(form.value.selectedGenres)
}
const setSelectedType = (value: SelectOption[] | SelectOption | null) => {
    form.value.selectedType = (value as SelectOption)
}

const setSelectedYears = (value: FromToFilterType) => {
    form.value.year = value
}



const searchRedirect = ()=> {
    let query = {}
    if(form.value.year.from > 0 && form.value.year.to > 0){
        query = {
            release_date_gte:form.value.year.from,
            release_date_lte:form.value.year.to,
            with_genres:genresArr.value.join(',')
        }
    }else {
        query = {
            with_genres:genresArr.value.join(',')
        }
    }
    router.push({
        path:`/${form.value.selectedType?.value}/filter`,
        query:{
            ...query
        }
    })
}


const typeMedia = computed(() => route.params.type as MediaType || 'movie')

const queries = computed(() => QUERY_LIST[typeMedia.value])


const [trendMedia, genres] = await Promise.all([
    getTrending(typeMedia.value),
    getGenreList(typeMedia.value)
])



const openDrawer = () => {
    refDrawer.value?.openClose()
}
useHead({
    title: typeMedia.value === 'movie' ? 'Movies' : 'TV Shows',
})

</script>


<template>
    <NuxtLayout name="page">
        <PublicDrawer :on-click="searchRedirect" ref="refDrawer">
            <template #content>
                <div class="media-filters grid w-full">
                    <PublicSelect :label="`Genre`" :value="form.selectedGenres" @on-change="setSelectedGenres" multiple
                        :options="genres" />
                    <PublicSelect :label="`Type`" :value="form.selectedType" @on-change="setSelectedType"
                        :options="typeOptions" />
                    <PublicFromToInput @update-values="setSelectedYears" :values="form.year" Label="Years" />
                </div>
            </template>
        </PublicDrawer>
        <div class="px-4 md:max-w-[1076px] xs:max-w-[614px] flex gap-2 h-full mx-auto my-0 relative">
            <div class="page_body w-full py-14">
                <div>
                    <div class="container_inner">
                        <HomeBanner :type="typeMedia" :item="trendMedia.results[0]" />
                        <HomeContentItem v-for="query in queries" :key="query.query" :query="query"
                            :type-media="typeMedia" />
                    </div>
                </div>
            </div>
        </div>
        <PublicBaseButton icon :onClick="openDrawer" class="xs:hidden fixed z-[100] left-0 bottom-0 mt-4 mr-4 mb-2 ml-4">
            <AdjustmentsVerticalIcon class="w-5 h-5" />
        </PublicBaseButton>
    </NuxtLayout>
</template>
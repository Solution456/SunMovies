<script setup lang="ts">

import type { FromToFilterType } from '~~/components/Public/FromTo/Input.vue';


export interface filterForm {
    selectedGenres: []
    selectedType: null
    year: FromToFilterType
}

interface MediaFiltersProps {
    typeMedia: string
}



const props = defineProps<MediaFiltersProps>()
const emit = defineEmits<{
    (event: 'Redirect'): void
}>()


const router = useRouter()

const typeOptions = [
    {
        label: 'Movie',
        value: 'movie'
    },
    {
        label: 'TvShow',
        value: 'tv'
    }
]

const value = ref(null)
const form = ref<filterForm>({
    selectedGenres: [],
    selectedType: null,
    year: {
        from: 0,
        to: 0
    }
})

const genres = await getGenreList(props.typeMedia)

const genresComp = computed(() => {
    return genres.map(genre => {
        return {
            label: genre.name,
            value: genre.id
        }
    })
})

const setSelectedYears = (value: FromToFilterType) => {
    form.value.year = value
}

const searchRedirect = () => {
    emit('Redirect')
    let query = {}
    if (form.value.year.from > 0 && form.value.year.to > 0) {
        query = {
            'release_date.gte': form.value.year.from.toString(),
            'release_date.lte': form.value.year.to.toString(),
            with_genres: form.value.selectedGenres.join(',')
        }
    } else {
        query = {
            with_genres: form.value.selectedGenres.join(',')
        }
    }
    router.push({
        path: `/${form.value.selectedType}/filter`,
        query: {
            ...query
        }
    })
}
</script>



<template>
    <div class="media-filters grid w-full">
        <PublicSelect :label="`Genre`" v-model:value="form.selectedGenres" multiple :options="genresComp" />
        <PublicSelect :options="typeOptions" :label="`Type`" v-model:value="form.selectedType" />
        <PublicFromToInput @update-values="setSelectedYears" :values="form.year" Label="Years" />
        <div class="media-filters__action mt-4">
            <PublicBaseButton @click="searchRedirect" size="sm">Search</PublicBaseButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Genre } from '~~/types';



interface GenreFilterProps{
    Genres: Genre[]
    FavouriteGenres:string[]
}



const props = defineProps<GenreFilterProps>()
const emit = defineEmits<{
    (e: 'update', value:string[]):void
}>()



const SelectedGenres = computed(() => {
    const tmpArray:Genre[] = []
    for (let genre of props.FavouriteGenres) {
        const item = props.Genres.findIndex((item) => item.id === parseInt(genre))
        tmpArray.push(props.Genres[item])
    }
    return tmpArray
})

const handleEmit = (value: string[]) => {
    emit('update',value)
}



</script>


<template>
    <div class="genge_filter w-full bg-gray-600 bg-opacity-30 px-4 pt-4 pb-6">
        <div class="genre_filter_header h-10">
            <div class="genre_filter_header__container flex items-center justify-start h-full w-full">
                <h3 class="uppercase text-sm font-medium">
                    Favourite genres
                </h3>
            </div>
        </div>
        <div class="genre_filter_body h-full mt-2">
                <div v-if="SelectedGenres.length > 0" class="genre_filter__chips flex items-center gap-2 flex-wrap">
                    <TransitionGroup name="bounce">
                        <PublicChip v-for="genre of SelectedGenres" :key="genre.id">{{ genre.name }}</PublicChip>
                    </TransitionGroup>
                </div>
                <div v-else>
                    <p class="text-sm text-gray-300">Favorite <span class="text-yellow-300">genres</span> are not selected 😒</p>
                </div>

                <div class="genre_filter__actions mt-2">
                    <PublicListbox @update="handleEmit" :options="Genres"/>
                </div>
            </div> 
    </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
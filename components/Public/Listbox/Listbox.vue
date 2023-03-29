<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'


import type { Genre } from '~~/types';

interface ListBoxProps {
    selectedOptions:string[]
    options: Genre[]
}

interface ListBoxEmits {
    (e: 'update', value:string[]):void
}

const props = defineProps<ListBoxProps>()

const selectedOptionsLocal = ref<string[]>(props.selectedOptions)

const emit = defineEmits<ListBoxEmits>()

watch(selectedOptionsLocal, (newSelectedOptionsLocal) => {
    emit('update',selectedOptionsLocal.value)
})

</script>


<template>
    <Listbox v-model="selectedOptionsLocal" multiple>
        <div class="relative">
            <ListboxButton>
                <HomeSideBarGenreFilterActionButton />
            </ListboxButton>
            <transition name="bounce">
            <ListboxOptions class="absolute mt-1 w-full max-h-56 overflow-auto bg-bgColor  rounded-md shadow-md p-2">
                <ListboxOption v-slot="{ active, selected }" v-for="option in props.options" :key="option.id"
                    :value="option.id" as="template">
                    <li :class="[
                        active ? 'bg-opacity-10 bg-gray-300 ' : 'text-gray-400',
                        'relative cursor-default rounded-md',
                    ]">
                        <span :class="[
                            selected ? 'font-medium text-yellow-300 bg-gray-300 bg-opacity-10 shadow-md' : 'font-normal',
                            'block truncate p-2 rounded-md',
                        ]">
                            {{ option.name }}
                        </span>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </transition>
        </div>
    </Listbox>
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
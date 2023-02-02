<script setup lang="ts">
import SearchIcon from '@heroicons/vue/24/outline/MagnifyingGlassIcon'
interface HTMLInputEvent extends Event {
	target: HTMLInputElement
}

interface inputProps{
    name:string
    label?:string
    icon?:string
    placeholder?:string
    type?:'password' | 'text' | 'number'
    modelValue?:string
}

const props = withDefaults(defineProps<inputProps>(),{
    type: 'text'
})

const emit = defineEmits<{
    (e: 'update:modelValue', value:string):void
}>()

const inputHandler = (event:HTMLInputEvent) => {
    emit('update:modelValue',event.target.value)

}

</script>




<template>
    <div class="input-group">
        <label v-if="props.label" :for="props.name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>
        <div class="relative ">
            <div v-if="props.icon" class=" text-yellow-300 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon class="w-5 h-5"/>
            </div>
            <input :type="props.type" :id="props.name" :value="props.modelValue" @input="inputHandler()"
                class="bg-transparent border border-yellow-300 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                :placeholder="props.placeholder">
        </div>
    </div>
</template>
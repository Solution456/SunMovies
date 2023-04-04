<script setup lang="ts">
import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement
}

interface inputProps {
    name: string
    startIcon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
    endIcon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
    label?: string
    placeholder?: string
    type?: 'password' | 'text' | 'number'
    modelValue?: string | number
}

const props = withDefaults(defineProps<inputProps>(), {
    type: 'text'
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const inputHandler = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)


}

</script>




<template>
    <div class="input-group">
        <label v-if="props.label" :for="props.name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
            props.label }}</label>
        <div class="relative ">
            <div v-if="startIcon"
                class="text-yellow-300 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <component class="w-5 h-5" :is="startIcon" />
            </div>
            <input :type="props.type" :id="props.name" @input="inputHandler"
                class="bg-transparent border border-yellow-300 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                :class="[startIcon ? 'pl-10' : 'pl-4', endIcon ? 'pr-10' : '']" :placeholder="props.placeholder"
                :name="props.name">
            <div v-if="endIcon"
                class="text-yellow-300 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <component class="w-5 h-5" :is="endIcon" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>
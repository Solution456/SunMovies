<script setup lang="ts">


export type SelectOption = {
    label: string,
    value: any
}

interface emitProps {
    (e: 'onChange', value: SelectOption | SelectOption[] | undefined): void
}


interface SelectProps {
    multiple?: boolean
    options: SelectOption[]
    value: SelectOption | SelectOption[]
}


const props = withDefaults(defineProps<SelectProps>(), {
    multiple: false
})
const emit = defineEmits<emitProps>()

const open = ref(false)
const localValues = ref(props.value)




const selectOption = (option: SelectOption) => {
    if (props.multiple) {
        if ((localValues.value as SelectOption[]).includes(option)) {
            const ind = (localValues.value as SelectOption[]).indexOf(option)
            if(ind < 0) return
            (localValues.value as SelectOption[]).splice(ind,1)
            emit('onChange', localValues.value)
        } else {
            (localValues.value as SelectOption[]).push(option)
            emit('onChange', localValues.value)
        }
    } else {
        if (option !== props.value) emit('onChange', option)
    }
}

const isOptionSelected = (option: SelectOption) => {
    return props.multiple ? (props.value as SelectOption[]).includes(option) : option === props.value
}
</script>

<template>
    <div class="relative">
        <button type="button" :tabindex="0" @click="open = !open"
            class="relative w-full cursor-pointer min-h-[2em] rounded-md bg-[#15141b] py-1 px-2 text-left text-gray-400 shadow-sm ring-0 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
            aria-haspopup="listbox" :aria-expanded="open">
            <template v-if="multiple">
                <span v-for="value of (props.value as SelectOption[])" :key="value.value">{{ value.label }}</span>
            </template>
            <template v-else>
                {{ (props.value as SelectOption).label }}
            </template>
            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clip-rule="evenodd" />
                </svg>
            </span>
        </button>

        <ul v-show="open" :tabindex="-1"
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#15141b] py-1 text-base shadow-lg focus:outline-none sm:text-sm"
            role="listbox">
            <li @click="$event => {
                open = true
                $event.stopPropagation()
                selectOption(option)   
            }" v-for="(option, index) of options" :key="option.value"
                class="relative cursor-pointer select-none py-2 px-3"
                :class="[isOptionSelected(option) ? 'bg-yellow-300 text-white' : '']" :id="`listbox-option-${index}`"
                role="option">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>
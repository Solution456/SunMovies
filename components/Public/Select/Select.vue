<script setup lang="ts">
import { VNodeChild } from 'vue';



export type ValueAtom = string | number
export type Value = ValueAtom | string[] | number[] | ValueAtom[]

interface SelectBaseOption<
    V = string | number,
    L = string | ((option: SelectBaseOption<V>, selected: boolean) => VNodeChild)
> {
    value: V
    label?: L
}
type SelectOption = SelectBaseOption<string | number>


interface emitProps {
    (e: 'update:value', value: Value | null): void
}

interface SelectProps {
    multiple?: boolean
    label?: string
    options: SelectBaseOption[]
    value: Value | null
}



const props = withDefaults(defineProps<SelectProps>(), {
    multiple: false
})
const emit = defineEmits<emitProps>()




const open = ref(false)
const sOptions = ref<SelectOption[]>([])
const emptyArray: SelectOption[] = []

// const getMergedOptions = (values: ValueAtom[]) => {
//     const options: SelectOption[] = []
//     values.forEach((value) => {
//         if(mapValOpt.has(value)){
//             options.push(mapValOpt.get(value)!)
//         }
//     })
// }

// const createValMap = (options: SelectOption[]) => {
//     const mapOptions = new Map<string | number, SelectBaseOption>()

//     options.forEach((option) => {
//         mapOptions.set(
//             option['value'],
//             option
//         )
//     })
//     return mapOptions
// }

const handleToggleByOption = (option: SelectOption) => {

    if (props.multiple) {
        const ind = getOptionsIndex(option.value as NonNullable<SelectOption['value']>)
        if (~ind) {
            sOptions.value.splice(ind, 1)
        }
        else {
            sOptions.value.push(option)
        }
        const changedValue = sOptions.value.map(val => {
            return val.value
        })
        emit('update:value', changedValue)
    }
    else {
        const OptionIndex = getOptionsIndex(option.value as NonNullable<SelectOption['value']>)
        if (~OptionIndex) {
            sOptions.value = emptyArray

        } else {
            sOptions.value = [option]
        }
        const val = sOptions.value[0]?.value ? sOptions.value[0].value as NonNullable<SelectOption['value']> : null
        emit('update:value', val)
    }
}

const getOptionsIndex = (optionValue: string | number): number => {
    let tmpOptions = sOptions.value
    const ind = tmpOptions.findIndex(
        (tmpOption) =>
            (tmpOption.value as NonNullable<SelectOption['value']>) === optionValue
    )
    return ind
}



const removeOption = (ind: number) => {
    if (props.multiple) {
        sOptions.value.splice(ind, 1)
        const changedValue = sOptions.value.map(val => {
            return val.value
        })
        emit('update:value', changedValue)
    } else
        sOptions.value = []
    emit('update:value', null)
}

const isOptionSelected = (option: SelectOption) => {
    return props.multiple ? sOptions.value.includes(option) : option.value === props.value
}

</script>

<template>
    <div class="relative">
        <div class="mb-1">
            <span class="text-sm text-gray-400">{{ label }}</span>
        </div>
        <button type="button" :tabindex="0" @click="open = !open"
            class="relative w-full cursor-pointer min-h-[2em] rounded-md bg-[#1c1b24] py-2 px-3.5 text-left text-gray-400 shadow-sm ring-0 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
            aria-haspopup="listbox" :aria-expanded="open">
            <template v-if="props.multiple">
                <div class="flex flex-wrap gap-2" v-if="sOptions.length > 0">
                    <PublicSelectBadge @remove-option="removeOption(index)" v-for="(value, index) of sOptions"
                        :key="value.value">
                        {{ value.label }}
                    </PublicSelectBadge>
                </div>
                <span v-else class="text-xs text-gray-500">
                    Choose {{ label }}
                </span>
            </template>

            <template v-else>
                <span v-if="props.value">
                    {{ props.value }}
                </span>
                <span v-else class="text-xs text-gray-500">
                    Choose {{ label }}
                </span>
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
                handleToggleByOption(option)
            }" v-for="(option, index) of options" :key="option.value"
                :class="[isOptionSelected(option) ? 'bg-yellow-300 text-white' : '']" :id="`listbox-option-${index}`"
                class="relative cursor-pointer select-none py-2 px-3" role="option">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>


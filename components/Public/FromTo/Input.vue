<script setup lang="ts">
import type { FromToFilterType } from '~~/pages/[type]/index.vue';


const props = defineProps<{
    Label: string
    values: FromToFilterType
}>()

const emit = defineEmits<{
    (event: 'update-values', value: FromToFilterType): void
}>()

const localValues = ref(props.values)


watchEffect(() => {
    if (localValues.value.from > 0 && localValues.value.to > 0) {
        emit('update-values', localValues.value)
    }
})

</script>

<template>
    <div class="mt-4">
        <h6 class="label text-sm text-gray-400">{{ props.Label }}</h6>
        <div class="mt-2 flex gap-1 justify-between">
            <PublicInput v-model="localValues.from" type="number" placeholder="from" name="from" />
            <PublicInput v-model="localValues.to" type="number" placeholder="to" name="to" />
        </div>
    </div>
</template>
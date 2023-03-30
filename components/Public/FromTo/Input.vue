<script setup lang="ts">

const props = defineProps<{
    Label:string
}>()

</script>

<template>
    <div class="mt-4">
        <h6 class="label text-sm text-gray-400">{{ props.Label }}</h6>
        <div class="mt-2 flex gap-1 justify-between">
            <PublicInput type="number" placeholder="from" name="from" />
            <PublicInput type="number" placeholder="to" name="to" />
        </div>
    </div>
</template>
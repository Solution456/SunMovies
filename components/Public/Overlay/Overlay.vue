
<script setup lang="ts">


interface OverlayProps {
    State: boolean
}


const props = defineProps<OverlayProps>()



</script>



<template>
    <div ref="overlayRef" :class="{ 'pointer-events-none': !State, 'pointer-events-auto': State }"
        class="overlay z-50 absolute  flex items-center justify-center inset-0 transition-[z-index]">
        <div :class="{ 'opacity-60': State, 'opacity-0': !State } "
            class="overlay__scrim bg-[#121117] inset-0 absolute h-full w-full will-change-[opacity] transition-opacity"></div>
        <div class="v-overlay__content"></div>
    </div>
</template>
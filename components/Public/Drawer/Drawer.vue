<script setup lang="ts">


const isShown = ref(false)


const openClose = () => {
    isShown.value = !isShown.value
    if (isShown.value)
        document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
}



defineExpose({
    openClose
})

</script>

<template>
    <aside
        class="fixed top-0 right-0 z-[122] h-screen p-4 overflow-y-auto transition-transform w-80 bg-[#121117]"
        :class="[isShown?'transform-none':'translate-x-full']"
        >
        <div class="drawer__content h-full overflow-x-hidden overflow-y-auto">
            <slot name="content"></slot>
        </div>
    </aside>
    <div v-show="isShown" @click="openClose" drawer-backdrop class="bg-[rgba(0,0,0,0.4)] fixed inset-0 z-[121]"/>
</template>
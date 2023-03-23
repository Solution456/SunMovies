<script setup lang="ts">

interface ModalProps {
    fullscreen?: boolean
    transition?: 'default' | 'bounce'
}

const props = withDefaults(defineProps<ModalProps>(), {
    transition: 'default'
})

const isModalShown = ref(false)

const openClose = () => {
    isModalShown.value = !isModalShown.value
    if (isModalShown.value)
        document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
}

defineExpose({
    openClose
})

</script>

<template>
    <Teleport to="body">
        <Transition :name="props.transition">
            <div v-show="isModalShown"
                class="modal z-[202] flex items-center h-full justify-center inset-0 fixed transition w-full"
                :class="[{ 'pointer-events-auto bg-[rgba(0,0,0,0.4)] .p-component-overlay-enter': isModalShown }]">
                <div class="modal-inner box-border shadow-md"
                    :class="[{ 'h-screen w-screen max-h-full': props.fullscreen }, { 'max-h-[90%] w-[50vw]': !props.fullscreen }]">
                    <div
                        class="card block max-w-full h-full outline-none break-words relative whitespace-normal bg-[#121117] text-white">
                        <div class="card__text p-0 w-full">
                            <div class="px-4 pt-2">
                                <div class="grid gap-2 grid-flow-col auto-cols-auto place-content-between items-center">
                                    <div class="text">

                                        <slot name="header"></slot>
                                    </div>
                                    <div>
                                        <button type="button" @click="openClose"
                                            class="flex items-center justify-center w-8 h-8 rounded-md transition-all text-[0.75rem] hover:bg-opacity-10 hover:bg-gray-300">
                                            <svg viewBox="0 0 24 24" focusable="false"
                                                class="w-[1em] h-[1em] inline-block shrink text-current align-middle"
                                                aria-hidden="true">
                                                <path fill="currentColor"
                                                    d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card__body p-0 w-full">
                                <slot name="body">

                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style>
.p-component-overlay-enter {
    animation: p-component-overlay-enter-animation 150ms forwards
}



.default-enter-active,
.default-leave-active {
    transition: all 0.3s ease-in-out;
}

.default-enter-from,
.default-leave-to {
    transform: translateX(30px);
    opacity: 0;
}

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

@keyframes p-component-overlay-enter-animation{
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
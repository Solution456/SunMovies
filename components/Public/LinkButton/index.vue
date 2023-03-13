<script>
</script>

<template>
    <a class="button_link px-2 inline-flex bg-yellow-300 text-white rounded-md items-center justify-center text-lg box text-center h-10 min-w-[32px] hover:bg-yellow-400 transition">
        <div class="button_link__content  overflow-hidden text-ellipsis whitespace-nowrap font-medium uppercase flex items-center flex-auto">
            <slot>button</slot>
        </div>
    </a>
</template>
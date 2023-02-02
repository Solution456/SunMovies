<script setup lang="ts">
const hamburgerLineStyle = `h-[2px] w-7 my-1 rounded-full bg-yellow-300 transition ease transform duration-300`;
const isOpen = ref(false)

const openMenu = () => {
    isOpen.value = !isOpen.value
}
</script>


<template>
  <button class="h-14 w-14 flex flex-col justify-center  items-center group" @click="openMenu">
    <div :class='[hamburgerLineStyle,
                    isOpen ? `rotate-45 translate-y-2 opacity-80 group-hover:opacity-100`
                    : `opacity-80 group-hover:opacity-100`]'></div>
    <div :class="[hamburgerLineStyle,
                    isOpen ? `opacity-0`
                    : `opacity-80 group-hover:opacity-100`]"></div>
    <div :class="[hamburgerLineStyle,
                    isOpen ? `-rotate-45 -translate-y-3 opacity-80 group-hover:opacity-100`
                    : `opacity-80 group-hover:opacity-100`]"></div>
  </button>
</template>


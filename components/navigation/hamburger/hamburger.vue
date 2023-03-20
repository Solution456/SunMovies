<script setup lang="ts">
const hamburgerLineStyle = `h-[2px] w-7 my-1 rounded-full bg-yellow-300 transition ease transform duration-300`;

interface hamburgerProps{
  state:boolean
}

const props = defineProps<hamburgerProps>()
const emit = defineEmits<{
  (e:'setState'):void
}>()


const openMenu = () => {
    emit('setState')
}
</script>


<template>
  <button class="h-14 w-14 flex flex-col justify-center  items-center group" @click="openMenu">
    <div :class='[hamburgerLineStyle,
                    props.state ? `rotate-45 translate-y-2 opacity-80 group-hover:opacity-100`
                    : `opacity-80 group-hover:opacity-100`]'></div>
    <div :class="[hamburgerLineStyle,
                    props.state ? `opacity-0`
                    : `opacity-80 group-hover:opacity-100`]"></div>
    <div :class="[hamburgerLineStyle,
                    props.state ? `-rotate-45 -translate-y-3 opacity-80 group-hover:opacity-100`
                    : `opacity-80 group-hover:opacity-100`]"></div>
  </button>
</template>


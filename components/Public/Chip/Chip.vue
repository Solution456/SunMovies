<script setup lang="ts">

const Colors = ['bg-purple-400 hover:bg-purple-500 active:purple-600', 
                'bg-red-400 hover:bg-red-500 active:red-600', 
                'bg-orange-400 hover:bg-orange-500 active:orange-600', 
                'bg-yellow-400 hover:bg-yellow-500 active:yellow-600', 
                'bg-fuchsia-400 hover:bg-fuchsia-500 active:fuchsia-600', 
                'bg-green-400 hover:bg-green-500 active:green-600', 
                'bg-blue-400 hover:bg-blue-500 active:blue-600']
const params = {
    start:0,
    end:6
}

const randomColor = computed<string>(()=> {
    const indColor = Math.floor(Math.random() * (params.end - params.start + 1) + params.start)
    return Colors[indColor]
})





</script>



<template>
  <div class="chip">
    <span
      :class="randomColor ? randomColor: ''"
      class="
        
        w-max
        px-4
        py-2
        rounded-full
        flex
        items-center
        font-normal
        text-sm
        cursor-pointer
        transition
      "
    >
      <slot></slot>
    </span>
  </div>
</template>
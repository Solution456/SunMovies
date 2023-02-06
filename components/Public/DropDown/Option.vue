<script setup lang="ts">

interface HTMLInputEvent extends Event {
	target: HTMLInputElement
}

interface dropdownOption {
    label: string,
    name:string,
    id:string,
    value?:string,
    checked?:boolean,
    disabled?:boolean,
}



const props = defineProps<dropdownOption>()



const emit = defineEmits<{
    (e: 'update:checkedValue', value:string):void
}>()


const handleRadio = (event: HTMLInputEvent) => {
    emit('update:checkedValue',event.target.value)
}




</script>


<template>
  <li>
    <div class="flex items-center p-2 rounded hover:bg-opacity-10 hover:bg-gray-300 transition">
      <input
        type="radio"
        :id="id"
        :name=props.name
        :value=props.value
        :checked="checked"
        :disabled="disabled"
        @input="() => handleRadio"
        class="
          
          w-3
          h-3
          checked:bg-yellow-300
          text-yellow-300
          focus:ring-0 focus:ring-offset-0
        "
      />
      <label
        :for=props.name
        class="w-full ml-2 text-xs font-light text-white rounded"
        >{{ props.label }}</label
      >
    </div>
  </li>
</template>
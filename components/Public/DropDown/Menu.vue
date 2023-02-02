<script setup lang="ts">
import ChevronUpDown from "@heroicons/vue/24/outline/ChevronUpDownIcon";

interface dropdownProps {
  Options: string[];
}

const props = defineProps<dropdownProps>();


const refDrop = ref<HTMLDivElement>()
const selected = ref(`select`);
const showDropdown = ref(false);



const handleDropDown = (e:any) => {
    const target = e.target
    if(refDrop.value !== target && !refDrop.value?.contains(target)){
        showDropdown.value = false
    }

}

onMounted( (): void => {
    document.addEventListener('click', handleDropDown)
  }
)

onDeactivated( (): void => {

document.removeEventListener('click', handleDropDown)
})



</script>

<template>
  <div class="dropdown relative" ref="refDrop">
    <button
      id="dropdown"
      data-dropdown-toggle="dropdown"
      @click="showDropdown = !showDropdown"
      class="
      hover:bg-opacity-10 hover:bg-gray-300 transition
        text-white
        font-light
        rounded-lg
        text-xs
        px-2
        py-2.5
        text-center
        inline-flex
        items-center
      "
      type="button"
    >
      {{ selected }}
      <ChevronUpDown class="h-4 w-4" />
    </button>
    <transition name="bounce">
      <PublicDropDownList v-if="showDropdown">
        <PublicDropDownOption
          v-for="Option in props.Options"
          :key="Option"
          v-model:checked-value="selected"
          :label="Option"
          name="radio-button"
          :id="Option"
          :value="Option"
        />
      </PublicDropDownList>
    </transition>
  </div>
</template>


<style scoped>
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
</style>
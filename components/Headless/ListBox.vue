<template>
  <div class="relative w-full">
    <!-- Label flutuante -->
    <label
      class="absolute left-4 text-gray-500 transition-all duration-200 pointer-events-none bg-white px-1 z-10"
      :class="{ 'text-xs -top-2.5': selected || modelValue, 'top-2.5': !selected && !modelValue }"
    >
      {{ placeholder }}
    </label>

    <Listbox v-model="selected">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-pointer rounded-md border-2 border-[rgba(128,128,128,0.816)] h-[47.2px] bg-white  pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-white">
          <span class="block truncate text-black">{{ selected }}</span>
        </ListboxButton>

        <Transition leave="transition ease-in duration-100" leave-from="opacity-100" leave-to="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5">
            <ListboxOption
              v-for="option in options"
              :key="option"
              :value="option"
              class="cursor-pointer select-none px-4 py-2 hover:bg-blue-100">
              {{ option }}
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
    <p v-if="error" class="text-red-500 text-xs mt-1 text-start">{{ error }}</p>
  </div>
</template>


<script setup>
import { ref, watch, Transition } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,

} from '@headlessui/vue'

const props = defineProps({
  modelValue: [String, null],
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Selecione uma opção'
  },
  error :String
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  selected.value = val
})

watch(selected, (val) => {
  emit('update:modelValue', val)
})
</script>


<style scoped>
.input-container {
  position: relative;
  margin-bottom: 1rem;
}

.input-container input {
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
}

.input-container label {
  position: absolute;
  top: 10px;
  left: 12px;
  color: #999;
  pointer-events: none;
  transition: 0.2s ease all;
}

.input-container input:focus + label,
.input-container label.active, input[type="date"] + label{
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: black;
  background: white;
  padding: 0 4px;
}

input{
    border: 2px solid rgba(128, 128, 128, 0.816);
    border-radius: 4px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}




  </style>
  
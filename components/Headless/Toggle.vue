<template>
  <div class="flex items-center gap-3">
    <label class="text-sm text-gray-700 font-medium">{{ label }}</label>

    <Switch
      v-model="localValue"
      :class="[
        'relative inline-flex h-6 w-11 items-center rounded-full transition border border-gray-400',
        alwaysGray ? 'bg-gray-300' : (localValue ? 'bg-blue-600' : 'bg-gray-300')
      ]"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
        :class="localValue ? 'translate-x-6' : 'translate-x-1'"
      />
    </Switch>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Switch } from '@headlessui/vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  alwaysGray: { 
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

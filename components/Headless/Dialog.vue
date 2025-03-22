<template>
    <TransitionRoot appear :show="modelValue" as="template">
      <Dialog as="div" class="relative z-50" @close="$emit('update:modelValue', false)">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <DialogTitle class="text-lg font-medium text-gray-900">
                  {{ title }}
                </DialogTitle>
  
                <div class="mt-4 text-sm text-gray-600">
                  <slot />
                </div>
  
                <div class="mt-6 flex justify-end">
                  <button
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    @click="$emit('update:modelValue', false)"
                  >
                    Fechar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  
  defineProps({
    modelValue: Boolean,
    title: {
      type: String,
      default: 'Informação'
    }
  })
  
  defineEmits(['update:modelValue'])
  </script>
  
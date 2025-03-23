<template>
    <div class="flex md:flex-col items-center justify-between w-[90%] md:w-[300px] h-[120px] md:h-[300px] bg-white shadow-lg py-5 px-4 rounded-xl cursor-pointer
    transition-transform transform hover:-translate-y-4 hover:shadow-2xl gap-3 md:gap-0">
      <img class="md:w-40 w-20 rounded-full md:rounded-none"  :src="options.image" alt="Capa">
      <h1 class="md:text-2xl md:w-[auto] w-[100%] text-lg md:text-center">{{capitalizeFirstLetter(options.name)}}</h1>
    </div>
</template>

<script setup>
import { capitalizeFirstLetter } from "@/composables/functions";

defineProps({
  options: Object
});
</script>


<style>
</style>
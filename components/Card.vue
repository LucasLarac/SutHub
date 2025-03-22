<template>
    <div class="flex flex-col items-center justify-between w-[90%] md:w-[300px] md:h-[300px] bg-white shadow-lg py-5 px-4 rounded-xl cursor-pointer
    transition-transform transform hover:-translate-y-4 hover:shadow-2xl">
    <img class="w-40" :src="options.image" alt="Capa">
        <h1 class="text-2xl">{{capitalizeFirstLetter(options.name)}}</h1>
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
<template>
    <div class="bg-green-800  lg:h-[225px]   md:h-[auto]  h-auto w-[100%] md:w-[100%] lg:w-[100%] text-white  rounded-xl p-5 flex flex-col  items-center gap-5 cursor-pointer ">
        <h1 class="font-bold text-center tracking-wider min-h-[35px]">{{ receita.name }}</h1>

        <div class="flex md:justify-between flex-row md:flex-col lg:flex-row items-center h-[100%] justify-between">
            <img class="rounded-xl w-1/3 mb-6 md:mb-0" :src="receita.image" alt="">
            <ul class="list-disc pl-5 md:auto md:w-2/3 lg:w-1/2 w-1/2  flex flex-col justify-start lg:justify-center mt-5 lg:mt-0 h-full">
                <li v-for="t in receita.tags" :key="t">{{ t }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'


const props = defineProps({
    receita: {
        type: Object,
        required: true
    }
})


</script>

<style scoped></style>
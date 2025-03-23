<template>
    <div class="bg-green-800  lg:h-[225px] lg:w-[250px] md:w-[200px] md:h-[255px]  h-[300px] w-[250] text-white  rounded-xl p-5 flex flex-col  items-center gap-2 cursor-pointer ">
        <h1 class="font-bold text-center tracking-wider">{{ receita.name }}</h1>

        <div class="flex md:justify-between flex-col md:flex-row items-center h-[100%]">
            <img class="rounded-xl w-1/3" :src="receita.image" alt="">
            <ul class="list-disc pl-5 w-3/5 flex flex-col justify-center mt-5 lg:mt-0 ">
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
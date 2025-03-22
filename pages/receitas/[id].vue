<template>
  <div class="w-full h-screen flex flex-col items-center bg-orange-600 text-white overflow-y-auto">
    <div v-if="!isLoading" class="gap-10 flex flex-col w-full   p-5 rounded-lg bg-orange-600 text-white">
      <h1 class="text-3xl mb-5 text-center font-bold tracking-wider">{{ item.name.toUpperCase() }}</h1>


      <div class="flex flex-col">

        <div class="w-full flex justify-center items-start gap-10">

          <div class="w-2/6 rounded-md">
            <img :src="item.image" :alt="item.name" class="w-[100%] rounded-md">
            <div class="flex items-center ">
              <label class="text-md mr-2">{{ item.tags.length > 1 ? 'Tags:' : 'Tag:' }}</label>
              <span  class="text-sm" v-for="(t, index) in item.tags" :key="index">
                {{ index !== 0 ? ' / ' : '' }}{{ t }}
              </span>            
            </div>
          </div>

          <div class="flex flex-col w-2/4 gap-8">

            <div class="flex flex-col  gap-1 " :key="index">
              <label class="text-2xl mb-4">Modo de preparo: </label>
              <label class="text-xl text-start w-full mb-1" v-for="(i, index) in item.instructions">{{ index + 1 }}° {{ i
                }}</label>
            </div>


          </div>

          <div class="flex flex-col w-1/4 " :key="index">
            <label class="text-2xl mb-4 text-start">Ingredientes: </label>
            <label class="text-xl text-start w-full" v-for="(i, index) in item.ingredients">{{ index + 1 }} - {{ i
              }}</label>
          </div>

        </div>

        <div class="w-full flex gap-2 justify-between mt-5">

          <label class="text-lg">Tempo de preparo: <span class="text-base">{{ formatTime(item.prepTimeMinutes +
            item.cookTimeMinutes) }}</span></label>

          <div class="flex items-center">
            <label class=" text-lg mr-2">Avaliação: </label>
            <img class="w-[25px]" v-for="i in 5" :key="i" :src="i <= Math.floor(item.rating) ? yellow : gray">
          </div>

          <div class="flex items-center">
            <label class="mr-5 text-lg">Porções: </label>
            <img v-for="i in item.servings" :key="i" src="../../assets/img/prato.png" alt="talher" class="mr-1 w-[35px]">
          </div>



        </div>
      </div>

      <div class="flex">




      </div>

    </div>



    <Loader v-else class="h-[100%] item-center" />
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import Loader from '~/components/Loader.vue';
import yellow from '@/assets/svg/star-yellow.svg'
import gray from '@/assets/svg/star-gray.svg'

const { $axios } = useNuxtApp()
const route = useRoute();
const recipeId = route.params.id;

function formatTime(minutos) {
  if (minutos >= 60) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas} horas e ${mins > 0 ? `${mins} minutos` : ''}`;
  }
  return `${minutos} minutos`;
}


const { data: item, isLoading } = useQuery(
  ['receita', recipeId],
  async () => {
    const response = await $axios.get(`recipes/${recipeId}`);
    console.log(response.data);
    return response.data;
  },
  {
    staleTime: Infinity,
  }
);



</script>

<style>
html,
body,
#__nuxt {
  height: 100%;
}
</style>
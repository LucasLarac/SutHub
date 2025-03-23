<template>
  <div class="w-full min-h-screen flex flex-col items-center bg-orange-600 text-white ">

    <div class="flax items-start justify-start mb-5 px-[5%] md:px-[1%] w-full">
            <button @click="router.back()" class="text-sm  text-white">
            ← Voltar
        </button>
        </div>

    <div v-if="!isLoading" class="gap-10 flex flex-col w-full  p-5 rounded-lg bg-orange-600 text-white">
      <h1 class="text-3xl mb-5 text-center font-bold tracking-wider">{{ item.name.toUpperCase() }}</h1>


      <div class="flex flex-col ">

        <div class="w-full flex flex-col items:center lg:flex-row justify-center items-start gap-10">

          <div class="lg:w-2/6 w-full  rounded-md items-center flex flex-col ">
            <img :src="item.image" :alt="item.name" class="w-[100%] md:w-1/2 lg:w-full rounded-md">
            <label class="text-md mr-2 text-start w-[100%] md:w-1/2 lg:w-full">{{ item.tags.length > 1 ? 'Tags:' : 'Tag:' }}</label>
            <div class=" items-center w-full md:w-1/2 lg:w-full grid grid-cols-3">
              <span class="text-sm" v-for="(t, index) in item.tags" :key="index">{{ t }} </span>
            </div>
          </div>

          <div class="flex flex-col lg:w-2/4 w-full gap-8">

            <div class="flex flex-col  gap-1 " :key="index">
              <label class="text-2xl mb-4">Modo de preparo: </label>
              <label class="text-xl text-start w-full mb-1" v-for="(i, index) in item.instructions">{{ index + 1 }}° {{
                i
                }}</label>
            </div>


          </div>

          <div class="flex flex-col lg:w-1/4 w-full" :key="index">
            <label class="text-2xl mb-4 text-start">Ingredientes: </label>
            <label class="text-xl text-start w-full" v-for="(i, index) in item.ingredients">{{ index + 1 }} - {{ i
            }}</label>
          </div>

        </div>

          <div class="flex flex-col lg:flex-row gap-3 justify-between w-full mt-6 items-start  p-2 " >
            <div class="flex flex-col">
              <label class="text-xl">Tempo de preparo: </label>
              <span class="text-base">{{ formatTime(item.prepTimeMinutes + item.cookTimeMinutes) }}</span>
            </div>

            <div>
              <label class=" text-xl mr-2">Avaliação: </label>
              <div class="flex gap-1">
                <img class="w-[25px]" v-for="i in 5" :key="i" :src="i <= Math.floor(item.rating) ? yellow : gray">
              </div>
            </div>

            <div>
              <label class="mr-5 text-xl">Porções: </label>
              <div class="flex gap-1">
                <img v-for="i in item.servings" :key="i" src="../../assets/img/prato.png" alt="talher" class="mr-1 w-[35px]">
              </div>
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
import { useRouter } from "vue-router";
const router = useRouter();


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
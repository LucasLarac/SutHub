<template>
  <div class=" justify-center flex-col items-center bg-gray-100 min-h-screen ">
    <Head v-show="mostrarHeader" class="hidden md:flex" />
        <NuxtPage class="p-[30px] max-w-[1500px] w-full" />
    <!-- <FooterB /> -->
  </div>
</template>

<script setup>
import "@/assets/css/tailwind.css"
import { useHead } from '#imports';
import { FooterB } from "#components";
import Head from "./components/head/Head.vue";
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mostrarHeader = computed(() => router.currentRoute.value.path !== '/')

useHead({
  title: 'Teste - SUTHUB',
  meta: [
    { name: 'description', content: 'Teste efetuado para ser o desenvolvedor da Suthub!' }
  ]
});



</script>



<style>
@font-face {
  font-family: 'Ibm';
  src: url('@/assets/fonts/IBMPlexSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

html, body {
  font-family: 'Ibm', sans-serif;
}

</style>
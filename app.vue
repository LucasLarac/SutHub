<script setup>
import "@/assets/css/tailwind.css"
import { useHead } from '#imports';
import { FooterB } from "#components";

useHead({
  title: 'Teste - SUTHUB',
  meta: [
    { name: 'description', content: 'Teste efetuado para ser o desenvolvedor da Suthub!' }
  ]
});
</script>

<template>
  <div class="flex justify-center flex-col items-center bg-gray-100 min-h-screen">
    <NuxtPage class="p-[30px] max-w-[1500px] w-full bg-gray-100 " />
    <!-- <FooterB /> -->
  </div>
</template>



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
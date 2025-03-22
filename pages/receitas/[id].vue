<template>
    <div>
      <h1>Receita com ID: {{ recipeId }}</h1>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";

  const route = useRoute();
  const recipeId = route.params.id;
  </script>
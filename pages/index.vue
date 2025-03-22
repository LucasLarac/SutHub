<template>
    <div class="h-screen flex  items-center flex-col">
      <h2 class="text-4xl mt-[40px] text-center mb-[20px]">Seja bem vindo(a) ao meu teste!</h2>
      <div class="h-[100vh] w-[100%] flex items-center justify-center gap-[30px]  flex-col md:flex-row ">
        <Card @click="goTo(o.page)" v-for="o in options" :key="o.id" :options="o" />
      </div>
    </div>
    
    </template>
    
    <script setup>
    import { onMounted } from "vue";
    import { useNuxtApp } from "#app";
    import Card from "~/components/Card.vue";
    import { useRouter } from "vue-router";
    import receitaImage from '@/assets/img/receitas.png';
    import cadastro from '@/assets/img/cadastro.png';
    import lista from '@/assets/img/lista.png';
    
    
    const { $axios } = useNuxtApp();
    const router = useRouter();
    
    const options = ref([
      {id: 1, name: 'Cadastro de usuário',  image: cadastro, page: 'cadastro'},
      {id: 2, name: 'Galeria de receitas',  image: receitaImage, page: 'receitas'},
      {id: 3, name: 'Lista de usuários',  image: lista, page: 'lista'}
    ])
    
    function goTo(page){
      router.push(page)
      
      console.log('oi')
    }
    
    
    const getRecipes = async () => {
      try {
        const response = await $axios.get('/recipes');
        console.log("Resposta:", response.data);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      }
    };
    
    onMounted(() => {
      getRecipes();
    });
    </script>
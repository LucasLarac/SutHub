<template>
    <div class="h-screen flex  items-center flex-col gap-10">
      <h2 class="text-4xl mt-[40px] text-center mb-[20px]">Seja bem vindo(a) ao meu teste!</h2>
      <section class="w-full flex items-center md:items-start md:justify-center gap-[30px] flex-col md:flex-row">
      <Card
        v-for="o in options"
        :key="o.id"
        :options="o"
        @click="goTo(o.page)"
        class="hover:scale-105 transition-transform duration-300"
      />
    </section>
    </div>
    
</template>
    
<script setup>
    useHead({ title: `Suthub - Teste`})

    import Card from "~/components/Card.vue";
    import { useRouter } from "vue-router";
    import receitaImage from '@/assets/img/receitas.png';
    import cadastro from '@/assets/img/cadastro.png';
    import lista from '@/assets/img/lista.png';
    
    
    const router = useRouter();
    
    const options = ref([
      {id: 1, name: 'Cadastro de usuário',  image: cadastro, page: 'cadastro'},
      {id: 2, name: 'Galeria de receitas',  image: receitaImage, page: 'receitas'},
      {id: 3, name: 'Lista de usuários',  image: lista, page: 'lista'}
    ])
    
    function goTo(page) {
      if (page) router.push({ path: `/${page}` });
    }
    

</script>
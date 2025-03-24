<template>
    <div class="h-screen flex flex-col items-center gap-2 overflow-auto">

        <Notification v-if="notificacao.mensagem" :notificacao="notificacao" />

        <div class="flax items-start justify-start mb-1  custompage lg:min-w-[700px] md:w-[500px] w-[250px] ">
            <button @click="router.back()" class="text-sm  text-black hover:text-blue-950">
            ← Voltar
        </button>
        </div>

        <FormUser v-if="!isFinished" @finalizar="finalizar"  class="pb-[150px]" />

        <ListUser v-else />


    </div>
</template>


<script setup>
useHead({ title: `Sethub - Cadastro`})
import { ref } from 'vue'
import FormUser from "~/components/Usuario/FormUser.vue";
import ListUser from "~/components/Usuario/ListUser.vue";
import { useRouter } from "vue-router";
import Notification from '~/components/Notification.vue';

const router = useRouter();
const isFinished = ref(true)
const notificacao = reactive({ mensagem: '', sucesso: 'sucesso' })



function finalizar(info){
    notificacao.mensagem = 'Usuário cadastrado com sucesso!'
    setTimeout(() => {
        notificacao.mensagem = ''
    }, 2300);
    isFinished.value = info
}

</script>


<style>



</style>
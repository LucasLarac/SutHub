<template>
    <div class="h-screen flex flex-col items-center gap-2 overflow-auto">

        <Notification v-if="notificacao.mensagem" :notificacao="notificacao" />

        <div class="flex items-start justify-start mb-1  custompage lg:min-w-[700px] md:w-[500px] w-[250px] ">
            <button @click="voltar()" class="text-sm  text-black hover:text-blue-950">
            ← Voltar
        </button>
        </div>

        <main v-if="!isFinished" class="flex flex-col items-center gap-2 min-h-screen py-10 px-4" aria-label="Cadastro de usuário">
            <FormUser @finalizar="finalizar"  class="pb-[150px]" />
        </main>
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
const isFinished = ref(false)
const notificacao = reactive({ mensagem: '', sucesso: 'sucesso' })

function voltar() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}

function finalizar(info){
    notificacao.mensagem = 'Usuário cadastrado com sucesso!'
    setTimeout(() => {
        notificacao.mensagem = ''
    }, 2300);
    isFinished.value = info
}

</script>


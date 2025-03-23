<template>
    <div class="h-screen  mt-[40px] flex flex-col items-center gap-2">


        <div class="flax items-start justify-start mb-1 mx-[1%] custompage w-[48%] ">
            <button @click="router.back()" class="text-sm  text-black hover:text-blue-950">
            ← Voltar
        </button>
        </div>

        <FormUser v-if="!isFinished" @finalizar="finalizar"  />

        <ListUser v-else />


    </div>
</template>


<script setup>
useHead({ title: `Sethub - Cadastro`})
import { ref } from 'vue'
import FormUser from "~/components/Usuario/FormUser.vue";
import ListUser from "~/components/Usuario/ListUser.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isFinished = ref(false)

function finalizar(info){
    isFinished.value = info
}

</script>


<style>

</style>
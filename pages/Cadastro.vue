<template>
    <div class="h-screen  mt-[40px] flex flex-col items-center gap-10">

        <FormUser v-if="!isFinished" @finalizar="finalizar"  />

        <ListUser v-else />


    </div>
</template>


<script setup>
useHead({ title: `Sethub - Cadastro`})
import { ref } from 'vue'
import FormUser from "~/components/Usuario/FormUser.vue";
import ListUser from "~/components/Usuario/ListUser.vue";

const isFinished = ref(false)

function finalizar(info){
    isFinished.value = info
}

</script>


<style>

</style>
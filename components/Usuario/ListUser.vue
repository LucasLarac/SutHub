<template>
    <div class="flex flex-col text-center gap-5">
        <div class="rounded-xl bg-white p-5 flex flex-col text-center gap-5 border-2 border-gray-300 lg:min-w-[700px] w-[700px]">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-gray-100 rounded-md p-2 flex flex-col text-start" v-for="(value, key) in usuario" :key="key">
                <div class="flex flex-col" v-show="value !== ''">
                    <label class="font-bold">{{formatTitulo(key)}}:</label>
                    <label>{{value}}</label>
                </div>
            </div>
        </div>

        <button @click="goMenu()">Voltar ao menu</button>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useUserStore } from '@/stores/useUser'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const usuario = reactive({})

onMounted(() => {
  console.log('Usuário atual:', userStore.user)
  Object.assign(usuario, userStore.user || {})
})

function goMenu(){
    router.push('/')
}

function formatTitulo(str) {
    const nomeFormatado = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    return nomeFormatado
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


</script>



<style></style>
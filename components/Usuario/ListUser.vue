<template>
    <div class="flex flex-col text-center gap-5 w-[90%] lg:w-[700px] pb-[100px] overflow-auto md:w-[90%] h-full">
        <div class="rounded-xl bg-white p-5 flex flex-col text-center gap-5 border-2 border-gray-300 w-full">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class=" rounded-md p-2 flex flex-col text-start" v-for="(value, key) in usuario" :key="key">
                <div class="flex flex-col" v-show="value !== ''">
                    <label class="font-bold">{{formatTitulo(key)}}:</label>
                    <label>{{value}}</label>
                </div>
            </div>
        </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useUserStore } from '@/stores/useUser'
import { useRouter } from 'vue-router'
import {capitalizeAllFirstLetter, formatCpf, validateFullName, validateCpf, validateBirthDate, formatPhone, formatCep, formatCurrency } from '@/composables/functions'

const router = useRouter()
const userStore = useUserStore()
const usuario = reactive({})

onMounted(() => {
  Object.assign(usuario, userStore.user || {})
  formatInfo()
})

function goMenu(){
    router.push('/')
}

function formatInfo(){
    usuario.dataAniversario = formatDate(usuario.dataAniversario)
    usuario.cpf = formatCpf(usuario.cpf)
    usuario.renda = formatCurrency(usuario.renda)
    usuario.celular = formatPhone(usuario.celular)
    usuario.cep = formatCep(usuario.cep)
    usuario.nomeCompleto = capitalizeAllFirstLetter(usuario.nomeCompleto)
    usuario.possuiCarro = usuario.temCarro ? 'Sim' : 'Não'
     delete usuario.temCarro
    usuario.animalSelecionado = usuario.animalselected
     delete usuario.animalselected
     if(!usuario.outraRaca){
        delete usuario.outraRaca
     }
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
<template>
<div class="flex flex-col text-center gap-5 w-full max-w-5xl h-full">
    <div class="rounded-xl bg-white p-5 flex flex-col text-center gap-5 border-2 border-gray-300 lg:min-w-[700px] ">
            <h1 class="text-4xl">Formulário</h1>

            <form @submit.prevent="validateSubmit()">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
                    <BaseInput :error="erros.nomeCompleto" v-model="form.nomeCompleto" label="Nome completo" required />
                    <BaseInput :error="erros.cpf" v-model="form.cpf" label="CPF" required inputmode="numeric"
                        @input="form.cpf = formatCpf(form.cpf)" :maxlength="14" />
                    <BaseInput :error="erros.dataAniversario" class="min-w[100%] min-h-[49px] md:min-h-auto min-w-auto"
                        v-model="form.dataAniversario" label="Data de nascimento" type="date" required />
                    <BaseInput :error="erros.celular" v-model="form.celular" label="Celular" type="text"
                        inputmode="numeric" required @input="form.celular = formatPhone(form.celular)" />

                    <div>
                        <BaseInput :error="erros.cep" v-model="form.cep" label="CEP" type="text" inputmode="numeric"
                            required @input="form.cep = formatCep(form.cep)" />
                        <p v-show="form.rua">{{ form.rua }}, {{ form.bairro }}, {{ form.cidade }} - {{ form.uf }}</p>
                    </div>

                    <BaseInput :error="erros.renda" v-model="form.renda" label="Renda mensal" type="text"
                        inputmode="numeric" required @input="form.renda = formatCurrency(form.renda)" />



                    <div class="flex flex-col gap-2">
                        <label class="font-medium text-start w-full">Selecione um animal:</label>
                        <div class="flex gap-4 justify-start">
                            <label class="flex items-center gap-1">
                                <input type="radio" name="animal" value="Cachorro" v-model="form.animalselected" />
                                Cachorro
                            </label>

                            <label class="flex items-center gap-1">
                                <input type="radio" name="animal" value="Gato" v-model="form.animalselected" />
                                Gato
                            </label>
                        </div>
                        <p v-if="erros.animalselected" class="text-red-500 text-xs mt-1 text-start w-full">{{ erros.animalselected }}</p>
                    </div>

                    <ListBox :disabled="!form.animalselected"  :error="erros.raca" v-model="form.raca" :options="form.animalselected == 'Gato' ?  racasGato : racasCao"
                        :placeholder="form.raca ? 'Selecione a raça ' : 'Selecione a raça ▼'" />

                    <BaseInput :error="erros.outraRaca" v-model="form.outraRaca" v-if="form.raca == 'Outros'"
                        v-show="!isDesktop" label="Qual?" type="text" />


                    <div class="flex gap-2 items-center flex-col justify-start">
                        <div class="flex gap-2 w-full">
                            <button @click="showModal = true" title="Porque precisamos desta informação?" class="text-blue-600 border-2 border-blue-600 text-sm flex 
                            items-center justify-center rounded-full w-[20px] h-[20px]"> ?
                            </button>
                            <span>Possui carro?</span>

                        </div>
                        <div class="flex gap-2 items-center justify-start w-full">
                            <span :class="form.temCarro ? 'text-gray-500' : 'text-red-600 font-bold'">Não</span>
                            <Toggle v-model="form.temCarro" label="" />
                            <span :class="form.temCarro ? 'text-green-600 font-bold' : 'text-gray-500'">Sim</span>

                        </div>
                        <p v-if="erros.temcarro" class="text-red-500 text-xs mt-1 text-start w-full">{{ erros.temcarro }}</p>

                    </div>

                    <BaseInput :error="erros.outraRaca" v-model="form.outraRaca" v-if="form.raca == 'Outros'"
                        v-show="isDesktop" label="Qual?" type="text" />


                    <Dialog v-model="showModal" title="Por que perguntamos isso?">
                        <p>
                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem
                            ipsumLorem ipsum Lorem ipsum.
                        </p>
                    </Dialog>

                </div>
                <div class="flex items-center justify-center">
                    <SendButton type="submit" mensagem="Enviar" />
                </div>

            </form>




        </div>

    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BaseInput from '../BaseInput.vue'
import {capitalizeAllFirstLetter, formatCpf, validateFullName, validateCpf, validateBirthDate, formatPhone, formatCep, formatCurrency } from '@/composables/functions'
import Toggle from '../Headless/Toggle.vue'
import Dialog from '../Headless/Dialog.vue';
import ListBox from '../Headless/ListBox.vue';
import SendButton from '../Buttons/SendButton.vue';
import { useUserStore } from '@/stores/useUser'
const isDesktop = ref(false);

onMounted(() => {
    const checkSize = () => {
        isDesktop.value = window.innerWidth >= 768;
    };
    checkSize();
    window.addEventListener('resize', checkSize);
});

const emit = defineEmits(["update:modelValue", "finalizar"]);
const erros = reactive({
    nomeCompleto: '',
    cpf: '',
    dataAniversario: '',
    celular: '',
    cep: '',
    renda: '',
    temcarro: '',
    animalselected: '',
    raca: '',
})

function sendInfo() {
    emit('finalizar', true)
}
const userStore = useUserStore()
const showModal = ref(false)
const { $axios } = useNuxtApp();

const racasCao = ref(['Lhasa Apso', 'Pitbull', 'Pastor Alemão', 'Poodle', 'Vira Lara', 'Outros'])
const racasGato = ref(['Siamês', 'Persa', 'Maine Coon', 'Sphynx', 'British Shorthair', 'Outros'])

const form = reactive({
    nomeCompleto: '',
    cpf: null,
    dataAniversario: '',
    celular: null,
    cep: null,
    uf: '',
    cidade: '',
    bairro: '',
    rua: '',
    renda: null,
    temCarro: false,
    animalselected: '',
    raca: '',
    outraRaca: '',
})

const semformatacao = reactive({
    celular: '',
    cpf: '',
    renda: null,
    cep: '',
})

function validateSubmit() {

    semformatacao.renda = form.renda ? parseFloat(form.renda.replace("R$", "").replace(/\./g, "").replace(",", ".")) : 0;


    erros.nomeCompleto = !validateFullName(form.nomeCompleto) ? 'Necessário informar o nome completo.' : ''
    erros.cpf = !validateCpf(form.cpf) ? 'Digite um CPF válido.' : ''
    erros.dataAniversario = !validateBirthDate(form.dataAniversario) ? 'A idade deve estar entre 18 e 65 anos.' : ''
    erros.celular = (form.celular.length <= 15) ? 'Digite um número válido.' : ''
    erros.cep = !form.uf ? 'Digite um CEP válido.' : ''
    erros.renda = (semformatacao.renda < 1000) ? 'A renda deve ser superior a R$1000,00.' : ''
    erros.raca = !form.raca || (form.raca === 'Outros' && !form.outraRaca) ? 'Selecione a espécie.' : ''
    erros.temcarro = !form.temCarro ? 'Obrigatório possuir um carro.' : ''
    erros.animalselected = !form.animalselected ? 'Obrigatório selecionar um animal.' : ''


    const hasErro = Object.values(erros).some(e => e !== '');
    if (!hasErro) {
        submitForm();
    }




}

const submitForm = async () => {


    let dados = { ...form }
    dados.celular = form.celular.replace(/\D/g, '')
    dados.cep = form.cep.replace(/\D/g, '')
    dados.cpf = form.cpf.replace(/\D/g, '')
    dados.renda = form.renda.replace(/\D/g, '')
    if(form.raca != 'Outros'){
        form.outraRaca = null
    }
    userStore.setUser(dados)
    sendInfo()
}

const getCep = async (cep) => {
    try {
        const resp = await $axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if (resp.data.erro) {
            form.uf = ''
            form.cidade = ''
            form.bairro = ''
            form.rua = ''
        } else {
            form.uf = resp.data.uf
            form.cidade = resp.data.localidade
            form.bairro = resp.data.bairro
            form.rua = resp.data.logradouro
        }
    }
    catch (error) {
        console.log(error)
    }
}

watch(() => form.animalselected, () => {
    form.raca = null
})

watch(() => form.cep, (novoCep) => {
    const cepLimpo = novoCep.replace(/\D/g, '')
    if (cepLimpo.length === 8) {
        getCep(cepLimpo)
    }
})



</script>



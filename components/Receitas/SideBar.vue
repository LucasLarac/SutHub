<template>
    <div class="min-h-screen flex bg-gray-100">

        <div class="w-full p-4 bg-white rounded-md overflow-y-auto scrollbar-custom lg:h-[1050px] md:h-[1710px]  ">
            <button
  v-show="showScrollTop"
  @click="scrollToTop"
  class="fixed bottom-6 right-6 bg-green-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-800 transition md:hidden z-50"
>
  ↑ Topo
</button>
            <div class="flex items-center justify-between md:justify-center mb-4">
                <h3 class="text-lg font-semibold">Filtrar por Tags</h3>
                <button @click="fechar()" class="underline cursor-pointer md:hidden">Fechar</button @click="fechar()">
            </div>
            <BaseInput class="md:mb-0" v-model="searchTag" label="Pesquisar" required />
            <div class="flex justify-between items-center mb-3 md:mb-0">
                <button @click="clearFiltered()"
                    class="text-black font-bold text-xs underline flex justify-end cursor-pointer"
                    :style="{ visibility: (searchTag !== '' || selectedTags.length > 0) ? 'visible' : 'hidden' }">
                    Limpar filtro
                </button>
                <button class="bg-[#9EEFB999] px-3 py-1 rounded-md md:invisible" @click="fechar()">Buscar</button>
            </div>
            <div v-if="isLoading" class="flex justify-center">
                <Loader />
            </div>
            <div v-else-if="filterTag.length > 0">
                <div v-for="(tag, index) in filterTag" :key="index" class="flex flex-col gap-1 mb-2 cursor-pointer">
                    <div class="flex flex-col md:inline-flex justify-between">
                        <div class="flex items-center">
                            <input type="checkbox" :id="tag" :value="tag" v-model="selectedTags"
                                class="mr-2 cursor-pointer custom-checkbox" @click="handleDisabledClick(tag)" />
                            <label :for="tag" class="text-lg">{{ tag }}</label>
                        </div>
                        <span v-if="erro && erroTag === tag" class="text-red-500 font-bold text-xs ml-6">
                            Permitido filtrar apenas 2 tag's
                        </span>
                    </div>
                </div>

            </div>
            <label v-else class="text-lg">Nenhuma tag com este nome</label>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from "vue-router";
import Loader from '../Loader.vue';
import BaseInput from '../BaseInput.vue';
const emit = defineEmits(['update:tags'])

const selectedTags = ref([])
const searchTag = ref('')
const erro = ref(false)
const erroTag = ref('');

watch(selectedTags, (newTags) => {
    emit('update:tags', newTags)
})

const showScrollTop = ref(false);

function scrollToTop() {
  const container = document.querySelector('.scrollbar-custom');
  container?.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  const container = document.querySelector('.scrollbar-custom');
  if (container) {
    container.addEventListener('scroll', () => {
      showScrollTop.value = container.scrollTop > 200;
    });
  }
});


function fechar() {
    emit('fecharform')
}

function handleDisabledClick(tag) {
    if (selectedTags.value.length >= 2 && !selectedTags.value.includes(tag)) {
        erro.value = true;
        erroTag.value = tag;
        setTimeout(() => {
            erro.value = false
            erroTag.value = '';
        }, 4000);
        event.preventDefault();
    }
}

const clearFiltered = () => {
    selectedTags.value = [];
    searchTag.value = '';
    refetch();
};


const filterTag = computed(() => {
    if (!tags.value || !searchTag.value) {
        return tags.value || [];
    }
    return tags.value.filter(tag => {
        return tag.toLowerCase().includes(searchTag.value.toLowerCase());
    });
});

const { data: tags, isLoading } = useQuery(
    ['tags'],
    async () => {
        const response = await $axios.get('recipes/tags');
        return response.data.sort((a, b) => a.localeCompare(b));
    },
    {
        staleTime: Infinity,
    }
);

</script>


<style>
.scrollbar-custom::-webkit-scrollbar {
    width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-track {
    background: gray;
    border-radius: 10px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
    background: #42c563;
    border-radius: 10px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: #42c563;
}
</style>
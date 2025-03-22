<template>
    <div class="min-h-screen flex bg-gray-100">
        <div class="w-1/4 p-4 bg-white rounded-md overflow-y-auto scrollbar-custom lg:h-[1050px] ">
            <div class="flex items-center justify-end mb-1">
                <span class="underline cursor-pointer lg:hidden">Fechar</span>
            </div>
            <div class="flex items-center justify-center mb-4">
                <h3 class="text-lg font-semibold">Filtrar por Tags</h3>
            </div>
            <BaseInput v-model="searchTag" label="Pesquisar" required />
            <span class="text-red-500 font-bold text-xs" :style="{ visibility: erro ? 'visible' : 'hidden' }">Permitido
                filtrar apenas 2 tag's</span>
            <span @click="clearFiltered()" class="text-black font-bold text-xs underline flex justify-end cursor-pointer"
                :style="{ visibility: (searchTag !== '' || selectedTags.length > 0) ? 'visible' : 'hidden' }">
                Limpar filtro
            </span>
            <div v-if="isLoading" class="flex justify-center">
                <Loader />
            </div>
            <div v-else-if="filterTag.length > 0">
                <div v-for="(tag, index) in filterTag" :key="index" class="flex items-center mb-2 cursor-pointer">
                    <input type="checkbox" :id="tag" :value="tag" v-model="selectedTags"
                        class="mr-2 cursor-pointer custom-checkbox" @click="handleDisabledClick(tag)" />
                    <label :for="tag" class="text-lg">{{ tag }}</label>
                </div>
            </div>
            <label v-else class="text-lg">Nenhuma tag com este nome</label>
        </div>

        <div class="w-3/5 p-4">

            <div class="mb-5 bg-[#9EEFB999] py-2 px-5 rounded-lg flex justify-between items-center ">
                <h1 class="text-center text-3xl text-black">
                    Receitas!
                </h1>
                <span>Total: <strong>{{ total }}</strong></span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-9 gap-y-5 pb-10 w-[100%]">
                <div v-for="r in recipes" :key="r.id" class="w-[100%]">
                        <Card @click="goToRecipe(r.id)" :receita="r" />
                </div>
            </div>

            <div class="flex justify-end gap-5">
                <button @click="backPage()" :style="{ visibility: skip > 0 ? 'visible' : 'hidden' }"
                    class="btn-change-page">Voltar</button>
                <button @click="nextPage()" :style="{ visibility: total != skip + qtdLimit ? 'visible' : 'hidden' }"
                    class="btn-change-page">Próximo</button>
            </div>

        </div>


    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import BaseInput from '~/components/BaseInput.vue'
import Loader from '~/components/Loader.vue'
import { useRouter } from "vue-router";
import Card from '~/components/Card.vue';

const { $axios } = useNuxtApp()
const router = useRouter();

const selectedTags = ref([])
const searchTag = ref('')
const limit = ref('12')
const skip = ref(0)
const isLoading = ref(false)
const total = ref(0)
const erro = ref(false)
const qtdLimit = ref(0)

const nextPage = async () => {
    skip.value = skip.value + 12;
    await refetch()
}

const backPage = async () => {
    skip.value = skip.value - 12;
    await refetch()
}

function goToRecipe(id){
    router.push(`Receitas/${id}`)
}

function clearFiltered (){
    selectedTags.value = []
    searchTag.value = ''
}

function handleDisabledClick(tag) {
    if (selectedTags.value.length >= 2 && !selectedTags.value.includes(tag)) {
        erro.value = true;
        setTimeout(() => {
            erro.value = false;
        }, 4000);
        event.preventDefault();
    }
}

const { data: tags } = useQuery(['tags'], async () => {
    isLoading.value = true
    const response = await $axios.get('recipes/tags')
    isLoading.value = false
    return response.data.sort((a, b) => a.localeCompare(b))
}, {
    staleTime: Infinity,
})

const { data: recipes, refetch } = useQuery(
  ['recipes', selectedTags], 
  async () => {
    let url = 'recipes';  
    const params = {
      limit: limit.value,
      skip: skip.value
    };

    if (selectedTags.value.length > 0) {
      const tagRequests = selectedTags.value.map(tag => 
        $axios.get(`recipes/tag/${tag}`, { params })
      );

      const responses = await Promise.all(tagRequests);

      let combinedRecipes = responses[0].data.recipes;

      selectedTags.value.forEach((_, index) => {
        if (index > 0) {
          combinedRecipes = combinedRecipes.filter(recipe => 
            responses[index].data.recipes.some(filteredRecipe => filteredRecipe.id === recipe.id)
          );
        }
      });
      total.value = responses[0].data.total;
      qtdLimit.value = responses[0].data.limit;

      return combinedRecipes;
    } else {
      const response = await $axios.get(url, { params });
      total.value = response.data.total;
      qtdLimit.value = response.data.limit;
      return response.data.recipes;
    }
  },
  {
    staleTime: 6000,  
  }
);








const filterTag = computed(() => {
    if (!tags.value || !searchTag.value) {
        return tags.value || [];
    }
    return tags.value.filter(tag => {
        return tag.toLowerCase().includes(searchTag.value.toLowerCase());
    });
});



</script>

<style scoped>
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

.btn-change-page {
    background-color: #9EEFB999;
    padding: 3px;
    width: 120px;
    height: 35px;
    border-radius: 5px;
    font-size: 16px;
}

.btn-change-page:hover {
    background-color: #9eefb9;
    font-size: 17px;
}

.custom-checkbox {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #4caf50;
    border-radius: 4px;
    background-color: #fff;
    position: relative;
    font-size: 18px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.custom-checkbox:checked {
    background-color: #4caf50;
    border-color: #4caf50;
}

.custom-checkbox:checked::after {
    content: '✔';
    position: absolute;
    left: 2px;
    top: -5px;
    font-size: 18px;
    color: white;
}

.custom-checkbox:not(:checked)::after {
    content: none;
}
</style>
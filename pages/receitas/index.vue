<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">

        <div class="flax items-start justify-start mb-5">
            <button @click="router.back()" class="text-sm  text-black hover:text-blue-950">
            ← Voltar
        </button>
        </div>

        <div class="flex">

            <!-- mob -->
            <div class="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden mt-50px" v-if="isSidebarOpen"
                @click.self="isSidebarOpen = false">
                <div class="w-4/5 bg-white h-full p-4 transition-transform transform"
                    :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
                    <SideBar @update:tags="handleUpdatedTags" @fecharform="fecharform" />
                </div>
            </div>
            <!-- desk -->
            <div class="hidden md:block md:w-2/5 lg:w-1/4">
                <SideBar @update:tags="handleUpdatedTags" />
            </div>

            <div v-if="isLoading" class="flex justify-center w-full items-start">
                <Loader />
            </div>

            <div v-else class="md:w-3/5 w-[100%] p-4 pt-0 ">

                <div class="mb-5  pb-2 rounded-lg flex justify-between items-center ">
                    <h1 class="text-center text-3xl text-black">
                        Receitas
                    </h1>
                    <span class="md:visible invisible">Total: <strong>{{ total }}</strong></span>
                    <button @click="toggleSidebar"
                        class="md:hidden bg-[#9EEFB999] px-3 py-1 rounded-md bolde">Filtrar</button>
                </div>

                <div v-if="total > 0" class="grid grid-cols-1 md:grid-cols-2 md2:grid-cols-2 xl:grid-cols-3 gap-5 pb-10 w-[100%]">
                    <div v-for="r in recipes" :key="r.id" class="w-[100%] flex justify-center">
                        <Card @click="goToRecipe(r.id)" :receita="r" />
                    </div>
                </div>
                <div v-else>
                <P> Nenhuma receita encontrada com  {{  selectedTags.length === 1  ? selectedTags[0] : selectedTags.length >= 2
                    ? `${selectedTags[0]} e ${selectedTags[1]}` : ''  }}</P>

                    <!-- <button @click="limparfiltro()" class="underline mt-5 ">Limpar filtro</button> -->
                </div>

                <div class="flex justify-end gap-5">
                    <button @click="backPage()" :style="{ visibility: skip > 0 ? 'visible' : 'hidden' }"
                        class="btn-change-page">Voltar</button>
                    <button @click="nextPage()" :style="{ visibility: total > 12 ? 'visible' : 'hidden' }"
                        class="btn-change-page">Próximo</button>
                </div>

            </div>



        </div>


    </div>
</template>

<script setup>
useHead({ title: `Sethub - Receitas` })

import { ref, watch, onMounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from "vue-router";
import Card from '~/components/Receitas/Card.vue';
import SideBar from '~/components/Receitas/SideBar.vue'
import Loader from '~/components/Loader.vue';

const { $axios } = useNuxtApp()
const router = useRouter();

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}



const selectedTags = ref([])
watch(selectedTags, (newTags) => {
  localStorage.setItem('selectedTags', JSON.stringify(newTags));
});

onMounted(() => {
  const savedTags = localStorage.getItem('selectedTags');
  if (savedTags) {
    selectedTags.value = JSON.parse(savedTags);
    refetch();
  }
});

const limit = ref('12')
const skip = ref(0)
const total = ref(0)
const qtdLimit = ref(0)



const nextPage = async () => {
    skip.value = skip.value + 12;
    await refetch()
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const backPage = async () => {
    skip.value = skip.value - 12;
    await refetch()
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToRecipe(id) {
    router.push(`Receitas/${id}`)
}

function fecharform() {
    isSidebarOpen.value = false
}



watch(selectedTags, async () => {
    await refetch();
});

const handleUpdatedTags = async (tags) => {
    skip.value = 0
    selectedTags.value = tags
    await refetch();
}



const { data: tags } = useQuery(
    ['tags'],
    async () => {
        const response = await $axios.get('recipes/tags');
        return response.data.sort((a, b) => a.localeCompare(b));
    },
    {
        staleTime: Infinity,
    }
);

const { data: recipes, isLoading, refetch } = useQuery(
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

            total.value = combinedRecipes.length;
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
        staleTime: 0,
    }
);



</script>

<style scoped>
.btn-change-page {
    background-color: #166534;
    padding: 3px;
    width: 120px;
    height: 35px;
    border-radius: 5px;
    font-size: 16px;
    color: white;
    letter-spacing: 1px;
}

.btn-change-page:hover {
    background-color: #00a03d;
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
<template>
    <div class="min-h-screen flex bg-gray-100">

        <!-- mob -->
        <div class="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" v-if="isSidebarOpen"
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

        <div class="md:w-3/5 p-4">

            <div class="mb-5  py-2 px-5 rounded-lg flex justify-between items-center ">
                <h1 class="text-center text-3xl text-black">
                    Receitas!
                </h1>
                <span class="md:block invisible">Total: <strong>{{ total }}</strong></span>
                <button @click="toggleSidebar" class="md:invisible bg-[#9EEFB999] px-3 py-1 rounded-md bolde">Filtrar</button>
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
useHead({ title: `Sethub - Receitas` })

import { ref, computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from "vue-router";
import Card from '~/components/Receitas/Card.vue';
import SideBar from '~/components/Receitas/SideBar.vue'

const { $axios } = useNuxtApp()
const router = useRouter();

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const selectedTags = ref([])
const limit = ref('12')
const skip = ref(0)
const total = ref(0)
const qtdLimit = ref(0)

const nextPage = async () => {
    skip.value = skip.value + 12;
    await refetch()
}

const backPage = async () => {
    skip.value = skip.value - 12;
    await refetch()
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
    selectedTags.value = tags
    await refetch();
}


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
        staleTime: 6000,
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
<template>
  <div class="min-h-[100vh] ">
    <div v-if="!isLoading" class="">

      <div class="flax items-start justify-start mb-5 mx-[1%] custompage">
        <button @click="router.back()" class="text-sm  text-black hover:text-blue-950">
          ← Voltar
        </button>
      </div>

      <div class="flex justify-start  mx-[1%] items-end flex-col md:flex-row md:justify-between">
        <BaseInput class=" w-[100%] md:w-[300px] mb-0" v-model="searchUser" label="Pesquisar" />
        <span>Total: {{ total }}</span>
      </div>
      <div v-if="user.length > 0" class="overflow-x-auto flex  justify-center flex-col mx-[1%]">
        <table class="min-w-[80%] text-sm text-left text-gray-700 border border-gray-300">
          <thead class=" text-xs uppercase font-medium">
            <tr>
              <th class="px-4 py-3 border-b"><span class="invisible">foto</span></th>
              <th class="px-4 py-3 border-b">Nome</th>
              <th class="px-4 py-3 border-b text-center">Data de nascimento</th>
              <th class="px-4 py-3 border-b text-center">Gênero</th>
              <th class="px-4 py-3 border-b">Localização</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in user" :key="u.id" class="hover:bg-gray-100 h-[50px]">
              <td class="px-4 py-2 border-b rounded-full w-[15px]"><img :src="u.image" alt=""></td>
              <td class="px-4 py-2 border-b">{{ u.firstName + ' ' + u.maidenName + " " + u.lastName }}</td>
              <td class="px-4 py-2 border-b text-center">{{ formatDate(u.birthDate) }}</td>
              <td class="px-4 py-2 border-b text-center">{{ u.gender == 'female' ? 'Feminino' : 'Masculino' }}</td>
              <td class="px-4 py-2 border-b flex gap-1 items-center cursor-pointer"> <a
                  :href="`https://www.google.com/maps?q=${u.address.coordinates.lat},${u.address.coordinates.lng}`"
                  target="_blank" rel="noopener noreferrer">
                  {{ `${u.address.address}, ${u.address.city} ${u.address.stateCode} - ${u.address.country}` }}</a>
                <img src="../../assets/img/link.png" alt="compartilhar" class="w-[15px] h-[15px]">
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-end gap-5 mt-5">
          <button @click="backPage()" :style="{ visibility: skip > 0 ? 'visible' : 'hidden' }"
            class="btn-change-page bg-green-600 text-white">Voltar</button>
          <button @click="nextPage()" :style="{ visibility: total != skip + limit ? 'visible' : 'hidden' }"
            class="btn-change-page bg-green-600 text-white">Próximo</button>
        </div>


      </div>

      <div v-else class="flex justify-center text-xl text-red-700 w-full">
        <span>Nenhum usuário encontrado!</span>
      </div>

    </div>



    <div v-else class="flex justify-center w-full items-start">
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import BaseInput from '~/components/BaseInput.vue';
import Loader from '~/components/Loader.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const limit = ref(0)
const skip = ref(0)
const total = ref(0)
const searchUser = ref('')

const { $axios } = useNuxtApp()

const nextPage = async () => {
  skip.value = skip.value + 20;
  await refetch()
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const backPage = async () => {
  skip.value = skip.value - 20;
  await refetch()
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


const fetchUsers = async () => {
  const params = {
    limit: 20,
    skip: skip.value
  };

  let url = 'users?sortBy=firstName&order=asc';
  if (searchUser.value) {
    url = `users/search?q=${searchUser.value}&sortBy=firstName&order=asc`;
  }

  const response = await $axios.get(url, { params });
  total.value = response.data.total;
  limit.value = response.data.limit
  console.log(response.data)
  return response.data.users;
};

const { data: user, isLoading, refetch } = useQuery(
  ['user'],
  fetchUsers,
  {
    enabled: true,
    staleTime: 0,
  }
);


let debounceTimer;

watch(searchUser, () => {
  clearTimeout(debounceTimer);
  skip.value = 0
  debounceTimer = setTimeout(() => {
    refetch();
  }, 500);
});


</script>


<style>
.btn-change-page {
  padding: 3px;
  width: 120px;
  height: 35px;
  border-radius: 5px;
  font-size: 16px;
}

.btn-change-page:hover {
  background-color: white;
  color: green;
  border: 2px solid green;
  font-size: 17px;
}
</style>
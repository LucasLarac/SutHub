<template>
    <div>
      <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center justify-between px-6">

        <NuxtLink to="/" class="text-green-600 hover:text-green-700 transition">Home</NuxtLink>
  
        <nav class="flex gap-6">
          
          <NuxtLink to="/cadastro" class="text-gray-700 hover:text-green-600 transition">Cadastro</NuxtLink>
          <NuxtLink to="/receitas" class="text-gray-700 hover:text-green-600 transition">Receitas</NuxtLink>
          <NuxtLink to="/lista" class="text-gray-700 hover:text-green-600 transition">Lista</NuxtLink>
        </nav>
      </header>
  
      <div class="pt-20">
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  </style>
  
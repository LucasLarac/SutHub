<template>
    <div>
      <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center justify-between px-6">
        <button @click="abrirMenu" class="text-green-600 font-bold text-lg">
          ☰ Menu
        </button>
  
        <nav class="flex gap-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-green-600 transition">Home</NuxtLink>
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
  function abrirMenu() {
    console.log('Abrir menu clicado')
  }
  </script>
  
  <style scoped>
  </style>
  
<template>
  <div :class="['mensagem', mostrar && 'descer', notificacao.sucesso == 'sucesso' ? 'mensagem-sucesso' : notificacao.sucesso == 'informar' ? 'mensagem-informar' : 'mensagem-erro']">
    <p style="margin: 0;">{{ notificacao.mensagem }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  notificacao: {
    type: Object,
    required: true
  }
})

const mostrar = ref(false)

onMounted(() => {
  setTimeout(() => {
    mostrar.value = true
  }, 1)

  setTimeout(() => {
    mostrar.value = false
  }, 3000)
})
</script>

<style scoped>
.mensagem {
  position: fixed;
  min-width: 20%;
  left: 0;
  height: 50px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  top: -35px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  transition: top 0.5s ease-out, opacity 0.5s ease-out;
  opacity: 0;
}

/* Animação ao aparecer */
.mensagem.descer {
  top: 10px;
  opacity: 1;
}

/* Cores por tipo de notificação */
.mensagem-sucesso {
  background-color: #549864;
  color: white;
}

.mensagem-informar {
  background-color: #525252bb;
  color: black;
}

.mensagem-erro {
  background-color: rgba(216, 19, 19, 0.872);
  color: white;
}
</style>

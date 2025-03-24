<template>
<div class="mensagem" :class="notificacao.sucesso === 'sucesso' 
    ? 'sucesso' 
    : notificacao.sucesso === 'erro' 
    ? 'erro' 
    : 'informar'">    <p style="margin: 0;">{{ notificacao.mensagem }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  notificacao: {
    type: Object,
    required: true
  }
})


</script>

<style>
.mensagem {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 9999;
}



.sucesso {
  background-color: #549864;
  color: white;
  
}

.informar {
  background-color: #525252bb;
  color: black;
}

.erro {
  background-color: rgba(216, 19, 19, 0.872);
  color: white;
}
</style>
import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia()
  pinia.use(piniaPersist)  // Ativa a persistência
  nuxtApp.vueApp.use(pinia)
})

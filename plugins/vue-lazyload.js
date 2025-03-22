import VueLazyload from 'vue-lazyload';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueLazyload, {
    loading: '', 
    error: '', 
    attempt: 1, 
  });
});

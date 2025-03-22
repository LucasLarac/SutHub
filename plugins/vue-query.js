import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

export default defineNuxtPlugin(nuxtApp => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, 
        refetchOnWindowFocus: false, 
        staleTime: 60000, 
      },
    },
  });

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });
});

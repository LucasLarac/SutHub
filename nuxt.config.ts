export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  plugins: ['~/plugins/vue-query.js'],
    runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL, 
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "2025-03-19",
});

// https://v3.nuxtjs.org/api/configuration/nuxt.config
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
    modules: [
      '@nuxt/image-edge'
    ],
    css: ['~/assets/css/main.css', '~/assets/css/global.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    typescript: {
      strict: true,
      typeCheck: true
    },
    routeRules: {
      '' : {cors:true},
      '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
      '/[type]/play/**': {ssr: false}
    },

    components: true,

    runtimeConfig: {
      // Private keys are only available on the server
      apiKey: process.env.API_KEY,
    },

  
})

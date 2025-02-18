import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import CustomButton from './components/Custom/CustomButton.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
      darkModeSelector: 'system',
    },
  },
})

app.component('CustomButton', CustomButton)

app.use(ToastService)

app.mount('#app')

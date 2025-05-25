import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import Notifier from './plugins/notifier'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/style.css'

const app = createApp(App)

app.use(createPinia()).use(router).use(Notifier).mount('#app')

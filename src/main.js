import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import App from './App.vue'
import router from './router'
import { createPinia } from 'https://unpkg.com/pinia@2.1.7/dist/pinia.esm-browser.js';
import Antd from 'https://unpkg.com/ant-design-vue@4.0.8/dist/antd.esm.js';
// import 'ant-design-vue/dist/reset.css';
const app = createApp(App)
const pinia = createPinia()
app.use(Antd)
app.use(pinia)
app.use(router)

app.mount('#app')

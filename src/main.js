import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { router } from './common/router'
import { createPinia } from 'pinia'
import axios from 'axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './assets/style.css'

// 服务端地址
axios.defaults.baseURL = 'http://localhost:8080'

const app = createApp(App)

// 全局提供属性
app.provide('axios', axios)

app.provide('server_url', axios.defaults.baseURL)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

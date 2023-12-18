import { createApp } from 'vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import plugins from './plugins' // plugins

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(Antd)
app.use(plugins)

app.mount('#app')
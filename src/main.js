import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
const app = createApp(App)
app.config.globalProperties.$http = axios

app.config.globalProperties.$moment = moment;

app.use(store).use(router).use(ViewUIPlus).mount('#app')

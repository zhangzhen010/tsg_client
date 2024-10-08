import './assets/css/base.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(router).use(vue3GoogleLogin, {
  clientId: '753235075367-ojfpmgrnold60alog8r8bfapt21k2aut.apps.googleusercontent.com'
})

app.mount('#app')

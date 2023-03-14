import { createApp } from 'vue'
//? import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { components } from './components/UI';
import store from './store';

import './assets/main.css'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component); //* - Регистрация с объектом настроек. Первый аргумент - название компонента; второй аргумент - сам компонент.
});

//? app.use(createPinia())
app.use(store)
app.use(router)

app.mount('#app')

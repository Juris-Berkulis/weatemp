import { createApp } from 'vue'
//? import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { components } from './components/UI';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component); //* - Регистрация с объектом настроек. Первый аргумент - название компонента; второй аргумент - сам компонент.
});

//? app.use(createPinia())
app.use(router)

app.mount('#app')

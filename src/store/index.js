import {createStore} from 'vuex';
import { weatherModule } from './weatherModule';

export default createStore({
    modules: {
        weather: weatherModule,
    },
});

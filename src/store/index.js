import {createStore} from 'vuex';
import { weatherModule } from './weatherModule';
import { appSettingModule } from './appSettingModule';

export default createStore({
    modules: {
        weatherModule,
        appSettingModule,
    },
});

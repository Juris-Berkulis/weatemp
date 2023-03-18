<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import WeatherForm from '../WeatherForm.vue';
import TheModalWindow from './TheModalWindow.vue';

export default {
    data() {
        return {
            isShowModalWindow: false,
        }
    },
    computed: {
        ...mapState({
            cityName: (state) => state.weatherModule.cityName,
        }),
    },
    methods: {
        ...mapActions({
            getWeather: 'weatherModule/getWeather',
            getCityNameFromLocalStorage: 'weatherModule/getCityNameFromLocalStorage',
            getCoordsByCityName: 'weatherModule/getCoordsByCityName',
        }),
    },
    async mounted() {
        this.getCityNameFromLocalStorage();

        if (this.cityName) {
            await this.getCoordsByCityName();
            await this.getWeather();
        }
    },
    components: { 
        TheModalWindow, 
        WeatherForm, 
    },
}
</script>

<template>
    <div class="header">
        <div class="nav">
            <div class="navBtn">
                <RouterLink to="/">Сейчас</RouterLink>
            </div>
            <div class="navBtn">
                <RouterLink to="/weather_on_five_days">На 5 дней</RouterLink>
            </div>
            <div class="navBtn">
                <RouterLink to="/air_pollution_now">Загрязнение</RouterLink>
            </div>
            <div class="navBtn">
                <BaseSearchIcon @click="isShowModalWindow = true"></BaseSearchIcon>
            </div>
        </div>
        <TheModalWindow v-model:isShow="isShowModalWindow">
            <WeatherForm v-model:isShowModalWindow="isShowModalWindow"></WeatherForm>
        </TheModalWindow>
    </div>
</template>

<style>
.header {
    height: 10vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.navBtn {
    margin: 0 10px;
    text-align: center;
    font-size: 16px;
}
</style>

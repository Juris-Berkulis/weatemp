<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            cityName: (state) => state.weatherModule.cityName,
        }),
    },
    methods: {
        ...mapActions({
            getWeather: 'weatherModule/getWeather',
            getCityNameFromLocalStorage: 'weatherModule/getCityNameFromLocalStorage',
        }),
    },
    mounted() {
        this.getCityNameFromLocalStorage();

        if (this.cityName) {
            this.getWeather();
        }
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
                <BaseSearchIcon></BaseSearchIcon>
            </div>
        </div>
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

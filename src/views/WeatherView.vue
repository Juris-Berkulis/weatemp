<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import WeatherList from '../components/WeatherList.vue';

export default {
    components: {
        WeatherList,
    },
    computed: {
        ...mapState({
            weather: (state) => state.weatherModule.weather,
            isWeatherLoaded: (state) => state.weatherModule.isWeatherLoaded,
        }),
        ...mapGetters({
            getIcon: 'weatherModule/getIcon',
        }),
    },
}
</script>

<template>
    <div class="weatherView" v-if="isWeatherLoaded && weather">
        <div class="weatherInfo">
            <img class="weatherImg" :src="`${getIcon.imgSrc}`" :alt="`${getIcon.imgAlt}`">
            <WeatherList></WeatherList>
        </div>
    </div>
</template>

<style>
.weatherView {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    max-height: 100%;
    width: 100%;
}

.weatherInfo {
    height: 100%;
    max-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.weatherPageTitle {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.weatherImg {
    height: 70px;
    width: 70px;
    align-self: center;
}

@media (max-height: 401px) {
    .weatherImg {
        display: none;
    }
}
</style>

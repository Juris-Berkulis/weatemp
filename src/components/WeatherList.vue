<script>
import WeatherListItem from './WeatherListItem.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    components: {
        WeatherListItem,
    },
    computed: {
        ...mapState({
            weather: (state) => state.weather.weather,
        }),
        ...mapGetters({
            getIcon: 'weather/getIcon',
        }),
    },
}
</script>

<template>
    <div class="weatherInfo" v-if="weather">
        <div class="weatherPageTitle">
            <h1 class="weatherItemCity">{{ weather.name }}</h1>
            <img class="weatherItemIcon" :src="`${getIcon.imgSrc}`" :alt="`${getIcon.imgAlt}`">
        </div>
        <div class="weatherList" v-if="weather">
            <WeatherListItem></WeatherListItem>
        </div>
    </div>
</template>

<style>
.weatherInfo {
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.weatherPageTitle {
    height: 90px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.weatherItemCity {
    display: block;
    text-align: center;
    color: #ffedbc;
    font-size: 70px;
}

@media (max-width: 1000px) {
    .weatherItemCity {
        font-size: 50px;
    }
}

@media (max-width: 600px) {
    .weatherItemCity {
        font-size: 30px;
    }
}

.weatherItemIcon {
    display: block;
    height: 100%;
}

.weatherList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5vw;
    flex-grow: 1;
    overflow-y: auto;
}
</style>

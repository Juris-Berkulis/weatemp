<script>
import WeatherForm from '../components/WeatherForm.vue';
import WeatherList from '../components/WeatherList.vue';

export default {
    components: {
        WeatherForm,
        WeatherList,
},
    data() {
        return {
            weatherInfo: null,
        }
    },
    methods: {
        getWeather(weatherInfo) {
            this.weatherInfo = weatherInfo;
        }
    },
    watch: {
        weatherInfo() {
            console.log(this.weatherInfo)
        },
    },
}
</script>

<template>
    <div class="weatherView">
        <WeatherForm @getWeather="getWeather"></WeatherForm>
        <WeatherList v-bind:weather="this.weatherInfo"></WeatherList>
    </div>
</template>

<style>
.weatherView {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<script>
import WeatherForm from '../components/WeatherForm.vue';
import WeaatherList from '../components/WeaatherList.vue';

export default {
    components: {
        WeatherForm,
        WeaatherList,
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
        <WeaatherList v-bind:weather="this.weatherInfo"></WeaatherList>
    </div>
</template>

<style>
.weatherView {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

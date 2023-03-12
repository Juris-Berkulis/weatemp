<script>
import WeatherForm from '@/components/WeatherForm.vue';

export default {
    components: {
        WeatherForm,
    },
    data() {
        return {
            weatherInfo: {},
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
    <div>
        <WeatherForm @getWeather="getWeather"></WeatherForm>
        <div>{{ this.weatherInfo }}</div>
    </div>
</template>

<style>

</style>

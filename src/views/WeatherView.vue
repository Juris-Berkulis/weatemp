<script>
import axios from 'axios';

export default {
    data() {
        return {
            cityName: '',
            apiKey: 'f4adc48f5c500c2934f9ebd23672b601',
            units: 'metric',
            language: 'ru',
            weatherInfo: {},
        }
    },
    computed: {
        getUrl() {
            return `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=${this.units}&lang=${this.language}`
        },
    },
    methods: {
        async getWeather() {
            try {
                const response = await axios.get(this.getUrl);

                this.weatherInfo = response.data;
            } catch(error) {
                alert(`${error.code}: ${error.message}`);
            }
        },
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
        <form action="" @submit.prevent="getWeather">
            <input v-model="this.cityName" type="text" placeholder="Введите город">
            <button>Получить погоду</button>
        </form>
        <div>{{ this.weatherInfo }}</div>
    </div>
</template>

<style>

</style>

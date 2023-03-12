<script>
import axios from 'axios';

export default {
    data() {
        return {
            cityName: '',
            apiKey: 'f4adc48f5c500c2934f9ebd23672b601',
            units: 'metric',
            language: 'ru',
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

                this.$emit('getWeather', response.data);
            } catch(error) {
                alert(`${error.code}: ${error.message}`);
            }
        },
    },
}
</script>

<template>
    <form @submit.prevent="getWeather" action="">
        <input v-model="this.cityName" type="text" placeholder="Введите город">
        <button>Получить погоду</button>
    </form>
</template>

<style>

</style>

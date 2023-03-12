<script>
export default {
    props: {
        weather: {
            type: Object,
        },
    },
    computed: {
        getSunrise() {
            const date = new Date(this.weather.sys.sunrise * 1000);

            return date.toLocaleTimeString();
        },
        getSet() {
            const date = new Date(this.weather.sys.sunset * 1000);

            return date.toLocaleTimeString();
        },
        getIconSrc() {
            return `https://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`
        }
    }
}
</script>

<template>
    <div v-if="weather">
        <h1>{{ weather.name }}</h1>
        <div>
            <div>Облака: {{ weather.clouds.all }}%</div>
            <div>Температура: {{ weather.main.temp }} C</div>
            <div>Ощущается: {{ weather.main.feels_like }} C</div>
            <div>Макс. темп.: {{ weather.main.temp_max }} C</div>
            <div>Мин. темп.: {{ weather.main.temp_min }} C</div>
            <div>Давление: {{ weather.main.pressure }} мм рт.ст.</div>
            <div>Влажность: {{ weather.main.humidity }} %</div>
            <div>Восход: {{ getSunrise }}</div>
            <div>Закат: {{ getSet }}</div>
            <div>Видимость: {{ weather.visibility }} м</div>
            <div>Описание: {{ weather.weather[0].description }}</div>
            <img :src="`${getIconSrc}`" :alt="`${weather.weather[0].main}`">
            <div>Основное: {{ weather.weather[0].main }}</div>
            <div>Направление ветра: {{ weather.wind.deg }} град.</div>
            <div>Скорость ветра: {{ weather.wind.speed }} м/с</div>
            <div>Порывы ветра: {{ weather.wind.gust ? weather.wind.gust : weather.wind.speed }} м/с</div>
        </div>
    </div>
</template>

<style>

</style>

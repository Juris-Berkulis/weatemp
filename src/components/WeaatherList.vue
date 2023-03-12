<script>
import WeatherListItem from './WeatherListItem.vue';

export default {
    components: {
        WeatherListItem,
    },
    props: {
        weather: {
            type: Object,
        },
    },
    computed: {
        getCloudsPercent() {
            const title = 'Облака';
            const testimony = this.weather.clouds.all;
            const units = '%';
            return {title, testimony, units}
        },
        getTemperature() {
            const title = 'Температура';
            const testimony = this.weather.main.temp;
            const units = '°C';
            return {title, testimony, units}
        },
        getFeelingTemperature() {
            const title = 'Ощущается';
            const testimony = this.weather.main.feels_like;
            const units = '°C';
            return {title, testimony, units}
        },
        getMaxTemperature() {
            const title = 'Макс. темп.';
            const testimony = this.weather.main.temp_max;
            const units = '°C';
            return {title, testimony, units}
        },
        getMinTemperature() {
            const title = 'Мин. темп.';
            const testimony = this.weather.main.temp_min;
            const units = '°C';
            return {title, testimony, units}
        },
        getPressure() {
            const title = 'Давление';
            const testimony = this.weather.main.pressure;
            const units = ' мм рт.ст.';
            return {title, testimony, units}
        },
        getHumidity() {
            const title = 'Влажность';
            const testimony = this.weather.main.humidity;
            const units = '%';
            return {title, testimony, units}
        },
        getSunrise() {
            const timezone = this.weather.timezone;
            const date = new Date((this.weather.sys.sunrise + timezone) * 1000);
            const localHours = date.getUTCHours();
            const localMinutes = date.getUTCMinutes();

            const title = 'Восход';
            const testimony = `${localHours < 10 ? `0${localHours}` : localHours}:${localMinutes < 10 ? `0${localMinutes}` : localMinutes}`;
            const units = '';

            return {title, testimony, units}
        },
        getSet() {
            const timezone = this.weather.timezone;
            const date = new Date((this.weather.sys.sunset + timezone) * 1000);
            const localHours = date.getUTCHours();
            const localMinutes = date.getUTCMinutes();

            const title = 'Закат';
            const testimony = `${localHours < 10 ? `0${localHours}` : localHours}:${localMinutes < 10 ? `0${localMinutes}` : localMinutes}`;
            const units = '';

            return {title, testimony, units}
        },
        getVisibility() {
            const title = 'Видимость';
            const testimony = this.weather.visibility < 1000 ? this.weather.visibility : (this.weather.visibility / 1000).toFixed(1);
            const units = this.weather.visibility < 1000 ? ' м' : ' км';
            return {title, testimony, units}
        },
        getDescription() {
            const title = 'Описание';
            const testimonyBeforeUpdate = this.weather.weather[0].description;
            const testimony = testimonyBeforeUpdate ? testimonyBeforeUpdate[0].toUpperCase() + testimonyBeforeUpdate.slice(1) : 'н/д';

            const units = '';
            return {title, testimony, units}
        },
        getWindDirection() {
            const title = 'Направление ветра';
            const degry = this.weather.wind.deg;
            let direction;

            if (degry >= 337.5 || degry < 22.5) {
                direction = 'Северный'; 
            } else if (degry < 67.5) {
                direction = 'Северо-восточный';
            } else if (degry < 112.5) {
                direction = 'Восточный';
            } else if (degry < 157.5) {
                direction = 'Юго-восточный';
            } else if (degry < 202.5) {
                direction = 'Южный';
            } else if (degry < 247.5) {
                direction = 'Юго-западный';
            } else if (degry < 292.5) {
                direction = 'Западный';
            } else if (degry < 337.5) {
                direction = 'Северо-Западный';
            } else {
                direction = '???';
            }

            const testimony = `${direction} (${degry}°)`;

            const units = '';
            return {title, testimony, units}
        },
        getWindSpeed() {
            const title = 'Скорость ветра';
            const testimony = this.weather.wind.speed;
            const units = ' м/с';
            return {title, testimony, units}
        },
        getWindGusts() {
            const title = 'Порывы ветра';
            const testimony = this.weather.wind.gust ? this.weather.wind.gust : this.weather.wind.speed;
            const units = ' м/с';
            return {title, testimony, units}
        },
        getIcon() {
            const imgSrc = `https://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
            const imgAlt = this.weather.weather[0].main;
            return {imgSrc, imgAlt}
        },
        weatherInfoList() {
            return [
                this.getTemperature,
                this.getFeelingTemperature,
                this.getMinTemperature,
                this.getMaxTemperature,
                this.getVisibility,
                this.getCloudsPercent,
                this.getDescription,
                this.getWindDirection,
                this.getWindSpeed,
                this.getWindGusts,
                this.getPressure,
                this.getHumidity,
                this.getSunrise,
                this.getSet,
            ]
        },
    },
}
</script>

<template>
    <div class="weatherInfo" v-if="weather">
        <div class="weatherPageTitle">
            <h1 class="weatherItemCity">{{ weather.name }}</h1>
            <img class="weatherItemIcon" :src="`${getIcon.imgSrc}`" :alt="`${getIcon.imgAlt}`">
        </div>
        <div class="weatherList" v-if="this.weather">
            <WeatherListItem v-bind:weatherInfoList="weatherInfoList"></WeatherListItem>
        </div>
    </div>
</template>

<style>
.weatherInfo {
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
}

.weatherPageTitle {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
}

@media (max-width: 1000px) {
    .weatherPageTitle {
        font-size: 25px;
    }
}

@media (max-width: 600px) {
    .weatherPageTitle {
        font-size: 15px;
    }
}

.weatherItemCity {
    display: block;
    text-align: center;
    color: #ffedbc;
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

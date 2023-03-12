<script>
export default {
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
            const testimony = this.weather.wind.deg;
            const units = ' град.';
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
    <div v-if="weather">
        <div class="weatherPageTitle">
            <h1 class="weatherItemCity">{{ weather.name }}</h1>
            <img class="weatherItemIcon" :src="`${getIcon.imgSrc}`" :alt="`${getIcon.imgAlt}`">
        </div>
        <div>
            <div class="weatherList" v-if="this.weather">
                <div class="weatherItem" v-for="weatherInfoItem in weatherInfoList">
                    <p>{{ weatherInfoItem.title }}</p>
                    <p>
                        <span>{{ weatherInfoItem.testimony }}</span>
                        <span>{{ weatherInfoItem.units }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.weatherPageTitle {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.weatherItemCity {
    display: block;
    text-align: center;
    color: #ffedbc;
}

.weatherItemIcon {
    display: block;
}

.weatherList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.weatherItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #eeeeee;
    color: #ffedbc;
    background-color: rgba(220, 220, 220, 0.3);
    flex-grow: 1;
}
</style>

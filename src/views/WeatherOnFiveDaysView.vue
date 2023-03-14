<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            weatherOnFiveDays: (state) => state.weatherModule.weatherOnFiveDays,
        }),
        getMaxTempForFiveDays() {
            let minTemp = this.weatherOnFiveDays.list[0].main.temp;
            let maxTemp = this.weatherOnFiveDays.list[0].main.temp;

            for (let i = 1; i < this.weatherOnFiveDays.list.length; i++) {
                if (this.weatherOnFiveDays.list[i].main.temp > maxTemp) {
                    maxTemp = this.weatherOnFiveDays.list[i].main.temp;
                } else if (this.weatherOnFiveDays.list[i].main.temp < minTemp) {
                    minTemp = this.weatherOnFiveDays.list[i].main.temp;
                }
            }

            return {minTemp, maxTemp}
        },
    },
    methods: {
        getIcon(weatherObj) {
            const imgSrc = `https://openweathermap.org/img/w/${weatherObj.icon}.png`;
            const imgAlt = weatherObj.main;
            return {imgSrc, imgAlt}
        },
    }
}
</script>

<template>
    <div class="weatherOnFiveDays">
        <h1 class="weatherOnFiveDaysTitle">{{ weatherOnFiveDays.city.name }}</h1>
        <div class="weatherOnFiveDaysTable" v-if="weatherOnFiveDays">
            <div class="eachDay" v-for="dayWeather in weatherOnFiveDays.list">
                <div class="eachDayColumn" :style="{height: 5 + 95 * (dayWeather.main.temp - getMaxTempForFiveDays.minTemp) / (getMaxTempForFiveDays.maxTemp - getMaxTempForFiveDays.minTemp) + 'px'}"></div>
                <div class="eachDayIndicator">{{ dayWeather.main.temp }}°</div>
                <img :src="getIcon(dayWeather.weather[0]).imgSrc" :alt="getIcon(dayWeather.weather[0]).imgAlt">
                <div class="eachDayIndicator">{{ dayWeather.clouds.all }}%</div>
                <div class="eachDayIndicator">{{ dayWeather.pop }}%</div>
                <div class="eachDayIndicator">{{ dayWeather.main.humidity }}%</div>
                <div class="eachDayIndicator">{{ dayWeather.main.pressure }}мм</div>
                <div class="eachDayIndicator">{{ dayWeather.wind.deg }}°</div>
                <div class="eachDayIndicator">{{ (dayWeather.wind.speed).toFixed(0) }}м/с</div>
                <div class="eachDayIndicator">{{ (dayWeather.wind.gust).toFixed(0) }}м/с</div>
                <div class="eachDayIndicator">{{ (dayWeather.visibility / 1000).toFixed(1) }}км</div>
            </div>
        </div>
    </div>
</template>

<style>
.weatherOnFiveDaysTitle {
    text-align: center;
}

.weatherOnFiveDaysTable {
    display: flex;
    overflow-x: auto;
}

.eachDay {
    min-width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 5px;
}

.eachDayColumn {
    width: 100%;
    background-color: darkblue;
}

.eachDayIndicator {
    white-space: nowrap;
}
</style>

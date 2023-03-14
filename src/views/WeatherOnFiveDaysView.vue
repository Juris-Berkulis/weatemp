<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import {getWindDirectionFunc} from '@/helper/helperWeather.js';

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
        isValidData(data) {
            if (data !== 'undefined') {
                return true
            } else {
                return false
            }
        },
        getVisibility(visibility) {
            if(!this.isValidData(visibility)) {
                return 'н/д'
            }

            if (visibility >= 1000) {
                visibility = (visibility / 1000).toFixed(1)
            }

            return visibility
        },
        getWind(wind) {
            const speed = wind.speed ? wind.speed.toFixed(0) : 'н/д';
            const gust = wind.gust ? wind.gust.toFixed(0) : speed;

            return {speed, gust}
        },
        getWindDirection(degry, isShort) {
            return getWindDirectionFunc(degry, isShort)
        },
    },
}
</script>

<template>
    <div class="weatherOnFiveDays" v-if="weatherOnFiveDays">
        <h1 class="weatherOnFiveDaysTitle">{{ weatherOnFiveDays.city.name }}</h1>
        <div class="weatherOnFiveDaysTable">
            <div class="eachDay" v-for="dayWeather in weatherOnFiveDays.list">
                <div class="eachDayColumn" :style="{height: 5 + 95 * (dayWeather.main.temp - getMaxTempForFiveDays.minTemp) / (getMaxTempForFiveDays.maxTemp - getMaxTempForFiveDays.minTemp) + 'px'}"></div>
                <div class="eachDayIndicator">{{ dayWeather.main.temp }}°</div>
                <img :src="getIcon(dayWeather.weather[0]).imgSrc" :alt="getIcon(dayWeather.weather[0]).imgAlt">
                <div class="eachDayIndicator">{{ dayWeather.clouds.all }}%</div>
                <div class="eachDayIndicator">{{ dayWeather.pop }}%</div>
                <div class="eachDayIndicator">{{ dayWeather.main.humidity }}%</div>
                <div class="eachDayIndicator">{{ dayWeather.main.pressure }}мм</div>
                <div class="eachDayIndicator">{{ getWindDirection(dayWeather.wind.deg, true) }}</div>
                <div class="eachDayIndicator">{{ (getWind(dayWeather.wind).speed) }}м/с</div>
                <div class="eachDayIndicator">{{ (getWind(dayWeather.wind).gust) }}м/с</div>
                <div class="eachDayIndicator">{{ getVisibility(dayWeather.visibility) }}км</div>
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

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
        getChartMaxHeight() {
            const chartMaxHeight = `${5 + 95}px`

            return {
                height: chartMaxHeight,
                minHeight: chartMaxHeight,
                maxHeight: chartMaxHeight,
            }
        }
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
                return `${(visibility / 1000).toFixed(1)}км`
            }

            return `${visibility}м`
        },
        getWind(wind) {
            const speed = wind.speed ? wind.speed.toFixed(0) : 'н/д';
            const gust = wind.gust ? wind.gust.toFixed(0) : speed;

            return {speed, gust}
        },
        getWindDirection(degry, isShort) {
            return getWindDirectionFunc(degry, isShort)
        },
        getChartHeight(temp) {
            const chartHeight = `${5 + 95 * (temp - this.getMaxTempForFiveDays.minTemp) / (this.getMaxTempForFiveDays.maxTemp - this.getMaxTempForFiveDays.minTemp)}px`

            return {
                height: chartHeight,
                minHeight: chartHeight,
                maxHeight: chartHeight,
            }
        }
    },
}
</script>

<template>
    <div class="weatherOnFiveDays" v-if="weatherOnFiveDays">
        <h1 class="weatherOnFiveDaysTitle">{{ weatherOnFiveDays.city.name }}</h1>
        <div class="weatherOnFiveDaysTable">
            <div class="weatherOnFiveDaysTableAuxiliary">
                <div class="eachDay" v-for="dayWeather in weatherOnFiveDays.list">
                    <div class="eachDayChartWrapper" :style="getChartMaxHeight">
                        <div class="eachDayChart" :style="getChartHeight(dayWeather.main.temp)"></div>
                    </div>
                    <div class="eachDayIndicator">{{ dayWeather.main.temp }}°</div>
                    <img :src="getIcon(dayWeather.weather[0]).imgSrc" :alt="getIcon(dayWeather.weather[0]).imgAlt">
                    <div class="eachDayIndicator">{{ dayWeather.clouds.all }}%</div>
                    <div class="eachDayIndicator">{{ dayWeather.pop }}%</div>
                    <div class="eachDayIndicator">{{ dayWeather.main.humidity }}%</div>
                    <div class="eachDayIndicator">{{ dayWeather.main.pressure }}мм</div>
                    <div class="eachDayIndicator">
                        <span>{{ getWindDirection(dayWeather.wind.deg, true) }}: </span>
                        <span class="eachDayIndicatorIcon" :style="{transform: `rotateZ(${dayWeather.wind.deg}deg)`,}">&darr;</span>
                    </div>
                    <div class="eachDayIndicator">{{ (getWind(dayWeather.wind).speed) }}м/с</div>
                    <div class="eachDayIndicator">{{ (getWind(dayWeather.wind).gust) }}м/с</div>
                    <div class="eachDayIndicator">{{ getVisibility(dayWeather.visibility) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.weatherOnFiveDays {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    color: #ffedbc;
}

.weatherOnFiveDaysTitle {
    text-align: center;
}

.weatherOnFiveDaysTable {
    display: flex;
    overflow-y: auto;
}

.weatherOnFiveDaysTableAuxiliary {
    display: flex;
    overflow-x: auto;
}

.eachDay {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
}

.eachDayChartWrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
}

.eachDayChart {
    width: 100%;
    background-color: darkblue;
}

.eachDayIndicator {
    margin: 5px 0;
    font-size: 20px;
    white-space: nowrap;
}

@media (max-width: 1000px) {
    .eachDayIndicator {
        font-size: 15px;
    }
}

@media (max-width: 600px) {
    .eachDayIndicator {
        font-size: 8px;
    }
}

.eachDayIndicatorIcon {
    display: inline-block;
    width: auto;
}
</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import {getWindDirectionFunc} from '@/helper/helperWeather.js';

export default {
    data() {
        return {
            graphVerticalPaddings: 5,
            maximumDifferenceOfGraphValues: 95,
        }
    },
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
            const chartMaxHeight = `${this.graphVerticalPaddings + this.maximumDifferenceOfGraphValues + this.graphVerticalPaddings}px`

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
            const chartHeight = `${this.graphVerticalPaddings + this.maximumDifferenceOfGraphValues * (temp - this.getMaxTempForFiveDays.minTemp) / (this.getMaxTempForFiveDays.maxTemp - this.getMaxTempForFiveDays.minTemp)}px`

            return {
                height: chartHeight,
                minHeight: chartHeight,
                maxHeight: chartHeight,
            }
        },
        getPrecipitationProbability(precipitationProbability) {
            if(!this.isValidData(precipitationProbability)) {
                return 'н/д'
            }

            return (precipitationProbability * 100).toFixed(0)
        },
        getDateAndTime(dt) {
            const timezone = this.weatherOnFiveDays.city.timezone;
            const date = new Date((dt + timezone) * 1000);
            const localYear = date.getUTCFullYear();
            const localMonth = date.getUTCMonth() + 1;
            const localDayNumber = date.getUTCDay();
            const localHours = date.getUTCHours();
            const localMinutes = date.getUTCMinutes();

            const localDate = `${localYear}.${localMonth < 10 ? `0${localMonth}` : localMonth}:${localDayNumber < 10 ? `0${localDayNumber}` : localDayNumber}`;
            const localTime = `${localHours < 10 ? `0${localHours}` : localHours}:${localMinutes < 10 ? `0${localMinutes}` : localMinutes}`;

            return {localDate, localTime}
        }
    },
}
</script>

<template>
    <div class="weatherOnFiveDays" v-if="weatherOnFiveDays">
        <h1 class="weatherOnFiveDaysTitle">{{ weatherOnFiveDays.city.name }}</h1>
        <div class="weatherOnFiveDaysTable">
            <div class="threeHours threeHoursTitle">
                <div class="threeHoursChartWrapper threeHoursChartWrapperTitle" :style="getChartMaxHeight">
                    <p>Макс. темп.: {{ getMaxTempForFiveDays.maxTemp }}°C</p>
                    <p>Мин. темп.: {{ getMaxTempForFiveDays.minTemp }}°C</p>
                </div>
                <div class="threeHoursIndicator">Температура (°C):</div>
                <div class="threeHoursIndicator">Время:</div>
                <div class="threeHoursIndicatorImg"></div>
                <div class="threeHoursIndicator">Облачность (%):</div>
                <div class="threeHoursIndicator">Вер. осадков (%):</div>
                <div class="threeHoursIndicator">Влажность (%):</div>
                <div class="threeHoursIndicator">Давление (мм рт.ст.):</div>
                <div class="threeHoursIndicator">Напр. ветра:</div>
                <div class="threeHoursIndicator">Скорость ветра (м/с):</div>
                <div class="threeHoursIndicator">Порывы ветра (м/с):</div>
                <div class="threeHoursIndicator">Видимость:</div>
            </div>
            <div class="weatherOnFiveDaysTableAuxiliary">
                <div class="threeHours" v-for="threeHoursWeather in weatherOnFiveDays.list">
                    <div class="threeHoursChartWrapper" :style="getChartMaxHeight">
                        <div class="threeHoursChart" :style="getChartHeight(threeHoursWeather.main.temp)"></div>
                    </div>
                    <div class="threeHoursIndicator">{{ threeHoursWeather.main.temp }}</div>
                    <div class="threeHoursIndicator">{{ getDateAndTime(threeHoursWeather.dt).localTime }}</div>
                    <img class="threeHoursIndicatorImg" :src="getIcon(threeHoursWeather.weather[0]).imgSrc" :alt="getIcon(threeHoursWeather.weather[0]).imgAlt">
                    <div class="threeHoursIndicator">{{ threeHoursWeather.clouds.all }}</div>
                    <div class="threeHoursIndicator">{{ getPrecipitationProbability(threeHoursWeather.pop) }}</div>
                    <div class="threeHoursIndicator">{{ threeHoursWeather.main.humidity }}</div>
                    <div class="threeHoursIndicator">{{ threeHoursWeather.main.pressure }}</div>
                    <div class="threeHoursIndicator">
                        <span>{{ getWindDirection(threeHoursWeather.wind.deg, true) }}: </span>
                        <span class="threeHoursIndicatorIcon" :style="{transform: `rotateZ(${threeHoursWeather.wind.deg}deg)`,}">&darr;</span>
                    </div>
                    <div class="threeHoursIndicator">{{ (getWind(threeHoursWeather.wind).speed) }}</div>
                    <div class="threeHoursIndicator">{{ (getWind(threeHoursWeather.wind).gust) }}</div>
                    <div class="threeHoursIndicator">{{ getVisibility(threeHoursWeather.visibility) }}</div>
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
    height: 100%;
    overflow-x: auto;
}

.threeHours {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5px;
    background-color: rgba(220, 220, 220, 0.3);
    cursor: default;
}

.threeHours:hover {
    background-color: rgba(220, 220, 220, 0.4);
}

.threeHoursTitle {
    align-items: flex-start;
    height: 100%;
}

.threeHoursTitle:hover {
    background-color: rgba(220, 220, 220, 0.3);
}

.threeHoursChartWrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
}

.threeHoursChartWrapperTitle {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.threeHoursChart {
    width: 100%;
    background-color: darkblue;
}

.threeHoursIndicator {
    margin: 5px 0;
    font-size: 20px;
    white-space: nowrap;
}

@media (max-width: 1000px) {
    .threeHoursIndicator {
        font-size: 15px;
    }
}

@media (max-width: 600px) {
    .threeHoursIndicator {
        font-size: 8px;
    }
}

.threeHoursIndicatorImg {
    width: 50px;
    height: 50px;
}

@media (max-width: 600px) {
    .threeHoursIndicatorImg {
        width: 30px;
        height: 50px;
    }
}

.threeHoursIndicatorIcon {
    display: inline-block;
    width: auto;
}
</style>

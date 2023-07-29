<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import {
    roundToTwoDecimalPlaces,
} from '@/helper/helperApp.js';
import {
    getWindDirectionFunc,
    getWeatherIcon,
} from '@/helper/helperWeather.js';

export default {
    data() {
        return {
            graphVerticalPaddings: 5,
            maximumDifferenceOfGraphValues: 95,
            isShowWeekDay: false,
            isShowColumnWithTitles: true,
        }
    },
    computed: {
        ...mapState({
            weatherOnFiveDays: (state) => state.weatherModule.weatherOnFiveDays,
            isWeatherLoaded: (state) => state.weatherModule.isWeatherLoaded,
        }),
        getMinAndMaxTempForFiveDays() {
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
        },
        isShowZeroLine() {
            return this.getMinAndMaxTempForFiveDays.minTemp < 0 && this.getMinAndMaxTempForFiveDays.maxTemp > 0
        }
    },
    methods: {
        getIcon(weatherObj) {
            return getWeatherIcon(weatherObj)
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
                if (visibility < 10000) {
                    return `${(visibility / 1000).toFixed(1)}км`
                } else {
                    return '>10км'
                }
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
            const chartHeight = `${this.graphVerticalPaddings + this.maximumDifferenceOfGraphValues * (temp - this.getMinAndMaxTempForFiveDays.minTemp) / (this.getMinAndMaxTempForFiveDays.maxTemp - this.getMinAndMaxTempForFiveDays.minTemp)}px`

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
        setLocalWeegDayNumberToString(localWeekDayNumber, isShort=true) {
            switch(localWeekDayNumber) {
                case 1: return isShort ? 'Пн' : 'Понедельник'
                case 2: return isShort ? 'Вт' : 'Вторник'
                case 3: return isShort ? 'Ср' : 'Среда'
                case 4: return isShort ? 'Чт' : 'Четверг'
                case 5: return isShort ? 'Пт' : 'Пятница'
                case 6: return isShort ? 'Сб' : 'Суббота'
                case 0: return isShort ? 'Вс' : 'Воскресенье'
                default: return '??'
            }
        },
        getDateAndTime(dt, isFirstColumn) {
            const timezone = this.weatherOnFiveDays.city.timezone;
            const date = new Date((dt + timezone) * 1000);
            const localYear = date.getUTCFullYear();
            const localMonth = date.getUTCMonth() + 1;
            const localDayNumber = date.getUTCDate();
            const localHours = date.getUTCHours();
            const localMinutes = date.getUTCMinutes();
            const localWeekDayNumber = date.getUTCDay();

            const localDate = `${localYear}.${localMonth < 10 ? `0${localMonth}` : localMonth}.${localDayNumber < 10 ? `0${localDayNumber}` : localDayNumber}`;
            const localTime = `${localHours < 10 ? `0${localHours}` : localHours}:${localMinutes < 10 ? `0${localMinutes}` : localMinutes}`;
            const localDateInMidnight = isFirstColumn || localHours === 0 || localHours === 1 || localHours === 2 ? localDate : '';
            const localShortDateInMidnight = localDateInMidnight ? localDateInMidnight.split('.').slice(1).reverse().join('.') : localDateInMidnight;
            const localShortWeekDayInMidnight = localDateInMidnight ? this.setLocalWeegDayNumberToString(localWeekDayNumber, true) : '';
            const localLongWeekDayInMidnight = localDateInMidnight ? this.setLocalWeegDayNumberToString(localWeekDayNumber, false) : '';

            return {localDate, localTime, localDateInMidnight, localShortDateInMidnight, localShortWeekDayInMidnight, localLongWeekDayInMidnight}
        },
        roundToTwoDecimalPlacesMethod (fullNumber) {
            return roundToTwoDecimalPlaces(fullNumber)
        },
        toogleDisplayModeOfDays () {
            this.isShowWeekDay = !this.isShowWeekDay;

            localStorage.setItem('isShowWeekDay', JSON.stringify(this.isShowWeekDay));
        },
    },
    mounted() {
        this.isShowWeekDay = JSON.parse(localStorage.getItem('isShowWeekDay')) || this.isShowWeekDay;
    },
}
</script>

<template>
    <div class="weatherOnFiveDays" v-if="isWeatherLoaded && weatherOnFiveDays">
        <div class="weatherOnFiveDaysTable" @click="isShowColumnWithTitles = !isShowColumnWithTitles">
            <div class="threeHours threeHoursTitle" v-if="isShowColumnWithTitles">
                <div class="threeHoursIndicator">Дата:</div>
                <div class="threeHoursIndicator">Время:</div>
                <div class="threeHoursChartWrapper threeHoursChartWrapperTitle" :style="getChartMaxHeight">
                    <p class="threeHoursChartWrapperTitleTempLine">t°<span class="threeHoursArrow">&#x21;</span>: {{ getMinAndMaxTempForFiveDays.maxTemp }}°C</p>
                    <p class="threeHoursChartWrapperTitleTempLine">t°<span class="threeHoursArrow">&#x22;</span>: {{ getMinAndMaxTempForFiveDays.minTemp }}°C</p>
                    <p class="threeHoursChartWrapperTitleTempLine threeHoursChartWrapperTitleZeroLine" :style="{bottom: `${getChartHeight(0).height}`}" v-if="isShowZeroLine">0°</p>
                </div>
                <div class="threeHoursIndicator">Температура (°C):</div>
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
                <div :class="['threeHours', 'threeHoursData', {threeHoursNewDay: index !== 0 && getDateAndTime(threeHoursWeather.dt).localShortDateInMidnight}]" v-for="threeHoursWeather, index in weatherOnFiveDays.list" :key="threeHoursWeather.dt">
                    <div class="threeHoursIndicator threeHoursIndicatorWithClick" @click.stop="toogleDisplayModeOfDays()">{{ isShowWeekDay ? getDateAndTime(threeHoursWeather.dt, index === 0).localShortWeekDayInMidnight : getDateAndTime(threeHoursWeather.dt, index === 0).localShortDateInMidnight }}</div>
                    <div class="threeHoursIndicator">{{ getDateAndTime(threeHoursWeather.dt).localTime }}</div>
                    <div class="threeHoursChartWrapper" :style="getChartMaxHeight">
                        <div class="threeHoursChart" :style="getChartHeight(threeHoursWeather.main.temp)"></div>
                        <div class="threeHoursChartZeroLine" :style="{bottom: `${getChartHeight(0).height}`}" v-if="isShowZeroLine"></div>
                    </div>
                    <div class="threeHoursIndicator">{{ roundToTwoDecimalPlacesMethod(threeHoursWeather.main.temp) }}</div>
                    <img class="threeHoursIndicatorImg" :src="getIcon(threeHoursWeather).imgSrc" :alt="getIcon(threeHoursWeather).imgAlt" :title="getIcon(threeHoursWeather).imgAlt">
                    <div class="threeHoursIndicator">{{ threeHoursWeather.clouds.all }}</div>
                    <div class="threeHoursIndicator">{{ getPrecipitationProbability(threeHoursWeather.pop) }}</div>
                    <div class="threeHoursIndicator">{{ threeHoursWeather.main.humidity }}</div>
                    <div class="threeHoursIndicator">{{ (threeHoursWeather.main.pressure * 0.750062).toFixed(0) }}</div>
                    <div class="threeHoursIndicator">
                        <span>{{ getWindDirection(threeHoursWeather.wind.deg, true) }}: </span>
                        <span class="threeHoursIndicatorIcon" :style="{transform: `rotateZ(${threeHoursWeather.wind.deg}deg)`,}">&#x22;</span>
                    </div>
                    <div class="threeHoursIndicator">{{ (getWind(threeHoursWeather.wind).speed) }}</div>
                    <div class="threeHoursIndicator">{{ (getWind(threeHoursWeather.wind).gust) }}</div>
                    <div class="threeHoursIndicator">{{ getVisibility(threeHoursWeather.visibility) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.weatherOnFiveDays {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    color: #ffedbc;
}

.weatherOnFiveDaysTable {
    display: flex;
    overflow-y: auto;
}

@media (max-width: 1001px) {
    .weatherOnFiveDaysTable {
        color: #02021a;
    }
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
    padding-bottom: 10px;
    border-right: 2px solid #eeeeee;
}

.threeHoursTitle:hover {
    background-color: rgba(220, 220, 220, 0.3);
}

.threeHoursData {
    min-width: 77px;
}

@media (max-width: 1001px) {
    .threeHoursData {
        min-width: 61px;
    }
}

@media (max-width: 701px) {
    .threeHoursData {
        min-width: 41px;
    }
}

.threeHoursNewDay {
    border-left: 1px solid #eeeeee;
}

.threeHoursChartWrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-end;
}

.threeHoursChartWrapperTitle {
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.threeHoursChartWrapperTitleTempLine {
    font-size: 20px;
    font-weight: 700;
}

@media (max-width: 1001px) {
    .threeHoursChartWrapperTitleTempLine {
        font-size: 15px;
    }
}

@media (max-width: 701px) {
    .threeHoursChartWrapperTitleTempLine {
        font-size: 8px;
    }
}

.threeHoursArrow {
    font-family: "Eleganticons";
    font-size: 0.6em;
    vertical-align: sub;
    margin-left: -5px;
}

@media (max-width: 1001px) {
    .threeHoursArrow {
        margin-left: -2px;
    }
}

.threeHoursChartWrapperTitleZeroLine {
    position: absolute;
    right: 0;
    transform: translateY(50%);
}

.threeHoursChart {
    width: 100%;
    background-color: darkblue;
}

.threeHoursChartZeroLine {
    position: absolute;
    left: 0;
    width: 100%;
    border-bottom: 3px dashed #eeeeee;
}

.threeHoursIndicator {
    height: 100%;
    margin: 5px 0;
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
}

.threeHoursIndicator:has(span) {
    display: flex;
    align-items: center;
    white-space: pre;
}

@media (max-width: 1001px) {
    .threeHoursIndicator {
        font-size: 15px;
    }
}

@media (max-width: 701px) {
    .threeHoursIndicator {
        font-size: 8px;
    }
}

.threeHoursIndicator span {
    display: block;
}

.threeHoursIndicatorWithClick {
    cursor: pointer;
}

.threeHoursIndicatorImg {
    width: 50px;
    height: 50px;
}

@media (max-width: 701px) {
    .threeHoursIndicatorImg {
        width: 30px;
        height: 30px;
    }
}

.threeHoursIndicatorIcon {
    width: auto;
    font-family: 'Eleganticons';
    font-size: inherit;
}
</style>

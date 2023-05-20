<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import {
    roundToTwoDecimalPlaces,
} from '@/helper/helperApp.js';

export default {
    props: {
        airPollutionData: {
            type: [Object, Boolean],
        },
    },
    computed: {
        ...mapState({
            currentAirPollutionData: (state) => state.weatherModule.currentAirPollutionData,
            timezone: (state) => state.weatherModule.weather.timezone,
        }),
    },
    methods: {
        getDateAndTime(dt) {
            const timezone = this.timezone;
            const date = new Date((dt + timezone) * 1000);
            const localYear = date.getUTCFullYear();
            const localMonth = date.getUTCMonth() + 1;
            const localDayNumber = date.getUTCDate();
            const localHours = date.getUTCHours();
            const localMinutes = date.getUTCMinutes();

            const localDate = `${localDayNumber < 10 ? `0${localDayNumber}` : localDayNumber}.${localMonth < 10 ? `0${localMonth}` : localMonth}`;
            const localTime = `${localHours < 10 ? `0${localHours}` : localHours}:${localMinutes < 10 ? `0${localMinutes}` : localMinutes}`;
            const localDateAndTime = `${localDate} в ${localTime}`

            return {localDate, localTime, localYear, localDateAndTime}
        },
        roundToTwoDecimalPlacesMethod (fullNumber) {
            return roundToTwoDecimalPlaces(fullNumber)
        },
    },
}
</script>

<template>
    <div class="airPollutionEachDateTitle" v-if="airPollutionData === false">
        <div class="airPollutionEachDateElementTitle">Дата</div>
        <div class="airPollutionEachDateElementTitle">ИКВ</div>
        <div class="airPollutionEachDateElementTitle">CO</div>
        <div class="airPollutionEachDateElementTitle">NH3</div>
        <div class="airPollutionEachDateElementTitle">NO</div>
        <div class="airPollutionEachDateElementTitle">NO2</div>
        <div class="airPollutionEachDateElementTitle">O3</div>
        <div class="airPollutionEachDateElementTitle">SO2</div>
        <div class="airPollutionEachDateElementTitle">PM2.5</div>
        <div class="airPollutionEachDateElementTitle">PM10</div>
    </div>
    <div v-else>
        <div v-for="airPollutionDataEachDate, index in airPollutionData">
            <div class="airPollutionEachDate" v-if="index !== 0 || airPollutionData.length === 1">
                <div class="airPollutionEachDateElement">{{ getDateAndTime(airPollutionDataEachDate.dt).localDateAndTime }}</div>
                <div class="airPollutionEachDateElement">{{ airPollutionDataEachDate.main.aqi }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.co) }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.nh3) }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.no) }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.no2) }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.o3) }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.so2) }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.pm2_5) }}</div>
                <div class="airPollutionEachDateElement">{{ roundToTwoDecimalPlacesMethod(airPollutionDataEachDate.components.pm10) }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.airPollutionEachDateTitle,
.airPollutionEachDate {
    display: flex;
    width: 100%;
}

.airPollutionEachDate:hover {
    background-color: rgba(220, 220, 220, 0.4);
}

.airPollutionEachDateElementTitle,
.airPollutionEachDateElement {
    display: flex;
    align-items: center;
    padding: 5px 2px;
    flex-grow: 1;
    flex-basis: 10%;
    text-align: center;
}
</style>

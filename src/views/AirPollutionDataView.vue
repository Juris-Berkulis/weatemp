<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import AirPollutionDataListItem from '../components/AirPollutionDataListItem.vue';

export default {
    computed: {
        ...mapState({
            currentAirPollutionData: (state) => state.weatherModule.currentAirPollutionData,
            airPollutionDataForecast: (state) => state.weatherModule.airPollutionDataForecast,
            cityName: (state) => state.weatherModule.weather.name,
        }),
    },
    components: { AirPollutionDataListItem }
}
</script>

<template>
    <div class="airPollution" v-if="currentAirPollutionData && airPollutionDataForecast">
        <h1 class="airPollutionTitle">{{ cityName }}</h1>
        <div class="airPollutionTable">
            <div class="airPollutionTablePart">
                <AirPollutionDataListItem v-bind:airPollutionData="false"></AirPollutionDataListItem>
            </div>
            <div class="airPollutionTablePart">
                <AirPollutionDataListItem v-bind:airPollutionData="this.currentAirPollutionData.list"></AirPollutionDataListItem>
            </div>
            <div class="airPollutionTablePart">
                <AirPollutionDataListItem v-bind:airPollutionData="this.airPollutionDataForecast.list"></AirPollutionDataListItem>
            </div>
        </div>
    </div>
</template>

<style scoped>
.airPollution {
    color: #ffedbc;
}

.airPollutionTitle {
    text-align: center;
}

.airPollution {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.airPollutionTable {
    height: 100%;
    overflow: auto;
    background-color: rgba(220, 220, 220, 0.3);
    font-size: 20px;
}

@media (max-width: 1000px) {
    .airPollutionTable {
        font-size: 15px;
    }
}

@media (max-width: 600px) {
    .airPollutionTable {
        font-size: 8px;
    }
}
</style>

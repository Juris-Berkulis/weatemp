<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import AirPollutionDataListItem from '../components/AirPollutionDataListItem.vue';

export default {
    computed: {
        ...mapState({
            currentAirPollutionData: (state) => state.weatherModule.currentAirPollutionData,
            airPollutionDataForecast: (state) => state.weatherModule.airPollutionDataForecast,
            cityNameInTitle: (state) => state.weatherModule.cityNameInTitle,
            isWeatherLoaded: (state) => state.weatherModule.isWeatherLoaded,
        }),
    },
    components: { AirPollutionDataListItem }
}
</script>

<template>
    <div class="airPollution" v-if="isWeatherLoaded && currentAirPollutionData && airPollutionDataForecast">
        <BaseTicker>
            <h1 class="airPollutionTitle">{{ cityNameInTitle }}</h1>
        </BaseTicker>
        <div class="airPollutionTablePart airPollutionTablePartTitle">
            <AirPollutionDataListItem v-bind:airPollutionData="false"></AirPollutionDataListItem>
        </div>
        <div class="airPollutionTable">
            <div class="airPollutionTablePart">
                <AirPollutionDataListItem v-bind:airPollutionData="this.currentAirPollutionData.list"></AirPollutionDataListItem>
            </div>
            <div class="airPollutionTablePart">
                <AirPollutionDataListItem v-bind:airPollutionData="this.airPollutionDataForecast.list"></AirPollutionDataListItem>
            </div>
        </div>
    </div>
    <BaseLoader v-else></BaseLoader>
</template>

<style scoped>
.airPollution {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #ffedbc;
}

.airPollutionTitle {
    text-align: center;
}

.airPollutionTable {
    height: 100%;
    overflow: auto;
}

.airPollutionTablePart {
    background-color: rgba(220, 220, 220, 0.3);
    font-size: 20px;
    color: #ffedbc;
    cursor: default;
}

@media (max-width: 1001px) {
    .airPollutionTablePart {
        font-size: 15px;
        color: #02021a;
    }
}

@media (max-width: 701px) {
    .airPollutionTablePart {
        font-size: 8px;
    }
}

.airPollutionTablePartTitle {
    overflow-y: scroll;
}

.airPollutionTablePartTitle::-webkit-scrollbar-track {
    background: rgba(220, 220, 220, 0.3);
    box-shadow: 0 0 0 rgba(220, 220, 220, 0.3) inset;
}

.airPollutionTablePartTitle::-webkit-scrollbar-track:hover {
    background: rgba(220, 220, 220, 0.3);
}

.airPollutionTablePartTitle::-webkit-scrollbar-thumb {
    background: rgba(220, 220, 220, 0.3);
    border: none;
}

.airPollutionTablePartTitle::-webkit-scrollbar-thumb:hover {
    background: rgba(220, 220, 220, 0.3);
}
</style>

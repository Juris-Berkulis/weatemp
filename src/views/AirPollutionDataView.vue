<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import AirPollutionDataListItem from '../components/AirPollutionDataListItem.vue';

export default {
    computed: {
        ...mapState({
            currentAirPollutionData: (state) => state.weatherModule.currentAirPollutionData,
            airPollutionDataForecast: (state) => state.weatherModule.airPollutionDataForecast,
            isWeatherLoaded: (state) => state.weatherModule.isWeatherLoaded,
        }),
    },
    components: { 
        AirPollutionDataListItem, 
    }
}
</script>

<template>
    <div class="airPollution" v-if="isWeatherLoaded && currentAirPollutionData && airPollutionDataForecast">
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
</template>

<style lang="scss" scoped>
.airPollution {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #ffedbc;
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
    padding-right: 10px;
}
</style>

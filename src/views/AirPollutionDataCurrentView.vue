<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import AirPollutionDataCurrentEl from '../components/AirPollutionDataCurrentEl.vue';
import { airPollutionCategoryForDifferentSubstance } from '../helper/helperAirPollution';

export default {
    computed: {
        ...mapState({
            currentAirPollutionDataNow: (state) => state.weatherModule.currentAirPollutionData?.list[0],
            cityName: (state) => state.weatherModule.weather.name,
        }),
        elementsDescription() {
            return {
                aqi: {
                    name: "Индекс качества воздуха",
                    shortName: "",
                    description: "",
                    value: this.currentAirPollutionDataNow.main.aqi,
                    airPollutionCategory: this.currentAirPollutionDataNow.main.aqi,
                },
                co: {
                    name: "Угарный газ",
                    shortName: "CO",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.co,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForCO(this.currentAirPollutionDataNow.components.co),
                },
                nh3: {
                    name: "Аммиак",
                    shortName: "NH3",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.nh3,
                    airPollutionCategory: null,
                },
                no: {
                    name: "Монооксид азота",
                    shortName: "NO",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.no,
                    airPollutionCategory: null,
                },
                no2: {
                    name: "Диоксид азота",
                    shortName: "NO2",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.no2,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForNO2(this.currentAirPollutionDataNow.components.no2),
                },
                o3: {
                    name: "Озон",
                    shortName: "O3",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.o3,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForO3(this.currentAirPollutionDataNow.components.o3),
                },
                so2: {
                    name: "Сернистый газ",
                    shortName: "SO2",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.so2,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForSO2(this.currentAirPollutionDataNow.components.so2),
                },
                pm2_5: {
                    name: "Мелкодисперсные частицы",
                    shortName: "PM2.5",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.pm2_5,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForPM2_5(this.currentAirPollutionDataNow.components.mp2_5),
                },
                pm10: {
                    name: "Крупнодисперсные частицы",
                    shortName: "PM10",
                    description: "",
                    value: this.currentAirPollutionDataNow.components.pm10,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForPM10(this.currentAirPollutionDataNow.components.mp10),
                },
            }
        },
    },
    components: { AirPollutionDataCurrentEl }
}
</script>

<template>
    <div class="airPollutionNowView" v-if="currentAirPollutionDataNow">
        <h1 class="airPollutionNowTitle">{{ cityName }}</h1>
        <div class="airPollutionScroll">
            <div class="airPollutionNow">
                <AirPollutionDataCurrentEl class="airPollutionNowElement airPollutionNowElementMain" v-bind:element="elementsDescription.aqi"></AirPollutionDataCurrentEl>
                <div class="airPollutionNowElementCards">
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.co">
                        <template v-slot:chemicalFormula>CO</template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.nh3">
                        <template v-slot:chemicalFormula>NH<span class="index">3</span></template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.no">
                        <template v-slot:chemicalFormula>NO</template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.no2">
                        <template v-slot:chemicalFormula>NO<span class="index">2</span></template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.o3">
                        <template v-slot:chemicalFormula>O<span class="index">3</span></template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.so2">
                        <template v-slot:chemicalFormula>SO<span class="index">2</span></template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.pm2_5">
                        <template v-slot:chemicalFormula>PM<span class="index">2.5</span></template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.pm10">
                        <template v-slot:chemicalFormula>PM<span class="index">10</span></template>
                        <template v-slot:units>мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                </div>
            </div>
            <div class="airPollutionNowMore">
                <p>NH<span class="index">3</span> и NO не влияют на расчет ИКВ.</p>
                <RouterLink to="/air_pollution_data">Прогноз данных о загрязнении воздуха &#8594;</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.airPollutionNowView {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #ffedbc;
}

.airPollutionNowTitle {
    text-align: center;
}

.airPollutionScroll {
    height: 100%;
    padding: 0 5px;
    overflow: auto;
    font-size: 20px;
}

@media (max-width: 1000px) {
    .airPollutionScroll {
        font-size: 15px;
    }
}

@media (max-width: 600px) {
    .airPollutionScroll {
        font-size: 12px;
    }
}

.airPollutionNow {
    font-size: 25px;
}

@media (max-width: 1000px) {
    .airPollutionNow {
        font-size: 20px;
    }
}

.airPollutionNowElementCards {
    display: flex;
    flex-wrap: wrap;
}

.airPollutionNowElement {
    width: 25%;
    background-color: rgba(220, 220, 220, 0.3);
    border: 1px solid #eeeeee;
    cursor: pointer;
}

.airPollutionNowElement:hover {
    background-color: rgba(220, 220, 220, 0.4);
}

@media (orientation: portrait) {
    .airPollutionNowElement {
        width: 50%;
    }
}

@media (max-width: 800px) {
    .airPollutionNowElement {
        width: 50%;
    }
}

@media (max-width: 400px) {
    .airPollutionNowElement {
        width: 100%;
    }
}

.airPollutionNowElementMain {
    width: 100%;
}

.degree {
    vertical-align: super;
    font-size: 0.6em;
}

.index {
    vertical-align: sub;
    font-size: 0.6em;
}

.airPollutionNowMore {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    text-align: end;
}

@media (max-width: 600px) {
    .airPollutionNowMore {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
    }
}
</style>

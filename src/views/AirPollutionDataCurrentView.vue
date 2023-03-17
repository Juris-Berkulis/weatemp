<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import AirPollutantDescription from '../components/AirPollutantDescription.vue';
import AirPollutionDataCurrentEl from '../components/AirPollutionDataCurrentEl.vue';
import { airPollutionCategoryForDifferentSubstance } from '../helper/helperAirPollution';

export default {
    data() {
        return {
            isShowTableWithDescriptionPollutant: false,
            colorForElementCategory: {
                1: 'green',
                2: 'yellow',
                3: 'orange',
                4: 'red',
                5: 'brown',
                default: 'transparent'
            },
        }
    },
    methods: {
        aqiCategoryDescription(category) {
            switch(category) {
                case 1: return 'Отличный'
                case 2: return 'Средний'
                case 3: return 'Плохой'
                case 4: return 'Вредный'
                case 5: return 'Опасный'
                default: return ''
            }
        },
    },
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
                    airPollutionCategoryDescription: this.aqiCategoryDescription(this.currentAirPollutionDataNow.main.aqi),
                },
                co: {
                    name: "Угарный газ",
                    shortName: "CO",
                    description: "Угарный газ представляет собой газ без цвета и запаха, при его вдыхании в больших количествах могут возникать головные боли, тошнота, головокружение и рвота. Многократное длительное воздействие может вызывать сердечные заболевания",
                    value: this.currentAirPollutionDataNow.components.co,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForCO(this.currentAirPollutionDataNow.components.co),
                },
                nh3: {
                    name: "Аммиак",
                    shortName: "NH3",
                    description: "Аммиак — бесцветный газ с резким запахом. В малой концентрации вызывает жжение в глазах и слезоточивость, при увеличении дозы – химический ожог роговицы и даже слепоту. При вдыхании появляются першение в горле, затрудненное дыхания и кашель. Далее последуют головокружения, тошнота, мучительные мигрени, катар дыхательных путей. Помимо этого, аммиак оказывает нервно-паралитическое действие в виде изменений в поведении и бреда, а также делает гиперчувствительными органы слуха: возможны глухота или судороги и сильные боли в ушах.",
                    value: this.currentAirPollutionDataNow.components.nh3,
                    airPollutionCategory: null,
                },
                no: {
                    name: "Монооксид азота",
                    shortName: "NO",
                    description: "Монооксид азота - ядовитый бесцветный газ с удушающим действием, достаточно быстро окисляющийся до диоксида азота.",
                    value: this.currentAirPollutionDataNow.components.no,
                    airPollutionCategory: null,
                },
                no2: {
                    name: "Диоксид азота",
                    shortName: "NO2",
                    description: "Вдыхание большого количества диоксида азота повышает риск возникновения респираторных заболеваний. Чаще всего возникает кашель, затрудненное дыхание, а при более продолжительном воздействии появляются более серьезные проблемы, такие как респираторные инфекции.",
                    value: this.currentAirPollutionDataNow.components.no2,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForNO2(this.currentAirPollutionDataNow.components.no2),
                },
                o3: {
                    name: "Озон",
                    shortName: "O3",
                    description: "Приземный слой озона может приводить к обострениям существующих респираторных заболеваний, а также вызывать раздражение кожи, головные боли и боль в груди.",
                    value: this.currentAirPollutionDataNow.components.o3,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForO3(this.currentAirPollutionDataNow.components.o3),
                },
                so2: {
                    name: "Сернистый газ",
                    shortName: "SO2",
                    description: "Воздействие сернистого газа может приводить к раздражению горла и глаз, обострению астмы и развитию хронического бронхита.",
                    value: this.currentAirPollutionDataNow.components.so2,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForSO2(this.currentAirPollutionDataNow.components.so2),
                },
                pm2_5: {
                    name: "Мелкодисперсные частицы",
                    shortName: "PM2.5",
                    description: "Мелкие частицы представляют собой вдыхаемые с воздухом частицы загрязняющих веществ диаметром менее 2,5 микрометров, которые могут попадать в легкие и кровеносную систему и приводить к серьезным проблемам со здоровьем. Наиболее серьезное воздействие оказывается на сердце и легкие. Воздействие таких частиц может вызывать кашель, затрудненное дыхание, обострение астмы, а также приводить к развитию хронических респираторных заболеваний.",
                    value: this.currentAirPollutionDataNow.components.pm2_5,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForPM2_5(this.currentAirPollutionDataNow.components.pm2_5),
                },
                pm10: {
                    name: "Крупнодисперсные частицы",
                    shortName: "PM10",
                    description: "Взвешенные частицы представляют собой вдыхаемые с воздухом частицы загрязняющих веществ диаметром менее 10 микрометров. Частицы размером более 2,5 микрометров могут оседать в дыхательных путях и приводить к проблемам со здоровьем. Воздействие таких частиц может вызывать раздражение глаз и горла, кашель, затруднять дыхание или приводить к обострению астмы. Более частое и продолжительное воздействие может приводить к более серьезным последствиям для здоровья.",
                    value: this.currentAirPollutionDataNow.components.pm10,
                    airPollutionCategory: airPollutionCategoryForDifferentSubstance().airPollutionCategoryForPM10(this.currentAirPollutionDataNow.components.pm10),
                },
            }
        },
    },
    components: { AirPollutionDataCurrentEl, AirPollutantDescription }
}
</script>

<template>
    <div class="airPollutionNowView" v-if="currentAirPollutionDataNow">
        <h1 class="airPollutionNowTitle">{{ cityName }}</h1>
        <div class="airPollutionScroll">
            <div class="airPollutionNow">
                <AirPollutionDataCurrentEl class="airPollutionNowElement airPollutionNowElementMain" v-bind:element="elementsDescription.aqi" v-bind:colorForElementCategory="colorForElementCategory"></AirPollutionDataCurrentEl>
                <div class="airPollutionNowElementCards">
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.co" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>CO</template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.nh3" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>NH<span class="index">3</span></template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.no" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>NO</template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.no2" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>NO<span class="index">2</span></template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.o3" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>O<span class="index">3</span></template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.so2" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>SO<span class="index">2</span></template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.pm2_5" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>PM<span class="index">2.5</span></template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                    <AirPollutionDataCurrentEl class="airPollutionNowElement" v-bind:element="elementsDescription.pm10" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>PM<span class="index">10</span></template>
                        <template v-slot:units> мкг/м<span class="degree">3</span></template>
                    </AirPollutionDataCurrentEl>
                </div>
            </div>
            <div class="airPollutionNowMore">
                <p>NH<span class="index">3</span> и NO не влияют на расчет ИКВ.</p>
                <RouterLink to="/air_pollution_data">Прогноз данных о загрязнении воздуха &#8594;</RouterLink>
            </div>
            <div class="airPollutionNowElementsDescriptionsTable">
                <p class="airPollutionNowElementsDescriptionsTitle">
                    <span class="airPollutionNowElementsDescriptionsTitleText" @click="isShowTableWithDescriptionPollutant = !isShowTableWithDescriptionPollutant">
                        <span v-if="isShowTableWithDescriptionPollutant">Скрыть описание</span>
                        <span v-else>Подробнее о загрязняющих веществах</span>
                    </span>
                </p>
                <div v-if="isShowTableWithDescriptionPollutant">
                    <AirPollutantDescription v-bind:element="elementsDescription.co" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>CO</template>
                    </AirPollutantDescription>
                    <AirPollutantDescription v-bind:element="elementsDescription.nh3" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>NH<span class="index">3</span></template>
                    </AirPollutantDescription>
                    <AirPollutantDescription v-bind:element="elementsDescription.no" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>NO</template>
                    </AirPollutantDescription>
                    <AirPollutantDescription v-bind:element="elementsDescription.no2" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>NO<span class="index">2</span></template>
                    </AirPollutantDescription>
                    <AirPollutantDescription v-bind:element="elementsDescription.o3" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>O<span class="index">3</span></template>
                    </AirPollutantDescription>
                    <AirPollutantDescription v-bind:element="elementsDescription.so2" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>SO<span class="index">2</span></template>
                    </AirPollutantDescription>
                    <AirPollutantDescription v-bind:element="elementsDescription.pm2_5" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>PM<span class="index">2.5</span></template>
                    </AirPollutantDescription>
                    <AirPollutantDescription v-bind:element="elementsDescription.pm10" v-bind:colorForElementCategory="colorForElementCategory">
                        <template v-slot:chemicalFormula>PM<span class="index">10</span></template>
                    </AirPollutantDescription>
                </div>
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
    font-size: 24px;
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

.airPollutionNowElementsDescriptionsTitle {
    text-align: center;
    margin: 15px 0 10px;
    font-size: 1.2em;
}

.airPollutionNowElementsDescriptionsTitleText {
    border-bottom: 1px dashed #ffedbc;
    cursor: pointer;
}

.airPollutionNowElementsDescriptionsTitleText:hover {
    border-bottom: 1px dashed transparent;
}
</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

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
}
</script>

<template>
    <div class="weatherOnFiveDaysTable" v-if="weatherOnFiveDays">
        <div class="eachDay" v-for="dayWeather in weatherOnFiveDays.list">
            <div class="eachDayColumn" :style="{height: 5 + 95 * (dayWeather.main.temp - getMaxTempForFiveDays.minTemp) / (getMaxTempForFiveDays.maxTemp - getMaxTempForFiveDays.minTemp) + 'px'}"></div>
            <div>{{ dayWeather.main.temp }}°</div>
        </div>
    </div>
</template>

<style>
.weatherOnFiveDaysTable {
    display: flex;
    overflow-x: auto;
}

.eachDay {
    width: 50px;
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
</style>

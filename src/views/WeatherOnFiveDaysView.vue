<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            weatherOnFiveDays: (state) => state.weatherModule.weatherOnFiveDays,
        }),
    },
    methods: {
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
    }
}
</script>

<template>
    <div style="display: flex; overflow-x: auto;" v-if="weatherOnFiveDays">
        <div style="width: 50px; min-width: 50px; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; margin: 5px;" v-for="dayWeather in weatherOnFiveDays.list">
            <div :style="{width: '100%', backgroundColor: 'darkblue', height: 100 * (dayWeather.main.temp - getMaxTempForFiveDays().minTemp) / (getMaxTempForFiveDays().maxTemp - getMaxTempForFiveDays().minTemp) + 5 + 'px'}"></div>
            <div>{{ dayWeather.main.temp }}°</div>
        </div>
    </div>
</template>

<style>

</style>

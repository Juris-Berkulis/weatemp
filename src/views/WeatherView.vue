<script>
import WeatherForm from '../components/WeatherForm.vue';
import WeatherList from '../components/WeatherList.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    components: {
        WeatherForm,
        WeatherList,
    },
    methods: {
        ...mapActions({
            getWeather: 'weatherModule/getWeather',
            getCityNameFromLocalStorage: 'weatherModule/getCityNameFromLocalStorage',
        }),
    },
    mounted() {
        this.getCityNameFromLocalStorage();
        this.getWeather();
    },
}
</script>

<template>
    <div class="weatherView">
        <WeatherForm></WeatherForm>
        <WeatherList></WeatherList>
    </div>
</template>

<style>
.weatherView {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    max-height: 100%;
}
</style>

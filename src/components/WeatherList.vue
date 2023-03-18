<script>
import WeatherListItem from './WeatherListItem.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    components: {
        WeatherListItem,
    },
    computed: {
        ...mapState({
            weather: (state) => state.weatherModule.weather,
        }),
    },
}
</script>

<template>
    <div class="weatherList" v-if="weather">
        <WeatherListItem></WeatherListItem>
    </div>
</template>

<style>
.weatherList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5vw;
    flex-grow: 1;
    overflow-y: auto;
}

@media (max-width: 1001px) {
    .weatherList {
        padding: 0 15px;
    }
}
</style>

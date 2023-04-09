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
        ...mapGetters({
            getIcon: 'weatherModule/getIcon',
        }),
    },
}
</script>

<template>
    <div class="weatherList" v-if="weather">
        <div class="weatherListImgWrapper">
            <img class="weatherListImg" :src="`${getIcon.imgSrc}`" :alt="`${getIcon.imgAlt}`">
        </div>
        <WeatherListItem></WeatherListItem>
    </div>
</template>

<style lang="scss">
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

.weatherListImgWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #eeeeee;
    background-color: rgba(220, 220, 220, 0.3);
    flex-grow: 1;
    cursor: default;
}

@media (max-width: 1001px) {
    .weatherListImgWrapper {
        margin: 2px;
        padding: 2px;
    }
}

@media (max-width: 401px) {
    .weatherListImgWrapper {
        width: 100%;
    }
}

@media (min-height: 401px) {
    .weatherListImgWrapper {
        display: none;
    }
}

.weatherListImgWrapper:hover {
    background-color: rgba(220, 220, 220, 0.4);
}

.weatherListImg {
    height: 70px;
    width: 70px;
}
</style>

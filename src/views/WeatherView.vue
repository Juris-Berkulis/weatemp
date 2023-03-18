<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import WeatherForm from '../components/WeatherForm.vue';
import TheModalWindow from '../components/UI/TheModalWindow.vue';
import WeatherList from '../components/WeatherList.vue';

export default {
    components: {
        WeatherForm,
        WeatherList,
        TheModalWindow,
    },
    data() {
        return {
            isShowModalWindow: false,
        }
    },
    computed: {
        ...mapState({
            weather: (state) => state.weatherModule.weather,
            cityNameInTitle: (state) => state.weatherModule.cityNameInTitle,
        }),
        ...mapGetters({
            getIcon: 'weatherModule/getIcon',
        }),
    },
}
</script>

<template>
    <div class="weatherView">
        <div class="weatherInfo" v-if="weather">
            <div class="weatherPageTitle">
                <h1 class="weatherItemCity appClickableText" @click="isShowModalWindow = true">{{ cityNameInTitle }}</h1>
                <img class="weatherItemIcon" :src="`${getIcon.imgSrc}`" :alt="`${getIcon.imgAlt}`">
            </div>
            <WeatherList></WeatherList>
        </div>
        <TheModalWindow v-model:isShow="isShowModalWindow">
            <WeatherForm v-model:isShowModalWindow="isShowModalWindow"></WeatherForm>
        </TheModalWindow>
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

.weatherInfo {
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.weatherPageTitle {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.weatherItemCity {
    display: block;
    text-align: center;
    color: #ffedbc;
}

.weatherItemIcon {
    display: block;
    height: 100%;
}
</style>

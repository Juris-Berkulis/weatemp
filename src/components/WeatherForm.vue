<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            cityNameInFormInput: (state) => state.weatherModule.cityNameInFormInput,
        }),
    },
    methods: {
        ...mapMutations({
            setCityNameInFormInput: 'weatherModule/setCityNameInFormInput',
        }),
        ...mapActions({
            getWeather: 'weatherModule/getWeather',
            getCityNameFromFormInput: 'weatherModule/getCityNameFromFormInput',
        }),
        getWeatherData() {
            this.getCityNameFromFormInput(this.cityNameInFormInput);
            this.getWeather();
        },
    },
}
</script>

<template>
    <form class="form" @submit.prevent="getWeatherData" action="">
        <BaseInput v-bind:inputValue="cityNameInFormInput" @update:inputValue="setCityNameInFormInput"></BaseInput>
        <BaseButton>Получить погоду</BaseButton>
    </form>
</template>

<style>
.form {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            cityName: (state) => state.weatherModule.cityName,
        }),
    },
    methods: {
        ...mapMutations({
            setCityName: 'weatherModule/setCityName',
        }),
        ...mapActions({
            getWeather: 'weatherModule/getWeather',
        }),
    },
}
</script>

<template>
    <form class="form" @submit.prevent="getWeather" action="">
        <BaseInput v-bind:inputValue="cityName" @update:inputValue="setCityName"></BaseInput>
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

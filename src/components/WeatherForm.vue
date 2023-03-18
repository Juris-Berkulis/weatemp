<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    props: {
        isShowModalWindow: {
            type: Boolean,
        },
    },
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
            try {
                if (this.cityNameInFormInput) {
                    this.$emit('update:isShowModalWindow', false);

                    this.getCityNameFromFormInput(this.cityNameInFormInput);
                    this.getWeather();
                } else {
                    throw {message: 'Введите название города!'}
                }
            } catch(error) {
                alert(error.message);
            }
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

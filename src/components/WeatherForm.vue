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
            getCoordsByCityName: 'weatherModule/getCoordsByCityName',
            getCoordsByUserLocation: 'weatherModule/getCoordsByUserLocation',
        }),
        async getWeatherDataByCityName() {
            try {
                if (this.cityNameInFormInput) {
                    this.$emit('update:isShowModalWindow', false);

                    this.getCityNameFromFormInput(this.cityNameInFormInput);
                    await this.getCoordsByCityName();
                    await this.getWeather();
                } else {
                    throw {message: 'Введите название города!'}
                }
            } catch(error) {
                alert(error.message);
            }
        },
        getWeatherDataByUserLocation() {
            this.$emit('update:isShowModalWindow', false);

            this.getCoordsByUserLocation();
        },
    },
}
</script>

<template>
    <form class="form" @submit.prevent="getWeatherDataByCityName" action="">
        <div class="formByCityName">
            <BaseInput v-bind:inputValue="cityNameInFormInput" @update:inputValue="setCityNameInFormInput"></BaseInput>
            <BaseButton>Получить погоду</BaseButton>
        </div>
        <div class="formByCoords">
            <p class="formByCoordsBtn">
                <span class="formByCoordsBtnText appClickableText" @click="getWeatherDataByUserLocation">Мое местоположения</span>
            </p>
        </div>
    </form>
</template>

<style>
.form {
    width: 100%;
}

.formByCityName {
    display: flex;
    justify-content: center;
    width: 100%;
}

.formByCoords {
    width: 100%;
}

.formByCoordsBtn {
    margin-top: 10px;
    text-align: right;
    font-size: 20px;
}
</style>

<script>
import WeatherForm from '../WeatherForm.vue';
import TheModalWindow from './TheModalWindow.vue';

export default {
    data() {
        return {
            isShowModalWindow: false,
        }
    },
    components: { 
        TheModalWindow, 
        WeatherForm, 
    },
}
</script>

<template>
    <div class="header">
        <div class="nav">
            <div class="navBtn">
                <RouterLink to="/" id="weatherNowView">Сейчас</RouterLink>
            </div>
            <div class="navBtn">
                <RouterLink to="/weather_on_five_days" id="weatherOnFiveDaysView">На 5 дней</RouterLink>
            </div>
            <div class="navBtn">
                <RouterLink to="/air_pollution_now" id="airPollutionNowView">Загрязнение</RouterLink>
            </div>
            <div class="navBtn">
                <BaseSearchIcon @click="isShowModalWindow = true"></BaseSearchIcon>
            </div>
        </div>
        <TheModalWindow v-model:isShow="isShowModalWindow">
            <WeatherForm v-model:isShowModalWindow="isShowModalWindow"></WeatherForm>
            <BaseInstallPWA class="installPWAComponent">
                <p class="installPWAText appClickableText" id="installPWA">Установить как приложение</p>
            </BaseInstallPWA>
        </TheModalWindow>
    </div>
</template>

<style lang="scss">
.header {
    height: 10vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.navBtn {
    margin: 0 10px;
    text-align: center;
    font-size: 16px;
}

.router-link-exact-active {
    border: none;
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.router-link-exact-active::after {
    width: 0;
}

.installPWAComponent {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.installPWAText {
    text-align: right;
    font-size: 16px;
}
</style>

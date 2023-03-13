<script>
import WeatherForm from '../components/WeatherForm.vue';
import WeatherList from '../components/WeatherList.vue';

export default {
    components: {
        WeatherForm,
        WeatherList,
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

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            weatherInfoList: 'weatherModule/weatherInfoList',
        }),
    },
}
</script>

<template>
    <div class="weatherItem" v-for="weatherInfoItem in weatherInfoList">
        <p>{{ weatherInfoItem.title }}</p>
        <p>
            <span class="weatherItemIcon" :style="{transform: `rotateZ(${weatherInfoItem.degry}deg) translateY(-20%)`,}" v-if="weatherInfoItem.isDirectionIcon">&darr;</span>
            <span>{{ weatherInfoItem.testimony }}</span>
            <span>{{ weatherInfoItem.units }}</span>
        </p>
    </div>
</template>

<style scoped>
.weatherItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #eeeeee;
    color: #ffedbc;
    background-color: rgba(220, 220, 220, 0.3);
    flex-grow: 1;
    flex-basis: 200px;
    font-size: 30px;
    cursor: default;
}

@media (max-width: 1001px) {
    .weatherItem {
        margin: 2px;
        padding: 2px;
    }
}

@media (max-width: 401px) {
    .weatherItem {
        width: 100%;
    }
}

.weatherItem:hover {
    background-color: rgba(220, 220, 220, 0.4);
}

.weatherItemIcon {
    display: inline-block;
    height: 30px;
    width: 30px;
    text-align: center;
    font-size: 30px;
}
</style>

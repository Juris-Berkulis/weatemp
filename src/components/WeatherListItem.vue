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
    <div class="weatherItem" v-for="weatherInfoItem in weatherInfoList" :key="weatherInfoItem.title">
        <p>{{ weatherInfoItem.title }}</p>
        <p>
            <span>{{ weatherInfoItem.testimony }}</span>
            <span :class="{'weatherItemIconWrapper': weatherInfoItem.isDirectionIcon}">
                <span>{{ weatherInfoItem.units }}</span>
                <span class="weatherItemIcon" :style="{transform: `rotateZ(${weatherInfoItem.degry}deg)`,}" v-if="weatherInfoItem.isDirectionIcon">&#x21;</span>
            </span>
        </p>
    </div>
</template>

<style lang="scss" scoped>
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

.weatherItem p:first-child {
    font-size: 27px;
    font-weight: 700;
}

.weatherItemIconWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: pre;
}

.weatherItemIconWrapper span {
    display: block;
}

.weatherItemIcon {
    height: 30px;
    width: 30px;
    font-family: 'Eleganticons';
    text-align: center;
    font-size: inherit;
    line-height: 1;
}
</style>

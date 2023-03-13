<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            weatherInfoList: 'weather/weatherInfoList',
        }),
    },
}
</script>

<template>
    <div class="weatherItem" v-for="weatherInfoItem in weatherInfoList">
        <p>{{ weatherInfoItem.title }}</p>
        <p>
            <span>{{ weatherInfoItem.testimony }}</span>
            <span>{{ weatherInfoItem.units }}</span>
        </p>
    </div>
</template>

<style>
.weatherItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #eeeeee;
    color: #ffedbc;
    background-color: rgba(220, 220, 220, 0.3);
    flex-grow: 1;
    font-size: 30px;
    cursor: default;
}

@media (max-width: 1000px) {
    .weatherItem {
        font-size: 20px;
    }
}

@media (max-width: 600px) {
    .weatherItem {
        font-size: 12px;
    }
}

.weatherItem:hover {
    background-color: rgba(220, 220, 220, 0.4);
}
</style>

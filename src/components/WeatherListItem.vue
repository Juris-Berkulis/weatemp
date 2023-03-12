<script>
export default {
    props: {
        weatherInfoList: {
            type: Array,
        },
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
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #eeeeee;
    color: #ffedbc;
    background-color: rgba(220, 220, 220, 0.3);
    flex-grow: 1;
}
</style>

<script>
export default {

}
</script>

<template>
    <div class="header">
        <div class="nav">
            <div class="navBtn">
                <RouterLink to="/">Сейчас</RouterLink>
            </div>
            <div class="navBtn">
                <RouterLink to="/weather_on_five_days">На 5 дней</RouterLink>
            </div>
            <div class="navBtn">
                <RouterLink to="/air_pollution_data">Загрязнение</RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
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
}
</style>

<script>
export default {

}
</script>

<template>
    <div class="areaNotSelected">
        <div class="areaNotSelectedContent">
            <p class="areaNotSelectedTitle">Weatemp</p>
            <p class="areaNotSelectedTagline">Погода для Вашего местоположения и любого города мира</p>
            <p class="areaNotSelectedText">Введите название города или выберите получение погоды для текущего местоположения</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.areaNotSelected {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.areaNotSelectedContent {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffedbc;
    font-size: 70px;
    overflow: auto;
}

@media (max-width: 1001px) {
    .areaNotSelectedContent {
        font-size: 50px;
    }
}

@media (max-width: 701px) {
    .areaNotSelectedContent {
        font-size: 30px;
    }
}

@media (max-width: 401px) {
    .areaNotSelectedContent {
        font-size: 20px;
    }
}

.areaNotSelectedTitle {
    text-align: center;
    font-size: 2em;
    line-height: 1em;
    margin-bottom: 5px;
}

.areaNotSelectedTagline {
    text-align: center;
    font-size: 0.3em;
    line-height: 1em;
    margin-bottom: 10px;
}

.areaNotSelectedText {
    text-align: center;
    font-size: 0.5em;
    line-height: 1em;
}
</style>

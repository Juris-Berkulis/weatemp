<script>
export default {
    props: {
        element: {
            type: Object,
        },
    },
    data() {
        return {
            colorForElementCategory: {
                1: 'green',
                2: 'yellow',
                3: 'orange',
                4: 'red',
                5: 'brown',
                default: 'transparent'
            },
        }
    },
}
</script>

<template>
    <div class="element">
        <p class="elementInfo" v-if="element.name">{{ element.name }}</p>
        <p class="elementInfo" v-if="element.shortName">{{ element.shortName }}</p>
        <p class="elementInfo elementInfoBig">{{ !isNaN(element.value) ? element.value : 'н/д' }} <slot v-if="!isNaN(element.value)"></slot></p>
        <div class="elementInfo elementInfoLine" :style="{backgroundColor: element.airPollutionCategory && !isNaN(element.value) ? colorForElementCategory[element.airPollutionCategory] : colorForElementCategory.default}"></div>
    </div>
</template>

<style scoped>
.element {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.elementInfo {
    margin: 5px 0;
    text-align: center;
}

.elementInfoBig {
    font-size: 1.2em;
}

.elementInfoLine {
    height: 3px;
    width: 40%;
    max-width: 100px;
}
</style>

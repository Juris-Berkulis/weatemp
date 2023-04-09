<script>
export default {
    props: {
        element: {
            type: Object,
        },
        colorForElementCategory: {
            type: Object,
        },
    },
}
</script>

<template>
    <div class="elementDescription">
        <div class="elementDescriptionCell elementDescriptionFormulaWrapper">
            <p class="elementDescriptionFormula">
                <slot name="chemicalFormula"></slot>
            </p>
            <div class="elementDescriptionLine" :style="{backgroundColor: element.airPollutionCategory && !isNaN(element.value) ? colorForElementCategory[element.airPollutionCategory] : colorForElementCategory.default}"></div>
        </div>
        <div class="elementDescriptionCell elementDescriptionTextWrapper">
            <p class="elementDescriptionText">{{ element.description }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.elementDescription {
    width: 100%;
    display: flex;
    background-color: rgba(220, 220, 220, 0.3);
    border: 1px solid #eeeeee;
}

@media (orientation: portrait) {
    .elementDescription {
        flex-direction: column;
    }
}

.elementDescription:hover {
    background-color: rgba(220, 220, 220, 0.4);
}

.elementDescriptionCell {
    display: flex;
    align-items: center;
    padding: 10px;
}

.elementDescriptionFormulaWrapper {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #eeeeee;
}

@media (orientation: portrait) {
    .elementDescriptionFormulaWrapper {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        border-bottom: 1px solid #eeeeee;
    }
}

.elementDescriptionLine {
    height: 3px;
    width: 40%;
    max-width: 100px;
    margin: 5px 0;
}

.elementDescriptionTextWrapper{
    flex-grow: 1;
}
</style>

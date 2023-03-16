<script>
export default {
    props: {
        element: {
            type: Object,
        },
    },
}
</script>

<template>
    <div class="element">
        <p class="elementInfo" v-if="element.name">{{ element.name }}</p>
        <p class="elementInfo" v-if="element.shortName">{{ element.shortName }}</p>
        <p class="elementInfo elementInfoBig" v-if="element.value">{{ element.value }} <slot></slot></p>
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
</style>

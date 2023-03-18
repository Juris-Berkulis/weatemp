<script>

export default {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeModalWindow() {
            this.$emit('update:isShow', false);
        },
    },
}
</script>

<template>
    <div class="modalWindowField" v-if="isShow" @click="closeModalWindow">
        <div class="modalWindow" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.modalWindowField {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    cursor: pointer;
}

.modalWindow {
    min-height: 200px;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    border: 2px solid #eeeeee;
    border-radius: 20px;
    background-color: cornflowerblue;
    color: #ffedbc;
    cursor: default;
}

@media (max-width: 401px) {
    .modalWindow {
        min-height: auto;
        min-width: auto;
        margin: 20px;
    }
}
</style>

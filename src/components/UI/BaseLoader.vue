<script>
export default {
    name: 'BaseLoader',
}
</script>

<template>
<div class="loaderWrapper">
    <div class="loader"></div>
</div>
</template>

<style lang="scss" scoped>
@keyframes loaderAnimation {
    0% {
        transform: rotateZ(0deg) scale(1);
        border: 20px solid #ffedbc;
        border-left: 25px solid transparent;
    }

    25% {
        transform: rotateZ(90deg) scale(0.8);
        border: 10px solid #ffedbc;
        border-left: 15px solid transparent;
    }

    50% {
        transform: rotateZ(180deg) scale(1);
        border: 20px solid #ffedbc;
        border-left: 25px solid transparent;
    }

    75% {
        transform: rotateZ(270deg) scale(0.8);
        border: 10px solid #ffedbc;
        border-left: 15px solid transparent;
    }

    100% {
        transform: rotateZ(360deg) scale(1);
        border: 20px solid #ffedbc;
        border-left: 25px solid transparent;
    }
}

.loaderWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 20px solid #ffedbc;
    border-left: 25px solid transparent;
    animation: loaderAnimation 3s linear 0s infinite normal;
}
</style>

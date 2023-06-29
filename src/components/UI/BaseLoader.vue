<script>
export default {
    name: 'BaseLoader',
}
</script>

<template>
<div class="loader">
    <div class="loaderSpinner loaderSpinner1"></div>
    <div class="loaderSpinner loaderSpinner2"></div>
    <div class="loaderSpinner loaderSpinner3"></div>
</div>
</template>

<style lang="scss" scoped>
@keyframes loaderSpinnerAnimation1 {
    0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
        border: 20px solid #ffedbc;
        border-left: 25px solid transparent;
    }

    25% {
        transform: translate(-50%, -50%) rotateZ(90deg);
        border: 10px solid #ffedbc;
        border-left: 15px solid transparent;
    }

    50% {
        transform: translate(-50%, -50%) rotateZ(180deg);
        border: 20px solid #ffedbc;
        border-left: 25px solid transparent;
    }

    75% {
        transform: translate(-50%, -50%) rotateZ(270deg);
        border: 10px solid #ffedbc;
        border-left: 15px solid transparent;
    }

    100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
        border: 20px solid #ffedbc;
        border-left: 25px solid transparent;
    }
}

@keyframes loaderSpinnerAnimation2 {
    0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
        border-bottom: 15px solid transparent; //* - Свойство необходимо просто, чтобы анимация останавливалась во время отображения окна "alert()".
    }

    100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
        border-bottom: 15px solid transparent; //* - Свойство необходимо просто, чтобы анимация останавливалась во время отображения окна "alert()".
    }
}

@keyframes loaderSpinnerAnimation3 {
    0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
        border: 10px solid #ffedbc;
        border-left: 15px solid transparent;
    }

    25% {
        transform: translate(-50%, -50%) rotateZ(90deg);
        border: 5px solid #ffedbc;
        border-left: 10px solid transparent;
    }

    50% {
        transform: translate(-50%, -50%) rotateZ(180deg);
        border: 10px solid #ffedbc;
        border-left: 15px solid transparent;
    }

    75% {
        transform: translate(-50%, -50%) rotateZ(270deg);
        border: 5px solid #ffedbc;
        border-left: 10px solid transparent;
    }

    100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
        border: 10px solid #ffedbc;
        border-left: 15px solid transparent;
    }
}

.loader {
    position: relative;
    width: 100%;
    height: 100%;
}

.loaderSpinner {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
}

.loaderSpinner1 {
    width: 110px;
    height: 110px;
    box-sizing: content-box;
    border: 20px solid #ffedbc;
    border-left: 25px solid transparent;
    animation: loaderSpinnerAnimation1 3s linear 0s infinite normal;
}

.loaderSpinner2 {
    width: 100px;
    height: 100px;
    border: 10px solid #ffedbc;
    border-bottom: 15px solid transparent;
    animation: loaderSpinnerAnimation2 1s linear 0s infinite reverse;
}

.loaderSpinner3 {
    width: 70px;
    height: 70px;
    border: 10px solid #ffedbc;
    border-right: 15px solid transparent;
    animation: loaderSpinnerAnimation3 2s linear 0s infinite normal;
}
</style>

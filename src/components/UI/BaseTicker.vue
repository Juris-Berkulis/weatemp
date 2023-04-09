<script>
export default {
    name: 'BaseTicker',
}
</script>

<template>
    <div>
        <div class="tickerWrapper">
            <div class="ticker">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@keyframes tickerAnimation {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

.tickerWrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
}

.ticker {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-left: 100%;
    animation: tickerAnimation 10s linear 1s infinite normal;
}
</style>

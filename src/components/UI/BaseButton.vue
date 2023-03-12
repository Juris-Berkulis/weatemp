<script>
export default {
    name: 'BaseButton',
}
</script>

<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<style>
.btn {
    height: 100%;
    padding: 15px;
    background-color: slateblue;
    color: #eeeeee;
    border: 1px solid #eeeeee;
    border-left: 1px solid transparent;
    border-radius: 15px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    cursor: pointer;
}

.btn:hover {
    background-color: darkblue;
}
</style>

<script>
export default {
    name: 'BaseSearchIcon',
}
</script>

<template>
    <div class="SearchIcon">
        <div class="SearchIconCircle">
            <div class="SearchIconLever"></div>
        </div>
    </div>
</template>

<style scoped>
.SearchIcon {
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.SearchIconCircle {
    position: relative;
    height: 50%;
    width: 50%;
    border: 4px solid #ffedbc;
    border-radius: 50%;
    transform: translateY(-15%) rotateZ(45deg);
}

.SearchIconLever {
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 150%;
    width: 4px;
    background-color: #ffedbc;
    transform: translate(-50%, 100%);
}
</style>

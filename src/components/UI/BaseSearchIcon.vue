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

<style lang="scss" scoped>
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
    height: 40%;
    width: 40%;
    border: 3px solid #ffedbc;
    border-radius: 50%;
    transform: translateY(-15%) rotate(-45deg);
}

.SearchIconLever {
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 145%;
    width: 3px;
    background-color: #ffedbc;
    transform: translate(-50%, 100%);
    border-bottom-left-radius: 1.5px;
    border-bottom-right-radius: 1.5px;
}
</style>

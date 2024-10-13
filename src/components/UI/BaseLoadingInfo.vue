<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'BaseLoadingInfo',
    computed: {
        ...mapState({
            loadingInfo: (state) => state.weatherModule.loadingInfo,
        }),
    },
}
</script>

<template>
<div class="loadingInfo">
    <p v-if="loadingInfo">{{ loadingInfo }}</p>
</div>
</template>

<style lang="scss" scoped>
.loadingInfo {
    padding: 10px 20px;
    color: #eeeeee;
    font-size: 30px;
}
</style>

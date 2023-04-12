<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'BaseInstallPWA',
    computed: {
        ...mapState({
            deferredPromptForPWA: (state) => state.appSettingModule.deferredPromptForPWA,
            isShowBtnForInstallPWA: (state) => state.appSettingModule.isShowBtnForInstallPWA,
        }),
    },
    methods: {
        ...mapActions({
            setDeferredPromptForPWAAction: 'appSettingModule/setDeferredPromptForPWAAction',
            setIsShowBtnForInstallPWAAction: 'appSettingModule/setIsShowBtnForInstallPWAAction',
        }),
        async onClickForBtn() {
            // Hide the app provided install promotion
            this.setIsShowBtnForInstallPWAAction(false);
            // Show the install prompt
            this.deferredPromptForPWA.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await this.deferredPromptForPWA.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            this.setDeferredPromptForPWAAction(null);
        },
    },
}
</script>

<template>
<div class="installPWA" v-if="isShowBtnForInstallPWA">
    <div class="installPWAClick" @click="onClickForBtn">
        <slot></slot>
    </div>
</div>
</template>

<style scoped>
.installPWAClick {
    display: inline-block;
}
</style>

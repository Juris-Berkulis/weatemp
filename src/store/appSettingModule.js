export const appSettingModule = {
    namespaced: true,
    state: () => ({
        deferredPromptForPWA: null,
        isShowBtnForInstallPWA: false,
    }),
    getters: {
        getDeferredPromptForPWA(state) {
            return state.deferredPromptForPWA
        },
        getIsShowBtnForInstallPWA(state) {
            return state.isShowBtnForInstallPWA
        },
    },
    mutations: {
        setDeferredPromptForPWA(state, deferredPromptForPWA) {
            state.deferredPromptForPWA = deferredPromptForPWA;
        },
        setIsShowBtnForInstallPWA(state, isShowBtnForInstallPWA) {
            state.isShowBtnForInstallPWA = isShowBtnForInstallPWA;
        },
    },
    actions: {
        setDeferredPromptForPWAAction({commit}, deferredPromptForPWA) {
            commit('setDeferredPromptForPWA', deferredPromptForPWA);
        },
        setIsShowBtnForInstallPWAAction({commit}, isShowBtnForInstallPWA) {
            commit('setIsShowBtnForInstallPWA', isShowBtnForInstallPWA);
        },
    },
};

<script>
import { RouterView } from 'vue-router'
import TheHeader from './components/UI/TheHeader.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import AreaNotSelected from './components/AreaNotSelected.vue';
import {
  registerServiceWorker,
  unregisterServiceWorker
} from './serviceWorker/registrationServiceWorker';
import GoogleAnalytics from './analytics/GoogleAnalitics';

export default {
  components: {
    TheHeader,
    AreaNotSelected,
  },
  computed: {
    ...mapState({
      cityNameInTitle: (state) => state.weatherModule.cityNameInTitle,
      isWeatherLoaded: (state) => state.weatherModule.isWeatherLoaded,
      cityName: (state) => state.weatherModule.cityName,
      byCoordsDuringAppStart: (state) => state.weatherModule.byCoordsDuringAppStart,
    }),
  },
  methods: {
    ...mapActions({
      getCityNameFromLocalStorage: 'weatherModule/getCityNameFromLocalStorage',
      getCoordsByCityName: 'weatherModule/getCoordsByCityName',
      getCoordsByUserLocation: 'weatherModule/getCoordsByUserLocation',
      getByCoordsDuringAppStartFromLocalStorage: 'weatherModule/getByCoordsDuringAppStartFromLocalStorage',
      isWeatherLoadedAction: 'weatherModule/isWeatherLoadedAction',
      setDeferredPromptForPWAAction: 'appSettingModule/setDeferredPromptForPWAAction',
      setIsShowBtnForInstallPWAAction: 'appSettingModule/setIsShowBtnForInstallPWAAction',
    }),
  },
  async mounted() {
    this.getByCoordsDuringAppStartFromLocalStorage();

    if (this.byCoordsDuringAppStart) {
      this.getCoordsByUserLocation();
    } else {
      this.getCityNameFromLocalStorage();

      if (this.cityName) {
        await this.getCoordsByCityName();
      } else {
        this.isWeatherLoadedAction();
      }
    }

    if (process.env.NODE_ENV === 'production') {
      //* Register a service-worker:
      registerServiceWorker();

      const onBeforeInstallPrompt = () => {
        return (event) => {
          // Prevent the mini-infobar from appearing on mobile
          event.preventDefault();
          // Stash the event so it can be triggered later.
          this.setDeferredPromptForPWAAction(event);
          // Update UI notify the user they can install the PWA
          this.setIsShowBtnForInstallPWAAction(true);
          // Optionally, send analytics event that PWA install promo was shown.
          console.log('This application can be installed on the home screen.');
        }
      };

      const onAppInstalled = () => {
        return () => {
          // Hide the app-provided install promotion
          this.setIsShowBtnForInstallPWAAction(false);
          // Clear the deferredPrompt so it can be garbage collected
          this.setDeferredPromptForPWAAction(null);
          // Optionally, send analytics event to indicate successful install
          console.log('The application has been successfully installed.');
        }
      };

      const lissenBeforeInstallPrompt = () => {
        window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt());
      };

      const lissenAppInstalled = () => {
        window.addEventListener('appinstalled', onAppInstalled());
      }

      //* Подробнее на сайте: "https://web.dev/i18n/ru/customize-install/":
      lissenBeforeInstallPrompt();
      lissenAppInstalled();

      //* Подключение Google Analytics:
      new GoogleAnalytics();
    } else {
      //* Do not register a service-worker:
      unregisterServiceWorker();
    }
  },
}
</script>

<template>
  <div class="app">
    <TheHeader class="basicPageElementsHeader"></TheHeader>
    <BaseTicker class="basicPageElementsTicker" v-if="isWeatherLoaded && cityNameInTitle">
      <h1 class="cityNameInTitle">{{ cityNameInTitle }}</h1>
    </BaseTicker>
    <div class="page basicPageElementsPage" v-if="isWeatherLoaded && cityNameInTitle">
      <div class="pageContent">
        <RouterView />
      </div>
    </div>
    <AreaNotSelected v-if="isWeatherLoaded && !cityNameInTitle"></AreaNotSelected>
    <BaseLoader v-if="!isWeatherLoaded"></BaseLoader>
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: cornflowerblue;
}

.basicPageElementsHeader,
.basicPageElementsTicker,
.basicPageElementsPage {
  order: 0;
}

@media (orientation: portrait) {
  .basicPageElementsHeader {
    order: 1;
  }
}

.cityNameInTitle {
  text-align: center;
  color: #ffedbc;
}

.cityNameInTitle::first-letter {
  text-transform: uppercase;
}

.page { /** - Высота блока с классом "page" имеет зависимость от полной высоты блока "h1". */
  height: calc(90% - 80px);
  width: 100%;
  padding: 0 5vw 5vh;
}

@media (max-width: 1001px) {
  .page { /** - Высота блока с классом "page" имеет зависимость от полной высоты блока "h1". */
    height: calc(90% - 60px);
    padding: 0 1vw 1vh;
  }
}

@media (max-width: 701px) {
  .page { /** - Высота блока с классом "page" имеет зависимость от полной высоты блока "h1". */
    height: calc(90% - 40px);
  }
}

@media (max-width: 401px) {
  .page { /** - Высота блока с классом "page" имеет зависимость от полной высоты блока "h1". */
    height: calc(90% - 30px);
  }
}

@media (orientation: portrait) {
  .page {
    padding: 1vh 5vw 0;
  }
}

.pageContent {
  height: 100%;
  width: 100%;
}

.appClickableText {
  border-bottom: 1px dashed #ffedbc;
  cursor: pointer;
  transition: border-bottom 0.2s;
}

.appClickableText:hover {
  border-bottom: 1px dashed transparent;
}
</style>

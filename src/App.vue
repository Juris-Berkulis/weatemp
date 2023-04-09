<script>
import { RouterView } from 'vue-router'
import TheHeader from './components/UI/TheHeader.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import AreaNotSelected from './components/AreaNotSelected.vue';

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
      getWeather: 'weatherModule/getWeather',
      getCityNameFromLocalStorage: 'weatherModule/getCityNameFromLocalStorage',
      getCoordsByCityName: 'weatherModule/getCoordsByCityName',
      getCoordsByUserLocation: 'weatherModule/getCoordsByUserLocation',
      getByCoordsDuringAppStartFromLocalStorage: 'weatherModule/getByCoordsDuringAppStartFromLocalStorage',
      isWeatherLoadedAction: 'weatherModule/isWeatherLoadedAction',
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
        await this.getWeather();
      } else {
        this.isWeatherLoadedAction();
      }
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
}

.appClickableText:hover {
  border-bottom: 1px dashed transparent;
}
</style>

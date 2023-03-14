<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/UI/TheHeader.vue';
</script>

<template>
  <div class="app">
    <TheHeader></TheHeader>
    <div class="page">
      <div class="pageContent">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100vh;
  width: 100vw;
}

body {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
}

.app {
  height: 100%;
  width: 100%;
  background-color: cornflowerblue;
}

.page {
  height: 90vh;
  width: 100%;
  padding: 10vh 5vw;
}

.pageContent {
  height: 100%;
  width: 100%;
}
</style>

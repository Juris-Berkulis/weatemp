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

a {
    color: darkblue;
    text-decoration: none;
    border-bottom: 1px dashed darkblue;
}

a:hover {
    color: darkblue;
    border-bottom: 1px dashed transparent;
}

a:active {
    color: slateblue;
    border-bottom: 1px dashed transparent;
}

h1 {
  font-size: 70px;
  white-space: nowrap;
}

@media (max-width: 1001px) {
    h1 {
        font-size: 50px;
    }
}

@media (max-width: 701px) {
    h1 {
        font-size: 30px;
    }
}

@media (max-width: 401px) {
    h1 {
        font-size: 20px;
    }
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
  padding: 0 5vw 5vh;
}

@media (max-width: 1001px) {
  .page {
    padding: 0 1vw 1vh;
  }
}

.pageContent {
  height: 100%;
  width: 100%;
}
</style>

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

.titleImg {
  height: 70px;
}

@media (max-width: 1001px) {
    h1 {
        font-size: 50px;
    }

    .titleImg {
      height: 50px;
    }
}

@media (max-width: 701px) {
    h1 {
        font-size: 30px;
    }

    .titleImg {
      height: 30px;
    }
}

@media (max-width: 401px) {
    h1 {
        font-size: 20px;
    }

    .titleImg {
      height: 20px;
    }
}

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

@media (orientation: portrait) {
    .app {
      flex-direction: column-reverse;
    }
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

@keyframes ticker {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

.appTickerWrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
}

.appTicker {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-left: 100%;
    animation: ticker 10s linear 1s infinite normal;
}
</style>

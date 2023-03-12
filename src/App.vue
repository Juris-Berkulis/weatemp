<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
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

.app {
  height: 100vh;
  width: 100vw;
  background-color: cornflowerblue;
}

.page {
  height: 100%;
  width: 100%;
  padding: 10vh 10vw;
}

.pageContent {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-dialog-provider>
</template>

<script lang="ts" setup>
import { NMessageProvider, NDialogProvider } from 'naive-ui'
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.system {
  font-family: 华文新魏;
  font-size: 36px;
  font-weight: bolder;
}
</style>

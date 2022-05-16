<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 0;">
      <MenuList />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>欢迎使用</n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
      <!-- <n-layout-footer>成府路</n-layout-footer> -->
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
} from 'naive-ui'
import MenuList from './MenuList.vue'
</script>

<style scoped lang="scss">
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  // background: #001428;
  background: rgb(176, 172, 172);
  width: 10%;
  height: 100vh;
}

.n-layout-content {
  // background: rgba(128, 128, 128, 0.4);
  height: 85%;
}
</style>

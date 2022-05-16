<template>
  <div>
    <n-tabs type="line" :size="size">
      <n-tab-pane name="oasis" tab="学生选课">
        <Base />
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="学生选课数量表">
        <Count />
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="学生成绩表">
        <StudentGrade />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import Base from './Base.vue'
import Count from './Count.vue'
import StudentGrade from './StudentGrade.vue'
import {NTabs, NTabPane} from 'naive-ui'
</script>

<style></style>

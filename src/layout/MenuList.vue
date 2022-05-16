<template>
  <div>
    <div class="system">学生信息管理系统</div>
    <n-menu accordion="true" :options="menuOptions" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
const menuOptions: MenuOption[] = [
  {
    label: '学生管理',
    key: 'student',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/student',
              },
            },
            { default: () => '学生基本信息' }
          ),
        key: 'stuBase',
      },
      {
        label: '学生-院系管理',
        key: 'stuDepartment',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/borrow',
              },
            },
            { default: () => '学生-借阅管理' }
          ),
        key: 'stuBorrow',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/study',
              },
            },
            { default: () => '学生课程管理' }
          ),
        key: 'stuCourse',
      },
      {
        key: 'stuDormitory',
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/stay',
              },
            },
            { default: () => '学生-住宿管理' }
          ),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/apprenticeship',
              },
            },
            { default: () => '学生-导师管理' }
          ),
        key: 'stuTutor',
      },
    ],
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: '教师管理',
    key: 'tutor',
    children: [
      {
        label: '教师基本信息管理',
        key: 'tutorBase',
      },
      {
        label: '研究室管理',
        key: 'researchRoom',
      },
    ],
  },
  {
    key: 'divider-2',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/books',
          },
        },
        { default: () => '图书管理' }
      ),
    key: 'book',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/department',
          },
        },
        { default: () => '院系管理' }
      ),
    key: 'department',
  },
  {
    key: 'course',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/course',
          },
        },
        { default: () => '课程管理' }
      ),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/dormitory',
          },
        },
        { default: () => '宿舍管理' }
      ),
    key: 'dormitory',
  },
]
</script>

<style scoped>
.n-menu {
  color: white !important;
}
.system {
  font-family: 华文新魏;
  font-size: 28px;
  color: black;
}
</style>

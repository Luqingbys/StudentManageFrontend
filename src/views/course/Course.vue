<template>
  <div>
    <n-input-group>
      <n-input
        placeholder="输入课程名"
        :style="{ width: '20%' }"
        v-model:value="courseName"
      />
      <n-button style="margin-right: 40px" @click="fetchCourses" type="primary" ghost> 搜索 </n-button>
      <n-button @click="fetchCourses" type="primary"> 新增课程 </n-button>
    </n-input-group>

  </div>
  <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import {
  NButton,
  useMessage,
  DataTableColumns,
  NDataTable,
  NInputGroup,
  NInput,
} from 'naive-ui'
import axios from '@/plugins/axios'

interface Course {
  c_id: string
  c_name: string
  credit: number
}

const courseName = ref('')

const createColumns = ({
  play,
}: {
  play: (row: Course) => void
}): DataTableColumns<Course> => {
  return [
    {
      title: '课程号',
      key: 'c_id',
    },
    {
      title: '课程名',
      key: 'c_name',
    },
    {
      title: '学分',
      key: 'credit',
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row),
          },
          { default: () => 'Play' }
        )
      },
    },
  ]
}

const data: Ref<Course[]> = ref([])

const message = useMessage()
const columns = createColumns({
  play(row: Course) {
    message.info(`Play ${row.title}`)
  },
})

const fetchCourses = async () => {
  try {
    const respData = await axios.get(
      `/checkCourses?courseName=${courseName.value}`
    )
    data.value = respData.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchCourses()
})
</script>

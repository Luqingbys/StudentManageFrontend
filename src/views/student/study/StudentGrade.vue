<template>
  <div>
    <n-button type="primary" @click="fetchFailed">查询挂科情况</n-button>
  </div>

  <n-data-table
    :columns="columns"
    :data="data"
    :bordered="false"
    :striped="true"
  />
</template>

<script lang="ts" setup>
import Count from './Count.vue'
import { h, defineComponent, ref, Ref, onMounted, reactive } from 'vue'
import {
  NDataTable,
  NButton,
  useMessage,
  DataTableColumns,
  NInput,
  NInputGroup,
  NTabs,
  NTabPane,
} from 'naive-ui'
import axios from '@/plugins/axios'

interface Study {
  study_id: string
  student_id: string
  s_name: string
  de_name: string
  course_id: string
  c_name: string
  grade: number
}

const createColumns = ({
  play,
}: {
  play: (row: Study) => void
}): DataTableColumns<Study> => {
  return [
    {
      title: '成绩单号',
      key: 'study_id',
    },
    {
      title: '学号',
      key: 'student_id',
    },
    {
      title: '姓名',
      key: 's_name',
    },
    {
      title: '所在系',
      key: 'de_name',
    },
    {
      title: '课程号',
      key: 'course_id',
    },
    {
      title: '课程名',
      key: 'c_name',
    },
    {
      title: '成绩',
      key: 'grade',
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

const data: Ref<Study[] | {}> = ref([])

const message = useMessage()

const columns = createColumns({
  play(row: Study) {
    message.info(`Play ${row.title}`)
  },
})

const form = reactive({
  studentName: '',
  courseName: '',
})

const fetchAllStudies = async () => {
  try {
    const respData = await axios.get(
      `/checkStudy?studentName=${form.studentName}&courseName=${form.courseName}`
    )
    data.value = respData.data.data
    console.log('获取全部学生修课信息：', respData)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchAllStudies()
})

const score = ref(0)

// 查询挂科情况
const fetchFailed = async () => {
  try {
    const respData = await axios.get('/checkFailed')
    data.value = respData.data.data
  } catch (err) {
    console.log(err)
  }
}
</script>

<style></style>

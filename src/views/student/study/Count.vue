<template>
  <div>
    <div>
      <n-input-group>
        <n-input
          placeholder="输入课程数量"
          :style="{ width: '20%' }"
          v-model:value="count"
        />
        <n-button @click="fetchTopStudies" type="primary" ghost>
          搜索
        </n-button>
      </n-input-group>
    </div>

    <n-data-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :striped="true"
    />
  </div>
</template>

<script lang="ts" setup>
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
  student_id: string
  s_name: string
  de_name?: string
  course_num: number
}

const createColumns = ({
  play,
}: {
  play: (row: Study) => void
}): DataTableColumns<Study> => {
  return [
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
      title: '修课数目',
      key: 'course_num',
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
      `/checkCourseCount?count=${form.studentName}&courseName=${form.courseName}`
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

const count = ref(0)

const fetchTopStudies = async () => {
  try {
    const respData = await axios.get(`/checkCourseCount?count=${count.value}`)
    console.log('查询高于指定数目课程的分组查询结果：', respData)
    data.value = respData.data.data
  } catch (err) {
    console.log(err)
  }
}
</script>

<style></style>

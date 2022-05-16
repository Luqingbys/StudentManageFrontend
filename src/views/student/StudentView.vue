<template>
  <div>
    <div>
      <n-input-group>
        <n-input
          placeholder="输入导师姓名"
          :style="{ width: '20%' }"
          v-model:value="searchTutor"
        />
        <n-button
          style="margin-right: 20px"
          @click="fetchStuofTutor"
          type="primary"
          ghost
        >
          搜索
        </n-button>
        <n-button type="success" @click="showModal = true">新增</n-button>
      </n-input-group>
    </div>
    <n-data-table :columns="columns" :data="data" :bordered="false"         :pagination="pagination" />
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="新增学生"
        :bordered="true"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form
          ref="formRef"
          :model="model"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          :style="{
            maxWidth: '640px',
          }"
        >
          <n-form-item label="学号" path="inputValue">
            <n-input v-model:value="model.stuId" placeholder="Input" />
          </n-form-item>
          <n-form-item label="姓名" path="inputValue">
            <n-input v-model:value="model.stuName" placeholder="Input" />
          </n-form-item>
          <n-form-item label="性别" path="inputValue">
            <n-select
              v-model:value="model.sex"
              placeholder="请选择性别"
              :options="sexOptions"
            />
          </n-form-item>
          <n-form-item label="所在系号" path="inputValue">
            <n-input v-model:value="model.departmentId" placeholder="Input" />
          </n-form-item>
          <n-form-item label="宿舍编号" path="inputValue">
            <n-input v-model:value="model.dormitoryId" placeholder="Input" />
          </n-form-item>
          <n-form-item label="导师工号" path="inputValue">
            <n-input v-model:value="model.tutorId" placeholder="Input" />
          </n-form-item>

          <div style="display: flex; justify-content: flex-end">
            <n-button type="primary" @click="addBaseStudent"> 确认 </n-button>
          </div>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, h, defineComponent, onMounted, reactive } from 'vue'
import {
  NDataTable,
  NButton,
  useMessage,
  DataTableColumns,
  NInput,
  NInputGroup,
  NModal,
  NCard,
  NForm,
  NFormItem,
  NSelect,
} from 'naive-ui'
import axios from '@/plugins/axios'

interface Student {
  s_id: string
  s_name: string
  s_sex: string
  department: string
  dormitory: string
  tutor: string
}

const createColumns = ({
  play,
}: {
  play: (row: Student) => void
}): DataTableColumns<Student> => {
  return [
    {
      title: '学号',
      key: 's_id',
    },
    {
      title: '姓名',
      key: 's_name',
    },
    {
      title: '性别',
      key: 's_sex',
    },
    {
      title: '院系编号',
      key: 'department',
    },
    {
      title: '宿舍号',
      key: 'dormitory',
    },
    {
      title: '导师工号',
      key: 'tutor',
    },
    {
      title: '操作',
      key: 'action',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row),
          },
          { default: () => '编辑' }
        )
      },
    },
  ]
}

const searchTutor = ref('')

const data: Ref<Student[]> = ref([])

const message = useMessage()

const columns = createColumns({
  play(row: Student) {
    message.info(`Play ${row.title}`)
  },
})

const fetchAllStudents = async () => {
  try {
    const respData = await axios.get('/checkBaseStudent')
    data.value = respData.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchAllStudents()
})

const fetchStuofTutor = async () => {
  try {
    const respData = await axios.get(
      `/checkStuofTutor?tutorName=${searchTutor.value}`
    )

    console.log('指定教师下的学生：', respData)
    if (respData.data.msg === 'success') {
      message.success('搜索成功!')
      data.value = respData.data.data
    } else {
      message.error('数据获取失败!')
    }
  } catch (err) {
    console.log(err)
  }
}

let showModal = ref(false)
const model = reactive({
  stuId: null,
  stuName: null,
  sex: null,
  departmentId: null,
  dormitoryId: null,
  tutorId: null,
})
const sexOptions = [
  { label: '男', value: '男' },
  {
    label: '女',
    value: '女',
  },
]
// 添加学生信息
const addBaseStudent = async () => {
  try {
    const respData = await axios.post('/addBaseStudent', model)
    console.log('添加学生结果：', respData)
    const msg = respData.data.msg
    if (msg !== 'success') {
      // 请求正常，但是触发错误
      // 判断是不是完整性约束（主键约束）
      if (msg[0] === 1048) {
        //   message.error(msg[1])
        message.error('请检查是否出现必填的空属性值!')
      } else if (msg[0] === 1452) {
        message.error('请检查外键属性值是否存在!')
      } else if (msg[0] === 1062) {
        message.error('请检查编号（主键）值是否唯一!')
      }
    } else {
      // 插入数据成功!
      message.success('添加数据成功!')
    }
  } catch (err) {
    console.log(err)
  }
}


const pagination = {
  pageSize: 6,
}

</script>

<style></style>

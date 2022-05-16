<template>
  <div>
    <div>
      <n-input-group>
        <n-input
          placeholder="输入课程数量"
          :style="{ width: '20%' }"
          v-model:value="count"
        />
        <n-button style="margin-right: 20px" type="primary" ghost>
          搜索
        </n-button>
        <n-button @click="showModal = true" type="primary"> 新增 </n-button>
      </n-input-group>
    </div>
    <n-data-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :striped="true"
    />
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="模态框"
        :bordered="false"
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
          <n-form-item label="编号" path="inputValue">
            <n-input v-model:value="model.studyId" placeholder="Input" />
          </n-form-item>
          <n-form-item label="学号" path="inputValue">
            <n-input v-model:value="model.studentId" placeholder="Input" />
          </n-form-item>
          <n-form-item label="课程号" path="inputValue">
            <n-input v-model:value="model.courseId" placeholder="Input" />
          </n-form-item>
          <n-form-item label="时间" path="inputValue">
            <n-input v-model:value="model.time" placeholder="Input" />
          </n-form-item>
          <n-form-item label="成绩" path="inputValue">
            <n-input v-model:value="model.grade" placeholder="Input" />
          </n-form-item>

          <div style="display: flex; justify-content: flex-end">
            <n-button type="primary" @click="addBaseStudy"> 确认 </n-button>
          </div>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NDataTable,
  NInput,
  NInputGroup,
  NModal,
  NForm,
  NFormItem,
  NCard,
  useMessage,
} from 'naive-ui'
import axios from '@/plugins/axios'
import { h, onMounted, ref, Ref } from 'vue'
interface Study {
  study_id: string
  student: string
  course: string
  time: string
  grade: number
}

const message = useMessage()
const createColumns = ({
  play,
}: {
  play: (row: Study) => void
}): DataTableColumns<Study> => {
  return [
    {
      title: '编号',
      key: 'study_id',
    },
    {
      title: '学号',
      key: 'student',
    },
    {
      title: '课程号',
      key: 'course',
    },
    {
      title: '时间',
      key: 'time',
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
            // tertiary: true,
            type: 'info',
            size: 'small',
            onClick: () => play(row),
          },
          { default: () => '编辑' }
        )
      },
    },
  ]
}

let showModal = ref(false)

const data: Ref<Study[]> = ref([])

// 表格列
const columns = createColumns({
  play(row: Study) {
    message.info(`Play ${row.title}`)
  },
})

const fetchBaseStudies = async () => {
  try {
    const respData = await axios.get('/checkBaseStudy')
    console.log(respData)

    data.value = respData.data.data
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  fetchBaseStudies()
})

const model = ref({
  studyId: null,
  studentId: null,
  courseId: null,
  time: null,
  grade: null,
})

// "(1451, 'Cannot delete or update a parent row: a foreign key constraint fails (`library`.`student`, CONSTRAINT `Student_department_id_97ab955b_fk_Department_de_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`de_id`))')"
const addBaseStudy = async () => {
  try {
    const respData = await axios.post('/addBaseStudy', model.value)
    console.log('study数据表中添加一条数据：', respData)
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
</script>

<style></style>

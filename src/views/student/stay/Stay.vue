<template>
  <div>
    <div>
      <n-input-group>
        <n-input
          placeholder="输入学生姓名"
          :style="{ width: '20%' }"
          v-model:value="bookName"
        />
        <n-button
          style="margin-right: 20px"
          type="primary"
          ghost
          @click="fetchAllBorrow"
        >
          搜索
        </n-button>
      </n-input-group>
    </div>
    <n-data-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :striped="true"
      :pagination="pagination"
    />
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="调换宿舍"
        :bordered="false"
        size="huge"
        aria-modal="true"
      >
        <n-form ref="formRef" :model="model">
          <n-form-item path="age" label="学号">
            <n-input
              placeholder="请输入新宿舍编号"
              v-model:value="model.stuId"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="age" label="姓名">
            <n-input
              placeholder="请输入新宿舍编号"
              v-model:value="model.stuName"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="age" label="现宿舍">
            <n-input
              placeholder="请输入现宿舍编号"
              v-model:value="model.oldDor"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="age" label="新宿舍">
            <n-input
              placeholder="请输入新宿舍编号"
              v-model:value="model.newDor"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-button type="primary" @click="handleExchange">确定</n-button>
        </template>
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
import { h, onMounted, reactive, ref, Ref } from 'vue'
interface Stay {
  stuId: string
  stuName: string
  dorId: string
  apartment: string
  currentNum: number
}

const message = useMessage()
const createColumns = ({
  showEdit,
}: {
  showEdit: (row: Stay) => void
}): DataTableColumns<Study> => {
  return [
    {
      title: '学号',
      key: 'stuId',
    },
    {
      title: '姓名',
      key: 'stuName',
    },
    {
      title: '宿舍号',
      key: 'dorId',
    },
    {
      title: '公寓',
      key: 'apartment',
    },
    {
      title: '当前人数',
      key: 'currentNum',
    },
    {
      title: '操作',
      key: 'edit',
      render(row: any) {
        return h(
          NButton,
          {
            strong: true,
            type: 'warning',
            size: 'medium',
            onClick: () => showEdit(row),
          },
          { default: () => '调换' }
        )
      },
    },
  ]
}
const pagination = {
  pageSize: 6,
}

let showModal = ref(false)

const data: Ref<Stay[]> = ref([])

// 表格列
const columns = createColumns({
  showEdit(row: Stay) {
    showModal.value = true
    console.log(showModal.value)

    console.log(row)

    model.stuId = row.stuId
    model.stuName = row.stuName
    model.oldDor = row.dorId
    console.log(model)
  },
})

const bookName = ref('')

const fetchStays = async () => {
  try {
    const respData = await axios.get('/checkStay')
    console.log(respData)

    data.value = respData.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchStays()
})

const model = reactive({
  stuId: '',
  stuName: '',
  oldDor: '',
  newDor: '',
})

const handleExchange = async () => {
  try {
    const respData = await axios.post('/alterDormitory', model)
    console.log('调换结果：', respData)
    showModal.value = false
  } catch (err) {
    console.log(err)
  }
}
</script>

<style>
</style>

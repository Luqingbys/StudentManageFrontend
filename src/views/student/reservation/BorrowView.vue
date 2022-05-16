<template>
  <div>
    <div>
      <n-input-group>
        <n-input
          placeholder="输入书名"
          :style="{ width: '20%' }"
          v-model:value="bookName"
        />
        <n-button style="margin-right: 20px" type="primary" ghost @click="fetchAllBorrow">
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
interface BorrowView {
  borrow_id: string
  s_id: string
  s_name: string
  book_id: string
  book_name: string
  borrow_begin: string
  borrow_time: number
  area_name: string
}

const message = useMessage()
const createColumns = ({
  play,
}: {
  play: (row: Study) => void
}): DataTableColumns<Study> => {
  return [
    {
      title: '借阅单号',
      key: 'borrow_id',
    },
    {
      title: '学号',
      key: 's_id',
    },
    {
      title: '姓名',
      key: 's_name',
    },
    {
      title: '图书编号',
      key: 'book_id',
    },
    {
      title: '图书名',
      key: 'book_name',
    },
    {
      title: '存放地点',
      key: 'area_name',
    },
    {
      title: '借阅时间',
      key: 'borrow_begin',
    },
    {
      title: '借阅时长',
      key: 'borrow_time',
    },
  ]
}

let showModal = ref(false)

const data: Ref<BorrowView[]> = ref([])

// 表格列
const columns = createColumns({
  play(row: Study) {
    message.info(`Play ${row.title}`)
  },
})

const model = ref({
  studyId: null,
  studentId: null,
  courseId: null,
  time: null,
  grade: null,
})

const bookName = ref('')

// 取全部借阅信息
const fetchAllBorrow = async () => {
  try {
    const respData = await axios.get(`/checkBorrowView?bookName=${bookName.value}`)
    data.value = respData.data.data
    console.log(respData);
    
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
    fetchAllBorrow()
})
</script>

<style></style>

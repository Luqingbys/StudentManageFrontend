<template>
  <div>
    <div>
      <n-input-group>
        <n-input
          placeholder="输入导师名"
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
      :pagination="pagination"
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
interface Apprenticeship {
  s_id: string
  s_name: string
  t_name: string
  profession_title: string
  r_name: string
}

const message = useMessage()
const createColumns = ({
  play,
}: {
  play: (row: Study) => void
}): DataTableColumns<Study> => {
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
      title: '导师',
      key: 't_name',
    },
    {
      title: '导师职称',
      key: 'profession_title',
    },
    {
      title: '研究室',
      key: 'r_name',
    },
  ]
}

let showModal = ref(false)

const data: Ref<Apprenticeship[]> = ref([])

// 表格列
const columns = createColumns({
  play(row: Study) {
    message.info(`Play ${row.title}`)
  },
})


const bookName = ref('')

const fetchApprenticeship = async() => {
    try {
        const respData = await axios.get('/checkApprenticeship')
        data.value = respData.data.data
    } catch(err) {
        console.log(err);
        
    }
}

onMounted(() => {
    fetchApprenticeship()
})


const pagination = {
  pageSize: 7,
}
</script>

<style></style>

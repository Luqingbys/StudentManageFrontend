<template>
  <div>
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
  useDialog,
} from 'naive-ui'
import axios from '@/plugins/axios'

interface Department {
  de_id: string
  de_name: string
  de_set_time: string
}
const dialog = useDialog()

const createColumns = ({
  play,
}: {
  play: (row: Department) => void
}): DataTableColumns<Department> => {
  return [
    {
      title: '系编号',
      key: 'de_id',
    },
    {
      title: '系名',
      key: 'de_name',
    },
    {
      title: '成立时间',
      key: 'de_set_time',
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            type: 'error',
            size: 'small',
            onClick: () => play(row),
          },
          { default: () => '删除' }
        )
      },
    },
  ]
}

const data: Ref<Department[] | {}> = ref([])

const message = useMessage()

const columns = createColumns({
  play(row: Department) {
    dialog.warning({
      title: '警告',
      content: `你确定删除 ${row.de_name}?`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        deleteDepartment(row)
      },
      onNegativeClick: () => {
        message.info('已取消')
      },
    })
  },
})

const form = reactive({
  studentName: '',
  courseName: '',
})

const fetchAllDepartments = async () => {
  try {
    const respData = await axios.get('/checkBaseDepartment')
    data.value = respData.data.data
    console.log(respData)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchAllDepartments()
})

const deleteDepartment = async (row: Department) => {
  try {
    const respData = await axios.post(
      `/deleteDepartment`,
      {
          departmentId: row.de_id
      }
    )
    console.log("删除指定院系结果：", respData);
    if(respData.data.msg[0]===1451) {
        message.error('此操作将会破坏数据表参照完整性!拒绝执行!')
    } else {
        message.success('删除成功!')
    }
  } catch (err) {
    console.log(err)
  }
}

const count = ref(0)
</script>

<style></style>

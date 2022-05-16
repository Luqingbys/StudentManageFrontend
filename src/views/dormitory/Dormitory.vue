<template>
  <div>
    <div>
      <n-input-group>
        <n-input
          placeholder="输入宿舍人数"
          :style="{ width: '20%' }"
          v-model:value="count"
        />
        <n-button type="primary" ghost> 搜索 </n-button>
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
  useDialog,
} from 'naive-ui'
import axios from '@/plugins/axios'

interface Dormitory {
    dor_id: string
    current_num: number
    apartment: string
}
const dialog = useDialog()

const createColumns = ({
  play,
}: {
  play: (row: Dormitory) => void
}): DataTableColumns<Dormitory> => {
  return [
    {
      title: '宿舍号',
      key: 'dor_id',
    },
    {
      title: '公寓',
      key: 'apartment',
    },
    {
      title: '当前人数',
      key: 'current_num',
    },
    // {
    //   title: '操作',
    //   key: 'actions',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         strong: true,
    //         tertiary: true,
    //         size: 'small',
    //         onClick: () => play(row),
    //       },
    //       { default: () => '删除' }
    //     )
    //   },
    // },
  ]
}

const data: Ref<Dormitory[] | {}> = ref([])

const message = useMessage()

const columns = createColumns({
  play(row: Dormitory) {
    dialog.warning({
      title: '警告',
      content: '你确定？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        deleteDormitory(row)
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

const fetchAllDormitories = async () => {
  try {
    const respData = await axios.get('/checkBaseDormitory')
    data.value = respData.data.data
    console.log(respData)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchAllDormitories()
})

const deleteDormitory = async (row: Dormitory) => {
  try {
    const respData = await axios.post(
      `/deleteDormitory`,
      {
          DormitoryId: row.de_id
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

const count = ref(null)
</script>

<style></style>

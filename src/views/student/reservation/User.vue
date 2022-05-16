<template>
  <div class="content">
    <n-card title="预约图书" size="huge">
      <div class="header">
        <div class="search-field">
          <n-input-group>
            <n-input
              v-model:value="book_name"
              placeholder="书名"
              :style="{ width: '33%' }"
            />
            <n-input
              v-model:value="author"
              placeholder="作者"
              :style="{ width: '33%' }"
            />
          </n-input-group>
          <n-button type="primary" @click="handleCheckButtonClick">
            搜索</n-button
          >
        </div>
      </div>

      <n-data-table
        size="small"
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="pagination"
      />
      <!-- <n-pagination v-model:page="page" :page-count="100" /> -->
    </n-card>
    <!-- 添加新书的对话框 -->
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="新增书目"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form ref="formRef" :model="model">
          <n-form-item path="age" label="编号">
            <n-input
              placeholder="请输入..."
              v-model:value="model.book_id"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="password" label="书名">
            <n-input
              placeholder="请输入..."
              v-model:value="model.book_name"
              type="text"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item
            ref="rPasswordFormItemRef"
            first
            path="reenteredPassword"
            label="作者"
          >
            <n-input
              placeholder="请输入..."
              v-model:value="model.author"
              type="text"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="reenteredPassword" label="描述">
            <n-input
              placeholder="请输入..."
              v-model:value="model.desc"
              type="text"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item path="reenteredPassword" label="录入时间">
            <n-input
              placeholder="请输入..."
              v-model:value="model.add_time"
              type="text"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                  :disabled="model.book_id === null"
                  type="warning"
                  @click="handleAddButtonClick"
                >
                  确定
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
      </n-card>
    </n-modal>
    <!-- 编辑书目的抽屉 -->
    <n-drawer v-model:show="active" :width="502">
      <n-drawer-content title="预约图书">
        <div class="edit-field">
          <n-form ref="editformRef" :model="model">
            <n-form-item path="id" label="借阅单号">
              <n-input
                disabled
                v-model:value="editModel.borrowId"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="id" label="编号">
              <n-input
                v-model:value="editModel.bookId"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="password" label="学号">
              <n-input
                v-model:value="editModel.stuId"
                type="text"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item
              ref="rPasswordFormItemRef"
              label="开始时间"
            >
            <n-input v-model:value="editModel.beginTime">

            </n-input>
            </n-form-item>
            <n-form-item path="reenteredPassword" label="借阅时长">
              <n-input
                v-model:value="editModel.time"
                type="text"
                @keydown.enter.prevent
              />
            </n-form-item>
            <n-row :gutter="[0, 24]">
              <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                  <n-button
                    type="success"
                    size="large"
                    @click="handleEditButtonClick"
                  >
                    确定
                  </n-button>
                </div>
              </n-col>
            </n-row>
          </n-form>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, reactive, Ref, ref } from 'vue'
import {
  DataTableColumns,
  NButton,
  NDataTable,
  useMessage,
  NModal,
  NCard,
  NCol,
  NRow,
  NForm,
  NFormItem,
  NInput,
  NDrawer,
  useDialog,
  NPagination,
  NDatePicker,
} from 'naive-ui'
import axios from '../../../plugins/axios'
const message = useMessage()
interface Book {
  book_name: string
  book_id: string
  author: string
  add_time: string
  desc: string
  borrow_area_id: string
}

interface Borrow {
  borrowId: string
  bookId: string
  stuId: string
  beginTime: string
  time: number
}
const active = ref(false)
const dialog = useDialog()
const createColumns = ({
  play,
  showEdit,
  handleConfirm,
}: {
  play: (row: Book) => void
  showEdit: (row: Book) => void
  handleConfirm: (row: Book) => any
}): DataTableColumns<Book> => {
  return [
    {
      title: '编号',
      key: 'book_id',
      width: 100,
    },
    {
      title: '书名',
      key: 'book_name',
      width: 150,
    },
    {
      title: '作者',
      key: 'author',
    },
    {
      title: '描述',
      key: 'desc',
    },
    {
      title: '录入时间',
      key: 'add_time',
    },
    {
      title: '借阅室编号',
      key: 'borrow_area',
    },
    {
      title: '操作',
      key: 'edit',
      render(row: any) {
        return h(
          NButton,
          {
            strong: true,
            type: 'info',
            size: 'medium',
            onClick: () => showEdit(row),
          },
          { default: () => '预约' }
        )
      },
    },
  ]
}

const data: Ref<Book[]> = ref([])

const columns = createColumns({
  play(row: Book) {
    message.info(`Play ${row.book_name}`)
  },
  showEdit(row: Book) {
    active.value = true
    // 书目信息回显
    console.log('当前行：', row)
    editModel.value.borrowId = Math.floor(Math.random() * 100000)
    editModel.value.stuId = sessionStorage.getItem('userId')
    editModel.value.bookId = row.book_id
  },
  handleConfirm(row) {
    dialog.warning({
      title: '警告',
      content: '你确定？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        handleDeleteButtonClick(row)
        message.success('确定')
      },
      onNegativeClick: () => {
        message.error('不确定')
      },
    })
  },
})

// 获取所有书目
const fetchAllBooks = async () => {
  // 先将原先的data数组清空
  data.value = []
  try {
    const respData = await axios.get('/show_books')
    console.log('初始结果：', respData)
    respData.data.data.map((book: any, i: number) => {
      let item = book.fields
      Object.defineProperty(item, 'book_id', {
        value: book.pk,
      })
      data.value.push(item)
      console.log(data.value)
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchAllBooks()
})

const showModal = ref(false)
const model: Ref<Book> = ref({
  book_name: '',
  book_id: '',
  author: '',
  add_time: new Date().toISOString(),
  desc: '',
  borrow_area_id: '',
})

const editModel: Ref<Borrow | {}> = ref({
  borrowId: '',
  stuId: '',
  bookId: '',
  beginTime: '',
  time: '',
})


// 编辑 1452
const handleEditButtonClick = async () => {
  try {
    const respData = await axios.post('/reserve', editModel.value)
    console.log('预约结果', respData)
    const msg = respData.data.msg
    if (msg !== 'success') {
      // 请求正常，但是触发错误
      // 判断是不是完整性约束（主键约束）
      if (msg[0] === 1048) {
        //   message.error(msg[1])
        message.error('请检查是否出现必填的空属性值!')
      } else if (msg[0] === 1452) {
        console.log('出错了！')

        message.error('请检查外键属性值是否存在!')
      } else if (msg[0] === 1062) {
        message.error('请检查编号（主键）值是否唯一!')
      }
    } else {
      // 插入数据成功!
      message.success('预约成功!')
    }
    active.value = false
  } catch (err) {
    console.log(err)
  }
}

// 删除
const handleDeleteButtonClick = async (row: Book) => {
  try {
    const respData = await axios.post('/delete_book', {
      book_id: row.book_id,
    })
    console.log('删除结果', respData)
    fetchAllBooks()
  } catch (err) {
    console.log(err)
  }
}

let book_name = ref('')
let author = ref('')

// 查询
const handleCheckButtonClick = async () => {
  try {
    console.log(book_name.value)
    console.log(author.value)
    const respData = await axios.get(
      `check_book?book_name=${book_name.value}&author=${author.value}`
    )
    console.log('查询结果: ', respData)
    data.value = []
    respData.data.data.map((book: any, i: number) => {
      let item = book.fields
      Object.defineProperty(item, 'book_id', {
        value: book.pk,
      })
      data.value.push(item)
      console.log(data.value)
    })
  } catch (err) {
    console.log(err)
  }
}

const pagination = {
  pageSize: 7,
}
</script>

<style scoped lang="scss">
.n-card {
  width: 1000px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  // margin: 0 auto;
  // height: 100vh;
  // background-color: rgb(212, 211, 211);
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .search-field {
      width: 50%;
      display: flex;
    }
  }
}

.edit-field {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}

.n-card {
  box-shadow: 0 2px 5px;
}
</style>

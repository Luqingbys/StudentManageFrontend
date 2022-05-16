<template>
  <div class="home">
    <div class="login">
      <p>学生信息管理系统</p>
     
      <n-form :model="form" label-placement="left" :label-width="60">
        <n-form-item label="用户名">
          <n-input
            placeholder="输入学号/编号"
            v-model:value="form.id"
          ></n-input>
        </n-form-item>
        <n-form-item label="密码">
          <n-input
            placeholder="输入密码"
            v-model:value="form.pwd"
            type="password"
          ></n-input>
        </n-form-item>
      </n-form>
      <div class="buttons">
        <n-button type="primary" @click="primaryLogin">用户登录</n-button>
        <n-button type="primary" @click="login">管理员登录</n-button>
        <n-button type="primary" @click="toRegister">去注册</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { Ref, ref } from 'vue'
interface User {
  id: string
  pwd: string
}
const form: Ref<User> = ref({
  id: '',
  pwd: '',
})
const message = useMessage()
const router = useRouter()
// 管理员登录
const login = async () => {
  try {
    const respData = await axios.post('/login2', form.value)
    console.log('登录结果：', respData)
    if (respData.data.msg === 'success') {
      message.success('即将登录，不要走开...')
      setTimeout(() => {
        router.push('/system')
      }, 2000)
    }
  } catch (err) {
    console.log(err)
  }
}

// 普通用户登录
const primaryLogin = async () => {
  try {
    const respData = await axios.post('/login', form.value)
    console.log('登录结果：', respData)
    if (respData.data.msg === 'success') {
      sessionStorage.setItem('userId', form.value.id)
      message.success('即将登录，不要走开...')
      setTimeout(() => {
        router.push('/user')
      }, 2000)
    }
  } catch (err) {
    console.log(err)
  }
}

const toRegister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
}
.login {
  width: 40%;
  height: 40%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 5px;
  .n-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .n-form-item {
      width: 70%;
    }
  }
  p {
    font-size: 34px;
    font-family: 华文新魏;
  }
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>

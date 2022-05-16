<template>
  <div class="home">
    <div class="register">
      <p>学生信息管理系统</p>
      <n-form :model="form" label-placement="left" :label-width="60">
        <n-form-item label="用户名">
          <n-input placeholder="输入用户名" v-model:value="form.user_id"></n-input>
        </n-form-item>
        <n-form-item label="密码">
          <n-input placeholder="输入密码" v-model:value="form.user_psw" type="password"></n-input>
        </n-form-item>
        <n-form-item label="确认密码">
          <n-input
          placeholder="输入确认密码"
            v-model:value="form.user_confirmpsw"
            type="password"
          ></n-input>
        </n-form-item>
      </n-form>
      <div class="buttons">
<n-button type="primary" @click="register">注册</n-button>
      <n-button type="primary" @click="toLogin">去登录</n-button>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from '@/plugins/axios'
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
interface User {
  user_id: string
  user_psw: string
  user_confirmpsw: string
}
const form: Ref<User> = ref({
  user_id: '',
  user_psw: '',
  user_confirmpsw: '',
})

// 注册
const register = async () => {
  try {
    const respData = await axios.post('/register', {
      user_id: form.value.user_id,
      user_pwd: form.value.user_psw,
    })
    console.log('注册结果：', respData)
  } catch (err) {
    console.log(err)
  }
}

const router = useRouter()
const toLogin = () => {
  router.push('/')
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
.register {
  p {
    font-size: 34px;
    font-family: 华文新魏;
  }
  background-color: white;
  width: 40%;
  margin: 0 auto;
  height: 50%;
  padding: 20px;
  box-shadow: 0 2px 5px  ;
  .n-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .n-form-item {
      width: 70%;
    }
  }
}
.buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>

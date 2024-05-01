<template>
  <div class="login-panel">
    <el-form :rules="formRules" :model="userInfo" ref="userForm">
      <el-form-item path="username" label="账号">
        <el-input :disabled="true" v-model="userInfo.username" placeholder="请输入账号"/>
      </el-form-item>
      <el-form-item path="password" label="密码">
        <el-input :disabled="true" v-model="userInfo.password" type="password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item path="phone" label="手机号">
        <el-input v-model="userInfo.phone" placeholder="请输入手机号"/>
      </el-form-item>

      <el-form-item path="introduction" label="简介">
        <el-input
            v-model="userInfo.introduction"
            placeholder="个人简介"
            type="textarea"
            :autosize="{
                    minRows: 3,
                    maxRows: 5
                }"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="error" @click="modifyUser">
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {ref, reactive, inject, onMounted, computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {ElMessage, ElMessageBox} from 'element-plus'
import cookie from 'js-cookie'
import {showUserByUid,updateUser} from '../../api/user.js'


const router = useRouter()
const route = useRoute()

// 分类列表
const props = {
  uid: null,
  username: '',
  password: '',
  phone: '',
  introduction: ''
};
const userInfo = ref(props)
onMounted(() => {
  loadUser()
})

//1.加载当前登录用户的信息
const loadUser = async () => {
  let uid = cookie.get('uid')
  const {data} = await showUserByUid(uid)
  userInfo.value = data
}

//2.修改
const modifyUser = async () => {
  const {code} = await updateUser(userInfo.value)
  if (code == 200) {
    ElMessage.success('修改成功!')
  }else {
    ElMessage.error("修改失败！")
  }
}

</script>

<style lang="scss" scoped>
.login-panel {
  width: 400px;
  margin: 0;
}
</style>
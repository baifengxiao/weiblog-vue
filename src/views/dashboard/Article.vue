<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import RichTextEditor from '../../components/RichTextEditor.vue'

import cookie from 'js-cookie'
import {
  listArticleByUid,
  showArticle,
  updataArticleById,
} from '../../api/article'
import { listCategory } from '../../api/category'

onMounted(() => {
  getArticleList()
  getCategoryList()
})

// 定义表格数据模型
let list = ref([])

// 控制对话是否展示的变量
const dialogVisible = ref(false)
const dialogShowVisible = ref(false)
const defaultForm = {
  id: '',
  cid: '',
  title: '',
  content: '',
}
const article = ref(defaultForm) // 使用ref包裹该对象，使用reactive不方便进行重置

//1.查询所有
const getArticleList = async () => {
  //1.获取uid
  let uid = cookie.get(`uid`)

  //2.uid作为条件发送异步请求，得到数据，解构
  const { data } = await listArticleByUid(uid)

  //3.赋值给表格绑定的list集合
  list.value = data
}

//2.查询单个
const show = async (row) => {
  const { data } = await showArticle(row.id)
  article.value = data
  dialogShowVisible.value = true
}

const categoryList = ref([])
const getCategoryList = async () => {
  const { data } = await listCategory()
  categoryList.value = data
}

//3.修改文章之展示要修改的文章
//也就是单个查询，不过展示的文本框不一样
const update = async (row) => {
  const { data } = await showArticle(row.id)
  article.value = data
  dialogVisible.value = true
}

//4.提交，修改or添加
const submit = async () => {
  //根据article的id做判断即可

  if (article.value.id) {
    const { code } = await updataArticleById(article.value)
    if (code == 200) {
      ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success',
      })
      dialogVisible.value = false
      getArticleList()
    }
  }
}
</script>
<template>
  <div class="search-div">
    <!-- 添加按钮 -->
    <div class="tools-div">
      <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <!--- 角色表格数据 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="文章ID" width="180" />
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="createTime" label="发布时间" />
      <el-table-column label="操作" align="center" width="280" #default="scope">
        <el-button type="primary" size="small" @click="show(scope.row)">
          查看
        </el-button>
        <el-button type="primary" size="small" @click="update(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="small" @click="deleteById(scope.row)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="添加或修改文章" width="60%">
      <el-form label-width="100px">
        <el-form-item label="文章标题">
          <el-input v-model="article.title" />
        </el-form-item>

        <el-form-item label="所属分类">
          <el-select
            class="m-2"
            v-model="article.cid"
            placeholder="选择分类"
            size="small"
            style="width: 100%"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.cname"
              :value="item.cid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="文章内容">
          <rich-text-editor v-model="article.content"></rich-text-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog v-model="dialogShowVisible" title="文章详情" width="60%">
      <el-tag>{{ article.title }}</el-tag>
      <div v-html="article.content"></div>
    </el-dialog>
  </div>
</template>
<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  listCategory,
  listCategoryByPage,
  updateCategory,
  addCategory,remoeById
} from '../../api/category'
import {deleteArticleById} from "../../api/article.js";

// 分页条总记录数
let total = ref(0)

//分页数据
const pageParamsForm = {
  page: 1, // 页码
  limit: 2, // 每页记录数
}
const pageParams = ref(pageParamsForm) // 将pageParamsForm包装成支持响应式的对象

// 定义表格数据模型
let list = ref([])

// 搜索表单数据
const queryDto = ref({ cname: '' })

onMounted(() => {
  getCategoryList()
})

//触发异步请求，结构数据
const getCategoryList = async () => {
  const { data } = await listCategoryByPage(
    pageParams.value.page,
    pageParams.value.limit,
    queryDto.value
  )
  list.value = data.list
  total.value = data.total
}

//搜索
const searchCategory = () => {
  getCategoryList()
}

//重置
const resetData = () => {
  queryDto.value = {}
  getCategoryList()
}

//修改,传递数据，显示修改框
const editShow = async (row) => {
  category.value = row
  dialogVisible.value = true
}

//新增or修改
const submit = async () => {
  if (category.value.cid) {
    //修改
    const { code } = await updateCategory(category.value)
    if (code == 200) {
      ElMessage({
        showClose: true,
        message: '修改分类成功',
        type: 'success',
      })
      dialogVisible.value = false
      getCategoryList()
    }
  } else {
    //添加
    const { code } = await addCategory(category.value)
    if (code == 200) {
      ElMessage({
        showClose: true,
        message: '新增分类成功',
        type: 'success',
      })
      dialogVisible.value = false
      getCategoryList()
    }
  }
}

//6.添加
const addShow = async () => {
  category.value = {}
  dialogVisible.value = true
}

//7.删除
const  deleteById=async (row)=>{

  ElMessageBox.confirm("您确定要删除${row.cname}吗?", '警告！', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(async () => {
        const {code}=await remoeById(row.cid)
        if (code == 200) {
          ElMessage({
            showClose: true,
            message: '删除分类成功',
            type: 'success',
          })
          getCategoryList()
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })


}

// 控制对话是否展示的变量
const dialogVisible = ref(false)
const defaultForm = {
  cid: '',
  cname: '',
}
const category = ref(defaultForm) // 使用ref包裹该对象，使用reactive不方便进行重置
</script>
<template>
  <div class="search-div">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="small">
      <el-form-item label="分类名称">
        <el-input
          v-model="queryDto.cname"
          style="width: 100%"
          placeholder="角色名称"
        ></el-input>
      </el-form-item>
      <el-row style="display: flex">
        <el-button type="primary" size="small" @click="searchCategory">
          搜索
        </el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>

    <!-- 添加按钮 -->
    <div class="tools-div">
      <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <!--- 角色表格数据 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="cid" label="分类id" width="180" />
      <el-table-column prop="cname" label="分类名称" width="180" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" align="center" width="280" #default="scope">
        <el-button type="primary" size="small" @click="editShow(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="small" @click="deleteById(scope.row)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination
      v-model:current-page="pageParams.page"
      v-model:page-size="pageParams.limit"
      @size-change="getCategoryList"
      @current-change="getCategoryList"
      layout="total, prev, pager, next"
      :total="total"
    />

    <el-dialog v-model="dialogVisible" title="添加或修改" width="30%">
      <el-form label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="category.cname" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
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

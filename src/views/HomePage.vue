<script setup>
import { ref, onMounted } from 'vue'
import { listCategory } from '../api/category.js'

onMounted(() => {
  getCategoryList()
})

// 初始化文章分类集合
const categoryList = ref([])

// 查询所有分类的异步函数
const getCategoryList = async () => {
  //结构，将data数据拿出来赋值给data对象
  const { data } = await listCategory()
  categoryList.value = data
}
</script>
<template>
  <div>
    <!-- sticky top-0 z-10 bg-white menu-sticky 不知道是什么  -->
    <!-- 调整了 菜单高度h-14，内边距py-3 -->
    <!-- header——首页菜单部分 -->
    <header
      id="header-menu"
      class="sticky top-0 z-10 flex h-14 bg-white py-3 menu-sticky"
    >
      <!-- 移动到上个header里面去，不知道下面这个是啥子属性 -->
      <!-- x-data="{ open : false }" -->

      <!-- container知道 mx-auto不知道干嘛的css h-full影响图片显示 justify-between效果不太好 -->
      <div class="container mx-auto flex h-full justify-between">
        <!-- items-center是一些居中 gap-6 是定义行列之间的间隙 items-center应该是上下居中 -->
        <div class="flex h-full items-center gap-6">
          <!-- mr-2也是微调    items-center是上下居中-->
          <div class="mr-2 h-full">
            <!-- inline-flex 内联弹性盒子//TODO,不是很懂 -->
            <a
              href="http://127.0.0.1:5173/"
              class="inline-flex h-full items-center"
            >
              <!-- w-auto不知道是什么 -->
              <img src="../assets/this0.jpg" alt="Logo" class="h-full w-auto" />
            </a>
          </div>

          <ul class="hidden items-center gap-8 sm:flex">
            <!-- relative是定位 text-sm是文本设置 x-data不知道，我把他注释掉了，恢复就放在下一行 text-sm 后面 x-data="dropdown" -->
            <li class="relative text-sm">
              <!-- text-gray-600设置了文本透明度和文本颜色 -->
              <a class="text-gray-600" href="http://127.0.0.1:5173/">首页</a>
            </li>
          </ul>
        </div>

        <div class="flex items-center">
          <a
            href="http://127.0.0.1:5173/#/login"
            title="发布博文"
            class="inline-flex h-full items-center"
          >
            <img src="../assets/publish.jpg" alt="Logo" class="h-full w-auto" />
            发布文章
          </a>
        </div>
      </div>
    </header>

    <section>
      <!-- banner部分 -->
      <div
        class="bg-cover bg-center bg-no-repeat h-96"
        style="
          background-image: url(https://www.gulixueyuan.com/files/system/2023/04-04/150831f74f62589616.jpg);
          height: 300px;
        "
      ></div>
    </section>

    <!-- 分类部分，之后的css就没看了 grid是网格布局 网格容器的列模板的属性 是网格的列属性-->
    <!-- 分成四等分 -->
    <section class="container mx-auto mt-6 grid grid-cols-4 gap-6">
      <div class="col-span-4 sm:col-span-3">
        <ul id="filters" class="flex flex-wrap gap-2">
          <li>
            <a href="http://127.0.0.1:5173/">
              <span class="truncate text-base"> 全部 </span>
            </a>
          </li>

          <li
            v-for="(category, index) in categoryList"
            :key="index"
            x-data="dropdown"
            class="relative cursor-pointer transition-all"
          >
            <a href="http://127.0.0.1:5173/">
              <span class="truncate text-base">{{ category.cname }}</span>
            </a>
          </li>
        </ul>

        <div id="post-list" class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            class="overflow-hidden rounded-xl bg-white shadow-md hover:-translate-y-1 hover:ring-2"
          >
            <div class="aspect-w-16 aspect-h-9">
              <a href="http://127.0.0.1:5173/#/detail" title="【spring MVC】">
                <img
                  src="https://www.gulixueyuan.com/files/course/2021/08-02/151735f51c11714475.png"
                  class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </a>
            </div>
            <div class="relative flex flex-col gap-2 p-4">
              <h1 class="text-2xl font-medium">
                <a href="http://127.0.0.1:5173/#/detail" title="【spring MVC】"
                  >【spring MVC】</a
                >
              </h1>
              <p class="font-sm font-light line-clamp-6">
                Spring MVC属于SpringFrameWork的后续产品，已经融合在Spring Web
                Flow里面。Spring 框架提供了构建 Web 应用程序的全功能 MVC
                模块。使用 Spring 可插入的 MVC
                架构，从而在使用Spring进行WEB开发时，可以选择使用Spring的Spring
                MVC框架或集成其他MVC开发框架
              </p>
              <div class="mt-4 flex flex-1 items-center">
                <a href="http://127.0.0.1:5173/#/detail">
                  <img
                    src="../assets/this0.jpg"
                    class="h-8 w-8 dark:border-slate-700"
                  />
                </a>
                <span class="text-sm text-gray-600">发布于 2023-06-26</span>
              </div>
            </div>
          </div>

          <div
            class="overflow-hidden rounded-xl bg-white shadow-md hover:-translate-y-1 hover:ring-2"
          >
            <div class="aspect-w-16 aspect-h-9">
              <a href="http://127.0.0.1:5173/#/detail" title="【spring MVC】">
                <img
                  src="https://www.gulixueyuan.com/files/course/2021/08-02/151735f51c11714475.png"
                  class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </a>
            </div>
            <div class="relative flex flex-col gap-2 p-4">
              <h1 class="text-2xl font-medium">
                <a href="http://127.0.0.1:5173/#/detail" title="【spring MVC】"
                  >【spring MVC】</a
                >
              </h1>
              <p class="font-sm font-light line-clamp-6">
                Spring MVC属于SpringFrameWork的后续产品，已经融合在Spring Web
                Flow里面。Spring 框架提供了构建 Web 应用程序的全功能 MVC
                模块。使用 Spring 可插入的 MVC
                架构，从而在使用Spring进行WEB开发时，可以选择使用Spring的Spring
                MVC框架或集成其他MVC开发框架
              </p>
              <div class="mt-4 flex flex-1 items-center">
                <a href="http://127.0.0.1:5173/#/detail">
                  <img
                    src="../assets/this0.jpg"
                    class="h-8 w-8 dark:border-slate-700"
                  />
                </a>
                <span class="text-sm text-gray-600">发布于 2023-06-26</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="col-span-1 flex-col gap-6 sm:flex">
        <div class="bg-white p-3 shadow transition-all">
          <div class="flex flex-col items-center">
            <div class="relative h-24 w-24">
              <img
                src="../assets/01.jpg"
                alt="Java程序员"
                class="h-full w-full rounded-full"
              />
            </div>
            <div><h1 class="text-2xl">Java程序员</h1></div>

            <div class="grid grid-cols-4 gap-5">
              <div class="inline-flex flex-col items-center">
                <span class="text-xl">33</span>
                <span class="text-xs">文章数</span>
              </div>
              <div class="inline-flex flex-col items-center">
                <span class="text-xl">26</span>
                <span class="text-xs">分类数</span>
              </div>

              <div class="inline-flex flex-col items-center">
                <span class="text-xl">23403</span>
                <span class="text-xs">访问量</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-3 shadow">
          <h2>
            <span class="text-lg"></span>
            热门文章
          </h2>
          <div>
            <ul role="list">
              <li class="py-3">
                <div class="flex items-center">
                  <div class="flex flex-col gap-1">
                    <h3>
                      <a href="#" title="【MyBatis】MyBatis 和 Hibernate"
                        >【MyBatis】MyBatis 和 Hibernate</a
                      >
                    </h3>
                    <p>2023-06-26 发布</p>
                  </div>
                </div>
              </li>
              <li class="py-3">
                <div class="flex items-center">
                  <div class="flex flex-col gap-1">
                    <h3>
                      <a href="#" title="【对比】Native ui 和 Element Plus"
                        >【【对比】Native ui 和 Element Plus</a
                      >
                    </h3>
                    <p>2023-06-13 发布</p>
                  </div>
                </div>
              </li>
              <li class="py-3">
                <div class="flex items-center">
                  <div class="flex flex-col gap-1">
                    <h3>
                      <a href="#" title="【毕业季】毕业设计指南"
                        >【毕业季】毕业设计指南</a
                      >
                    </h3>
                    <p>2023-05-23 发布</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.login-panel {
  width: 500px;
  margin: 0 auto;
  margin-top: 130px;
}
</style>

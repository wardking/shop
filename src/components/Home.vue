<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/img/logo.png" alt="大香蕉直播" />
        <span>直播后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 侧边栏菜单 -->
        <div class="toggle-button" @click="toggleCollsaose">|||</div>
        <!-- 可替换  :default-active="$route.path" -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409bff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 菜单图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 菜单名称 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + list.path"
              v-for="list in item.children"
              :key="list.id"
              @click="saveNavState('/' + list.path)"
            >
              <template slot="title">
                <!-- 菜单图标 -->
                <i class="el-icon-menu"></i>
                <!-- 菜单名称 -->
                <span>{{ list.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: "iconfont icon-user2",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-goods-copy",
        102: "iconfont icon-danju-tianchong",
        145: "iconfont icon-baobiao",
      },
      // 是否折叠侧边栏
      isCollapse: false,
      // 二级菜单激活
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    //   退出登录
    logout() {
      this.$messageBox
        .confirm("确定要退出登录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出登录!",
            duration: 1000,
          });
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            duration: 1000,
          });
        });
    },
    // 获取左侧菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200)
        return this.$message.error({
          message: res.meta.msg,
          duration: 1000,
        });
      this.menulist = res.data;
    },
    // 侧边栏折叠效果
    toggleCollsaose() {
      this.isCollapse = !this.isCollapse;
    },
    // 保持二级菜单的激活状态
    saveNavState(path) {
      window.sessionStorage.setItem("activePath", path);
      this.activePath = path;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      color: #fff;
      font-size: 20px;
      margin-left: 15px;
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.iconfont {
  margin-right: 10px;
}
.el-menu {
  border-right: 0;
}
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
<template>
  <div class="home">
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //   退出登录
    logout() {
      this.$messageBox.confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出登录!",
            duration:1000
          });
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            duration:1000
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
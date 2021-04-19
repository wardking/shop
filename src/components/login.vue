<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/img/login.png" alt="头像" />
      </div>
      <!-- 表单 -->
      <el-form
        ref="lginForm"
        :model="lginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名"
            v-model="lginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-password"
            placeholder="请输入密码"
            v-model="lginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="onSubmit('lginForm')"
            >登录</el-button
          >
          <el-button type="info" @click="onReset('lginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单数据绑定
      lginForm: {
        username: "admin",
        password: "123456",
      },
      //   表单的验证规则对象
      loginFormRules: {
        // 验证用户
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   登录提交
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //判断表单验证通过
          let { data: res } = await this.$http.post("login", this.lginForm);
          if (res.meta.status !== 200) {
            this.$message.error({ message: res.meta.msg, duration: 1000 });
          } else {
            this.$message.success({ message: res.meta.msg, duration: 1000 });
            // 保存token  登录验证
            window.sessionStorage.setItem("token", res.data.token);
            this.$router.push("/home");
          }
        } else {
          //验证失败 不允许提交
          this.$message.warning({
            message: "用户名或密码出错，请重新输入",
            duration: 1000,
          });
          return false;
        }
      });
    },
    // 重置
    onReset(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">轻娱后台</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          name="password"
          type="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
// 验证器
import { validUsername } from '@/utils/validate'
// 用户名验证
const validateUsername = (rule, value, callback) => {
  if (value.length < 5) {
    callback(new Error('请检查用户名'))
  } else {
    callback()
  }
}
// 密码验证
const validatePassword = (rule, value, callback) => {
  if (value.length < 5) {
    callback(new Error('请检查密码'))
  } else {
    callback()
  }
}
export default {
  name: 'Login',
  data() {
    return {
      // 表单项
      loginForm: {
        username: '',
        password: '',
      },
      // 表单验证规则
      loginRules: {
        username: [
          { required: true, trigger: 'change', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'change', validator: validatePassword },
        ],
      },
      // 是否加载
      loading: false,
      // 重定向url
      redirect: undefined,
    }
  },
  watch: {
    // 路由发生变化执行
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 登录逻辑
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({
                path: this.redirect || '/',
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      background: none;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0;
      color: #fff;
      height: 47px;
      caret-color: #fff;
    }
  }

  .el-form-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/login_bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 450px;
    padding: 35px;
    overflow: hidden;
    border-radius: 3%;
    background: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  }

  .title-container {
    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>


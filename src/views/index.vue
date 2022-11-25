<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_form">
        <div style="margin: 20px 0; text-align: center; font-size: 34px; color:white;"><b>工具集</b></div>
        <el-form :model="user" :rules="rules" ref="userForm">
          <el-form-item prop="username">
            <el-input size="large" style="margin: 10px 0; width: 400px" prefix-icon="el-icon-user"
              v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="large" style="margin: 10px 0; width: 400px" prefix-icon="el-icon-lock" show-password
              v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item style="margin: 10px 0; text-align: center">
            <!--          <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/register')">注册</el-button>-->
            <el-button type="primary" size="medium" autocomplete="off" @click="login" style="width:100px">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <vue-particles color="#409EFF" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
      linesColor="#409EFF" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3"
      :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>

  </div>
</template>

<script>

export default {
name: "Login",
data() {
  return {
    user: {},

  }
},
methods: {

}
}
</script>

<style scoped>
  .login_container {
      background-image: linear-gradient(-180deg, #767485 0%, #0b3642 100%);
      /* background-image: url("../assets/images/login-background.jpg"); */
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
  }
  .login_box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
  }
  .login_form{
      background-color: #fff;
      width: 600px;
      height: 320px;
      padding: 20px;
      border-radius: 10px;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.3);
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.7);
      text-align: center;
  }
</style>
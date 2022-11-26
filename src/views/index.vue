<template>
  <div class="login_container">
    <div class="login_box">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">233</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
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
      background-image: linear-gradient(-180deg, #7b74b4 0%, #669dad 100%);
      /* background-image: url("../assets/images/login-background.jpg"); */
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
}


</style>
<template>
  <div class="link">

    <el-link class="box" style="font-size: 2em;" @click="toFileReview">文件预览</el-link>

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
  toFileReview() {
    this.$router.push('/files/review')
  }

}
}
</script>

<style scoped>
.link {
      /* background-image: linear-gradient(-180deg, #bfbbeb 0%, #669dad 100%); */
      /* background-image: url("../assets/images/login-background.jpg"); */
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
}
.box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
  }

</style>
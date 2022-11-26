<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_form">
        
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

</style>
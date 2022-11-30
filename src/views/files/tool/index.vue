<template>
    <div>
        <el-input style="max-width: 450px;position: absolute;left:25%;top:35%;transform: translate(-50%, -50%);" :autosize="{ minRows: 8, maxRows: 4}" type="textarea" placeholder="请输入翻译内容" v-model="textarea" clearable>
        </el-input>
        <el-input style="max-width: 450px;position: absolute;right:25%;top:35%;transform: translate(50%, -50%);" :autosize="{ minRows: 8, maxRows: 4}" type="textarea" placeholder="请输入翻译内容" v-model="result" clearable>
        </el-input>
    </div>
</template>
  
<script>
  
  export default {
  name: "tool",
  data() {
    return {
      user: {},
      textarea: '',
      result: ''
    }
  },
  methods: {
  
  }
  }
  </script>
  
<style scoped>

</style>
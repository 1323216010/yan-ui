<template>
  <div class="dashboard-container">
 
   <Editor></Editor>

  </div>
  

</template>

<script>
import Editor from '@/components/Editor'
// import variables from '@/utils/variables';


export default {
  name: 'Dashboard',
  components: {
    Editor
  },
  data() {
    return {


    };
  },
  computed: {

  },
  created() {

  },
  methods: {


  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 20px;
    line-height: 46px;
  }
}
</style>

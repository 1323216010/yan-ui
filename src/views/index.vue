<template>
  <div class="dashboard-container">
    <div class="dashboard-text">文件上传预览</div>



    <el-upload class="upload-demo" ref="upload" :action=fileUpload :on-preview="handlePreview"
      :file-list="fileList" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>

    <div style="flex: 1;">
      <el-table  :data="list" >


        <el-table-column label="文件名" prop="name">

          <template slot-scope="scope">
            <el-button  size="mini" type="text" @click="fileReview(scope.row.url)">{{ scope.row.name }}</el-button>
          </template>

        </el-table-column>
        <el-table-column label="文件类型" prop="type" />

        <el-table-column  label="操作" prop="type">
        <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit">修改</el-button>
            <el-button type="text" icon="el-icon-download" @click="download(scope.row.name)">下载</el-button>
            <el-button type="text" icon="el-icon-delete" @click="deletByName(scope.row.name)">删除</el-button>
        </template>
        </el-table-column>

        <el-table-column label="文件大小" prop="volume" />
        <el-table-column label="上传时间" prop="createTime" />

      </el-table>
    </div>



  </div>
  

</template>

<script>
import { mapGetters } from 'vuex'
// import variables from '@/utils/variables';
import axios from 'axios';
// import { deletByName, queryByLimit } from '@/api/files/files'

export default {
  name: 'Dashboard',
  data() {
    return {
      start: '',
      final: "233",
      fileUpload : '',
      list: [],
      fileList: []
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fileUpload = variables.fileUpload
    this.refresh()
  },
  methods: {

    refresh() {
      queryByLimit(0, 100).then(res => {
        this.list = res;
      })
    },

    fileReview(url) {
      window.open(variables.onlinePreview + url);
    },

    download(name) {
      window.open(variables.downloadFile + name);
    },

    deletByName(name) {
      axios.get(variables.deleteFile, { //params参数必写, 如果没有可传参数，传{}以
        params: {
          fileName: encodeURIComponent(name)
        }}).then(res => {
          this.refresh();
        })
    },

    async submitUpload() {
      await this.$refs.upload.submit();
      this.$refs.upload.clearFiles();
      setTimeout(() =>{
        this.refresh();
      }, 1000);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
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

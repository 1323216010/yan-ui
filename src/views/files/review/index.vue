<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="文件名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入文件名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!-- <el-form-item label="所属用户" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入所属用户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="星级" prop="star">
        <el-input
          v-model="queryParams.star"
          placeholder="请输入星级"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input
          v-model="queryParams.author"
          placeholder="请输入作者"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>



      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      
      <el-form-item>
        <el-upload class="upload-demo" ref="upload" :action=fileUpload  :headers="headers" :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="mini" plain type="primary" icon="el-icon-plus" v-hasPermi="['files:review:add']">选择文件</el-button>
          <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload" icon="el-icon-upload">上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-form-item>
      
      </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['files:review:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['files:review:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['files:review:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="reviewList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="标题" align="center" prop="title">
        <template slot-scope="scope">
            <el-button  size="mini" type="text" @click="fileReview(scope.row.url)">{{ scope.row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="文件类型" align="center" prop="type" />

      <!-- <el-table-column label="所属用户" align="center" prop="userName" /> -->

      <el-table-column label="星级" align="center" prop="star" />
      <el-table-column label="作者" align="center" prop="author" />
      <el-table-column label="详细信息" align="center" prop="info" />

      <el-table-column label="文件大小" align="center" prop="volume" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['files:review:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['files:review:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改文件预览对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="650px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">

        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>

        <el-form-item label="所属用户" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入所属用户" />
        </el-form-item>

        <el-form-item label="星级" prop="star">
          <el-input v-model="form.star" placeholder="请输入星级" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="详细信息" prop="info">
          <el-input v-model="form.info" placeholder="请输入详细信息" />
        </el-form-item>
        <el-form-item label="封面" prop="avatar">
          <el-input v-model="form.avatar" placeholder="请输入封面" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import variables from '@/utils/variables';
import { getToken } from "@/utils/auth";
import { listReview, getReview, delReview, addReview, updateReview } from "@/api/files/review";

export default {
  name: "Review",
  data() {
    return {
      fileList: [],
      headers: {
        Authorization: "Bearer " + getToken()
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 文件预览表格数据
      reviewList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        path: null,
        name: null,
        type: null,
        url: null,
        userName: null,
        secret: null,
        title: null,
        star: null,
        author: null,
        info: null,
        avatar: null,
        volume: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "文件名不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "文件类型不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.fileUpload = variables.fileUpload
  },
  methods: {

    async submitUpload() {
      console.log(this.headers)
      await this.$refs.upload.submit();
      this.$refs.upload.clearFiles();
      setTimeout(() =>{
        this.getList();
      }, 1000);
    },

    fileReview(url) {
      window.open(variables.onlinePreview + url);
    },

    /** 查询文件预览列表 */
    getList() {
      this.loading = true;
      listReview(this.queryParams).then(response => {
        this.reviewList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        path: null,
        name: null,
        type: null,
        url: null,
        userName: null,
        secret: null,
        title: null,
        star: null,
        author: null,
        info: null,
        avatar: null,
        createTime: null,
        updateTime: null,
        volume: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加文件预览";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getReview(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改文件预览";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateReview(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReview(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除文件预览编号为"' + ids + '"的数据项？').then(function() {
        return delReview(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('files/review/export', {
        ...this.queryParams
      }, `review_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

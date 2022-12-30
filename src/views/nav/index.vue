<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label=" 名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
	    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['files:nav:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="navList"
      row-key="id"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="名称" align="center" prop="name">
        <template slot-scope="scope">
            <el-button  size="mini" type="text" @click="redirect(scope.row.url)" v-if="scope.row.isUrl == 0">{{ scope.row.name }}</el-button>
            <template v-if="scope.row.isUrl != 0">{{ scope.row.name }}</template>
        </template>
      </el-table-column>
      <el-table-column label="图标" align="center" prop="icon"/>
      <el-table-column label="简介" align="center" prop="brief"/>
      <el-table-column label="显示顺序" align="center" prop="orderNum" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['files:nav:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['files:nav:add']"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['files:nav:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改导航树对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父id" prop="parentId">
          <treeselect v-model="form.parentId" :options="navOptions" :normalizer="normalizer" placeholder="请选择父id" />
        </el-form-item>
        <el-form-item label=" 名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <!-- <el-form-item label=" 侧边栏一级名称" prop="enName">
          <el-input v-model="form.enName" placeholder="请输入 侧边栏一级名称" />
        </el-form-item> -->
        <el-form-item label=" 图标" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="简介" prop="brief">
          <el-input v-model="form.brief" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="是否为网址" prop="isUrl">
          <el-select v-model="form.isUrl"  clearable size="small">
          <el-option v-for="dict in isUrlOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
        </el-select>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url" placeholder="请输入网址" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入显示顺序" />
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
import { listNav, getNav, delNav, addNav, updateNav } from "@/api/nav/nav";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getDicts } from "@/api/system/dict/data";

export default {
  name: "Nav",
  components: {
    Treeselect
  },
  data() {
    return {
      isUrlOptions: [],
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 导航树表格数据
      navList: [],
      // 导航树树选项
      navOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        parentId: null,
        name: null,
        parentName: null,
        enName: null,
        icon: null,
        orderNum: null,
        webId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: " 侧边栏一级名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    getDicts("is_url").then(response => {
    this.isUrlOptions = response.data;
  });
  },
  methods: {
    redirect(url) {
      window.open(url);
    },
    /** 查询导航树列表 */
    getList() {
      this.loading = true;
      listNav(this.queryParams).then(response => {
        this.navList = this.handleTree(response.data, "id", "parentId");
        this.loading = false;
      });
    },
    /** 转换导航树数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
	/** 查询导航树下拉树结构 */
    getTreeselect() {
      listNav().then(response => {
        this.navOptions = [];
        const data = { id: 0, name: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "id", "parentId");
        this.navOptions.push(data);
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
        parentId: null,
        name: null,
        parentName: null,
        enName: null,
        icon: null,
        orderNum: null,
        webId: null,
        status: "0",

        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.id) {
        this.form.parentId = row.id;
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加导航树";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.parentId = row.id;
      }
      console.log(row.id);
      console.log('233');
      console.log(row);
      getNav(row.id).then(response => {
        console.log(this.form);
        this.form = response.data;
        console.log(this.form);
        this.open = true;
        this.title = "修改导航树";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateNav(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNav(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除导航树编号为"' + row.id + '"的数据项？').then(function() {
        return delNav(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>

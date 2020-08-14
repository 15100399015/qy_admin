<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="filter-container">
      <el-button icon="el-icon-plus" @click="handleCreate">添加</el-button>
      <el-button icon="el-icon-delete" @click="handleDelete">删除</el-button>
      <el-button icon="el-icon-top-right" @click="handleShift">转移</el-button>
    </div>

    <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="名称" align="center" prop="type_name"></el-table-column>
      <el-table-column label="状态" prop="type_status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.type_status" @change="changeStatus(scope.row._id)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="type_mid">
        <template slot-scope="scope">{{ midT(scope.row.type_mid) }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEditOne(scope.row._id)" size="small" type="primary" plain>编辑</el-button>
          <el-button @click="handleDeleteOne(scope.row._id)" size="small" type="danger" plain>删除</el-button>
          <el-button
            @click="handleAddChild(scope.row)"
            v-if="scope.row.type_pid"
            size="small"
            type="success"
            plain
          >添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <add-type :visible.sync="dialogFormVisible" @on-success="addSuccess" @on-error="addError" />
  </div>
</template>

<script>
import { fetchTypeList, deleteType } from "@/api/type";
import Pagination from "@/components/Pagination";
import AddType from "./components/addType";
export default {
  name: "ComplexTable",
  components: { Pagination, AddType },
  data() {
    return {
      // 是否显示添加弹窗
      dialogFormVisible: false,
      // key
      tableKey: 0,
      // 列表
      list: null,
      // 总数
      total: 0,
      // 加载中
      listLoading: true,
      // 请求参数
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
    };
  },
  created() {
    // 获取列表
    this.getList();
  },
  // 方法
  methods: {
    handleAddChild(row) {
      console.log(row);
    },
    // 改变状态
    changeStatus(_id, s) {
      console.log(_id, s);
    },
    // 添加数据成功
    addSuccess() {
      this.getList();
    },
    // 添加数据失败
    addError() {},
    // 单个编辑
    handleEditOne(_id) {},
    // 单个删除
    handleDeleteOne(_id) {
      deleteType(_id).then(() => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getList();
      });
    },
    midT(id) {
      switch (id) {
        case 1:
          return "视频";
        case 2:
          return "文章";
        default:
          return id;
      }
    },
    // 获取分类列表
    getList() {
      fetchTypeList().then((res) => {
        this.list = res.data.data;
      });
    },
    handleModifyStatus(row, status) {},

    handleCreate() {
      this.dialogFormVisible = true;
    },
    handleDelete() {},
    handleShift() {},
  },
};
</script>

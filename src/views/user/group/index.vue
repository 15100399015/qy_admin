<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="filter-container">
      <el-button icon="el-icon-plus" @click="handleCreate">添加</el-button>
      <el-button icon="el-icon-delete" @click="handleDelete">删除</el-button>
    </div>
    <!-- 数据列表 -->
    <el-table
      :data="list"
      border
      ref="groupTable"
      v-loading="listLoading"
      :show-overflow-tooltip="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" :resizable="false"></el-table-column>
      <el-table-column label="索引" type="index" width="55" align="center" :resizable="false"></el-table-column>
      <el-table-column label="名称" prop="group_name" width="185" :resizable="false"></el-table-column>
      <el-table-column label="状态" prop="group_status" align="center" :resizable="false">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.group_status"
            @change="changeStatus(scope.row._id,scope.row.group_status,scope.$index)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="天积分" prop="group_points_day" align="center" :resizable="false"></el-table-column>
      <el-table-column label="周积分" prop="group_points_week" align="center" :resizable="false"></el-table-column>
      <el-table-column label="月积分" prop="group_points_month" align="center" :resizable="false"></el-table-column>
      <el-table-column label="年积分" prop="group_points_year" align="center" :resizable="false"></el-table-column>
      <el-table-column label="永久积分" prop="group_points_free" align="center" :resizable="false"></el-table-column>
      <el-table-column label="备注" prop="group_remarks" width="420" :resizable="false"></el-table-column>
      <el-table-column label="操作" width="280" :resizable="false">
        <template slot-scope="scope">
          <el-button
            @click="handleEditOne(scope.row._id,scope.$index)"
            size="small"
            type="primary"
            plain
          >编辑</el-button>
          <el-button
            @click="handleDeleteOne(scope.row._id,scope.$index)"
            size="small"
            type="danger"
            plain
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/修改弹窗 -->
    <!-- 是否显示，模式，数据填充id -->
    <edit-group
      :visible.sync="dialogFormVisible"
      :model="dialogModel"
      :fillId="dialogfillId"
      @on-success="editSuccess"
      @on-error="editError"
    />
  </div>
</template>

<script>
import {
  deleteGroup,
  fetchAllGroup,
  deleteManyGroup,
  updateGroup,
} from "@/api/group";
import EditGroup from "./components/editGroup";
export default {
  name: "Group",
  components: { EditGroup },
  data() {
    return {
      multipleSelection: [],
      dialogModel: false,
      dialogfillId: "",
      dialogFormVisible: false,
      list: null,
      listLoading: false,
    };
  },
  created() {
    // 获取列表
    this.getList();
  },
  // 方法
  methods: {
    // 多选改变
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => item._id);
    },
    // 单个改变状态
    changeStatus(_id, status, index) {
      updateGroup(_id, {
        group_status: status,
      }).then(() => {
        this.$message.success({
          message: "更新成功",
        });
        this.getList();
      });
    },
    // 添加/修改 数据成功
    editSuccess(val) {
      this.getList();
    },
    // 添加/修改 数据失败
    editError(error) {},
    // 获取全部权限组列表列表
    getList() {
      this.listLoading = true;
      fetchAllGroup().then((data) => {
        this.list = data;
        this.listLoading = false;
      });
    },
    // 添加按钮
    handleCreate() {
      this.dialogModel = "create";
      this.dialogfillId = "";
      this.dialogFormVisible = true;
    },
    // 多选删除
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning({
          message: "未选择任何数据",
        });
        return;
      }
      deleteManyGroup(this.multipleSelection).then(() => {
        this.$message.success({
          message: "操作成功",
        });
        this.getList();
      });
    },
    // 单个项目编辑
    handleEditOne(_id, index) {
      this.dialogModel = "upDate";
      this.dialogfillId = _id;
      this.dialogFormVisible = true;
    },
    // 单个项目删除
    handleDeleteOne(_id) {
      deleteGroup(_id).then(this.getList);
    },
  },
};
</script>

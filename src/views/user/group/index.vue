<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button icon="el-icon-plus" @click="handleCreate">添加</el-button>
    </div>
    <el-table
      :data="list"
      border
      ref="groupTable"
      v-loading="listLoading"
      :show-overflow-tooltip="true"
    >
      <el-table-column label="索引" width="66" type="index" align="center" :resizable="false"></el-table-column>
      <el-table-column label="名称" width="185" prop="group_name" :resizable="false"></el-table-column>
      <el-table-column label="状态" prop="group_status" width="65" align="center" :resizable="false">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.group_status"
            @change="changeStatus(scope.row._id,scope.row.group_status,scope.$index)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="天积分"
        width="89"
        sortable
        prop="group_points_day"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        width="89"
        label="周积分"
        sortable
        prop="group_points_week"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        label="月积分"
        width="89"
        sortable
        prop="group_points_month"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        label="年积分"
        width="89"
        sortable
        prop="group_points_year"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        label="永久积分"
        width="102"
        sortable
        prop="group_points_free"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column label="标色" width="160" align="center" :resizable="false">
        <template slot-scope="{row}">
          <span :style="`color:${row.group_color}`">{{ row.group_color }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip prop="group_remarks" :resizable="false"></el-table-column>
      <el-table-column label="操作" width="155" align="center" :resizable="false">
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
  updateGroup,
  changStatus,
} from "@/api/group";
import EditGroup from "./components/editGroup";
export default {
  name: "Group",
  components: { EditGroup },
  data() {
    return {
      dialogModel: false,
      dialogfillId: "",
      dialogFormVisible: false,
      list: [],
      listLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 单个改变状态
    changeStatus(_id, status, index) {
      changStatus(_id, status).then(() => {
        this.$message.success({
          message: "更新成功",
        });
        this.getList();
      });
    },
    // 添加/修改 数据成功
    editSuccess() {
      this.getList();
    },
    // 添加/修改 数据失败
    editError() {},
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
    // 单个项目编辑
    handleEditOne(_id) {
      this.dialogModel = "upDate";
      this.dialogfillId = _id;
      this.dialogFormVisible = true;
    },
    // 单个项目删除
    handleDeleteOne(_id) {
      deleteGroup(_id).then(() => {
        this.$message.success({
          message: "删除成功",
        });
        this.getList();
      });
    },
  },
};
</script>

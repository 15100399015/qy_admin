<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button icon="el-icon-plus" @click="handleCreate">添加</el-button>
      <el-button icon="el-icon-delete" @click="handleDelete">删除</el-button>
    </div>
    <el-table
      border
      row-key="_id"
      :data="list"
      :show-overflow-tooltip="true"
      default-expand-all
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="标号" sortable type="index" width="88" align="center"></el-table-column>
      <el-table-column label="名称" width="315" align="left" prop="type_name"></el-table-column>
      <el-table-column label="排序" sortable width="88" align="center" prop="type_sort"></el-table-column>
      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="{row}">{{row.type_mold.name}}</template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.type_status"
            @change="changeStatus(scope.row._id,scope.row.type_status,scope.$index)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="权限">
        <template slot-scope="{row}">
          <el-tag
            v-for="tag in row.group_ids"
            effect="plain"
            :key="tag"
            :style="`border-color:${groupIdToNameAndColor(tag).group_color};color:${groupIdToNameAndColor(tag).group_color};margin-right:9px`"
          >{{groupIdToNameAndColor(tag).group_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="{row}">
          <el-button @click="handleEditOne(row)" size="small" type="primary" plain>编辑</el-button>
          <el-button @click="handleDeleteOne(row)" size="small" type="danger" plain>删除</el-button>
          <el-button
            @click="handleAddChild(row)"
            v-if="!row.type_pid"
            size="small"
            type="success"
            plain
          >添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/修改弹窗 -->
    <edit-type
      :visible.sync="dialog.dialogFormVisible"
      :model="dialog.dialogModel"
      :fillId="dialog.dialogfillId"
      :type1Id="dialog.dialogTypeId1"
      @on-success="editSuccess"
      @on-error="editError"
    />
  </div>
</template>

<script>
import {
  fetchAllType,
  deleteType,
  deleteManyType,
  updateType,
  changStatus,
} from "@/api/type";
import { fetchAllGroup } from "@/api/group";
import EditType from "./components/editType";
export default {
  name: "Type",
  components: { EditType },
  data() {
    return {
      multipleSelection: [],
      dialog: {
        dialogModel: false,
        dialogfillId: "",
        dialogFormVisible: false,
        dialogTypeId1: "",
      },
      list: [],
      listLoading: true,
      groupList: [],
    };
  },
  created() {
    this.getList();
    this.getGroupList();
  },
  // 方法
  methods: {
    groupIdToNameAndColor(id) {
      return this.groupList[id];
    },
    // 多选改变触发
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => item._id);
    },
    // 编辑提交之后
    editSuccess(val) {
      this.getList();
    },
    // 编辑数据失败
    editError(error) {},
    // 改变状态
    changeStatus(_id, status, index) {
      changStatus(_id, status).then(() => {
        this.$message.success({
          message: "更新成功",
        });
        this.getList();
      });
    },
    // 添加子分类
    handleAddChild(row) {
      this.dialog.dialogModel = "addChildren";
      this.dialog.dialogfillId = row._id;
      this.dialog.dialogFormVisible = true;
    },
    // 单个编辑
    handleEditOne(row) {
      this.dialog.dialogModel = "upDate";
      this.dialog.dialogfillId = row._id;
      this.dialog.dialogFormVisible = true;
    },
    // 单个删除
    handleDeleteOne(row) {
      deleteType(row._id).then(() => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.getList();
      });
    },
    // 点击添加
    handleCreate() {
      this.dialog.dialogModel = "create";
      this.dialog.dialogfillId = "";
      this.dialog.dialogTypeId1 = "";
      this.dialog.dialogFormVisible = true;
    },
    // 点击删除
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning({
          message: "未选择任何数据",
        });
        return;
      }
      deleteManyType(this.multipleSelection).then(() => {
        this.$message.success({
          message: "操作成功",
        });
        this.getList();
      });
    },
    // 获取分类列表
    getList() {
      fetchAllType().then((data) => {
        this.list = data;
      });
    },
    getGroupList() {
      fetchAllGroup({}).then((data) => {
        data.forEach(({ group_name, group_color, _id }) => {
          this.groupList[_id] = {
            group_name,
            group_color,
          };
        });
      });
    },
  },
};
</script>

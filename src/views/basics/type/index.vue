<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="filter-container">
      <el-button icon="el-icon-plus" @click="handleCreate">添加</el-button>
      <el-button icon="el-icon-delete" @click="handleDelete">删除</el-button>
    </div>
    <!-- 数据列表 -->
    <el-table
      border
      row-key="_id"
      :data="list"
      :show-overflow-tooltip="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="标号" sortable type="index" width="88" align="center"></el-table-column>
      <el-table-column label="名称" width="315" align="left" prop="type_name"></el-table-column>
      <el-table-column label="排序" sortable width="88" align="center" prop="type_sort"></el-table-column>
      <el-table-column label="类型" width="100" align="center" prop="type_mid">
        <template slot-scope="{row}">{{ midT(row.type_mid) }}</template>
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.type_status"
            @change="changeStatus(scope.row._id,scope.row.type_status,scope.$index)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="权限" prop="type_status">
        <template slot-scope="{row}">
          <el-tag v-for="tag in row.group_id" :key="tag" type="info">{{groupT(tag)}}</el-tag>
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
  updateManyType,
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
      groupList: {},
    };
  },
  created() {
    // 获取分类所有列表
    this.getList();
    // 获取所有权限组列表
    this.getGroupList();
  },
  // 方法
  methods: {
    // 转换分类类型
    midT(id) {
      if (id === 1) return "视频";
      if (id === 2) return "文章";
      return id;
    },
    // 根据id 获取权限名称
    groupT(id) {
      return this.groupList[id];
    },
    // 多选改变触发
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => item._id);
    },
    // 编辑提交之后
    editSuccess(val) {
      // 重新获取数据列表
      this.getList();
    },
    // 编辑数据失败
    editError(error) {},
    // 改变状态
    changeStatus(_id, status, index) {
      updateType(_id, {
        type_status: status,
      }).then(() => {
        this.$message.success({
          message: "更新成功",
        });
        this.getList();
      });
    },
    // 添加子分类
    handleAddChild(row) {
      this.dialog.dialogModel = "addChildren";
      this.dialog.dialogfillId = "";
      this.dialog.dialogTypeId1 = row._id;
      this.dialog.dialogFormVisible = true;
    },
    // 单个编辑
    handleEditOne(row) {
      this.dialog.dialogModel = "upDate";
      this.dialog.dialogfillId = row._id;
      this.dialog.dialogTypeId1 = "";
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
        let type_id_1 = [];
        let type_id_2 = [];
        for (let j = 0, len = data.length; j < len; j++) {
          let item = data[j];
          if (item.type_pid === "") {
            item.children = [];
            type_id_1.push(item);
          } else {
            type_id_2.push(item);
          }
        }
        for (let j = 0, len = type_id_2.length; j < len; j++) {
          let type_2 = type_id_2[j];
          for (let _j = 0, _len = type_id_1.length; _j < _len; _j++) {
            let type_1 = type_id_1[_j];
            if (type_2.type_pid === type_1._id) {
              type_1.children.push(type_2);
            }
          }
        }
        this.list = type_id_1;
      });
    },
    getGroupList() {
      return fetchAllGroup().then((data) => {
        let groupList = {};
        data.forEach((item) => {
          groupList[item._id] = item.group_name;
        });
        this.groupList = groupList;
      });
    },
  },
};
</script>

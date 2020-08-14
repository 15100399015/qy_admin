<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="filter-container">
      <el-button icon="el-icon-plus" @click="handleCreate">添加</el-button>
      <el-button icon="el-icon-delete" @click="handleDelete">删除</el-button>
    </div>

    <!-- 数据列表 -->
    <el-table :key="tableKey" :data="list" border>
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="名称" prop="group_name"></el-table-column>
      <el-table-column label="状态" prop="group_status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.group_status" @change="changeStatus(scope.row._id)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="天积分" prop="group_points_day"></el-table-column>
      <el-table-column label="周积分" prop="group_points_week"></el-table-column>
      <el-table-column label="月积分" prop="group_points_month"></el-table-column>
      <el-table-column label="年积分" prop="group_points_year"></el-table-column>
      <el-table-column label="永久积分" prop="group_points_free"></el-table-column>
      <el-table-column label="备注" prop="group_remarks"></el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row._id)" size="small" type="primary" plain>编辑</el-button>
          <el-button @click="handleDelete(scope.row._id)" size="small" type="danger" plain>删除</el-button>
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
    <!-- 添加/修改弹窗 -->
    <edit-group :visible.sync="dialogFormVisible" @on-success="addSuccess" @on-error="addError" />
  </div>
</template>

<script>
import { fetchGroupList } from "@/api/group";
import Pagination from "@/components/Pagination";
import EditGroup from "./components/editGroup";
export default {
  name: "Type",
  components: { Pagination, EditGroup },
  data() {
    return {
      // 是否显示弹窗
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
    // 改变状态
    changeStatus() {},
    // 添加数据成功
    addSuccess() {
      this.getList();
    },
    // 添加数据失败
    addError() {},
    // 获取分类列表
    getList() {
      fetchGroupList().then(({ data }) => {
        this.list = data.data;
      });
    },
    handleCreate() {
      this.dialogFormVisible = true;
    },
    handleDelete() {},
    handleShift() {},
  },
};
</script>

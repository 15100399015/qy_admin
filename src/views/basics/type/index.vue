<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button icon="el-icon-plus" @click="handleFilter">添加</el-button>
      <el-button icon="el-icon-edit" @click="handleCreate">修改</el-button>
      <el-button icon="el-icon-delete" @click="handleDownload">删除</el-button>
      <el-button icon="el-icon-top-right" @click="handleDownload">转移</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center">id</el-table-column>
      <el-table-column label="名称" width="150px" align="center">名称</el-table-column>
      <el-table-column label="状态" min-width="150px">
        <el-switch></el-switch>
      </el-table-column>
      <el-table-column label="类型" width="110px" align="center">类型</el-table-column>
      <el-table-column label="名称" width="80px">名称</el-table-column>
      <el-table-column label="英文名" align="center" width="95">英文名</el-table-column>
      <el-table-column label="操作" class-name="status-col" align="center">
        <el-button>编辑</el-button>
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
    <!-- 添加弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="10"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {} from "@/api/type";
import Pagination from "@/components/Pagination";

export default {
  name: "ComplexTable",
  components: { Pagination },
  data() {
    return {
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
    getList() {},
    handleFilter() {},
    handleModifyStatus(row, status) {},
    sortChange(data) {},
    sortByID(order) {},
    resetTemp() {},
    handleCreate() {},
    createData() {},
    handleUpdate(row) {},
    updateData() {},
    handleDelete(row, index) {},
    handleFetchPv(pv) {},
    formatJson(filterVal) {},
    getSortClass(key) {},
  },
};
</script>

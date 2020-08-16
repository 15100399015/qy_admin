<template>
  <!-- 添加 -->
  <el-dialog
    v-el-drag-dialog
    title="编辑权限"
    :visible.sync="visible"
    :lock-scroll="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="onClose"
    @open="onOpen"
  >
    <!-- 表单 -->
    <el-form
      ref="groupFrom"
      label-width="80px"
      label-position="left"
      :model="groupParam"
      :rules="rules"
      :hide-required-asterisk="true"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="名称" prop="group_name">
            <el-input v-model="groupParam.group_name" placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-switch v-model="groupParam.group_status"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="备注" prop="group_remarks">
            <el-input v-model="groupParam.group_remarks" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="天积分" prop="group_points_day">
            <el-input-number :min="0" v-model="groupParam.group_points_day"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="周积分" prop="group_points_week">
            <el-input-number :min="0" v-model="groupParam.group_points_week"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="月积分" prop="group_points_month">
            <el-input-number :min="0" v-model="groupParam.group_points_month"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年积分" prop="group_points_year">
            <el-input-number :min="0" v-model="groupParam.group_points_year"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="永久积分" prop="group_points_free">
            <el-input-number :min="0" v-model="groupParam.group_points_free"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="handleSubmit" type="primary">确 定</el-button>
      <el-button @click="onClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createGroup, fetchOneGroup, updateGroup } from "@/api/group";
import elDragDialog from "@/directive/el-drag-dialog";
export default {
  props: ["visible", "model", "fillId"],
  directives: { elDragDialog },
  methods: {
    // 打开
    onOpen() {
      if (this.model === "upDate") {
        this.getFillInfo();
      }
    },
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
      this.$refs["groupFrom"].resetFields();
    },
    // 获取填充数据
    getFillInfo() {
      fetchOneGroup(this.fillId).then((data) => {
        Object.keys(this.groupParam).forEach((item) => {
          this.groupParam[item] = data[item];
        });
      });
    },
    // 提交
    handleSubmit() {
      this.$refs["groupFrom"].validate(async (valid) => {
        if (valid) {
          let state;
          if (this.model === "create") {
            state = await this.handleCreate();
          }
          if (this.model === "upDate") {
            state = await this.handleUpDate();
          }
          if (state !== false) {
            this.$refs["groupFrom"].resetFields();
            this.$emit("on-success", state);
            this.onClose();
          } else {
            this.$emit("on-error");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新建
    handleCreate() {
      return createGroup(this.groupParam)
        .then((res) => {
          this.$message({
            message: "创建成功",
            type: "success",
          });
          return res;
        })
        .catch((err) => {
          return false;
        });
    },
    // 更新
    handleUpDate() {
      return updateGroup(this.fillId, this.groupParam)
        .then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          return res;
        })
        .catch((err) => {
          return false;
        });
    },
  },
  watch: {
    "groupParam.group_points_day": function (val) {
      this.groupParam.group_points_week = Math.floor(val * 7 * 0.6);
      this.groupParam.group_points_month = Math.floor(val * 30 * 0.5);
      this.groupParam.group_points_year = Math.floor(val * 365 * 0.4);
      this.groupParam.group_points_free = Math.floor(val * 730 * 0.3);
    },
  },
  data() {
    return {
      groupParam: {
        group_name: "",
        group_status: true,
        group_points_day: 0,
        group_points_week: 0,
        group_points_month: 0,
        group_points_year: 0,
        group_points_free: 0,
        group_remarks: "",
      },
      rules: {
        group_name: {
          required: true,
          message: "必须输入组名称",
          trigger: "submit",
        },
        group_points_day: {
          required: true,
          type: "number",
          min: 0,
          message: "最小是1",
        },
        group_points_week: {
          required: true,
          type: "number",
          message: "最小是1",
          trigger: "submit",
        },
        group_points_month: {
          required: true,
          type: "number",
          min: 0,
          message: "最小是1",
          trigger: "submit",
        },
        group_points_year: {
          required: true,
          type: "number",
          min: 0,
          message: "最小是1",
          trigger: "submit",
        },
        group_points_free: {
          required: true,
          type: "number",
          min: 0,
          message: "最小是1",
          trigger: "submit",
        },
      },
    };
  },
};
</script>

<style>
</style>
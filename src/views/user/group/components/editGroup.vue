<template>
  <!-- 添加 -->
  <el-dialog
    v-el-drag-dialog
    title="编辑权限"
    @close="onClose"
    :visible.sync="visible"
    :lock-scroll="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 表单 -->
    <el-form
      :model="groupParam"
      ref="groupFrom"
      :rules="rules"
      label-width="80px"
      label-position="left"
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
            <el-input-number v-model="groupParam.group_points_day"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="周积分" prop="group_points_week">
            <el-input-number v-model="groupParam.group_points_week"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="月积分" prop="group_points_month">
            <el-input-number v-model="groupParam.group_points_month"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年积分" prop="group_points_year">
            <el-input-number v-model="groupParam.group_points_year"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="永久积分" prop="group_points_free">
            <el-input-number v-model="groupParam.group_points_free"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchGroupList, createGroup } from "@/api/group";
import elDragDialog from "@/directive/el-drag-dialog"; // base on element-ui
import { MessageBox, Message } from "element-ui";
export default {
  props: ["visible"],
  directives: { elDragDialog },
  methods: {
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
      this.$refs["groupFrom"].resetFields();
    },
    // 提交
    handleSubmit() {
      this.$refs["groupFrom"].validate((valid) => {
        if (valid) {
          createGroup(this.groupParam).then((res) => {
            this.$message({
              message: "创建成功",
              type: "success",
            });
            // 关闭弹窗
            this.visible = false;
            // 重置表单
            this.$refs["groupFrom"].resetFields();
            // 触发事件
            this.$emit("on-success");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
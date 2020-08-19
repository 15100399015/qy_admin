<template>
  <el-dialog
    v-el-drag-dialog
    title="编辑权限"
    :visible.sync="_visible"
    :lock-scroll="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="onClose"
    @open="onOpen"
  >
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
        <el-col :span="12">
          <el-form-item label="颜色" prop="group_color">
            <el-color-picker
              show-alpha
              v-model="groupParam.group_color"
              :predefine="paramOption.predefineColors"
            ></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="handleSubmit" type="primary">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createGroup, fetchOneGroup, updateGroup } from "@/api/group";
import elDragDialog from "@/directive/el-drag-dialog";
export default {
  props: ["visible", "model", "fillId"],
  directives: { elDragDialog },
  computed: {
    _visible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  methods: {
    onOpen() {
      if (this.model === "upDate") {
        this.getFillInfo();
      }
    },
    handleClose() {
      this._visible = false;
    },
    onClose() {
      this.$refs["groupFrom"].resetFields();
    },
    getFillInfo() {
      fetchOneGroup(this.fillId).then((data) => {
        Object.keys(this.groupParam).forEach((item) => {
          this.groupParam[item] = data[item];
        });
      });
    },
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
            this._visible = false;
          } else {
            this.$emit("on-error");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
        group_color: "",
      },
      paramOption: {
        predefineColors: [
          "#ff4500",
          "#ff8c00",
          "#ffd700",
          "#90ee90",
          "#00ced1",
          "#1e90ff",
          "#c71585",
          "rgba(255, 69, 0, 0.68)",
          "rgb(255, 120, 0)",
          "hsv(51, 100, 98)",
          "hsva(120, 40, 94, 0.5)",
          "hsl(181, 100%, 37%)",
          "hsla(209, 100%, 56%, 0.73)",
          "#c7158577",
        ],
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
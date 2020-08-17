<template>
  <!-- 添加 -->
  <el-dialog
    v-el-drag-dialog
    title="编辑分类"
    :visible.sync="visible"
    :lock-scroll="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="onClose"
    @open="onOpen"
  >
    <!-- 表单 -->
    <el-form
      label-width="70px"
      label-position="left"
      :model="typeParam"
      :rules="rules"
      ref="typeFrom"
      :hide-required-asterisk="true"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="分类类型" prop="type_mid">
            <el-select v-model="typeParam.type_mid" placeholder="选择类型">
              <el-option label="视频" :value="1"></el-option>
              <el-option label="文章" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父级分类" prop="type_pid">
            <el-select v-model="typeParam.type_pid" placeholder="请选父分类">
              <el-option key="emptyStr" label="顶级分类" :value="emptyStr"></el-option>
              <el-option
                v-for="item in paramOptions.type_pid"
                :key="item.value"
                :label="item.label"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="分类名称" prop="type_name">
            <el-input v-model="typeParam.type_name" placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="分类别名">
            <el-input v-model="typeParam.type_en" placeholder="请输入分类别名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="排序">
            <el-input-number v-model="typeParam.type_sort"></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="状态">
            <el-switch v-model="typeParam.type_status"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="权限组" prop="group_id">
        <el-select v-model="typeParam.group_id" multiple placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in paramOptions.group"
            :key="item._id"
            :label="item.label"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="图标" prop="type_logo">
        <el-row :gutter="10">
          <el-col :span="13">
            <el-popover
              placement="bottom"
              width="380"
              trigger="focus"
              :disabled="!typeParam.type_logo"
            >
              <el-image style="width:100%" :src="typeParam.type_logo" fit="fit"></el-image>
              <el-input
                slot="reference"
                v-model="typeParam.type_logo"
                :disabled="logoLoading"
                placeholder="请上传图片"
              >
                <template slot="prepend">URL</template>
              </el-input>
            </el-popover>
          </el-col>
          <el-col :span="7">
            <!-- 上传logo -->
            <el-upload
              action="http://localhost:3001/upload"
              :headers="uploadHeader"
              :on-success="upLogoSucess"
              :on-progress="upLogoProgress"
              :show-file-list="false"
            >
              <el-button type="primary" :loading="logoLoading">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="海报" prop="type_pic">
        <el-row :gutter="10">
          <el-col :span="13">
            <el-popover
              placement="bottom"
              width="380"
              trigger="focus"
              :disabled="!typeParam.type_pic"
            >
              <el-image style="width:100%" :src="typeParam.type_pic" fit="fit"></el-image>
              <el-input
                slot="reference"
                v-model="typeParam.type_pic"
                :disabled="picLoading"
                placeholder="请上传图片"
              >
                <template slot="prepend">URL</template>
              </el-input>
            </el-popover>
          </el-col>
          <el-col :span="7">
            <el-upload
              action="http://localhost:3001/upload"
              :headers="uploadHeader"
              :on-success="upPicSucess"
              :on-progress="upPicProgress"
              :show-file-list="false"
            >
              <el-button type="primary" :loading="picLoading">上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="扩展">
        <el-input v-model="typeParam.type_extend" placeholder="扩展信息"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  createType,
  fetchTypeList,
  fetchTypeOne,
  updateType,
} from "@/api/type";
import { fetchAllGroup } from "@/api/group";
import elDragDialog from "@/directive/el-drag-dialog";
import { getToken } from "@/utils/auth";
export default {
  props: ["visible", "model", "fillId", "type1Id"],
  directives: { elDragDialog },
  watch: {
    "typeParam.type_mid": function () {
      this.getType_1();
    },
  },
  methods: {
    onOpen() {
      if (this.model === "create") {
      }
      if (this.model === "upDate") {
        this.getFillInfo();
      }
      if (this.model === "addChildren") {
      }
      this.getType_1();
      this.getGroup();
    },
    // 关闭
    onClose() {
      this.$emit("update:visible", false);
      this.$refs["typeFrom"].resetFields();
    },
    // 获取现有分类
    getType_1() {
      fetchTypeList({
        where: {
          type_pid: "",
          type_mid: this.typeParam.type_mid,
        },
        limit: null,
      }).then(({ data }) => {
        this.paramOptions.type_pid = data.map((item) => ({
          label: item.type_name,
          _id: item._id,
        }));
        if (this.model === "addChildren") {
          this.typeParam.type_pid = this.type1Id;
        }
      });
    },
    getFillInfo() {
      fetchTypeOne(this.fillId).then((data) => {
        Object.keys(this.typeParam).forEach((item) => {
          this.typeParam[item] = data[item];
        });
      });
    },
    // 获取用户组
    getGroup() {
      fetchAllGroup().then((data) => {
        this.paramOptions.group = data.map((item) => ({
          label: item.group_name,
          _id: item._id,
        }));
      });
    },
    // 提交
    handleSubmit() {
      this.$refs["typeFrom"].validate(async (valid) => {
        if (valid) {
          let state;
          if (this.model === "create") {
            state = await this.handleCreate();
          }
          if (this.model === "addChildren") {
            state = await this.handleCreate();
          }
          if (this.model === "upDate") {
            state = await this.handleUpDate();
          }
          if (state !== false) {
            this.$refs["typeFrom"].resetFields();
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
      return createType(this.typeParam)
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
      return updateType(this.fillId, this.typeParam)
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

    upLogoSucess(response, file, fileList) {
      this.logoLoading = false;
      this.typeParam.type_logo = response.url;
    },
    upPicSucess(response, file, fileList) {
      this.picLoading = false;
      this.typeParam.type_pic = response.url;
    },
    upLogoProgress() {
      this.logoLoading = true;
    },
    upPicProgress() {
      this.picLoading = true;
    },
    upLoadError(response, file, fileList) {
      this.$message({
        message: "上传出现错误",
        type: "error",
      });
    },
  },
  data() {
    return {
      // 空字符串占位符
      emptyStr: "",
      // 上传请求头部
      uploadHeader: {
        token: getToken(),
      },
      // logo 上传加载
      logoLoading: false,
      // 图片上传加载
      picLoading: false,
      typeParam: {
        group_id: [],
        type_mid: 1,
        type_name: "",
        type_en: "",
        type_sort: 0,
        type_pid: "",
        type_status: true,
        type_logo: "",
        type_pic: "",
        type_extend: "",
      },
      paramOptions: {
        type_pid: [],
        group: [],
      },
      rules: {
        type_name: {
          required: true,
          message: "必须输入分类名称",
          trigger: "submit",
        },
        type_mid: {
          required: true,
          type: "enum",
          enum: [1, 2],
          message: "检查f分类类型",
          trigger: "submit",
        },
        type_pid: {
          type: "string",
          message: "检查父分类",
          trigger: "submit",
        },
        group_id: {
          required: true,
          type: "array",
          defaultField: { type: "string" },
          trigger: "submit",
        },
        type_logo: { type: "url", message: "这不是一个url", trigger: "submit" },
        type_pic: { type: "url", message: "这不是一个url", trigger: "submit" },
      },
    };
  },
};
</script>

<style>
</style>
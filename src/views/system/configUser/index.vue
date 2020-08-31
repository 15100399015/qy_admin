<template>
  <div class="app-container">
    <el-form label-width="120px" label-position="left" v-loading="loading">
      <el-form-item label="会员模块：">
        <el-switch v-model="userSettingFrom.status" active-text="开启" inactive-text="关闭"></el-switch>
      </el-form-item>

      <el-row>
        <el-col :span="6">
          <el-form-item label="注册开关：">
            <el-switch v-model="userSettingFrom.reg_open" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="注册状态：">
            <el-switch v-model="userSettingFrom.reg_status" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="手机注册验证：">
            <el-switch v-model="userSettingFrom.reg_phone_sms" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱注册验证：">
            <el-switch v-model="userSettingFrom.reg_email_sms" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="注册验证码：">
            <el-switch v-model="userSettingFrom.reg_verify" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="登录验证码：">
            <el-switch v-model="userSettingFrom.login_verify" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="注册送分：">
            <el-input-number v-model="userSettingFrom.reg_points"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每日ip限制">
            <el-input-number v-model="userSettingFrom.reg_num"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邀请注册积分：">
            <el-input-number v-model="userSettingFrom.invite_reg_points"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="推广访问积分：">
            <el-input-number v-model="userSettingFrom.invite_visit_points"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每日ip限制">
            <el-input-number v-model="userSettingFrom.invite_visit_num"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="分销状态">
        <el-switch v-model="userSettingFrom.reward_status" active-text="开启" inactive-text="关闭"></el-switch>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="一级提成比例：">
            <el-input-number v-model="userSettingFrom.reward_ratio"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二级提成比例：">
            <el-input-number v-model="userSettingFrom.reward_ratio_2"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="兑换比例：">
            <el-input-number v-model="userSettingFrom.cash_ratio"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="试看时长：">
            <el-input-number v-model="userSettingFrom.trysee"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频收费方式：">
            <el-radio v-model="userSettingFrom.vod_points_type" label="1">每集</el-radio>
            <el-radio v-model="userSettingFrom.vod_points_type" label="2">每数据</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="头像上传：">
        <el-switch v-model="userSettingFrom.portrait_status" active-text="开启" inactive-text="关闭"></el-switch>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名过滤：">
            <el-input
              v-model="userSettingFrom.filter_words"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>还原</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setSetting, getSetting } from "@/api/setting";
export default {
  data() {
    return {
      settingPath: "user",
      loading: true,
      userSettingFrom: {
        status: true,
        reg_open: true,
        reg_status: true,
        reg_phone_sms: false,
        reg_email_sms: false,
        reg_verify: false,
        login_verify: false,
        reg_points: 10,
        reg_num: 0,
        invite_reg_points: 10,
        invite_visit_points: 1,
        invite_visit_num: 0,
        reward_status: true,
        reward_ratio: 1,
        reward_ratio_2: 3,
        reward_ratio_3: 5,
        cash_status: true,
        cash_ratio: 100,
        cash_min: 1,
        trysee: 0,
        vod_points_type: 1,
        portrait_status: true,
        portrait_size: "100x100",
        filter_words: "admin,cao,sex,xxx",
      },
    };
  },
  created() {
    this.findSetting();
  },
  methods: {
    onSubmit() {
      this.upSetting();
    },
    upSetting() {
      this.loading = true;
      let { userSettingFrom, settingPath } = this;
      return setSetting(settingPath, userSettingFrom).then((data) => {
        this.mergeSetting(data);
        this.loading = false;
      });
    },
    findSetting() {
      this.loading = true;
      getSetting(this.settingPath).then((data) => {
        this.mergeSetting(data);
        this.loading = false;
      });
    },
    mergeSetting(newSetting) {
      Object.assign(this.userSettingFrom, newSetting);
    },
  },
};
</script>

<style>
</style>
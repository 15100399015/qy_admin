<template>
  <div class="app-container">
    <el-form label-width="135px" label-position="left" v-loading="loading">
      <el-row>
        <el-col :span="6">
          <el-form-item label="留言本：">
            <el-switch v-model="userSettingFrom.status" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="是否审核：">
            <el-switch v-model="userSettingFrom.reg_open" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="登录留言：">
            <el-switch v-model="userSettingFrom.reg_phone_sms" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="验证码：">
            <el-switch v-model="userSettingFrom.reg_verify" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="每页个数：">
            <el-input-number v-model="userSettingFrom.reg_give_points"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="时间间隔">
            <el-input-number v-model="userSettingFrom.invite_reg_points"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="6">
          <el-form-item label="开启评论：">
            <el-switch v-model="userSettingFrom.status" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="是否审核：">
            <el-switch v-model="userSettingFrom.reg_open" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="登录评论：">
            <el-switch v-model="userSettingFrom.reg_phone_sms" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="验证码：">
            <el-switch v-model="userSettingFrom.reg_verify" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="每页个数：">
            <el-input-number v-model="userSettingFrom.reg_give_points"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="时间间隔">
            <el-input-number v-model="userSettingFrom.invite_reg_points"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label-width="0" style="text-align: center;">
        <el-button size="medium" type="primary" @click="onSubmit">更新</el-button>
        <el-button size="medium" @click="reduction">还原</el-button>
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
      originalSetting: null,
      userSettingFrom: {
        // 会员状态
        status: true,

        // 开始注册
        reg_open: true,
        // 注册审核状态
        reg_status: true,

        // 注册手机验证
        reg_phone_sms: false,
        // 注册邮箱验证
        reg_email_sms: false,

        // 注册验证码
        reg_verify: false,
        // 登录验证码
        login_verify: false,

        // 注册赠送积分
        reg_give_points: 30,
        //单个ip每日注册数量
        reg_day_ip_num: 0,

        // 邀请注册积分
        invite_reg_points: 20,
        // ip每日邀请注册限制
        invite_reg_day_ip_num: 0,

        // 访问推广积分
        invite_visit_points: 1,
        // ip每日推广限制
        invite_visit_day_ip_num: 0,

        // 分销状态
        reward_status: false,
        // 一级分销提成比例
        reward_ratio: 1,

        // 积分=现金 比例
        cash_ratio: 1,
        // 最小充值金额
        cash_num_min: 10,

        // 开启试看
        trysee_status: false,
        // 试看时常
        trysee_time: 6,

        // 视频收费方式
        vod_points_type: 1,
        // 文章收费方式
        art_points_type: 1,

        // 开启上传头像
        portrait_status: true,
        // 头像大小限制
        portrait_size: "100x100",

        // 过滤用户名
        filter_words: "admin,cao,sex,xxx",
      },
    };
  },
  created() {
    this.findSetting();
  },
  methods: {
    // 提交
    onSubmit() {
      this.upSetting();
    },
    // 更新设置
    upSetting() {
      this.loading = true;
      let { userSettingFrom, settingPath } = this;
      return setSetting(settingPath, userSettingFrom).then((data) => {
        Object.assign(this.userSettingFrom, data);
        this.loading = false;
        this.$message.success("更新成功");
      });
    },
    // 获取设定
    findSetting() {
      this.loading = true;
      getSetting(this.settingPath).then((data) => {
        Object.assign(this.userSettingFrom, data);
        if (!this.originalSetting) this.originalSetting = data;
        this.loading = false;
      });
    },
    // 还原所有选项
    reduction() {
      this.userSettingFrom = this.originalSetting;
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="app-container">
    <el-form label-width="135px" label-position="left" v-loading="loading">
      <el-row>
        <el-col :span="6">
          <el-form-item label="会员模块：">
            <el-switch v-model="userSettingFrom.status" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

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
      </el-row>

      <el-row>
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
        <el-col :span="6">
          <el-form-item label="注册送分：">
            <el-input-number v-model="userSettingFrom.reg_give_points"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="每日IP限制：">
            <el-input-number v-model="userSettingFrom.reg_day_ip_num"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="邀请注册积分：">
            <el-input-number v-model="userSettingFrom.invite_reg_points"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="每日IP限制：">
            <el-input-number v-model="userSettingFrom.invite_reg_day_ip_num"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="推广访问积分：">
            <el-input-number v-model="userSettingFrom.invite_visit_points"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="每日IP限制：">
            <el-input-number v-model="userSettingFrom.invite_visit_day_ip_num"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="兑换比例：">
            <el-input-number v-model="userSettingFrom.cash_ratio"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最小充值金额">
            <el-input-number v-model="userSettingFrom.cash_num_min"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="分销状态：">
            <el-switch v-model="userSettingFrom.reward_status" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提成比例：">
            <el-input-number v-model="userSettingFrom.reward_ratio"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="试看状态">
            <el-switch v-model="userSettingFrom.trysee_status" active-text="开启" inactive-text="关闭"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="试看时长：">
            <el-input-number v-model="userSettingFrom.trysee_time"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="视频收费方式：">
            <el-radio v-model="userSettingFrom.vod_points_type" :label="1">每集</el-radio>
            <el-radio v-model="userSettingFrom.vod_points_type" :label="2">每数据</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="文章收费方式：">
            <el-radio v-model="userSettingFrom.art_points_type" :label="1">每篇</el-radio>
            <el-radio v-model="userSettingFrom.art_points_type" :label="2">每数据</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="头像上传：">
            <el-switch
              v-model="userSettingFrom.portrait_status"
              active-text="开启"
              inactive-text="关闭"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名过滤：">
            <el-input v-model="userSettingFrom.filter_words" type="textarea" :rows="3"></el-input>
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
        reg_give_points: 10,
        //单个ip每日注册数量
        reg_day_ip_num: 0,

        // 邀请注册积分
        invite_reg_points: 10,
        // ip每日邀请注册限制
        invite_reg_day_ip_num: 10,

        // 访问推广积分
        invite_visit_points: 1,
        // ip每日推广限制
        invite_visit_day_ip_num: 0,

        // 分销状态
        reward_status: true,
        // 一级分销提成比例
        reward_ratio: 1,

        // 积分=现金 比例
        cash_ratio: 100,
        // 最小充值金额
        cash_num_min: 1,

        // 开始试看
        trysee_status: 0,
        // 试看时常
        trysee_time: 0,

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
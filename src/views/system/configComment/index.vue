<template>
  <div class="app-container">
    <el-form v-loading="loading" label-width="135px" label-position="left">
      <el-row>
        <el-col :span="6">
          <el-form-item label="留言本：">
            <el-switch v-model="settingFrom.gbook.status" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="是否审核：">
            <el-switch v-model="settingFrom.gbook.audit" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="登录留言：">
            <el-switch v-model="settingFrom.gbook.login" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="验证码：">
            <el-switch v-model="settingFrom.gbook.verify" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="每页个数：">
            <el-input-number v-model="settingFrom.gbook.pagesize" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="时间间隔">
            <el-input-number v-model="settingFrom.gbook.timespan" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />

      <el-row>
        <el-col :span="6">
          <el-form-item label="评论：">
            <el-switch v-model="settingFrom.comment.status" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="是否审核：">
            <el-switch v-model="settingFrom.comment.audit" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="登录评论：">
            <el-switch v-model="settingFrom.comment.login" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="验证码：">
            <el-switch v-model="settingFrom.comment.verify" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="每页个数：">
            <el-input-number v-model="settingFrom.comment.pagesize" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="时间间隔">
            <el-input-number v-model="settingFrom.comment.timespan" />
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
import { setSetting, getSetting } from '@/api/setting'
export default {
  data() {
    return {
      // 配置文件对应路径
      settingPath: 'comment',
      // 是否加载中
      loading: true,
      // 出事的
      initialSetting: null,
      // 设定form
      settingFrom: {
        gbook: {
          status: true,
          audit: true,
          login: false,
          verify: false,
          pagesize: 20,
          timespan: 3,
        },
        comment: {
          status: true,
          audit: true,
          login: false,
          verify: false,
          pagesize: 20,
          timespan: 3,
        },
      },
    }
  },
  created() {
    this.getSetting()
  },
  methods: {
    // 提交
    onSubmit() {
      this.upSetting()
    },
    // 更新设置
    upSetting() {
      this.loading = true
      const { settingFrom, settingPath } = this
      return setSetting(settingPath, settingFrom).then((data) => {
        Object.assign(this.settingFrom, data)
        this.loading = false
        this.$message.success('更新成功')
      })
    },
    // 获取设定
    getSetting() {
      this.loading = true
      getSetting(this.settingPath).then((data) => {
        Object.assign(this.settingFrom, data)
        if (!this.initialSetting) this.initialSetting = data
        this.loading = false
      })
    },
    // 还原所有选项
    reduction() {
      this.settingFrom = this.initialSetting
    },
  },
}
</script>

<style></style>

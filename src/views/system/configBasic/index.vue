<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="基本设置" name="first">基本设置</el-tab-pane>
      <el-tab-pane label="性能优化" name="second">性能优化</el-tab-pane>
      <el-tab-pane label="预留参数" name="third">预留参数</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
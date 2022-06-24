<template>
  <Button type="primary"><slot /></Button>
</template>
<script setup>
import { Button } from 'ant-design-vue';
</script>
<style scoped lang="scss">
.ant-btn {
  border-radius: 8px;
  border: 1px solid transparent;
  border-color: #e2e2e2;
}
.ant-btn-text {
  border: 0;
}
.ant-btn-primary {
  background-color: var(--el-color-primary);
  border: 0;
  box-shadow: 0px 4px 8px 0px rgba(39, 45, 56, 0.08), 0px 2px 4px 0px rgba(39, 45, 56, 0.08);
  border-radius: 8px;
}
.ant-btn-primary[disabled] {
  background-color: #f5f5f5;
  box-shadow: 0px 4px 8px 0px rgba(39, 45, 56, 0.08), 0px 2px 4px 0px rgba(39, 45, 56, 0.08);
}
.ant-btn-background-ghost.ant-btn-primary {
  border: 1px solid var(--el-color-primary);
  box-shadow: none;
  color: var(--el-color-primary);
}
.ant-btn-lg {
  padding: 6.4px 30px;
  font-size: 14px;
}
</style>

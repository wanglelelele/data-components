<template>
  <h6 class="category-title"><slot /></h6>
</template>
<style lang="scss" scoped>
.category-title {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333;
  &::before {
    content: '';
    display: inline-block;
    margin-right: 16px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #007aff;
  }
}
</style>

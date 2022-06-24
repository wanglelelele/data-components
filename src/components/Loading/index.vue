<template>
  <div class="loading">
    <div class="loading-content">
      <div class="circle"></div>
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Loading',
  setup() {
    const title = ref('');
    const setTitle = (txt) => {
      title.value = txt;
    };
    return {
      title,
      setTitle,
    };
  },
});
</script>
<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  z-index: 2000;
  .loading-content {
    margin: auto;
    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid transparent;
      border-top: 1px solid var(--el-color-primary);
      border-left: 1px solid var(--el-color-primary);
      animation: rotate 3s infinite linear;
    }
    .desc {
      line-height: 20px;
      //font-size: $font-size-small;
      //color: $color-text-l;
    }
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>

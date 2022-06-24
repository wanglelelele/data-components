import { createApp } from 'vue';
import Loading from './index.vue';
import { addClass, removeClass } from '@/utils';
// 挂在组建默认样式, app.css文件中
const relativeCls = 'g-relative';
export default function loadingDirective(app) {
  app.directive('loading', {
    mounted(el, binding) {
      /* 指令主要是将loading组件生成的DOM动态插入到指令作用的DOM对象上（v-loading=true）
             ------------------------------- */
      const app = createApp(Loading);
      const instance = app.mount(document.createElement('div'));
      /* instance在mounted中只创建一次*/
      el.instance = instance;
      const title = binding.arg;
      if (title) {
        instance.setTitle(title);
      }
      /** 指令传递的值 */
      if (binding.value) {
        append(el);
      }
    },
    // 由v-loading=true变为v-loading=false 就会执行
    updated(el, binding) {
      // 通过binding.arg拿到动态参数
      const title = binding.arg;
      // 如果参数不是空 执行实例中的方法
      if (title) {
        el.instance.setTitle(title);
      }
      // 如果loading前后值不一致
      if (binding.value !== binding.oldValue) {
        // 如果是true那么就插入否则删除
        binding.value ? append(el) : remove(el);
      }
    },
  });
}
// 元素挂载
function append(el) {
  // 根据loading组件样式，是使用absolute，而当el不是fixed或retaive时候给其动态添加定位属性
  const style = getComputedStyle(el);
  // 判断el的样式中有无定位，===-1就是没有 希望v-loading不受样式限制
  if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
    addClass(el, relativeCls);
  }
  // 因为loading组件生成的实例instance已经赋值给el.instance属性上了，所以在这里可以直接通过el拿到
  // el.instance.$el就是loading组件的DOM对象
  // console.log('el.instance', el.instance)
  el.appendChild(el.instance.$el);
}
function remove(el) {
  removeClass(el, relativeCls);
  el.removeChild(el.instance.$el);
}

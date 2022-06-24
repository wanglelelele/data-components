import { createApp } from 'vue';
import App from '@/App.vue';
import Antd from 'ant-design-vue';
import globalRegister from '@/components/globalRegister';
// 状态管理
import { createPinia } from 'pinia';
// loading 指令
import loadingDirective from '@/components/Loading/directive';

import 'ant-design-vue/dist/antd.css';
import './assets/iconfont/index.css';
import '@/assets/scss/reset-antd.scss';
import '@/assets/scss/global.scss';

const app = createApp(App);
app.use(createPinia());
app.use(Antd);
const components = globalRegister(app);
app.mount('#app');

loadingDirective(app);
console.log('com', components);
export default components;

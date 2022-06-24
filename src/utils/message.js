import { debounce } from 'lodash';
import { message } from 'ant-design-vue';

const messageError = debounce((title = '未知异常', duration = 3) => {
  message.error(title, duration);
}, 300);
const messageWarn = debounce((title = '提示', duration = 3) => {
  message.warn(title, duration);
}, 300);
const messageSuccess = debounce((title = '成功', duration = 3) => {
  message.success(title, duration);
}, 300);
export { messageError, messageWarn, messageSuccess };
